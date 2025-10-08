#!/usr/bin/env node

/**
 * 全14大会のページに関連リンクを一括追加するスクリプト
 * 
 * 実行方法:
 * node scripts/add-related-links.js
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

function addRelatedLinksToPage(raceSlug, raceName) {
  const filePath = path.join(process.cwd(), 'app', 'ekiden', raceSlug, 'page.tsx')
  
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

  // 1. import文を追加
  const importLine = `import { InternalRelatedLinks } from "@/components/InternalRelatedLinks"`
  const importLine2 = `import { generateRaceListLinks } from "@/lib/internal-links"`
  
  if (!content.includes(importLine)) {
    // Breadcrumbのimportの後に追加
    content = content.replace(
      /import { Breadcrumb } from "@\/components\/BreadcrumbStructuredData"/,
      `import { Breadcrumb } from "@/components/BreadcrumbStructuredData"\nimport { InternalRelatedLinks } from "@/components/InternalRelatedLinks"\nimport { generateRaceListLinks } from "@/lib/internal-links"`
    )
  }

  // 2. relatedLinksの生成コードを追加
  const relatedLinksCode = `\n  const relatedLinks = generateRaceListLinks('${raceSlug}')\n`
  
  // breadcrumbItemsの定義の後に追加
  content = content.replace(
    /(const breadcrumbItems = \[[\s\S]*?\])/,
    `$1${relatedLinksCode}`
  )

  // 3. JSX内に関連リンクコンポーネントを追加
  // </main>の直前に追加
  const relatedLinksJSX = `
        {/* 関連リンク */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <InternalRelatedLinks 
            raceName="${raceName}"
            links={relatedLinks}
          />
        </div>
      </main>`

  content = content.replace(/\s*<\/main>/, relatedLinksJSX)

  // ファイルを保存
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✓ ${raceName} - 関連リンク追加完了`)
  return true
}

// メイン処理
console.log('🚀 全14大会のページに関連リンクを追加します...\n')

let successCount = 0
let skipCount = 0

races.forEach(race => {
  const result = addRelatedLinksToPage(race.slug, race.name)
  if (result === true) {
    if (fs.readFileSync(path.join(process.cwd(), 'app', 'ekiden', race.slug, 'page.tsx'), 'utf-8').includes('InternalRelatedLinks')) {
      successCount++
    } else {
      skipCount++
    }
  }
})

console.log(`\n✅ 完了: ${successCount}ページに追加、${skipCount}ページスキップ`)
console.log('💡 次のコマンドでビルドを確認してください: npm run build')
