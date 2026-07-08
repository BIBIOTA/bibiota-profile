# Article Brief

## Working Topic

微服務的資料一致性確保方法

## Confirmed Article Type

Daily Questions Challenge — 技術面試題

## Intended Reader

後端工程師面試準備者；了解基本 ACID 與 Transaction 概念，但對微服務跨服務一致性問題尚不熟悉。

## Article Purpose

說明為何傳統分散式交易在微服務下不適用，並介紹在分散式系統中實際可行的資料一致性設計模式，幫助讀者在面試與實務中清楚回答「微服務怎麼確保資料一致性」這類問題。

## Core Question

微服務架構下，跨服務的資料異動如何確保最終一致性？

## Scope

1. **為什麼 Two-Phase Commit（2PC）在微服務下不適用** — 可用性、延遲與耦合問題
2. **Saga Pattern** — Choreography（事件驅動）vs Orchestration（中央協調）兩種模式，各自的優缺點與適用情境
3. **補償交易（Compensating Transaction）** — Saga 失敗時如何回滾
4. **Outbox Pattern** — 搭配 Message Queue 確保訊息不遺失
5. **最終一致性（Eventual Consistency）** — 思維轉換：從強一致性到可接受的延遲一致

## Non-Goals

- 不深入 Event Sourcing 的完整實作
- 不涉及 CQRS（命令查詢分離）的架構設計
- 不討論具體框架（如 Axon、Temporal）的安裝與配置

## Suggested DQC Index Category

`Backend`（延伸既有分類，不新增分類）

## Notes from Similar Existing Posts

- `2026-06-12-database-acid.md`：讀者已知 ACID 概念，文章可直接引用「原子性」做對比
- `2026-06-03-message-queue.md`：Outbox Pattern 可直接連結此篇，說明 Message Queue 如何扮演非同步傳遞角色
- `2026-06-19-dead-letter-queue.md`：補償交易失敗場景可提及 DLQ 作為容錯機制
- `2026-06-02-redis-distributed-lock.md`：可簡短說明分散式鎖不能解決跨服務一致性問題，作為引入 Saga 的動機

## Draft Folder

`docs/superpowers/article-drafts/2026-06-21-microservices-data-consistency-draft/`

> slug 與最終日期由 `blog-metadata-planning` 確認。
