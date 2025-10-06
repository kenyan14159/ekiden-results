import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PrefectureWomenYearClient } from "./PrefectureWomenYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
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
    const data = await fetchPrefectureWomenData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `都道府県対抗女子駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `都道府県対抗女子駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}都道府県別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      '都道府県対抗女子駅伝',
      `都道府県対抗女子駅伝${year}`,
      winner,
      '皇后盃全国都道府県対抗女子駅伝競走大会',
      '都道府県駅伝'
    ].filter(Boolean),
  }
}

export default async function PrefectureWomenYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchPrefectureWomenData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '高校駅伝', url: '/#highschool' },
    { name: '都道府県対抗女子駅伝', url: '/ekiden/prefecture-women' },
    { name: `${year}年`, url: `/ekiden/prefecture-women/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <Header />
      <main className="flex-grow pt-20">
        <PrefectureWomenYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchPrefectureWomenData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'prefectures', 'girls', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`都道府県対抗女子駅伝 ${year}年のデータ読み込みエラー:`, error)
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

