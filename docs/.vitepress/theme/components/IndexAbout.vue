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
    <div class="flex flex-col justify-around lg:w-2/3 md:w-2/3 sm:1/2 p-3 sm:p-5">
      <h1 class="text-2xl md:text-3xl font-medium pb-2 text-center md:text-left">
        YUKI OTA
      </h1>
      <h2 class="pb-4 text-sm md:text-base lg:text-lg text-center md:text-left">
        Backend Engineer | Backpacker | Hiker | Runner 
      </h2>
      <div class="text-sm md:text-base text-center md:text-left">
        更多關於我的資訊，歡迎到以下連結，或查看「<a class="text-indigo-600" href="/resume">Resume</a>」
      </div>
      <div class="flex justify-center md:justify-end pt-4 pb-4">
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
        {
          src: 'instagram.png',
          href: 'https://www.instagram.com/bibi_ota/',
          path: './instagram.svg',
          size: 32,
        },
        {
          src: 'backpacker.png',
          href: 'https://www.backpackers.com.tw/forum/search.php?searchid=34321337',
          path: './backpacker.png',
          size: 32,
        },
        {
          src: 'strava.png',
          href: 'https://www.strava.com/athletes/28179653',
          path: './strava.png',
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
