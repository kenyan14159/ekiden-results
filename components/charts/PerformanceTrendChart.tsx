"use client"

interface YearData {
  year: number
  rank: number | string
  totalTime?: string
}

interface PerformanceTrendChartProps {
  teamName: string
  data: YearData[]
  color?: string
}

/**
 * 成績推移チャート
 * 過去の成績を折れ線グラフで表示
 */
export function PerformanceTrendChart({ 
  teamName, 
  data, 
  color = '#3B82F6' 
}: PerformanceTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500 text-center">データがありません</p>
      </div>
    )
  }

  const maxRank = 20 // グラフの最大順位
  const chartHeight = 400
  const chartWidth = 100 // パーセンテージ
  
  // 有効な順位データのみフィルタ
  const validData = data.filter(d => typeof d.rank === 'number' && d.rank > 0)
  
  if (validData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500 text-center">有効なデータがありません</p>
      </div>
    )
  }

  // SVGパスを生成
  const generatePath = () => {
    const points = validData.map((d, index) => {
      const x = (index / (validData.length - 1)) * chartWidth
      const y = ((d.rank as number) / maxRank) * 100
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">{teamName} 成績推移</h3>
        <p className="text-sm text-gray-500 mt-1">
          {validData[0].year}年 - {validData[validData.length - 1].year}年
        </p>
      </div>

      <div className="relative" style={{ height: chartHeight }}>
        {/* Y軸ラベル（順位） */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-right pr-2">
          {Array.from({ length: 5 }, (_, i) => {
            const rank = (i * maxRank) / 4
            return (
              <span key={i} className="text-xs text-gray-500">
                {rank === 0 ? '1位' : `${Math.round(rank)}位`}
              </span>
            )
          })}
        </div>

        {/* グラフエリア */}
        <div className="absolute left-14 right-0 top-0 bottom-10">
          <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} 100`} preserveAspectRatio="none">
            {/* 背景グリッド */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i * 100) / 4}
                x2={chartWidth}
                y2={(i * 100) / 4}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))}

            {/* データライン */}
            <path
              d={generatePath()}
              fill="none"
              stroke={color}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* データポイント */}
            {validData.map((d, index) => {
              const x = (index / (validData.length - 1)) * chartWidth
              const y = ((d.rank as number) / maxRank) * 100
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* ツールチップエリア */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="transparent"
                    className="hover:fill-gray-100 hover:fill-opacity-50 cursor-pointer"
                  >
                    <title>{d.year}年: {d.rank}位 {d.totalTime ? `(${d.totalTime})` : ''}</title>
                  </circle>
                </g>
              )
            })}
          </svg>
        </div>

        {/* X軸ラベル（年度） */}
        <div className="absolute left-14 right-0 bottom-0 h-8 flex justify-between">
          {validData.map((d, index) => {
            // 表示する年度を間引く（データ数が多い場合）
            const showLabel = validData.length <= 10 || index % Math.ceil(validData.length / 10) === 0
            return showLabel ? (
              <span key={index} className="text-xs text-gray-500 transform -rotate-45 origin-top-left">
                {d.year}
              </span>
            ) : null
          })}
        </div>
      </div>

      {/* 統計情報 */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">最高順位</p>
          <p className="text-lg font-bold" style={{ color }}>
            {Math.min(...validData.map(d => d.rank as number))}位
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">平均順位</p>
          <p className="text-lg font-bold text-gray-700">
            {(validData.reduce((sum, d) => sum + (d.rank as number), 0) / validData.length).toFixed(1)}位
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">出場回数</p>
          <p className="text-lg font-bold text-gray-700">
            {validData.length}回
          </p>
        </div>
      </div>
    </div>
  )
}

