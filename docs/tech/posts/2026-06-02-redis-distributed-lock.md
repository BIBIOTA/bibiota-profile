---
layout: doc
title: "[Daily Questions Challenge 08] 使用 Redis 分布式鎖避免 Race Condition"
description: 說明如何使用 Redis 分布式鎖（Distributed Lock）避免多服務架構中的 Race Condition，包含取得鎖、設定過期時間、釋放鎖的核心機制，以及 Lock Renewal 與 Fencing Token 的進階解法。
date: 2026-06-02
tags:
  - Backend
  - Redis
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 08] 使用 Redis 分布式鎖避免 Race Condition"
  - - meta
    - property: og:description
      content: 說明如何使用 Redis 分布式鎖（Distributed Lock）避免多服務架構中的 Race Condition，包含取得鎖、設定過期時間、釋放鎖的核心機制，以及 Lock Renewal 與 Fencing Token 的進階解法。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 08] 使用 Redis 分布式鎖避免 Race Condition"
  - - meta
    - name: twitter:description
      content: 說明如何使用 Redis 分布式鎖（Distributed Lock）避免多服務架構中的 Race Condition，包含取得鎖、設定過期時間、釋放鎖的核心機制，以及 Lock Renewal 與 Fencing Token 的進階解法。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

在上一篇文章[資料庫層級避免 Race Condition 的方法（Atomic Update、Lock、欄位型別防禦）](./2026-06-01-race-condition-atomic-update-lock.md)中，說明了資料庫處理 Race Condition 的做法。但如果只靠資料庫來做防禦，也會提升資料庫本身的負擔，或造成 Deadlock（死鎖）的發生。

為了解決這個問題，我們可以在 Redis 實作分布式鎖（Distributed Lock）。

---

## 分布式鎖（Distributed Lock）

現代的系統大多採用微服務架構，當我們的應用程式部署在**多台伺服器**上時，我們就需要一個所有伺服器都能共同存取，且具備原子性（Atomicity）的方式來管理這個鎖。而 **Redis** 憑藉其極高的讀寫效能與單執行緒特性，成為了實作分布式鎖的首選。

### Redis 實作分布式鎖的核心機制

利用 Redis 實作鎖的邏輯其實非常直觀，主要依賴以下三個步驟：

1. **取得鎖：**
   必須確保「寫入鎖」與「設定過期時間」是具備原子性的操作，以避免程式中途崩潰導致死鎖（Deadlock）。實務上會使用 Redis 的單一指令：`SET lock_key unique_id NX PX 30000`。其中，`NX` 確保只有第一個 Request 能寫入，`unique_id`（如 UUID）則是為了標記這個鎖的「擁有者是誰」。

2. **設定過期時間：**
   必須在設定鎖的同時給予一個 TTL（Time To Live），在時間到後自動解開。
   （在前面提到的 `SET lock_key unique_id NX PX 30000` 指令，已經在同一個命令設定了過期時間）

3. **釋放鎖（Release Lock）：**
   處理完商業邏輯後，必須刪除 Key。**但不能直接呼叫 `DEL`**，否則可能會因為超時問題而「誤刪到別人的鎖」。必須透過 Redis 的 **Lua Script**，先比對該 Key 目前的 Value 是否等同於自己的 `unique_id`，確認是自己的鎖後才執行刪除，確保釋放鎖的過程也具備原子性。

---

## 實作 Distributed Lock 需要留意的問題

雖然 Distributed Lock 的做法看起來很完美，但在實務上還會遇到一個棘手的狀況：

**「如果程式執行的時間超過了鎖的過期時間，該怎麼辦？」**

假設我們設定鎖 5 秒後過期，但某次處理特別慢，花了 8 秒。在第 5 秒時，鎖被自動釋放，這時第二個 Request 就會趁虛而入拿到鎖，導致兩個 Request 又同時在修改資料，發生 Race Condition。

為了解決這個問題，可以使用下面的方法：

### 1. Lock Renewal（自動續期 / Watchdog）

讓持有鎖的程式在背景開一個 Watchdog，定期（例如每 1/3 過期時間）檢查工作是否還在執行。若是，就延長鎖的 TTL。

某些語言也有現成的套件可以處理續期機制，像是 Java 的 Redisson。

### 2. Fencing Token

這是 Martin Kleppmann 提出的根本解法。因為 GC（垃圾回收）、網路延遲都可能讓你以為還持有鎖，但其實鎖已經過期，光靠續期無法 100% 保證安全。

做法是每次發鎖時附帶一個**單調遞增的 token**，寫入下游資源時帶上這個 token。下游（DB / 儲存層）拒絕比已見過的 token 更舊的寫入。

```
Request A 拿到 token=33 → GC 卡住 → 鎖過期
Request B 拿到 token=34 → 寫入（資源記錄 last=34）
Request A 恢復 → 帶 token=33 寫入 → 被拒絕（33 < 34）
```

即使兩個 Request 同時自認持有鎖，舊 token 的寫入也會被擋下。代價是下游必須支援這種版本檢查。

---

## 總結

在前後兩篇文章中，我們說明了處理 Race Condition 以及實作 Redis 分布式鎖。不過，當服務遇到瞬間湧入幾萬筆請求的場景時，大家還是會擠在一起搶同一筆庫存（或是鎖）。

下一篇文章，將會延續介紹 Message Queue。
