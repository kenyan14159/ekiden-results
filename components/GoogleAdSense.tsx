'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export function GoogleAdSense() {
  // AdSenseクライアントID（環境変数から取得、なければデフォルト値を使用）
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-7505086484817015'

  useEffect(() => {
    // AdSense自動広告の初期化
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error - AdSense API types are not available
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense initialization error:', err)
    }
  }, [])

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

