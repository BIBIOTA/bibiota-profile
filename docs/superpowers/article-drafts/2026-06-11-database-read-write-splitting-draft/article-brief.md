# Article Brief: 資料庫讀寫分離

## Working Topic

資料庫讀寫分離 — 透過主從複製與 Read Replica 分散讀取流量的架構取捨

## Article Type

Daily Questions Challenge — 技術文章

## Intended Reader

正在準備後端工程師面試、已理解基本資料庫 CRUD 與單一資料庫架構，但還不熟悉高流量系統如何擴展資料庫讀取能力的工程師。

## Article Purpose

讓讀者能清楚說明資料庫讀寫分離解決什麼問題、基本架構如何運作，以及它會帶來哪些一致性與維運取捨。

## Core Question

資料庫讀寫分離是什麼？為什麼要把讀取與寫入流量分到不同資料庫節點？它有哪些風險與適用場景？

## Scope

- 為什麼需要讀寫分離：讀多寫少場景、單一資料庫讀取壓力、查詢效能瓶頸
- 基本架構：
  - Primary / Master 負責寫入
  - Replica / Slave 負責讀取
  - Application 或中介層負責讀寫路由
- 主從複製的概念：資料從主庫同步到從庫，支援多個 Read Replica 分散查詢
- Replication Lag：寫入後從庫尚未同步完成，導致讀到舊資料
- Read-after-write consistency：使用者剛寫入資料後，如何避免立刻從 Replica 讀到舊狀態
- 常見解法：
  - 寫入後短時間讀主庫
  - 重要查詢指定讀主庫
  - 依使用者或 Session 做一致性路由
  - 監控 replication lag 並在延遲過高時降級
- 適用場景與不適用場景
- 讀寫分離與水平分片、快取、CQRS 的概念邊界

## Non-Goals

- 不寫成 MySQL、PostgreSQL 或特定雲端資料庫的 replication 設定教學
- 不深入資料庫內部複製協議與 binlog / WAL 實作細節
- 不涵蓋完整資料庫 sharding 設計
- 不把 CQRS 作為主題，只在概念邊界中簡短對照

## Suggested Category

Database（Daily Questions Challenge 索引中的 Database 分類）

## Notes from Similar Existing Posts

- `2026-06-10-transaction-isolation-level.md`：同屬 Database 分類，重點放在單一資料庫內的交易一致性；本篇則延伸到多節點資料庫架構中的一致性取捨。
- `2026-06-09-rate-limiting.md`：同樣討論保護後端資源與分散流量壓力，但 Rate Limiting 是入口流量控制，讀寫分離是資料庫讀取擴展。
- `2026-06-03-message-queue.md`：可作為高併發背景參照；MQ 將請求非同步化，讀寫分離則用 Replica 分散查詢壓力。
- 置頂索引目前已有 Database 分類，並包含資料庫 Race Condition 與 Transaction Isolation Level，本篇適合接續為 Database 類別的新題。
- 文章編號預計為 **#17**（依目前 `2026-06-10` 文章為 #16 推算）。
- 日期暫定：2026-06-11。
