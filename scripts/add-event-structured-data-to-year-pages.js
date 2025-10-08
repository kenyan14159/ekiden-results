#!/usr/bin/env node

/**
 * 全14大会の年度別ページに構造化データを一括追加するスクリプト
 * 
 * 実行方法:
 * node scripts/add-event-structured-data-to-year-pages.js
 */

const fs = require('fs')
const path = require('path')

const races = [
  { slug: 'hakone', name: '箱根駅伝' },
  { slug: 'newyear', name: 'ニューイヤー駅伝' },
  { slug: 'queens', name: 'クイーンズ駅伝' },
  { slug: 'zenjitsu', name: '全日本大学駅伝' },
  { slug: 'izumo', name: '出雲駅伝' },
  { slug: 'fujisan', name: '富士山女子駅伝' },
  { slug: 'morinomiyako', name: '全国女子駅伝' },
  { slug: 'miyakooji-men', name: '全国男子駅伝' },
  { slug: 'miyakooji-women', name: '全国女子駅伝' },
  { slug: 'hiroshima', name: 'ひろしま男子駅伝' },
  { slug: 'prefecture-women', name: '全国都道府県対抗女子駅伝' },
  { slug: 'junior-high-men', name: '全国中学校駅伝男子' },
  { slug: 'junior-high-women', name: '全国中学校駅伝女子' },
]

function addEventStructuredData(raceSlug, raceName) {
  const filePath = path.join(process.cwd(), 'app', 'ekiden', raceSlug, '[year]', 'page.tsx')
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} が見つかりません`)
    return false
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // 既に追加済みかチェック
  if (content.includes('EventStructuredDataScript')) {
    console.log(`✓ ${raceName} - 既に追加済み`)
    return true
  }

  console.log(`🔧 ${raceName} - 構造化データ追加中...`)

  // 1. importを追加
  const importLine = `import { EventStructuredDataScript } from "@/lib/event-structured-data"`
  
  // BreadcrumbStructuredDataのimportの後に追加
  if (!content.includes(importLine)) {
    content = content.replace(
      /import { BreadcrumbStructuredData } from "@\/components\/BreadcrumbStructuredData"/,
      `import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"\nimport { EventStructuredDataScript } from "@/lib/event-structured-data"`
    )
  }

  // 2. JSX内に構造化データコンポーネントを追加
  // BreadcrumbStructuredDataの直後に追加
  const structuredDataJSX = `      <BreadcrumbStructuredData items={breadcrumbItems} />
      <EventStructuredDataScript 
        raceSlug="${raceSlug}" 
        year={params.year} 
        result={data}
      />`

  content = content.replace(
    /\s*<BreadcrumbStructuredData items={breadcrumbItems} \/>/,
    `\n${structuredDataJSX}`
  )

  // 3. 古い構造化データ定義を削除 (もし存在する場合)
  // structuredData変数の定義全体を削除
  content = content.replace(
    /\/\/ 構造化データ[\s\S]*?const structuredData = {[\s\S]*?}\s*\n/,
    ''
  )
  
  // 古いscriptタグを削除
  content = content.replace(
    /\s*<script[\s\S]*?type="application\/ld\+json"[\s\S]*?dangerouslySetInnerHTML[\s\S]*?\/>/g,
    ''
  )

  // ファイルを保存
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✓ ${raceName} - 構造化データ追加完了`)
  return true
}

// メイン処理
console.log('🚀 全14大会の年度別ページに構造化データを追加します...\n')

let successCount = 0
let skipCount = 0
let errorCount = 0

races.forEach(race => {
  try {
    const result = addEventStructuredData(race.slug, race.name)
    if (result === true) {
      const content = fs.readFileSync(
        path.join(process.cwd(), 'app', 'ekiden', race.slug, '[year]', 'page.tsx'), 
        'utf-8'
      )
      if (content.includes('EventStructuredDataScript')) {
        successCount++
      } else {
        skipCount++
      }
    } else {
      errorCount++
    }
  } catch (error) {
    console.error(`❌ ${race.name} - エラー:`, error.message)
    errorCount++
  }
})

console.log(`\n📊 実行結果:`)
console.log(`   ✅ 成功: ${successCount}大会`)
console.log(`   ⏭️  スキップ: ${skipCount}大会`)
console.log(`   ❌ エラー: ${errorCount}大会`)

if (successCount > 0) {
  console.log(`\n💡 次のコマンドでビルドを確認してください:`)
  console.log(`   npm run build`)
}
