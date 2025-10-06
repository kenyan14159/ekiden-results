/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイトとしてエクスポート
  output: 'export',
  
  // 画像最適化の設定（静的エクスポート用）
  images: {
    unoptimized: true, // 静的エクスポートでは画像最適化を無効化
  },

  // パフォーマンス最適化
  compress: true,
  
  // 注意: 静的エクスポート（output: 'export'）を使用しているため、
  // カスタムヘッダーはホスティング先のWebサーバー（Nginx、Vercel、Netlifyなど）で設定してください。
  // 
  // 推奨ヘッダー設定:
  // - Strict-Transport-Security: max-age=31536000; includeSubDomains
  // - X-Frame-Options: SAMEORIGIN
  // - X-Content-Type-Options: nosniff
  // - Referrer-Policy: strict-origin-when-cross-origin
  // - Permissions-Policy: camera=(), microphone=(), geolocation=()
  // - Content-Security-Policy: （CSPポリシーの設定）
  // - Cache-Control: 静的ファイルとデータのキャッシュ設定
}

module.exports = nextConfig
