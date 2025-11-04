/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイトとしてエクスポート（エックスサーバーデプロイ用）
  output: 'export',
  
  // ベースパスとアセットプレフィックスの設定
  // 本番環境のドメインに合わせて設定
  basePath: '',
  assetPrefix: '',
  
  // トレーリングスラッシュを追加（静的ホスティング用）
  trailingSlash: true,
  
  // 画像最適化の設定（静的エクスポート用）
  // 注意: output: 'export'の場合、Next.jsの画像最適化は利用できないため、
  // unoptimizedをtrueにする必要があります。
  // 代わりに、ビルド時の画像最適化やCDN側での最適化を検討してください。
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ekiden-results.com',
        pathname: '/WordPress/wp-content/uploads/**',
      },
    ],
  },

  // パフォーマンス最適化
  compress: true,
  
  // 実験的機能の有効化（パフォーマンス向上）
  experimental: {
    // optimizeCss: true, // CSS最適化 - 一時的に無効化（crittersモジュールの問題）
    optimizePackageImports: ['framer-motion', 'lucide-react'], // パッケージの最適化
  },
  
  // コンパイラ設定
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 静的エクスポート用の設定
  distDir: '.next',
  
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
