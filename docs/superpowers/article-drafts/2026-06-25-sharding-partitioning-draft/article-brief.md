# Article Brief: Sharding 與 Partitioning 策略

## Working Topic

Sharding 與 Partitioning 策略

## Article Type

Daily Questions Challenge 技術文章

## Intended Reader

後端工程師或準備面試的技術人員，對資料庫基礎有一定了解（知道 Index、Transaction），但對 Sharding 和 Partitioning 的差異與實際設計尚不熟悉。

## Article Purpose

清楚說明 Partitioning 與 Sharding 的概念差異、常見的切分策略、Sharding Key 選擇的取捨，以及跨 Shard 查詢的挑戰，讓讀者能在面試或系統設計中有條理地回答這個問題。

## Core Question

當單一資料庫節點撐不住資料量或寫入壓力時，如何用 Sharding 或 Partitioning 拆分資料？兩者有什麼差異？各自的策略如何選擇？

## Scope

- Partitioning 的定義與常見類型（Horizontal、Vertical）
- Sharding 的定義，以及它與 Partitioning 的關係
- 常見 Sharding 策略：Hash Sharding、Range Sharding、Directory-based Sharding
- Sharding Key 的選擇原則與常見錯誤
- 跨 Shard 查詢（Cross-Shard Query）的挑戰
- Hotspot 問題與 Rebalancing 的挑戰
- 與讀寫分離的差異（呼應 Daily Questions Challenge #17）
- 適合與不適合使用 Sharding 的場景

## Non-Goals

- 不深入各資料庫引擎的 Sharding 實作細節（如 MongoDB、Cassandra 的內部機制）
- 不涵蓋 Distributed SQL（如 CockroachDB、TiDB）的設計原理
- 不討論 Sharding 的運維操作（如 migration、監控）

## Suggested Category（Daily Questions Challenge）

Database

## Suggested Challenge Number

#31

## Notes from Similar Existing Posts

- **Daily Questions Challenge #17（讀寫分離）**：文章末的比較表已提到「Sharding 解決單一資料集太大或寫入壓力太高」，本篇可直接呼應這個說明並展開。
- **Daily Questions Challenge #13（Index）**、**#18（ACID）**、**#16（Transaction Isolation Level）**：本篇在講 Sharding Key 與跨 Shard 查詢時，可以假設讀者已理解 index 查詢與 transaction 概念。
- 風格：和既有文章一樣，用 mermaid 圖示說明架構，用表格做策略比較，用 zh-TW 為主、英文術語括號補充。
