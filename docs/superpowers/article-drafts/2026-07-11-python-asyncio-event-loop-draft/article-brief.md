# Article Brief：Python asyncio 核心機制

## 工作標題

Python asyncio 深度解析：Event Loop、async/await 與並發模型選型

## 文章類型

Daily Questions Challenge — **#47**

## 分類

**Backend**

## 目標讀者

有後端開發基礎、了解 I/O-bound 概念，但對 Python asyncio 內部機制不熟悉的工程師。

## 文章目的

讓讀者能清楚說明 Python asyncio 的調度原理，並在 `asyncio`、`threading`、`multiprocessing` 三種模型之間做出正確選型；同時能區分 `await`、`create_task`、`gather` 的使用時機，以及 `cancel()` 與 `shield()` 的實際行為。

## 核心問題

Python 的 Event Loop 如何在單執行緒內調度多個 Coroutine？`await`、`create_task`、`gather` 各自適合哪種場景？

## 涵蓋範圍

1. 執行單元層級架構：OS → Process → Thread → Coroutine
2. asyncio vs threading vs multiprocessing 選型對照表（I/O-bound vs CPU-bound、GIL 影響）
3. Event Loop 運作流程：以餐廳服務生比喻說明 `await` 讓出控制權的機制
4. `await` / `create_task` / `gather` 的差異、範例程式碼、適用情境
5. `wait_for`（超時）、`cancel()`（注入 CancelledError）、`shield()`（保護關鍵工作不被取消）
6. 快速選型記憶：工作類型 → 推薦工具

## 非目標

- 不含與 JS Promise 的橫向對比
- 不含 asyncio 進階 API（Queue、Semaphore、Lock 等）
- 不含「常見誤解」或「卡點」段落框架

## 參考來源

- 原始筆記：`/Users/bibiota/Documents/projects/study-zero-to-one/notes/python/2026-07-11-python-async-asyncio-event-loop.md`

## 相關現有文章

- Challenge 43《並行與併發：Parallelism 與 Concurrency 的差異》（`2026-07-07-concurrency-vs-parallelism.md`）
  — 概念層面的語言無關說明（Go、Node.js 視角），本篇為 Python 實作層面的延伸，可在文章中以一句話呼應。
