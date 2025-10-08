#!/usr/bin/env node

/**
 * import文が抜けているファイルを修正するスクリプト
 */

const fs = require('fs')
const path = require('path')

const files = [
  'app/ekiden/newyear/[year]/NewYearYearClient.tsx',
  'app/ekiden/queens/[year]/QueensYearClient.tsx',
  'app/ekiden/zenjitsu/[year]/ZenjitsuYearClient.tsx',
  'app/ekiden/izumo/[year]/IzumoYearClient.tsx',
  'app/ekiden/fujisan/[year]/FujisanYearClient.tsx',
  'app/ekiden/morinomiyako/[year]/MorinomiyakoYearClient.tsx',
  'app/ekiden/miyakooji-men/[year]/MiyakoojiMenYearClient.tsx',
  'app/ekiden/miyakooji-women/[year]/MiyakoojiWomenYearClient.tsx',
  'app/ekiden/hiroshima/[year]/HiroshimaYearClient.tsx',
  'app/ekiden/prefecture-women/[year]/PrefectureWomenYearClient.tsx',
  'app/ekiden/junior-high-men/[year]/JuniorHighMenYearClient.tsx',
  'app/ekiden/junior-high-women/[year]/JuniorHighWomenYearClient.tsx',
]

console.log('🔧 import文を追加します...\n')

let fixedCount = 0

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} が見つかりません`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf-8')

  // 既に追加済みかチェック
  if (content.includes('import { generateYearDetailLinks }')) {
    console.log(`✓ ${filePath} - 既に追加済み`)
    return
  }

  console.log(`🔧 ${filePath} - import追加中...`)

  // import文を追加
  // useRouterのimportの後に追加
  content = content.replace(
    /import { useRouter } from "next\/navigation"/,
    `import { useRouter } from "next/navigation"\nimport { InternalRelatedLinks } from "@/components/InternalRelatedLinks"\nimport { generateYearDetailLinks } from "@/lib/internal-links"`
  )

  fs.writeFileSync(fullPath, content, 'utf-8')
  console.log(`✓ ${filePath} - 完了`)
  fixedCount++
})

console.log(`\n📊 ${fixedCount}ファイルを修正しました`)
