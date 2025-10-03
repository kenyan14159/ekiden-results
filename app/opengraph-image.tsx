import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '駅伝リザルト - 全国駅伝大会の結果一覧'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              background: 'white',
              color: '#3B82F6',
              padding: '20px 30px',
              borderRadius: '20px',
              marginRight: '30px',
            }}
          >
            駅
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
            }}
          >
            駅伝リザルト
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            textAlign: 'center',
          }}
        >
          全国の駅伝大会の結果を網羅
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.8,
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          箱根駅伝 | ニューイヤー駅伝 | 全日本大学駅伝
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

