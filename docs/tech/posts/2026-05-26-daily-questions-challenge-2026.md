---
layout: doc
title: "[Daily Questions Challenge 00] 2026 軟體後端面試題目準備與回顧"
description: 以每日一題的方式整理面試問題。
date: 2026-05-26
avatar: /daily-questions-challenge.png
pinned: true
tags:
  - Backend
  - Interview
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 00] 2026 軟體後端面試題目準備與回顧"
  - - meta
    - property: og:description
      content: 以每日一題的方式整理面試問題。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 00] 2026 軟體後端面試題目準備與回顧"
  - - meta
    - name: twitter:description
      content: 以每日一題的方式整理面試問題。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 前言

在 2026 年 4 月底離開前職後，我從 5 月開始陸續進行了幾場面試。經過幾輪面試，我開始意識到自己對面試題目的準備不夠充分。

回顧面試中遇到的問題，有些題目本身能理解，但回答不夠完整；有些則是我對問題涉及的知識本來就不夠熟悉。

總結來說，以下三個方向是我在準備中沒能夠做好的：

- 針對面試公司產品本身的功課做得不夠（比如說：如果是一個線上課程平台，應該如何設計架構？）
- 對產品功能所使用的技術沒有足夠了解
- 技術基礎不足，無法完整回答白板題

有鑑於此，我決定在自己的 Blog 中，進行一個 Daily Questions Challenge 日更挑戰：每天整理一個過去遇到的面試問題，並將它整理成一篇文章。

而這篇起頭的主文章將會作為置頂文章，除了整理題目連結，也會依照題目類型在這裡分類。

## 題目

### 演算法

- [解釋時間複雜度 (Time Complexity)](./2026-05-26-time-complexity.md)
- [解釋空間複雜度 (Space Complexity)](./2026-05-28-space-complexity.md)
- [演算法常見解題 Pattern 總覽](./2026-07-01-algorithm-patterns.md)

### Backend

- [說明 JWT token](./2026-05-27-jwt-token.md)
- [使用 Redis 分布式鎖避免 Race Condition](./2026-06-02-redis-distributed-lock.md)
- [淺談 WebRTC](./2026-06-04-webrtc.md)
- [解釋 Laravel Eloquent Polymorphic Model](./2026-06-05-laravel-eloquent-polymorphic-model.md)
- [如何設計 Rate Limiting（速率限制）](./2026-06-09-rate-limiting.md)
- [微服務資料一致性：2PC、Saga Pattern 與 Outbox Pattern](./2026-06-21-microservices-data-consistency.md)
- [Circuit Breaker Pattern：微服務故障隔離的設計模式](./2026-06-24-circuit-breaker-pattern.md)

### Message Queue

- [使用 Message Queue 處理高併發下的排隊機制](./2026-06-03-message-queue.md)
- [Dead Letter Queue（DLQ）：訊息處理失敗後的機制設計](./2026-06-19-dead-letter-queue.md)
- [MQ 水平擴展機制與避免重複消費的設計](./2026-06-27-mq-horizontal-scaling-idempotency.md)
- [RabbitMQ vs Kafka：如何選擇適合的訊息佇列？](./2026-06-30-rabbitmq-vs-kafka.md)
- [Kafka 擴充 Partition 的雷點](./2026-07-02-kafka-partition-pitfalls.md)
- [Kafka 如何保證訊息不遺失](./2026-07-03-kafka-message-durability.md)
- [訊息傳遞語義總覽：At-most-once、At-least-once、Exactly-once](./2026-07-04-mq-delivery-semantics.md)
- [Consumer Lag 監控與 Backpressure：消費速度跟不上生產速度時怎麼辦？](./2026-07-05-mq-consumer-lag-backpressure.md)

### Caching

- [Redis 快取設計：四種讀寫模式與一致性取捨](./2026-06-18-redis-cache-patterns.md)

### Database

- [資料庫層級避免 Race Condition 的方法 (Atomic Update、Lock、欄位型別防禦)](./2026-06-01-race-condition-atomic-update-lock.md)
- [資料庫的 Transaction Isolation Level](./2026-06-10-transaction-isolation-level.md)
- [資料庫讀寫分離：Primary、Replica 與一致性取捨](./2026-06-11-database-read-write-splitting.md)
- [資料庫 ACID 是什麼？](./2026-06-12-database-acid.md)
- [Index 是如何加速查詢？](./2026-06-13-database-index.md)
- [資料庫正規化（Database Normalization）](./2026-06-14-database-normalization.md)
- [Slow Query 排查的方法](./2026-06-23-slow-query.md)
- [Sharding 與 Partitioning 策略](./2026-06-25-sharding-partitioning.md)

### API 設計

- [REST 與 GraphQL：適用場景與設計取捨](./2026-06-20-rest-vs-graphql.md)

### Network

- [網際網路通訊協定的分層設計](./2026-06-06-network-protocol-layers.md)
- [比較 TCP 與 UDP：可靠傳輸與快速傳輸的取捨](./2026-06-07-tcp-udp.md)

### 軟體工程

- [解釋 BDD (Behavior-Driven Development)](./2026-05-29-bdd-behavior-driven-development.md)
- [OOP 與 FP：物件導向與函數式程式設計的深入對比](./2026-06-26-oop-vs-fp.md)

### 測試

- [什麼是黑箱測試、白箱測試?](./2026-05-30-black-box-white-box-testing.md)
- [軟體開發中評估測試指標的方法](./2026-05-31-evaluating-testing-metrics.md)

### AI Engineering

- [什麼是 Harness Engineering ?](./2026-06-08-harness-engineering.md)
- [如何設計LLM Prompt](./2026-06-15-llm-prompt-design.md)
- [LLM API 串接與處理](./2026-06-16-llm-api-best-practices.md)
- [RAG (Retrieval-Augmented Generation) 架構設計](./2026-06-17-rag-architecture.md)
- [Vector Database 原理與選型](./2026-06-22-vector-database.md)
- [Prompt Engineering vs RAG vs Fine-tuning：如何選擇 LLM 應用策略](./2026-06-29-prompt-engineering-vs-rag-vs-fine-tuning.md)

### 資安

- [OWASP Top 10 簡介（2025 版）](./2026-06-28-owasp-top-10.md)
