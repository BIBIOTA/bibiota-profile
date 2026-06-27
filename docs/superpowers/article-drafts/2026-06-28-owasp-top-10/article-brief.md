# Article Brief: OWASP Top 10 簡介（2025 版）

## 基本資訊

- **工作主題**：OWASP Top 10 簡介（2025 版）
- **文章類型**：Daily Questions Challenge 技術文章
- **編號**：#34
- **預計日期**：2026-06-28
- **預計 slug**：`2026-06-28-owasp-top-10`

## 目標讀者

後端工程師與全端工程師，有基本 Web 開發經驗，但對應用程式安全（AppSec）尚不熟悉或需要系統化整理。

## 文章目的

讓讀者快速建立對 OWASP Top 10（2025 版）的整體認識，了解各類漏洞的概念與在後端 / API 開發中的實際風險，並知道為何作為後端工程師需要關心這份清單。

## 核心問題

> OWASP Top 10（2025 版）列出哪些最常見的 Web 應用程式安全風險？後端工程師應如何理解它們？

## 文章範圍

- 介紹 OWASP 組織與 Top 10 文件的意義
- 依 2025 版清單逐一說明 A01–A10，每項包含：
  - 漏洞概念（2–3 行）
  - 後端 / API 實際場景（1 個具體例子）
- 與 2021 版的主要差異（新增項目、排名變動）
- 摘要：後端工程師為何要了解 OWASP Top 10

## 非目標

- 不深入每項漏洞的完整修補方案（避免過於發散）
- 不涵蓋 OWASP 其他專案（如 ASVS、SAMM、Mobile Top 10）
- 不包含 CTF 或滲透測試技術細節

## OWASP Top 10 2025 清單

| # | 類別 | 與 2021 比較 |
|---|------|------------|
| A01 | Broken Access Control（失控的存取控制） | 維持 #1 |
| A02 | Security Misconfiguration（安全設定錯誤） | 從 #5 升至 #2 |
| A03 | Software Supply Chain Failures（軟體供應鏈失敗） | 新增 |
| A04 | Cryptographic Failures（加密失敗） | 維持 |
| A05 | Injection（注入攻擊） | 從 #3 降至 #5 |
| A06 | Insecure Design（不安全的設計） | 維持 |
| A07 | Authentication Failures（身份驗證失敗） | 調整 |
| A08 | Software or Data Integrity Failures（軟體與資料完整性失敗） | 維持 |
| A09 | Security Logging and Alerting Failures（日誌與警報失敗） | 維持 |
| A10 | Mishandling of Exceptional Conditions（例外處理不當） | 新增 |

主要變動：SSRF 不再獨立列出，併入 A01；A03 與 A10 為 2025 新增類別。

## Daily Questions Challenge 分類

置頂索引（`2026-05-26-daily-questions-challenge-2026.md`）中新增 **「資安」** 分類（目前尚無此類別），並將本文加入其中。

## 參考既有文章的注意事項

- 目前 Backend 分類下已有 JWT token、Rate Limiting、Redis Lock 等文章，本文不重複這些內容
- 「身份驗證」面向可與 JWT 文章互相參照
- 文章風格：實用、清晰、後端開發者視角，避免過度資安術語堆疊
