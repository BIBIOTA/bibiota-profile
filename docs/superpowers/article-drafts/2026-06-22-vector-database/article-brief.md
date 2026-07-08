# Article Brief

## Working Topic

Vector Database 原理與選型

## Confirmed Article Type

Daily Questions Challenge — 技術文章

## Intended Reader

後端工程師或 AI 工程師，已具備 RAG 基本概念（看過 Challenge #23），想更深入了解 Vector Database 內部機制與如何選型。

## Article Purpose

補充 Challenge #23 對 Vector Database 的簡要介紹，提供獨立的深度參考文章，讓讀者在實際選用 Vector DB 時有足夠的判斷依據。

## Core Question

選用 Vector Database 時，該了解哪些內部原理？Pinecone、Weaviate、Qdrant、pgvector 等工具各有什麼取捨？

## Scope

1. 為什麼 Vector DB 比傳統 DB 更適合向量搜尋（從 #23 延伸，不重複）
2. 索引演算法深入：
   - Flat（精確搜尋）
   - IVF-PQ（倒排索引 + 量化壓縮）
   - HNSW（階層式小世界圖）
   - 每種演算法都要有 Mermaid 圖輔助說明結構或流程
3. 主流選項比較：Pinecone / Weaviate / Chroma / Qdrant / pgvector
4. 選型決策框架：規模、延遲、過濾需求、自建 vs 託管、費用
5. 總結

## Non-Goals

- 實作 embedding pipeline（Challenge #23 已涵蓋）
- Chunking 策略（Challenge #23 已涵蓋）
- RAG 整體架構（Challenge #23 已涵蓋）

## Suggested Category

AI Engineering（置頂索引 `2026-05-26-daily-questions-challenge-2026.md` 的 AI Engineering 段落）

## Notes from Similar Existing Posts

- **Challenge #23 RAG 架構設計**（`2026-06-17-rag-architecture.md`）：
  - 已提及 Vector DB 的角色、Cosine Similarity、HNSW 概念、常見產品清單
  - 本文應在前言連結 #23，不重複說明 RAG 流程
  - 本文的 Vector DB 介紹深度要明顯高於 #23
- 現有文章索引最新號碼為 #27（`2026-06-21-microservices-data-consistency.md`），本文編號為 **#28**
- 索引演算法說明應使用 Mermaid 流程圖或結構示意圖，與 RAG #23 的 flowchart 風格一致
