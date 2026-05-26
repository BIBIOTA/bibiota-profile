/**
 * loadData.js
 *
 * An utility file adapted from https://github.com/vuejs/blog/blob/master/.vitepress/getPosts.js
 *
 * Main change : reload posts if a change has been detected on a watched directory.
 *
 * The update is triggered by using 'touch' the config.js file
 *
 * Note : this file is located in a `utils` subfolder of the `.vitepress` folder, change the path to conform to your setup.
 */

import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getTechPosts(asFeed = false) {
  return loadDataFromDirectory('tech', asFeed)
}

export function getTravelPosts(asFeed = false) {
  return loadDataFromDirectory('travel', asFeed)
}

export function getRunningPosts(asFeed = false) {
  return loadDataFromDirectory('running', asFeed)
}

export function getTitle() {
  return "Yuki Ota's profile"
}

export function getDescription() {
  return "Yuki Ota's profile page."
}

export function getMetaData() {
  const url = process.env.VITE_APP_SITE_URL;
  const title = getTitle();
  const description = getDescription();
  return [
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: `${url}avatar.jpeg` }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-tw' }],
    ['meta', { property: 'og:site', content: url }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${url}avatar.jpeg` }],
  ];
}

function loadDataFromDirectory(directory, asFeed) {
  const currentDir = path.resolve(__dirname, `../../docs/${directory}/posts`)
  if (process.argv.includes('dev')) {
    try {
      const watcher = fs.watch(currentDir, (eventType, filename) => {
        console.log(`Directory changed : ${directory} - ${filename}`)
        const configFilePath = path.resolve(__dirname, '../config.js')
        const time = new Date()

        try {
          fs.utimesSync(configFilePath, time, time)
        } catch (err) {
          fs.closeSync(fs.openSync(filename, 'w'))
        }
      })

      watcher.on('error', (err) => {
        console.warn(`Unable to watch ${directory} posts: ${err.message}`)
      })
    } catch (err) {
      console.warn(`Unable to watch ${directory} posts: ${err.message}`)
    }
  }
  return loadArticlesFromDirectory(currentDir, asFeed)
}

function loadArticlesFromDirectory(currentDir, asFeed = false) {
  return fs
    .readdirSync(currentDir)
    .map((file) => {
      const src = fs.readFileSync(path.join(currentDir, file), 'utf-8')
      const { data, excerpt, tags } = matter(src, { excerpt: true })
      const post = {
        title: data.title,
        href: `posts/${file.replace(/\.md$/, '.html')}`,
        date: formatDate(data.date),
        avatar: data.avatar,
        pinned: data.pinned === true,
        excerpt,
        tags
      }
      if (asFeed) {
        // only attach these when building the RSS feed to avoid bloating the
        // client bundle size
        post.data = data
      }
      return post
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1
      }

      return b.date.time - a.date.time
    })
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
