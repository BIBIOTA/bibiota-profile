# Article Brief

## Working Topic

Event-Driven Architecture 的設計模式：Choreography 與 Orchestration 的選型

## Confirmed Article Type

Daily Questions Challenge — Message Queue 分類

## Intended Reader

有微服務開發背景、正在準備後端面試的工程師，了解 Kafka/RabbitMQ 基礎概念，但對事件驅動架構的設計決策不夠熟悉。

## Article Purpose

從 MQ 的架構設計角度說明：當一個業務流程橫跨多個服務時，「事件驅動（Choreography）」與「中央協調（Orchestration）」兩種模式在 Topic 設計、耦合程度、可觀察性上的根本差異，以及面試中如何清楚闡述選型依據。

## Core Question

「設計 Event-Driven 系統時，要讓各服務各自訂閱事件自行協作，還是用 Orchestrator 統一指揮？這兩種模式有什麼本質差異，又該如何選擇？」

## Scope

- Choreography 模式：服務發布事件、其他服務訂閱，去中心化協作
- Orchestration 模式：中央 Orchestrator 服務依序呼叫其他服務
- 兩者在 MQ 設計上的差異：Topic 數量、事件命名、Consumer Group 設計
- 選型依據：流程複雜度、可觀察性需求、團隊規模
- 常見挑戰：Choreography 的事件鏈追蹤困難、Orchestration 的 Orchestrator 成為瓶頸
- 實務建議：何時混用兩種模式

## Non-Goals

- 不重複 Saga 補償交易的細節（#27 已涵蓋）
- 不深入 Exactly-once 語義（#40 已涵蓋）
- 不介紹 Event Sourcing / CQRS 完整架構（超出本篇範圍）
- 不做 Kafka vs RabbitMQ 工具比較（#33 已涵蓋）

## Suggested Daily Questions Challenge Number

#42（接續 #41 Consumer Lag，2026-07-05）

## Notes from Similar Existing Posts

- **#27（2026-06-21）微服務資料一致性**：已用 Saga 視角介紹 Choreography/Orchestration 概念，本篇需避免重複「補償交易」說明，改從 MQ Topic 設計與流程可見性切入，可於文章開頭引用 #27 作為前置知識
- **#09（2026-06-03）MQ 基礎**：Producer/Consumer 模型基礎，可作為本篇的技術前提
- **#33（2026-06-30）RabbitMQ vs Kafka**：工具選型已有，本篇聚焦架構模式，不重複工具比較
