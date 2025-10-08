import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { JuniorHighWomenYearClient } from "./JuniorHighWomenYearClient"
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
    const data = await fetchJuniorHighWomenData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `全国中学女子駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `全国中学女子駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}都道府県別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      '全国中学女子駅伝',
      `全国中学女子駅伝${year}`,
      winner,
      '全国中学校駅伝競走大会 女子',
      '都道府県駅伝'
    ].filter(Boolean),
  }
}

export default async function JuniorHighWomenYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchJuniorHighWomenData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '中学駅伝', url: '/#junior-high' },
    { name: '全国中学女子駅伝', url: '/ekiden/junior-high-women' },
    { name: `${year}年`, url: `/ekiden/junior-high-women/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <EventStructuredDataScript 
        raceSlug="junior-high-women" 
        year={params.year} 
        result={data}
      />
      <Header />
      <main className="flex-grow pt-20">
        <JuniorHighWomenYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchJuniorHighWomenData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'junior-high', 'girls', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`全国中学女子駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

export async function generateStaticParams() {
  const years: string[] = []
  const currentYear = new Date().getFullYear() + 1
  
  for (let year = 2022; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({ year }))
}

