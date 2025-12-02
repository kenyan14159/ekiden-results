'use client'

import Script from 'next/script'

export function GoogleAdSense() {
  // AdSenseクライアントID（環境変数から取得、なければデフォルト値を使用）
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-7505086484817015'

  // 注意: 自動広告はスクリプト読み込み後に自動的に初期化されるため、
  // 手動でpush({})を呼ぶ必要はありません。
  // 手動でpushすると重複エラーの原因になります。

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

