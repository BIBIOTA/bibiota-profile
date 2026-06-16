# Article Review Report

## Article Path

`docs/tech/posts/2026-06-16-llm-api-best-practices.md`

## Review Status

**passed** — 1 個機械性修正已套用，無需用戶決定的問題。

## Checks Performed

- [x] Frontmatter 完整性（layout、title、description、date、avatar、tags）
- [x] Open Graph meta（og:title、og:description）與 frontmatter 一致
- [x] Twitter meta（twitter:title、twitter:description）與 frontmatter 一致
- [x] VitePress imports（ArticleTitle、ScrollToTopBtn）存在且正確使用
- [x] Daily Questions Challenge 編號（#22）與 avatar（/daily-questions-challenge.png）正確
- [x] 置頂索引（2026-05-26-daily-questions-challenge-2026.md）已在 AI Engineering 分類下新增連結
- [x] 章節層級（全部使用 h2，無跳層）
- [x] 繁體中文文法與標點
- [x] 參考資料格式與來源可信度
- [x] 概念正確性（錯誤分類、Backoff 公式、Streaming 機制、Token 計費、API Key 安全）

## Fixes Applied

### 修正 1：Jitter 公式與程式碼不一致

**問題**：文中公式說明等待時間為 `delay × (0.5 + random(0, 0.5))`，即 50%–100% 的 delay；但原始程式碼計算 `time.sleep(delay + jitter)` 實際上是 `delay × (1.0 + random(0, 0.5))`，與公式不符。

**修正前**：
```python
delay = base_delay * (2 ** attempt)
jitter = delay * random.uniform(0, 0.5)
time.sleep(delay + jitter)
```

**修正後**：
```python
delay = base_delay * (2 ** attempt)
sleep_time = delay * random.uniform(0.5, 1.0)
time.sleep(sleep_time)
```

修正後的程式碼與文中公式 `delay × (0.5 + random(0, 0.5))` 完全一致。

## Issues Requiring User Decision

無。

## Recommended Next Command

`npm run docs:build` 做建置驗證，或直接進行 commit。
