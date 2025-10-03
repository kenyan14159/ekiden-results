/**
 * 時間フォーマット用のユーティリティ関数
 */

/**
 * 秒数を "HH:MM:SS" 形式に変換
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return [hours, minutes, secs]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}

/**
 * "HH:MM:SS" 形式を秒数に変換
 */
export function parseTime(timeStr: string): number {
  const parts = timeStr.split(':').map(Number)
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  return 0
}

/**
 * 順位を日本語で表示
 */
export function formatRank(rank: number | string): string {
  if (typeof rank === 'string') {
    return rank
  }
  return `${rank}位`
}

/**
 * 学年を丸数字で表示
 */
export function formatGrade(grade: number): string {
  const gradeMap: Record<number, string> = { 
    1: '①', 
    2: '②', 
    3: '③', 
    4: '④' 
  }
  return gradeMap[grade] || ''
}

/**
 * メダル絵文字を取得
 */
export function getMedalEmoji(rank: number | string): string {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return ''
}

/**
 * 数値を3桁カンマ区切りにフォーマット
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ja-JP')
}

/**
 * 日付を日本語形式でフォーマット
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * カタカナをひらがなに変換
 */
export function kanaToHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

/**
 * 検索用の正規化（ひらがな・カタカナ・半角・全角を統一）
 */
export function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => 
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    )
    .replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60
      return String.fromCharCode(chr)
    })
}

/**
 * タイム差を計算（秒単位で返す）
 */
export function calculateTimeDifference(time1: string, time2: string): number {
  return parseTime(time1) - parseTime(time2)
}

/**
 * タイム差を "+00:00" または "-00:00" 形式で表示
 */
export function formatTimeDifference(diffSeconds: number): string {
  const sign = diffSeconds >= 0 ? '+' : '-'
  const absDiff = Math.abs(diffSeconds)
  const minutes = Math.floor(absDiff / 60)
  const seconds = absDiff % 60

  return `${sign}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

