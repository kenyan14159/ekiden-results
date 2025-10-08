import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewyearYearClient } from "./NewYearYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
import { EventStructuredDataScript } from "@/lib/event-structured-data"
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { EkidenData } from "@/types/ekiden"

export async function generateMetadata({ 
  params 
}: { 
  params: { year: string } 
}): Promise<Metadata> {
  const year = params.year
  let winner = ''
  
  try {
    const data = await fetchNewyearData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `ニューイヤー駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `ニューイヤー駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      'ニューイヤー駅伝',
      `ニューイヤー駅伝${year}`,
      winner,
      '全日本実業団対抗駅伝競走大会',
      '実業団駅伝'
    ].filter(Boolean),
  }
}

export default async function NewyearYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchNewyearData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '実業団駅伝', url: '/#corporate' },
    { name: 'ニューイヤー駅伝', url: '/ekiden/newyear' },
    { name: `${year}年`, url: `/ekiden/newyear/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <EventStructuredDataScript 
        raceSlug="newyear" 
        year={params.year} 
        result={data}
      />
      <Header />
      <main className="flex-grow pt-20">
        <NewyearYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchNewyearData(year: string): Promise<EkidenData | null> {
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

export async function generateStaticParams() {
  const years: string[] = []
  const currentYear = new Date().getFullYear() + 1 // ニューイヤーは翌年1月開催
  
  for (let year = 1957; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({ year }))
}
