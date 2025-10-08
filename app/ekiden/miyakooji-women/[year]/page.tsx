import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MiyakoojiWomenYearClient } from "./MiyakoojiWomenYearClient"
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
    const data = await fetchMiyakoojiWomenData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `都大路 女子 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `都大路 女子 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}都道府県別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      '都大路 女子',
      `都大路 女子${year}`,
      winner,
      '全国高等学校駅伝競走大会 女子',
      '都道府県駅伝'
    ].filter(Boolean),
  }
}

export default async function MiyakoojiWomenYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchMiyakoojiWomenData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '高校駅伝', url: '/#highschool' },
    { name: '都大路 女子', url: '/ekiden/miyakooji-women' },
    { name: `${year}年`, url: `/ekiden/miyakooji-women/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <EventStructuredDataScript 
        raceSlug="miyakooji-women" 
        year={params.year} 
        result={data}
      />
      <Header />
      <main className="flex-grow pt-20">
        <MiyakoojiWomenYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchMiyakoojiWomenData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'highschool', 'girls', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`都大路 女子 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

export async function generateStaticParams() {
  const years: string[] = []
  const currentYear = new Date().getFullYear() + 1
  
  for (let year = 1989; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({ year }))
}

