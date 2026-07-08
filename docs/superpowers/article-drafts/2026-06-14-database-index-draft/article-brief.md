# Article Brief: Index 是如何加速查詢

## Working Topic

Index 是如何加速查詢（How Database Index Accelerates Queries）

## Article Type

Daily Questions Challenge — Database 分類（預計編號 #19）

## Intended Reader

有基本 SQL 使用經驗的後端工程師，知道怎麼寫 SELECT 和 WHERE，但對 Index 底層運作原理不熟悉，或在面試被問到 Index 原理時答不完整的人。

## Article Purpose

讓讀者能清楚說明 Index 底層原理（以 B-Tree 為核心），理解為什麼加了 Index 查詢會變快，以及什麼情況下 Index 不會被用到，並能在面試中給出有結構的回答。

## Core Question

資料庫 Index 底層是如何運作的，為什麼能加速查詢，又有哪些限制與成本？

## Scope

1. 沒有 Index 時查詢怎麼做（Full Table Scan 的問題）
2. B-Tree Index 的結構與查找原理（log N 複雜度）
3. Index 在 WHERE、ORDER BY、JOIN 的應用場景
4. Index 失效的常見情況（函數包欄位、LIKE 前綴萬用字元、型別不符等）
5. Index 的成本：寫入效能下降、儲存空間增加
6. 實務取捨：哪些欄位值得建 Index

## Non-Goals

- 深入比較所有 index 類型（Hash、Full-text、GiST、GIN）：可簡短提及，但不展開
- 各資料庫引擎底層實作差異：以 MySQL InnoDB / PostgreSQL 為主要範例，不逐一比較
- Composite Index 與 Covering Index 的進階設計：可點到但不作為主軸
- EXPLAIN / EXPLAIN ANALYZE 的詳細使用教學

## Suggested Category

Daily Questions Challenge > Database

## Notes from Similar Existing Posts

- `2026-06-10-transaction-isolation-level.md`（#16）：也是 Database 主題，結構為「問題情境 → 核心概念 → 實務取捨 → 面試提示」，本篇可沿用類似結構
- `2026-06-12-database-acid.md`（#18）：使用訂單/課程報名情境引導讀者，本篇可用「搜尋使用者」或「查詢訂單」等情境說明 Full Table Scan vs Index Scan 的差異
- 現有 Database 分類文章都有明確的面試導向收尾（說明面試怎麼回答），本篇應維持此慣例
