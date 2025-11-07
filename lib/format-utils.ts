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
 * メダル絵文字を順位に応じて取得
 */
export function getMedalEmoji(rank: number | string): string {
  if (typeof rank !== 'number') {
    return ''
  }

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

/**
 * タイム表示を整形（1時間未満の場合、先頭の0:を削除）
 * 例: "0:29:22" → "29:22", "0:08:04" → "8:04", "1:02:30" → "1:02:30"
 */
export function formatDisplayTime(time: string | undefined | null): string {
  if (!time) return '-'
  
  // タイムが "0:" で始まる場合、先頭の "0:" を削除
  if (time.startsWith('0:')) {
    // "0:08:04" → "08:04" → "8:04" のように、分の先頭の0も削除
    const withoutHour = time.substring(2)
    const parts = withoutHour.split(':')
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10)
      return `${minutes}:${parts[1]}`
    }
    return withoutHour
  }
  
  return time
}

/**
 * タイム表示から先頭の0を削除
 * 例: "01:09:11" → "1:09:11", "00:56:47" → "0:56:47", "0:29:22" → "29:22"
 */
export function removeLeadingZero(time: string | undefined | null): string {
  if (!time) return '-'
  
  // "0:MM:SS" 形式の場合（時間が0の場合）
  if (time.startsWith('0:')) {
    const withoutHour = time.substring(2)
    const parts = withoutHour.split(':')
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10)
      const seconds = parts[1]
      return `${minutes}:${seconds}`
    }
    return withoutHour
  }
  
  // "HH:MM:SS" 形式の場合
  const parts = time.split(':')
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10)
    const minutes = parts[1]
    const seconds = parts[2]
    return `${hours}:${minutes}:${seconds}`
  }
  
  // "MM:SS" 形式の場合
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10)
    const seconds = parts[1]
    return `${minutes}:${seconds}`
  }
  
  return time
}

/**
 * 選手の所属情報から括弧内の括弧を削除
 * 例: "佐久長聖高(3)" → "佐久長聖高3"
 */
export function formatAffiliation(affiliation: string | undefined | null): string {
  if (!affiliation) return ''
  // 括弧内の括弧を削除: 佐久長聖高(3) → 佐久長聖高3
  return affiliation.replace(/\(([^)]+)\)/g, '$1')
}

/**
 * モバイル表示用に大学名から「大学」を削除
 * 例: "大東文化大学" → "大東文化"
 */
export function shortenUniversityName(name: string | undefined | null): string {
  if (!name) return ''
  return name.replace(/大学$/, '')
}

