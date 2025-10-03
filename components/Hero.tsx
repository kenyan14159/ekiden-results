"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 border-b">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            日本全国の駅伝大会リザルト
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            実業団駅伝、大学駅伝、高校駅伝、中学駅伝など
            <br className="hidden md:block" />
            主要な駅伝大会の情報を美しく、分かりやすく
          </motion.p>
        </div>
      </div>
    </section>
  )
}
