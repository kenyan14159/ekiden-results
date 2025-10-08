/**
 * PageSpeed Insights スコア測定スクリプト
 * 
 * 主要ページのPageSpeed Insightsスコアを測定します。
 * 
 * 使用方法:
 * 1. サイトをデプロイ
 * 2. BASE_URLを実際のURLに変更
 * 3. node scripts/lighthouse-audit.js
 */

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// 測定対象のページ
const BASE_URL = 'http://localhost:3000'; // 本番環境のURLに変更してください

const PAGES_TO_TEST = [
  {
    name: 'ホームページ',
    url: '/',
    priority: 'high',
  },
  {
    name: '箱根駅伝トップ',
    url: '/ekiden/hakone/',
    priority: 'high',
  },
  {
    name: 'ニューイヤー駅伝トップ',
    url: '/ekiden/newyear/',
    priority: 'high',
  },
  {
    name: '出雲駅伝トップ',
    url: '/ekiden/izumo/',
    priority: 'high',
  },
  {
    name: '箱根駅伝2024詳細',
    url: '/ekiden/hakone/2024/',
    priority: 'medium',
  },
];

/**
 * PageSpeed Insightsでスコアを測定
 */
async function measurePageSpeed(page) {
  const url = `${BASE_URL}${page.url}`;
  console.log(`\n📊 測定中: ${page.name}`);
  console.log(`   URL: ${url}`);
  
  try {
    // PageSpeed Insights APIを使用（APIキーが必要な場合は設定）
    // ここではlighthouseのCLIを使用する簡易版
    const { stdout } = await execAsync(
      `npx lighthouse "${url}" --only-categories=performance --output=json --quiet --chrome-flags="--headless" 2>/dev/null || echo "ERROR"`
    );
    
    if (stdout.includes('ERROR') || !stdout.trim()) {
      console.log('   ⚠️  測定に失敗しました（サーバーが起動しているか確認してください）');
      return null;
    }
    
    const result = JSON.parse(stdout);
    const score = result.categories.performance.score * 100;
    const metrics = result.audits;
    
    // Core Web Vitals
    const lcp = metrics['largest-contentful-paint']?.displayValue || 'N/A';
    const fid = metrics['max-potential-fid']?.displayValue || 'N/A';
    const cls = metrics['cumulative-layout-shift']?.displayValue || 'N/A';
    const fcp = metrics['first-contentful-paint']?.displayValue || 'N/A';
    const tti = metrics['interactive']?.displayValue || 'N/A';
    
    console.log(`   ✅ スコア: ${score.toFixed(0)}/100`);
    console.log(`   📈 メトリクス:`);
    console.log(`      - LCP: ${lcp}`);
    console.log(`      - FID: ${fid}`);
    console.log(`      - CLS: ${cls}`);
    console.log(`      - FCP: ${fcp}`);
    console.log(`      - TTI: ${tti}`);
    
    return {
      name: page.name,
      url: page.url,
      score: score,
      metrics: {
        lcp,
        fid,
        cls,
        fcp,
        tti,
      },
    };
  } catch (error) {
    console.log(`   ❌ エラー: ${error.message}`);
    return null;
  }
}

/**
 * すべてのページを測定
 */
async function runAudit() {
  console.log('==========================================');
  console.log('  PageSpeed Insights 測定');
  console.log('==========================================');
  console.log(`\n対象URL: ${BASE_URL}`);
  console.log(`ページ数: ${PAGES_TO_TEST.length}`);
  
  const results = [];
  
  for (const page of PAGES_TO_TEST) {
    const result = await measurePageSpeed(page);
    if (result) {
      results.push(result);
    }
    // API制限を避けるため少し待機
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // サマリー表示
  console.log('\n==========================================');
  console.log('  測定結果サマリー');
  console.log('==========================================\n');
  
  if (results.length === 0) {
    console.log('⚠️  測定結果がありません');
    console.log('\n💡 ヒント:');
    console.log('   1. サーバーが起動しているか確認: npm run dev');
    console.log('   2. BASE_URLが正しいか確認');
    console.log('   3. lighthouseがインストールされているか確認: npx lighthouse --version\n');
    return;
  }
  
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const passingPages = results.filter(r => r.score >= 90).length;
  
  console.log('📊 全体統計:');
  console.log(`   平均スコア: ${avgScore.toFixed(1)}/100`);
  console.log(`   90点以上: ${passingPages}/${results.length}ページ`);
  
  console.log('\n📋 詳細結果:');
  results.forEach(result => {
    const status = result.score >= 90 ? '✅' : result.score >= 70 ? '⚠️' : '❌';
    console.log(`   ${status} ${result.name}: ${result.score.toFixed(0)}/100`);
  });
  
  // 改善提案
  const lowScorePages = results.filter(r => r.score < 90);
  if (lowScorePages.length > 0) {
    console.log('\n💡 改善が必要なページ:');
    lowScorePages.forEach(page => {
      console.log(`   - ${page.name} (${page.score.toFixed(0)}/100)`);
      console.log(`     URL: ${page.url}`);
    });
  } else {
    console.log('\n🎉 すべてのページが90点以上を達成しました！');
  }
  
  console.log('\n==========================================');
  console.log('  完了');
  console.log('==========================================\n');
}

// メイン実行
if (require.main === module) {
  runAudit().catch(console.error);
}

module.exports = { measurePageSpeed, PAGES_TO_TEST };
