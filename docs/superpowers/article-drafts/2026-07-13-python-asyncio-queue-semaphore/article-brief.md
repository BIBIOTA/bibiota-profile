# Article Brief

## Working Topic

asyncio.Queue 與 asyncio.Semaphore：Python in-process 並發協調工具的分工與搭配

## Article Type

Daily Questions Challenge（第 48 題）

## Intended Reader

有後端開發背景、正在學習 Python asyncio 的工程師；特別是有 MQ（Redis、Laravel Queue）實務經驗，容易對「Queue」這個名詞產生誤解的讀者。

## Article Purpose

釐清 asyncio.Queue 與 asyncio.Semaphore 各自的設計目的，說明兩者如何在同一個 event loop 裡搭配使用，以爬蟲場景為核心示範。

## Core Question

asyncio.Queue 與 asyncio.Semaphore 各自解決什麼問題？如何搭配使用？

## Scope

- `asyncio.Queue`：in-memory 本質、producer-consumer 模式、Queue 空/滿時的 suspend 行為（不 block event loop）
- `asyncio.Semaphore`：計數器模型（停車場比喻）、`async with` 用法、計數器為 0 時的 suspend 行為
- Semaphore vs Lock：允許同時進入數、Owner 概念的差異
- asyncio.Queue vs Laravel Queue + Redis：in-process coroutine 協調 vs cross-process 分散式任務分發
- 兩者搭配的完整爬蟲範例（Queue 負責資料流動，Semaphore 負責資源限流）
- `queue.task_done()` 與 `queue.join()` 的搭配說明

## Non-Goals

- 不涵蓋 Redis、RabbitMQ、Kafka 等外部 MQ 系統的詳細設計
- 不討論 asyncio 以外的並發模型（threading、multiprocessing）選型——已在 Challenge 47 涵蓋
- 不涵蓋 asyncio.Queue 的 `maxsize` 調校策略

## Suggested DQC Category

Backend

## Notes from Similar Existing Posts

- **Challenge 47**（`2026-07-11-python-asyncio-event-loop.md`）：已涵蓋 Event Loop 原理、await / create_task / gather / wait_for / cancel / shield。本篇應以「下一步：有了並發能力之後，如何協調多個 coroutine 之間的資料流與資源存取」為切入點，避免重複說明 Event Loop 基礎。可以在開頭用一句話交叉引用 Challenge 47。
- **Challenge 10**（`2026-06-03-message-queue.md`）：涵蓋 MQ 概念與高併發排隊，可在 asyncio.Queue vs Laravel Queue 比較中交叉引用，強調設計目標的根本差異。

## Key Insight to Preserve

來源筆記的核心卡點值得保留為文章骨幹：
1. asyncio.Queue 的「Queue」與 MQ 的「Queue」名字相同，但設計目標完全不同（in-process 協調 vs cross-process 分散式分發）。
2. Queue 空時 `await queue.get()` 只 suspend 當前 coroutine，不 block event loop。
