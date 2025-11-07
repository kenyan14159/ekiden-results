"use client"

import { useState, useEffect } from 'react'
import { normalizeForSearch } from '@/lib/format-utils'

interface SearchBoxProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
  showFilters?: boolean
  filters?: Array<{
    id: string
    label: string
    options: Array<{ value: string; label: string }>
  }>
  onFilterChange?: (filterId: string, value: string) => void
}

export function SearchBox({
  placeholder = "検索...",
  onSearch,
  className = "",
  showFilters = false,
  filters = [],
  onFilterChange
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300) // デバウンス: 300ms

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 検索ボックス */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-12 py-3 
            border-2 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${isFocused ? 'border-blue-400 shadow-lg' : 'border-gray-300'}
          `}
          aria-label="検索"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="クリア"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* フィルター（オプション） */}
      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <div key={filter.id} className="flex-1 min-w-[200px]">
              <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              <select
                id={filter.id}
                onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* 検索ヒント */}
      {isFocused && !query && (
        <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="font-medium mb-1">💡 検索のヒント:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>選手名または大学名・チーム名で検索できます</li>
            <li>部分一致で検索されます</li>
          </ul>
        </div>
      )}
    </div>
  )
}

// 検索用のカスタムフック
export function useSearch<T>(
  items: T[],
  searchFields: Array<keyof T>,
  filters?: Record<string, string>
) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(filters || {})

  const filteredItems = items.filter((item) => {
    // 検索クエリでフィルタ
    if (searchQuery) {
      const normalizedQuery = normalizeForSearch(searchQuery)
      const matches = searchFields.some((field) => {
        const value = item[field]
        if (typeof value === 'string') {
          return normalizeForSearch(value).includes(normalizedQuery)
        }
        return false
      })
      if (!matches) return false
    }

    // 追加フィルタ
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && item[key as keyof T] !== value) {
        return false
      }
    }

    return true
  })

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    filteredItems,
    totalCount: items.length,
    filteredCount: filteredItems.length,
  }
}

