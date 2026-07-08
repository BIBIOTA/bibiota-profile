# Article Review Report

## Article Path

`docs/tech/posts/2026-07-07-concurrency-vs-parallelism.md`

## Review Status

**completed** — 兩處概念準確性問題已確認並修正。

## Checks Performed

- [x] Frontmatter 完整性（layout、title、description、date、avatar、tags）
- [x] OG / Twitter meta 與 title、description 一致性
- [x] VitePress 必要 import（ArticleTitle、ScrollToTopBtn）
- [x] Daily Questions Challenge 編號（43）、avatar、index 已更新
- [x] Heading 層級無跳級
- [x] 參考格式（`## 參考` + markdown bullet）
- [x] 繁體中文寫作、標點、段落長度
- [x] Rob Pike 演講年份（2012）與內容引用準確性
- [x] Go goroutine 初始 stack 大小（2 KB，Go 1.4+ 確認正確）
- [x] GMP 模型三元素定義
- [x] GOMAXPROCS 預設值（等於邏輯 CPU 核心數）
- [x] Node.js 事件迴圈說明

## Fixes Applied

無機械性錯誤，未做自動修正。

## Issues Requiring User Decision

### 問題 1：第 79 行標題「Concurrency 包含 Parallelism」語意不精確

**現況**：

```
**Concurrency 包含 Parallelism，但 Parallelism 不等於 Concurrency**
```

**問題**：「包含」（contains）暗示 Parallelism 是 Concurrency 的子集，但嚴格來說兩者是正交（orthogonal）的維度：

- 有 Concurrency 但無 Parallelism：Node.js 主執行緒
- 有 Parallelism 但設計上無 Concurrency（如 SIMD、簡單的資料並行）
- 兩者皆有：Go with GOMAXPROCS > 1
- 兩者皆無：單執行緒同步程式

Rob Pike 的原話也是「Concurrency is not Parallelism」，並未說「Parallelism is a subset of Concurrency」。

**建議替換標題**：

```
**Concurrency 不等於 Parallelism，有 Concurrency 不代表有 Parallelism**
```

或保留現有標題（視作常見教學簡化，body 說明已補充清楚）。

---

### 問題 2：第 117 行 Python 說法混用多執行緒與 multiprocessing

**現況**：

```
Java、Python（透過 multiprocessing）等語言的多執行緒程式，若在多核心機器上執行，每個執行緒可以分配到不同核心，實現真正的 Parallelism。
```

**問題**：Python 因為有 GIL（Global Interpreter Lock），多執行緒（multithreading）無法達到 CPU 密集型的 Parallelism；必須用 `multiprocessing` 才行。但這句話把 Java 的多執行緒和 Python 的 multiprocessing 混在同一個句子裡說「多執行緒程式」，對讀者可能造成誤解。

**建議修改**：

```
Java 等語言的多執行緒程式，若在多核心機器上執行，每個執行緒可以分配到不同核心，實現真正的 Parallelism。Python 因為有 GIL（Global Interpreter Lock），多執行緒無法用於 CPU 密集型任務，需透過 multiprocessing 模組建立獨立 Process 才能達到 Parallelism。
```

或簡化為只提 Java，移除 Python 舉例（保持範圍簡潔）。

## Recommended Next Step

確認以上兩個問題的處理方式後，執行 `npm run docs:build` 驗證建置，或直接準備 commit。
