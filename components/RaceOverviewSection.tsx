"use client"

import { RaceOverview } from "@/types/ekiden"
import { Cloud, Thermometer, Wind, Sparkles, Info } from "lucide-react"

interface RaceOverviewSectionProps {
  overview?: RaceOverview
  eventName: string
  year: number
}

export function RaceOverviewSection({ overview, eventName, year }: RaceOverviewSectionProps) {
  if (!overview) return null

  const hasConditions = overview.weather || overview.temperature || overview.wind
  const hasHighlights = overview.highlights && overview.highlights.length > 0
  const hasNotes = overview.notes && overview.notes.length > 0

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Info className="w-6 h-6 text-blue-600" />
        大会概要
      </h2>

      {/* サマリー */}
      {overview.summary && (
        <div className="mb-6">
          <p className="text-gray-800 leading-relaxed text-base">
            {overview.summary}
          </p>
        </div>
      )}

      {/* 天候・気温・風 */}
      {hasConditions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {overview.weather && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">天候</span>
              </div>
              <p className="text-gray-900 text-lg">{overview.weather}</p>
            </div>
          )}

          {overview.temperature && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-700">気温</span>
              </div>
              <p className="text-gray-900 text-lg">{overview.temperature}</p>
            </div>
          )}

          {overview.wind && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-700">風</span>
              </div>
              <p className="text-gray-900 text-lg">{overview.wind}</p>
            </div>
          )}
        </div>
      )}

      {/* 見どころ・ハイライト */}
      {hasHighlights && overview.highlights && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <h3 className="font-bold text-gray-900 text-lg">見どころ・注目ポイント</h3>
          </div>
          <ul className="space-y-2">
            {overview.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span className="text-gray-800">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 特記事項 */}
      {hasNotes && overview.notes && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h3 className="font-bold text-gray-900 mb-2 text-sm">特記事項</h3>
          <ul className="space-y-1">
            {overview.notes.map((note, index) => (
              <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">※</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
