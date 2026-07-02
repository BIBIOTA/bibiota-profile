# Article Brief：Kafka 擴充 Partition 的雷點

## 基本資訊

- **Working Topic**：Kafka 擴充 Partition 的雷點
- **Article Type**：Daily Questions Challenge 技術文章（#38）
- **Date**：2026-07-02
- **Intended Reader**：準備後端面試的工程師，已具備 Kafka 基本概念

## 目的

說明在 Kafka Topic 增加 Partition 數量時，容易被忽略的四個雷點，讓讀者在面試或實際操作前能提前預見風險。

## 核心問題

> 「在 Kafka Topic 上增加 Partition 數量時，有哪些常見踩雷點？」

## 範圍

1. **Key-based 路由錯位**：`hash(key) % partition_count` 結果改變，原本同 key 的訊息可能落到不同 Partition，破壞訊息有序性
2. **Consumer Group Rebalance**：新增 Partition 觸發 rebalance，造成短暫消費停頓（stop-the-world）
3. **Partition 只能加不能減**：Kafka 不支援縮減 Partition 數量，操作不可逆
4. **Rebalance 期間可能重複消費**：offset 未及時 commit 時的風險

## Non-goals

- Kafka 基本概念（已在 #33、#36 介紹過，直接連結即可）
- Partition 擴充的 CLI 操作步驟（偏 ops 教學，非面試重點）
- Kafka 效能調校（範圍過大）

## Daily Questions Challenge 分類

- **新分類**：`### Message Queue`（MQ 獨立分類，見下方說明）
- 本文放入此新分類

## 索引重組需求（index 異動）

使用者確認，在寫入本文連結時，同步將以下既有文章從 `### Backend` 移至新建立的 `### Message Queue` 分類：

| 文章 | 現有分類 |
|------|---------|
| [使用 Message Queue 處理高併發下的排隊機制](./2026-06-03-message-queue.md) | Backend |
| [Dead Letter Queue（DLQ）：訊息處理失敗後的機制設計](./2026-06-19-dead-letter-queue.md) | Backend |
| [MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md) | Backend |
| [RabbitMQ vs Kafka：如何選擇適合的訊息佇列？](./2026-06-30-rabbitmq-vs-kafka.md) | Backend |
| 本文（#38 Kafka 擴充 Partition 的雷點） | 新增至 Message Queue |

新分類建議放在 `### Backend` 之後。

## 相關既有文章（供撰文時連結）

- `#09` [使用 Message Queue 處理高併發下的排隊機制](./2026-06-03-message-queue.md)
- `#33` [MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md)
- `#36` [RabbitMQ vs Kafka：如何選擇適合的訊息佇列？](./2026-06-30-rabbitmq-vs-kafka.md)
