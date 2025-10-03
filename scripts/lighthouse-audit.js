#!/usr/bin/env node

/**
 * Lighthouse監査スクリプト
 * 
 * 使用方法:
 * npm install -g lighthouse
 * node scripts/lighthouse-audit.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const SITE_URL = process.env.SITE_URL || 'http://localhost:3001'

const pages = [
  { name: 'ホーム', url: '/' },
  { name: '箱根駅伝', url: '/ekiden/hakone' },
  { name: '箱根駅伝2025', url: '/ekiden/hakone/2025' },
  { name: 'ニューイヤー駅伝', url: '/ekiden/newyear' },
  { name: '全日本大学駅伝', url: '/ekiden/zenjitsu' },
  { name: 'お問い合わせ', url: '/information/contact' },
]

const outputDir = path.join(__dirname, '..', 'lighthouse-reports')

// 出力ディレクトリを作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log('🚀 Lighthouse監査を開始します...\n')
console.log(`対象サイト: ${SITE_URL}`)
console.log(`レポート保存先: ${outputDir}\n`)

const results = []

pages.forEach((page, index) => {
  console.log(`[${index + 1}/${pages.length}] ${page.name} を監査中...`)
  
  const url = `${SITE_URL}${page.url}`
  const fileName = page.name.replace(/\s+/g, '-').toLowerCase()
  const outputPath = path.join(outputDir, `${fileName}.html`)
  const jsonPath = path.join(outputDir, `${fileName}.json`)
  
  try {
    const command = `lighthouse "${url}" \
      --output=html,json \
      --output-path="${path.join(outputDir, fileName)}" \
      --chrome-flags="--headless --no-sandbox" \
      --only-categories=performance,accessibility,best-practices,seo \
      --quiet`
    
    execSync(command, { stdio: 'inherit' })
    
    // JSONレポートを読み込んでスコアを取得
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    const categories = report.categories
    
    results.push({
      name: page.name,
      url: page.url,
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
    })
    
    console.log(`✓ 完了: ${outputPath}\n`)
  } catch (error) {
    console.error(`✗ エラー: ${page.name}`)
    console.error(error.message)
    console.log()
  }
})

// サマリーを表示
console.log('\n' + '='.repeat(80))
console.log('📊 Lighthouse監査結果サマリー')
console.log('='.repeat(80) + '\n')

console.log('┌─────────────────────────┬────────────┬────────────────┬───────────────┬─────┐')
console.log('│ ページ                  │ Performance│ Accessibility  │ Best Practices│ SEO │')
console.log('├─────────────────────────┼────────────┼────────────────┼───────────────┼─────┤')

results.forEach(result => {
  const name = result.name.padEnd(23)
  const perf = String(result.performance).padStart(3)
  const a11y = String(result.accessibility).padStart(3)
  const bp = String(result.bestPractices).padStart(3)
  const seo = String(result.seo).padStart(3)
  
  console.log(`│ ${name} │     ${perf}    │      ${a11y}       │      ${bp}       │ ${seo} │`)
})

console.log('└─────────────────────────┴────────────┴────────────────┴───────────────┴─────┘\n')

// 平均スコアを計算
const averages = {
  performance: Math.round(results.reduce((sum, r) => sum + r.performance, 0) / results.length),
  accessibility: Math.round(results.reduce((sum, r) => sum + r.accessibility, 0) / results.length),
  bestPractices: Math.round(results.reduce((sum, r) => sum + r.bestPractices, 0) / results.length),
  seo: Math.round(results.reduce((sum, r) => sum + r.seo, 0) / results.length),
}

console.log(`平均スコア:`)
console.log(`  Performance:    ${averages.performance}/100 ${getGrade(averages.performance)}`)
console.log(`  Accessibility:  ${averages.accessibility}/100 ${getGrade(averages.accessibility)}`)
console.log(`  Best Practices: ${averages.bestPractices}/100 ${getGrade(averages.bestPractices)}`)
console.log(`  SEO:            ${averages.seo}/100 ${getGrade(averages.seo)}`)
console.log()

// 改善が必要な項目をハイライト
const needsImprovement = results.filter(r => 
  r.performance < 90 || r.accessibility < 90 || r.bestPractices < 90 || r.seo < 90
)

if (needsImprovement.length > 0) {
  console.log('⚠️  改善が必要なページ:')
  needsImprovement.forEach(page => {
    console.log(`\n  ${page.name} (${page.url})`)
    if (page.performance < 90) console.log(`    - Performance: ${page.performance}/100`)
    if (page.accessibility < 90) console.log(`    - Accessibility: ${page.accessibility}/100`)
    if (page.bestPractices < 90) console.log(`    - Best Practices: ${page.bestPractices}/100`)
    if (page.seo < 90) console.log(`    - SEO: ${page.seo}/100`)
  })
  console.log()
}

console.log(`\n✨ 詳細なレポートは以下に保存されています:`)
console.log(`   ${outputDir}\n`)

function getGrade(score) {
  if (score >= 90) return '🟢 優秀'
  if (score >= 50) return '🟡 改善推奨'
  return '🔴 要改善'
}

