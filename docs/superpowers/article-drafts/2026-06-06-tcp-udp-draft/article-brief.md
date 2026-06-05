# Article Brief：比較 TCP 與 UDP

## 基本資訊

- **工作主題**：介紹 TCP 與 UDP 的核心差異與適用場景
- **文章類型**：Daily Questions Challenge 技術文章
- **預計編號**：#12
- **預計日期**：2026-06-06（草稿，待 blog-metadata-planning 確認）
- **預計 slug**：`2026-06-06-tcp-udp`

## 目標讀者

準備軟體後端面試的工程師，希望能在面試中簡潔、完整地回答 TCP / UDP 相關題目。

## 文章目的

讓讀者能清楚說明 TCP 與 UDP 的特性差異，並舉出各自的適用場景，達到「面試可以直接說出來」的程度。

## 核心問題

> TCP 和 UDP 有什麼差別？各自適合用在哪些場景？

## 範圍（Scope）

- TCP 的核心特性：連線導向（三次握手簡介）、可靠傳輸、順序保證、流量控制
- UDP 的核心特性：無連線、不保證送達、不保證順序、低延遲
- 兩者差異對比（表格）
- 各自適合的場景舉例：
  - TCP：HTTP/HTTPS、資料庫連線、檔案傳輸
  - UDP：直播、線上遊戲、DNS、WebRTC（呼應既有文章）

## 非目標（Non-goals）

- 不深入三次握手的詳細封包流程
- 不涵蓋四次揮手（FIN）細節
- 不介紹 QUIC 或 TCP over UDP
- 不說明 Socket 程式設計

## 置頂索引分類

- 放入 `### Backend` 類別（與 JWT、Race Condition、Message Queue、WebRTC 同一類）

## 相關現有文章

- `2026-06-04-webrtc.md`（WebRTC 使用 UDP，可交叉引用）

## 風格備註

- 語言：繁體中文，技術名詞加英文括號
- 段落簡短，以清單呈現對比
- 結尾加「參考」區塊，引用 RFC 或 MDN 等可信來源
