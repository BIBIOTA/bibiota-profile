<template>
  <footer class="footer py-6">
    <div class="text-center text-gray-400">
      <div>
        <div>
          &copy; {{ new Date().getFullYear() }} BiBiOTA
        </div>
        <div>
          Construct by
            <a class="link" href="https://vitepress.vuejs.org/" target="_blank">
              VitePress
            </a>
            &amp;
            <a class="link" href="https://tailwindcss.com/" target="_blank">
              Tailwind  CSS
            </a>
        </div>
        <div v-if="trafficCounts">
          今日瀏覽人次: {{ trafficCounts.count }}, 總瀏覽人次: {{ trafficCounts.totalCount }}
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    const trafficCounts = null;
    return {
      trafficCounts,
    };
  },
  methods: {
    async getTrafficCounts() {
      const trafficCounts = await axios.post(import.meta.env.VITE_APP_API_URL + '/traffic').then((res) => {
        const { data, status } = res.data;
        if (status) {
          return data;
        }
        return null;
      }).catch(() => {
        return null;
      });

      return trafficCounts;
    },
  },
  async created() {
    this.trafficCounts = await this.getTrafficCounts();
  },
};

</script>
