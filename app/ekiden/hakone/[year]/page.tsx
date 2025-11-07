import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HakoneYearClient } from "./HakoneYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
import { EventStructuredDataScript } from "@/lib/event-structured-data"
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
      <EventStructuredDataScript 
        raceSlug="hakone" 
        year={params.year} 
        result={data}
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

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const years: string[] = []
  
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const dataDir = path.join(process.cwd(), 'public', 'data', 'university', 'hakone')
    const files = await fs.readdir(dataDir)
    
    // .json ファイルのみを抽出し、拡張子を除去
    for (const file of files) {
      if (file.endsWith('.json')) {
        years.push(file.replace('.json', ''))
      }
    }
  } catch (error) {
    console.error('generateStaticParams エラー:', error)
  }
  
  return years.map((year) => ({
    year,
  }))
}

