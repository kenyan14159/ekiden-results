import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewYearYearClient } from "./NewYearYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
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
  
  // データを取得して優勝チームを特定
  let winner = ''
  let count = parseInt(year) - 1950 // 1951年が第1回
  
  try {
    const data = await fetchNewYearData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `ニューイヤー駅伝 ${year}年 第${count}回大会 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `全日本実業団対抗駅伝競走大会（ニューイヤー駅伝） ${year}年（第${count}回大会）の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      'ニューイヤー駅伝',
      `ニューイヤー駅伝${year}`,
      `第${count}回ニューイヤー駅伝`,
      winner,
      '全日本実業団対抗駅伝',
      '実業団駅伝',
      '駅伝結果',
      '駅伝成績',
      '群馬',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-01-01T09:00:00+09:00`,
      modifiedTime: new Date().toISOString(),
      authors: ['駅伝リザルト'],
      section: '実業団駅伝',
      tags: ['ニューイヤー駅伝', `${year}年`, '実業団駅伝', winner].filter(Boolean),
      url: `https://ekiden-results.com/ekiden/newyear/${year}`,
      siteName: '駅伝リザルト',
      locale: 'ja_JP',
      images: [
        {
          url: `https://ekiden-results.com/og-images/newyear-${year}.png`,
          width: 1200,
          height: 630,
          alt: `ニューイヤー駅伝 ${year}年 結果`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ekiden_results',
      title,
      description,
      images: [`https://ekiden-results.com/og-images/newyear-${year}.png`],
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/newyear/${year}`,
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
export default async function NewYearYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: EkidenData | null = null
  
  try {
    data = await fetchNewYearData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  // 構造化データ (JSON-LD)
  const count = year - 1950
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${data.eventName} ${year}年 第${count}回大会`,
    description: `ニューイヤー駅伝 ${year}年大会の詳細結果`,
    startDate: `${year}-01-01T09:00:00+09:00`,
    endDate: `${year}-01-01T12:30:00+09:00`,
    location: {
      '@type': 'Place',
      name: '群馬県',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '群馬県',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: '日本実業団陸上競技連合',
    },
    ...(data.teams[0] && {
      winner: {
        '@type': 'SportsTeam',
        name: data.teams[0].name,
      },
    }),
  }

  // パンくずリスト
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '実業団駅伝', url: '/#corporate' },
    { name: 'ニューイヤー駅伝', url: '/ekiden/newyear' },
    { name: `${year}年`, url: `/ekiden/newyear/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-grow pt-20">
        <NewYearYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

// データフェッチ関数（サーバーサイド）
async function fetchNewYearData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'corporate', 'newyear', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`ニューイヤー駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  
  // 1951年から現在+1年まで
  for (let year = 1951; year <= currentYear + 1; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({
    year,
  }))
}
