export interface EkidenRace {
  id: string
  name: string
  subtitle: string
  description: string
  category: string
  url: string
}

export const ekidenRaces: EkidenRace[] = [
  // 実業団駅伝
  {
    id: "new-year",
    name: "ニューイヤー駅伝",
    subtitle: "全日本実業団対抗駅伝競走大会",
    description: "群馬県で開催される男子実業団駅伝の最高峰",
    category: "corporate",
    url: "/ekiden/new-year",
  },
  {
    id: "queens",
    name: "クイーンズ駅伝",
    subtitle: "全日本実業団対抗女子駅伝競走大会",
    description: "宮城県で開催される女子実業団駅伝の最高峰",
    category: "corporate",
    url: "/ekiden/queens",
  },
  // 大学駅伝
  {
    id: "hakone",
    name: "箱根駅伝",
    subtitle: "東京箱根間往復大学駅伝競走",
    description: "関東の大学による新春の風物詩",
    category: "university",
    url: "/ekiden/hakone",
  },
  {
    id: "zenjitsu",
    name: "全日本大学駅伝",
    subtitle: "全日本大学駅伝対抗選手権大会",
    description: "名古屋〜伊勢間を走る学生駅伝日本一決定戦",
    category: "university",
    url: "/ekiden/zenjitsu",
  },
  {
    id: "izumo",
    name: "出雲駅伝",
    subtitle: "出雲全日本大学選抜駅伝競走",
    description: "大学駅伝シーズンの開幕を告げる大会",
    category: "university",
    url: "/ekiden/izumo",
  },
  {
    id: "morinomiyako",
    name: "杜の都駅伝",
    subtitle: "全日本大学女子駅伝対抗選手権",
    description: "女子大学駅伝日本一を決める大会",
    category: "university",
    url: "/ekiden/morinomiyako",
  },
  {
    id: "fujisan",
    name: "富士山駅伝",
    subtitle: "富士山女子駅伝",
    description: "静岡県で開催される女子大学駅伝",
    category: "university",
    url: "/ekiden/fujisan",
  },
  // 高校駅伝
  {
    id: "miyakooji-men",
    name: "都大路 男子",
    subtitle: "全国高等学校駅伝競走大会 男子",
    description: "京都で開催される高校男子駅伝の全国大会",
    category: "high-school",
    url: "/ekiden/miyakooji-men",
  },
  {
    id: "miyakooji-women",
    name: "都大路 女子",
    subtitle: "全国高等学校駅伝競走大会 女子",
    description: "京都で開催される高校女子駅伝の全国大会",
    category: "high-school",
    url: "/ekiden/miyakooji-women",
  },
  // 中学駅伝
  {
    id: "junior-high-men",
    name: "全国中学男子駅伝",
    subtitle: "全国中学校駅伝大会 男子",
    description: "全国の中学校男子による駅伝日本一決定戦",
    category: "junior-high",
    url: "/ekiden/junior-high-men",
  },
  {
    id: "junior-high-women",
    name: "全国中学女子駅伝",
    subtitle: "全国中学校駅伝大会 女子",
    description: "全国の中学校女子による駅伝日本一決定戦",
    category: "junior-high",
    url: "/ekiden/junior-high-women",
  },
  // その他
  {
    id: "hiroshima",
    name: "ひろしま駅伝",
    subtitle: "ひろしま男子駅伝",
    description: "広島県内の市町対抗駅伝競走大会",
    category: "other",
    url: "/ekiden/hiroshima",
  },
  {
    id: "prefecture-women",
    name: "都道府県対抗女子駅伝",
    subtitle: "皇后盃全国都道府県対抗女子駅伝競走大会",
    description: "京都で開催される都道府県対抗の女子駅伝",
    category: "other",
    url: "/ekiden/prefecture-women",
  },
]

export function getEkidenById(id: string): EkidenRace | undefined {
  return ekidenRaces.find((race) => race.id === id)
}

export function getEkidenByCategory(category: string): EkidenRace[] {
  return ekidenRaces.filter((race) => race.category === category)
}

