---
layout: doc
title: "[Daily Questions Challenge 04] BDD (Behavior-Driven Development)"
description: 介紹行為驅動開發（BDD）的核心概念、Given/When/Then 格式，以及與 TDD、SDD 的比較與整合方式。
date: 2026-05-29
tags:
  - Engineering
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 04] BDD (Behavior-Driven Development)"
  - - meta
    - property: og:description
      content: 介紹行為驅動開發（BDD）的核心概念、Given/When/Then 格式，以及與 TDD、SDD 的比較與整合方式。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 04] BDD (Behavior-Driven Development)"
  - - meta
    - name: twitter:description
      content: 介紹行為驅動開發（BDD）的核心概念、Given/When/Then 格式，以及與 TDD、SDD 的比較與整合方式。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

BDD，中文為**行為驅動開發**。它是一種軟體開發方法，核心精神是：**先用使用者或業務能理解的語言，描述系統應該有哪些行為，再根據這些行為去設計測試與實作程式。**

---

## BDD 常見格式：Given、When、Then

BDD 最常見的寫法是 **Given / When / Then**：

```
Given 使用者已經登入
When  使用者點擊「加入購物車」按鈕
Then  系統應該將商品加入購物車
```

三個部分分別代表：

**Given：前提條件**
描述目前系統或使用者的狀態，例如「使用者已登入」、「商品仍有庫存」。

**When：觸發行為**
描述使用者或系統做了什麼動作，例如「點擊加入購物車」、「送出付款表單」。

**Then：預期結果**
描述系統應該產生什麼結果，例如「購物車數量增加」、「顯示錯誤訊息」、「訂單狀態變成已付款」。

---

## BDD vs. TDD

BDD 是 TDD（Test-Driven Development）的延伸。BDD 鼓勵開發者、QA、非技術人員與業務方共同討論預期的軟體行為，並用自然語言撰寫非工程師也能理解的測試案例。

通常 PM 說的是需求，工程師想的是程式邏輯，QA 想的是測試案例，最後大家對同一個功能的理解可能不完全一致。BDD 用自然語言的方式，讓所有成員都可以參與定義驗收標準。

| 項目 | TDD | BDD |
|------|-----|-----|
| 關注重點 | 透過 Test Cases 描述預期行為，再透過紅燈、綠燈、重構的循環驅動設計與實作 | 系統行為是否符合需求 |
| 描述方式 | 測試程式碼 | 自然語言情境 |
| 主要對象 | 開發者 | 開發者、QA、PM、業務方 |
| 常見粒度 | function、class、module | 使用者情境、功能流程 |
| 核心問題 | 程式這樣寫對不對？ | 使用者做這件事時，系統應該怎麼反應？ |

---

## BDD vs. SDD

在 AI 輔助開發或 Vibe Coding 的討論中，SDD（Specification-Driven Development）常被用來表示「先寫清楚規格，再讓 AI 或工程師依照規格實作」。

BDD 和 SDD 都可以幫助把需求描述得更精確：BDD 偏向描述「行為故事」，SDD 則偏向定義「規格與技術骨架」，例如系統架構、資料結構、技術選型、開發規範與非功能需求。

| 項目 | BDD | SDD |
|------|-----|-----|
| 核心問題 | 使用者做某件事時，系統應該怎麼反應？ | 系統應該怎麼設計、有哪些規格與限制？ |
| 描述重點 | 行為、情境、驗收條件 | 架構、資料格式、API、技術規範 |
| 使用語言 | 偏自然語言 | 偏規格文件與技術文件 |
| 適合對象 | PM、QA、工程師、業務方 | 工程師、架構師、AI Coding Agent |
| 常見產出 | Given / When / Then、Feature、Scenario | spec.md、design.md、API 文件、資料結構定義 |

---

## BDD、TDD、SDD 三者可以一起使用嗎？

可以，而且實務上三者常常是互補的。

一個比較完整的流程可以是：

```
SDD 定義系統規格與技術限制
↓
BDD 定義使用者情境與驗收條件
↓
TDD 撰寫測試並驅動程式實作
```

例如開發一個付款功能：

- **SDD** 先定義付款 API、資料表、錯誤碼、安全限制。
- **BDD** 接著描述使用者付款成功、付款失敗、餘額不足、重複付款等情境。
- **TDD** 則針對 payment service、order service、transaction repository 撰寫測試，確保程式邏輯正確。

所以三者不是互斥關係，而是關注層次不同：

```
SDD：規格與設計層
BDD：行為與驗收層
TDD：程式與測試實作層
```

GitHub 的開源工具 [OpenSpec](https://github.com/Fission-AI/OpenSpec)，雖然本身為撰寫 SDD 的工具，但它產出的規格內容可以自然銜接 BDD 與 TDD：

```
- Spec / Design / Tasks：偏向 SDD，用來描述規格、設計與實作計畫。
- Acceptance Criteria / Scenario：可以承接 BDD 的情境與驗收條件。
- Test Plan / Test Cases：可以銜接 TDD 或一般自動化測試。
```

---

## 總結

BDD 的重點不是「多寫一種測試格式」，而是讓團隊先釐清：

- 使用者是誰？
- 他在什麼情境下做什麼事？
- 系統應該給出什麼結果？
- 這個結果是否符合業務價值？

---

## 參考

- [淺談 AI Vibe Coding 當今主流的 BDD 與 SDD](https://israynotarray.com/ai/20251202/797714546/)
- [ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/articles/10220655)
- [行為驅動開發 - 維基百科，自由的百科全書](https://zh.wikipedia.org/zh-tw/%E8%A1%8C%E4%B8%BA%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91)
