"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"

export default function MixedGenderEkidenPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '混成駅伝', url: '/ekiden/mixed-gender' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-b">
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
              男女混合駅伝
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 mb-1"
            >
              大学男女混合駅伝
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-gray-500"
            >
              Mixed Gender University Ekiden
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              男女混合駅伝の歴代結果は準備中です。
            </p>
            <p className="text-gray-500 text-sm">
              データが追加され次第、こちらに表示されます。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
