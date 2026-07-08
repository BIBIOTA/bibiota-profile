# Article Brief

## Working Topic

解釋並行（Parallelism）與併發（Concurrency）的概念，以及兩者的差異

## Article Type

Daily Questions Challenge（#43）

## Intended Reader

有後端開發基礎、正在準備面試的工程師，熟悉基本程式設計概念但對 Concurrency / Parallelism 的定義模糊或容易混淆的讀者。

## Article Purpose

釐清「併發」與「並行」這兩個常被混用的術語，讓讀者能夠在面試或設計討論中清楚區分與正確使用。

## Core Question

Concurrency（併發）與 Parallelism（並行）分別是什麼？它們有什麼差異？

## Scope

1. 定義 Concurrency（併發）：同時管理多個任務的能力，任務可以交錯執行，不一定同時進行
2. 定義 Parallelism（並行）：多個任務真正在同一時刻執行，需要多核心或多處理器
3. 兩者的核心差異比較（可用表格或圖示輔助）
4. 常見混淆點說明（例如：Concurrency 是設計問題，Parallelism 是執行問題）
5. 後端實際應用場景舉例：
   - Go goroutine（Concurrency 模型）
   - Node.js 單執行緒事件迴圈（Concurrency without Parallelism）
   - 多執行緒 + 多核心（Parallelism）
6. 總結與一句話記憶法

## Non-Goals

- 不深入各語言執行緒或協程的實作細節
- 不涵蓋 async/await 語法教學
- 不討論 Distributed Systems 層面的並行議題

## Suggested Category（Daily Questions Challenge）

軟體工程

## Notes from Similar Existing Posts

- `2026-06-26-oop-vs-fp.md`：同屬軟體工程類別，結構為概念定義 → 比較 → 實用取捨，可參考段落結構
- `2026-06-03-message-queue.md`：提到「高併發」但未解釋 Concurrency 概念本身，本文可補充定義層面
- `2026-06-07-tcp-udp.md`：雙概念比較文，使用表格整理差異的方式效果好，可參考

## Target Path

`docs/tech/posts/2026-07-07-concurrency-vs-parallelism.md`

## Index Placement

加入 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 的**軟體工程**分類
