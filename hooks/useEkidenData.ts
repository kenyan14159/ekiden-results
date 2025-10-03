import { useState, useEffect } from 'react'
import { EkidenData } from '@/types/ekiden'

interface UseEkidenDataResult {
  data: EkidenData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEkidenData(dataPath: string): UseEkidenDataResult {
  const [data, setData] = useState<EkidenData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(dataPath)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const jsonData = await response.json()
      setData(jsonData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'データの読み込みに失敗しました'
      setError(errorMessage)
      console.error('データの読み込みエラー:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataPath])

  return { 
    data, 
    loading, 
    error,
    refetch: fetchData 
  }
}

// 学年表示用のヘルパー
export function useGradeDisplay() {
  return (grade: number) => {
    const gradeMap: Record<number, string> = { 1: '①', 2: '②', 3: '③', 4: '④' }
    return gradeMap[grade] || ''
  }
}

// メダル絵文字用のヘルパー
export function useMedalEmoji() {
  return (rank: number | string) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return ''
  }
}

