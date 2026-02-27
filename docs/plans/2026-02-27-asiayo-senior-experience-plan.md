# AsiaYo Senior Backend Engineer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add nested position display for AsiaYo experience (Senior Backend Engineer promotion) across 3 languages.

**Architecture:** Add `positions` array to AsiaYo experience entry in PersonalData.js. Update FinalResume.vue locale mapper to resolve nested positions. Update ResumeTemplate.vue to render nested positions with backward compatibility for flat entries.

**Tech Stack:** Vue 3, VitePress, Tailwind CSS

---

### Task 1: Update PersonalData.js — restructure AsiaYo experience

**Files:**
- Modify: `docs/.vitepress/theme/components/PersonalData.js:99-176`

**Step 1: Replace the AsiaYo experience entry**

Replace the existing AsiaYo experience object (lines 100-176) with the nested `positions` structure:

```js
{
  company: {
    'zh-TW': 'AsiaYo',
    en: 'AsiaYo',
    ja: 'AsiaYo',
  },
  duration: {
    'zh-TW': '2022.02 - 目前',
    en: '2022.02 - Present',
    ja: '2022年2月 - 現在',
  },
  location: {
    'zh-TW': '台灣，台北市 (全遠端)',
    en: 'Taipei, Taiwan (Remote)',
    ja: '台湾、台北市（リモート）',
  },
  current: true,
  positions: [
    {
      position: {
        'zh-TW': '資深後端工程師 (PHP / Laravel, Vue.js)',
        en: 'Senior Backend Engineer (PHP / Laravel, Vue.js)',
        ja: 'シニアバックエンドエンジニア (PHP / Laravel, Vue.js)',
      },
      duration: {
        'zh-TW': '2025.02 - 目前',
        en: '2025.02 - Present',
        ja: '2025年2月 - 現在',
      },
      responsibilities: [
        {
          'zh-TW': '負責郵輪商品線、高鐵商品線的系統分析、新需求可行性及開發時程評估及維護。',
          en: 'Conduct system analysis, feasibility assessments, development timeline evaluations, and maintenance for cruise and THSR product lines.',
          ja: 'クルーズ商品ラインおよび台湾新幹線商品ラインにおけるシステム分析、新要件の実現可能性評価、開発スケジュールの策定、保守を担当。',
        },
        {
          'zh-TW': '管理2~3位負責產品線後端。',
          en: 'Lead and manage a team of 2-3 backend engineers responsible for specific product lines.',
          ja: 'プロダクトラインのバックエンドエンジニア2〜3名のマネジメントを担当。',
        },
      ],
      achievements: [
        {
          'zh-TW': '推動Claude Code導入，建立公司使用的Claude Code Skills & Commands，加速團隊開發效率。',
          en: 'Drove adoption of Claude Code, established company-wide Claude Code Skills & Commands, accelerating team development efficiency.',
          ja: 'Claude Codeの導入を推進し、社内向けClaude Code Skills & Commandsを構築、チームの開発効率を向上。',
        },
      ],
    },
    {
      position: {
        'zh-TW': '後端工程師 (PHP / Laravel, Vue.js)',
        en: 'Backend Engineer (PHP / Laravel, Vue.js)',
        ja: 'バックエンドエンジニア (PHP / Laravel, Vue.js)',
      },
      duration: {
        'zh-TW': '2022.02 - 2025.01',
        en: '2022.02 - 2025.01',
        ja: '2022年2月 - 2025年1月',
      },
      responsibilities: [
        {
          'zh-TW': '旅遊電商後端服務開發，包括： 客端、後台、旅宿端、B2B系統以及部分後台前端頁面開發。',
          en: 'Travel EC backend service development, including: customer, admin, accommodation, B2B, and admin frontend pages development.',
          ja: 'トラベルECにおける、顧客向け、管理者向け、宿泊施設向け、B2B向けシステムおよび一部の管理者向けページのフロントエンド開発。',
        },
      ],
      achievements: [
        {
          'zh-TW': '本地開發環境優化、偵錯機制改善、完善開發文件、協助團隊導入AI工具，提升開發效率及產品穩定性。',
          en: 'Enhanced development efficiency and product stability by optimizing the local environment, improving the debugging mechanism, creating documentation, and assisting the team in adopting AI tools.',
          ja: 'ローカル開発環境の最適化、デバッグ機能の改善、開発ドキュメントの最適化、チームへのAIツール導入を支援し、開発効率とシステム安定性の向上に貢献。',
        },
        {
          'zh-TW': '導入自動化腳本及工具，提升開發體驗。',
          en: 'Improved the overall development experience by implementing automated scripts and tools.',
          ja: '自動化スクリプトとツールの導入。開発体験の向上。',
        },
        {
          'zh-TW': '協助擴充產品線，從訂房平台擴大到提供團體旅遊、郵輪、高鐵票、旅遊行程等服務。',
          en: 'Assisted product line expansion, from hotel booking platform to group tours, cruises, high-speed rail tickets, and travel packages.',
          ja: 'プロダクトライン拡張を支援、ホテル予約プラットフォームから団体旅行、クルーズ、高速鉄道チケット、旅行パッケージまで拡大。',
        },
        {
          'zh-TW': '獨自完成後端系統版本升級(PHP 7.1 ~ PHP 8.2、Laravel 6 ~ Laravel 11.x)。',
          en: 'Independently managed and executed the backend system upgrade from PHP 7.1 to 8.2 and Laravel 6 to 11.x.',
          ja: '独自でシステムバージョンアップを実現（PHP 7.1からPHP 8.2、Laravel 6からLaravel 11.x）。',
        },
        {
          'zh-TW': '完成提供給公司與合作旅行社的第三方CRM服務串接，增加公司產品收入。',
          en: 'Successfully integrated a 3rd party CRM service for the company and partner travel agencies, resulting in increased product revenue.',
          ja: '自社および提携旅行会社向けのサードパーティCRMサービス連携を主導し、プロダクト収益の増加に貢献。',
        },
        {
          'zh-TW': '實現部分舊有頁面前後端分離，成功降低後端維運成本及提升開發效率。',
          en: 'Achieved partial frontend/backend separation, successfully reducing operational costs and improving development efficiency.',
          ja: '一部ページのフロントエンド/バックエンドの分離を実現し、バックエンド運用コストの削減と開発効率の向上を実現。',
        },
        {
          'zh-TW': '獨自完成Legacy PHP服務轉移到現有Laravel服務，減少公司維運成本及提升開發效率。',
          en: 'Successfully migrated a legacy PHP service to Laravel service, reducing operational costs and boosting development efficiency.',
          ja: 'レガシーPHPで構築されたサービスを既存のLaravelフレームワークへ移行し、運用コストの削減と開発効率の向上を実現。',
        },
      ],
    },
  ],
},
```

**Step 2: Update title to Senior Backend Engineer**

Update `personalDataRaw.title` (lines 7-11):

```js
title: {
  'zh-TW': '資深後端工程師',
  en: 'Senior Backend Engineer',
  ja: 'シニアバックエンドエンジニア',
},
```

**Step 3: Verify file saves correctly**

Run: `node -e "import('./docs/.vitepress/theme/components/PersonalData.js').then(m => { const exp = m.personalDataRaw.experience[0]; console.log('positions:', exp.positions.length); console.log('senior responsibilities:', exp.positions[0].responsibilities.length); })"`
Expected: `positions: 2` and `senior responsibilities: 2`

**Step 4: Commit**

```bash
git add docs/.vitepress/theme/components/PersonalData.js
git commit -m "feat: restructure AsiaYo experience with nested positions for Senior promotion"
```

---

### Task 2: Update FinalResume.vue — locale mapper for nested positions

**Files:**
- Modify: `docs/.vitepress/theme/components/FinalResume.vue:226-233`

**Step 1: Update the experience mapper in the `personalData` computed property**

Replace lines 226-233:

```js
experience: personalDataRaw.experience.map(exp => ({
  position: exp.position[localeKey],
  company: exp.company[localeKey],
  duration: exp.duration[localeKey],
  location: exp.location[localeKey],
  responsibilities: exp.responsibilities.map(resp => resp[localeKey]),
  achievements: exp.achievements ? exp.achievements.map(ach => ach[localeKey]) : []
})),
```

With:

```js
experience: personalDataRaw.experience.map(exp => ({
  ...(exp.position ? { position: exp.position[localeKey] } : {}),
  company: exp.company[localeKey],
  duration: exp.duration[localeKey],
  location: exp.location[localeKey],
  ...(exp.responsibilities ? {
    responsibilities: exp.responsibilities.map(resp => resp[localeKey]),
  } : {}),
  ...(exp.achievements ? {
    achievements: exp.achievements.map(ach => ach[localeKey]),
  } : {}),
  ...(exp.positions ? {
    positions: exp.positions.map(pos => ({
      position: pos.position[localeKey],
      duration: pos.duration[localeKey],
      responsibilities: pos.responsibilities.map(resp => resp[localeKey]),
      achievements: pos.achievements ? pos.achievements.map(ach => ach[localeKey]) : [],
    })),
  } : {}),
})),
```

**Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/FinalResume.vue
git commit -m "feat: update locale mapper to support nested positions in experience"
```

---

### Task 3: Update ResumeTemplate.vue — render nested positions

**Files:**
- Modify: `docs/.vitepress/theme/components/ResumeTemplate.vue:50-93`

**Step 1: Replace the experience rendering block**

Replace lines 50-93 (the `<div class="space-y-4">` block inside the experience section) with:

```html
<div class="space-y-4">
  <div
    v-for="(job, index) in personalData.experience"
    :key="index"
    class="relative pl-6 border-l-2 border-gray-200"
  >
    <div class="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0"></div>
    <div>
      <!-- Nested positions (e.g. AsiaYo with multiple roles) -->
      <template v-if="job.positions">
        <p class="text-base text-indigo-600 font-medium">{{ job.company }}</p>
        <p class="text-xs text-gray-600">{{ job.duration }} • {{ job.location }}</p>

        <div
          v-for="(pos, posIdx) in job.positions"
          :key="posIdx"
          :class="posIdx > 0 ? 'mt-3 pt-3 border-t border-gray-100' : 'mt-2'"
        >
          <h3 class="text-lg font-semibold text-gray-900">{{ pos.position }}</h3>
          <p class="text-xs text-gray-500">{{ pos.duration }}</p>

          <div class="mt-2">
            <h4 class="text-sm font-medium text-gray-900 mb-2">
              {{ t('sections.responsibilities') }}
            </h4>
            <ul class="space-y-1">
              <li
                v-for="(resp, idx) in pos.responsibilities"
                :key="idx"
                class="text-gray-700 text-xs leading-loose"
              >
                • {{ resp }}
              </li>
            </ul>
          </div>

          <div v-if="pos.achievements && pos.achievements.length > 0" class="mt-3">
            <h4 class="text-sm font-medium text-gray-900 mb-2">
              {{ t('sections.achievements') }}
            </h4>
            <ul class="space-y-1">
              <li
                v-for="(achievement, idx) in pos.achievements"
                :key="idx"
                class="text-indigo-700 text-xs leading-loose"
              >
                ★ {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- Flat position (backward compatible) -->
      <template v-else>
        <h3 class="text-lg font-semibold text-gray-900">{{ job.position }}</h3>
        <p class="text-base text-indigo-600 font-medium">{{ job.company }}</p>
        <p class="text-xs text-gray-600">{{ job.duration }} • {{ job.location }}</p>

        <div class="mt-3">
          <h4 class="text-sm font-medium text-gray-900 mb-2">
            {{ t('sections.responsibilities') }}
          </h4>
          <ul class="space-y-1">
            <li
              v-for="(resp, idx) in job.responsibilities"
              :key="idx"
              class="text-gray-700 text-xs leading-loose"
            >
              • {{ resp }}
            </li>
          </ul>
        </div>

        <div v-if="job.achievements && job.achievements.length > 0" class="mt-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">
            {{ t('sections.achievements') }}
          </h4>
          <ul class="space-y-1">
            <li
              v-for="(achievement, idx) in job.achievements"
              :key="idx"
              class="text-indigo-700 text-xs leading-loose"
            >
              ★ {{ achievement }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</div>
```

**Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/ResumeTemplate.vue
git commit -m "feat: render nested positions in experience section with backward compatibility"
```

---

### Task 4: Visual verification with dev server

**Step 1: Start dev server**

Run: `npm run docs:dev`

**Step 2: Check all 3 languages**

Open browser and verify:
- `http://localhost:5173/resume` — zh-TW: AsiaYo 底下顯示兩個職位，Senior 有 2 條職責
- `http://localhost:5173/resume?lang=en` — en: Two positions nested under AsiaYo
- `http://localhost:5173/resume?lang=ja` — ja: AsiaYo の下に2つのポジション

**Step 3: Verify How Design entry still renders correctly (backward compatibility)**

Check that the second experience entry (怎漾設計) renders unchanged.

**Step 4: Check PDF page fit**

Open print preview (Ctrl+P) for each language. Verify content fits on 1 page. If it overflows, reduce spacing or content in a follow-up task.
