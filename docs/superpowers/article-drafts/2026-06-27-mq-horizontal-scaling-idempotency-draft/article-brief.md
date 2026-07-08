# Article Brief

## Working Topic

MQ 水平擴展機制與避免重複消費的設計

## Article Type

Daily Questions Challenge — #33

## Intended Reader

有基本 MQ 概念（知道 Producer/Consumer 模型）的後端工程師，準備系統設計面試，希望理解 MQ 在水平擴展後的架構行為與去重設計。

## Article Purpose

補完 MQ 系列尚未涵蓋的擴展與冪等性主題，讓讀者在面試時能完整說明「MQ 如何擴展」以及「如何避免重複消費」。

## Core Question

當 MQ Consumer 水平擴展（增加多個 Consumer 實例）時，訊息是如何被分配的？擴展後又如何確保同一則訊息不被重複處理？

## Scope

### 水平擴展機制
- **Kafka**：Consumer Group 概念，Partition 與 Consumer 的對應關係（1 Partition → 至多 1 Consumer in Group），Rebalance 觸發時機與流程
- **RabbitMQ**：Competing Consumers Pattern，多個 Consumer 綁定同一 Queue，訊息由 Broker 依序派發（round-robin / 公平分發）
- 兩者架構對比（Mermaid 圖）

### 訊息投遞語意
- At-least-once（至少一次）vs Exactly-once（恰好一次）
- 說明為什麼 At-least-once 是 MQ 的預設保證，以及在什麼情境下重複消費是固有風險（Consumer 崩潰後 re-delivery）

### 避免重複消費（冪等性設計）
- **Kafka Offset Commit 策略**：Auto commit vs Manual commit（commitSync / commitAsync），以及 enable.auto.commit=false 配合處理完再 commit 的標準做法；說明 Offset commit 與重複消費的關係
- **RabbitMQ Consumer ACK 機制**：`autoAck=false` 配合手動 `basicAck` / `basicNack`，說明 Consumer crash 後 Broker re-deliver 的行為，以及與 Kafka Offset Commit 的對等關係
- **通用冪等性（Idempotency）方案**（兩個平台都適用）：
  - Message Deduplication ID（SQS 原生支援）
  - 資料庫唯一索引（unique constraint + upsert）
  - Redis 分布式去重（SET NX + TTL）
  - Idempotent Consumer pattern 概念

### Mermaid 圖規劃
1. Kafka Consumer Group 架構：3 個 Partition × 2 個 Consumer 的分配關係
2. RabbitMQ Competing Consumers：多個 Consumer 競爭同一 Queue
3. 重複消費場景：Consumer 處理完但 crash 在 Ack 之前 → Broker re-deliver
4. 冪等性處理流程：收到訊息 → 查重複 ID → 已存在則跳過 → 否則處理並記錄 ID

## Non-Goals

- Producer 端的訊息持久化與 Ack 機制（另一個主題）
- DLQ 機制（已由 #25 涵蓋）
- Kafka Streams、KSQL 或 Stream Processing
- Exactly-once 的完整實作細節（Kafka Transactions API）— 可提及概念但不深入

## Suggested Category

Backend（與 #09 Message Queue、#25 DLQ 同類）

## Notes from Similar Existing Posts

- `2026-06-03-message-queue.md`（#09）：已說明 MQ 基本概念、Producer/Consumer、削峰填谷。本篇應從「Consumer 水平擴展後會發生什麼」切入，自然銜接。
- `2026-06-19-dead-letter-queue.md`（#25）：已說明 Consumer 失敗後的 DLQ 路由。本篇的「重複消費」場景可引用 #25 中的 ACK/NACK 機制作為背景知識，不需重複說明 DLQ 本身。
- 文章風格參考 `2026-06-25-sharding-partitioning.md`（#31）：有多個 Mermaid 圖、表格對比、明確分節，適合本篇的架構圖密度。

## Draft Folder

`docs/superpowers/article-drafts/2026-06-27-mq-horizontal-scaling-idempotency-draft/`
