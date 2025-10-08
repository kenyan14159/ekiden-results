#!/usr/bin/env node

/**
 * 全14大会の一覧ページにItemList構造化データを一括追加するスクリプト
 * 
 * 実行方法:
 * node scripts/add-race-list-structured-data.js
 */

const fs = require('fs')
const path = require('path')

const races = [
  { slug: 'hakone', name: '箱根駅伝', resultsVar: 'hakoneResults' },
  { slug: 'newyear', name: 'ニューイヤー駅伝', resultsVar: 'newyearResults' },
  { slug: 'queens', name: 'クイーンズ駅伝', resultsVar: 'queensResults' },
  { slug: 'zenjitsu', name: '全日本大学駅伝', resultsVar: 'zenjitsuResults' },
  { slug: 'izumo', name: '出雲駅伝', resultsVar: 'izumoResults' },
  { slug: 'fujisan', name: '富士山女子駅伝', resultsVar: 'fujisanResults' },
  { slug: 'morinomiyako', name: '全国女子駅伝', resultsVar: 'morinomiyakoResults' },
  { slug: 'miyakooji-men', name: '全国男子駅伝', resultsVar: 'miyakoojiMenResults' },
  { slug: 'miyakooji-women', name: '全国女子駅伝', resultsVar: 'miyakoojiWomenResults' },
  { slug: 'hiroshima', name: 'ひろしま男子駅伝', resultsVar: 'hiroshimaResults' },
  { slug: 'prefecture-women', name: '全国都道府県対抗女子駅伝', resultsVar: 'prefectureWomenResults' },
  { slug: 'junior-high-men', name: '全国中学校駅伝男子', resultsVar: 'juniorhighMenResults' },
  { slug: 'junior-high-women', name: '全国中学校駅伝女子', resultsVar: 'juniorhighWomenResults' },
]

function addRaceListStructuredData(raceSlug, raceName, resultsVar) {
  const filePath = path.join(process.cwd(), 'app', 'ekiden', raceSlug, 'page.tsx')
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} が見つかりません`)
    return false
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // 既に追加済みかチェック
  if (content.includes('RaceListStructuredDataScript')) {
    console.log(`✓ ${raceName} - 既に追加済み`)
    return true
  }

  console.log(`🔧 ${raceName} - ItemList構造化データ追加中...`)

  // 1. importを追加
  const importLine = `import { RaceListStructuredDataScript } from "@/lib/event-structured-data"`
  
  if (!content.includes(importLine)) {
    // 既存のimportの後に追加
    content = content.replace(
      /import { generateRaceListLinks } from "@\/lib\/internal-links"/,
      `import { generateRaceListLinks } from "@/lib/internal-links"\nimport { RaceListStructuredDataScript } from "@/lib/event-structured-data"`
    )
  }

  // 2. useEffectがあるかチェック
  const hasUseEffect = content.includes('useEffect')
  
  if (!hasUseEffect) {
    // useEffectをimport
    content = content.replace(
      /import { useState } from "react"/,
      `import { useState, useEffect } from "react"`
    )
    
    // years stateを追加
    content = content.replace(
      /const \[selectedDecade, setSelectedDecade\] = useState<string \| null>\(null\)/,
      `const [selectedDecade, setSelectedDecade] = useState<string | null>(null)\n  const [years, setYears] = useState<number[]>([])`
    )
    
    // useEffectを追加
    const useEffectCode = `\n\n  // クライアント側でyearsを生成\n  useEffect(() => {\n    setYears(${resultsVar}.map(result => result.year))\n  }, [])`
    
    content = content.replace(
      /const relatedLinks = generateRaceListLinks\('[^']+'\)/,
      `const relatedLinks = generateRaceListLinks('${raceSlug}')${useEffectCode}`
    )
  }

  // 3. JSX内に構造化データコンポーネントを追加
  // returnの直後、最初のdivの開始タグの後に追加
  const structuredDataJSX = `    <div className="min-h-screen flex flex-col bg-gray-50">
      {years.length > 0 && (
        <RaceListStructuredDataScript raceSlug="${raceSlug}" years={years} />
      )}`

  content = content.replace(
    /\s*<div className="min-h-screen flex flex-col bg-gray-50">/,
    `\n${structuredDataJSX}`
  )

  // ファイルを保存
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✓ ${raceName} - ItemList構造化データ追加完了`)
  return true
}

// メイン処理
console.log('🚀 全14大会の一覧ページにItemList構造化データを追加します...\n')

let successCount = 0
let skipCount = 0
let errorCount = 0

races.forEach(race => {
  try {
    const result = addRaceListStructuredData(race.slug, race.name, race.resultsVar)
    if (result === true) {
      const content = fs.readFileSync(
        path.join(process.cwd(), 'app', 'ekiden', race.slug, 'page.tsx'), 
        'utf-8'
      )
      if (content.includes('RaceListStructuredDataScript')) {
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
