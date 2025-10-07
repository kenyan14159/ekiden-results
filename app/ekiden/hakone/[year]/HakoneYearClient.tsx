"use client"

import Link from "next/link"
import { getUniversityColor } from "@/data/university-colors"
import { useState } from "react"
import { TabNavigation, TabPanel } from "@/components/TabNavigation"
import { getMedalEmoji, formatGrade, normalizeForSearch } from "@/lib/format-utils"
import { SearchBox } from "@/components/SearchBox"
import { SectionTimeChart } from "@/components/charts/SectionTimeChart"
import { ScrollToTop } from "@/components/ScrollToTop"
import { YearNavigation } from "@/components/YearNavigation"
import type { EkidenData, TabType, RunnerWithTeam } from "@/types/ekiden"

interface HakoneYearClientProps {
  data: EkidenData
  year: number
}

export function HakoneYearClient({ data, year }: HakoneYearClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('team')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set())

  // 区間別データを作成
  const sectionData = Array.from({ length: 10 }, (_, i) => {
    const section = i + 1
    const runners: RunnerWithTeam[] = []
    
    data.teams?.forEach(team => {
      const runner = team.runners?.find(r => r.section === section)
      if (runner && team.rank !== 'OP') {
        runners.push({
          ...runner,
          teamName: team.name,
          teamRank: team.rank,
          color: getUniversityColor(team.name)
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

  // 選手検索（曖昧検索対応）
  const filteredRunners = (data.teams || []).flatMap(team =>
    (team.runners || []).map(runner => ({
      ...runner,
      teamName: team.name,
      teamRank: team.rank,
      color: getUniversityColor(team.name)
    }))
  ).filter(runner => {
    if (!searchQuery) return true
    const normalizedQuery = normalizeForSearch(searchQuery)
    const normalizedName = normalizeForSearch(runner.name)
    const normalizedTeam = normalizeForSearch(runner.teamName)
    return normalizedName.includes(normalizedQuery) || normalizedTeam.includes(normalizedQuery)
  })

  // 統計・記録 (区間賞一覧)
  const sectionAwards = sectionData.map(section => {
    const topRunner = section.runners.find(r => r.rank === 1)
    return {
      section: section.section,
      runner: topRunner ? `${topRunner.name} (${topRunner.teamName})` : 'N/A',
      time: topRunner ? topRunner.time : 'N/A',
      isSectionRecord: topRunner?.isSectionRecord || false
    }
  })

  // アコーディオンの開閉トグル
  const toggleTeam = (teamName: string) => {
    const newExpanded = new Set(expandedTeams)
    if (newExpanded.has(teamName)) {
      newExpanded.delete(teamName)
    } else {
      newExpanded.add(teamName)
    }
    setExpandedTeams(newExpanded)
  }

  return (
    <>
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Link href="/ekiden/hakone" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            箱根駅伝 歴代結果に戻る
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data.eventName} {year}</h1>
          {data.count && <p className="text-md text-gray-600">第{data.count}回大会</p>}
        </div>
      </div>

      <YearNavigation 
        currentYear={year} 
        baseUrl="/ekiden/hakone" 
        minYear={1920}
        excludedYears={[1944, 1945, 1946]}
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
                  {/* アコーディオンヘッダー */}
                  <button
                    onClick={() => toggleTeam(team.name)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center flex-1">
                      <div 
                        className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mr-4 flex-shrink-0" 
                        style={{ backgroundColor: getUniversityColor(team.name) }}
                      >
                        {team.rank}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{team.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                          <p><strong>総合タイム:</strong> {team.totalTime}</p>
                          {team.outboundTime && <p><strong>往路:</strong> {team.outboundTime}</p>}
                          {team.inboundTime && <p><strong>復路:</strong> {team.inboundTime}</p>}
                        </div>
                      </div>
                    </div>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${isExpanded ? 'transform rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* アコーディオンコンテンツ */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-200">
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
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                                </td>
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
          <div className="space-y-8">
            {sectionData.map((section) => (
              <div key={section.section} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.section}区 ランキング</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                        <th className="py-3 px-4 text-left">順位</th>
                        <th className="py-3 px-4 text-left">選手</th>
                        <th className="py-3 px-4 text-left">大学</th>
                        <th className="py-3 px-4 text-left">タイム</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                      {section.runners.slice(0, 10).map((runner, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4 whitespace-nowrap">
                            {runner.rank}{getMedalEmoji(runner.rank)}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: runner.color }}></span>
                            {runner.teamName}
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
            ))}
          </div>
        </TabPanel>

        <TabPanel id="search" activeTab={activeTab}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">選手検索</h2>
            <SearchBox
              placeholder="選手名または大学名で検索（ひらがな・カタカナ・漢字OK）"
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
                    <th className="py-3 px-4 text-left">大学</th>
                    <th className="py-3 px-4 text-left">区間</th>
                    <th className="py-3 px-4 text-left">タイム</th>
                    <th className="py-3 px-4 text-left">区間順位</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {filteredRunners.length > 0 ? (
                    filteredRunners.map((runner, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 whitespace-nowrap">
                          {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                        </td>
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
            {/* 区間タイム比較チャート */}
            <SectionTimeChart
              data={sectionData.map(section => ({
                section: section.section,
                teams: section.runners.slice(0, 5).map(runner => ({
                  name: runner.teamName,
                  time: runner.time,
                  color: runner.color
                }))
              }))}
              title="区間タイム比較（上位5チーム）"
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">統計・記録</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">区間賞一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-4 text-left">区間</th>
                    <th className="py-3 px-4 text-left">選手 (大学)</th>
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
      <ScrollToTop />
    </>
  )
}

