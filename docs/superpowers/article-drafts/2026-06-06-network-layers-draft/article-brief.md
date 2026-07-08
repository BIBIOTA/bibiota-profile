# Article Brief：網際網路通訊協定的分層設計

## 基本資訊

- **工作主題**：網際網路通訊協定為什麼是分層設計？TCP/IP 模型各層負責什麼？
- **文章類型**：Daily Questions Challenge 技術文章
- **預計編號**：#12
- **預計日期**：2026-06-06（草稿，待 blog-metadata-planning 確認）
- **預計 slug**：`2026-06-06-network-protocol-layers`
- **系列關係**：第一篇（第二篇為 TCP vs UDP，預計 2026-06-07）

## 目標讀者

準備後端面試、對網路通訊有基本好奇但尚未系統了解的工程師。

## 文章目的

讓讀者理解分層模型的設計邏輯，對 TCP/IP 四層各自的職責有清楚的認識，為後續 TCP vs UDP 文章打好基礎。

## 核心問題

> 網際網路通訊協定為什麼要分層？各層在做什麼？

## 範圍（Scope）

- 分層設計的核心思想：模組化開發、高相容性、易於除錯
- OSI 的背景：由 ISO（國際標準化組織）制定，全名 Open Systems Interconnection，是一套讓不同廠商的設備能互通的標準參考模型
- OSI 七層模型（完整介紹）：
  - 應用層（Application）— HTTP/HTTPS、FTP、SMTP、DNS
  - 表徵層（Presentation）— 資料轉譯、加密解密（OSI 限定）
  - 會談層（Session）— 連線建立、管理與終止（OSI 限定）
  - 傳輸層（Transport）— TCP（可靠）、UDP（快速），差異留給下一篇
  - 網路層（Network）— IP、ICMP
  - 資料連結層（Data Link）— Ethernet、Wi-Fi（802.11）
  - 實體層（Physical）— 電子/光學/無線訊號，Hub、網路線、光纖
- TCP/IP 的背景：由 DARPA 研發、源自 ARPANET，是現今網際網路實際運行的基礎協定組，全名 Transmission Control Protocol / Internet Protocol
- 兩個模型的定位差異：OSI 是理論參考標準（設計用來讓不同廠商設備互通），TCP/IP 是實際運行的架構；工程師面試與日常溝通通常以 TCP/IP 為主，OSI 則用來幫助理解分層概念
- TCP/IP 四層架構與 OSI 七層的對應關係（表格呈現）
- 分層設計帶來的三大優勢：模組化開發、高相容性、易於除錯

## 非目標（Non-goals）

- 不詳細說明 TCP 與 UDP 差異（留給下一篇）
- 不涉及路由演算法細節
- 不介紹各協定的完整規範

## 置頂索引分類

- 新增 `### Network` 類別於 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`
- 這兩篇（網路分層 + TCP vs UDP）都放入 `### Network`

## 相關現有文章

- `2026-06-04-webrtc.md`（WebRTC 架構涉及傳輸層，可交叉引用）
- 第二篇 TCP vs UDP 文章（stash 中，待本篇完成後接續）

## 風格備註

- 語言：繁體中文，技術名詞加英文括號
- 用具體的資料傳送流程說明封裝概念
- 結尾說明「下一篇將深入傳輸層的 TCP 與 UDP」
- 結尾加「參考」區塊
