# Article Brief：RabbitMQ vs Kafka 怎麼選？

## 基本資訊

- **Working topic**：RabbitMQ vs Kafka 技術選型
- **Confirmed article type**：Daily Questions Challenge 技術文章
- **Suggested category（置頂索引）**：Backend > Message Queue

---

## 讀者

具備基本 MQ 概念（知道什麼是 Producer/Consumer、Queue）的後端工程師，正在評估或已被問到「為什麼選 Kafka 不選 RabbitMQ」（或反過來）的面試/工作情境。

---

## 文章目的

幫助讀者在面對「RabbitMQ 還是 Kafka？」這個技術選型問題時，能夠從設計哲學、功能差異與使用場景三個角度做出有根據的判斷，而不只是背表格。

---

## 核心問題

> 什麼情境下選 RabbitMQ？什麼情境下選 Kafka？選型的思考框架是什麼？

---

## 範圍（Scope）

1. **設計哲學差異**：Kafka 是 event streaming platform（以日誌為核心），RabbitMQ 是 message broker（以路由為核心），出發點不同，對應的使用場景因此不同。
2. **關鍵功能比較**（以選型視角為主）：
   - 吞吐量與延遲
   - 訊息保留與重播能力
   - 路由靈活性（RabbitMQ Exchange 類型 vs Kafka Topic）
   - 消費模型差異（push vs pull）
   - 訊息順序保證
   - 協定支援（AMQP vs Kafka 原生協定）
3. **典型使用場景對照**：
   - 適合 Kafka 的場景（大量事件流、需要重播、多個消費群組獨立消費）
   - 適合 RabbitMQ 的場景（複雜路由、任務佇列、低延遲、協定相容需求）
4. **選型決策框架**：以幾個關鍵問題引導讀者，不依賴記憶表格。

---

## 非目標（Non-goals）

- 不介紹 Kafka 的 Partition 分配與 Consumer Group 機制（已在 #33 深入說明）
- 不介紹 RabbitMQ 的 DLX/DLQ 設定（已在 #25 說明）
- 不涵蓋 Pulsar、NATS 等其他 MQ 系統的比較
- 不介紹各平台的安裝或部署細節
- 不介紹 Managed 服務（Confluent、Amazon MSK）的具體定價

---

## 文章結構建議

1. **前言**：面試中常被問到「為什麼選 Kafka？」，但很多人答不出選型理由，只是「因為 Team 在用」。
2. **兩者的設計出發點不同**：Kafka 以持久化日誌為核心（pub/sub + 可重播），RabbitMQ 以靈活路由為核心（broker 中轉，確認後即刪除）。
3. **功能對照表**（以選型維度整理）。
4. **典型場景**：
   - Kafka 適合：事件溯源、Log 聚合、多服務訂閱同一事件流、需要重播。
   - RabbitMQ 適合：任務佇列、複雜路由（Header/Topic Exchange）、需要低延遲即時確認、舊系統用 AMQP 協定。
5. **選型決策框架**：用「你需要重播嗎？吞吐量到哪個量級？路由需求複雜嗎？」幾個問題帶出結論。
6. **總結**。
7. **參考**。

---

## 現有文章備註

| 文章 | 與本文的關係 |
|------|-------------|
| [#09 使用 Message Queue 處理高併發下的排隊機制](../../posts/2026-06-03-message-queue.md) | MQ 基礎概念，可在前言或前段引用 |
| [#25 Dead Letter Queue](../../posts/2026-06-19-dead-letter-queue.md) | DLQ 比較已在此說明，本文只需提及 RabbitMQ 支援 DLX，不重複說明 |
| [#33 MQ 水平擴展機制與避免重複消費的設計](../../posts/2026-06-27-mq-horizontal-scaling-idempotency.md) | Consumer Group vs Competing Consumers 與設計差異表已說明，本文引用即可，不重複 |

---

## 撰寫注意事項

- 選型文章的重點是「什麼時候選哪個」，不是「誰比較好」，避免下絕對結論。
- 每個比較維度說明選型影響，而不只是描述差異。
- 決策框架用問題形式呈現，讓讀者能套用到自己的情境。
