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
    'zh-TW': '擁有 4 年開發經驗的網頁後端工程師，擅長於完善開發流程、導入自動化工具、協助團隊導入及使用AI工具。',
    en: 'Web backend engineer with 4 years of development experience, specializing in improving development processes, implementing automation tools, and assisting teams in adopting and using AI tools.',
    ja: '4年間の開発経験を持つWebバックエンドエンジニア。開発プロセスの改善、自動化ツールの導入、チームへのAIツール導入と活用支援を得意とする。',
  },

  skills: [
    'PHP/Laravel',
    'Node.js/NestJs',
    'MySQL/MongoDB',
    'Redis',
    'GraphQL/REST API',
    'Docker',
    'CI/CD Pipeline',
    'Issues & Logs Tracking',
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
        en: 'Intermediate - TOEIC 710',
        ja: '中級 - TOEIC 710',
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
        'zh-TW': '後端工程師',
        en: 'Backend Engineer',
        ja: 'バックエンドエンジニア',
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
          'zh-TW': '旅遊電商客戶端服務開發。',
          en: 'Development of travel e-commerce services',
          ja: '旅行ECサイトのカスタマー向けサービス開発',
        },
        {
          'zh-TW': '後台系統及後台前端頁面開發。',
          en: 'CMS system and admin frontend page development',
          ja: 'CMSシステムと管理画面フロントエンド開発',
        },
        {
          'zh-TW': '第三方API串接 (B2B、供應商庫存、CRM、金流)',
          en: 'Third-party API integration (B2B, supplier inventory, CRM, payment flow)',
          ja: 'サードパーティAPI連携（B2B、サプライヤー在庫、CRM、決済フロー）',
        },
        {
          'zh-TW': '系統分析、新需求可行性及開發時程評估。',
          en: 'System analysis, feasibility assessment of new requirements and development timeline evaluation',
          ja: 'システム分析、新要件の実現可能性と開発スケジュール評価',
        },
        {
          'zh-TW': '負責1.5個產品線的專案時程、工作分配、人員管理(3~6後端人員)。',
          en: 'Responsible for project timeline, work allocation, and personnel management (3-6 backend people) for 1.5 product lines',
          ja: '1.5つのプロダクトラインのプロジェクトスケジュール、作業配分、人員管理（3〜6名）を担当',
        },
      ],
      achievements: [
        {
          'zh-TW': '後端系統版本升級(PHP 7.1 ~ PHP 8.2、Laravel 6 ~ Laravel 11.x)。',
          en: 'Backend system version upgrade (PHP 7.1 to PHP 8.2, Laravel 6 to Laravel 11.x)',
          ja: 'バックエンドシステムバージョンアップ（PHP 7.1からPHP 8.2、Laravel 6からLaravel 11.x）',
        },
        {
          'zh-TW': '開發體驗優化(本地開發環境優化、偵錯機制改善、完善開發文件、協助團隊導入AI工具）。',
          en: 'Development experience optimization (local development environment optimization, debugging mechanism improvement, improved development documentation, assisting team in implementing AI tools)',
          ja: '開発体験の最適化（ローカル開発環境の最適化、デバッグ機能の改善、開発ドキュメントの最適化、チームへのAIツール導入支援）',
        },
        {
          'zh-TW': '完善自動化工作流程(導入自動化腳本及工具)。',
          en: 'Improved automated workflow (implemented automated scripts and tools)',
          ja: '自動化ワークフローの改善（自動化スクリプトとツールの導入）',
        },
        {
          'zh-TW': '協助公司轉型擴充產品線，從原先的訂房網站擴大到提供B2B軟體、團體旅遊、郵輪、高鐵票預訂等服務。',
          en: 'Assisted company transformation and product line expansion, from original hotel booking website to B2B software, group tours, cruise, and high-speed rail ticket booking services',
          ja: '会社の変革とプロダクトライン拡張を支援、元のホテル予約サイトからB2Bソフトウェア、団体旅行、クルーズ、高速鉄道チケット予約サービスまで拡大',
        },
      ],
    },
    {
      position: {
        'zh-TW': '網頁工程師',
        en: 'Web Engineer',
        ja: 'Web エンジニア',
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
          en: 'Full-stack website development (booking system, e-commerce platform, brand image website, event pages, CMS system)',
          ja: 'Webサイトのフルスタック開発（予約システム、ECプラットフォーム、ブランドイメージサイト、イベントページ、CMSシステム）',
        },
      ],
      achievements: [
        {
          'zh-TW': '完成知名醫療中心官網前台、後台及預約系統開發並且上線。',
          en: 'Completed the development of the website, CMS system, and reservation system for a well-known medical center and launched it online.',
          ja: '医療センターの公式サイト、CMSシステム、予約システムの開発を完了し、オンラインで公開',
        },
        {
          'zh-TW': '建立各專案的開發環境(Docker)。',
          en: 'Established development environment (Docker) for various projects',
          ja: '各プロジェクトの開発環境（Docker）を構築',
        },
      ],
    },
  ],
}