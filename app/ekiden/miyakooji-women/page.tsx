"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import { InternalRelatedLinks } from "@/components/InternalRelatedLinks"
import { generateRaceListLinks } from "@/lib/internal-links"
import { RaceListStructuredDataScript } from "@/lib/event-structured-data"
import Link from "next/link"
import { miyakoojiWomenResults } from "@/data/miyakooji-women-results"
import { getPrefectureColor } from "@/data/prefecture-colors"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const decades = [
  { label: '2020年代', start: 2020, end: 2029 },
  { label: '2010年代', start: 2010, end: 2019 },
  { label: '2000年代', start: 2000, end: 2009 },
  { label: '1990年代', start: 1990, end: 1999 },
  { label: '1980年代', start: 1980, end: 1989 },
]

export default function MiyakoojiWomenPage() {
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null)
  const [years, setYears] = useState<number[]>([])

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '都大路(女子)', url: '/ekiden/miyakooji-women' }
  ]
  const relatedLinks = generateRaceListLinks('miyakooji-women')

  // クライアント側でyearsを生成
  useEffect(() => {
    setYears(miyakoojiWomenResults.map(result => result.year))
  }, [])


  const filteredResults = selectedDecade
    ? miyakoojiWomenResults.filter(result => {
        const decade = decades.find(d => d.label === selectedDecade)
        return decade && result.year >= decade.start && result.year <= decade.end
      })
    : miyakoojiWomenResults

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {years.length > 0 && (
        <RaceListStructuredDataScript raceSlug="miyakooji-women" years={years} />
      )}
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              都大路 女子
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 mb-1"
            >
              全国高等学校駅伝競走大会 女子
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-gray-500"
            >
              毎年12月開催 | 5区間 21.0975km（京都府）
            </motion.p>
          </div>
        </div>

        <div className="bg-white border-b sticky top-20 z-10">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button onClick={() => setSelectedDecade(null)} className={`px-4 py-2 text-sm whitespace-nowrap border rounded ${selectedDecade === null ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>全て</button>
              {decades.map(decade => (
                <button key={decade.label} onClick={() => setSelectedDecade(decade.label)} className={`px-4 py-2 text-sm whitespace-nowrap border rounded ${selectedDecade === decade.label ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{decade.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="space-y-2">
            {filteredResults.map((result) => (
              <Link key={result.year} href={`/ekiden/miyakooji-women/${result.year}`}>
                <div className="bg-white border border-gray-200 rounded p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 min-w-fit">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs text-gray-500">第</p>
                        <p className="text-xl font-bold text-gray-900">{result.count}</p>
                        <p className="text-xs text-gray-500">回</p>
                      </div>
                      <div className="text-center min-w-[60px]">
                        <p className="text-2xl font-bold text-gray-900">{result.year}</p>
                        <p className="text-xs text-gray-500">年</p>
                      </div>
                    </div>
                    <div className="h-px md:h-12 md:w-px bg-gray-200"></div>
                    <div className="flex-1">
                      {result.school && result.prefecture && (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: getPrefectureColor(result.prefecture) }}>
                            1
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-bold text-lg text-gray-900">{result.school}</p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{result.prefecture}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{result.time}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* 関連リンク */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <InternalRelatedLinks 
            raceName="全国女子駅伝"
            links={relatedLinks}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

