# Article Metadata：Kafka 擴充 Partition 的雷點

## Frontmatter

```yaml
layout: doc
title: "[Daily Questions Challenge 38] Kafka 擴充 Partition 的雷點"
description: 說明 Kafka Topic 新增 Partition 時的四個常見雷點：Key 路由錯位、Consumer Group Rebalance 停頓、操作不可逆，以及 Rebalance 期間的重複消費風險。
date: 2026-07-02
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Message Queue
  - Kafka
```

## 檔案資訊

- **target path**：`docs/tech/posts/2026-07-02-kafka-partition-pitfalls.md`
- **slug**：`2026-07-02-kafka-partition-pitfalls`
- **pinned**：不設定

## Daily Questions Challenge 索引異動

- **Challenge 編號**：#38
- **pinned index 分類**：新建 `### Message Queue`，放在 `### Backend` 之後

### 從 Backend 移入 Message Queue 的既有文章

- [使用 Message Queue 處理高併發下的排隊機制](./2026-06-03-message-queue.md)
- [Dead Letter Queue（DLQ）：訊息處理失敗後的機制設計](./2026-06-19-dead-letter-queue.md)
- [MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md)
- [RabbitMQ vs Kafka：如何選擇適合的訊息佇列？](./2026-06-30-rabbitmq-vs-kafka.md)

### 新增至 Message Queue 的本文

- [Kafka 擴充 Partition 的雷點](./2026-07-02-kafka-partition-pitfalls.md)
