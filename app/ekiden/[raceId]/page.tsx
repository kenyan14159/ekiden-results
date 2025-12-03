import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getSerializableRaceConfig, RACE_CONFIGS } from "@/lib/race-configs"
import { getEkidenYears, fetchEkidenData, fetchEkidenIndex } from "@/lib/ekiden-data-server"
import { EkidenRaceClient } from "@/components/ekiden/EkidenRaceClient"
import { generateRaceListMetadata } from '@/lib/metadata-utils'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export async function generateMetadata({ params }: { params: { raceId: string } }): Promise<Metadata> {
  return generateRaceListMetadata(params.raceId)
}

export default async function EkidenRacePage({ params }: { params: { raceId: string } }) {
  const config = getSerializableRaceConfig(params.raceId)
  
  // Validate config existence
  // otherカテゴリは汎用なので許可するが、configがない場合は404
  if (!RACE_CONFIGS[params.raceId] && params.raceId !== 'other') {
     notFound()
  }

  // インデックスデータ（概要リスト）を取得（パフォーマンス最適化）
  let results = await fetchEkidenIndex(params.raceId)

  // インデックスがない場合は動的に生成（開発環境やスクリプト未実行時のフォールバック）
  if (!results) {
    const years = await getEkidenYears(params.raceId)
    
    // パフォーマンスのため制限（開発時は少なめに）
    const limit = process.env.NODE_ENV === 'development' ? 20 : 50
    
    const dynamicResults = await Promise.all(
      years.slice(0, limit).map(async (year) => {
        const data = await fetchEkidenData(params.raceId, year)
        if (!data) return null
        
        // 上位3チームを抽出（型安全に）
        const topTeams = (data.teams || [])
            .filter(t => {
                const r = Number(t.rank)
                return !isNaN(r) && r > 0
            })
            .sort((a, b) => Number(a.rank) - Number(b.rank))
            .slice(0, 3)

        return {
          year: data.year,
          count: data.teams ? data.teams.length : 0,
          teams: topTeams.map(t => t.name),
          times: topTeams.map(t => t.totalTime),
        }
      })
    )
    results = dynamicResults.filter((r): r is NonNullable<typeof r> => r !== null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <EkidenRaceClient config={config} results={results} />
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(RACE_CONFIGS).map(raceId => ({
    raceId,
  }))
}
