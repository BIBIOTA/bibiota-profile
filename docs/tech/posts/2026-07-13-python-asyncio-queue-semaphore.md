---
layout: doc
title: "[Daily Questions Challenge 48] asyncio.Queue 與 asyncio.Semaphore：in-process 並發協調工具的分工"
description: 解析 asyncio.Queue 與 asyncio.Semaphore 的設計目的與差異，說明兩者如何在爬蟲場景中搭配使用，並釐清 asyncio.Queue 與 Laravel Queue + Redis 的根本不同。
date: 2026-07-13
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Python
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 48] asyncio.Queue 與 asyncio.Semaphore：in-process 並發協調工具的分工"
  - - meta
    - property: og:description
      content: 解析 asyncio.Queue 與 asyncio.Semaphore 的設計目的與差異，說明兩者如何在爬蟲場景中搭配使用，並釐清 asyncio.Queue 與 Laravel Queue + Redis 的根本不同。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 48] asyncio.Queue 與 asyncio.Semaphore：in-process 並發協調工具的分工"
  - - meta
    - name: twitter:description
      content: 解析 asyncio.Queue 與 asyncio.Semaphore 的設計目的與差異，說明兩者如何在爬蟲場景中搭配使用，並釐清 asyncio.Queue 與 Laravel Queue + Redis 的根本不同。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

掌握 asyncio 的 Event Loop 與 `create_task`、`gather` 之後（可參考 [Challenge 47](./2026-07-11-python-asyncio-event-loop.md)），下一個問題是：**同一個 event loop 裡的多個 coroutine，如何安全地傳遞任務，以及限制同時執行的數量？** `asyncio.Queue` 與 `asyncio.Semaphore` 是解決這兩個問題的工具，但職責完全不同。

## asyncio.Queue：in-process 任務緩衝

### 它解決什麼問題

多個 coroutine 在同一個 event loop 裡安全地傳遞任務：producer 負責產生工作項目，consumer 負責消費，但雙方的速度不同，需要一個緩衝層協調節奏。

### in-memory 的本質

asyncio.Queue 住在 **Python process 的記憶體**裡，沒有任何外部持久化。process 掛掉，queue 裡的資料就消失。

這與「Queue」這個詞在 MQ 生態系（Laravel Queue + Redis、RabbitMQ、Kafka）裡代表的意思有根本差異：

| 維度 | asyncio.Queue | Laravel Queue + Redis |
|------|--------------|----------------------|
| 儲存位置 | Python process 記憶體 | Redis（外部持久化） |
| 作用範圍 | 單一 process、單一 event loop | 跨 process、跨機器 |
| Process 掛掉 | 資料消失 | 資料保留 |
| 設計目的 | coroutine 之間的協調 | 分散式任務分發 |

延伸閱讀：Message Queue 的跨 process 設計可參考 [Challenge 10《使用 Message Queue 處理高併發下的排隊機制》](./2026-06-03-message-queue.md)。

### 核心行為：suspend 不是 block

```python
queue = asyncio.Queue()

async def producer():
    for url in urls:
        await queue.put(url)   # Queue 滿時（設定 maxsize）自動 suspend

async def consumer():
    while True:
        url = await queue.get()   # Queue 空時自動 suspend
        result = await fetch(url)
        await save_to_db(result)
        queue.task_done()
```

- Queue **空**時，`await queue.get()` 不會 block 整個 event loop，而是 **suspend 當前 coroutine**，把控制權還給 event loop，讓其他 coroutine 繼續跑；等 producer 放入新項目後才被喚醒。
- Queue **滿**時（設定 `maxsize > 0`），`await queue.put()` 同樣 suspend producer，不 block event loop。

這是 asyncio 的核心特性：`await` 是讓出控制權的時機，不是「卡住程式」。

## asyncio.Semaphore：並發數量限制

### 它解決什麼問題

在爬蟲場景中，20 個 consumer coroutine 同時發 HTTP request，可能打爆目標伺服器或觸發 rate limit。需要一個機制限制**同時執行某段程式碼的 coroutine 數量**。

### 計數器模型

Semaphore 內部維護一個計數器：

- `async with sem` 進入：計數器 -1
- `async with sem` 離開：計數器 +1，並喚醒下一個等待的 coroutine
- 計數器為 0 時，下一個嘗試進入的 coroutine 會 **suspend**（不 block event loop），等有人離開才被喚醒

```python
sem = asyncio.Semaphore(3)   # 同時最多 3 個

async def fetch(url):
    async with sem:
        response = await http_client.get(url)
        return response
```

`async with` 會自動處理計數器的增減，不需要手動呼叫 `release()`。

### Semaphore vs Lock

`asyncio.Lock` 本質上等同於 `asyncio.Semaphore(1)`，差異在於**允許同時進入的數量**與**設計語意**：

| | asyncio.Semaphore(N) | asyncio.Lock |
|--|---------------------|-------------|
| 允許同時進入數 | N 個 | 1 個 |
| 設計語意 | 限制並發數量（資源池） | 互斥存取共享資源 |
| 典型場景 | HTTP rate limit、DB 連線池上限 | 讀寫共享的計數器或快取 |

兩者都不追蹤「是哪個 coroutine acquire 的」——任何 coroutine 都可以呼叫 `release()`。選擇哪個是表達**意圖**的問題：限制並發數用 Semaphore，互斥存取用 Lock。

## Queue 與 Semaphore 的搭配

兩者職責不同，但在爬蟲場景中是自然的搭檔：

- **asyncio.Queue**：負責**資料流動**——URL 從 producer 傳到 consumer
- **asyncio.Semaphore**：負責**資源限流**——限制同時發出的 HTTP request 數量

```python
queue = asyncio.Queue()
sem = asyncio.Semaphore(5)   # 同時最多 5 個 HTTP request

async def producer(urls):
    for url in urls:
        await queue.put(url)

async def consumer():
    while True:
        url = await queue.get()
        async with sem:               # 進入限流區
            result = await fetch(url)
        await save_to_db(result)
        queue.task_done()             # 通知 Queue：此項目已處理完畢

async def main(urls):
    asyncio.create_task(producer(urls))
    workers = [asyncio.create_task(consumer()) for _ in range(20)]
    await queue.join()               # suspend，直到所有 task_done() 對應完畢
    for w in workers:
        w.cancel()                   # 任務結束後取消 worker，避免卡在 queue.get()
```

`queue.task_done()` 與 `queue.join()` 成對使用：每次 `get()` 取出一個項目後，處理完畢時呼叫 `task_done()`；`queue.join()` 會 suspend 直到所有取出的項目都已呼叫 `task_done()`，是安全等待「所有工作完成」的標準做法。

## 總結

| | asyncio.Queue | asyncio.Semaphore |
|--|--------------|-----------------|
| 解決的問題 | coroutine 之間的任務傳遞 | 限制同時執行的 coroutine 數量 |
| 作用範圍 | in-process，單一 event loop | in-process，單一 event loop |
| 典型場景 | producer-consumer 資料流 | rate limit、資源並發控制 |

兩者都是 in-process 工具，住在同一個 event loop 裡，不牽涉外部系統。`await queue.get()` 和 `async with sem` 在等待時都只是 suspend 當前 coroutine，不會阻塞整個 event loop——這是 asyncio 協作式調度的核心保證。

## 參考

- [Queues — Python 3.14 Documentation](https://docs.python.org/3/library/asyncio-queue.html)
- [Synchronization Primitives — Python 3.14 Documentation](https://docs.python.org/3/library/asyncio-sync.html)
