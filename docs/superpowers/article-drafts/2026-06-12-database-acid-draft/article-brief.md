# Article Brief: Database ACID

## Working Topic

資料庫 ACID 是什麼？Atomicity、Consistency、Isolation、Durability 各自保證什麼？

## Confirmed Article Type

Daily Questions Challenge technical article.

預計發布日期：2026-06-12。

## Intended Reader

正在準備後端工程師面試，已經知道 transaction 的基本概念，但還無法完整說明 ACID 四個性質與實務意義的工程師。

## Article Purpose

讓讀者能用清楚、具體的方式解釋 ACID，理解每個性質保護的是哪一類資料正確性問題，並能把 ACID 和 transaction、constraint、isolation level、commit log / WAL 等資料庫機制連起來。

## Core Question

資料庫 transaction 的 ACID 是什麼？Atomicity、Consistency、Isolation、Durability 分別提供什麼保證，實務上又會如何影響系統設計？

## Scope

- 說明 ACID 在資料庫 transaction 中的角色。
- 分別介紹四個性質：
  - Atomicity：一組操作要嘛全部成功，要嘛全部回滾。
  - Consistency：交易前後資料都必須符合 schema、constraint 與商業規則。
  - Isolation：並發 transaction 之間的可見性與互相影響程度。
  - Durability：commit 後的資料即使遇到系統故障也應被保留下來。
- 使用轉帳、庫存扣減或訂單建立作為主要例子。
- 簡短說明 ACID 和資料庫效能、併發能力之間的取捨。
- 在 Isolation 段落連回既有的 Transaction Isolation Level 文章，但不重複展開四個隔離等級。

## Non-goals

- 不深入比較 MySQL、PostgreSQL、Oracle 等不同資料庫的完整實作差異。
- 不重寫 Transaction Isolation Level 的四個標準等級與 Dirty Read、Non-repeatable Read、Phantom Read。
- 不深入分散式交易、Two-Phase Commit、SAGA 或 eventual consistency。
- 不寫成特定框架或 ORM 的 transaction API 教學。

## Suggested Category

Database（Daily Questions Challenge 索引中的 Database 分類）。

## Notes From Similar Existing Posts

- `2026-06-01-race-condition-atomic-update-lock.md`：已說明 Atomic Update、悲觀鎖、樂觀鎖與欄位約束，這篇可借用庫存扣減情境，但重點放在 ACID 整體保證。
- `2026-06-10-transaction-isolation-level.md`：已深入介紹 Isolation Level 與 read anomaly，本文只在 Isolation 小節簡短銜接，避免內容重複。
- `2026-06-11-database-read-write-splitting.md`：已討論多節點資料庫的一致性取捨，本文聚焦單一資料庫 transaction 的 ACID 語意。
- Daily Questions Challenge 置頂索引已存在 `Database` 分類，且目前包含 Race Condition、Transaction Isolation Level、讀寫分離等題目，本篇適合作為下一篇資料庫基礎題。
