# Article Brief: Prompt Engineering vs RAG vs Fine-tuning

## Working Topic

Prompt Engineering vs RAG vs Fine-tuning — 面對 AI 應用需求時，如何做技術策略選擇？

## Confirmed Article Type

Daily Questions Challenge #35（AI Engineering 分類）

## Intended Reader

具備基礎 LLM 使用經驗的後端工程師或 AI 應用開發者，了解「有這三種方法」，但不確定實際場景下該選哪個。

## Article Purpose

提供一個清晰的決策框架，讓讀者在面對具體 AI 需求時，能根據成本、效果、維護性判斷該採用哪種策略，或如何組合使用。

## Core Question the Article Answers

「當我要讓 LLM 更符合我的需求，應該用 Prompt Engineering、RAG、還是 Fine-tuning？」

## Scope

1. 三者的定位與本質差異（一段各自說明）
2. 各自的優缺點與成本（資料/時間/運算/維護）
3. 適用場景對比（情境舉例）
4. 決策框架（流程或對比表）
5. 常見組合策略（三者不互斥，實務中如何搭配）
6. 小結 + 參考資料

## Non-Goals

- 不深入 RAG 內部架構（已有 #23 RAG 架構設計）
- 不深入 Prompt 技巧細節（已有 #21 如何設計 LLM Prompt）
- 不涵蓋 Fine-tuning 的訓練實作程式碼
- 不討論 RLHF / 預訓練等更底層技術

## Suggested Category

Daily Questions Challenge → AI Engineering

## Notes from Similar Existing Posts

- **#21 如何設計 LLM Prompt**（2026-06-15）：涵蓋 Prompt 角色類型、System Prompt 結構、Prompt Injection 防範。本篇只做簡介，不重複技巧。
- **#22 LLM API 串接與處理**（2026-06-16）：生產環境 API 處理，與本篇無重疊。
- **#23 RAG 架構設計**（2026-06-17）：RAG 流程、Embedding、Vector DB、Chunking，已包含 RAG vs Fine-tuning 的一段簡短對比。本篇要做更全面的三方比較，並加入決策框架。

## Draft Path

`docs/superpowers/article-drafts/2026-06-29-prompt-engineering-vs-rag-vs-fine-tuning/`

## Target File Path

`docs/tech/posts/2026-06-29-prompt-engineering-vs-rag-vs-fine-tuning.md`
