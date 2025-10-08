import type { Metadata } from "next"

/**
 * 駅伝大会情報の型定義
 */
export interface RaceMetadata {
  name: string // 大会名
  nameEn: string // 英語表記
  shortName: string // 短縮名
  category: '実業団' | '大学' | '高校' | '中学' | 'その他'
  season: string // 開催時期
  keywords: string[] // 固有キーワード
}

/**
 * 駅伝大会のメタデータ定義
 */
export const RACE_METADATA: Record<string, RaceMetadata> = {
  hakone: {
    name: '箱根駅伝',
    nameEn: 'Hakone Ekiden',
    shortName: '箱根',
    category: '大学',
    season: '1月2日-3日',
    keywords: ['往路', '復路', '山登り', '山下り', '5区', '6区', 'シード権', '予選会']
  },
  newyear: {
    name: 'ニューイヤー駅伝',
    nameEn: 'New Year Ekiden',
    shortName: 'ニューイヤー',
    category: '実業団',
    season: '1月1日',
    keywords: ['実業団', '群馬', '前橋', '社会人', '日本一']
  },
  queens: {
    name: 'クイーンズ駅伝',
    nameEn: 'Queens Ekiden',
    shortName: 'クイーンズ',
    category: '実業団',
    season: '11月',
    keywords: ['女子', '実業団', '仙台', '全日本実業団対抗女子駅伝']
  },
  izumo: {
    name: '出雲駅伝',
    nameEn: 'Izumo Ekiden',
    shortName: '出雲',
    category: '大学',
    season: '10月',
    keywords: ['大学三大駅伝', '出雲大社', '島根', 'スピード駅伝']
  },
  zenjitsu: {
    name: '全日本大学駅伝',
    nameEn: 'All Japan University Ekiden',
    shortName: '全日本',
    category: '大学',
    season: '11月',
    keywords: ['大学三大駅伝', '伊勢路', '熱田神宮', '伊勢神宮']
  },
  fujisan: {
    name: '富士山女子駅伝',
    nameEn: 'Mt. Fuji Women\'s Ekiden',
    shortName: '富士山',
    category: '大学',
    season: '12月',
    keywords: ['女子', '大学女子', '富士山', '山梨']
  },
  morinomiyako: {
    name: '全日本大学女子駅伝（杜の都駅伝）',
    nameEn: 'Morinomiyako Ekiden',
    shortName: '杜の都',
    category: '大学',
    season: '10月',
    keywords: ['女子', '大学女子', '仙台', '杜の都']
  },
  'miyakooji-men': {
    name: '全国男子駅伝（都道府県対抗駅伝）',
    nameEn: 'National Men\'s Ekiden',
    shortName: '都道府県男子',
    category: 'その他',
    season: '1月',
    keywords: ['都道府県対抗', '広島', '平和記念公園', '高校生', '中学生']
  },
  'miyakooji-women': {
    name: '全国女子駅伝（都道府県対抗駅伝）',
    nameEn: 'National Women\'s Ekiden',
    shortName: '都道府県女子',
    category: 'その他',
    season: '1月',
    keywords: ['都道府県対抗', '京都', '高校生', '中学生']
  },
  'prefecture-women': {
    name: '全国都道府県対抗女子駅伝',
    nameEn: 'National Women\'s Ekiden',
    shortName: '都道府県女子',
    category: 'その他',
    season: '1月',
    keywords: ['都道府県対抗', '京都', '西京極']
  },
  hiroshima: {
    name: '全国都道府県対抗男子駅伝',
    nameEn: 'National Men\'s Ekiden',
    shortName: '都道府県男子',
    category: 'その他',
    season: '1月',
    keywords: ['都道府県対抗', '広島', '平和記念公園']
  },
  'junior-high-men': {
    name: '全国中学校駅伝（男子）',
    nameEn: 'National Junior High School Ekiden (Boys)',
    shortName: '全中男子',
    category: '中学',
    season: '12月',
    keywords: ['中学生', '男子', '山口', '滋賀']
  },
  'junior-high-women': {
    name: '全国中学校駅伝（女子）',
    nameEn: 'National Junior High School Ekiden (Girls)',
    shortName: '全中女子',
    category: '中学',
    season: '12月',
    keywords: ['中学生', '女子', '山口', '滋賀']
  },
  'mixed-gender': {
    name: '全日本大学駅伝対校選手権大会（男女混合）',
    nameEn: 'All Japan University Mixed Ekiden',
    shortName: '男女混合',
    category: '大学',
    season: '10月',
    keywords: ['男女混合', '大学', '混成']
  }
}

/**
 * 一覧ページのメタデータ生成
 */
export function generateRaceListMetadata(raceKey: string): Metadata {
  const race = RACE_METADATA[raceKey]
  if (!race) {
    return {
      title: '駅伝リザルト',
      description: '駅伝大会の結果一覧'
    }
  }

  const title = `${race.name}結果一覧 | 歴代優勝チーム・記録【${race.category}駅伝】`
  const description = `${race.name}の歴代結果一覧。優勝チーム、区間記録、大会記録を年度別に掲載。${race.season}開催の${race.category}駅伝の詳細データを完全網羅。過去の名勝負や記録更新の瞬間を振り返る。`
  
  const keywords = [
    race.name,
    `${race.name}結果`,
    `${race.name}記録`,
    `${race.name}優勝`,
    race.category,
    '駅伝',
    '結果',
    '記録',
    ...race.keywords
  ]

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/${raceKey}`,
    },
  }
}

/**
 * 年度別詳細ページのメタデータ生成
 */
export function generateRaceYearMetadata(
  raceKey: string,
  year: number,
  winner?: string,
  recordInfo?: string
): Metadata {
  const race = RACE_METADATA[raceKey]
  if (!race) {
    return {
      title: `${year}年 駅伝結果`,
      description: `${year}年の駅伝結果`
    }
  }

  const winnerText = winner ? `優勝は${winner}。` : ''
  const recordText = recordInfo ? recordInfo : ''
  
  const title = `${race.name}${year}結果速報 | 区間記録・${winner ? `優勝${winner}・` : ''}成績一覧`
  const description = `${race.name}${year}年の詳細結果。${winnerText}チーム別成績、区間別記録、選手別タイムを完全網羅。${recordText}${race.season}開催の${race.category}駅伝の全データを掲載。`
  
  const keywords = [
    `${race.name}${year}`,
    `${race.name} ${year}`,
    `${race.name}結果`,
    `${race.name}速報`,
    race.name,
    '区間記録',
    '区間賞',
    ...(winner ? [winner] : []),
    ...race.keywords
  ]

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/${raceKey}/${year}`,
    },
  }
}

/**
 * 大会概要ページのメタデータ生成
 */
export function generateRaceAboutMetadata(raceKey: string): Metadata {
  const race = RACE_METADATA[raceKey]
  if (!race) {
    return {
      title: '駅伝大会について',
      description: '駅伝大会の概要'
    }
  }

  const title = `${race.name}とは | 大会概要・コース・歴史【完全ガイド】`
  const description = `${race.name}の大会概要、コース詳細、歴史、見どころを徹底解説。${race.season}開催の${race.category}駅伝について、初心者にもわかりやすく紹介。観戦ガイドや注目ポイントも掲載。`
  
  const keywords = [
    race.name,
    `${race.name}とは`,
    `${race.name}概要`,
    `${race.name}コース`,
    `${race.name}歴史`,
    `${race.name}見どころ`,
    ...race.keywords
  ]

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/${raceKey}/about`,
    },
  }
}

/**
 * 情報ページのメタデータ生成
 */
export function generateInfoPageMetadata(
  pageType: 'scoring-table' | 'privacy-policy' | 'contact' | 'disclaimer' | 'operator-information'
): Metadata {
  const metadataMap = {
    'scoring-table': {
      title: '駅伝の採点方式・ポイント表 | 順位決定ルール解説',
      description: '駅伝の採点方式、ポイント計算方法、順位決定ルールを詳しく解説。大学駅伝、実業団駅伝それぞれの採点システムとシード権の仕組みをわかりやすく説明します。',
      keywords: ['駅伝', '採点方式', 'ポイント表', '順位決定', 'シード権', 'ルール']
    },
    'privacy-policy': {
      title: 'プライバシーポリシー | 駅伝リザルト',
      description: '駅伝リザルトのプライバシーポリシー。個人情報の取り扱い、Cookie使用、アクセス解析について説明します。',
      keywords: ['プライバシーポリシー', '個人情報保護', 'Cookie', 'アクセス解析']
    },
    'contact': {
      title: 'お問い合わせ | 駅伝リザルト',
      description: '駅伝リザルトへのお問い合わせ。掲載情報の誤り、サイトに関するご意見・ご要望はこちらからお送りください。',
      keywords: ['お問い合わせ', '問い合わせ', 'コンタクト', 'フィードバック']
    },
    'disclaimer': {
      title: '免責事項 | 駅伝リザルト',
      description: '駅伝リザルトの免責事項。掲載情報の正確性、最新性に関する注意事項と免責規定について説明します。',
      keywords: ['免責事項', '注意事項', '利用規約', '著作権']
    },
    'operator-information': {
      title: '運営者情報 | 駅伝リザルト',
      description: '駅伝リザルトの運営者情報。サイト管理者、連絡先、運営方針について掲載しています。',
      keywords: ['運営者情報', 'サイト情報', '管理者', '運営会社']
    }
  }

  const metadata = metadataMap[pageType]

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `https://ekiden-results.com/information/${pageType}`,
    },
  }
}
