# Article Brief：OOP 與 FP 的深入對比

## 基本資訊

- **工作主題**：OOP（物件導向程式設計）與 FP（函數式程式設計）的差異
- **文章類型**：Daily Questions Challenge — 軟體工程分類
- **預計日期**：2026-06-26
- **草稿 slug**：oop-vs-fp

## 目標讀者

有一定程式基礎（至少熟悉一種語言）、正在準備後端工程師面試的讀者。

## 文章目的

幫助讀者在面試中能清楚解釋 OOP 與 FP 的核心差異、各自的優缺點，以及現代語言如何融合兩種典範，並能舉出具體的程式碼範例說明。

## 核心問題

OOP 和 FP 分別基於什麼核心概念？它們在設計思維、程式碼組織方式、副作用管理上有何不同？各自適合什麼場景？現代語言又如何取長補短？

## 文章範圍

1. **OOP 核心概念**：封裝（Encapsulation）、繼承（Inheritance）、多型（Polymorphism）、抽象（Abstraction）
2. **FP 核心概念**：純函數（Pure Function）、不可變性（Immutability）、高階函數（Higher-Order Function）、函數組合（Function Composition）、副作用隔離（Side Effect Isolation）
3. **深入對比（side-by-side）**：
   - 狀態管理：可變狀態 vs 不可變資料
   - 程式碼組織：類別與繼承 vs 函數組合
   - 副作用處理：OOP 封裝副作用 vs FP 明確隔離副作用
   - 測試難度對比：mock 對比純函數
4. **程式碼範例**：同一問題分別用 OOP 與 FP 解決（建議用 TypeScript 或 Python）
5. **各自適用場景**：UI 元件、領域建模 vs 資料轉換、並行計算
6. **現代語言融合**：Scala、Kotlin、TypeScript、Python 等如何同時支援兩種典範
7. **總結**：面試中如何精準回答這道題

## 非目標

- 不深入 Monad、Functor 等進階 FP 理論
- 不涵蓋 Reactive Programming（RxJS 等）
- 不做各種語言的效能比較

## Daily Questions Challenge 分類

**軟體工程**（與現有的 BDD 文章同分類）

## 現有相關文章參考

無直接相關文章。可參考風格：
- `2026-05-29-bdd-behavior-driven-development.md`（同為軟體工程分類）
- `2026-06-20-rest-vs-graphql.md`（同為對比型文章，結構可參考）
