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

 require('dotenv').config()
 const fs = require('fs')
 const path = require('path')
 const matter = require('gray-matter')
 
 exports.getTechPosts = function getTechPosts(asFeed = false) {
   return loadDataFromDirectory('tech', asFeed)
 }

 exports.getTravelPosts = function getTravelPosts(asFeed = false) {
   return loadDataFromDirectory('travel', asFeed)
 }
 
 exports.getRunningPosts = function getRunningPosts(asFeed = false) {
   return loadDataFromDirectory('running', asFeed)
 }

 exports.getTitle = () => {
  return getTitle();
 }

 exports.getDescription = () => {
  return getDescription();
 }

 exports.getMetaData = function getMetaData() {
  const url = process.env.VITE_APP_SITE_URL;
  const title = getTitle();
  const description = getDescription(); 
  return [
    // Twitter
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-tw' }],
    ['meta', { property: 'og:site', content: url }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],      
  ];
 }

 function getTitle() {
  return "Yuki Ota's profile"
 }

 function getDescription() {
  return "Yuki Ota's profile page."
 }
 
 function loadDataFromDirectory(directory, asFeed) {
   const currentDir = path.resolve(__dirname, `../../docs/${directory}/posts`)
   fs.watch(currentDir, (eventType, filename) => {
     console.log(`Directory changed : ${directory} - ${filename}`)
     const configFilePath = path.resolve(__dirname, '../config.js')
     const time = new Date()
 
     try {
       fs.utimesSync(configFilePath, time, time)
     } catch (err) {
       fs.closeSync(fs.openSync(filename, 'w'))
     }
   })
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
     .sort((a, b) => b.date.time - a.date.time)
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
 