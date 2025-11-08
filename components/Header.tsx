"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getEkidenByCategory } from "@/lib/ekiden-data"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    { id: "corporate", name: "実業団駅伝" },
    { id: "university", name: "大学駅伝" },
    { id: "high-school", name: "高校駅伝" },
    { id: "junior-high", name: "中学駅伝" },
    { id: "other", name: "その他の駅伝" },
  ]

  const siteInfo = [
    { title: "ホーム", href: "/" },
    { title: "スコアリングテーブル", href: "/information/scoring-table" },
    { title: "プライバシーポリシー", href: "/information/privacy-policy" },
    { title: "お問い合わせ", href: "/information/contact" },
    { title: "免責事項", href: "/information/disclaimer" },
    { title: "運営者情報", href: "/information/operator-information" },
  ]

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <Image
                src="/ekiden-logo.png"
                alt="駅伝リザルト ホームに戻る"
                width={50}
                height={50}
                className="rounded-lg"
                priority
                quality={85}
                sizes="50px"
              />
            </motion.div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                駅伝リザルト
              </h1>
              <p className="text-xs text-gray-500 font-light hidden sm:block tracking-wide">
                Ekiden Results
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1">
            {categories.map((category) => {
              const races = getEkidenByCategory(category.id)
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setOpenCategory(category.id)}
                  onMouseLeave={() => setOpenCategory(null)}
                >
                  <button 
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 relative group"
                    aria-expanded={openCategory === category.id}
                    aria-haspopup="true"
                    aria-label={`${category.name}メニューを${openCategory === category.id ? '閉じる' : '開く'}`}
                  >
                    {category.name}
                    <svg
                      className={`w-3.5 h-3.5 inline-block ml-1.5 transition-transform ${
                        openCategory === category.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 transition-all duration-300"></span>
                  </button>
                  {openCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-0.5 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden"
                      role="menu"
                      aria-label={`${category.name}の大会一覧`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 pointer-events-none"></div>
                      {races.map((race) => (
                        <Link
                          key={race.id}
                          href={race.url}
                          className="relative block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all group"
                          role="menuitem"
                        >
                          <span className="relative z-10 flex items-center justify-between">
                            <span className="font-medium">{race.name}</span>
                            <svg
                              className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              )
            })}
            
            {/* 【一時的に非表示】ブログリンク - 準備ができたら以下のコメントを解除 */}
            {/* <Link
              href="/blog"
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 relative group"
            >
              ブログ
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 transition-all duration-300"></span>
            </Link> */}
            
            {/* サイト情報 */}
            <div
              className="relative"
              onMouseEnter={() => setOpenCategory("site-info")}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <button 
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 relative group"
                aria-expanded={openCategory === "site-info"}
                aria-haspopup="true"
                aria-label={`サイト情報メニューを${openCategory === "site-info" ? '閉じる' : '開く'}`}
              >
                サイト情報
                <svg
                  className={`w-3.5 h-3.5 inline-block ml-1.5 transition-transform ${
                    openCategory === "site-info" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 transition-all duration-300"></span>
              </button>
              {openCategory === "site-info" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-0.5 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden"
                  role="menu"
                  aria-label="サイト情報メニュー"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-50/50 pointer-events-none"></div>
                  {siteInfo.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="relative block px-5 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 transition-all group"
                      role="menuitem"
                    >
                      <span className="relative z-10 flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>
                        <svg
                          className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            aria-label="メニュー"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden pb-6 border-t border-gray-100 mt-2"
            aria-label="モバイルナビゲーションメニュー"
          >
            <div className="pt-4 space-y-1">
              {categories.map((category) => {
                const races = getEkidenByCategory(category.id)
                const isCategoryOpen = openCategory === category.id
                return (
                  <div key={category.id} className="mb-2">
                    <button
                      onClick={() => setOpenCategory(isCategoryOpen ? null : category.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                      aria-expanded={isCategoryOpen}
                      aria-haspopup="true"
                      aria-label={`${category.name}メニューを${isCategoryOpen ? '閉じる' : '開く'}`}
                    >
                      {category.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-gray-200"
                      >
                        {races.map((race) => (
                          <Link
                            key={race.id}
                            href={race.url}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {race.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}
              
              {/* 【一時的に非表示】ブログリンク (Mobile) - 準備ができたら以下のコメントを解除 */}
              {/* <Link
                href="/blog"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                ブログ
              </Link> */}
              
              {/* サイト情報 (Mobile) */}
              <div className="mb-2">
                <button
                  onClick={() => setOpenCategory(openCategory === "site-info-mobile" ? null : "site-info-mobile")}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                  aria-expanded={openCategory === "site-info-mobile"}
                  aria-haspopup="true"
                  aria-label={`サイト情報メニューを${openCategory === "site-info-mobile" ? '閉じる' : '開く'}`}
                >
                  サイト情報
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${openCategory === "site-info-mobile" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openCategory === "site-info-mobile" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-gray-200"
                  >
                    {siteInfo.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
