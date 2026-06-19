# Article Brief: Dead Letter Queue (DLQ)

## Working Topic

Dead Letter Queue（DLQ，死信佇列）— Message Queue 訊息處理失敗後的機制設計

## Article Type

Daily Questions Challenge（技術文章）

## Challenge Number

\#25

## Intended Reader

有基本 Message Queue 概念（生產者/消費者模型）的後端工程師或面試準備者，希望了解訊息失敗後的系統設計思路。

## Article Purpose

補充 #09 Message Queue 文章未深入探討的「訊息失敗後怎麼辦」這個問題，讓讀者能完整回答面試中關於 MQ 容錯機制的問題。

## Core Question the Article Answers

當 Message Queue 中的訊息反覆處理失敗，系統應如何設計才能避免無限重試拖垮服務、同時保留錯誤訊息供後續排查？

## Scope

1. DLQ 的定義與角色（什麼是死信、DLQ 在 MQ 架構中的位置）
2. 訊息進入 DLQ 的觸發條件（重試次數耗盡、TTL 到期、訊息格式錯誤/無法解析、Consumer 拒絕確認）
3. DLQ 的實務用途（錯誤排查、監控告警、手動重試或丟棄）
4. DLQ 設計考量（重試退避策略 Exponential Backoff、避免無限重試循環、DLQ 本身的監控）
5. 常見 MQ 工具對 DLQ 的支援（RabbitMQ、SQS、Kafka 各自的機制簡述）

## Non-Goals

- 不深入介紹特定 MQ 工具的完整安裝或配置
- 不涵蓋 MQ 本身的基礎概念（已在 #09 說明）
- 不討論 Event Sourcing 或 CQRS 等進階架構

## Suggested Category

Backend（與 #09 Message Queue 同分類）

## Notes from Similar Existing Posts

- **#09 Message Queue（2026-06-03）**：已介紹生產者/消費者模型、削峰填谷、訊息遺失（Persistence）、重複消費（Idempotency）等挑戰。本篇應承接「訊息失敗後的處理」這個在 #09 中未深入的面向，可在開篇簡短 back-reference #09。
- **#08 Redis 分布式鎖（2026-06-02）**：文章間相互串聯的寫作風格可參考，以一段連結前文作為開場。
- **寫作結構參考**：問題情境 → 核心概念 → 運作機制 → 實務場景與取捨 → 總結 → 參考資料。

## Draft Folder

`docs/superpowers/article-drafts/2026-06-19-dead-letter-queue/`
