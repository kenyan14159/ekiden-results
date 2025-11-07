// 共通の駅伝データ型定義

export interface Runner {
  section: number
  dist: string
  time: string
  name: string
  grade?: number // 大学駅伝のみ
  affiliation?: string // 高校・中学駅伝の所属校
  rank: number | string
  isSectionRecord: boolean
}

export interface Team {
  rank: number | string
  name: string
  prefecture?: string
  totalTime: string
  outboundTime?: string // 箱根駅伝のみ
  inboundTime?: string  // 箱根駅伝のみ
  runners: Runner[]
}

export interface RaceOverview {
  weather?: string // 天候
  temperature?: string // 気温
  wind?: string // 風
  highlights?: string[] // 見どころ・注目ポイント
  summary?: string // 大会概要（200-300文字）
  notes?: string[] // 特記事項
}

export interface EkidenData {
  eventName: string
  year: number
  count?: number
  teams: Team[]
  config?: {
    sections: number
  }
  overview?: RaceOverview // 大会概要を追加
}

export type TabType = 'team' | 'section' | 'runner' | 'chart' | 'awards' | 'search' | 'stats'

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

