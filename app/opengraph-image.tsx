import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = '駅伝リザルト - 全国駅伝大会の結果一覧'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* メインタイトル */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginBottom: 40,
            textAlign: 'center',
            textShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
            lineHeight: 1.2,
          }}
        >
          駅伝リザルト
        </div>

        {/* サブタイトル */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 600,
            marginBottom: 60,
            opacity: 0.95,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '20px 50px',
            borderRadius: 12,
            backdropFilter: 'blur(10px)',
          }}
        >
          全国駅伝大会の結果を網羅
        </div>

        {/* 駅伝リスト */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20,
            maxWidth: 1000,
          }}
        >
          {['箱根駅伝', 'ニューイヤー駅伝', 'クイーンズ駅伝', '全日本大学駅伝', '出雲駅伝', '都大路'].map((name) => (
            <div
              key={name}
              style={{
                fontSize: 28,
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: 8,
                backdropFilter: 'blur(5px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* フッター */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            fontSize: 32,
            opacity: 0.9,
            letterSpacing: 2,
          }}
        >
          ekiden-results.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
