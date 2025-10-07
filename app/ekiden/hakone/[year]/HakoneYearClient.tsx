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
import { RaceOverviewSection } from "@/components/RaceOverviewSection"
import { SportsEventStructuredData, ArticleStructuredData } from "@/components/EkidenStructuredData"
import { SocialShareButtons } from "@/components/SocialShareButtons"
import { RelatedLinks } from "@/components/RelatedLinks"
import { ResponsiveTable } from "@/components/ResponsiveTable"
import { MobileSwipeContainer } from "@/components/MobileSwipeContainer"
import { Accordion } from "@/components/Accordion"
import { useRouter } from "next/navigation"
import type { EkidenData, TabType, RunnerWithTeam } from "@/types/ekiden"

interface HakoneYearClientProps {
  data: EkidenData
  year: number
}

export function HakoneYearClient({ data, year }: HakoneYearClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('team')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set())
  const router = useRouter()

  // スワイプナビゲーション用のヘルパー関数
  const getPrevYear = () => {
    const excludedYears = [1944, 1945, 1946]
    let checkYear = year - 1
    while (checkYear >= 1920) {
      if (!excludedYears.includes(checkYear)) return checkYear
      checkYear--
    }
    return null
  }

  const getNextYear = () => {
    const excludedYears = [1944, 1945, 1946]
    const maxYear = new Date().getFullYear()
    let checkYear = year + 1
    while (checkYear <= maxYear) {
      if (!excludedYears.includes(checkYear)) return checkYear
      checkYear++
    }
    return null
  }

  const handleSwipeLeft = () => {
    const nextYear = getNextYear()
    if (nextYear) router.push(`/ekiden/hakone/${nextYear}`)
  }

  const handleSwipeRight = () => {
    const prevYear = getPrevYear()
    if (prevYear) router.push(`/ekiden/hakone/${prevYear}`)
  }

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

  // 構造化データの準備
  const winner = data.teams?.find(t => t.rank === 1)
  const competitors = data.teams?.slice(0, 10).map(t => ({
    name: t.name,
    position: typeof t.rank === 'number' ? t.rank : undefined
  }))

  return (
    <>
      {/* 構造化データ */}
      <SportsEventStructuredData
        event={{
          name: `${data.eventName} ${year}`,
          startDate: `${year}-01-02T08:00:00+09:00`,
          endDate: `${year}-01-03T14:00:00+09:00`,
          location: {
            name: '東京～箱根間',
            address: '東京都・神奈川県',
          },
          description: `${data.eventName}（第${data.count}回）の結果。${winner ? `優勝は${winner.name}。` : ''}`,
          organizer: {
            name: '関東学生陸上競技連盟',
          },
          competitors,
          url: `https://ekiden-results.com/ekiden/hakone/${year}`,
        }}
      />
      <ArticleStructuredData
        article={{
          headline: `${data.eventName} ${year}年 結果`,
          description: `${data.eventName}（第${data.count}回）の詳細な結果。チーム別成績、区間別成績、選手別記録を掲載。`,
          datePublished: `${year}-01-03T14:00:00+09:00`,
          dateModified: new Date().toISOString(),
          author: '駅伝リザルト',
          url: `https://ekiden-results.com/ekiden/hakone/${year}`,
          keywords: ['箱根駅伝', `${year}年`, '大学駅伝', winner?.name].filter(Boolean) as string[],
        }}
      />

      <MobileSwipeContainer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        showIndicators={true}
      >
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
        {/* 大会概要セクション */}
        <RaceOverviewSection overview={data.overview} eventName={data.eventName} year={year} />

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
                      <ResponsiveTable
                        headers={['区間', '選手', 'タイム', '順位']}
                        rows={(team.runners || []).map((runner) => [
                          `${runner.section}区`,
                          <span key={runner.section}>
                            {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                          </span>,
                          <span key={`time-${runner.section}`}>
                            {runner.time}
                            {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                          </span>,
                          isOP ? '-' : `${runner.rank}位${getMedalEmoji(runner.rank)}`
                        ])}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </TabPanel>

        <TabPanel id="section" activeTab={activeTab}>
          <div className="space-y-4">
            {sectionData.map((section, index) => (
              <Accordion 
                key={section.section} 
                title={`${section.section}区 ランキング`}
                defaultOpen={false}
              >
                <ResponsiveTable
                  headers={['順位', '選手', '大学', 'タイム']}
                  rows={section.runners.slice(0, 10).map((runner) => [
                    `${runner.rank}${getMedalEmoji(runner.rank)}`,
                    <span key={`runner-${runner.section}`}>
                      {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                    </span>,
                    <span key={`team-${runner.section}`}>
                      <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: runner.color }}></span>
                      {runner.teamName}
                    </span>,
                    <span key={`time-${runner.section}`}>
                      {runner.time}
                      {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                    </span>
                  ])}
                />
              </Accordion>
            ))}
          </div>
        </TabPanel>

        <TabPanel id="search" activeTab={activeTab}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">選手検索</h2>
            <SearchBox
              placeholder="選手名または大学名で検索"
              onSearch={setSearchQuery}
              className="mb-6"
            />
            {searchQuery && (
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-medium">{filteredRunners.length}件</span> の検索結果
                {filteredRunners.length === 0 && " - 別のキーワードをお試しください"}
              </div>
            )}
            {filteredRunners.length > 0 ? (
              <ResponsiveTable
                headers={['選手', '大学', '区間', 'タイム', '区間順位']}
                rows={filteredRunners.map((runner, index) => [
                  <span key={`name-${index}`}>
                    {runner.name} {runner.grade && <span className="text-gray-500">{formatGrade(runner.grade)}</span>}
                  </span>,
                  <span key={`team-${index}`}>
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: runner.color }}></span>
                    {runner.teamName}
                  </span>,
                  `${runner.section}区`,
                  <span key={`time-${index}`}>
                    {runner.time}
                    {runner.isSectionRecord && <span className="ml-2 text-orange-600 font-bold">★区間新</span>}
                  </span>,
                  String(runner.rank)
                ])}
              />
            ) : searchQuery ? (
              <div className="text-center py-8 text-gray-500">
                該当する選手が見つかりません。
              </div>
            ) : null}
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
              <ResponsiveTable
                headers={['区間', '選手 (大学)', 'タイム', '区間新']}
                rows={sectionAwards.map((award) => [
                  `${award.section}区`,
                  award.runner,
                  award.time,
                  award.isSectionRecord ? '★' : ''
                ])}
              />
            </div>

            {/* SNSシェアボタン */}
            <SocialShareButtons 
              url={`/ekiden/hakone/${year}`}
              title={`${data.eventName} ${year}年 第${data.count}回大会 結果`}
              description={winner ? `優勝は${winner.name}。詳細な成績をチェック！` : undefined}
            />

            {/* 関連リンク */}
            <RelatedLinks raceName="箱根駅伝" />
          </div>
        </TabPanel>
      </div>
      </MobileSwipeContainer>
      <ScrollToTop />
    </>
  )
}

