import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HiroshimaYearClient } from "./HiroshimaYearClient"
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
    const data = await fetchHiroshimaData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `ひろしま駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `ひろしま駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}都道府県別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    keywords: [
      'ひろしま駅伝',
      `ひろしま駅伝${year}`,
      winner,
      '全国都道府県対抗男子駅伝競走大会',
      '都道府県駅伝'
    ].filter(Boolean),
  }
}

export default async function HiroshimaYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchHiroshimaData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '高校駅伝', url: '/#highschool' },
    { name: 'ひろしま駅伝', url: '/ekiden/hiroshima' },
    { name: `${year}年`, url: `/ekiden/hiroshima/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <Header />
      <main className="flex-grow pt-20">
        <HiroshimaYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchHiroshimaData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'prefectures', 'boys', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`ひろしま駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

export async function generateStaticParams() {
  const years: string[] = []
  const currentYear = new Date().getFullYear() + 1
  
  for (let year = 1996; year <= currentYear; year++) {
    years.push(year.toString())
  }
  
  return years.map((year) => ({ year }))
}

