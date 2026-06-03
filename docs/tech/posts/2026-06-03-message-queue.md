---
layout: doc
title: "[Daily Questions Challenge 09] 使用 Message Queue 處理高併發下的排隊機制"
description: 介紹如何透過 Message Queue 的生產者與消費者模型，解決高併發場景下的效能瓶頸，實現削峰填谷與將並行轉為串行。
date: 2026-06-03
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - System Design
  - Message Queue
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 09] 使用 Message Queue 處理高併發下的排隊機制"
  - - meta
    - property: og:description
      content: 介紹如何透過 Message Queue 的生產者與消費者模型，解決高併發場景下的效能瓶頸，實現削峰填谷與將並行轉為串行。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 09] 使用 Message Queue 處理高併發下的排隊機制"
  - - meta
    - name: twitter:description
      content: 介紹如何透過 Message Queue 的生產者與消費者模型，解決高併發場景下的效能瓶頸，實現削峰填谷與將並行轉為串行。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在上一篇 [使用 Redis 分布式鎖避免 Race Condition](./2026-06-02-redis-distributed-lock.md) 文章中，我們探討了如何利用 Redis 實作分布式鎖（Distributed Lock）來解決微服務架構下的 Race Condition 問題。透過 Redis 的單執行緒特性與原子性操作，我們能有效地確保同一時間只有一個 Request 能夠修改關鍵資料。

然而，當系統面臨「瞬間湧入數萬筆請求」的極端場景（例如：限量商品秒殺活動、搶票系統）時，單純依賴分布式鎖仍然會發生**效能瓶頸**。

當幾萬個 Request 同時去搶同一把 Redis 鎖，最終只有一個能搶到，剩下的 Request 只能不斷重試或直接失敗。這不僅會對 Redis 造成極大的連線與 CPU 負擔，也會佔用應用程式伺服器的 Thread 資源，最終可能導致整個系統被拖垮。

為了解決這個「大家擠在門口搶同一把鑰匙」的問題，我們需要引入 **Message Queue（訊息佇列）**。

---

## Message Queue 的核心概念

Message Queue（簡稱 MQ，常見的工具有 RabbitMQ、Kafka 等）本質上是一個用於傳遞訊息的中介軟體。它基於生產者與消費者模型（Producer-Consumer Model）運作：

- **Producer（生產者）：** 負責接收使用者的 Request，並將這些 Request 轉換成「訊息」丟進 Queue 裡面。
- **Broker（訊息代理）：** 負責暫存與管理這些訊息，確保訊息的安全與排序。
- **Consumer（消費者）：** 負責從 Queue 裡面把訊息取出來，並實際執行後續的商業邏輯（例如：扣減庫存、寫入資料庫）。

---

## MQ 如何解決高併發與搶鎖問題？

導入 MQ 後，我們就可以把系統處理 Request，從「同步等待」轉變為「非同步處理」，得到以下兩個好處：

### 1. 削峰填谷（Traffic Shaping）

當瞬間湧入上萬筆請求時，我們不再讓這些請求直接打進資料庫或去搶 Redis 鎖。相反地，API Server（Producer）只要快速把這些請求寫入 MQ，就能立刻回覆使用者：「您的請求已受理，正在排隊處理中」。

MQ 就像是一個巨大的水庫，把瞬間爆發的流量（洪峰）擋下來，接著讓後端的 Consumer 依照自身能承受的速度（填谷），平穩地從 Queue 中取出訊息慢慢消化。如此一來，資料庫與 Redis 都不會再面臨瞬間被擊垮的風險。

### 2. 將「並行」轉為「串行」

原本是一萬個並行（Concurrent）的 Request 在爭搶同一個資源；透過 MQ，我們可以將針對同一個商品的請求放進同一個 Queue（或 Partition），並只讓一個 Consumer 單執行緒地依序處理。

**當所有的請求都變成了「排隊輪流處理（串行）」，Race Condition 就不存在了，我們甚至可以大幅減少對分布式鎖的依賴。**

---

## 導入 MQ 需要留意的挑戰

在導入 MQ 的實作中，必須考慮以下幾點：

- **訊息遺失（Message Loss）：** 萬一伺服器當機，訊息是否會不見？我們需要設定合理的持久化（Persistence）機制。為了確保服務中斷或重啟能夠處理過去的佇列及訊息，我們可以將資料寫進 Disk 中。
- **重複消費（Duplicate Consumption）：** 因為網路延遲或重試機制，同一個訊息可能會被 Consumer 收到兩次。因此，Consumer 的處理邏輯必須具備「冪等性（Idempotency）」，也就是「不管執行幾次，結果都和執行一次一樣」。實務上通常會利用 Unique Key 來防範重複寫入。
- **最終一致性（Eventual Consistency）與使用者體驗：** 由於處理變成了非同步，使用者按下購買後無法立刻知道結果。前端通常需要配合實作 Polling（輪詢）或是 WebSocket，定期向伺服器查詢訂單建立的狀態。

---

## 總結

從「資料庫層級防禦」、「Redis 分布式鎖」，到今天的「Message Queue 排隊機制」，我們完整探討了系統在面對 Race Condition 與高併發時的挑戰。

在實務上，我們不一定需要在服務 0 → 1 的過程中，將 Redis Distributed Lock、Message Queue 一次到位，而是隨著服務本身流量的成長去擴充：

- **流量小、架構單純：** 依賴資料庫本身的 Lock 或欄位條件即可。
- **微服務架構、中等流量：** 引入 Redis Distributed Lock 來協調跨伺服器的資源競爭。
- **極端高併發、秒殺場景：** 必須導入 Message Queue，將同步改為非同步，把並行改為串行，從根本上解除搶鎖帶來的效能瓶頸。

了解不同工具的特性與適用場景，才能在面對各種複雜的業務需求時，設計出最穩健的系統架構。

---

## 參考

- [\[DATA\] 訊息佇列 01 - Message Queue 介紹與實際應用](https://enzochang.com/message-queue-introduction/)
- [Message Queue 概述 - HackMD](https://hackmd.io/@papago89/H1fAWDINU)
