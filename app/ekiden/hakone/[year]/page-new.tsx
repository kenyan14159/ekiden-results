import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HakoneYearClient } from "./HakoneYearClient"
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { EkidenData } from "@/types/ekiden"

// 動的メタデータ生成
export async function generateMetadata({ 
  params 
}: { 
  params: { year: string } 
}): Promise<Metadata> {
  const year = params.year
  
  // データを取得して優勝校を特定
  let winner = ''
  const count = getHakoneCount(parseInt(year))
  
  try {
    const data = await fetchHakoneData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `箱根駅伝 ${year}年 第${count}回大会 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `箱根駅伝 ${year}年（第${count}回大会）の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。往路・復路のタイム、区間賞、区間新記録も完全収録。`

  return {
    title,
    description,
    keywords: [
      '箱根駅伝',
      `箱根駅伝${year}`,
      `第${count}回箱根駅伝`,
      winner,
      '箱根駅伝結果',
      '箱根駅伝成績',
      '区間記録',
      '往路',
      '復路',
      '大学駅伝',
      '東京箱根間往復大学駅伝競走'
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-01-02T08:00:00+09:00`,
      modifiedTime: new Date().toISOString(),
      authors: ['駅伝リザルト'],
      section: '大学駅伝',
      tags: ['箱根駅伝', `${year}年`, '大学駅伝', winner].filter(Boolean),
      url: `https://ekiden-results.com/ekiden/hakone/${year}`,
      siteName: '駅伝リザルト',
      locale: 'ja_JP',
      images: [
        {
          url: `https://ekiden-results.com/og-images/hakone-${year}.png`,
          width: 1200,
          height: 630,
          alt: `箱根駅伝 ${year}年 結果`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ekiden_results',
      title,
      description,
      images: [`https://ekiden-results.com/og-images/hakone-${year}.png`],
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/hakone/${year}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Server Component: データフェッチはサーバーサイドで
export default async function HakoneYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: EkidenData | null = null
  
  try {
    data = await fetchHakoneData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  // 構造化データ (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${data.eventName} ${year}年 第${data.count || getHakoneCount(year)}回大会`,
    description: `箱根駅伝 ${year}年大会の詳細結果`,
    startDate: `${year}-01-02T08:00:00+09:00`,
    endDate: `${year}-01-03T14:00:00+09:00`,
    location: {
      '@type': 'Place',
      name: '東京・箱根間',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '東京都・神奈川県',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: '関東学生陸上競技連盟',
    },
    ...(data.teams[0] && {
      winner: {
        '@type': 'Person',
        name: data.teams[0].name,
      },
    }),
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-grow pt-20">
        <HakoneYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

// データフェッチ関数（サーバーサイド）
async function fetchHakoneData(year: string): Promise<EkidenData | null> {
  try {
    // Server Componentでは直接ファイルを読み込むことも可能
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'hakone', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`箱根駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 箱根駅伝の回数計算
function getHakoneCount(year: number): number {
  const canceledYears = [1944, 1945, 1946]
  let count = year - 1920 + 1
  
  for (const canceledYear of canceledYears) {
    if (year > canceledYear) {
      count--
    }
  }
  
  return count
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  // 1920年から現在までの箱根駅伝
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  
  for (let year = 1920; year <= currentYear; year++) {
    // 中止年を除く
    if (![1944, 1945, 1946].includes(year)) {
      years.push(year.toString())
    }
  }
  
  return years.map((year) => ({
    year,
  }))
}

