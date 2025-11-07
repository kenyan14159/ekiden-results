import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { notFound } from 'next/navigation'
import { ZenjitsuYearClient } from "./ZenjitsuYearClient"
import { Metadata } from 'next'
import { generateRaceYearMetadata } from '@/lib/metadata-utils'
import type { EkidenData } from '@/types/ekiden'

// 動的メタデータ生成
export async function generateMetadata({ 
  params 
}: { 
  params: { year: string } 
}): Promise<Metadata> {
  const year = parseInt(params.year)
  let winner = ''
  
  try {
    const data = await fetchZenjitsuData(params.year)
    const topTeam = data?.teams?.find((team) => team.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  // ユーティリティ関数を使用してメタデータ生成（SEO最適化済み）
  return generateRaceYearMetadata('zenjitsu', year, winner)
}

// Server Component: データフェッチはサーバーサイドで
export default async function ZenjitsuYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: EkidenData | null = null
  
  try {
    data = await fetchZenjitsuData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <ZenjitsuYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

// データフェッチ関数（サーバーサイド）
async function fetchZenjitsuData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'all-japan', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent) as EkidenData
    
    return data
  } catch (error) {
    console.error(`全日本大学駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const years: string[] = []
  
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const dataDir = path.join(process.cwd(), 'public', 'data', 'university', 'all-japan')
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
