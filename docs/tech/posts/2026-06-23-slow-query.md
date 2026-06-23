---
layout: doc
title: "[Daily Questions Challenge 29] Slow Query 排查的方法"
description: 說明如何系統性排查資料庫慢查詢，涵蓋 Slow Query Log 設定、EXPLAIN 輸出解讀、常見原因分析與優化手段。
date: 2026-06-23
avatar: /daily-questions-challenge.png
tags:
  - Database
  - Backend
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 29] Slow Query 排查的方法"
  - - meta
    - property: og:description
      content: 說明如何系統性排查資料庫慢查詢，涵蓋 Slow Query Log 設定、EXPLAIN 輸出解讀、常見原因分析與優化手段。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 29] Slow Query 排查的方法"
  - - meta
    - name: twitter:description
      content: 說明如何系統性排查資料庫慢查詢，涵蓋 Slow Query Log 設定、EXPLAIN 輸出解讀、常見原因分析與優化手段。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 慢查詢（Slow Query）的影響

在高流量的系統中，一條執行超過幾秒的查詢，往往不只是「慢一點」而已。

資料庫的連線數是有限的。若某條查詢長時間佔住連線，後續的請求就必須等待。當慢查詢的數量累積，連線池（Connection Pool）會被耗盡，系統開始出現逾時（timeout）錯誤，進而影響所有依賴該資料庫的服務。

排查慢查詢的目標，是找出哪些查詢慢、為什麼慢，然後針對根本原因做優化。

## 第一步：找出慢查詢

### Slow Query Log

MySQL 提供 Slow Query Log，可以記錄所有執行時間超過 `long_query_time` 秒的查詢。

開啟方式（不需重啟，即時生效）：

```sql
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 1;  -- 超過 1 秒就記錄
SET GLOBAL log_queries_not_using_indexes = ON;  -- 也記錄沒有使用 Index 的查詢
```

也可以寫入 `my.cnf`，讓設定在重啟後持續生效：

```ini
[mysqld]
slow_query_log = ON
long_query_time = 1
log_queries_not_using_indexes = ON
slow_query_log_file = /var/log/mysql/slow.log
```

log 累積後，可以用 `mysqldumpslow` 彙整：

```bash
# 列出總執行時間最長的 10 條查詢
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log

# 列出平均執行時間最長的 10 條查詢
mysqldumpslow -s at -t 10 /var/log/mysql/slow.log
```

`mysqldumpslow` 會把查詢中的具體數值替換成 `N` 或 `'S'`，將相似的查詢合併，讓你快速看出哪一類查詢是效能瓶頸。

## 第二步：分析執行計畫

找到可疑的查詢後，下一步是用 `EXPLAIN` 看資料庫是怎麼執行這條查詢的。

### EXPLAIN 基本用法

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
```

`EXPLAIN` 不會真正執行查詢，只會顯示優化器的執行計畫（Execution Plan）。輸出中最重要的三個欄位是 `type`、`rows` 和 `Extra`。

### type：掃描方式

`type` 欄位表示 MySQL 如何定位資料列，從最好到最差排序：

| type | 說明 |
|---|---|
| `const` | 用主鍵或唯一 Index 查到唯一一筆資料，最快 |
| `ref` | 用非唯一 Index 查詢，可能匹配多筆 |
| `range` | 使用 Index 做範圍掃描（BETWEEN、>、<） |
| `index` | 掃描整個 Index 樹，比掃全表略快 |
| `ALL` | Full Table Scan，逐列掃描整張表，最慢 |

看到 `type: ALL` 就要特別注意，代表查詢沒有走 Index，對大資料表來說效能會很差。

### rows：預估掃描行數

`rows` 是優化器估計需要掃描的資料列數。數字越大，查詢成本越高。如果 `rows` 接近資料表總筆數，通常代表 Index 沒有發揮作用。

### Extra：額外資訊

`Extra` 欄位提供執行細節，幾個常見的警示：

- **Using filesort**：無法用 Index 順序完成 `ORDER BY`，需要額外排序，對大量資料開銷很大。
- **Using temporary**：查詢需要建立暫存表，常見於複雜的 `GROUP BY` 或 `ORDER BY`。
- **Using index**（正面）：查詢只需讀取 Index，不需要回表查原始資料（Covering Index 命中）。

### EXPLAIN ANALYZE（MySQL 8.0.18+）

`EXPLAIN` 只顯示估算值，不實際執行。`EXPLAIN ANALYZE` 則會真正執行查詢，回傳實際的執行時間與掃描行數：

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
```

輸出格式是 TREE 形式，包含每個步驟的估算值與實際值：

```
-> Filter: (orders.user_id = 42)  (cost=102.75 rows=98)
                                  (actual time=0.42..5.23 rows=87 loops=1)
    -> Table scan on orders  (cost=102.75 rows=980)
                             (actual time=0.38..4.89 rows=980 loops=1)
```

`actual time=0.42..5.23` 代表：讀取第一列花了 0.42 ms，讀完所有列花了 5.23 ms。

當估算的 `rows` 與實際 `rows` 差距很大時，代表統計資料（Statistics）已過時，可以考慮執行 `ANALYZE TABLE` 更新。

> PostgreSQL 也有相同語法，直接執行 `EXPLAIN ANALYZE SELECT ...`，輸出會包含 actual time 和 actual rows。

## 第三步：找出慢查詢的原因

### 缺少 Index → Full Table Scan

最常見的原因。`WHERE` 條件中的欄位如果沒有 Index，資料庫只能逐列掃描。

`EXPLAIN` 出現 `type: ALL` 就是這個問題的訊號。解法是在查詢條件欄位上建立 Index。

### Index 失效

加了 Index 不代表一定會用到。以下幾種寫法會讓 Index 失效：

**對欄位套用函數**

```sql
-- 失效：對索引欄位包函數，Index 無法命中
SELECT * FROM orders WHERE YEAR(created_at) = 2026;

-- 有效：改成範圍查詢
SELECT * FROM orders WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';
```

**LIKE 以萬用字元開頭**

```sql
-- 失效：前綴不確定，B-Tree 無法走
SELECT * FROM users WHERE name LIKE '%john%';

-- 有效：前綴固定可走 Index
SELECT * FROM users WHERE name LIKE 'john%';
```

**欄位型別不符（隱式型別轉換）**

```sql
-- 若 user_id 是 VARCHAR，用整數比對會觸發隱式轉換，導致 Index 失效
SELECT * FROM users WHERE user_id = 42;

-- 有效：型別一致
SELECT * FROM users WHERE user_id = '42';
```

關於 Index 失效的完整原理，可以參考 [#19 Index 是如何加速查詢？](./2026-06-13-database-index.md)。

### N+1 Query 問題

N+1 是一種常見的隱性慢查詢，不一定會出現在 Slow Query Log 裡（因為每一條查詢單獨看都很快），但累計起來對效能影響極大。

典型場景：查詢出 100 篇文章（1 次查詢），然後在迴圈中逐一查詢每篇文章的作者（100 次查詢），總共執行 101 次查詢。

```sql
-- 第 1 次：取出所有文章
SELECT * FROM posts LIMIT 100;

-- 後續 100 次（在程式碼迴圈中逐一執行）
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;
-- ... 共 100 次
```

解法是改用 JOIN 或預先批次查詢（Eager Loading）：

```sql
-- 一次查詢解決
SELECT posts.*, users.name
FROM posts
JOIN users ON posts.user_id = users.id
LIMIT 100;
```

N+1 通常在 ORM 框架（如 Laravel Eloquent、Django ORM）中容易發生，要特別注意 lazy loading 的行為。

### JOIN 欄位缺少 Index

JOIN 的條件欄位如果沒有 Index，資料庫需要對每一筆資料做全表掃描來匹配。當兩張表的資料量都很大時，效能問題會非常明顯。

```sql
-- orders.user_id 如果沒有 Index，這條查詢會很慢
SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.status = 'pending';
```

確認 JOIN 欄位（通常是外鍵）都有建立 Index。

### 深分頁（Deep Pagination）

`OFFSET` 分頁在數字小的時候沒有問題，但 OFFSET 越大，效能就越差。原因是 MySQL 仍然要掃描並丟棄前面所有的資料列，才能回傳你要的那一頁。

```sql
-- 看似只取 20 筆，但 MySQL 必須掃描前 100,000 筆再丟棄
SELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 100000;
```

改用 Keyset Pagination（游標分頁）可以解決這個問題：

```sql
-- 用上一頁最後一筆的 id 當游標，每次都只掃描需要的範圍
SELECT * FROM posts WHERE id < 100001 ORDER BY id DESC LIMIT 20;
```

## 優化手段總結

| 問題 | 解法 |
|---|---|
| 缺少 Index | 在 WHERE / JOIN / ORDER BY 欄位建立 Index |
| 複合條件效率差 | 用複合 Index，注意欄位順序（最左匹配） |
| 回表讀取成本高 | 使用 Covering Index，將查詢欄位都納入 Index |
| Index 失效 | 改寫查詢，避免函數包欄位、型別不符、`%` 開頭的 LIKE |
| N+1 Query | 改用 JOIN 或 Eager Loading |
| 深分頁 | 改用 Keyset Pagination（游標分頁） |

## 排查流程建議

遇到慢查詢時，建議依以下優先順序排查：

1. **用 Slow Query Log 找出候選查詢**，`long_query_time` 從 1 秒開始，再視情況調低。
2. **執行 `EXPLAIN`，看 `type` 是否為 `ALL`**，確認 Index 是否有被使用。
3. **檢查 `Extra` 欄位**，是否有 `Using filesort` 或 `Using temporary`。
4. **對應具體原因**，依照上方列表判斷是缺 Index、Index 失效、N+1，還是其他問題。
5. **在測試環境套用修正後，用 `EXPLAIN ANALYZE` 確認實際執行時間改善**。

建立 Index 或改寫查詢之後，記得也要在讀寫壓力下評估寫入效能的影響。如果系統同時有讀寫分離架構，還需要確認查詢是否落在正確的節點上（可參考 [#17 資料庫讀寫分離](./2026-06-11-database-read-write-splitting.md)）。

## 總結

Slow Query 排查的核心流程是：用 Slow Query Log 定位問題查詢，再用 `EXPLAIN` 看執行計畫，找出是 Full Table Scan、Index 失效、N+1，還是深分頁等原因，最後針對根本原因做優化。

面試時，比起只說「加 Index 就會比較快」，更完整的回答是說清楚排查工具的使用方式、EXPLAIN 輸出的解讀重點，以及不同原因對應的解法與取捨。

## 參考

- [MySQL 8.4 Reference Manual — 7.4.5 The Slow Query Log](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html)
- [MySQL 8.4 Reference Manual — 6.6.10 mysqldumpslow](https://dev.mysql.com/doc/refman/8.4/en/mysqldumpslow.html)
- [MySQL 8.4 Reference Manual — 10.8.2 EXPLAIN Output Format](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)
- [MySQL Blog — EXPLAIN ANALYZE](https://dev.mysql.com/blog-archive/mysql-explain-analyze/)
- [Percona — Using Explain Analyze in MySQL 8](https://www.percona.com/blog/using-explain-analyze-in-mysql-8/)
- [PlanetScale — How to read MySQL EXPLAINs](https://planetscale.com/blog/how-read-mysql-explains)
