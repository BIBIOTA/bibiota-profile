---
layout: doc
title: A vitepress powered blog
date: 2021-01-25
avatar: https://dictionary.cambridge.org/zht/images/thumb/capyba_noun_004_0649.jpg?version=5.0.244
tags:
  - Vitepress
  - Vue.js
  - Tailwind CSS
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
</script>

<ArticleTitle />

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

:tada: :100:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# 三個常用的Cloud Service介紹:

## Heroku

```
TEST
```

[Cloud Application Platform | Heroku](https://www.heroku.com/)

優點: 

- 可以用heroku自己的domain，不用自己買網域、DNS
- 不需要自己架server跟設定環境就可以把專案部署到線上
- 可以用git版控

缺點:

- 如果 30 分鐘內，沒有請求的話，機器會進入休眠，直到新的請求才會喚醒，但是喚醒的時候需要一點時間，新的請求 API 會卡住很久
因為會休眠，不適合跑cronjob
- 免費的機器使用上限只有 500 多個小時，如果都不關機的話，會有一陣子要關機才夠應付限制使用
- 如果有架設db需求，heroku提供的db很難設定，如有需求請參考[這裡](https://medium.com/@jedy05097952/node-js-mysql-%E9%83%A8%E7%BD%B2-heroku-f07a2d75e72f)

## AWS EC2

[免費雲端運算服務 - AWS 免費方案](https://aws.amazon.com/tw/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

[Amazon EC2 定價 - Amazon Web Services](https://aws.amazon.com/tw/ec2/pricing/)

[Amazon EC2 T2 執行個體 - Amazon Web Services (AWS)](https://aws.amazon.com/tw/ec2/instance-types/t2/)

優點:

- 一個帳號有每月750小時的免費額度，12個月免費。(如果只需要架一台效能需求不高的server，免費額度可以至少放一年不管)
- 可以自己學怎麼架Linux環境

缺點:

- 如果專案效能或記憶體需求大於>2CPU || 1GB Memory。免費的機器規格不夠(可以參考下面定價上的規格→免費可以用t2.micro or t3micro)
    
    (曾經記憶體炸掉的受害者)
    

## GCP compute engine(GCE)

[Google Cloud Free Program](https://cloud.google.com/free/docs/gcp-free-tier)

優點:

- 可以自己選VM機器規格(用什麼規格就從你的免費額度扣)
- 可以自己學怎麼架Linux環境

缺點:

- 只有九十天300美金的免費額度

---

## 三種服務的安裝教學

[Heroku Install Guide](https://www.notion.so/Heroku-Install-Guide-7dbcc80cefeb43fabfaba288f62b0efc)

[AWS EC2 Install Guide](https://www.notion.so/AWS-EC2-Install-Guide-861003e48abe416dacbf1a8378f3b06d)

[GCP With docker-compose Install Guide](https://www.notion.so/GCP-With-docker-compose-Install-Guide-c11628643cef426db1019f999ff566b9)

---

## 免費仔總結:

不想要管理server、覺得機器休眠無所謂的話 heroku免費方便又快速

如果沒有效能記憶體需求AWS EC2可以放一年放到爛

如果有效能需求，用GCP GCE(但是每三個月要搬家一次複習流程XD)

想要簡化環境部署流程。用docker:)