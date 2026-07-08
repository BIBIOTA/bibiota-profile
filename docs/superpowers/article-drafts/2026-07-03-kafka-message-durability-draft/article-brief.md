# Article Brief：Kafka 如何保證訊息不遺失

## Working Topic

Kafka 如何保證訊息不遺失（Producer acks、Replication、ISR）

## Article Type

Daily Questions Challenge — #39

## Intended Reader

後端工程師或準備系統設計面試的人，已知道 MQ 基本概念（Producer/Consumer/Broker），但對 Kafka 可靠性機制（Producer 端 acks、Broker 端 Replication）不熟悉。

## Article Purpose

補齊 MQ 系列在「Producer 可靠性」面向的缺口。#09 提到「需要設定持久化機制」但一筆帶過；#33 聚焦 Consumer 端確認機制（Offset Commit）。本篇從全鏈路角度說明 Kafka 在三個階段防止訊息遺失的設計，並說明設定之間的取捨。

## Core Question the Article Answers

**Kafka 訊息在哪些階段可能遺失？每個階段有哪些設定可以防範？**

## Scope

### 三個潛在遺失點與對應機制

1. **Producer → Broker（傳送階段）**
   - `acks` 設定：`0`（不等確認）、`1`（Leader 確認）、`all/-1`（所有 ISR 確認）
   - `retries` 與 `enable.idempotence`：Producer 重試與冪等保證

2. **Broker 儲存（持久化階段）**
   - Replication Factor：副本數量
   - ISR（In-Sync Replicas）：同步副本集合的運作原理
   - `min.insync.replicas`：最少需要多少個 ISR 副本確認才允許寫入
   - `acks=all` + `min.insync.replicas=2` 的組合才是真正的強持久化保證

3. **Consumer 端（消費確認階段）**
   - 已在 #33 深入介紹（Offset Commit），本篇以一句話帶到並交叉引用，不重複

### 可靠性 vs 吞吐量的取捨

- `acks=0`：最高吞吐量，完全無保證
- `acks=1`：中等，Leader crash 仍可能遺失
- `acks=all`：最強保證，寫入延遲最高
- 各設定的適用場景舉例

## Non-Goals

- 不涵蓋 Kafka Streams / ksqlDB 等流處理框架
- 不涵蓋 Kafka Schema Registry、序列化格式（Avro/Protobuf）
- Consumer 端冪等性設計（已在 #33 完整介紹，本篇只交叉引用）
- Exactly-once Transactional API（可留給未來獨立一篇）

## Suggested Category (Daily Questions Challenge Index)

**Message Queue**（與 #09、#25、#33、#36、#38 同一分類）

## Notes from Similar Existing Posts

- **#09**（2026-06-03）：提到「訊息遺失需要持久化機制，可寫入 Disk」，但無具體設定說明 → 本篇是 #09 的深入補完
- **#33**（2026-06-27）：詳細說明 Consumer 端 Offset Commit 與 ACK 機制 → 本篇可交叉引用，避免重複
- **#38**（2026-07-02）：提到 Rebalance 期間的重複消費 → 本篇聚焦「不遺失」而非「不重複」，兩者互補

## Suggested Article Structure

1. 前言：從面試場景引入（「你們如何確保訊息不會遺失？」）
2. 訊息在哪三個階段可能遺失（流程圖）
3. Producer 端：acks 設定詳解與比較表
4. Broker 端：Replication、ISR、min.insync.replicas 的組合邏輯
5. Consumer 端：一段話交叉引用 #33，不展開
6. 設定組合範例（常見的生產環境推薦設定）
7. 總結（含取捨說明）
8. 參考資料

## Draft Info

- Candidate date: 2026-07-03
- Candidate slug: `2026-07-03-kafka-message-durability`
- Candidate number: #39
- Category: Message Queue
