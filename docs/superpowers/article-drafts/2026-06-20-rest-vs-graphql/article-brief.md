# Article Brief：REST 與 GraphQL 的適用場景

## Working Topic

REST 與 GraphQL 的適用場景與設計取捨

## Article Type

Daily Questions Challenge — 第 #26 題

## Intended Reader

準備後端面試、想理解 API 設計取捨的中階工程師

## Article Purpose

讓讀者理解 REST 與 GraphQL 各自的設計哲學，並能在面試或實際專案中清楚說明選型依據與取捨。

## Core Question

什麼情況下應該選 REST，什麼情況下應該選 GraphQL？

## Scope

1. REST 設計原則（資源導向、HTTP 動詞、Stateless、統一介面）
2. GraphQL 核心概念（單一 endpoint、Query / Mutation / Subscription、型別系統、按需取欄位）
3. 兩者設計哲學的本質差異（Schema-first vs Resource-first）
4. 各自適用場景：
   - REST 適合：公開 API、簡單 CRUD、快取需求高、生態成熟度要求高
   - GraphQL 適合：多端整合（Web / Mobile 資料需求不同）、欄位差異大、BFF（Backend for Frontend）模式
5. 常見陷阱：GraphQL 的 N+1 查詢問題（DataLoader 解法簡述）
6. 總結選型原則

## Non-Goals

- 不深入比較 gRPC 或 tRPC
- 不涵蓋 REST 版本管理（v1 / v2 策略）
- 不涵蓋 GraphQL Federation / 分散式 Schema

## Daily Questions Challenge Category

新增分類：**API 設計**（於 `2026-05-26-daily-questions-challenge-2026.md` 中新增此分類區塊）

## Notes from Similar Existing Posts

- `2026-06-07-tcp-udp.md`：以「設計哲學差異 + 適用場景 + 取捨」為主軸，本文可採用相似結構
- `2026-06-09-rate-limiting.md`：以實際情境帶出機制，再討論設計選型，值得參考
- `2026-06-18-redis-cache-patterns.md`：以模式比較為核心，用表格或對照方式呈現，可借鑒

## Target Date & Slug

- Date：2026-06-20
- Slug：`2026-06-20-rest-vs-graphql`
- Target path：`docs/tech/posts/2026-06-20-rest-vs-graphql.md`
