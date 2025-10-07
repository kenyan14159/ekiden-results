"use client"

import Link from "next/link"
import { getCorporateColor } from "@/data/corporate-colors"
import { useState } from "react"
import { TabNavigation, TabPanel } from "@/components/TabNavigation"
import { getMedalEmoji, normalizeForSearch } from "@/lib/format-utils"
import { SearchBox } from "@/components/SearchBox"
import { ScrollToTop } from "@/components/ScrollToTop"
import { YearNavigation } from "@/components/YearNavigation"
import { ResponsiveTable } from "@/components/ResponsiveTable"
import { MobileSwipeContainer } from "@/components/MobileSwipeContainer"
import { useRouter } from "next/navigation"
import type { EkidenData, TabType, RunnerWithTeam } from "@/types/ekiden"

interface QueensYearClientProps {
  data: EkidenData
  year: number
}

export function QueensYearClient({ data, year }: QueensYearClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('team')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())
  const router = useRouter()

  const getPrevYear = () => year > 1988 ? year - 1 : null
  const getNextYear = () => {
    const maxYear = new Date().getFullYear()
    return year < maxYear ? year + 1 : null
  }

  const handleSwipeLeft = () => {
    const nextYear = getNextYear()
    if (nextYear) router.push(`/ekiden/queens/${nextYear}`)
  }

  const handleSwipeRight = () => {
    const prevYear = getPrevYear()
    if (prevYear) router.push(`/ekiden/queens/${prevYear}`)
  }

  const toggleTeam = (teamName: string) => {
    setExpandedTeams(prev => {
      const newSet = new Set(prev)
      if (newSet.has(teamName)) {
        newSet.delete(teamName)
      } else {
        newSet.add(teamName)
      }
      return newSet
    })
  }

  const toggleSection = (section: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const sectionCount = data.config?.sections || 6
  const sectionData = Array.from({ length: sectionCount }, (_, i) => {
    const section = i + 1
    const runners: RunnerWithTeam[] = []
    
    data.teams?.forEach(team => {
      const runner = team.runners?.find(r => r.section === section)
      if (runner && team.rank !== 'OP') {
        runners.push({
          ...runner,
          teamName: team.name,
          teamRank: team.rank,
          color: getCorporateColor(team.name)
        })
      }
    })

    runners.sort((a, b) => {
      if (typeof a.rank === 'number' && typeof b.rank === 'number') {
        return a.rank - b.rank
      }
      return 0
    })

    return { section, runners }
  })

  const filteredRunners = (data.teams || []).flatMap(team =>
    (team.runners || []).map(runner => ({
      ...runner,
      teamName: team.name,
      teamRank: team.rank,
      color: getCorporateColor(team.name)
    }))
  ).filter(runner => {
    if (!searchQuery) return true
    const normalizedQuery = normalizeForSearch(searchQuery)
    const normalizedName = normalizeForSearch(runner.name)
    const normalizedTeam = normalizeForSearch(runner.teamName)
    return normalizedName.includes(normalizedQuery) || normalizedTeam.includes(normalizedQuery)
  })

  const sectionAwards = sectionData.map(section => {
    const topRunner = section.runners.find(r => r.rank === 1)
    return {
      section: section.section,
      runner: topRunner ? `${topRunner.name} (${topRunner.teamName})` : 'N/A',
      time: topRunner ? topRunner.time : 'N/A',
      isSectionRecord: topRunner?.isSectionRecord || false
    }
  })

  return (
    <>
      <MobileSwipeContainer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        showIndicators={true}
      >
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <Link href="/ekiden/queens" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              クイーンズ駅伝 歴代結果に戻る
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data.eventName}</h1>
          </div>
        </div>

      <YearNavigation 
        currentYear={year} 
        baseUrl="/ekiden/queens" 
        minYear={1981}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <TabPanel id="team" activeTab={activeTab}>
          <div className="space-y-4">
            {(data.teams || []).map((team) => {
              const isOP = team.rank === 'OP'
              const isExpanded = expandedTeams.has(team.name)
              return (
                <div key={team.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => toggleTeam(team.name)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      <div 
                        className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg mr-3" 
                        style={{ backgroundColor: getCorporateColor(team.name) }}
                      >
                        {team.rank}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{team.name}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">総合タイム</div>
                        <div className="text-lg font-bold text-gray-900">{team.totalTime}</div>
                      </div>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-4">区間成績</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                              <th className="py-3 px-4 text-left">区間</th>
                              <th className="py-3 px-4 text-left">選手</th>
                              <th className="py-3 px-4 text-left">タイム</th>
                              <th className="py-3 px-4 text-left">順位</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700 text-sm font-light">
                            {(team.runners || []).map((runner) => (
                              <tr key={runner.section} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 whitespace-nowrap">{runner.section}区</td>
                                <td className="py-3 px-4 whitespace-nowrap">{runner.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {runner.time}
                                  {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {isOP ? '-' : `${runner.rank}位`}
                                  {!isOP && getMedalEmoji(runner.rank)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </TabPanel>

        <TabPanel id="section" activeTab={activeTab}>
          <div className="space-y-4">
            {sectionData.map((section) => {
              const isExpanded = expandedSections.has(section.section)
              const topRunner = section.runners[0]
              return (
                <div key={section.section} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => toggleSection(section.section)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg mr-3">
                        {section.section}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{section.section}区</h2>
                    </div>
                    <div className="flex items-center gap-6">
                      {topRunner && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">区間賞</div>
                          <div className="text-lg font-bold text-gray-900">{topRunner.name} ({topRunner.teamName})</div>
                          <div className="text-sm text-gray-600">{topRunner.time}</div>
                        </div>
                      )}
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-4">ランキング</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                              <th className="py-3 px-4 text-left">順位</th>
                              <th className="py-3 px-4 text-left">選手</th>
                              <th className="py-3 px-4 text-left">チーム</th>
                              <th className="py-3 px-4 text-left">タイム</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700 text-sm font-light">
                            {section.runners.map((runner, index) => (
                              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {runner.rank}位 {getMedalEmoji(runner.rank)}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">{runner.name}</td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-2" 
                                      style={{ backgroundColor: runner.color }}
                                    ></div>
                                    {runner.teamName}
                                  </div>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {runner.time}
                                  {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </TabPanel>

        <TabPanel id="search" activeTab={activeTab}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">選手検索</h2>
            <SearchBox
              placeholder="選手名で検索..."
              onSearch={setSearchQuery}
              className="mb-6"
            />
            {searchQuery && (
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-medium">{filteredRunners.length}件</span> の検索結果
                {filteredRunners.length === 0 && " - 別のキーワードをお試しください"}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">選手</th>
                    <th className="py-3 px-4 text-left">チーム</th>
                    <th className="py-3 px-4 text-left">区間</th>
                    <th className="py-3 px-4 text-left">タイム</th>
                    <th className="py-3 px-4 text-left">区間順位</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {filteredRunners.length > 0 ? (
                    filteredRunners.map((runner, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 whitespace-nowrap">{runner.name}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: runner.color }}></span>
                          {runner.teamName}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">{runner.section}区</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {runner.time}
                          {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">{runner.rank}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-3 px-4 text-center text-gray-500">
                        該当する選手が見つかりません。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        <TabPanel id="stats" activeTab={activeTab}>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">統計・記録</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">区間賞一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">区間</th>
                    <th className="py-3 px-4 text-left">選手 (チーム)</th>
                    <th className="py-3 px-4 text-left">タイム</th>
                    <th className="py-3 px-4 text-left">区間新</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {sectionAwards.map((award, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">{award.section}区</td>
                      <td className="py-3 px-4 whitespace-nowrap">{award.runner}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{award.time}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{award.isSectionRecord ? '★' : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </TabPanel>
      </div>
      </MobileSwipeContainer>
      <ScrollToTop />
    </>
  )
}

