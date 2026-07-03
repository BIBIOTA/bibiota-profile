# Article Brief

## Working Topic

訊息傳遞語義總覽：At-most-once、At-least-once、Exactly-once

## Confirmed Article Type

Daily Questions Challenge 技術文章（Message Queue 分類）

## Intended Reader

準備後端 / 系統設計面試的工程師，已讀過本站 MQ 系列文章（訊息佇列基礎、DLQ、水平擴展與冪等、RabbitMQ vs Kafka、Kafka Partition 雷點、Kafka 訊息不遺失），想把「傳遞語義」這個常被面試官追問、但目前系列中只散落提及的概念做一次系統性整理。

## Article Purpose

把 MQ 系列文章中分散提到的可靠性保證（冪等性設計、offset commit、manual ack、acks 設定等）收斂成一個清楚的分類框架，說明三種傳遞語義的定義、成因與各家 MQ（Kafka、RabbitMQ）如何實作/逼近每一種語義，並作為整個 Message Queue 系列的總結性文章。

## Core Question The Article Answers

At-most-once、At-least-once、Exactly-once 三種訊息傳遞語義分別是什麼？造成語義差異的關鍵設計點在哪裡（ack 時機、offset commit 時機、producer 重試）？Kafka 與 RabbitMQ 各自如何達成或逼近 Exactly-once？

## Scope

- 三種語義的定義與判斷標準（訊息會不會遺失、會不會重複）
- 語義差異的根本原因：producer 端的 ack/retry 策略、consumer 端的 ack/commit 時機（先處理後 commit vs 先 commit 後處理）
- Kafka 的實作對應：acks 設定（回顧自 2026-07-03 文章）、consumer offset commit 策略、Idempotent Producer 與 Transactional API 如何逼近 Exactly-once
- RabbitMQ 的實作對應：Publisher Confirm、Consumer Manual Ack、以及為何 RabbitMQ 原生較難做到嚴格 Exactly-once
- 應用層冪等性設計作為 Exactly-once 語義的常見補強手段（連結回 2026-06-27 水平擴展與冪等文章）
- 一張總結表格：語義 × 是否遺失 × 是否重複 × 對應設定

## Non-goals

- 不重複展開 Kafka Partition Rebalance、DLQ 設計細節等其他子主題（已有獨立文章，僅做連結引用）
- 不深入比較 Kafka Streams / Exactly-Once Processing（EOS in stream processing）等進階串流語義，聚焦在基本的 produce/consume 語義
- 不涵蓋雲端 MQ 服務（SQS、Pub/Sub）的語義實作細節

## Suggested Category

Message Queue（延續 2026-05-26 Daily Questions Challenge 置頂索引中的分類）

## Notes From Similar Existing Posts

- `2026-06-27-mq-horizontal-scaling-idempotency.md`：已談到 offset commit、manual ack 與冪等性設計，本篇應避免重複展開細節，改為引用並在此基礎上做語義分類整理
- `2026-07-03-kafka-message-durability.md`：已詳細說明 acks、Replication Factor、ISR，本篇談 Kafka 語義時應引用該文，聚焦在「語義」而非重複解說可靠性機制本身
- `2026-06-30-rabbitmq-vs-kafka.md`：可作為 RabbitMQ vs Kafka 設計哲學的背景連結
- 系列文章標題慣例為 `[Daily Questions Challenge NN] 標題`，avatar 統一使用 `/daily-questions-challenge.png`，tags 慣例為 `Backend`、`System Design` 或 `Message Queue`、`Kafka`（依內容偏重選擇）
