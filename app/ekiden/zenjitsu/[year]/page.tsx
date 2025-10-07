import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { notFound } from 'next/navigation'
import { ZenjitsuYearClient } from "./ZenjitsuYearClient"

interface ZenjitsuData {
  eventName: string
  year: number
  teams: any[]
  config?: {
    sections: number
  }
}

// Server Component: データフェッチはサーバーサイドで
export default async function ZenjitsuYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  
  let data: ZenjitsuData | null = null
  
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
async function fetchZenjitsuData(year: string): Promise<ZenjitsuData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'all-japan', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`全日本大学駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

// 静的パスの生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  
  for (let year = 1970; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  // 1988年は2回開催
  years.push('1988-2')
  
  return years.map((year) => ({
    year,
  }))
}
