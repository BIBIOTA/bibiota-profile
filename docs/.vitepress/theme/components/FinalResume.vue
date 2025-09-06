<template>
  <Layout>
    <!-- 桌面版客製化導航按鈕 -->
    <template #nav-bar-content-after>
      <div class="hidden md:flex items-center space-x-4 flex-shrink-0 print:hidden resume-nav-buttons">
        <!-- 語言切換按鈕 -->
        <div class="relative">
          <button 
            @click="showLangMenu = !showLangMenu"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ currentLangFlag }} {{ currentLangName }}
            <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div 
            v-if="showLangMenu"
            class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div class="py-1">
              <button
                v-for="(lang, code) in languages"
                :key="code"
                @click="selectLanguage(code)"
                :class="[
                  'flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100',
                  currentLocale === code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                ]"
              >
                <span class="mr-3">{{ lang.flag }}</span>
                {{ lang.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 列印按鈕 -->
        <button 
          @click="printResume"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          {{ t('actions.print') }}
        </button>
        
        <!-- 下載PDF按鈕 -->
        <button
          @click="handlePrintToPDF"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ t('actions.downloadPDF') }}
        </button>
      </div>
    </template>

    <!-- 手機版漢堡選單內的客製化按鈕 -->
    <template #nav-screen-content-after>
      <div class="border-t border-gray-200 pt-4 pb-4">
        <div class="px-4">
          <div class="text-sm font-medium text-gray-900 mb-3">履歷功能</div>
          
          <!-- 語言切換 -->
          <div class="mb-4">
            <div class="text-xs font-medium text-gray-700 mb-2">語言切換</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(lang, code) in languages"
                :key="code"
                @click="selectLanguage(code)"
                :class="[
                  'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border',
                  currentLocale === code 
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300' 
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                ]"
              >
                <span class="mr-2">{{ lang.flag }}</span>
                {{ lang.name }}
              </button>
            </div>
          </div>
          
          <!-- 動作按鈕 -->
          <div class="flex flex-col space-y-3">
            <button 
              @click="printResume"
              class="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {{ t('actions.print') }}
            </button>
            
            <button
              @click="handlePrintToPDF"
              class="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ t('actions.downloadPDF') }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- 履歷內容放在 doc-before slot -->
    <template #doc-before>
      <ResumeTemplate
        :personalData="personalData"
        :shouldShowPhone="shouldShowPhone"
        :t="t"
      />
      
    </template>
  </Layout>
  <ResumeTemplate
    class="print:block hidden"
    :personalData="personalData"
    :shouldShowPhone="shouldShowPhone"
    :t="t"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { switchLocale, SUPPORTED_LOCALES } from '../i18n.js'
import { personalDataRaw } from './PersonalData.js'
import DefaultTheme from 'vitepress/theme'
import ResumeTemplate from './ResumeTemplate.vue'

const { Layout } = DefaultTheme

const translations = {
  'zh-TW': {
    'sections.summary': '個人簡介',
    'sections.experience': '工作經歷',
    'sections.responsibilities': '主要職責',
    'sections.achievements': '主要成就',
    'sections.education': '教育背景',
    'sections.skills': '專業技能',
    'sections.languages': '語言能力',
    'actions.print': '列印履歷',
    'actions.downloadPDF': '下載PDF'
  },
  'en': {
    'sections.summary': 'Summary',
    'sections.experience': 'Work Experience',
    'sections.responsibilities': 'Key Responsibilities',
    'sections.achievements': 'Key Achievements',
    'sections.education': 'Education',
    'sections.skills': 'Skills',
    'sections.languages': 'Languages',
    'actions.print': 'Print Resume',
    'actions.downloadPDF': 'Download PDF'
  },
  'ja': {
    'sections.summary': '概要',
    'sections.experience': '職歴',
    'sections.responsibilities': '主な職務',
    'sections.achievements': '主な成果',
    'sections.education': '学歴',
    'sections.skills': 'スキル',
    'sections.languages': '言語能力',
    'actions.print': '履歴書印刷',
    'actions.downloadPDF': 'PDFダウンロード'
  }
}

const getInitialLocale = () => {
  if (typeof window === 'undefined') return 'zh-TW'
  
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get('lang')
  
  if (langParam && SUPPORTED_LOCALES.includes(langParam)) {
    return langParam
  }
  
  return 'zh-TW'
}

const currentLocale = ref(getInitialLocale())
const showLangMenu = ref(false)

const languages = {
  'zh-TW': { name: '繁體中文', flag: '🇹🇼' },
  'en': { name: 'English', flag: '🇺🇸' },
  'ja': { name: '日本語', flag: '🇯🇵' }
}

const currentLangName = computed(() => languages[currentLocale.value]?.name || '繁體中文')
const currentLangFlag = computed(() => languages[currentLocale.value]?.flag || '🇹🇼')


const t = (key) => {
  return translations[currentLocale.value]?.[key] || key
}

const personalData = computed(() => {
  const localeKey = currentLocale.value
  return {
    name: personalDataRaw.name[localeKey],
    title: personalDataRaw.title[localeKey],
    email: personalDataRaw.email,
    phone: personalDataRaw.phone,
    location: personalDataRaw.location[localeKey],
    website: personalDataRaw.website,
    summary: personalDataRaw.summary[localeKey],
    skills: personalDataRaw.skills,
    languages: personalDataRaw.languages.map(lang => ({
      language: lang.language[localeKey],
      level: lang.level[localeKey]
    })),
    experience: personalDataRaw.experience.map(exp => ({
      position: exp.position[localeKey],
      company: exp.company[localeKey],
      duration: exp.duration[localeKey],
      location: exp.location[localeKey],
      responsibilities: exp.responsibilities.map(resp => resp[localeKey]),
      achievements: exp.achievements ? exp.achievements.map(ach => ach[localeKey]) : []
    })),
    education: personalDataRaw.education.map(edu => ({
      degree: edu.degree[localeKey],
      institution: edu.institution[localeKey],
      duration: edu.duration,
      location: edu.location[localeKey]
    }))
  }
})

const updateUrlLang = (locale) => {
  if (typeof window === 'undefined') return
  
  const url = new URL(window.location)
  url.searchParams.set('lang', locale)
  window.history.replaceState({}, '', url)
}

const selectLanguage = (locale) => {
  currentLocale.value = locale
  switchLocale(locale)
  updateUrlLang(locale)
  showLangMenu.value = false
}

const getPdfFileInfo = () => {
  const langToFileMap = {
    'zh-TW': 'resume-zh-tw-yuki.ota.pdf',
    'en': 'resume-en-yuki.ota.pdf', 
    'ja': 'resume-jp-yuki.ota.pdf'
  }
  
  const fileName = langToFileMap[currentLocale.value] || 'resume-zh-tw-yuki.ota.pdf'
  const pdfUrl = `/pdf/${fileName}`
  
  return { fileName, pdfUrl }
}

const printResume = () => {
  const { pdfUrl } = getPdfFileInfo()
  
  const newWindow = window.open(pdfUrl, '_blank')
  
  if (newWindow) {
    newWindow.onload = () => {
      setTimeout(() => {
        newWindow.print()
      }, 500)
    }
  }
}

const handlePrintToPDF = () => {
  const { fileName, pdfUrl } = getPdfFileInfo()
  
  const link = document.createElement('a')
  link.href = pdfUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const shouldShowPhone = computed(() => {
  if (typeof window === 'undefined') return false
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('show_phone_number') === 'true'
})

const handleClickOutside = (event) => {
  if (showLangMenu.value) {
    const langMenuElement = event.target.closest('.relative')
    if (!langMenuElement) {
      showLangMenu.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* 確保履歷頁面有正確的背景色和間距 */
.resume-page {
  min-height: 100vh;
}

/* 客製化導航按鈕樣式 */
.resume-nav-buttons {
  margin-left: 16px;
}

/* 確保按鈕在列印時隱藏 */
@media print {
  .resume-nav-buttons {
    display: none !important;
  }
}

/* 手機版漢堡選單內的客製化按鈕樣式 */
@media (max-width: 768px) {
  /* 確保桌面版按鈕在手機版完全隱藏 */
  .resume-nav-buttons {
    display: none !important;
  }
}

/* 隱藏 VitePress 自動產生的頁面標題 */
.resume-page :deep(.main .vp-doc h1#resume) {
  display: none !important;
}

/* 更通用的隱藏規則 */
.resume-page :deep(.vp-doc._resume h1:first-child),
.resume-page :deep(.vp-doc h1[id="resume"]),
.resume-page :deep(main .vp-doc h1:first-child) {
  display: none !important;
}

@media print {
  .VPNav,
  .VPSidebar,
  .VPContent,
  .VPDoc,
  .VPFooter,
  .print\:hidden,
  header.VPNav,
  .resume-nav-buttons,
  nav,
  .vp-doc h1#resume,
  .vp-doc._resume h1:first-child {
    display: none !important;
  }

  body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  @page {
    size: A4;
    margin: 5mm;
  }
}
</style>