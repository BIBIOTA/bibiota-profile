# AsiaYo Senior Backend Engineer 經歷新增

## 目標

在履歷頁面中呈現 AsiaYo 升遷為 Senior Backend Engineer 的經歷，採用巢狀呈現方式：一筆 AsiaYo 經歷下列出兩個職位階段。

## 資料結構變更（PersonalData.js）

將 AsiaYo experience entry 從扁平結構改為包含 `positions` 陣列：

- 移除頂層的 `position`、`responsibilities`、`achievements`
- 新增 `positions` 陣列，每個元素包含 `position`、`duration`、`responsibilities`、`achievements`
- 頂層保留 `company`、`duration`（總時間）、`location`、`current`

### Senior Backend Engineer (2025.02 - Present)

**Responsibilities：**
- 負責多個產品線的系統分析、新需求可行性及開發時程評估
- 管理 2~3 位負責產品線後端

**Achievements：**
- 推動 Claude Code 導入，建立公司使用的 Claude Code Skills & Commands，加速團隊開發效率

### Backend Engineer (2022.02 - 2025.01)

- Responsibilities：保留現有第一條（旅遊電商後端服務開發）
- Achievements：保留現有 7 條

## 模板變更（ResumeTemplate.vue）

Experience section 渲染邏輯：
- 有 `positions` 陣列 → 公司名稱 + 總時間 + 循環渲染各 position
- 無 `positions`（向後相容）→ 保持現有渲染方式

## 注意事項

- PDF 必須恰好 1 頁，需驗證不溢出
- 可能需調整 summary 中的年資描述
