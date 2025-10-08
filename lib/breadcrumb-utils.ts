// 駅伝大会名マッピングデータ
// パンくずリストやナビゲーションで使用する正式な大会名

export const RACE_NAMES: Record<string, string> = {
  hakone: '箱根駅伝',
  newyear: 'ニューイヤー駅伝',
  queens: 'クイーンズ駅伝',
  izumo: '出雲駅伝',
  zenjitsu: '全日本大学駅伝',
  fujisan: '富士山女子駅伝',
  morinomiyako: '杜の都駅伝',
  'miyakooji-men': '都大路(男子)',
  'miyakooji-women': '都大路(女子)',
  hiroshima: 'ひろしま駅伝',
  'prefecture-women': '都道府県対抗女子駅伝',
  'junior-high-men': '全中男子駅伝',
  'junior-high-women': '全中女子駅伝',
  'mixed-gender': '混成駅伝',
}

export const RACE_PATHS: Record<string, string> = {
  hakone: '/ekiden/hakone',
  newyear: '/ekiden/newyear',
  queens: '/ekiden/queens',
  izumo: '/ekiden/izumo',
  zenjitsu: '/ekiden/zenjitsu',
  fujisan: '/ekiden/fujisan',
  morinomiyako: '/ekiden/morinomiyako',
  'miyakooji-men': '/ekiden/miyakooji-men',
  'miyakooji-women': '/ekiden/miyakooji-women',
  hiroshima: '/ekiden/hiroshima',
  'prefecture-women': '/ekiden/prefecture-women',
  'junior-high-men': '/ekiden/junior-high-men',
  'junior-high-women': '/ekiden/junior-high-women',
  'mixed-gender': '/ekiden/mixed-gender',
}

// パンくずリストアイテム生成ヘルパー関数
export function generateBreadcrumbItems(raceKey: string, year?: number | string) {
  const raceName = RACE_NAMES[raceKey]
  const racePath = RACE_PATHS[raceKey]

  if (!raceName || !racePath) {
    throw new Error(`Invalid race key: ${raceKey}`)
  }

  const items = [
    { name: 'ホーム', url: '/' },
    { name: raceName, url: racePath },
  ]

  if (year) {
    items.push({
      name: `${year}年`,
      url: `${racePath}/${year}`,
    })
  }

  return items
}

// 大会概要ページ用のパンくずリスト生成
export function generateAboutBreadcrumbItems(raceKey: string) {
  const raceName = RACE_NAMES[raceKey]
  const racePath = RACE_PATHS[raceKey]

  if (!raceName || !racePath) {
    throw new Error(`Invalid race key: ${raceKey}`)
  }

  return [
    { name: 'ホーム', url: '/' },
    { name: raceName, url: racePath },
    { name: '大会概要', url: `${racePath}/about` },
  ]
}
