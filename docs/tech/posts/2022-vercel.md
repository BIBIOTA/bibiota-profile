---
layout: doc
title: 部署 Side Project - <br />免費仔的雲端部署筆記(Vercel)
description: 部署部落格到Velcel的流程
date: 2022-08-01
avatar: /./2022-vercel/cover.jpeg
tags:
  - Vercel
  - Vue.js
  - Cloud service
head:
  - - meta
    - property: og:title
      content: 部署 Side Project - 免費仔的雲端部署筆記(Vercel)
  - - meta
    - property: og:description
      content: 部署部落格到Velcel的流程
  - - meta
    - name: twitter:title
      content: 部署 Side Project - 免費仔的雲端部署筆記(Vercel)
  - - meta
    - name: twitter:description
      content: 部署部落格到Velcel的流程
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 前言
在[上一篇的文章中](../posts/2022-07-05-heroku.md)介紹了如何在Heroku將自己的前端專案部署上線，這一篇將會介紹另外一個最近找到的好用平台[Vercel](https://vercel.com/)。

## 為何選擇Vercel
會選擇Verel的原因，就是簡單方便 XD

因為當初在做各位眼前看到這個blog的時候，主要是希望可以把網站放在免費、好管理的平台上面。

雖然說Heroku我覺得已經蠻好用的，不過在看到網路上其他人使用Vercel將自己的VuePress部落格弄上去的心得後就覺得這個更佳<s>無腦</s> XD 因此就想用來試用看看～

## Vercel介紹
Vercel這間公司除了提供這次要介紹的雲端平台服務Vercel外，同時也是React框架Next.js的開發公司。

也因此Vercel能夠部署的專案環境也都是以前端框架為主，基本的前端御三家(Vue.js, Angular, React)都是沒有問題的。

Vercel和其他平台相比的優點在於它可以直接綁定自己Github/Gitlab/Bitbucket帳號及Repository，當今天把專案push上去後就可以觸發Vercel的CI/CD自動部署上線。

而且上述說的在都是包含在免費方案中，也不需要綁定信用卡，大推！

如果想要參考Vercel的付費內容的話可以參考[這邊](https://vercel.com/pricing)，基本上個人小專案應該是不太需要用到付費。

### 部署流程

1. 首先，當然是需要先到[官網註冊帳號](https://vercel.com/signup)，這邊可以直接使用要綁定的Github/Gitlab/Bitbucket帳號註冊。

2. 成功建立帳號登入後，點擊右上方的圖示icon到Dashboard頁面，接著點擊New Project就可以建立新的專案。

<ZoomImg src="./2022-vercel/dashboard.png" alt="dashboard" />

3. 在這個頁面選擇你要綁定的Git Repository。

<ZoomImg src="./2022-vercel/connect.png" alt="connect" />

4. 選擇好要部署的Repository後，接著就會到Config設定的頁面，在下面會簡單說明每個設定。

<ZoomImg src="./2022-vercel/config.png" alt="config" />

   - FRAMEWORK PRESET需要選擇這個Repo所使用的框架環境。
   - ROOT DIRECTORY是這個專案的根目錄設定，正常來說用預設即可，有特殊需求的話可以再自行修改。
   - Environment Variables這邊就是填入專案的一些環境變數設定，

<ZoomImg src="./2022-vercel/my-config.png" alt="my-config" />

   - Build and Output Settings這邊就是需要設定專案打包的指令及資料夾路徑的地方，可以選擇使用npm, pnpm或是yarn，這邊一樣就是看需求調整即可。
   
這一次我部署的專案是基於Vitepress開發的個人部落格，在上圖也將我的Vitepress設定提供給大家，供參考。

5. Config設定都完成就可以按下Deploy按鈕試試看了。成功的話就會跳轉到Congratulations頁面，代表Deploy都沒有問題哦！ 接著就可以到Vercel提供的Domain看看自己剛剛部署上去的網站了。

<ZoomImg src="./2022-vercel/congratulations.png" alt="congratulations" />

日後如果有想要調整Node.js版本或修改config設定的話，在Project建立完成後可以到Settings頁面裡面做更改。

### 同場加映 - 使用自己的網域及DNS服務

因為自己有在Cloudeflare購買個人網域及DNS服務，如果想要導到個人網域的話，可以到該專案的Settings頁面 > Domains 去新增自己的Domain。

<ZoomImg src="./2022-vercel/domain.png" alt="domain" />

Cloudflare的DNS這邊也需要做對應的設定。

<ZoomImg src="./2022-vercel/dns.png" alt="dns" />

這邊有踩到一個小坑就是當上面的設定都搞定後遇到了err_too_many_redirects的問題，Vercel官方這篇有寫到原因是因為Cloudflare的SSL/TLS設定成Flexible造成的。

解法是將Cloudflare這邊的SSL/TLS改設定成Full即可解決。

<ZoomImg src="./2022-vercel/cloudflare.png" alt="cloudflare"  />

### 結尾

以上就是透過Vercel將專案部署上線的過程，整個部署體驗真的是非常輕鬆 XD 非常推薦大家使用。

在此篇和上篇中，介紹了常用的兩個雲端平台Heroku和Vercel部署前端專案的過程，這兩個平台都是可以在沒有太多DevOps和Server知識就能夠將專案部署上線，對於一個簡單的個人網站/Side Project來說已經非常足夠。

不過工作中當然不可能只用Heroku或Vercel就能將網站弄上線，所以個人還是很推薦大家可以當個AWS/GCP免費仔來練習。

在後面的文章中，我也會分享我如何開一個AWS/GCP機器來部署自己的專案。

非常感謝大家收看:)

### 參考資料

[Vercel](https://vercel.com/)

[EasonChang - 使用 Vercel 發布我們的 Next.js 網站，搭配 Github 實現自動部署](https://ithelp.ithome.com.tw/articles/10269342)

[Vuepress 部落格開發踩坑記](https://lucas-yang.vercel.app/post/new-vuepress-blog/)