# Article Brief

## Working Topic

Consumer Lag 監控與 Backpressure：當消費速度跟不上生產速度時該怎麼辦

## Confirmed Article Type

Daily Questions Challenge 技術文章（Message Queue 分類）

## Intended Reader

準備後端 / 系統設計面試的工程師，已經理解 MQ 基本概念、DLQ、水平擴展與冪等性、Kafka/RabbitMQ 差異、Partition 機制、訊息不遺失與傳遞語義，現在要進一步理解「消費端跟不上生產端」這個常見面試延伸問題。

## Article Purpose

說明當 Consumer 處理速度低於 Producer 產生訊息的速度時，系統會出現什麼徵兆、如何監控（尤其是 Consumer Lag 這個核心指標），以及有哪些 Backpressure / Flow Control 手段可以緩解或解決問題。

## Core Question The Article Answers

MQ 系統中如何偵測「消費跟不上生產」的狀況？偵測到之後有哪些設計手段（監控指標、告警、Backpressure 機制）可以因應？

## Scope

- Consumer Lag 的定義與計算方式（以 Kafka 為主要例子，例如 log-end-offset 與 committed-offset 的差距）
- 常見監控工具與指標（Kafka Consumer Group Lag、Burrow、Prometheus/Grafana 常見做法概念性介紹）
- Lag 增加代表的可能原因（消費者處理慢、GC 停頓、下游依賴變慢、Partition 數與消費者數不匹配等）
- Backpressure / Flow Control 手段：
  - 限流生產端（Producer-side throttling）
  - 動態增加 Consumer / Partition（搭配之前擴展/Rebalance 相關限制）
  - 消費端批次處理、非同步化、水平擴展
  - 佇列滿載時的降級策略（丟棄、取樣、優先權佇列）
- 告警閾值設計的取捨（太敏感 vs 太遲鈍）

## Non-goals

- 不深入 Consumer Group Rebalance 演算法細節（已規劃為未來獨立主題）
- 不深入特定雲端服務（如 AWS SQS、GCP Pub/Sub）的專屬監控 API 操作教學
- 不涉及訊息順序保證的設計（已有其他候選主題）

## Suggested Category

Message Queue（沿用 Daily Questions Challenge 置頂索引既有分類）

## Notes From Similar Existing Posts

- `2026-06-27-mq-horizontal-scaling-idempotency.md`：已經談過水平擴展與冪等性，本文可以呼應「增加 Consumer 數量」這個手段，但重點放在「如何偵測需要擴展」而非擴展本身怎麼做。
- `2026-07-02-kafka-partition-pitfalls.md`：已提到 Partition 數與消費者數的關係，本文可引用但不重複解釋 Partition 擴充的雷點。
- `2026-07-04-mq-delivery-semantics.md`：語義總覽文章著重「訊息會不會遺失/重複」，本文著重「系統跟不上時怎麼辦」，屬於互補但不同角度。
- 預估文章編號：延續 [Daily Questions Challenge 40]，本文為 [Daily Questions Challenge 41]。
