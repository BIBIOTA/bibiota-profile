---
layout: doc
title: "[Daily Questions Challenge 05] 什麼是黑箱測試、白箱測試?"
description: 介紹黑箱測試與白箱測試的核心概念、執行角色與應用情境。
date: 2026-05-30
avatar: /daily-questions-challenge.png
tags:
  - Engineering
  - Testing
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 05] 什麼是黑箱測試、白箱測試?"
  - - meta
    - property: og:description
      content: 介紹黑箱測試與白箱測試的核心概念、執行角色與應用情境。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 05] 什麼是黑箱測試、白箱測試?"
  - - meta
    - name: twitter:description
      content: 介紹黑箱測試與白箱測試的核心概念、執行角色與應用情境。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 黑箱測試

黑箱測試主要根據需求規格、使用者情境、輸入與輸出結果來設計測試，不依賴程式碼內部實作。

把軟體當成一個看不透的「黑盒子」。測試人員完全不需要知道程式碼是怎麼寫的，他們只在乎一件事：「當我輸入 A，軟體有沒有給我預期的結果 B？」

- **關注重點：** 軟體的功能、使用者介面（UI）、操作流程是否符合需求規格。
- **執行角色：** 通常由 QA（品質保證測試員）、測試工程師或一般使用者來執行。
- **生活中的比喻：** 就像你買了一台新電視。你不需要懂裡面的電路板怎麼焊接，你只需要知道：按下遙控器的電源鍵，電視會亮；按下頻道鍵，電視會轉台。這就是黑箱測試。
- **常見應用：** 功能測試、系統測試、使用者驗收測試（UAT）、部分效能／壓力測試。

---

## 白箱測試

把軟體當成一個透明的「玻璃盒」。測試人員完全清楚軟體內部的架構與程式碼邏輯，並根據程式碼結構、邏輯分支、資料流程與錯誤處理路徑來設計測試案例，盡可能提高測試覆蓋率。

- **關注重點：** 程式邏輯是否正確、條件分支是否被測試到、錯誤處理是否完整、是否存在安全漏洞或邊界條件問題。
- **執行角色：** 通常由開發工程師（寫程式的人）親自執行。
- **生活中的比喻：** 就像修車廠的技師。他不僅要知道車子能不能發動，還要打開引擎蓋，檢查每一個齒輪、皮帶和火星塞的運作狀態是否精準無誤。
- **常見應用：** 單元測試（Unit Testing）、整合測試、靜態程式碼分析。

---

## 參考

- [白箱測試 - 維基百科，自由的百科全書](https://zh.wikipedia.org/zh-tw/%E7%99%BD%E7%9B%92%E6%B5%8B%E8%AF%95)
- [黑盒测试 - 維基百科](https://zh.wikipedia.org/wiki/%E9%BB%91%E7%9B%92%E6%B5%8B%E8%AF%95)
- [ithelp.ithome.com.tw](https://ithelp.ithome.com.tw/articles/10304985)
