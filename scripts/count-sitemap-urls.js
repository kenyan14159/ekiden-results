#!/usr/bin/env node

// サイトマップのURL数をカウント
const races = {
  hakone: { start: 1920, end: 2025 },
  newyear: { start: 1951, end: 2026 },
  queens: { start: 1981, end: 2025 },
  izumo: { start: 1989, end: 2025 },
  zenjitsu: { start: 1970, end: 2025 },
  fujisan: { start: 2006, end: 2024 },
  morinomiyako: { start: 1983, end: 2024 },
  'miyakooji-men': { start: 1950, end: 2024 },
  'miyakooji-women': { start: 1989, end: 2024 },
  hiroshima: { start: 1996, end: 2025 },
  'prefecture-women': { start: 1983, end: 2025 },
  'junior-high-men': { start: 1990, end: 2024 },
  'junior-high-women': { start: 1990, end: 2024 },
}

let raceListUrls = 0
let aboutUrls = 0
let yearUrls = 0
let infoUrls = 5 // contact, disclaimer, operator-information, privacy-policy, scoring-table
let homeUrl = 1

// レースリストページ
raceListUrls = Object.keys(races).length // 13大会

// aboutページ (7大会のみ)
const racesWithAbout = ['hakone', 'newyear', 'queens', 'izumo', 'zenjitsu', 'fujisan', 'morinomiyako']
aboutUrls = racesWithAbout.length // 7

// 年度別ページ
for (const [race, range] of Object.entries(races)) {
  const count = range.end - range.start + 1
  yearUrls += count
  console.log(`${race}: ${range.start}-${range.end} = ${count}ページ`)
}

console.log('\n=== サイトマップURL数 ===')
console.log(`ホームページ: ${homeUrl}`)
console.log(`レースリストページ: ${raceListUrls}`)
console.log(`大会概要ページ: ${aboutUrls}`)
console.log(`年度別結果ページ: ${yearUrls}`)
console.log(`情報ページ: ${infoUrls}`)
console.log(`------------------------`)
console.log(`合計: ${homeUrl + raceListUrls + aboutUrls + yearUrls + infoUrls}ページ`)
