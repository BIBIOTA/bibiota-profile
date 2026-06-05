# Article Brief

## Working Topic

解釋 Laravel Eloquent Polymorphic Model

## Confirmed Article Type

Daily Questions Challenge technical article.

Suggested placement: Backend.

## Intended Reader

正在準備後端面試、或已經會使用 Laravel Eloquent 基本關聯但還不熟悉 polymorphic relationship 的工程師。

## Article Purpose

用技術文章的角度，清楚解釋 Laravel Eloquent polymorphic relationship 是什麼、它解決什麼資料模型問題、如何在資料表與 Model 中表達，以及實務上使用時需要注意哪些取捨。

## Core Question

Laravel Eloquent Polymorphic Relationship 是什麼？什麼時候應該使用它？它和一般 one-to-many / many-to-many 關聯有什麼差異？

## Scope

- 說明 polymorphic relationship 的核心概念：同一張關聯表可以指向多種不同 Model。
- 使用常見案例輔助理解，例如 comment 可以屬於 post 或 video，image 可以屬於 user 或 product。
- 說明資料表設計中的 `*_id` 與 `*_type` 欄位，例如 `commentable_id`、`commentable_type`。
- 介紹 Laravel Eloquent 常見方法：
  - `morphTo`
  - `morphOne`
  - `morphMany`
  - `morphToMany`
  - `morphedByMany`
- 比較 polymorphic relationship 和一般外鍵關聯的差異。
- 補充優點、缺點與不適合使用的情境。

## Non-goals

- 不深入介紹 Laravel Eloquent 的所有 relationship 類型。
- 不做完整可執行專案或 migration 教學。
- 不展開 Laravel framework 版本差異，除非官方文件有與 polymorphic relationship 直接相關的重要變動。
- 不討論 database normalization 的完整理論，只保留和 polymorphic table design 相關的重點。

## Suggested Category

Backend.

## Notes From Similar Existing Posts

- 目前 Daily Questions Challenge 主索引已有 Backend 分類，內容包含 JWT、Race Condition、Redis Distributed Lock、Message Queue、WebRTC。
- 近期文章多採用「概念說明 -> 使用場景 -> 架構或實作細節 -> 風險與取捨 -> 總結」的結構。
- 這篇可以延續面試題整理風格，標題後續可由 `blog-metadata-planning` 決定是否採用 `[Daily Questions Challenge 11] 解釋 Laravel Eloquent Polymorphic Model`。
- 文章應使用繁體中文，必要時保留英文技術詞，例如「多型關聯（Polymorphic Relationship）」。
- 技術參考來源應優先使用 Laravel 官方文件。
