---
layout: doc
title: "[Daily Questions Challenge 43] 並行與併發：Parallelism 與 Concurrency 的差異"
description: 深入解析 Concurrency（併發）與 Parallelism（並行）的定義與差異，並透過 Go、Node.js 等後端場景說明實際應用。
date: 2026-07-07
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - 軟體工程
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 43] 並行與併發：Parallelism 與 Concurrency 的差異"
  - - meta
    - property: og:description
      content: 深入解析 Concurrency（併發）與 Parallelism（並行）的定義與差異，並透過 Go、Node.js 等後端場景說明實際應用。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 43] 並行與併發：Parallelism 與 Concurrency 的差異"
  - - meta
    - name: twitter:description
      content: 深入解析 Concurrency（併發）與 Parallelism（並行）的定義與差異，並透過 Go、Node.js 等後端場景說明實際應用。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

「併發（Concurrency）」與「並行（Parallelism）」是後端系統設計中常被混用的兩個術語。中文裡只差一個字，英文裡也長得相似，卻描述的是截然不同的概念，指向不同層次的問題。Go 語言的創始人之一 Rob Pike 在 2012 年的演講《Concurrency is not Parallelism》中明確指出：**Concurrency 是一種結構設計問題，Parallelism 是一種執行問題**，兩者根本不在同一個層次上討論。

## 什麼是 Concurrency（併發）

**Concurrency（併發）是指系統同時管理多個任務的能力**，但這些任務不一定在同一個時間點真正執行。

用餐廳廚師的比喻：一位廚師同時在處理三道菜——切菜時爐子在燉湯，等湯滾的空檔在準備擺盤。廚師並沒有三個身體，但他能有效地「交替推進」三件事，這就是 Concurrency。

從系統角度來說，Concurrency 的關鍵是：**任務之間的切換（context switch）**。CPU 在極短的時間內輪流執行不同的任務，製造出「同時進行」的假象。

Concurrency 適合解決的問題類型：

- **I/O 密集型任務（I/O-bound）**：網路請求、資料庫查詢、磁碟讀寫。任務等待 I/O 的時間，CPU 可以去處理其他任務。
- **需要同時回應多個請求的服務**：Web Server 同時接收上百個 HTTP 請求。

## 什麼是 Parallelism（並行）

**Parallelism（並行）是指多個任務在同一個時間點真正同時執行**，需要多個 CPU 核心或處理器才能實現。

同樣用廚房比喻：有三位廚師，每人各自負責一道菜，三道菜同時開工，這就是 Parallelism。

Parallelism 的關鍵條件：**必須有多個執行單元（多核心、多 CPU）**。在單核心環境下，不可能有真正的 Parallelism，只有 Concurrency。

Parallelism 適合解決的問題類型：

- **CPU 密集型任務（CPU-bound）**：數學運算、圖像處理、資料分析、機器學習訓練。
- **可以拆分的獨立計算**：將大型資料集分割成多份，由多個核心同時處理。

## 核心差異一覽

| 面向 | Concurrency（併發） | Parallelism（並行） |
|---|---|---|
| 定義 | 同時**管理**多個任務 | 同時**執行**多個任務 |
| 是否真正同時執行 | 不一定（可交錯） | 是 |
| 硬體需求 | 單核心即可 | 需要多核心 |
| 本質 | 結構設計問題 | 執行效能問題 |
| 適合任務類型 | I/O 密集型 | CPU 密集型 |
| 目標 | 提高資源利用率、回應性 | 縮短計算時間 |

一句話記憶法：**Concurrency 是「同時處理很多事」，Parallelism 是「同時做很多事」**。前者在乎結構，後者在乎速度。

## 常見混淆點

**Concurrency 不等於 Parallelism，有 Concurrency 不代表有 Parallelism**

兩者是正交的維度：你可以設計一個 Concurrent 的程式（能管理多個任務），但它在單核心上執行時就沒有 Parallelism。反過來說，Parallel 的執行通常需要先有 Concurrent 的設計，但也存在不涉及 Concurrency 的 Parallelism（例如 SIMD 資料並行指令）。

**有 Concurrency 不代表有 Parallelism**

這是最容易誤解的地方。Node.js 是一個典型例子——它可以同時管理成千上萬的連線（高 Concurrency），但 JavaScript 主執行緒永遠是單執行緒，沒有 Parallelism。

**Race Condition 是 Concurrency 問題，不是 Parallelism 問題**

當多個任務共用可變狀態時，交錯執行就可能產生 Race Condition，這屬於 Concurrency 設計上的挑戰，不論是否真正並行執行都可能發生。

## 後端實際場景

### Node.js：高 Concurrency，零 Parallelism（主執行緒）

Node.js 的 JavaScript 主執行緒是單執行緒，但透過**事件迴圈（Event Loop）**和**非阻塞 I/O**，它能同時管理大量連線。

當一個請求需要查詢資料庫時，Node.js 不會讓執行緒阻塞等待，而是將這個 I/O 操作交給底層的 libuv 去處理，主執行緒繼續接受下一個請求。等資料庫回傳結果，再透過 callback 或 Promise 回到主執行緒處理。

這是一個典型的 **Concurrency without Parallelism** 模型——結構上同時管理多個任務，但執行上同一時刻只有一件事在跑。

### Go：Concurrency 為核心設計，可達到 Parallelism

Go 的 goroutine 是極輕量的協程（coroutine），啟動一個 goroutine 的記憶體開銷大約只有 2 KB（相較於 OS 執行緒的 MB 級別）。

Go 的 GMP 排程模型：

- **G（Goroutine）**：使用者層級的輕量任務
- **M（Machine）**：對應 OS 執行緒
- **P（Processor）**：邏輯處理器，數量由 `GOMAXPROCS` 控制（預設等於 CPU 核心數）

Go runtime 會將 goroutine 分配到 P 上，P 再對應到 M（OS 執行緒）執行。當 `GOMAXPROCS > 1` 時，多個 goroutine 可以真正在多核心上同時執行，達到 Parallelism。

也就是說，Go 的設計以 Concurrency 為核心，但天然支援 Parallelism。

### 多執行緒 + 多核心：傳統 Parallelism 模型

Java 等語言的多執行緒程式，若在多核心機器上執行，每個執行緒可以分配到不同核心，實現真正的 Parallelism。Python 因為有 GIL（Global Interpreter Lock），多執行緒無法用於 CPU 密集型任務，必須透過 `multiprocessing` 模組建立獨立 Process 才能達到 Parallelism。

但多執行緒帶來的挑戰是需要處理共用狀態的同步問題（Lock、Mutex），設計上更複雜，也更容易出現 Deadlock 或 Race Condition。

## 總結

- **Concurrency**：同時**管理**多個任務的能力，是一種設計結構，單核心即可實現
- **Parallelism**：同時**執行**多個任務，是一種執行方式，需要多核心
- 兩者不是同一個維度的概念：Concurrency 是設計，Parallelism 是效果
- Node.js：高 Concurrency，主執行緒無 Parallelism
- Go：以 Concurrency 為核心，多核心下自動具備 Parallelism
- 選擇依據：I/O 密集型問題優先考慮 Concurrency 模型，CPU 密集型問題才需要 Parallelism

## 參考

- [Concurrency is not parallelism - The Go Blog](https://go.dev/blog/waza-talk)
- [Concurrency is not Parallelism - Rob Pike Slides](https://go.dev/talks/2012/waza.slide)
- [The Node.js Event Loop | Node.js Docs](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Concurrency vs Parallelism | Baeldung on Computer Science](https://www.baeldung.com/cs/concurrency-vs-parallelism)
- [ByteByteGo | Concurrency vs Parallelism](https://bytebytego.com/guides/concurrency-is-not-parallelism/)
- [Go Concurrency Model: Goroutines and the GMP Scheduler](https://projectlighthouse.io/books/go-intermediate/pages/concurrency-model)
