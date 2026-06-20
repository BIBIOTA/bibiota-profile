---
layout: doc
title: "[Daily Questions Challenge 26] REST 與 GraphQL：適用場景與設計取捨"
description: 比較 REST 與 GraphQL 的設計哲學，說明各自適用場景、核心取捨，以及 GraphQL N+1 問題的解法，幫助在面試與實務中做出清楚的 API 選型判斷。
date: 2026-06-20
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - API Design
  - REST
  - GraphQL
  - Interview
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 26] REST 與 GraphQL：適用場景與設計取捨"
  - - meta
    - property: og:description
      content: 比較 REST 與 GraphQL 的設計哲學，說明各自適用場景、核心取捨，以及 GraphQL N+1 問題的解法，幫助在面試與實務中做出清楚的 API 選型判斷。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 26] REST 與 GraphQL：適用場景與設計取捨"
  - - meta
    - name: twitter:description
      content: 比較 REST 與 GraphQL 的設計哲學，說明各自適用場景、核心取捨，以及 GraphQL N+1 問題的解法，幫助在面試與實務中做出清楚的 API 選型判斷。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在設計 API 時，常會遇到一個問題：

> 前端 Web 和 Mobile App 需要的欄位不一樣，我是要為每個頁面各開一個端點，還是讓前端自己決定要哪些欄位？

這個問題背後，正是 **REST** 與 **GraphQL** 兩種設計哲學的核心差異所在。

## REST

REST（Representational State Transfer）是 Roy Fielding 在 2000 年的博士論文中提出的架構風格，並非一個協定，而是一組設計原則。

**REST 的核心概念是「資源（Resource）」**。每個資源對應一個 URL，透過 HTTP 動詞對資源進行操作：

| HTTP 動詞 | 對應操作 |
|---|---|
| `GET` | 讀取資源 |
| `POST` | 新增資源 |
| `PUT / PATCH` | 更新資源 |
| `DELETE` | 刪除資源 |

例如，一個部落格系統的 API 可能長這樣：

```
GET    /posts          → 取得所有文章
GET    /posts/42       → 取得 ID 為 42 的文章
POST   /posts          → 新增文章
PATCH  /posts/42       → 更新文章 42
DELETE /posts/42       → 刪除文章 42
```

REST 強調幾個關鍵約束：

- **Stateless（無狀態）**：每個請求都必須包含足夠的資訊讓伺服器處理，伺服器不儲存 session 狀態。
- **Uniform Interface（統一介面）**：資源透過 URI 識別，回應以標準格式（通常是 JSON）表示。
- **Cacheable（可快取）**：HTTP GET 的回應可被瀏覽器或 CDN 快取，減少伺服器負擔。

## GraphQL

GraphQL 是 Facebook 於 2012 年內部開發、2015 年開源的查詢語言與執行引擎，由 [graphql.org](https://graphql.org/) 維護規格。

**GraphQL 的核心概念是「按需取欄位（Field Selection）」**。用戶端在請求中明確描述需要哪些欄位，伺服器只回傳這些欄位，不多也不少。

GraphQL 只有一個 endpoint（通常是 `/graphql`），請求方式改為用 **Query（查詢）**、**Mutation（變更）**、**Subscription（訂閱）** 描述操作：

```graphql
# 只取文章的 title 與 author.name，不取其他欄位
query {
  post(id: 42) {
    title
    author {
      name
    }
  }
}
```

伺服器根據預先定義的 **Schema（型別系統）** 驗證請求，確保欄位存在且型別正確，再執行查詢。

這個設計解決了 REST 常見的兩個問題：

- **Over-fetching（取過多）**：REST 的端點通常回傳固定結構，包含用戶端不需要的欄位。
- **Under-fetching（取不足）**：REST 可能需要打多個端點才能組合出完整的資料，GraphQL 一次查詢就能跨多個資源取得所需欄位。

## REST vs GraphQL 核心對比

| 特性 | REST | GraphQL |
|---|---|---|
| 設計哲學 | 資源導向 | 欄位選取導向 |
| Endpoint 數量 | 多個（每個資源一個） | 單一（`/graphql`） |
| 回應結構 | 由伺服器決定 | 由用戶端決定 |
| Over-fetching | 常見 | 避免 |
| Under-fetching | 需打多次請求 | 一次查詢解決 |
| HTTP 快取 | 原生支援（GET） | 需額外設計 |
| 學習成本 | 低 | 較高（Schema、型別系統）|
| 生態成熟度 | 極高 | 高，但相對年輕 |

## 各自適用場景

**REST 適合：**

- **公開 API（Public API）**：面向外部開發者的 API 更適合使用 REST，語意明確、文件好寫、HTTP 快取開箱即用。
- **簡單 CRUD 服務**：操作邏輯直觀，對應 HTTP 動詞清楚。
- **快取需求高的場景**：靜態資源、資料更新頻率低的服務，REST GET 可直接透過 CDN 快取。
- **團隊對 GraphQL 不熟悉**：REST 的學習曲線低，能更快上線並維護。

**GraphQL 適合：**

- **多端整合（Web / Mobile）**：Web 與 App 所需的資料欄位不同，GraphQL 讓各端自行取用所需欄位，不需要伺服器為不同端各維護一組 API。
- **BFF（Backend for Frontend）模式**：作為前端專屬的資料聚合層，從多個後端服務取資料並組合回傳，GraphQL 的欄位選取非常適合這個角色。
- **資料結構複雜、欄位差異大**：當用戶端需要的資料欄位組合多樣，REST 固定結構會造成大量無用欄位傳輸。
- **需要即時訂閱**：GraphQL Subscription 可透過 WebSocket 推送即時更新。

## GraphQL 的 N+1 問題

GraphQL 有一個常見的效能陷阱：**N+1 查詢問題（N+1 Problem）**。

以「取得所有文章及各文章的作者」為例，Resolver（解析器）通常這樣運作：

1. 查詢一次取得所有文章（1 次 SQL）。
2. 對每篇文章各查詢一次作者（N 次 SQL）。

結果就是 **1 + N 次**查詢，當文章數量大時，效能急遽下降。

標準解法是使用 **DataLoader**。DataLoader 會將同一個執行週期內的多個 `.load(id)` 呼叫**批次合併（Batch）**成一次查詢：

```sql
-- 原本：N 次個別查詢
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;
SELECT * FROM users WHERE id = 3;

-- DataLoader 批次：1 次查詢
SELECT * FROM users WHERE id IN (1, 2, 3);
```

DataLoader 還提供**請求層快取**，同一個請求內對相同 ID 的重複 `.load(id)` 不會觸發額外查詢。幾乎所有主流 GraphQL 伺服器框架（Apollo Server、graphql-js 等）都提供 DataLoader 整合。

## 選型原則總結

REST 與 GraphQL 沒有絕對的優劣，選型的核心問題是：

- **API 的消費者是誰？** 公開給第三方 → REST；多個自家前端 → GraphQL。
- **欄位需求是否多樣？** 固定結構夠用 → REST；各端取不同欄位 → GraphQL。
- **快取重要嗎？** 強依賴 HTTP 快取 → REST；快取需求低 → GraphQL 可行。
- **團隊能力與維護成本？** GraphQL 的 Schema 設計與 DataLoader 配置需要額外學習成本。

兩者也可以並存：用 REST 對外提供公開 API，用 GraphQL 作為內部 BFF 聚合多個服務資料。

## 參考

- [Fielding Dissertation: REST Architectural Style](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [GraphQL | The query language for modern APIs](https://graphql.org/)
- [GraphQL Specification (September 2025)](https://spec.graphql.org/September2025/)
- [GraphQL vs REST API - AWS](https://aws.amazon.com/compare/the-difference-between-graphql-and-rest/)
- [Handling the N+1 Problem - Apollo GraphQL Docs](https://www.apollographql.com/docs/graphos/schema-design/guides/handling-n-plus-one)
- [Solving the N+1 Problem with DataLoader - GraphQL.js](https://www.graphql-js.org/docs/n1-dataloader/)
