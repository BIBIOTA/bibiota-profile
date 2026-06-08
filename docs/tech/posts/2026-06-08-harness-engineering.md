---
layout: doc
title: "[Daily Questions Challenge 14] 什麼是 Harness Engineering ?"
description: 介紹 Harness Engineering 的定義、起源、五大核心元件及實務注意事項，以及它在 AI Engineering 演進中的定位。
date: 2026-06-08
avatar: /daily-questions-challenge.png
tags:
  - AI
  - Agent
  - LLM
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 14] 什麼是 Harness Engineering ?"
  - - meta
    - property: og:description
      content: 介紹 Harness Engineering 的定義、起源、五大核心元件及實務注意事項，以及它在 AI Engineering 演進中的定位。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 14] 什麼是 Harness Engineering ?"
  - - meta
    - name: twitter:description
      content: 介紹 Harness Engineering 的定義、起源、五大核心元件及實務注意事項，以及它在 AI Engineering 演進中的定位。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

如果我們使用 Claude Code 或 Codex 協作進行開發，有可能會遇到 AI Agent 執行到一半突然收尾、明明跑完了卻輸出錯誤結果、每次換台機器或新開一個 session 就「忘記規矩」、或是因為 context 快滿了就開始草率交差？

問題不一定出在模型本身，很多時候是 Agent 工作的**環境**出了問題，這時候就需要 **Harness Engineering** 來幫忙了。

「Harness」原意是馬具或安全索——讓強大但不可控的力量被引導與約束。**Harness Engineering** 要處理的，正是這個「模型以外的一切」：圍繞 LLM 的基礎設施工程，目的是讓 AI Agent 能可靠、持續、可稽核地完成工作。

---

## Harness Engineering 是怎麼來的 ?

Harness Engineering 由 HashiCorp 創辦人 Mitchell Hashimoto（Terraform 共同開發者）於 2026 年 2 月 5 日在個人部落格首次定義：

> ***每次 agent 犯錯，就把修正方案永久工程化進環境裡，讓同樣的錯誤不再發生***。

這句話背後有個重要的思維轉移：工程師的產出從「寫程式碼」變成「**設計讓 agent 能可靠產出程式碼的環境**」。

幾天後，OpenAI Codex 團隊發表實驗報告，在五個月內透過 Harness Engineering 的概念，以零人工撰寫程式碼交付約一百萬行 production code，成為業界第一份大規模的實務驗證。

Anthropic 則從 Claude Code 的實際運行數據出發，揭露了模型無法自行解決、必須由 harness 層介入的兩個系統性問題：**Context Anxiety**（context 快滿時 Agent 提前收尾）與**自我評估偏差**（Agent 審查自己的輸出時系統性高估品質）。

2026 年 4 月，Martin Fowler 在 martinfowler.com 發表系統性的分類框架，將 harness 元件分成 **Guides**（在 agent 行動前介入）與 **Sensors**（在 agent 行動後介入），為整個領域建立了共同語言，harness engineering 作為一門獨立學科的理論基礎正式成形。

---

## AI Engineering 的演進

從一開始的 Prompt Engineering 發展到後來的 Context Engineering、**Harness Engineering**，各自的關係及職責可以參考如下：

| 層次 | 範圍 | 例子 |
|------|------|------|
| Prompt Engineering | 單次對話內 | 指令清晰度、角色設定 |
| Context Engineering | 每一輪的資訊管理 | 壓縮、召回、context 視窗策略 |
| **Harness Engineering** | **對話之外的整個環境** | 工具設定、權限、跨 session 記憶 |

---

## Harness Engineering 五大核心

### 1. Memory（記憶）

Agent 沒有跨 session 的記憶，每次對話都是從零開始。CLAUDE.md、AGENTS.md 這類規則檔案，讓你跑在不同 session 的 Agent 都能「知道規矩」——它的存在就是為了補上模型先天缺乏長期記憶的問題。

### 2. Tools（工具）

Agent 光靠語言能力做不了太多事。你必須給它「手」——讀寫檔案、執行指令、呼叫 API 等能力，讓它可以在環境中真正採取行動，而不只是輸出文字。

### 3. Permissions（權限）

工具越多，能惹的麻煩也越大。透過 allow-list 與 deny-list，你可以定義 Agent 無人值守時能做什麼、不能做什麼，避免一個 bug 演變成刪庫事故。

### 4. Hooks（鉤子）

PreToolUse / PostToolUse，在執行層攔截 tool call 的機制。讓你可以在 Agent 行動前後插入邏輯，例如執行前記 log、執行後自動驗證結果，或是危險操作先觸發人工確認。

### 5. Observability（可觀測性）

你無法管理你看不到的東西。建立 log、trace、評估機制，讓你知道 Agent 做了什麼、在哪裡失敗——這是建立可信任 AI 系統最基礎的要求。

---

## Harness Engineering 實務上的注意事項

- **Context 管理** — 主 context 只做排程，高成本操作丟給 subagent。避免主流程的 context 被耗盡後讓 Agent 開始草率決策。
- **狀態持久化** — 架構決策都必須推進 repo 才能被 Agent 使用，否則下個 session 一切歸零。
- **工具設計** — 給**足夠**的工具，不是**更多**的工具。工具越多反而讓 Agent 選擇困難，降低準確性。
- **驗證機制** — 透過可讓 Agent 驗證的方式進行驗收，而非自行宣告完成。讓 Agent 跑測試、跑 lint、截圖確認，比讓它說「我完成了」可靠得多。
- **指令檔案** — AGENTS.md 控制在 100 行以內，作為目錄指向 `docs/`。過大的指令檔會擠掉任務的 context 空間，並隨時間腐化。
- **Session 紀律** — 一個 session 只做一個任務，防止 context 耗盡。

---

## 實務範例：最小可用的 Harness 設定

可以參考 [Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/zh-TW/resources/) 的建議，以下**四個檔案**是讓 Agent 能跨 session 穩定工作的最小組合：

| 檔案 | 對應核心 | 用途 |
|------|----------|------|
| `AGENTS.md` / `CLAUDE.md` | Memory | Agent 開始工作前必讀的規則與流程 |
| `feature_list.json` | Memory + Observability | 以 JSON 追蹤每個功能的狀態與驗證步驟 |
| `claude-progress.md` | Memory + Observability | 跨 session 的進度紀錄與阻礙說明 |
| `init.sh` | Tools | 自動化環境啟動（安裝、驗證、啟動指令） |

### AGENTS.md — 規則入口

Agent 每次開啟 session 時會先讀這份檔案。與其把所有規矩塞進去，建議只放核心規則與目錄指引，細節交給 `docs/` 下的文件：

```markdown
# 規則
- 開始工作前先讀 claude-progress.md，確認目前狀態
- 功能完成前必須通過 feature_list.json 中定義的 verification 步驟
- 不得自行宣告完成，需提供驗證證據

# 目錄
- 功能規格：docs/spec.md
- 架構決策：docs/decisions.md
```

### feature_list.json — 功能狀態追蹤

讓 Agent 知道目前有哪些功能、各自的優先度與完成標準，避免它自己決定要做什麼：

```json
{
  "features": [
    {
      "id": "user-auth",
      "priority": "high",
      "area": "backend",
      "status": "in_progress",
      "verification": "npm run test:auth",
      "evidence": ""
    }
  ]
}
```

`status` 有四種值：`not_started`、`in_progress`、`blocked`、`passing`。Agent 必須把 `evidence`（例如測試通過截圖或指令輸出）填入才算完成，而非自行宣告。

### claude-progress.md — 跨 session 的唯一真相來源

這是讓下一個 session 的 Agent 知道「現在在哪裡」的檔案：

```markdown
## 目前驗證狀態
- [x] 資料庫 migration 完成
- [ ] user-auth 模組測試通過

## 當前阻礙
無

## 下一步
實作 auth/login endpoint，完成後執行 npm run test:auth 驗證
```

---

Harness Engineering 代表 AI 工程的一次典範轉移：工程師的工作重心從「寫程式碼」轉向「設計讓 agent 能可靠工作的環境」。Memory、Tools、Permissions、Hooks、Observability 五個核心元件共同構成這套環境的骨架，讓 AI Agent 的行為從不可控變得可引導、可稽核。

---

## 參考

- [Learn Harness Engineering — Walking Labs](https://walkinglabs.github.io/learn-harness-engineering/zh-TW/)
- [My AI Adoption Journey — Mitchell Hashimoto](https://mitchellh.com/writing/my-ai-adoption-journey)
- [Harness engineering for coding agent users — Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
- [How to Build an Agent Harness: A Practical Guide from Teams Who Actually Did It | Study Notes](https://snowan.gitbook.io/study-notes/ai-blogs/how-to-build-agent-harness)
- [AI 圈新名詞「Harness Engineering」是什麼? 一文看懂 駕馭工程](https://tenten.co/learning/harness-engineering/)
- [Harness Engineering是什麼？台大教授80字實驗揭：AI為何仍需人類引導，還會越罵越笨？](https://www.bnext.com.tw/article/90734/harness-engineering-ai-guidance-gemma-experiment)
- [GitHub: deusyu/harness-engineering](https://github.com/deusyu/harness-engineering)
- [From Sequential to Parallel: Building a Claude Code Harness](https://levelup.gitconnected.com/from-sequential-to-parallel-building-a-claude-code-harness-0a65ce89738a?gi=72ae1cfc6a6c)
- [The Complete Claude Code Harness Engineering Guide: 5 Layers, 8 Deep Dives](https://dev.to/shipwithaiio/the-complete-claude-code-harness-engineering-guide-5-layers-8-deep-dives-3d4j)
