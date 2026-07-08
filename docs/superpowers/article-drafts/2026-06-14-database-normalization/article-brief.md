# Article Brief：資料庫正規化（Database Normalization）

## Working Topic

資料庫正規化（Database Normalization）：從問題出發，逐步理解 1NF、2NF、3NF，並討論反正規化的實務取捨。

## Article Type

Daily Questions Challenge — 第 **19** 題

## Category

**Database**

## Target Reader

有基礎 SQL 或後端開發經驗的工程師，準備面試或想鞏固資料庫設計基礎知識。

## Article Purpose

讓讀者能夠清楚回答「什麼是資料庫正規化？」這類面試題，理解各階段正規化解決的問題，並知道實務上何時應該反正規化。

## Core Question

**資料庫正規化是什麼？各階段分別解決什麼問題？**

## Scope

1. 問題背景：未正規化資料表的常見問題（資料冗餘、異常更新、異常刪除）
2. 第一正規化（1NF）：原子性、消除重複欄位組
3. 第二正規化（2NF）：消除部分函數相依（Partial Dependency）
4. 第三正規化（3NF）：消除遞移相依（Transitive Dependency）
5. 反正規化（Denormalization）：效能取捨的實務情境
6. 小結

## Non-Goals

- 不深入 BCNF、4NF、5NF
- 不討論 NoSQL 的設計哲學（可輕描淡寫提及）
- 不涵蓋 ORM 對應寫法

## Daily Questions Challenge Index

- 題號：#19
- 置頂索引分類：**Database**
- 新增至 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 的 `### Database` 段落

## Notes from Similar Existing Posts

- `2026-06-12-database-acid.md`（#18）：從情境出發，逐一說明概念，最後以取捨作結——本文應延續此結構。
- `2026-06-10-transaction-isolation-level.md`（#16）：使用表格比較各 Isolation Level——本文可考慮用小表格對比各正規化階段解決的異常類型。
- `2026-06-11-database-read-write-splitting.md`（#17）：有討論取捨（一致性 vs 效能）——正規化 vs 反正規化的取捨段落風格可參考此文。

## Proposed Outline

1. 為什麼需要正規化（冗餘與異常的問題）
2. 第一正規化（1NF）
3. 第二正規化（2NF）
4. 第三正規化（3NF）
5. 反正規化（Denormalization）的取捨
6. 小結
7. 參考
