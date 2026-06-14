---
layout: doc
title: "[Daily Questions Challenge 19] Index 是如何加速查詢？"
description: 介紹資料庫 Index 底層的 B-Tree 結構與查找原理，說明為什麼加了 Index 能加速查詢，以及 Index 失效的常見情況與實務取捨。
date: 2026-06-13
avatar: /daily-questions-challenge.png
tags:
  - Database
  - Backend
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 19] Index 是如何加速查詢？"
  - - meta
    - property: og:description
      content: 介紹資料庫 Index 底層的 B-Tree 結構與查找原理，說明為什麼加了 Index 能加速查詢，以及 Index 失效的常見情況與實務取捨。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 19] Index 是如何加速查詢？"
  - - meta
    - name: twitter:description
      content: 介紹資料庫 Index 底層的 B-Tree 結構與查找原理，說明為什麼加了 Index 能加速查詢，以及 Index 失效的常見情況與實務取捨。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 沒有 Index 時查詢怎麼做

假設有一張 `users` 資料表，裡面有一千萬筆用戶資料。執行這條查詢：

```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

如果 `email` 欄位沒有 Index，資料庫只能從第一筆開始，逐列比對 `email` 是否符合，一路掃到最後一筆才能確定結果。這稱為 Full Table Scan（全資料表掃描）。

在一千萬筆資料中，最壞情況需要比對一千萬次。資料量越大，查詢時間就越長，複雜度是 O(N)。

Index 的作用，就是讓資料庫不需要掃整張表，就能快速定位到目標資料列。

## B-Tree Index 的結構

大多數資料庫的預設 Index 類型是 B-Tree（Balanced Tree，平衡樹）。MySQL InnoDB 和 PostgreSQL 都以 B-Tree 作為標準 Index 結構。

B-Tree Index 是一個獨立的資料結構，它把被索引欄位的值整理成排序好的樹狀結構，並在每個葉節點（Leaf Node）記錄對應的資料列位置。

結構大致如下：

```
           [根節點 Root]
           /           \
     [內部節點]       [內部節點]
     /      \         /      \
 [葉節點] [葉節點] [葉節點] [葉節點]
  (值+指標) (值+指標) (值+指標) (值+指標)
```

- **根節點與內部節點**：存放用來導引方向的鍵值，讓查詢可以決定要往左還是往右走。
- **葉節點**：存放實際的 Index 條目，包含欄位值與對應的資料列位置（在 PostgreSQL 中稱為 TID，在 MySQL InnoDB 的 Secondary Index 中則存放主鍵值）。

B-Tree 維持樹的平衡，所以無論資料量多大，從根節點走到葉節點的層數是固定的，查找複雜度是 O(log N)。

PostgreSQL 文件指出，實務上超過 99% 的頁面都是葉節點；MySQL InnoDB 的預設頁面大小為 16KB，一個頁面可以容納大量的 Index 條目，因此樹的高度通常只有 3 到 4 層，即使面對數千萬筆資料也一樣。

## B-Tree 如何加速查詢

延續前面的例子，當 `email` 欄位有 B-Tree Index 時，查詢 `john@example.com` 的過程如下：

1. 從根節點開始，比對 `john@example.com` 應該在左子樹還是右子樹。
2. 往下走到下一層內部節點，繼續縮小範圍。
3. 最終到達葉節點，找到 `john@example.com` 對應的資料列位置。
4. 用該位置直接取出資料列。

原本需要掃描一千萬次，現在只需要沿著樹走幾層，比對次數大約是 log₂(10,000,000) ≈ 23 次。

這就是 Index 加速查詢的核心原理：把 O(N) 的逐列掃描，換成 O(log N) 的樹狀搜尋。

## Index 在不同查詢情境的應用

B-Tree Index 因為本身是排序結構，在以下情境都能發揮作用：

**WHERE 條件**

等值查詢和範圍查詢都能用到 B-Tree Index：

```sql
-- 等值查詢
SELECT * FROM orders WHERE user_id = 42;

-- 範圍查詢
SELECT * FROM orders WHERE created_at BETWEEN '2026-01-01' AND '2026-06-01';
```

**ORDER BY**

因為 Index 本身已排序，ORDER BY 可以直接沿著葉節點的連結串列讀取，省去額外排序的成本：

```sql
SELECT * FROM products ORDER BY price ASC LIMIT 20;
```

**JOIN 條件**

當 JOIN 的欄位有 Index 時，資料庫可以用 Index 快速定位另一張表的對應資料列，而不是逐列掃描：

```sql
SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.status = 'pending';
```

## Index 失效的常見情況

加了 Index 不代表查詢一定會用到它。以下幾種情況會讓 Index 失效，資料庫退回 Full Table Scan：

**對欄位使用函數**

把函數包在索引欄位外面，資料庫無法直接對應 Index 中的原始值：

```sql
-- 失效：對 created_at 使用函數，Index 無法命中
SELECT * FROM orders WHERE YEAR(created_at) = 2026;

-- 有效：改成範圍查詢
SELECT * FROM orders WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01';
```

**LIKE 以萬用字元開頭**

`%` 開頭的 LIKE 需要比對所有可能的字串前綴，B-Tree 的排序結構無從利用：

```sql
-- 失效：前綴不確定，無法走 B-Tree
SELECT * FROM users WHERE name LIKE '%john%';

-- 有效：前綴固定，可以走 B-Tree
SELECT * FROM users WHERE name LIKE 'john%';
```

**欄位型別不符**

如果查詢條件的型別與欄位不一致，資料庫需要做隱式型別轉換，可能導致 Index 失效：

```sql
-- 如果 user_id 是 VARCHAR，用整數比對可能不走 Index
SELECT * FROM users WHERE user_id = 42;
```

**選擇性太低**

如果欄位的值非常集中（例如只有 `active` 和 `inactive` 兩種），Index 幾乎沒有過濾效果，優化器可能判斷 Full Table Scan 更快，直接略過 Index。

## Index 的成本

Index 不是免費的。每次對資料表執行 INSERT、UPDATE 或 DELETE 時，資料庫也必須同步維護所有相關的 Index。寫入一筆資料，背後可能需要更新多個 Index 的 B-Tree 結構。

除了寫入效能，Index 也會佔用額外的儲存空間。欄位值越多、Index 越多，佔用的空間也越大。

因此，Index 數量並不是越多越好。

## 實務取捨：哪些欄位值得建 Index

建 Index 之前，通常會考慮幾個維度：

| 維度 | 適合建 Index | 不適合建 Index |
|---|---|---|
| **查詢頻率** | 頻繁出現在 WHERE / JOIN / ORDER BY | 極少被查詢的欄位 |
| **欄位選擇性** | 唯一值多，例如 email、user_id | 唯一值少，例如 status、boolean |
| **資料表大小** | 資料量大時效益明顯 | 資料量極小時，Full Scan 本來就快 |
| **寫入頻率** | 讀多寫少的欄位 | 頻繁更新的欄位，維護成本高 |

實務上，主鍵（Primary Key）和 UNIQUE 欄位通常會自動建立 Index。需要特別評估的是那些常出現在 WHERE 條件但沒有自動 Index 的欄位，例如外鍵、時間戳記、狀態欄位等。

## 總結

Index 加速查詢的核心原理，是用 B-Tree 把 O(N) 的 Full Table Scan 換成 O(log N) 的樹狀搜尋。B-Tree 是一個排序好的獨立資料結構，葉節點存放欄位值與對應的資料列位置，查找時從根節點沿樹往下走，層數極少。

Index 在等值查詢、範圍查詢、ORDER BY 和 JOIN 都能發揮作用，但函數包欄位、LIKE 萬用字元開頭、型別不符等情況會讓 Index 失效。Index 也有成本：寫入效能下降與儲存空間增加。

面試時，比起只說「Index 讓查詢變快」，更好的回答是說清楚 B-Tree 的結構、為什麼能從 O(N) 降到 O(log N)，以及什麼情況下 Index 不會被用到、背後的取捨是什麼。

## 參考

- [PostgreSQL Documentation — Chapter 11. Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [PostgreSQL Documentation — 11.1. Introduction](https://www.postgresql.org/docs/current/indexes-intro.html)
- [PostgreSQL Documentation — 65.1. B-Tree Indexes](https://www.postgresql.org/docs/current/btree.html)
- [PostgreSQL Documentation — 11.2. Index Types](https://www.postgresql.org/docs/current/indexes-types.html)
- [MySQL 8.4 Reference Manual — 10.3.9 Comparison of B-Tree and Hash Indexes](https://dev.mysql.com/doc/refman/8.4/en/index-btree-hash.html)
- [MySQL 8.4 Reference Manual — 17.6.2.2 The Physical Structure of an InnoDB Index](https://dev.mysql.com/doc/refman/8.4/en/innodb-physical-structure.html)
