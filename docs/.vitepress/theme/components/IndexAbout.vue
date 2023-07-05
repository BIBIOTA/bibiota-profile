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
      <h1 class="text-2xl md:text-3xl font-medium whitespace-nowrap pb-4">
        BiBiOTA - Backend Engineer
      </h1>
      <ul class="dashed">
        <li class="text-left font-light">
          從飯店櫃檯轉職網頁開發的後端工程師。<br />
          擁有 {{carrerCaculateYear}} 年的後端開發經驗，擅長使用 PHP、Node.js。
          <br />
          喜歡學習、研究任何軟體開發相關的技術，同時也熱愛健行、旅行、跑步。
          <br />
          曾在台灣徒步環島、西班牙徒步朝聖之路。
        </li>
      </ul>
      <div class="flex justify-end pt-4">
        <svg v-for="(icon, i) in icons" :key="`icon_${i}`" class="mx-2" :style="`width: ${icon.size}px; height: ${icon.size}px`">
          <a :href="icon.href" target="_blank">
            <image :style="`width: ${icon.size}px; height: ${icon.size}px`" :xlink:href="withBase(icon.path)" :src="icon.src" :alt="icon.alt" />
          </a>
        </svg>
      </div>
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