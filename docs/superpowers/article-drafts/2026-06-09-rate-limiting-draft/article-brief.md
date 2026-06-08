# Article Brief — 如何設計 Rate Limiting

## Working Topic

如何設計 Rate Limiting（速率限制）

## Article Type

Daily Questions Challenge — Backend 分類（DQC-15）

## Intended Reader

準備後端工程師面試的開發者，熟悉基本 API 開發，但對系統設計層面的 Rate Limiting 實作細節尚不熟悉。

## Article Purpose

完整回答面試中「如何設計一個 Rate Limiting 機制？」這道系統設計題，讓讀者能清楚說明演算法選擇的理由與分散式場景下的實作思路。

## Core Question

如何在後端系統中設計一個具備可擴展性的 Rate Limiting 機制？

## Scope

1. 為何需要 Rate Limiting（防止濫用、保護下游服務穩定性）
2. 四種主流演算法比較：
   - Fixed Window Counter
   - Sliding Window Log / Sliding Window Counter
   - Token Bucket
   - Leaky Bucket
3. 單機 vs 分散式 Rate Limiting（結合 Redis 實作）
4. 常見落地場景（API Gateway、登入防爆破）
5. 回應用戶端的方式（HTTP 429、Retry-After header）

## Non-Goals

- Nginx、Kong、AWS WAF 等具體工具設定
- DDoS 防護（規模與目的超出 Rate Limiting 範疇）
- 具體 Laravel / Node.js 套件用法

## Suggested Category (DQC)

Backend

## Notes from Similar Existing Posts

- `2026-06-02-redis-distributed-lock.md`：已說明 Redis `SET NX PX` 原子操作與 Lua Script，Rate Limiting Redis 實作可交叉引用。
- `2026-06-01-race-condition-atomic-update-lock.md`：原子性概念在 Sliding Window Counter 的 Redis 實作中同樣重要。
- `2026-06-03-message-queue.md`：高併發場景鋪墊，Rate Limiting 是同類背景下的另一種保護機制。

演算法比較表適合用 Markdown 表格呈現，方便面試複習。
