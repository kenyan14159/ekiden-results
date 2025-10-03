"use client"

import { useMemo } from 'react'

interface SectionTimeData {
  section: number
  teams: Array<{
    name: string
    time: string
    color: string
  }>
}

interface SectionTimeChartProps {
  data: SectionTimeData[]
  title?: string
}

/**
 * 区間タイム比較チャート
 * シンプルなバーチャートで区間ごとのタイムを比較
 */
export function SectionTimeChart({ data, title = "区間タイム比較" }: SectionTimeChartProps) {
  // タイムを秒数に変換
  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(':').map(Number)
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2]
    }
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
    return 0
  }

  // 最大値を取得（グラフのスケール用）
  const maxTime = useMemo(() => {
    let max = 0
    data.forEach(section => {
      section.teams.forEach(team => {
        const seconds = parseTime(team.time)
        if (seconds > max) max = seconds
      })
    })
    return max
  }, [data])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      
      <div className="space-y-8">
        {data.map((section) => (
          <div key={section.section} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">{section.section}区</h4>
              <span className="text-sm text-gray-500">
                {section.teams[0]?.time || 'N/A'}
              </span>
            </div>
            
            <div className="space-y-2">
              {section.teams.map((team, index) => {
                const seconds = parseTime(team.time)
                const percentage = (seconds / maxTime) * 100
                const isTop3 = index < 3
                
                return (
                  <div key={team.name} className="relative">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-600 w-8">
                        {index + 1}位
                      </span>
                      <span className="text-sm text-gray-700 flex-1 truncate">
                        {team.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900 tabular-nums">
                        {team.time}
                      </span>
                    </div>
                    
                    <div className="relative h-6 bg-gray-100 rounded overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 bottom-0 rounded transition-all duration-500 ${
                          isTop3 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                        }`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: isTop3 ? team.color : undefined,
                        }}
                      />
                      {isTop3 && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

