import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MorinomiyakoYearClient } from "./MorinomiyakoYearClient"
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
  let winner = ''
  
  try {
    const data = await fetchMorinomiyakoData(params.year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  // ユーティリティ関数を使用してメタデータ生成（SEO最適化済み）
  return generateRaceYearMetadata('morinomiyako', year, winner)
}

// Server Component: データフェッチはサーバーサイドで
export default async function MorinomiyakoYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: EkidenData | null = null
  
  try {
    data = await fetchMorinomiyakoData(params.year)
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
    { name: '杜の都駅伝', url: '/ekiden/morinomiyako' },
    { name: `${year}年`, url: `/ekiden/morinomiyako/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <EventStructuredDataScript 
        raceSlug="morinomiyako" 
        year={params.year} 
        result={data}
      />
      <Header />
      <main className="flex-grow pt-20">
        <MorinomiyakoYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

// データフェッチ関数（サーバーサイド）
async function fetchMorinomiyakoData(year: string): Promise<EkidenData | null> {
  try {
    // Server Componentでは直接ファイルを読み込むことも可能
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'morinomiyako', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`杜の都駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const years: string[] = []
  
  // 2013年から現在まで
  const currentYear = new Date().getFullYear()
  for (let year = 2013; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({
    year,
  }))
}

