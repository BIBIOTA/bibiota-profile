---
layout: doc
title: "[Daily Questions Challenge 38] Kafka 擴充 Partition 的雷點"
description: 說明 Kafka Topic 新增 Partition 時的四個常見雷點：Key 路由錯位、Consumer Group Rebalance 停頓、操作不可逆，以及 Rebalance 期間的重複消費風險。
date: 2026-07-02
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Message Queue
  - Kafka
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 38] Kafka 擴充 Partition 的雷點"
  - - meta
    - property: og:description
      content: 說明 Kafka Topic 新增 Partition 時的四個常見雷點：Key 路由錯位、Consumer Group Rebalance 停頓、操作不可逆，以及 Rebalance 期間的重複消費風險。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 38] Kafka 擴充 Partition 的雷點"
  - - meta
    - name: twitter:description
      content: 說明 Kafka Topic 新增 Partition 時的四個常見雷點：Key 路由錯位、Consumer Group Rebalance 停頓、操作不可逆，以及 Rebalance 期間的重複消費風險。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在 [#33 MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md) 中提到，Kafka Consumer Group 的最大並行度由 Partition 數量決定——當 Consumer 數量超過 Partition 數量時，多出來的 Consumer 會閒置。因此，當系統流量成長、想要增加更多 Consumer 實例時，就必須先提高 Partition 數量。

這個操作聽起來很直覺，但背後有四個容易被忽略的雷點。

---

## 雷點一：Key 路由錯位，有序性被打破

Kafka Producer 在使用 Key 傳送訊息時，預設分配規則是：

```
Partition = hash(key) % partition_count
```

當 `partition_count` 改變，同一個 Key 算出來的目標 Partition 就可能不同。

舉例來說，原本有 4 個 Partition，`user_id = 123` 的訊息一直落在 Partition 2；擴充到 6 個 Partition 後，同樣的 Key 可能改落到 Partition 5。

**問題在哪？**

Kafka 只保證 **Partition 內部** 的訊息有序。如果系統依賴「同一個 Key 的訊息一定按順序到達」——例如同一個使用者的操作序列必須依序處理——那麼 Partition 數量變動後，新訊息可能比舊訊息更早被消費，有序性假設就此失效。

更關鍵的是，**Kafka 不會重新分配已存在的舊訊息**。擴充後，舊訊息仍留在原本的 Partition，新訊息卻流進了不同的 Partition，新舊訊息之間的相對順序無法保證。

> 如果系統對 Key 有嚴格的有序性需求，擴充 Partition 前需要評估影響範圍，並在必要時搭配業務層的冪等性設計來容錯。

---

## 雷點二：Consumer Group Rebalance 造成消費停頓

新增 Partition 是觸發 Kafka Consumer Group Rebalance 的條件之一（其他條件包含 Consumer 加入或離開 Group）。Rebalance 期間，Kafka 需要重新計算各 Consumer 負責哪些 Partition。

### Eager Rebalancing（舊版行為）

舊版 Kafka 使用 **Eager Rebalancing（積極重新分配）**：Rebalance 一旦觸發，Group 內**所有** Consumer 都必須先放棄手上的 Partition，等待重新分配完成才能繼續消費。這是一種 stop-the-world 的行為，停頓時間視 Consumer 數量與網路狀況而定。

### Incremental Cooperative Rebalancing（Kafka 2.4+）

Kafka 2.4 引入了 **Incremental Cooperative Rebalancing（KIP-429）**：只有真正需要移動的 Partition 會被撤回，其餘 Consumer 可以繼續消費。相較於舊版，停頓的影響範圍大幅縮小。

> 在生產環境中，確認 Kafka 版本與 Consumer 設定是否已啟用 Cooperative Rebalancing，是評估擴充影響的第一步。

---

## 雷點三：Partition 只能加，不能減

Kafka 的 Partition 是**單向操作**——只能增加，無法縮減。

這個限制來自 Kafka 的設計：Partition 是一個只能追加（append-only）的不可變 Log，訊息的 Offset 是固定的。如果允許縮減 Partition，就必須重寫 Offset 或搬移訊息，這會破壞所有 Consumer 正在追蹤的位置，帶來難以一致解決的一致性問題。

**實際影響**：如果擴充後發現 Partition 數量設定過多（例如造成 Broker 負擔過重、Leader Election 時間過長），**唯一的回退方案是刪除並重建 Topic**，代價是現有訊息全數消失，Consumer Offset 也需要重置。

> 擴充前應謹慎評估目標數量，避免過度擴充。Confluent 文件建議從較小的數量出發，逐步增加，而非一次到位。

---

## 雷點四：Rebalance 期間可能重複消費

Rebalance 觸發時，Consumer 需要在放棄 Partition 之前提交（commit）目前的消費進度（Offset）。如果在此之前 Offset **尚未提交**，Rebalance 完成後接手該 Partition 的 Consumer 會從上次提交的位置開始重新消費，造成重複處理。

這不是邊緣情況，而是 Kafka 的預期行為：**at-least-once delivery（至少一次投遞）**是 Kafka 的預設語義，重複消費是可能發生的。

常見的導致重複消費的情境：

- 使用自動 Commit（`enable.auto.commit=true`），但 Commit 週期（`auto.commit.interval.ms`）內訊息尚未被處理完就觸發了 Rebalance
- Consumer 在處理訊息時崩潰，Offset 未提交

> 應對方式是在業務邏輯中加入**冪等性（Idempotency）**設計，確保同一則訊息被處理兩次不會產生副作用。詳見 [#33 MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md)。

---

## 總結

| 雷點 | 根本原因 | 因應方向 |
|------|---------|---------|
| Key 路由錯位 | `hash(key) % partition_count` 改變，舊訊息不重新分配 | 業務層冪等性；評估有序性影響範圍 |
| Rebalance 停頓 | 所有 Consumer 需重新協調 Partition 歸屬 | 升級至 Kafka 2.4+，啟用 Cooperative Rebalancing |
| 操作不可逆 | Partition 是不可變 Log，縮減需重寫 Offset | 謹慎規劃目標數量，避免過度擴充 |
| 重複消費 | Offset 未及時提交，Rebalance 後從舊位置重讀 | 業務層冪等性；手動管理 Offset Commit |

Kafka 的 Partition 擴充本身並不複雜，但它的影響面比 `kafka-topics.sh --alter` 這行指令看起來的要廣：路由邏輯、消費連續性、叢集穩定性都可能受到牽連。面試中被問到這個主題時，能具體說出這四個雷點，並針對各自提出對應方向，是比「直接加就好」更有說服力的回答。

---

## 參考

- [Choose and Change the Partition Count in Kafka | Confluent Documentation](https://docs.confluent.io/kafka/operations-tools/partition-determination.html)
- [When You Increase Kafka Partitions | Arpit Bhayani](https://arpitbhayani.me/blogs/kafka-partitions/)
- [Incremental Cooperative Rebalancing in Apache Kafka | Confluent Blog](https://www.confluent.io/blog/incremental-cooperative-rebalancing-in-kafka/)
- [KIP-429: Kafka Consumer Incremental Rebalance Protocol | Apache Kafka Wiki](https://cwiki.apache.org/confluence/display/KAFKA/KIP-429:+Kafka+Consumer+Incremental+Rebalance+Protocol)
- [Kafka Partition Scaling Problems | AutoMQ Blog](https://www.automq.com/blog/kafka-partition-scaling-problems-when-more-partitions-create-more-operations-risk)
