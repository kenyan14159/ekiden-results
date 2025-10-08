import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HakoneYearClient } from "./HakoneYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { EkidenData } from "@/types/ekiden"
import { generateRaceYearMetadata } from '@/lib/metadata-utils'

// 動的メタデータ生成
export async function generateMetadata({ 
  params 
}: { 
  params: { year: string } 
}): Promise<Metadata> {
  const year = parseInt(params.year)
  
  // データを取得して優勝校を特定
  let winner = ''
  
  try {
    const data = await fetchHakoneData(params.year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  // ユーティリティ関数を使用してメタデータ生成
  return generateRaceYearMetadata('hakone', year, winner)
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
    { name: '箱根駅伝', url: '/ekiden/hakone' },
    { name: `${year}年`, url: `/ekiden/hakone/${year}` },
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

