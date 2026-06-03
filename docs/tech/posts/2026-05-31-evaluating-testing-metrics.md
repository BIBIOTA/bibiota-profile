---
layout: doc
title: "[Daily Questions Challenge 06] 軟體開發中評估測試指標的方法"
description: 介紹軟體開發中常用的測試指標評估方法，包含測試覆蓋率、缺陷逃逸率與 Issue Severity 分級。
date: 2026-05-31
avatar: /daily-questions-challenge.png
tags:
  - Engineering
  - Testing
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 06] 軟體開發中評估測試指標的方法"
  - - meta
    - property: og:description
      content: 介紹軟體開發中常用的測試指標評估方法，包含測試覆蓋率、缺陷逃逸率與 Issue Severity 分級。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 06] 軟體開發中評估測試指標的方法"
  - - meta
    - name: twitter:description
      content: 介紹軟體開發中常用的測試指標評估方法，包含測試覆蓋率、缺陷逃逸率與 Issue Severity 分級。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 測試覆蓋率 (Test Coverage)

看 Test Coverage 是最常見的起點，具體來說有三個指標：

- **Line Coverage** — 最寬鬆，每行跑過就算
- **Branch Coverage** — 每個條件分支（例如 If / Else）都要走到，才有意義
- **Mutation Testing** — 修改程式碼產生「突變體（mutant）」，然後重新執行測試。**若測試能抓到變化（讓突變體死亡，KILLED），代表測試有效；若突變體存活（SURVIVED），代表測試有漏洞。**

我們有可能將專案的測試覆蓋率拉到 100%，但是**覆蓋率高 ≠ 測試好**，Code Coverage 只是基本條件。

因此我們還可以把這些指標納入考量：

## 缺陷逃逸率 (Defect Escape Rate)

缺陷逃逸率指的是那些沒被測試抓到、跑到 Production 才發現的 Bug 比例，能夠最直接地衡量功能交付、測試驗收的品質。

計算公式為：

```
缺陷逃逸率 = 產品發佈之後所發現的缺陷數 ÷ 產品發佈前後的總缺陷數 × 100%
```

## 針對 Issue 區分 Severity（嚴重程度）

我們通常會在系統服務監控中，將 Issue 以 P（Priority）做指標，定義如下：

| 優先級 | 緊急程度 | 影響範圍 | 範例 | 回應方式 |
|--------|----------|----------|------|----------|
| P0 | 緊急 | 廣泛 | 系統中斷 | 立即處理 |
| P1 | 高 | 大範圍 | 主要功能異常 | 緊急但不超出常規排程 |
| P2 | 中等 | 中等 | 次要功能異常 | 重要但需與其他問題排定優先順序 |
| P3 | 低 | 輕微 | 功能或特性導致少數用戶無法使用產品 | 納入例行工作 |
| P4 | 可忽略 | 可忽略 | 不影響用戶群的輕微問題 | 放入待辦清單 |

如果單純從前面提到的缺陷逃逸率來衡量，假設今天線上出現了 1 個 P0 Issue，肯定比 10 個 P4 Issue 要來得嚴重許多，但缺陷逃逸率的數字無法顯現問題嚴重性。

因此我們也需要針對每個線上 Issue 區分 Severity。

一個良好的團隊，通常會在 P0 問題發生後進行 AAR（After-Action Report）。AAR 的核心目標包含：識別問題與改善需求、提出對策，以及獲取「經驗教訓（Lessons Learned）」。

我們也可以從 AAR 發生的頻率來**衡量**產品服務本身的健康度，以及測試是否完善。

## 參考

- [首次接觸「變異測試 Mutation Testing」的心得 · 测试之家](https://testerhome.com/topics/16259)
- [P1, P2, P3, and P4 Priority Levels Explained (+Examples)](https://fibery.com/blog/product-management/p0-p1-p2-p3-p4/)
- [After action report](https://en.wikipedia.org/wiki/After_action_report)
