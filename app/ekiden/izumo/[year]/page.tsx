import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IzumoYearClient } from "./IzumoYearClient"
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
    const data = await fetchIzumoData(year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `出雲駅伝 ${year}年 結果${winner ? ` - ${winner}優勝` : ''} | 駅伝リザルト`
  const description = `出雲駅伝 ${year}年の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://ekiden-results.com/ekiden/izumo/${year}`,
      siteName: '駅伝リザルト',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/izumo/${year}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function IzumoYearPage({ 
  params 
}: { 
  params: { year: string } 
}) {
  const year = parseInt(params.year)
  let data: EkidenData | null = null
  
  try {
    data = await fetchIzumoData(params.year)
  } catch (error) {
    console.error('データ読み込みエラー:', error)
  }

  if (!data) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '大学駅伝', url: '/#university' },
    { name: '出雲駅伝', url: '/ekiden/izumo' },
    { name: `${year}年`, url: `/ekiden/izumo/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <Header />
      <main className="flex-grow pt-20">
        <IzumoYearClient data={data} year={year} />
      </main>
      <Footer />
    </div>
  )
}

async function fetchIzumoData(year: string): Promise<EkidenData | null> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'university', 'izumo', `${year}.json`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    
    return data
  } catch (error) {
    console.error(`出雲駅伝 ${year}年のデータ読み込みエラー:`, error)
    return null
  }
}

export async function generateStaticParams() {
  const years: string[] = []
  const currentYear = new Date().getFullYear()
  
  for (let year = 1989; year <= currentYear; year++) {
    // 中止年を除く
    if (![1990, 2020, 2021].includes(year)) {
      years.push(year.toString())
    }
  }
  
  return years.map((year) => ({ year }))
}

