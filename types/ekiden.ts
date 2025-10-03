// 共通の駅伝データ型定義

export interface Runner {
  section: number
  dist: string
  time: string
  name: string
  grade?: number // 大学駅伝のみ
  rank: number | string
  isSectionRecord: boolean
}

export interface Team {
  rank: number | string
  name: string
  totalTime: string
  outboundTime?: string // 箱根駅伝のみ
  inboundTime?: string  // 箱根駅伝のみ
  runners: Runner[]
}

export interface EkidenData {
  eventName: string
  year: number
  count?: number
  teams: Team[]
}

export type TabType = 'team' | 'section' | 'search' | 'stats'

export interface RunnerWithTeam extends Runner {
  teamName: string
  teamRank: number | string
  color: string
}

export interface SectionData {
  section: number
  runners: RunnerWithTeam[]
}

// 駅伝大会のメタデータ
export interface EkidenMeta {
  id: string
  name: string
  subtitle: string
  description: string
  category: 'corporate' | 'university' | 'high-school' | 'junior-high' | 'other'
  url: string
  sections: number // 区間数
  totalDistance?: string // 総距離
  dataPath: string // データファイルのパス
}

// API レスポンス型
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: 'success' | 'error' | 'loading'
}

