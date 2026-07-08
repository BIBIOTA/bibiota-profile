# Verification Report: add-blog-search

Date: 2026-07-08
Verifier: claude-code (Opus 4.8)

> 註：本報告對應「標題＋描述」範圍調整後的最新實作，取代先前「標題＋描述＋內文」版本的驗證。

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
 Test Files  3 passed (3)
      Tests  24 passed (24)
```

Scenario 覆蓋（spec 的 3 個 `#### Scenario:` 全數對應同名測試）：
```
MATCH: 關鍵字為空
MATCH: 關鍵字命中
MATCH: 查無結果
```

Production build（`npm run docs:build`）：
```
build complete in 38.35s.
docs/.vitepress/dist/tech-search-index.json: No such file or directory  (已不再產生索引檔，符合移除全文索引的預期)
```

手動 smoke test（`docs:serve` 8088 + Playwright，載入 `/tech/`）：
- 列表頁頂部渲染搜尋欄（placeholder「搜尋文章（標題、描述）」、放大鏡圖示、白底邊框）。
- 輸入「partition」→ 僅篩選出標題／描述含 partition 的 2 篇（Kafka 擴充 Partition 的雷點、Sharding 與 Partitioning 策略）；先前內文搜尋造成的多餘結果已消除。
- 輸入不存在的關鍵字 → 顯示空狀態「找不到符合的文章」。
- 主控台 2 個 error 均為既有且與搜尋無關（favicon 404、流量計數器 `blog-api.bibiota.com/traffic` CORS）；已無索引 fetch。

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
