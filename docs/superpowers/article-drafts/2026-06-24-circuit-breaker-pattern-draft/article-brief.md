# Article Brief: Circuit Breaker Pattern

## Working Topic

Circuit Breaker Pattern — 微服務架構中的故障隔離機制

## Confirmed Article Type

Daily Questions Challenge 技術文章（#30）

## Intended Reader

具備基礎後端開發經驗、正在學習或準備微服務面試題的工程師。

## Article Purpose

說明 Circuit Breaker Pattern 的設計動機與運作原理，幫助讀者理解如何在微服務架構中防止下游服務故障擴散（cascading failure），並掌握面試中關於服務穩定性設計的回答方向。

## Core Question

Circuit Breaker Pattern 是什麼？在微服務架構中如何用它防止故障擴散（cascading failure）？

## Scope

- 問題場景：下游服務變慢或掛掉時，上游為何會被連帶拖垮
- Circuit Breaker 三種狀態機：Closed → Open → Half-Open
- 觸發條件與恢復邏輯（failure threshold、timeout、probe request）
- Fallback 策略（回傳預設值、快取、降級回應）
- 與 Retry、Timeout、Bulkhead 的關係與搭配使用
- 實作工具簡介（Resilience4j / Java、Polly / .NET、opossum / Node.js）

## Non-Goals

- 不深入個別函式庫的 API 使用細節
- 不涵蓋 Service Mesh（Istio / Envoy）層級的實作
- 不討論 Kubernetes 健康檢查機制

## Suggested Category（Daily Questions Challenge 索引）

**Backend**（與 #27 微服務資料一致性同一 section）

## Notes from Similar Existing Posts

- `2026-06-21-microservices-data-consistency.md`（#27）：同為微服務主題，但聚焦資料一致性（Saga、Outbox）；本文聚焦服務可用性與故障隔離，兩者可互相參照。
- `2026-06-03-message-queue.md`（高併發排隊）：可在問題場景中提及，當 downstream 無法處理流量時，Circuit Breaker 比無限重試更合適。
- `2026-06-09-rate-limiting.md`（#XX）：Rate Limiting 是主動限流，Circuit Breaker 是被動熔斷，可在取捨段落簡短對比。
