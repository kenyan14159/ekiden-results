import fs from 'fs/promises'
import path from 'path'
import 'server-only'
import { EkidenDataSchema, type EkidenData } from './validations/ekiden-schema'

// データディレクトリのルート
const DATA_DIR = path.join(process.cwd(), 'data')

// RaceID to Directory Map
const RACE_DATA_MAP: Record<string, string> = {
  // University
  'hakone': 'university/hakone',
  'izumo': 'university/izumo',
  'zenjitsu': 'university/all-japan',
  'morinomiyako': 'university/morinomiyako',
  'fujisan': 'university/fujisan',
  'mixed-gender': 'university/mixed-gender',
  
  // Corporate
  'newyear': 'corporate/newyear',
  'queens': 'corporate/queens',
  
  // High School
  'miyakooji-men': 'highschool/boys',
  'miyakooji-women': 'highschool/girls',
  
  // Junior High
  'junior-high-men': 'junior-high/boys',
  'junior-high-women': 'junior-high/girls',
  
  // Prefectures (Other)
  'hiroshima': 'prefectures/boys',
  'prefecture-women': 'prefectures/girls'
}

function getRaceDir(raceId: string): string {
  return RACE_DATA_MAP[raceId] || raceId
}

/**
 * 指定された大会・年度のデータを取得する
 * バリデーション付き
 */
export async function fetchEkidenData(
  raceId: string,
  year: string
): Promise<EkidenData | null> {
  try {
    const relativeDir = getRaceDir(raceId)
    const filePath = path.join(DATA_DIR, relativeDir, `${year}.json`)
    
    // ファイルが存在するか確認
    try {
        await fs.access(filePath)
    } catch {
        return null
    }

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const jsonData = JSON.parse(fileContent)
    
    // Zodによるバリデーション
    const result = EkidenDataSchema.safeParse(jsonData)
    
    if (!result.success) {
      console.error(`Data validation failed for ${raceId}/${year}:`, result.error.format())
      if (process.env.NODE_ENV === 'development') {
          return jsonData as EkidenData
      }
      return null
    }
    
    return result.data
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Data fetch warning for ${raceId}/${year}:`, error)
    }
    return null
  }
}

/**
 * 指定された大会の全年度（ID一覧）を取得する
 * generateStaticParamsで使用
 */
export async function getEkidenYears(
  raceId: string
): Promise<string[]> {
  try {
    const relativeDir = getRaceDir(raceId)
    const dirPath = path.join(DATA_DIR, relativeDir)
    const files = await fs.readdir(dirPath)
    
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
      .sort((a, b) => Number(b) - Number(a)) // 降順ソート
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.warn(`Years fetch warning for ${raceId}:`, error)
    }
    return []
  }
}

export interface EkidenIndexItem {
  year: number
  teams: string[]
  times: string[]
  count: number
}

/**
 * 大会のインデックスデータ（概要リスト）を取得する
 * パフォーマンス最適化用
 */
export async function fetchEkidenIndex(raceId: string): Promise<EkidenIndexItem[] | null> {
  try {
    const indexPath = path.join(DATA_DIR, 'indices', `${raceId}.json`)
    
    try {
      await fs.access(indexPath)
    } catch {
      return null
    }

    const fileContent = await fs.readFile(indexPath, 'utf-8')
    return JSON.parse(fileContent) as EkidenIndexItem[]
  } catch (error) {
    console.warn(`Index fetch warning for ${raceId}:`, error)
    return null
  }
}
