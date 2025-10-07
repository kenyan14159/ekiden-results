/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイトとしてエクスポート
  output: 'export',
  
  // 画像最適化の設定（静的エクスポート用）
  // 注意: output: 'export'の場合、Next.jsの画像最適化は利用できないため、
  // unoptimizedをtrueにする必要があります。
  // 代わりに、ビルド時の画像最適化やCDN側での最適化を検討してください。
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
