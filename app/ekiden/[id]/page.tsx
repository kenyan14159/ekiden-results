"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { getEkidenById } from "@/lib/ekiden-data"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EkidenDetailPage({ params }: { params: { id: string } }) {
  const race = getEkidenById(params.id)
  const [years, setYears] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchYears() {
      try {
        const response = await fetch(`/api/ekiden/${params.id}/years`)
        if (response.ok) {
          const data = await response.json()
          setYears(data.years || [])
        }
      } catch (error) {
        console.error("Error fetching years:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchYears()
  }, [params.id])

  if (!race) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-20">
        {/* ヒーローセクション */}
        <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-20 lg:py-28 overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
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
                <span className="font-medium">トップページに戻る</span>
              </Link>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {race.name}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">{race.subtitle}</p>
              <p className="text-lg text-gray-600 font-light max-w-3xl">{race.description}</p>
            </motion.div>
          </div>
        </div>

        {/* 年度一覧セクション */}
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                大会結果
              </span>
            </h2>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : years.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {years.map((year, index) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link href={`/ekiden/${params.id}/${year}`}>
                      <Card className="text-center hover:border-primary cursor-pointer transition-all">
                        <CardContent className="p-6">
                          <p className="text-2xl font-bold text-gray-900">{year}</p>
                          <p className="text-sm text-gray-500 mt-1">年度</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">データは準備中です</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
