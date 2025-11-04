"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ResponsiveTableProps {
  headers: string[]
  rows: Array<Array<string | React.ReactNode>>
  mobileCardView?: boolean
}

export function ResponsiveTable({ headers, rows, mobileCardView = true }: ResponsiveTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  if (!mobileCardView) {
    // 通常のテーブル表示
    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // モバイル: カード表示、デスクトップ: テーブル表示
  return (
    <>
      {/* デスクトップ表示 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-3 px-4 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル表示（カード形式） */}
      <div className="md:hidden space-y-2">
        {rows.map((row, rowIndex) => {
          const isExpanded = expandedRows.has(rowIndex)
          return (
            <div
              key={rowIndex}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleRow(rowIndex)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors touch-manipulation active:bg-gray-100"
                style={{ minHeight: '56px' }}
              >
                <div className="flex items-center gap-2 flex-1 text-left overflow-hidden">
                  <div className="font-medium text-gray-900 text-sm truncate">{row[0]}</div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-2 border-t border-gray-100 bg-gray-50/30">
                  {row.slice(1).map((cell, cellIndex) => (
                    <div key={cellIndex} className="flex justify-between items-start py-1.5 gap-3">
                      <span className="text-xs font-medium text-gray-600 flex-shrink-0">
                        {headers[cellIndex + 1]}
                      </span>
                      <span className="text-xs text-gray-900 text-right break-words">
                        {cell}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
