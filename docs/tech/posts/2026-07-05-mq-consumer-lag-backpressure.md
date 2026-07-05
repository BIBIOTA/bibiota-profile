---
layout: doc
title: "[Daily Questions Challenge 41] Consumer Lag 監控與 Backpressure：消費速度跟不上生產速度時怎麼辦？"
description: 說明 MQ 中如何偵測 Consumer Lag、常見成因，以及 Backpressure / Flow Control 的因應手段。
date: 2026-07-05
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Message Queue
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 41] Consumer Lag 監控與 Backpressure：消費速度跟不上生產速度時怎麼辦？"
  - - meta
    - property: og:description
      content: 說明 MQ 中如何偵測 Consumer Lag、常見成因，以及 Backpressure / Flow Control 的因應手段。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 41] Consumer Lag 監控與 Backpressure：消費速度跟不上生產速度時怎麼辦？"
  - - meta
    - name: twitter:description
      content: 說明 MQ 中如何偵測 Consumer Lag、常見成因，以及 Backpressure / Flow Control 的因應手段。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 前言

在前幾篇文章中，我們討論過 MQ 如何避免訊息遺失、如何設計傳遞語義、如何水平擴展。但這些設計都有一個共同的前提：Consumer 的處理速度大致跟得上 Producer 的生產速度。

如果這個前提不成立呢？當 Producer 持續把訊息塞進佇列，而 Consumer 處理得比進來的慢，佇列裡未處理的訊息就會越堆越多。這種「消費跟不上生產」的狀態，在面試中經常被問到：你怎麼發現這個問題？發現之後又能怎麼處理？

這篇文章會以 Kafka 為主要例子，說明 Consumer Lag 這個核心監控指標，以及常見的 Backpressure（回壓）／流量控制手段。

## 核心概念：Consumer Lag

### 定義

Consumer Lag（消費延遲）指的是「某個 Consumer Group 在某個 Partition 上，還有多少訊息尚未被消費」。

以 Kafka 為例，每個 Partition 都有：

- **Log-End Offset（LEO）**：下一筆將被寫入的訊息位移，也就是目前 Partition 中最新一筆訊息之後的位置。例如 Partition 裡已經有位移 0 到 999 共 1000 筆訊息，LEO 就是 1000。
- **Committed Offset**：該 Consumer Group 針對這個 Partition，最後一次成功送出的 commit 位移，代表「已經確認處理完」的位置。

Lag 的計算方式很直觀：

```text
Lag = Log-End Offset - Committed Offset
```

例如某個 Partition 最新訊息位移是 10000，而某個 Consumer Group 提交的位移是 9500，代表還有 500 筆訊息尚未被消費，Lag 就是 500。一個 Consumer Group 的總 Lag，則是把它負責的所有 Partition 的 Lag 加總起來。

### 怎麼查看 Lag

Kafka 官方提供 `kafka-consumer-groups.sh` 工具，可以直接列出每個 Partition 的 CURRENT-OFFSET、LOG-END-OFFSET 與 LAG：

```bash
kafka-consumer-groups.sh --bootstrap-server <broker:port> --describe --group <consumer-group-name>
```

輸出會包含 TOPIC、PARTITION、CURRENT-OFFSET、LOG-END-OFFSET、LAG、CONSUMER-ID、HOST、CLIENT-ID 等欄位。實務上通常不會手動下指令盯著看，而是搭配 Prometheus + Grafana，或是專門的 Kafka 監控工具（例如社群常見的 Burrow），把 Lag 指標做成儀表板並設定告警閾值。

### 只看訊息數量 Lag 的局限

單純用「還有幾筆訊息沒消費」來衡量 Lag，有一個常被忽略的問題：不同訊息的處理成本可能差異很大。如果訊息大小或處理複雜度不均勻，同樣是 Lag 500 筆，可能是幾秒鐘可以消化完，也可能要等半小時。因此除了訊息數量的 Lag，另一種常見做法是換算成「時間維度」的 Lag，例如「最舊未處理訊息的時間戳記距今多久」，這樣更能直接反映使用者實際感受到的延遲。

## Lag 增加代表什麼？常見成因

Lag 持續上升，代表消費速度長期低於生產速度，可能的原因包括：

- **Consumer 處理邏輯變慢**：例如新增了較重的商業邏輯、外部 API 呼叫延遲增加。
- **下游依賴變慢**：Consumer 處理訊息時通常需要寫入資料庫或呼叫其他服務，下游變慢會直接拖慢整個消費速度。
- **GC 停頓或資源不足**：Consumer 所在的 Process 發生長時間 GC pause、CPU 或記憶體不足，導致處理暫停。
- **Partition 數與 Consumer 數不匹配**：如果 Consumer 數量少於 Partition 數，部分 Consumer 要負責多個 Partition，容易成為瓶頸（這部分與先前提到的 [Kafka 擴充 Partition 的雷點](./2026-07-02-kafka-partition-pitfalls.md) 有關）。
- **Producer 突然流量暴增**：例如促銷活動、批次匯入等短時間內大量寫入的情境，即使 Consumer 處理能力沒變差，也會造成短暫的 Lag 堆積。

判斷方向的關鍵，是先看 Lag 是「持續往上」還是「暫時尖峰後會回落」。持續往上代表消費能力長期不足，需要處理容量問題；暫時尖峰通常代表流量突發，等生產速度回落後 Lag 會自然消化。

## Backpressure：讓系統知道「消費不過來了」

當偵測到 Lag 異常，除了告警通知人之外，系統本身也可以有一些自動化的因應手段，統稱為 Backpressure（回壓）或 Flow Control（流量控制）。核心精神是：讓下游（消費較慢的一方）能夠把「處理不過來」這個訊號傳遞回上游，進而限制上游的生產或發送速度，避免佇列無限膨脹。

### RabbitMQ 的 Prefetch Count

RabbitMQ 提供了 `basic.qos` 機制（AMQP 0-9-1 規範的一部分），可以限制單一 Consumer 在收到 ACK 之前，最多可以持有多少筆未確認的訊息，也就是常說的 prefetch count。

設定 prefetch count 之後，RabbitMQ 會在 Consumer 還有太多未確認訊息時暫停投遞，這就形成了「Consumer 向 RabbitMQ 回壓」的效果，避免大量訊息一次湧入單一 Consumer 造成處理堆積。

實務上的取捨：

- prefetch count 設太小（例如 1）：訊息會平均分配給所有 Worker，適合處理時間長短不一或 Worker 數量多的情境，但如果設太小可能導致 RabbitMQ 頻繁等待授權而降低吞吐量。
- prefetch count 設太大：可能造成大量訊息集中送到單一 Consumer，讓其他 Consumer 閒置，反而失去水平擴展的效果。

RabbitMQ 的 Flow Control 機制其實不只作用在 Consumer 端，Channel、Queue 等內部元件之間也會層層傳遞回壓訊號，最終有可能一路回壓到 Publisher 端的連線。

### Kafka 的因應方式

Kafka 本身沒有像 RabbitMQ 那樣針對單一 Consumer 的 prefetch 機制，但可以透過以下方式達到類似效果：

- **調整 `max.poll.records` / `fetch.max.bytes`**：限制每次 poll 拉取的訊息量，避免 Consumer 一次拿到過多訊息導致處理逾時或記憶體壓力。
- **限流 Producer**：透過 Producer 端的流量控制（例如 Quota 機制），限制寫入速度，讓消費端有機會追上。
- **動態擴充 Consumer 數量**：在 Partition 數足夠的前提下增加 Consumer 實例，分攤處理負載（實際擴充時要留意先前提過的 Rebalance 成本）。

### 消費端優化與降級策略

除了對生產端限流，消費端本身也有幾種常見手段：

- **批次處理（Batching）**：把多筆訊息合併處理，降低每筆訊息的固定成本（例如資料庫連線、外部 API 呼叫）。
- **非同步化 / 平行處理**：在單一 Consumer Process 內用多執行緒或非同步方式平行處理多筆訊息，提升吞吐量。
- **優先權佇列**：當處理能力有限時，優先處理較重要的訊息，次要訊息延後或降級處理。
- **取樣或丟棄**：對於容忍度較高的場景（例如非關鍵的統計事件），在 Lag 過高時主動丟棄部分訊息，避免整體系統被拖垮。

## 告警閾值設計的取捨

Lag 監控的告警閾值不是越敏感越好：

- **閾值太低（太敏感）**：短暫的流量尖峰就會觸發告警，容易造成告警疲勞（Alert Fatigue），久而久之大家會開始忽略告警。
- **閾值太高（太遲鈍）**：等到告警觸發時，可能已經累積了大量待處理訊息，甚至已經影響到使用者體驗。

比較實務的做法，是同時關注「Lag 的絕對值」與「Lag 的變化趨勢」：例如設定「Lag 持續上升超過 N 分鐘」才觸發告警，而不是單看某一個時間點的數值，藉此過濾掉短暫尖峰造成的誤報。

## 總結

Consumer Lag 是判斷 MQ 系統「消費是否跟得上生產」最直接的指標，計算方式是 Log-End Offset 減去 Committed Offset。Lag 持續升高，代表系統長期處於消費能力不足的狀態，需要先釐清是 Consumer 處理邏輯變慢、下游依賴變慢，還是 Partition 與 Consumer 數量不匹配等結構性問題。

發現問題之後，Backpressure 提供了讓系統自動因應的手段：RabbitMQ 可以透過 prefetch count 讓消費端向佇列回壓；Kafka 則可以透過限制拉取量、限流 Producer、動態擴充 Consumer 等方式緩解。實務上通常需要監控 Lag 趨勢、設計合理的告警閾值，並在必要時搭配批次處理、優先權佇列或降級策略，才能讓系統在流量波動時仍維持穩定。

## 參考

- [Kafka Consumer Lag: Definition & Monitoring](https://www.conduktor.io/glossary/consumer-lag-monitoring)
- [Kafka Consumer Offsets Guide—Basic Principles, Insights & Enhancements](https://www.confluent.io/blog/guide-to-consumer-offsets/)
- [Manage Consumer Groups with Kafka | Confluent Documentation](https://docs.confluent.io/kafka/operations-tools/manage-consumer-groups.html)
- [Monitor Kafka Consumer Lag in Confluent Cloud | Confluent Documentation](https://docs.confluent.io/cloud/current/monitoring/monitor-lag.html)
- [Kafka Consumer Lag Is the Wrong Metric — Measure This Instead | WarpStream](https://www.warpstream.com/blog/the-kafka-metric-youre-not-using-stop-counting-messages-start-measuring-time)
- [Consumer Prefetch | RabbitMQ](https://www.rabbitmq.com/docs/consumer-prefetch)
- [Flow Control | RabbitMQ](https://www.rabbitmq.com/docs/flow-control)
