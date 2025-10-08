/**
 * 各大会の構造化データ (Event/SportsEvent Schema) を生成するヘルパー関数
 */

import type { EkidenData } from "@/types/ekiden"

// 大会の基本情報
const RACE_INFO: Record<
  string,
  {
    name: string
    organizerName: string
    organizerUrl?: string
    locationName: string
    locationAddress: string
    description: string
    typicalMonth: number // 開催月
  }
> = {
  hakone: {
    name: "箱根駅伝",
    organizerName: "関東学生陸上競技連盟",
    organizerUrl: "https://www.kgrr.org/",
    locationName: "東京都・神奈川県",
    locationAddress: "東京都千代田区〜神奈川県箱根町",
    description:
      "正式名称は「東京箱根間往復大学駅伝競走」。関東学連加盟大学のうち、予選会を通過した校と前年大会でシード権を獲得した校が出場する日本を代表する大学駅伝競走。",
    typicalMonth: 1, // 1月2-3日
  },
  newyear: {
    name: "ニューイヤー駅伝",
    organizerName: "日本実業団陸上競技連合",
    organizerUrl: "https://www.rikuren.or.jp/",
    locationName: "群馬県",
    locationAddress: "群馬県前橋市",
    description:
      "正式名称は「全日本実業団対抗駅伝競走大会」。日本の実業団チームNo.1を決める駅伝競走で、元日に群馬県で開催される。",
    typicalMonth: 1, // 1月1日
  },
  queens: {
    name: "クイーンズ駅伝",
    organizerName: "日本実業団陸上競技連合",
    organizerUrl: "https://www.rikuren.or.jp/",
    locationName: "宮城県",
    locationAddress: "宮城県仙台市",
    description:
      "正式名称は「全日本実業団対抗女子駅伝競走大会」。日本の女子実業団チームNo.1を決める駅伝競走。",
    typicalMonth: 11, // 11月
  },
  zenjitsu: {
    name: "全日本大学駅伝",
    organizerName: "日本学生陸上競技連合",
    locationName: "愛知県",
    locationAddress: "愛知県名古屋市〜三重県伊勢市",
    description:
      "正式名称は「全日本大学駅伝対抗選手権大会」。出雲駅伝、箱根駅伝とともに大学三大駅伝の一つ。",
    typicalMonth: 11, // 11月
  },
  izumo: {
    name: "出雲駅伝",
    organizerName: "出雲市・出雲市体育協会・日本学生陸上競技連合",
    locationName: "島根県出雲市",
    locationAddress: "島根県出雲市",
    description:
      "正式名称は「出雲全日本大学選抜駅伝競走」。全日本大学駅伝、箱根駅伝とともに大学三大駅伝の一つ。",
    typicalMonth: 10, // 10月
  },
  fujisan: {
    name: "富士山女子駅伝",
    organizerName: "日本学生陸上競技連合",
    locationName: "静岡県",
    locationAddress: "静岡県富士市",
    description:
      "正式名称は「全日本大学女子駅伝対抗選手権大会」。大学女子駅伝の日本一を決める大会。",
    typicalMonth: 12, // 12月
  },
  morinomiyako: {
    name: "全国女子駅伝",
    organizerName: "日本陸上競技連盟・京都府・京都市・京都陸上競技協会",
    locationName: "京都府京都市",
    locationAddress: "京都府京都市",
    description:
      "正式名称は「全国都道府県対抗女子駅伝競走大会」。都道府県対抗で行われる女子駅伝。",
    typicalMonth: 1, // 1月
  },
  "miyakooji-men": {
    name: "全国男子駅伝",
    organizerName: "日本陸上競技連盟・広島県・広島市・中国新聞社",
    locationName: "広島県広島市",
    locationAddress: "広島県広島市",
    description:
      "正式名称は「天皇盃 全国都道府県対抗男子駅伝競走大会」。都道府県対抗で行われる男子駅伝。",
    typicalMonth: 1, // 1月
  },
  "miyakooji-women": {
    name: "全国女子駅伝",
    organizerName: "日本陸上競技連盟・京都府・京都市・京都陸上競技協会",
    locationName: "京都府京都市",
    locationAddress: "京都府京都市",
    description:
      "正式名称は「皇后盃 全国都道府県対抗女子駅伝競走大会」。都道府県対抗で行われる女子駅伝。",
    typicalMonth: 1, // 1月
  },
  hiroshima: {
    name: "ひろしま男子駅伝",
    organizerName: "広島県・広島市・中国新聞社",
    locationName: "広島県広島市",
    locationAddress: "広島県広島市",
    description:
      "国際・実業団・大学・高校の選抜チームが出場する新春の男子駅伝大会。",
    typicalMonth: 1, // 1月
  },
  "prefecture-women": {
    name: "全国都道府県対抗女子駅伝",
    organizerName: "日本陸上競技連盟・京都府・京都市・京都陸上競技協会",
    locationName: "京都府京都市",
    locationAddress: "京都府京都市",
    description:
      "都道府県対抗で行われる女子駅伝。中学生から社会人まで幅広い世代が参加。",
    typicalMonth: 1, // 1月
  },
  "junior-high-men": {
    name: "全国中学校駅伝男子",
    organizerName: "日本中学校体育連盟",
    locationName: "滋賀県",
    locationAddress: "滋賀県野洲市",
    description: "全国の中学校男子チームによる駅伝競走大会。",
    typicalMonth: 12, // 12月
  },
  "junior-high-women": {
    name: "全国中学校駅伝女子",
    organizerName: "日本中学校体育連盟",
    locationName: "滋賀県",
    locationAddress: "滋賀県野洲市",
    description: "全国の中学校女子チームによる駅伝競走大会。",
    typicalMonth: 12, // 12月
  },
}

/**
 * 年度と月から開催日を推定
 */
function estimateEventDate(year: number, month: number): string {
  // 箱根駅伝は1月2-3日
  if (month === 1 && year > 2000) {
    return `${year}-01-02`
  }
  // その他は月の初旬と仮定
  return `${year}-${String(month).padStart(2, "0")}-01`
}

/**
 * 大会の構造化データを生成
 */
export function generateEventStructuredData(
  raceSlug: string,
  year: string,
  result?: EkidenData
) {
  const raceInfo = RACE_INFO[raceSlug]
  if (!raceInfo) return null

  const yearNum = parseInt(year)
  const eventDate = estimateEventDate(yearNum, raceInfo.typicalMonth)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${year}年 ${raceInfo.name}`,
    description: raceInfo.description,
    startDate: eventDate,
    location: {
      "@type": "Place",
      name: raceInfo.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: raceInfo.locationAddress,
        addressCountry: "JP",
      },
    },
    organizer: {
      "@type": "Organization",
      name: raceInfo.organizerName,
      ...(raceInfo.organizerUrl && { url: raceInfo.organizerUrl }),
    },
    ...(result && result.teams && result.teams.length > 0 && {
      competitor: result.teams.slice(0, 10).map((team: any, index: number) => ({
        "@type": "SportsTeam",
        name: team.name || team,
        ...(index < 3 && {
          award: index === 0 ? "優勝" : index === 1 ? "準優勝" : "3位",
        }),
      })),
    }),
    url: `https://ekiden-results.com/ekiden/${raceSlug}/${year}`,
    sport: "駅伝競走",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "ja",
    isAccessibleForFree: true,
  }

  return structuredData
}

/**
 * 構造化データコンポーネント用のJSONを生成
 */
export function EventStructuredDataScript({
  raceSlug,
  year,
  result,
}: {
  raceSlug: string
  year: string
  result?: EkidenData
}) {
  const structuredData = generateEventStructuredData(raceSlug, year, result)

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

/**
 * 大会一覧ページ用の構造化データ (ItemList Schema)
 */
export function generateRaceListStructuredData(
  raceSlug: string,
  years: number[]
) {
  const raceInfo = RACE_INFO[raceSlug]
  if (!raceInfo) return null

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${raceInfo.name} 歴代結果一覧`,
    description: `${raceInfo.name}の歴代大会結果の一覧ページ`,
    url: `https://ekiden-results.com/ekiden/${raceSlug}`,
    numberOfItems: years.length,
    itemListElement: years.slice(0, 50).map((year, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SportsEvent",
        name: `${year}年 ${raceInfo.name}`,
        url: `https://ekiden-results.com/ekiden/${raceSlug}/${year}`,
      },
    })),
  }

  return structuredData
}

/**
 * 大会一覧ページ用の構造化データコンポーネント
 */
export function RaceListStructuredDataScript({
  raceSlug,
  years,
}: {
  raceSlug: string
  years: number[]
}) {
  const structuredData = generateRaceListStructuredData(raceSlug, years)

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
