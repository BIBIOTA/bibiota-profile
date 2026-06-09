# Article Brief: 資料庫的 Transaction Isolation Level

## Working Topic
資料庫的 Transaction Isolation Level — 四種隔離等級與 Read Anomaly 的對照與取捨

## Article Type
Daily Questions Challenge — 技術文章

## Intended Reader
有基礎 SQL 概念、正在準備後端面試的工程師。

## Article Purpose
讓讀者能清楚說明 Transaction Isolation Level 的四個等級各自解決什麼問題、帶來什麼代價，並知道 MySQL 的預設行為。

## Core Question
資料庫的 Transaction Isolation Level 有哪些？各自提供什麼保證、有什麼取捨？

## Scope
- 什麼是 Transaction Isolation，為什麼需要它（併發下的資料一致性問題）
- 三種 Read Anomaly：Dirty Read、Non-repeatable Read、Phantom Read
- 四個標準 Isolation Level（ANSI SQL）：
  - Read Uncommitted
  - Read Committed
  - Repeatable Read
  - Serializable
- **每個 Isolation Level 各附一個 Mermaid sequence diagram**，用兩個併發 Transaction 的互動來示範該 Level 下會發生（或被防止）的 Anomaly
- 各 Level 防止哪些 Anomaly 的對照表
- 實務取捨：效能 vs 一致性
- MySQL 預設（Repeatable Read + MVCC 補充）

## Non-Goals
- 分散式 Transaction（2PC、SAGA）
- 具體 Lock 類型實作細節（已有獨立文章 2026-06-01）
- PostgreSQL、Oracle 等資料庫詳細比較

## Suggested Category
Backend（Daily Questions Challenge 索引中的 Backend 分類）

## Notes from Similar Existing Posts
- `2026-06-01-race-condition-atomic-update-lock.md`：介紹悲觀鎖、樂觀鎖、Atomic Update，本文不重複這些 Lock 機制，但可在前言中提到 Isolation Level 是比 Lock 更高層的資料庫保證。
- 文章編號預計為 **#15**（依索引現有 00–14 推算）。
- 日期：2026-06-10
