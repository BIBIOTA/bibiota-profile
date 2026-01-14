export const personalDataRaw = {
  name: {
    'zh-TW': '太田裕揮',
    en: 'YUKI OTA',
    ja: '太田裕揮',
  },
  title: {
    'zh-TW': '後端工程師',
    en: 'Backend Engineer',
    ja: 'バックエンドエンジニア',
  },
  email: 'yukiotataitien@gmail.com',
  phone: import.meta.env.VITE_PHONE_NUMBER || '+886-XXX-XXX-XXX',
  location: {
    'zh-TW': '台北，台灣',
    en: 'Taipei, Taiwan',
    ja: '台北、台湾',
  },
  website: 'https://me.bibiota.com',
  summary: {
    'zh-TW': '擁有四年旅遊電商開發經驗的Node.js/NestJS & PHP後端工程師。能夠迅速熟悉各種專案與技術，擅長Issue tracking、分析系統架構、效能優化、版本升級。現職擔任公司特定產品線的負責人，主導技術規劃、開發、維護、優化等工作，同時熱衷分享技術知識、導入自動化工具、協助團隊使用AI工具(Claude Code, AI Code Review)。',
    en: 'Node.js/NestJS & PHP Backend Engineer with 4 years of experience in travel e-commerce. Proven ability to rapidly adapt to new projects and technologies. Skilled in issue tracking, system architecture analysis, performance optimization, and version upgrades. Currently serving as the technical lead for specific product lines, driving technical planning, development, maintenance, and optimization. Passionate about knowledge sharing, implementing automation workflows, and enabling team adoption of AI tools (Claude Code, AI Code Review).',
    ja: '旅行系Eコマースで4年の開発経験を持つ、Node.js/NestJS & PHPバックエンドエンジニア。新しいプロジェクトや技術への迅速な適応を得意とし、課題追跡、システムアーキテクチャ分析、パフォーマンス最適化、バージョンアップグレードに精通している。現在は特定プロダクトラインの技術責任者として、技術設計、開発、保守、最適化を主導。また、技術ナレッジの共有や自動化ツールの導入、AIツール（Claude Code, AI Code Review）を活用したチームの生産性向上にも意欲的に取り組んでいる。'
  },

  skills: [
    'PHP/Laravel',
    'Node.js/NestJs',
    'MySQL/MongoDB',
    'Redis',
    'GraphQL/REST API',
    'Docker',
    'CI/CD Pipeline',
    'Issue & Log Tracking',
    'System Analysis',
    'Scrum Master',
  ],

  languages: [
    {
      language: {
        'zh-TW': '中文',
        en: 'Chinese',
        ja: '中国語',
      },
      level: {
        'zh-TW': '母語',
        en: 'Native',
        ja: 'ネイティブ',
      },
    },
    {
      language: {
        'zh-TW': '日文',
        en: 'Japanese',
        ja: '日本語',
      },
      level: {
        'zh-TW': '流暢 - JLPT N1',
        en: 'Fluent - JLPT N1',
        ja: '流暢 - JLPT N1',
      },
    },
    {
      language: {
        'zh-TW': '英文',
        en: 'English',
        ja: '英語',
      },
      level: {
        'zh-TW': '普通 - TOEIC 710',
        en: 'Conversational - TOEIC 710',
        ja: '日常会話レベル - TOEIC 710',
      },
    },
  ],

  education: [
    {
      degree: {
        'zh-TW': '休閒與觀光管理系',
        en: 'Bachelor of Leisure and Tourism Management',
        ja: 'レジャー・観光管理学士',
      },
      institution: {
        'zh-TW': '樹德科技大學',
        en: 'Shu-Te University',
        ja: '樹徳科技大学',
      },
      duration: '2011 - 2015',
      location: {
        'zh-TW': '高雄市',
        en: 'Kaohsiung City',
        ja: '高雄市',
      },
    },
  ],

  experience: [
    {
      position: {
        'zh-TW': '後端工程師 (PHP / Laravel, Vue.js)',
        en: 'Backend Engineer (PHP / Laravel, Vue.js)',
        ja: 'バックエンドエンジニア (PHP / Laravel, Vue.js)',
      },
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
      responsibilities: [
        {
          'zh-TW': '旅遊電商後端服務開發，包括： 客端、後台、旅宿端、B2B系統以及部分後台前端頁面開發。',
            en: 'Travel EC backend service development, including: customer, admin, accommodation, B2B, and admin frontend pages development.',
            ja: 'トラベルECにおける、顧客向け、管理者向け、宿泊施設向け、B2B向けシステムおよび一部の管理者向けページのフロントエンド開発。',
        },
        {
          'zh-TW': '負責多個產品線的系統分析、新需求可行性及開發時程評估 (2024.11~)。',
          en: 'Conduct system analysis, feasibility assessments, and development timeline evaluations for multiple product lines (Nov. 2024 - Present).',
          ja: '複数のプロダクトラインにおけるシステム分析、新要件の実現可能性評価、および開発スケジュールの策定を担当 (2024.11~)。',
        },
        {
          'zh-TW': '管理2~3位負責產品線後端 (2024.11~)。',
          en: 'Lead and manage a team of 2-3 backend engineers responsible for specific product lines (Nov. 2024 - Present).',
          ja: 'プロダクトラインのバックエンドエンジニア2〜3名のマネジメントを担当 (2024.11~)。',
        }
      ],
      achievements: [
        {
          'zh-TW': '本地開發環境優化、偵錯機制改善、完善開發文件、協助團隊導入AI工具。提升開發效率及產品穩定性 (2022~)。',
          en: 'Enhanced development efficiency and product stability by optimizing the local environment, improving the debugging mechanism, creating documentation, and assisting the team in adopting AI tools (2022~).',
          ja: 'ローカル開発環境の最適化、デバッグ機能の改善、開発ドキュメントの最適化、チームへのAIツール導入を支援し、開発効率とシステム安定性の向上に貢献（2022～）。',
        },
        {
          'zh-TW': '導入自動化腳本及工具，提升開發體驗 (2022~)。',
          en: 'Improved the overall development experience by implementing automated scripts and tools (2022~).',
          ja: '自動化スクリプトとツールの導入。開発体験の向上（2022～）。',
        },
        {
          'zh-TW': '協助擴充產品線，從訂房平台擴大到提供團體旅遊、郵輪、高鐵票、旅遊行程等服務 (2023~)。',
          en: 'Assisted product line expansion, from hotel booking platform to group tours, cruises, high-speed rail tickets, and travel packages (2023~).',
          ja: 'プロダクトライン拡張を支援、ホテル予約プラットフォームから団体旅行、クルーズ、高速鉄道チケット、旅行パッケージまで拡大（2023～）。',
        },
        {
          'zh-TW': '獨自完成後端系統版本升級(PHP 7.1 ~ PHP 8.2、Laravel 6 ~ Laravel 11.x) (2022~2024)。',
          en: 'Independently managed and executed the backend system upgrade from PHP 7.1 to 8.2 and Laravel 6 to 11.x (2022-2024).',
          ja: '独自でシステムバージョンアップを実現（PHP 7.1からPHP 8.2、Laravel 6からLaravel 11.x）（2022～2024）',
        },
        {
          'zh-TW': '完成提供給公司與合作旅行社的第三方CRM服務串接，增加公司產品收入(2024)。',
          en: 'Successfully integrated a 3rd party CRM service for the company and partner travel agencies, resulting in increased product revenue (2024).',
          ja: '自社および提携旅行会社向けのサードパーティCRMサービス連携を主導し、プロダクト収益の増加に貢献（2024）。',
        },
        {
          'zh-TW': '實現部分舊有頁面前後端分離，成功降低後端維運成本及提升開發效率 (2022~)。',
          en: 'Achieved partial frontend/backend separation, successfully reducing operational costs and improving development efficiency (2022~).',
          ja: '一部ページのフロントエンド/バックエンドの分離を実現し、バックエンド運用コストの削減と開発効率の向上を実現（2022～）。',
        },
        {
          'zh-TW': '獨自完成Legacy PHP服務轉移到現有Laravel服務，減少公司維運成本及提升開發效率 (2022)。',
          en: 'Successfully migrated a legacy PHP service to Laravel service, reducing operational costs and boosting development efficiency (2022).',
          ja: 'レガシーPHPで構築されたサービスを既存のLaravelフレームワークへ移行し、運用コストの削減と開発効率の向上を実現（2022）。',
        }
      ],
    },
    {
      position: {
        'zh-TW': '網頁工程師 (PHP / Laravel, Node.js / NestJs, Vue.js, jQuery)',
        en: 'Web Engineer (PHP / Laravel, Node.js / NestJs, Vue.js, jQuery)',
        ja: 'Web エンジニア (PHP / Laravel, Node.js / NestJs, Vue.js, jQuery)',
      },
      company: {
        'zh-TW': '怎漾設計創意有限公司',
        en: 'How Design Co., Ltd.',
        ja: 'How Design 株式会社',
      },
      duration: {
        'zh-TW': '2021.02 - 2021.11',
        en: '2021.02 - 2021.11',
        ja: '2021年2月 - 2021年11月',
      },
      location: {
        'zh-TW': '台灣，台北市',
        en: 'Taipei, Taiwan',
        ja: '台湾、台北市',
      },
      current: false,
      responsibilities: [
        {
          'zh-TW': '網站前後端開發(預約系統、電商平台、品牌形象網站、活動頁面、後台系統)。',
          en: 'Full-stack website development, including booking systems, e-commerce platforms, corporate branding websites, event pages, and CMS.',
          ja: 'Webサイトのフルスタック開発（予約システム、ECプラットフォーム、ブランドイメージサイト、イベントページ、CMSシステム）',
        },
      ],
      achievements: [
        {
          'zh-TW': '建立各專案的開發環境(Docker)，實現標準化開發環境。',
          en: 'Established standardized Docker-based development environments for all projects, ensuring consistency and simplifying onboarding.',
          ja: '各プロジェクトの開発環境（Docker）を構築し、開発環境の標準化を実現。',
        },
      ],
    },
  ],
}
