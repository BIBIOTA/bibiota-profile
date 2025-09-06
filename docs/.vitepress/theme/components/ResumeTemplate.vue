<template>
  <div class="min-h-screen bg-gray-100 resume-page">
    <div class="flex justify-center">
      <div class="a4-page">
        <div class="resume-container" id="resume-container">
          <div class="bg-white shadow-lg print:shadow-none pdf-content">
            <div class="px-4 py-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div class="flex items-center space-x-6">
                <div class="flex-shrink-0">
                  <div class="h-24 w-24 rounded-full overflow-hidden">
                    <img
                      :src="withBase('/avatar.jpeg')"
                      alt="Profile Avatar"
                      class="w-full h-full object-cover"
                      style="transform: scale(1.8) translateY(10%); transform-origin: center center;"
                    />
                  </div>
                </div>
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>{{ personalData.name }}</span>
                    <span class="text-lg text-gray-600 font-normal">- {{ personalData.title }}</span>
                  </h1>
                  <div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                    <span>📧 {{ personalData.email }}</span>
                    <span v-if="shouldShowPhone">📞 {{ personalData.phone }}</span>
                    <span>📍 {{ personalData.location }}</span>
                    <a :href="personalData.website">🌐 {{ personalData.website }}</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 py-6 space-y-8">
              <section v-if="personalData.summary">
                <h2 class="text-xl font-bold text-gray-900 mb-2 border-b-2 border-indigo-500 pb-1">
                  {{ t('sections.summary') }}
                </h2>
                <p class="text-gray-700 text-sm leading-loose">
                  {{ personalData.summary }}
                </p>
              </section>

              <section>
                <h2 class="text-xl font-bold text-gray-900 mb-2 border-b-2 border-indigo-500 pb-1">
                  {{ t('sections.experience') }}
                </h2>
                <div class="space-y-4">
                  <div 
                    v-for="(job, index) in personalData.experience" 
                    :key="index"
                    class="relative pl-6 border-l-2 border-gray-200"
                  >
                    <div class="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 top-0"></div>
                    <div>
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
                    </div>
                  </div>
                </div>
              </section>

              <div class="grid grid-cols-2 gap-8">
                <section>
                  <h2 class="text-lg font-bold text-gray-900 mb-2 border-b-2 border-indigo-500 pb-1">
                    {{ t('sections.education') }}
                  </h2>
                  <div class="space-y-4">
                    <div 
                      v-for="(edu, index) in personalData.education" 
                      :key="index"
                      class="education-item"
                    >
                      <div class="leading-relaxed">
                        <h3 class="text-sm font-semibold text-gray-900 mb-1">{{ edu.degree }}</h3>
                        <p class="text-sm text-indigo-600 mb-1">{{ edu.institution }}</p>
                        <p class="text-xs text-gray-600 mb-1" v-if="edu.location">{{ edu.location }}</p>
                        <span class="text-xs text-gray-600">{{ edu.duration }}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 class="text-lg font-bold text-gray-900 mb-2 border-b-2 border-indigo-500 pb-1">
                    {{ t('sections.languages') }}
                  </h2>
                  <div class="space-y-1">
                    <div 
                      v-for="lang in personalData.languages" 
                      :key="lang.language"
                      class="flex justify-between items-center py-1"
                    >
                      <span class="text-sm font-medium text-gray-900">{{ lang.language }}</span>
                      <span class="text-sm text-indigo-600">{{ lang.level }}</span>
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h2 class="text-lg font-bold text-gray-900 mb-2 border-b-2 border-indigo-500 pb-1">
                  {{ t('sections.skills') }}
                </h2>
                <div class="flex flex-wrap gap-2 mt-4">
                  <span 
                    v-for="skill in personalData.skills" 
                    :key="skill"
                    class="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {{ skill }}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
  personalData: {
    type: Object,
    required: true
  },
  shouldShowPhone: {
    type: Boolean,
    default: false
  },
  t: {
    type: Function,
    required: true
  }
})
</script>

<style scoped>
.a4-page {
  width: 210mm;
  min-height: 297mm;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .a4-page {
    width: 95vw;
    min-height: calc(95vw * 1.414);
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.a4-page .pdf-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.a4-page .resume-container {
  width: 100%;
  min-height: 297mm;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .a4-page .resume-container {
    min-height: calc(95vw * 1.414);
  }
}

@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .resume-page {
    background: white !important;
  }

  .a4-page {
    width: 100% !important;
    min-height: auto !important;
    max-height: none !important;
    height: auto !important;
    background: white !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-inside: avoid !important;
  }
  
  .a4-page .resume-container {
    min-height: auto !important;
    height: auto !important;
  }
  
  .shadow-lg,
  .shadow-xl {
    box-shadow: none !important;
  }
  
  .pdf-content {
    width: 100% !important;
    height: auto !important;
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    page-break-inside: avoid !important;
  }
  
  .pdf-content .text-2xl {
    font-size: 1.4rem !important;
    line-height: 1.2 !important;
    margin-bottom: 0.5rem !important;
  }
  
  .pdf-content .text-xl {
    font-size: 1.1rem !important;
    line-height: 1.2 !important;
  }
  
  .pdf-content .text-lg {
    font-size: 0.95rem !important;
    line-height: 1.3 !important;
  }
  
  .pdf-content .text-base {
    font-size: 0.85rem !important;
    line-height: 1.3 !important;
  }
  
  .pdf-content .text-sm {
    font-size: 0.75rem !important;
    line-height: 1.4 !important;
  }
  
  .pdf-content .text-xs {
    font-size: 0.65rem !important;
    line-height: 1.3 !important;
  }
  
  .pdf-content .leading-loose {
    line-height: 1.6 !important;
  }
  
  .pdf-content .leading-relaxed {
    line-height: 1.5 !important;
  }
  
  .pdf-content .py-4 {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }
  
  .pdf-content .py-6 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  
  .pdf-content .px-4 {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
  
  .pdf-content .space-y-8 > * + * {
    margin-top: 1.25rem !important;
  }
  
  .pdf-content .space-y-6 > * + * {
    margin-top: 1rem !important;
  }
  
  .pdf-content .space-y-4 > * + * {
    margin-top: 0.75rem !important;
  }
  
  .pdf-content .space-y-3 > * + * {
    margin-top: 0.5rem !important;
  }
  
  .pdf-content .space-y-2 > * + * {
    margin-top: 0.375rem !important;
  }
  
  .pdf-content .h-24.w-24 {
    width: 4.5rem !important;
    height: 4.5rem !important;
  }
  
  .pdf-content .border-l-2 {
    padding-left: 0.5rem !important;
  }
  
  .pdf-content .absolute.w-3.h-3 {
    width: 0.5rem !important;
    height: 0.5rem !important;
    left: -0.25rem !important;
  }
  
  .pdf-content .bg-indigo-100 {
    font-size: 0.65rem !important;
    padding: 0.125rem 0.375rem !important;
  }
  
  .pdf-content .grid-cols-2 {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 0.75rem !important;
  }
  
  .pdf-content .resume-container,
  .pdf-content section {
    page-break-inside: avoid !important;
  }
}
</style>