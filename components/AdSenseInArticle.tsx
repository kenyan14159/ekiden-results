'use client'

import { useEffect, useRef } from 'react'

interface AdSenseInArticleProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle'
  className?: string
  style?: React.CSSProperties
}

/**
 * 記事内AdSenseコンポーネント
 * 収益最大化のために最適な位置に配置
 * 
 * 推奨配置:
 * 1. 記事上部（導入文後） - AdSenseInArticle with adFormat="rectangle"
 * 2. 記事中央（H2見出し前） - AdSenseInArticle with adFormat="fluid"
 * 3. 記事下部（関連記事前） - AdSenseInArticle with adFormat="rectangle"
 */
export function AdSenseInArticle({ 
  adSlot, 
  adFormat = 'auto',
  className = '',
  style = {}
}: AdSenseInArticleProps) {
  const adRef = useRef<HTMLModElement>(null)
  // AdSenseクライアントID（環境変数から取得、なければデフォルト値を使用）
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-7505086484817015'

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        // @ts-expect-error - AdSense API types are not available
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense push error:', err)
    }
  }, [])

  const defaultStyles = {
    display: 'block',
    textAlign: 'center' as const,
    ...style
  }

  // adFormatに応じてスタイルを調整
  const getAdStyle = () => {
    switch (adFormat) {
      case 'rectangle':
        return { 
          ...defaultStyles, 
          minWidth: '300px', 
          minHeight: '250px' 
        }
      case 'fluid':
        return defaultStyles
      default:
        return defaultStyles
    }
  }

  return (
    <div className={`ad-container my-8 ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">広告</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

/**
 * 記事上部用広告（Display Ad 336×280）
 */
export function AdSenseTop({ adSlot }: { adSlot: string }) {
  return (
    <AdSenseInArticle 
      adSlot={adSlot}
      adFormat="rectangle"
      className="lg:flex lg:justify-center"
      style={{ width: '336px', height: '280px', maxWidth: '100%' }}
    />
  )
}

/**
 * 記事中央用広告（In-feed Ad）
 */
export function AdSenseMiddle({ adSlot }: { adSlot: string }) {
  return (
    <AdSenseInArticle 
      adSlot={adSlot}
      adFormat="fluid"
      className="my-12"
    />
  )
}

/**
 * 記事下部用広告（Large Rectangle 336×280）
 */
export function AdSenseBottom({ adSlot }: { adSlot: string }) {
  return (
    <AdSenseInArticle 
      adSlot={adSlot}
      adFormat="rectangle"
      className="lg:flex lg:justify-center"
      style={{ width: '336px', height: '280px', maxWidth: '100%' }}
    />
  )
}

/**
 * サイドバー用広告（Skyscraper 160×600）
 * デスクトップのみ表示
 */
export function AdSenseSidebar({ adSlot }: { adSlot: string }) {
  return (
    <div className="hidden lg:block sticky top-24">
      <div className="text-xs text-gray-400 text-center mb-1">広告</div>
      <AdSenseInArticle 
        adSlot={adSlot}
        adFormat="auto"
        style={{ width: '160px', height: '600px' }}
      />
    </div>
  )
}
