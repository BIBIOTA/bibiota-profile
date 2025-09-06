export const SUPPORTED_LOCALES = ['zh-TW', 'en', 'ja']

export const LOCALE_NAMES = {
  'zh-TW': '繁體中文',
  'en': 'English',
  'ja': '日本語'
}

export const LOCALE_FLAGS = {
  'zh-TW': '🇹🇼',
  'en': '🇺🇸',
  'ja': '🇯🇵'
}

const LOCALE_STORAGE_KEY = 'resume-locale'

function getStoredLocale() {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      return stored
    }
  } catch (error) {
    console.warn('Failed to get stored locale:', error)
  }
  return null
}

export function setStoredLocale(locale) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch (error) {
    console.warn('Failed to store locale:', error)
  }
}

function getBrowserLocale() {
  if (typeof window === 'undefined') return 'zh-TW'
  const browserLang = navigator.language || navigator.languages?.[0] || 'en'
  
  if (SUPPORTED_LOCALES.includes(browserLang)) {
    return browserLang
  }
  
  const langCode = browserLang.split('-')[0]
  const matchingLocale = SUPPORTED_LOCALES.find(locale => locale.startsWith(langCode))
  
  if (matchingLocale) {
    return matchingLocale
  }
  
  if (browserLang.includes('zh')) {
    return 'zh-TW'
  }
  
  if (browserLang.includes('ja')) {
    return 'ja'
  }
  
  return 'zh-TW'
}

function getInitialLocale() {
  const storedLocale = getStoredLocale()
  if (storedLocale) {
    return storedLocale
  }
  
  const browserLocale = getBrowserLocale()
  
  setStoredLocale(browserLocale)
  
  return browserLocale
}

export function switchLocale(locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}`)
    return
  }
  
  setStoredLocale(locale)
  
  if (typeof window !== 'undefined' && document) {
    document.documentElement.setAttribute('lang', locale)
  }
}

export function getCurrentLocale() {
  return getStoredLocale() || getInitialLocale()
}