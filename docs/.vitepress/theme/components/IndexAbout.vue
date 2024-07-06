<template>
  <div class="card index_about_card">
    <div class="lg:w-1/3 md:w-1/2 sm:w-1/2 lg:p-4 md:p-2 sm:p-2">
      <figure>
        <img
          class="rounded-full max-w-full"
          :src="withBase('./avatar.jpeg')"
          alt="avatar"
        >
      </figure>
    </div>
    <div class="flex flex-col justify-around lg:w-2/3 md:w-2/3 sm:1/2 p-5">
      <h1 class="text-2xl md:text-3xl font-medium whitespace-nowrap pb-2">
        BiBiOTA
      </h1>
      <h2 class="pb-4">
        Backend Engineer | Backpacker | Runner
      </h2>
      <ul class="dashed">
        <li class="text-left font-light">
          擁有 {{carrerCaculateYear}} 年開發經驗的後端工程師。 <br />
          熟悉 Laravel、Express.js、Nest.js 等框架，並有 Docker、CI/CD 等經驗。
          <br />
          除了程式開發，也熱愛健行、背包旅行、跑馬拉松。
          <br />
          更多關於我的資訊，歡迎到以下連結：
        </li>
      </ul>
      <div class="flex justify-end pt-4 pb-4">
        <svg v-for="(icon, i) in icons" :key="`icon_${i}`" class="mx-2" :style="`width: ${icon.size}px; height: ${icon.size}px`">
          <a :href="icon.href" target="_blank">
            <image :style="`width: ${icon.size}px; height: ${icon.size}px`" :xlink:href="withBase(icon.path)" :src="icon.src" :alt="icon.alt" />
          </a>
        </svg>
      </div>
      <ul>
        <li class="text-right font-light">
          - 不定期在 Medium 分享技術與數位遊牧文章。
          <br />
          - 不定期在背包客棧分享旅遊文章。
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { withBase } from 'vitepress'

export default {
  data() {
    return {
      icons: [
        {
          src: 'github.png',
          href: 'https://github.com/BIBIOTA',
          alt: 'github',
          path: './github.svg',
          size: 32,
        },
        {
          src: 'medium.png',
          href: 'https://medium.com/@s11110153',
          alt: 'medium',
          path: './medium.svg',
          size: 32,
        },
        {
          src: 'linkedin.png',
          href: 'https://www.linkedin.com/in/ota-yuki-a786101b0/',
          alt: 'linkedin',
          path: './linkedin.svg',
          size: 32,
        },
        {
          src: 'instagram.png',
          href: 'https://www.instagram.com/bibi_ota/',
          path: './instagram.svg',
          size: 32,
        },
        {
          src: 'backpacker.png',
          href: 'https://www.backpackers.com.tw/forum/member.php?u=1090694',
          path: './backpacker.svg',
          size: 32,
        }
      ],
    }
  },
  methods: {
    withBase,
  },
  computed: {
    carrerCaculateYear() {
      const start = new Date('2021-01-01');
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      return years;
    }
  },
}
</script>