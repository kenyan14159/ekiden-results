import { getUniversityColor } from "@/data/university-colors"
import { getCorporateColor } from "@/data/corporate-colors"
import { getHighSchoolColor } from "@/data/highschool-colors"
import { getPrefectureColor } from "@/data/prefecture-colors"

export type RaceCategory = 'university' | 'corporate' | 'high-school' | 'junior-high' | 'other'

export interface RaceConfig {
  id: string
  name: string
  subtitle: string
  description: string
  category: RaceCategory
  sections: number // デフォルトの区間数
  url: string
  colorFunction: (name: string) => string
  minYear?: number
  excludedYears?: number[]
  hasSeedRights: boolean // シード権の有無
  // 開催日情報（構造化データ用）
  eventDate: {
    month: number // 開催月 (1-12)
    startDay: number // 開始日
    endDay?: number // 終了日（複数日開催の場合）
    startTime: string // 開始時刻 (HH:mm形式)
    endTime: string // 終了時刻 (HH:mm形式)
  }
  location: string // 開催地
}

// シリアライズ可能な設定（クライアントコンポーネント用）
// colorFunctionを除外した型
export type SerializableRaceConfig = Omit<RaceConfig, 'colorFunction'>

// 色取得関数のフォールバック
const defaultColorFunction = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 60%, 45%)`
}

export const RACE_CONFIGS: Record<string, RaceConfig> = {
  // 大学駅伝
  hakone: {
    id: "hakone",
    name: "箱根駅伝",
    subtitle: "東京箱根間往復大学駅伝競走",
    description: "関東の大学による新春の風物詩",
    category: "university",
    sections: 10,
    url: "/ekiden/hakone",
    colorFunction: getUniversityColor,
    minYear: 1920,
    excludedYears: [1944, 1945, 1946],
    hasSeedRights: true,
    eventDate: {
      month: 1,
      startDay: 2,
      endDay: 3,
      startTime: "08:00",
      endTime: "13:30"
    },
    location: "東京都千代田区〜神奈川県箱根町"
  },
  izumo: {
    id: "izumo",
    name: "出雲駅伝",
    subtitle: "出雲全日本大学選抜駅伝競走",
    description: "大学駅伝シーズンの開幕を告げる大会",
    category: "university",
    sections: 6,
    url: "/ekiden/izumo",
    colorFunction: getUniversityColor,
    minYear: 1989,
    hasSeedRights: false,
    eventDate: {
      month: 10,
      startDay: 14,
      startTime: "13:05",
      endTime: "15:30"
    },
    location: "島根県出雲市"
  },
  zenjitsu: {
    id: "zenjitsu",
    name: "全日本大学駅伝",
    subtitle: "全日本大学駅伝対抗選手権大会",
    description: "名古屋〜伊勢間を走る学生駅伝日本一決定戦",
    category: "university",
    sections: 8,
    url: "/ekiden/zenjitsu",
    colorFunction: getUniversityColor,
    hasSeedRights: true,
    eventDate: {
      month: 11,
      startDay: 3,
      startTime: "08:05",
      endTime: "13:30"
    },
    location: "愛知県名古屋市〜三重県伊勢市"
  },
  morinomiyako: {
    id: "morinomiyako",
    name: "杜の都駅伝",
    subtitle: "全日本大学女子駅伝対抗選手権",
    description: "女子大学駅伝日本一を決める大会",
    category: "university",
    sections: 6,
    url: "/ekiden/morinomiyako",
    colorFunction: getUniversityColor,
    hasSeedRights: true,
    eventDate: {
      month: 10,
      startDay: 27,
      startTime: "12:10",
      endTime: "14:30"
    },
    location: "宮城県仙台市"
  },
  fujisan: {
    id: "fujisan",
    name: "富士山駅伝",
    subtitle: "富士山女子駅伝",
    description: "静岡県で開催される女子大学駅伝",
    category: "university",
    sections: 7,
    url: "/ekiden/fujisan",
    colorFunction: getUniversityColor,
    hasSeedRights: false,
    eventDate: {
      month: 12,
      startDay: 30,
      startTime: "10:00",
      endTime: "12:30"
    },
    location: "静岡県富士宮市〜富士市"
  },
  "mixed-gender": {
    id: "mixed-gender",
    name: "男女混合駅伝",
    subtitle: "大学男女混合駅伝",
    description: "男女が混合チームで競う大学駅伝",
    category: "university",
    sections: 6,
    url: "/ekiden/mixed-gender",
    colorFunction: getUniversityColor,
    hasSeedRights: false,
    eventDate: {
      month: 10,
      startDay: 20,
      startTime: "10:00",
      endTime: "12:30"
    },
    location: "日本"
  },
  
  // 実業団駅伝
  newyear: {
    id: "newyear",
    name: "ニューイヤー駅伝",
    subtitle: "全日本実業団対抗駅伝競走大会",
    description: "群馬県で開催される男子実業団駅伝の最高峰",
    category: "corporate",
    sections: 7,
    url: "/ekiden/newyear",
    colorFunction: getCorporateColor,
    hasSeedRights: false,
    eventDate: {
      month: 1,
      startDay: 1,
      startTime: "09:15",
      endTime: "14:30"
    },
    location: "群馬県前橋市〜高崎市"
  },
  queens: {
    id: "queens",
    name: "クイーンズ駅伝",
    subtitle: "全日本実業団対抗女子駅伝競走大会",
    description: "宮城県で開催される女子実業団駅伝の最高峰",
    category: "corporate",
    sections: 6,
    url: "/ekiden/queens",
    colorFunction: getCorporateColor,
    hasSeedRights: true,
    eventDate: {
      month: 11,
      startDay: 24,
      startTime: "12:15",
      endTime: "14:30"
    },
    location: "宮城県松島町〜仙台市"
  },

  // 高校駅伝
  "miyakooji-men": {
    id: "miyakooji-men",
    name: "都大路 男子",
    subtitle: "全国高等学校駅伝競走大会 男子",
    description: "京都で開催される高校男子駅伝の全国大会",
    category: "high-school",
    sections: 7,
    url: "/ekiden/miyakooji-men",
    colorFunction: getHighSchoolColor,
    hasSeedRights: false,
    eventDate: {
      month: 12,
      startDay: 22,
      startTime: "12:30",
      endTime: "14:30"
    },
    location: "京都府京都市（西京極〜国立京都国際会館）"
  },
  "miyakooji-women": {
    id: "miyakooji-women",
    name: "都大路 女子",
    subtitle: "全国高等学校駅伝競走大会 女子",
    description: "京都で開催される高校女子駅伝の全国大会",
    category: "high-school",
    sections: 5,
    url: "/ekiden/miyakooji-women",
    colorFunction: getHighSchoolColor,
    hasSeedRights: false,
    eventDate: {
      month: 12,
      startDay: 22,
      startTime: "10:20",
      endTime: "11:30"
    },
    location: "京都府京都市（西京極〜国立京都国際会館）"
  },

  // 中学駅伝
  "junior-high-men": {
    id: "junior-high-men",
    name: "全国中学男子駅伝",
    subtitle: "全国中学校駅伝大会 男子",
    description: "全国の中学校男子による駅伝日本一決定戦",
    category: "junior-high",
    sections: 6,
    url: "/ekiden/junior-high-men",
    colorFunction: getPrefectureColor, // 中学は都道府県代表の色を使うことが多い
    hasSeedRights: false,
    eventDate: {
      month: 12,
      startDay: 15,
      startTime: "11:30",
      endTime: "12:30"
    },
    location: "滋賀県野洲市（希望が丘文化公園）"
  },
  "junior-high-women": {
    id: "junior-high-women",
    name: "全国中学女子駅伝",
    subtitle: "全国中学校駅伝大会 女子",
    description: "全国の中学校女子による駅伝日本一決定戦",
    category: "junior-high",
    sections: 5,
    url: "/ekiden/junior-high-women",
    colorFunction: getPrefectureColor,
    hasSeedRights: false,
    eventDate: {
      month: 12,
      startDay: 15,
      startTime: "10:00",
      endTime: "10:50"
    },
    location: "滋賀県野洲市（希望が丘文化公園）"
  },

  // その他
  hiroshima: {
    id: "hiroshima",
    name: "ひろしま駅伝",
    subtitle: "全国都道府県対抗男子駅伝",
    description: "広島県で開催される都道府県対抗男子駅伝",
    category: "other",
    sections: 7,
    url: "/ekiden/hiroshima",
    colorFunction: getPrefectureColor,
    hasSeedRights: false,
    eventDate: {
      month: 1,
      startDay: 19,
      startTime: "12:30",
      endTime: "15:00"
    },
    location: "広島県広島市（平和記念公園前）"
  },
  "prefecture-women": {
    id: "prefecture-women",
    name: "都道府県対抗女子駅伝",
    subtitle: "皇后盃全国都道府県対抗女子駅伝競走大会",
    description: "京都で開催される都道府県対抗の女子駅伝",
    category: "other",
    sections: 9,
    url: "/ekiden/prefecture-women",
    colorFunction: getPrefectureColor,
    hasSeedRights: false,
    eventDate: {
      month: 1,
      startDay: 12,
      startTime: "12:30",
      endTime: "15:00"
    },
    location: "京都府京都市（西京極陸上競技場）"
  },
}

export function getRaceConfig(raceId: string): RaceConfig {
  const config = RACE_CONFIGS[raceId]
  if (!config) {
    return {
      id: raceId,
      name: "駅伝大会",
      subtitle: "",
      description: "",
      category: "other",
      sections: 0,
      url: `/ekiden/${raceId}`,
      colorFunction: defaultColorFunction,
      hasSeedRights: false,
      eventDate: {
        month: 1,
        startDay: 1,
        startTime: "09:00",
        endTime: "14:00"
      },
      location: "日本"
    }
  }
  return config
}

/**
 * シリアライズ可能な設定を取得（クライアントコンポーネント用）
 * colorFunctionを除外してJSONシリアライズ可能にする
 */
export function getSerializableRaceConfig(raceId: string): SerializableRaceConfig {
  const config = getRaceConfig(raceId)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { colorFunction, ...serializableConfig } = config
  return serializableConfig
}

/**
 * 年度と大会設定から開催日時のISO文字列を生成
 */
export function getEventDateISO(year: number, config: RaceConfig | SerializableRaceConfig, isEnd: boolean = false): string {
  const { eventDate } = config
  const day = isEnd && eventDate.endDay ? eventDate.endDay : eventDate.startDay
  const time = isEnd ? eventDate.endTime : eventDate.startTime
  const month = eventDate.month.toString().padStart(2, '0')
  const dayStr = day.toString().padStart(2, '0')
  return `${year}-${month}-${dayStr}T${time}:00+09:00`
}

/**
 * カテゴリに応じた色関数を取得（クライアント側で使用）
 */
export function getColorFunctionForCategory(category: RaceCategory): (name: string) => string {
  switch (category) {
    case 'university':
      return getUniversityColor
    case 'corporate':
      return getCorporateColor
    case 'high-school':
      return getHighSchoolColor
    case 'junior-high':
    case 'other':
      return getPrefectureColor
    default:
      return defaultColorFunction
  }
}
