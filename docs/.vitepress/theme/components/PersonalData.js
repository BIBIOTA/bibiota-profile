export const personalDataRaw = {
  name: {
    'zh-TW': '太田裕揮',
    en: 'YUKI OTA',
    ja: '太田裕揮',
  },
  title: {
    'zh-TW': '資深後端工程師',
    en: 'Senior Backend Engineer',
    ja: 'シニアバックエンドエンジニア',
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
    'zh-TW': '擁有四年旅遊電商開發經驗的Node.js/NestJS & PHP後端工程師。能夠迅速熟悉各種專案與技術，擅長Issue tracking、分析系統架構、效能優化、版本升級。擔任公司特定產品線的負責人，主導技術規劃、開發、維護、優化等工作，同時熱衷分享技術知識、導入自動化工具、協助團隊使用AI工具(Claude Code, AI Code Review)。',
    en: 'Node.js/NestJS & PHP Backend Engineer with 4 years of experience in travel e-commerce. Proven ability to rapidly adapt to new projects and technologies. Skilled in issue tracking, system architecture analysis, performance optimization, and version upgrades. Served as the technical lead for specific product lines, driving technical planning, development, maintenance, and optimization. Passionate about knowledge sharing, implementing automation workflows, and enabling team adoption of AI tools (Claude Code, AI Code Review).',
    ja: '旅行系Eコマースで4年の開発経験を持つ、Node.js/NestJS & PHPバックエンドエンジニア。新しいプロジェクトや技術への迅速な適応を得意とし、課題追跡、システムアーキテクチャ分析、パフォーマンス最適化、バージョンアップグレードに精通している。特定プロダクトラインの技術責任者として、技術設計、開発、保守、最適化を主導。また、技術ナレッジの共有や自動化ツールの導入、AIツール（Claude Code, AI Code Review）を活用したチームの生産性向上にも意欲的に取り組んでいる。'
  },

  skills: [
    'PHP/Laravel',
    'Node.js/NestJs',
    'MySQL/MongoDB',
    'Redis',
    'GraphQL/REST API',
    'Docker',
    'CI/CD Pipeline',
    'Claude Code',
    'Issue & Log Tracking',
    'System Analysis',
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
      company: {
        'zh-TW': 'AsiaYo',
        en: 'AsiaYo',
        ja: 'AsiaYo',
      },
      duration: {
        'zh-TW': '2022.02 - 2026.04',
        en: '2022.02 - 2026.04',
        ja: '2022年2月 - 2026年4月',
      },
      location: {
        'zh-TW': '台灣，台北市 (全遠端)',
        en: 'Taipei, Taiwan (Remote)',
        ja: '台湾、台北市（リモート）',
      },
      current: false,
      positions: [
        {
          position: {
            'zh-TW': '資深後端工程師 (Tech Lead)  (PHP / Laravel, Vue.js)',
            en: 'Senior Backend Engineer (Tech Lead) (PHP / Laravel, Vue.js)',
            ja: 'シニアバックエンドエンジニア (Tech Lead)  (PHP / Laravel, Vue.js)',
          },
          duration: {
            'zh-TW': '2025.02 - 2026.04',
            en: '2025.02 - 2026.04',
            ja: '2025年2月 - 2026年4月',
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
              'zh-TW': '推動Claude Code導入，建立公司使用的Claude Code Skills，加速團隊開發效率200%、搜尋API效能提升10倍、部署時間降低50%。',
              en: 'Led Claude Code adoption; built company-wide Skills, improving team efficiency 200%, search API 10×, deploy time −50%.',
              ja: 'Claude Codeの導入を推進し、社内向けClaude Code Skillsを構築。チームの開発効率を200%向上、検索APIパフォーマンスを10倍改善、デプロイ時間を50%削減。',
            },
            {
              'zh-TW': '導入Spec-Driven Development（SDD），以規格文件驅動開發流程，提升需求溝通效率與開發品質。',
              en: 'Introduced Spec-Driven Development (SDD), driving development through specification documents to improve requirements communication and development quality.',
              ja: 'Spec-Driven Development（SDD）を導入し、仕様書駆動の開発プロセスを構築、要件コミュニケーションの効率と開発品質を向上。',
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
              'zh-TW': '完成遺留系統現代化遷移（前後端分離、Legacy PHP 服務轉移至 Laravel），降低維運成本並提升開發效率。',
              en: 'Modernized legacy systems through frontend/backend separation and PHP-to-Laravel migration, reducing operational costs and improving development efficiency.',
              ja: 'レガシーシステムの現代化（フロントエンド/バックエンド分離、レガシーPHPからLaravelへの移行）を完遂し、運用コストの削減と開発効率の向上を実現。',
            },
          ],
        },
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
