"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { InternalRelatedLinks } from "@/components/InternalRelatedLinks"
import { RaceListStructuredDataScript } from "@/lib/event-structured-data"
import { generateRaceListLinks } from "@/lib/internal-links"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import { getColorFunctionForCategory, type SerializableRaceConfig } from "@/lib/race-configs"
import { getPrefectureColor } from "@/data/prefecture-colors"

interface RaceResultSummary {
  year: number
  count?: number
  teams: (string | { school?: string, name?: string, prefecture?: string })[]
  times: string[]
  canceled?: boolean
  text?: string
}

interface EkidenRaceClientProps {
  config: SerializableRaceConfig
  results: RaceResultSummary[]
}

const decades = [
  { label: '2020年代', start: 2020, end: 2029 },
  { label: '2010年代', start: 2010, end: 2019 },
  { label: '2000年代', start: 2000, end: 2009 },
  { label: '1990年代', start: 1990, end: 1999 },
  { label: '1980年代', start: 1980, end: 1989 },
  { label: '1970年代', start: 1970, end: 1979 },
  { label: '1960年代', start: 1960, end: 1969 },
]

export function EkidenRaceClient({ config, results }: EkidenRaceClientProps) {
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null)

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: config.name, url: config.url }
  ]

  const relatedLinks = generateRaceListLinks(config.id)
  
  // 色取得関数（カテゴリに応じた色を取得）
  const colorFunction = useMemo(() => getColorFunctionForCategory(config.category), [config.category])
  const getColor = (name: string) => colorFunction(name)

  const filteredResults = useMemo(() => {
    if (!selectedDecade) return results
    const decade = decades.find(d => d.label === selectedDecade)
    if (!decade) return results
    return results.filter(result => result.year >= decade.start && result.year <= decade.end)
  }, [results, selectedDecade])

  return (
    <>
      {results.length > 0 && (
        <RaceListStructuredDataScript raceSlug={config.id} years={results.map(r => r.year)} />
      )}
      
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 pt-3 sm:pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 border-b">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-xs sm:text-sm"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            トップページに戻る
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          >
            {config.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-gray-600 mb-1"
          >
            {config.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4"
          >
            {config.description}
          </motion.p>
          
        </div>
      </div>

      {/* 年代別フィルター */}
      <div className="bg-white border-b sticky top-20 z-10">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedDecade(null)}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap border rounded touch-manipulation ${
                selectedDecade === null
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              全て
            </button>
            {decades.map(decade => (
              <button
                key={decade.label}
                onClick={() => setSelectedDecade(decade.label)}
                className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap border rounded touch-manipulation ${
                  selectedDecade === decade.label
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {decade.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 大会結果一覧 */}
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="space-y-2 sm:space-y-3">
          {filteredResults.map((result) => (
            <div key={result.year}>
              {result.canceled ? (
                <div className="bg-white border border-gray-200 rounded p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-center min-w-[50px] sm:min-w-[60px]">
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{result.year}</p>
                      <p className="text-xs text-gray-500">年</p>
                    </div>
                    <div className="h-8 sm:h-10 w-px bg-gray-200"></div>
                    <div>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-400">{result.text || '中止'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={`${config.url}/${result.year}`}>
                  <div className="bg-white border border-gray-200 rounded p-3 sm:p-4 hover:bg-gray-50 touch-manipulation active:bg-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
                      {/* 回数と年 */}
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-fit">
                        {result.count && (
                            <div className="text-center min-w-[40px] sm:min-w-[50px]">
                                <p className="text-xs text-gray-500">第</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900">{result.count}</p>
                                <p className="text-xs text-gray-500">回</p>
                            </div>
                        )}
                        <div className="text-center min-w-[50px] sm:min-w-[60px]">
                          <p className="text-xl sm:text-2xl font-bold text-gray-900">{result.year}</p>
                          <p className="text-xs text-gray-500">年</p>
                        </div>
                      </div>

                      <div className="h-px lg:h-12 lg:w-px bg-gray-200"></div>

                      {/* トップ3 */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
                        {result.teams?.map((team, teamIndex) => {
                          const teamName = typeof team === 'string' ? team : (team.school || team.name || '')
                          const teamPrefecture = typeof team !== 'string' ? team.prefecture : undefined
                          const displayColor = teamPrefecture 
                              ? getPrefectureColor(teamPrefecture) 
                              : getColor(teamName)
                          const rank = teamIndex + 1
                          
                          return (
                            <div key={teamIndex} className="flex items-center gap-2 sm:gap-3">
                              <div 
                                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded text-white font-bold text-xs sm:text-sm flex-shrink-0"
                                style={{ backgroundColor: displayColor }}
                              >
                                {rank}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{teamName}</p>
                                {teamPrefecture && (
                                    <span className="text-xs text-gray-500 block">{teamPrefecture}</span>
                                )}
                                <p className="text-xs text-gray-500">{result.times?.[teamIndex]}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 関連リンク */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <InternalRelatedLinks 
          raceName={config.name}
          links={relatedLinks}
        />
      </div>
    </>
  )
}
