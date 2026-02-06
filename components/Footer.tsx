"use client"

import Link from "next/link"
import Image from "next/image"
import { getEkidenByCategory } from "@/lib/ekiden-data"
import { motion } from "framer-motion"
import { EKIDEN_CATEGORIES, SITE_INFO_LINKS } from "@/lib/constants"

export function Footer() {
  const categories = EKIDEN_CATEGORIES
  const siteInfo = SITE_INFO_LINKS

  return (
    <footer className="relative border-t border-gray-200/50 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50 mt-20 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        {/* 駅伝カテゴリーリンク */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {categories.map((category, catIndex) => {
            const races = getEkidenByCategory(category.id)
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <h3 className="font-bold text-gray-900 mb-4 text-sm lg:text-base">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {races.map((race) => (
                    <li key={race.id}>
                      <Link
                        href={race.url}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                      >
                        <span className="relative">
                          {race.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}

          {/* サイト情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categories.length * 0.1 }}
          >
            <h3 className="font-bold text-gray-900 mb-4 text-sm lg:text-base">
              サイト情報
            </h3>
            <ul className="space-y-3">
              {siteInfo.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center group"
                  >
                    <span className="relative">
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* フッター下部 */}
        <div className="border-t border-gray-200/50 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* ロゴとブランド */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Image
                src="/ekiden-logo.png"
                alt="駅伝リザルト サイトロゴ"
                width={50}
                height={50}
                className="rounded-lg"
                loading="lazy"
                quality={85}
                sizes="50px"
              />
              <div>
                <p className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  駅伝リザルト
                </p>
                <p className="text-xs text-gray-500 font-light tracking-wider mt-0.5">
                  Ekiden Results
                </p>
              </div>
            </motion.div>

            {/* 情報 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center lg:items-end gap-3 text-center lg:text-right"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-light">各大会の公式結果をご確認ください</span>
              </div>
              <p className="text-sm text-gray-500 font-light">
                © 2026 駅伝リザルト. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
