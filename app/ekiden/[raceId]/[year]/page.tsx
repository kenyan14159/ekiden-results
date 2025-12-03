import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { fetchEkidenData, getEkidenYears } from "@/lib/ekiden-data-server"
import { getSerializableRaceConfig, RACE_CONFIGS } from "@/lib/race-configs"
import { EkidenYearClient } from "@/components/ekiden/EkidenYearClient"
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { generateRaceYearMetadata } from '@/lib/metadata-utils'

// 動的メタデータ生成
export async function generateMetadata({ 
  params 
}: { 
  params: { raceId: string, year: string } 
}): Promise<Metadata> {
  const year = parseInt(params.year)
  
  // データを取得して優勝校を特定
  let winner = ''
  
  try {
    const data = await fetchEkidenData(params.raceId, params.year)
    const topTeam = data?.teams?.find((t) => t.rank === 1)
    winner = topTeam ? topTeam.name : ''
  } catch {
    // メタデータ生成のエラーはログに出さなくて良い（404ページ側で処理されるため）
  }

  return generateRaceYearMetadata(params.raceId, year, winner)
}

// Server Component
export default async function EkidenYearPage({ 
  params 
}: { 
  params: { raceId: string, year: string } 
}) {
  const year = parseInt(params.year)
  const raceConfig = getSerializableRaceConfig(params.raceId)
  
  const data = await fetchEkidenData(params.raceId, params.year)

  if (!data) {
    notFound()
  }

  // カテゴリ名を取得
  const getCategoryName = (cat: string) => {
      switch(cat) {
          case 'university': return '大学駅伝'
          case 'corporate': return '実業団駅伝'
          case 'high-school': return '高校駅伝'
          case 'junior-high': return '中学駅伝'
          default: return '駅伝'
      }
  }

  // パンくずリスト
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: getCategoryName(raceConfig.category), url: `/#${raceConfig.category}` },
    { name: raceConfig.name, url: raceConfig.url },
    { name: `${year}年`, url: `${raceConfig.url}/${year}` },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <Header />
      <main className="flex-grow pt-20">
        <EkidenYearClient 
            data={data} 
            year={year} 
            raceConfig={raceConfig}
        />
      </main>
      <Footer />
    </div>
  )
}

// 静的パスの生成
export async function generateStaticParams() {
  const allParams = []
  
  // 定義されている全大会についてループ
  for (const raceId of Object.keys(RACE_CONFIGS)) {
    const years = await getEkidenYears(raceId)
    for (const year of years) {
      allParams.push({
        raceId,
        year,
      })
    }
  }
  
  return allParams
}

