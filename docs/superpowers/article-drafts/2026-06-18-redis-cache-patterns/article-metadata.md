# Article Metadata: Redis 快取設計

## Confirmed Metadata

| Field | Value |
|---|---|
| Daily Questions Challenge # | 24 |
| `title` | `[Daily Questions Challenge 24] Redis 快取設計：四種讀寫模式與一致性取捨` |
| `description` | `介紹後端系統中 Redis 快取的四種主流讀寫模式（Cache-Aside、Read-Through、Write-Through、Write-Behind），以及 DB 與快取之間的一致性取捨與選擇依據。` |
| `date` | `2026-06-18` |
| `slug` | `redis-cache-patterns` |
| Target path | `docs/tech/posts/2026-06-18-redis-cache-patterns.md` |
| `tags` | `Backend`、`Redis`、`Cache` |
| `avatar` | `/daily-questions-challenge.png` |
| `pinned` | `false` |
| Draft folder | `docs/superpowers/article-drafts/2026-06-18-redis-cache-patterns/` |

## Frontmatter（給 blog-research-writing 直接套用）

```yaml
---
layout: doc
title: "[Daily Questions Challenge 24] Redis 快取設計：四種讀寫模式與一致性取捨"
description: 介紹後端系統中 Redis 快取的四種主流讀寫模式（Cache-Aside、Read-Through、Write-Through、Write-Behind），以及 DB 與快取之間的一致性取捨與選擇依據。
date: 2026-06-18
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Redis
  - Cache
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 24] Redis 快取設計：四種讀寫模式與一致性取捨"
  - - meta
    - property: og:description
      content: 介紹後端系統中 Redis 快取的四種主流讀寫模式（Cache-Aside、Read-Through、Write-Through、Write-Behind），以及 DB 與快取之間的一致性取捨與選擇依據。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 24] Redis 快取設計：四種讀寫模式與一致性取捨"
  - - meta
    - name: twitter:description
      content: 介紹後端系統中 Redis 快取的四種主流讀寫模式（Cache-Aside、Read-Through、Write-Through、Write-Behind），以及 DB 與快取之間的一致性取捨與選擇依據。
---
```

## Pinned Index 變更

需在 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 中**新增 `### Caching` 段落**，插入位置為 **Backend 區塊之後、Database 區塊之前**。

新區塊內容：

```md
### Caching

- [Redis 快取設計：四種讀寫模式與一致性取捨](./2026-06-18-redis-cache-patterns.md)
```

最終索引段落順序（變更後）：

1. 演算法
2. Backend
3. **Caching（新增）**
4. Database
5. Network
6. 軟體工程
7. 測試
8. AI Engineering

## 既有 Slug 衝突檢查

執行 `ls docs/tech/posts/ | grep -i -E "redis|cache"` 結果：

- `2026-06-02-redis-distributed-lock.md`（不同主題，不衝突）

`redis-cache-patterns` slug 無重複。

## Challenge 編號驗證

依 git commit 紀錄，最近 4 篇 Daily Questions Challenge 編號：

- #20 Database Normalization（2026-06-14）
- #21 LLM Prompt Design（2026-06-15）
- #22 LLM API 串接與處理（2026-06-16）
- #23 RAG 架構設計（2026-06-17）

下一個編號確認為 **#24**。
