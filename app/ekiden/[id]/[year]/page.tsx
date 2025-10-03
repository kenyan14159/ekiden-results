"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { getEkidenById } from "@/lib/ekiden-data"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RaceData } from "@/lib/race-data"

export default function EkidenYearPage({ 
  params 
}: { 
  params: { id: string; year: string } 
}) {
  const race = getEkidenById(params.id)
  const [data, setData] = useState<RaceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/ekiden/${params.id}/${params.year}`)
        if (response.ok) {
          const raceData = await response.json()
          setData(raceData)
        } else {
          setData(null)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.id, params.year])

  if (!race) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-20">
        {/* ヒーローセクション */}
        <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href={`/ekiden/${params.id}`}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 group transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
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
                <span className="font-medium">{race.name}に戻る</span>
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {data?.eventName || `${race.name} ${params.year}年`}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* 結果セクション */}
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : data ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
                      <th className="px-4 py-4 text-left font-bold text-gray-900 sticky left-0 bg-inherit z-10">順位</th>
                      <th className="px-4 py-4 text-left font-bold text-gray-900 min-w-[200px]">
                        {data.config.term.singular}名
                      </th>
                      {data.config.type === "corporate" && (
                        <th className="px-4 py-4 text-left font-bold text-gray-900">地域</th>
                      )}
                      <th className="px-4 py-4 text-right font-bold text-gray-900">総合タイム</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.teams.map((team, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 font-bold sticky left-0 bg-white group-hover:bg-gray-50">
                          {typeof team.rank === "number" ? (
                            team.rank <= 3 ? (
                              <span className="text-2xl">
                                {team.rank === 1 ? "🥇" : team.rank === 2 ? "🥈" : "🥉"}
                              </span>
                            ) : (
                              <span className="text-gray-700">{team.rank}</span>
                            )
                          ) : (
                            <span className="text-gray-500">{team.rank}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900">{team.name}</td>
                        {data.config.type === "corporate" && (
                          <td className="px-4 py-4 text-gray-600">{team.federation}</td>
                        )}
                        <td className="px-4 py-4 text-right font-mono font-semibold text-gray-900">
                          {team.totalTime}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">データが見つかりませんでした</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

