---
layout: doc
title: "[Daily Questions Challenge 47] Python asyncio 核心機制：Event Loop 與並發模型選型"
description: 深入解析 Python asyncio 的 Event Loop 調度原理，比較 asyncio、threading 與 multiprocessing 的適用場景，並說明 await、create_task、gather、wait_for、cancel 與 shield 的使用時機。
date: 2026-07-11
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Python
  - 軟體工程
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 47] Python asyncio 核心機制：Event Loop 與並發模型選型"
  - - meta
    - property: og:description
      content: 深入解析 Python asyncio 的 Event Loop 調度原理，比較 asyncio、threading 與 multiprocessing 的適用場景，並說明 await、create_task、gather、wait_for、cancel 與 shield 的使用時機。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 47] Python asyncio 核心機制：Event Loop 與並發模型選型"
  - - meta
    - name: twitter:description
      content: 深入解析 Python asyncio 的 Event Loop 調度原理，比較 asyncio、threading 與 multiprocessing 的適用場景，並說明 await、create_task、gather、wait_for、cancel 與 shield 的使用時機。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

一個需要同時發出幾百個 API 請求的 Python 服務，如果用同步寫法，每個請求都要等上一個完成才能發出；但如果開幾百個 Thread 或 Process，資源消耗又很高。asyncio 提供了第三條路：在**單個執行緒**內，讓多個任務交替推進，等待 I/O 的空檔切換到其他任務繼續執行。

理解 asyncio 之前，有必要先釐清 Python 的並發層級架構，以及 asyncio、threading、multiprocessing 三者各自解決的問題。

## 執行單元層級架構

Python 的執行單元從外到內分為四層：

```
OS → Process（行程）→ Thread（執行緒）→ Coroutine（協程）
```

- **Process**：擁有獨立記憶體空間，各自有一份 Python 直譯器和 GIL。
- **Thread**：同一個 Process 內共享記憶體，受 GIL 限制。
- **Coroutine**：在單個 Thread 內由 Event Loop 調度，不由 OS 管理，切換成本極低。

其中 GIL（Global Interpreter Lock）是理解 Python 並發的關鍵：**同一時間只有一個 Thread 能執行 Python bytecode**，這使得多個 Thread 在 CPU-bound 工作上無法真正平行。

## asyncio、threading 與 multiprocessing 的選型

| | asyncio | threading | multiprocessing |
|---|---|---|---|
| 執行模型 | 單執行緒，協作式 Concurrency | 多執行緒，搶佔式 Concurrency | 多行程，真正 Parallelism |
| GIL 影響 | 無爭搶（單執行緒） | CPU-bound 受限 | 不受影響（各有獨立 GIL） |
| 適合工作 | I/O-bound | I/O-bound | CPU-bound |
| 切換方式 | 程式主動（`await`） | OS 決定 | OS 決定 |

**原則**：
- I/O-bound（網路、資料庫、檔案讀寫）→ 優先選 `asyncio`，次選 `threading`
- CPU-bound（數學運算、圖像處理）→ 選 `multiprocessing`；`threading` 受 GIL 限制，無法真正加速

> 延伸閱讀：Concurrency 與 Parallelism 的概念對比可參考 [Challenge 43《並行與併發》](./2026-07-07-concurrency-vs-parallelism.md)。

## Event Loop 運作原理

asyncio 的核心是 **Event Loop**，可以想成餐廳的一位服務生：同時負責多位客人（Coroutine），當某位客人在等餐（I/O 操作）時，服務生不是站著等，而是去服務其他客人，等餐點好了再回來。

`await` 就是服務生收到「我在等餐」訊號的那一刻：當前 Coroutine 讓出控制權，Event Loop 繼續調度其他 Coroutine；等 I/O 完成，再把控制權交回原本的 Coroutine。

asyncio 的運作流程：

1. `asyncio.run(main())` 建立 Event Loop 並執行 `main` Coroutine。
2. Coroutine 執行到 `await` 時讓出控制權。
3. Event Loop 調度其他等待中的 Coroutine 或回呼。
4. I/O 完成後，Event Loop 將控制權交回原本的 Coroutine，繼續執行。

## Coroutine 的本質

`async def` 定義的函式呼叫後會回傳一個 **Coroutine 物件**，此時還沒有開始執行。必須透過 `await`、`asyncio.run()`、或包成 Task 才會真正跑起來。

```python
async def fetch_user():
    ...

coro = fetch_user()   # 只是建立 Coroutine 物件，還沒跑
result = await coro   # 這才開始執行
```

## 三種並發模式：await / create_task / gather

### `await`：依序執行

最直覺的寫法，但每個操作都需要等上一個完成才開始，總時間是各操作時間之和。

```python
result1 = await fetch_user()    # 等完才繼續
result2 = await fetch_order()   # 等完才繼續
result3 = await fetch_product() # 等完才繼續
# 總時間：3 秒（假設每個各 1 秒）
```

適合有**依賴關係**的操作（例如取得 user 後才能查對應的 order）。

### `create_task`：背景調度

立刻在背景排程 Task，讓 Event Loop 在等待期間可以做其他事，最後才取結果。

```python
task1 = asyncio.create_task(fetch_user())
task2 = asyncio.create_task(fetch_order())
await do_something_else()  # 中間可做其他事
result1 = await task1      # 需要時再取結果
result2 = await task2
# 總時間：~1 秒（並發等待）
```

適合**背景持續任務**或需要個別控制（取消、等待）的情境。

### `gather`：批次並發

同時啟動多個 Coroutine，等全部完成後一次回傳結果，順序與傳入順序相同。

```python
result1, result2, result3 = await asyncio.gather(
    fetch_user(),
    fetch_order(),
    fetch_product(),
)
# 總時間：~1 秒（三個同時跑）
```

預設行為：任一 awaitable 拋出例外，`gather()` 立刻將例外傳播給呼叫端，其餘 Task 仍繼續在背景執行。若需等全部完成再統一判斷結果，加上 `return_exceptions=True`。

適合**一次發出多個無依賴關係的請求**，且不需要在中間插入其他工作。

| | `await` | `create_task` | `gather` |
|---|---|---|---|
| 執行方式 | 依序 | 背景排程 | 批次並發 |
| 適合情境 | 有依賴關係 | 需個別控制 | 無依賴的批次請求 |
| 底層 | — | asyncio.Task | 多個 Task 的包裝 |

## 超時與取消：wait_for、cancel() 與 shield()

### `wait_for`：設定超時

為 Coroutine 或 Task 加上時間上限，超過後拋出 `asyncio.TimeoutError`。

```python
try:
    result = await asyncio.wait_for(fetch_user(), timeout=5)
except asyncio.TimeoutError:
    result = default_value
```

### `cancel()`：取消 Task

`task.cancel()` 不是立刻強制停止，而是在 Task 下次執行到 `await` 時**注入 `CancelledError`**。這是 asyncio 協作式調度的特性：只有在讓出控制權的時候才能被取消。

如果 Task 內部捕捉到 `CancelledError`，必須執行清理後**重新拋出**，讓外部知道 Task 確實被取消：

```python
async def fetch_with_cleanup():
    try:
        await some_io_operation()
    except asyncio.CancelledError:
        await cleanup()  # 執行清理
        raise            # 必須重新拋出
```

### `shield()`：保護關鍵工作不被取消

`asyncio.shield(coro)` 將傳入的 Coroutine 包成一個獨立的內部 Task。外部 Task 被 cancel 時，`await asyncio.shield(...)` 本身會拋出 `CancelledError`（外部照常被取消），但**內部被保護的 Task 不會被 cancel**，會繼續執行到完成。

```python
async def fetch_with_cleanup():
    try:
        await some_io_operation()
    except asyncio.CancelledError:
        await asyncio.shield(cleanup())  # 保護清理不被打斷
        raise
```

適用場景：資料庫 transaction 的 commit / rollback、關閉網路連線、寫入關鍵 log。

> **注意**：被 `shield()` 保護的 Task 在外部被 cancel 後仍會繼續跑，但沒有人在 `await` 它的結果。需要額外保存 Task 引用以避免成為孤兒 Task。

## 快速選型

```
工作類型？
├── I/O-bound → asyncio
│   ├── 多個無依賴請求 → gather()
│   ├── 背景任務 / 需個別控制 → create_task()
│   └── 有依賴關係 → await（依序）
└── CPU-bound → multiprocessing（各 Process 有獨立 GIL）
```

## 總結

asyncio 的設計圍繞著一個核心概念：**協作式讓出（cooperative yielding）**。`await` 是 Coroutine 主動讓出控制權的時機，Event Loop 利用這些讓出點交替調度多個任務，讓單執行緒能高效處理大量 I/O 操作。

選擇並發模型時，工作類型是唯一關鍵指標：I/O-bound 用 asyncio，CPU-bound 用 multiprocessing；threading 雖然可用於 I/O-bound，但在 Python 生態系中 asyncio 更輕量且行為可預期。

## 參考

- [Coroutines and Tasks — Python 3.14 Documentation](https://docs.python.org/3/library/asyncio-task.html)
- [A Conceptual Overview of asyncio — Python 3.14 Documentation](https://docs.python.org/3/howto/a-conceptual-overview-of-asyncio.html)
- [Event Loop — Python 3.14 Documentation](https://docs.python.org/3/library/asyncio-eventloop.html)
- [Speed Up Your Python Program With Concurrency — Real Python](https://realpython.com/python-concurrency/)
- [What Is the Python Global Interpreter Lock (GIL)? — Real Python](https://realpython.com/python-gil/)
