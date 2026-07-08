# Article Brief: Redis 快取在後端系統中到底怎麼設計

## 基本資訊

- 工作主題（Working Topic）：Redis 快取在後端系統中到底怎麼設計
- 文章類型（Article Type）：Daily Questions Challenge #24
- 建議分類（Pinned Index Category）：**新增「Caching」分類**（既有索引尚無此類別，需在 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 中新增）
- 建議草稿日期：2026-06-18（最終 date 與 slug 由 blog-metadata-planning 確認）
- 草稿資料夾：`docs/superpowers/article-drafts/2026-06-18-redis-caching-design/`

## 目標讀者

- 準備後端工程師面試、需要回答「如何設計 Redis 快取」這類系統設計題的讀者
- 已經會用 Redis、但對「快取讀寫模式」與「資料一致性取捨」沒有系統性整理的後端工程師

## 文章目的

提供面試與實務上可直接套用的判斷依據：**面對一個讀取頻繁的後端場景，應該選哪一種快取讀寫模式？以及這個選擇對 DB 與快取之間的一致性會造成哪些取捨？**

## 核心問題

Redis 快取在後端系統中到底怎麼設計？具體包含兩個子問題：

1. 四種主流的快取讀寫模式（Cache-Aside、Read-Through、Write-Through、Write-Behind）分別解決什麼問題、有什麼代價？
2. 每一種模式在「DB 與快取之間的一致性」上會帶來什麼取捨？該如何選？

## Scope（涵蓋）

1. 為什麼要在後端系統前面放 Redis（讀取吞吐、延遲、減輕 DB 壓力）。
2. **四種快取讀寫模式（核心章節）**：
   - Cache-Aside（Lazy Loading）：應用程式主導讀寫、最常見。
   - Read-Through：由快取層代理讀取、未命中時自行載入。
   - Write-Through：寫入同時更新 DB 與快取、強一致但寫入延遲較高。
   - Write-Behind（Write-Back）：先寫快取、非同步寫回 DB、高吞吐但有資料遺失風險。
3. **DB 與快取一致性取捨**：
   - 「先更新 DB 再刪快取」 vs 「先刪快取再更新 DB」的競態條件。
   - 為什麼業界普遍採用「Cache-Aside + 刪除（而非更新）快取」。
   - 弱一致性可以接受時，TTL 是最簡單的解。
4. 何時不該用 Redis 快取（一致性要求高、寫入遠多於讀取、資料量小直接打 DB 更便宜的場景）。

## Non-goals（不涵蓋）

- Redis 分布式鎖（已有 [Daily Questions Challenge 08] 專文）
- Cache Penetration（穿透）、Cache Breakdown（擊穿）、Cache Avalanche（雪崩）三大常見問題與防護機制（規模考量，留作後續 Daily Questions Challenge 獨立主題）
- Redis 部署 / Cluster / Sentinel 等高可用架構
- Redis 內部資料結構（SDS、ziplist、skiplist）實作細節
- Memcached、本機快取（in-process cache）等其他快取方案的全面比較
- 各語言 Redis client 的 API 範例

## 與既有文章的關聯

- [Daily Questions Challenge 08] [使用 Redis 分布式鎖避免 Race Condition](../../tech/posts/2026-06-02-redis-distributed-lock.md)
  - 同樣使用 Redis，但主題完全不同（lock vs cache），無內容重疊。
  - 本文應於開頭簡短帶到「Redis 除了當分布式鎖，最常見的用途其實是快取」作為延伸引導。
- [Daily Questions Challenge 11] [資料庫讀寫分離：Primary、Replica 與一致性取捨](../../tech/posts/2026-06-11-database-read-write-splitting.md)
  - 同樣涉及「讀寫分離」與「一致性取捨」的概念，可在小結處交叉參考：快取與 Replica 都是讀取擴展的手段，但一致性模型不同。

## 風格與結構備註

依照 `.codex/skills/blog-authoring-shared/blog-style-guide.md`：

- 標題格式：`[Daily Questions Challenge 24] Article Title`
- avatar：`/daily-questions-challenge.png`
- 結構建議：問題情境 → 四種模式逐一說明（各自附「適用場景／代價」）→ 一致性取捨章節 → 何時不該用 → 小結 → 參考
- 英文技術詞首次出現以括號標示中文／英文對照（例：`快取旁路（Cache-Aside）`）
- 必須在 pinned index 中**新增「Caching」分類**並登錄本文

## 待 blog-metadata-planning 確認的項目

- 最終 title（建議：`[Daily Questions Challenge 24] Redis 快取設計：四種讀寫模式與一致性取捨` 或類似精簡版本）
- description（單句、面向面試／實務）
- 最終 date（預設 2026-06-18）
- 最終 slug（建議：`redis-caching-design` 或 `redis-cache-patterns`）
- tags（建議：`Backend`、`Redis`、`Cache`）
- 是否在 pinned index 中正式新增 `### Caching` 分類段落
