// 各大会の関連リンクデータを生成するヘルパー関数

interface InternalLink {
  title: string
  url: string
  description: string
  year?: string
  tag?: string
}

// 大会の基本情報
const RACE_INFO = {
  hakone: {
    name: "箱根駅伝",
    slug: "hakone",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["zenjitsu", "izumo"],
  },
  newyear: {
    name: "ニューイヤー駅伝",
    slug: "newyear",
    years: [2026, 2025, 2024, 2023, 2022, 2021],
    relatedRaces: ["queens"],
  },
  queens: {
    name: "クイーンズ駅伝",
    slug: "queens",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["newyear", "prefecture-women"],
  },
  zenjitsu: {
    name: "全日本大学駅伝",
    slug: "zenjitsu",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["hakone", "izumo"],
  },
  izumo: {
    name: "出雲駅伝",
    slug: "izumo",
    years: [2025, 2024, 2023, 2022, 2021, 2019],
    relatedRaces: ["hakone", "zenjitsu"],
  },
  fujisan: {
    name: "富士山女子駅伝",
    slug: "fujisan",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["queens", "prefecture-women"],
  },
  morinomiyako: {
    name: "全国女子駅伝",
    slug: "morinomiyako",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["prefecture-women", "fujisan"],
  },
  "miyakooji-men": {
    name: "全国男子駅伝",
    slug: "miyakooji-men",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["miyakooji-women", "hakone"],
  },
  "miyakooji-women": {
    name: "全国女子駅伝",
    slug: "miyakooji-women",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["miyakooji-men", "morinomiyako"],
  },
  hiroshima: {
    name: "ひろしま男子駅伝",
    slug: "hiroshima",
    years: [2026, 2025, 2024, 2023, 2022, 2021],
    relatedRaces: ["newyear", "miyakooji-men"],
  },
  "prefecture-women": {
    name: "全国都道府県対抗女子駅伝",
    slug: "prefecture-women",
    years: [2026, 2025, 2024, 2023, 2022, 2021],
    relatedRaces: ["morinomiyako", "queens"],
  },
  "junior-high-men": {
    name: "全国中学校駅伝男子",
    slug: "junior-high-men",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["junior-high-women"],
  },
  "junior-high-women": {
    name: "全国中学校駅伝女子",
    slug: "junior-high-women",
    years: [2025, 2024, 2023, 2022, 2021, 2020],
    relatedRaces: ["junior-high-men"],
  },
} as const

const RACE_NAMES: Record<string, string> = {
  hakone: "箱根駅伝",
  newyear: "ニューイヤー駅伝",
  queens: "クイーンズ駅伝",
  zenjitsu: "全日本大学駅伝",
  izumo: "出雲駅伝",
  fujisan: "富士山女子駅伝",
  morinomiyako: "全国女子駅伝",
  "miyakooji-men": "全国男子駅伝",
  "miyakooji-women": "全国女子駅伝",
  hiroshima: "ひろしま男子駅伝",
  "prefecture-women": "全国都道府県対抗女子駅伝",
  "junior-high-men": "全国中学校駅伝男子",
  "junior-high-women": "全国中学校駅伝女子",
}

/**
 * 大会一覧ページ用の関連リンクを生成
 * - 最近の年度へのリンク
 * - 関連する他の大会へのリンク
 */
export function generateRaceListLinks(raceSlug: string): InternalLink[] {
  const raceInfo = RACE_INFO[raceSlug as keyof typeof RACE_INFO]
  if (!raceInfo) return []

  const links: InternalLink[] = []

  // 最近の年度へのリンク (最大6件)
  raceInfo.years.slice(0, 6).forEach((year) => {
    links.push({
      title: `${year}年 ${raceInfo.name}`,
      url: `/ekiden/${raceSlug}/${year}`,
      description: `${year}年の${raceInfo.name}の詳細結果を見る`,
      year: year.toString(),
      tag: "最新",
    })
  })

  // 関連する大会へのリンク (最大3件)
  raceInfo.relatedRaces.slice(0, 3).forEach((relatedSlug) => {
    const relatedName = RACE_NAMES[relatedSlug]
    if (relatedName) {
      links.push({
        title: relatedName,
        url: `/ekiden/${relatedSlug}`,
        description: `${relatedName}の歴代結果一覧を見る`,
        tag: "関連大会",
      })
    }
  })

  return links
}

/**
 * 年度別詳細ページ用の関連リンクを生成
 * - 前後の年度へのリンク
 * - 同じ大会の一覧ページ
 * - 関連する他の大会の同年度
 */
export function generateYearDetailLinks(
  raceSlug: string,
  currentYear: string
): InternalLink[] {
  const raceInfo = RACE_INFO[raceSlug as keyof typeof RACE_INFO]
  if (!raceInfo) return []

  const links: InternalLink[] = []
  const year = parseInt(currentYear)

  // 大会一覧ページへのリンク
  links.push({
    title: `${raceInfo.name} 歴代結果一覧`,
    url: `/ekiden/${raceSlug}`,
    description: `${raceInfo.name}の全ての年度の結果を見る`,
    tag: "一覧",
  })

  // 前後の年度へのリンク
  const currentIndex = raceInfo.years.indexOf(year as any)
  
  // 次の年 (より新しい)
  if (currentIndex > 0) {
    const nextYear = raceInfo.years[currentIndex - 1]
    links.push({
      title: `${nextYear}年 ${raceInfo.name}`,
      url: `/ekiden/${raceSlug}/${nextYear}`,
      description: `${nextYear}年の${raceInfo.name}の結果を見る`,
      year: nextYear.toString(),
      tag: "次年度",
    })
  }

  // 前の年 (より古い)
  if (currentIndex < raceInfo.years.length - 1) {
    const prevYear = raceInfo.years[currentIndex + 1]
    links.push({
      title: `${prevYear}年 ${raceInfo.name}`,
      url: `/ekiden/${raceSlug}/${prevYear}`,
      description: `${prevYear}年の${raceInfo.name}の結果を見る`,
      year: prevYear.toString(),
      tag: "前年度",
    })
  }

  // 関連する大会の同年度へのリンク
  raceInfo.relatedRaces.slice(0, 3).forEach((relatedSlug) => {
    const relatedInfo = RACE_INFO[relatedSlug as keyof typeof RACE_INFO]
    if (relatedInfo && relatedInfo.years.includes(year as any)) {
      links.push({
        title: `${year}年 ${relatedInfo.name}`,
        url: `/ekiden/${relatedSlug}/${year}`,
        description: `${year}年の${relatedInfo.name}の結果を見る`,
        year: year.toString(),
        tag: "関連大会",
      })
    }
  })

  return links
}

/**
 * ホームページ用の人気大会リンクを生成
 */
export function generateHomePageLinks(): InternalLink[] {
  const popularRaces = ["hakone", "newyear", "queens", "zenjitsu", "izumo", "fujisan"]
  
  return popularRaces.map((slug) => {
    const raceInfo = RACE_INFO[slug as keyof typeof RACE_INFO]
    const latestYear = raceInfo.years[0]
    
    return {
      title: raceInfo.name,
      url: `/ekiden/${slug}`,
      description: `${raceInfo.name}の歴代結果と最新情報`,
      year: latestYear.toString(),
      tag: "人気",
    }
  })
}

/**
 * 三大駅伝のリンクを生成 (箱根、全日本、出雲)
 */
export function generateSandaiEkidenLinks(currentRaceSlug?: string): InternalLink[] {
  const sandaiRaces = ["hakone", "zenjitsu", "izumo"]
  
  return sandaiRaces
    .filter((slug) => slug !== currentRaceSlug)
    .map((slug) => {
      const raceInfo = RACE_INFO[slug as keyof typeof RACE_INFO]
      const latestYear = raceInfo.years[0]
      
      return {
        title: `${raceInfo.name} ${latestYear}`,
        url: `/ekiden/${slug}/${latestYear}`,
        description: `${latestYear}年の${raceInfo.name}の結果を見る`,
        year: latestYear.toString(),
        tag: "三大駅伝",
      }
    })
}

/**
 * 女子駅伝のリンクを生成
 */
export function generateWomenEkidenLinks(currentRaceSlug?: string): InternalLink[] {
  const womenRaces = ["queens", "fujisan", "morinomiyako", "prefecture-women"]
  
  return womenRaces
    .filter((slug) => slug !== currentRaceSlug)
    .map((slug) => {
      const raceInfo = RACE_INFO[slug as keyof typeof RACE_INFO]
      const latestYear = raceInfo.years[0]
      
      return {
        title: raceInfo.name,
        url: `/ekiden/${slug}/${latestYear}`,
        description: `${latestYear}年の${raceInfo.name}の結果を見る`,
        year: latestYear.toString(),
        tag: "女子駅伝",
      }
    })
}
