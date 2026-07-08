# Verification Report: add-blog-search

> **SUPERSEDED（2026-07-08）**：本報告對應「標題＋描述＋內文」的初版實作。
> 之後範圍縮小為「標題＋描述」並移除全文索引，需重新執行 verification-before-completion；
> 本報告保留為歷史紀錄。

Date: 2026-07-08
Verifier: claude-code (Opus 4.8)

## Summary
- Code: PASS
- Spec: PASS
- Progress log: PASS
- Diagrams: n/a
- Designs: n/a

## Code Evidence

Lint：專案無 `lint` script，n/a。

測試（`npx vitest run`）：
```
 Test Files  4 passed (4)
      Tests  31 passed (31)
```

Scenario 覆蓋（spec 的 10 個 `#### Scenario:` 全數對應到同名測試）：
```
MATCH: 產生索引資料
MATCH: 內文純文字化
MATCH: 寫出索引檔
MATCH: 初始載入不抓索引
MATCH: 延遲載入索引
MATCH: 關鍵字為空
MATCH: 關鍵字命中
MATCH: 索引載入中就輸入
MATCH: 索引載入失敗
MATCH: 查無結果
```

Production build（`npm run docs:build`）：
```
build complete in 37.68s.
-rw-r--r-- docs/.vitepress/dist/tech-search-index.json (298893 bytes)
```
確認 Vite `buildStart` 外掛在 build 時把索引寫入並複製到 `dist` 根目錄。

手動 smoke test（`docs:serve` 8088 + Playwright，載入 `/tech/`）：
- 列表頁頂部渲染搜尋欄（placeholder「搜尋文章（標題、描述、內文）」），初始顯示完整列表與 5 頁分頁。
- 輸入「partition」→ 即時篩選為 9 篇，含僅在內文提及 partition 的文章（Consumer Lag、訊息傳遞語義、RabbitMQ vs Kafka 等），確認全文（內文）搜尋生效；分頁隨過濾集正確收合。
- 輸入不存在的關鍵字 → 顯示空狀態「找不到符合的文章」。
- 主控台 3 個 error 均為既有且與搜尋無關（favicon 404、流量計數器 `blog-api.bibiota.com/traffic` CORS）；搜尋索引 `/tech-search-index.json` 載入成功。

## Diagram Verification
| File | Type | Status | Notes |
|---|---|---|---|
| — | — | n/a | 本變更無 `diagrams/` 目錄 |

## Design Verification
| State | Figma node | Status | Diff |
|---|---|---|---|
| — | — | n/a | 本變更無 `designs/figma.md` |

## Next Actions
- 全部通過，建議執行 `openspec archive add-blog-search` 歸檔本變更。
