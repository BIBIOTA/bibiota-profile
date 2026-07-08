# Article Brief — Slow Query 排查的方法

## 工作主題

如何系統性地排查資料庫 Slow Query，從工具使用到常見原因分析與優化手段。

## 文章類型

Daily Questions Challenge 技術文章（#29）

## 目標讀者

有一定後端開發基礎，了解 SQL 基本語法，但對 EXPLAIN 解讀與慢查詢排查流程不夠熟悉的工程師。

## 文章目的

讓讀者在面試時能完整說明「發現一條慢查詢之後，你會怎麼排查？」這道面試題的完整思路，並能實際操作常見工具。

## 核心問題

**資料庫 Slow Query 要如何排查？**

## 範圍

1. **問題情境** — 慢查詢的定義與影響（延遲升高、連線池耗盡）
2. **排查工具**
   - MySQL Slow Query Log：開啟方式、`long_query_time` 設定、`mysqldumpslow`
   - `EXPLAIN` 輸出解讀：`type`（全表掃描 vs. index lookup）、`rows`、`Extra`（Using filesort, Using temporary）
   - `EXPLAIN ANALYZE`（MySQL 8.0+ / PostgreSQL）：實際執行時間
3. **常見慢查詢原因**
   - 缺少 Index → Full Table Scan
   - Index 失效（函數包欄位、LIKE `%keyword%`、型別隱式轉換）
   - N+1 Query 問題
   - 大量資料 JOIN 但 JOIN 欄位無 Index
   - `SELECT *` 取出不必要欄位（影響 Covering Index 命中）
4. **優化手段**
   - 補建 Index / 複合 Index 欄位順序
   - 覆蓋索引（Covering Index）
   - 改寫 Query（避免函數包欄位、改用 JOIN 替代子查詢等）
   - 分頁查詢（避免 `OFFSET` 過深）
5. **取捨總結** — 排查流程的優先順序建議

## 非目標

- 不涵蓋 Query Cache 機制（MySQL 8.0 已移除）
- 不涵蓋讀寫分離架構層面優化（已有 #17 處理）
- 不深入 PostgreSQL pg_stat_statements（維持 MySQL 為主視角，EXPLAIN 帶到 PostgreSQL 差異即可）

## Daily Questions Challenge 分類

**Database**

## 相關現有文章備註

- [#19 Index 是如何加速查詢？](../../posts/2026-06-13-database-index.md)：B-Tree 結構、Index 失效原因已說明，本文引用並不重複，聚焦在排查流程與工具使用。
- [#17 資料庫讀寫分離](../../posts/2026-06-11-database-read-write-splitting.md)：讀寫分離是慢查詢的架構解法，非本文主題，可在取捨段落提一句連結。
