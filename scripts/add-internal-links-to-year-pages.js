#!/usr/bin/env node

/**
 * 全14大会の年度別ページ(Client Component)に内部関連リンクを一括追加するスクリプト
 * 
 * 実行方法:
 * node scripts/add-internal-links-to-year-pages.js
 */

const fs = require('fs')
const path = require('path')

const races = [
  { slug: 'hakone', name: '箱根駅伝', clientFile: 'HakoneYearClient.tsx' },
  { slug: 'newyear', name: 'ニューイヤー駅伝', clientFile: 'NewYearYearClient.tsx' },
  { slug: 'queens', name: 'クイーンズ駅伝', clientFile: 'QueensYearClient.tsx' },
  { slug: 'zenjitsu', name: '全日本大学駅伝', clientFile: 'ZenjitsuYearClient.tsx' },
  { slug: 'izumo', name: '出雲駅伝', clientFile: 'IzumoYearClient.tsx' },
  { slug: 'fujisan', name: '富士山女子駅伝', clientFile: 'FujisanYearClient.tsx' },
  { slug: 'morinomiyako', name: '全国女子駅伝', clientFile: 'MorinomiyakoYearClient.tsx' },
  { slug: 'miyakooji-men', name: '全国男子駅伝', clientFile: 'MiyakoojiMenYearClient.tsx' },
  { slug: 'miyakooji-women', name: '全国女子駅伝', clientFile: 'MiyakoojiWomenYearClient.tsx' },
  { slug: 'hiroshima', name: 'ひろしま男子駅伝', clientFile: 'HiroshimaYearClient.tsx' },
  { slug: 'prefecture-women', name: '全国都道府県対抗女子駅伝', clientFile: 'PrefectureWomenYearClient.tsx' },
  { slug: 'junior-high-men', name: '全国中学校駅伝男子', clientFile: 'JuniorHighMenYearClient.tsx' },
  { slug: 'junior-high-women', name: '全国中学校駅伝女子', clientFile: 'JuniorHighWomenYearClient.tsx' },
]

function addInternalLinksToClient(raceSlug, raceName, clientFile) {
  const filePath = path.join(process.cwd(), 'app', 'ekiden', raceSlug, '[year]', clientFile)
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} が見つかりません`)
    return false
  }

  let content = fs.readFileSync(filePath, 'utf-8')

  // 既に追加済みかチェック
  if (content.includes('InternalRelatedLinks')) {
    console.log(`✓ ${raceName} - 既に追加済み`)
    return true
  }

  console.log(`🔧 ${raceName} - 内部関連リンク追加中...`)

  // 1. importを追加
  const importLine1 = `import { InternalRelatedLinks } from "@/components/InternalRelatedLinks"`
  const importLine2 = `import { generateYearDetailLinks } from "@/lib/internal-links"`
  
  if (!content.includes(importLine1)) {
    // RelatedLinksのimportの後に追加
    content = content.replace(
      /import { RelatedLinks } from "@\/components\/RelatedLinks"/,
      `import { RelatedLinks } from "@/components/RelatedLinks"\nimport { InternalRelatedLinks } from "@/components/InternalRelatedLinks"\nimport { generateYearDetailLinks } from "@/lib/internal-links"`
    )
  }

  // 2. コンポーネント内で関連リンクを生成
  // routerの定義の後に追加
  const relatedLinksCode = `\n\n  // 関連リンクを生成\n  const relatedLinks = generateYearDetailLinks('${raceSlug}', year.toString())`
  
  content = content.replace(
    /(const router = useRouter\(\))/,
    `$1${relatedLinksCode}`
  )

  // 3. JSX内にInternalRelatedLinksを追加
  // RelatedLinksの直前に追加
  const internalLinksJSX = `            {/* 内部関連リンク */}
            <InternalRelatedLinks 
              raceName="${raceName}"
              currentYear={year.toString()}
              links={relatedLinks}
            />

            {/* 外部関連リンク */}`

  content = content.replace(
    /\s*{\/\* 関連リンク \*\/}/,
    `\n${internalLinksJSX}`
  )

  // ファイルを保存
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✓ ${raceName} - 内部関連リンク追加完了`)
  return true
}

// メイン処理
console.log('🚀 全14大会の年度別ページに内部関連リンクを追加します...\n')

let successCount = 0
let skipCount = 0
let errorCount = 0

races.forEach(race => {
  try {
    const result = addInternalLinksToClient(race.slug, race.name, race.clientFile)
    if (result === true) {
      const content = fs.readFileSync(
        path.join(process.cwd(), 'app', 'ekiden', race.slug, '[year]', race.clientFile), 
        'utf-8'
      )
      if (content.includes('InternalRelatedLinks')) {
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
