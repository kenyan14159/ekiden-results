import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FujisanYearClient } from "./FujisanYearClient"
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
  
  // データを取得して優勝校を特定
  let winner = ''
  
  try {
    const data = await fetchFujisanData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `富士山女子駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `富士山女子駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      '富士山女子駅伝',
      `富士山女子駅伝${year}`,
      winner,
      '富士山女子駅伝結果',
      '全日本大学女子選抜駅伝競走',
      '大学駅伝',
      '女子駅伝'
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-12-30T10:00:00+09:00`,
      modifiedTime: new Date().toISOString(),
      authors: ['駅伝リザルト'],
      section: '大学駅伝',
      tags: ['富士山女子駅伝', `${year}年`, '大学駅伝', winner].filter(Boolean),
      url: `https://ekiden-results.com/ekiden/fujisan/${year}`,
      siteName: '駅伝リザルト',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ekiden_results',
      title,
      description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/fujisan/${year}`,
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
export default async function FujisanYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: EkidenData | null = null
  
  try {
    data = await fetchFujisanData(params.year)
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
    name: `${data.eventName}`,
    description: `富士山女子駅伝 ${year}年大会の詳細結果`,
    startDate: `${year}-12-30T10:00:00+09:00`,
    endDate: `${year}-12-30T13:00:00+09:00`,
    location: {
      '@type': 'Place',
      name: '静岡県富士市',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '静岡県',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: '富士市',
    },
    ...(data.teams?.[0] && {
      winner: {
        '@type': 'Person',
        name: data.teams[0].name,
      },
    }),
  }

  // パンくずリスト
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '大学駅伝', url: '/#university' },
    { name: '富士山女子駅伝', url: '/ekiden/fujisan' },
    { name: `${year}年`, url: `/ekiden/fujisan/${year}` },
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
        <FujisanYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

// データフェッチ関数（サーバーサイド）
async function fetchFujisanData(year: string): Promise<EkidenData | null> {
  try {
    // Server Componentでは直接ファイルを読み込むことも可能
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'fujisan', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`富士山女子駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const years: string[] = []
  
  // 2004年から現在まで
  const currentYear = new Date().getFullYear()
  for (let year = 2004; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({
    year,
  }))
}

