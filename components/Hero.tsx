"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/30"></div>
      
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {/* ロゴとタイトル */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
                <Image
                  src="/ekiden-logo.png"
                  alt="駅伝リザルト - 箱根駅伝、ニューイヤー駅伝など全国駅伝大会の結果を網羅するロゴマーク"
                  width={120}
                  height={120}
                  className="relative rounded-2xl shadow-2xl"
                  priority
                  quality={90}
                  sizes="120px"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                駅伝リザルト
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
            >
              実業団駅伝、大学駅伝、高校駅伝、中学駅伝など
              <br className="hidden md:block" />
              主要な駅伝大会の情報を美しく、分かりやすく
            </motion.p>
          </div>
        </div>
      </div>

      {/* 波形の下部装飾 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-8 md:h-12 text-gray-50" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
        </svg>
      </div>
    </section>
  )
}
