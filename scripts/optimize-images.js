/**
 * 画像最適化スクリプト
 * 
 * このスクリプトは、プロジェクト内の画像を最適化します。
 * - PNGファイルの圧縮
 * - 適切なサイズへのリサイズ
 * - WebP形式への変換
 * 
 * 使用方法:
 * node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

// 画像ファイルのパス
const PUBLIC_DIR = path.join(__dirname, '../public');
const LOGO_FILE = path.join(PUBLIC_DIR, 'ekiden-logo.png');

/**
 * macOSのsipsコマンドを使用して画像を最適化
 */
async function optimizeWithSips() {
  console.log('🖼️  画像最適化を開始します...\n');

  try {
    // ファイルの存在確認
    if (!fs.existsSync(LOGO_FILE)) {
      console.log('❌ ekiden-logo.png が見つかりません');
      return;
    }

    // ファイルサイズの取得
    const stats = fs.statSync(LOGO_FILE);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 元のファイルサイズ: ${originalSize} MB`);

    // バックアップを作成
    const backupFile = path.join(PUBLIC_DIR, 'ekiden-logo.png.backup');
    if (!fs.existsSync(backupFile)) {
      fs.copyFileSync(LOGO_FILE, backupFile);
      console.log('✅ バックアップを作成しました');
    }

    // 最適化されたPNGを作成（512x512に縮小）
    const optimizedFile = path.join(PUBLIC_DIR, 'ekiden-logo-optimized.png');
    await execAsync(`sips -z 512 512 "${LOGO_FILE}" --out "${optimizedFile}"`);
    console.log('✅ 512x512にリサイズしました');

    // 品質を調整してさらに圧縮
    await execAsync(`sips -s format png -s formatOptions best "${optimizedFile}" -o "${optimizedFile}"`);
    
    // 最適化されたファイルのサイズを確認
    const optimizedStats = fs.statSync(optimizedFile);
    const optimizedSize = (optimizedStats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 最適化後のファイルサイズ: ${optimizedSize} MB`);

    const reduction = ((1 - optimizedStats.size / stats.size) * 100).toFixed(1);
    console.log(`📉 ファイルサイズ削減率: ${reduction}%`);

    console.log('\n✅ 画像最適化が完了しました！');
    console.log(`\n💡 推奨事項:`);
    console.log(`   1. ekiden-logo-optimized.png を確認してください`);
    console.log(`   2. 問題なければ、元のファイルと置き換えてください:`);
    console.log(`      mv public/ekiden-logo-optimized.png public/ekiden-logo.png`);

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

/**
 * Next.jsの画像最適化設定をチェック
 */
function checkNextConfig() {
  console.log('\n🔍 Next.js設定をチェック中...\n');

  const configFile = path.join(__dirname, '../next.config.js');
  const configContent = fs.readFileSync(configFile, 'utf8');

  const recommendations = [];

  if (configContent.includes('unoptimized: true')) {
    recommendations.push('⚠️  images.unoptimized が true に設定されています');
    recommendations.push('   静的エクスポートの場合は正常ですが、CDN側で最適化を行ってください');
  }

  if (configContent.includes("formats: ['image/avif', 'image/webp']")) {
    recommendations.push('✅ AVIFとWebPフォーマットが有効です');
  }

  if (recommendations.length > 0) {
    console.log('📋 設定チェック結果:');
    recommendations.forEach(rec => console.log(rec));
  }
}

// メイン実行
async function main() {
  console.log('==========================================');
  console.log('  画像最適化スクリプト');
  console.log('==========================================\n');

  await optimizeWithSips();
  checkNextConfig();

  console.log('\n==========================================');
  console.log('  完了');
  console.log('==========================================\n');
}

main().catch(console.error);
