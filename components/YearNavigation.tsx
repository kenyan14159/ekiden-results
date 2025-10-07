"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface YearNavigationProps {
  currentYear: number
  baseUrl: string
  minYear?: number
  maxYear?: number
  excludedYears?: number[]
}

export function YearNavigation({ 
  currentYear, 
  baseUrl, 
  minYear = 1920, 
  maxYear = new Date().getFullYear(),
  excludedYears = []
}: YearNavigationProps) {
  const getPrevYear = () => {
    let year = currentYear - 1
    while (year >= minYear) {
      if (!excludedYears.includes(year)) {
        return year
      }
      year--
    }
    return null
  }

  const getNextYear = () => {
    let year = currentYear + 1
    while (year <= maxYear) {
      if (!excludedYears.includes(year)) {
        return year
      }
      year++
    }
    return null
  }

  const prevYear = getPrevYear()
  const nextYear = getNextYear()

  return (
    <nav className="bg-white border-t border-b border-gray-200 py-4" aria-label="年度ナビゲーション">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {prevYear ? (
            <Link
              href={`${baseUrl}/${prevYear}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`${prevYear}年の結果を見る`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{prevYear}年</span>
            </Link>
          ) : (
            <div className="w-24"></div>
          )}

          <Link
            href={baseUrl}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="歴代結果一覧に戻る"
          >
            歴代結果一覧
          </Link>

          {nextYear ? (
            <Link
              href={`${baseUrl}/${nextYear}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`${nextYear}年の結果を見る`}
            >
              <span>{nextYear}年</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
      </div>
    </nav>
  )
}
