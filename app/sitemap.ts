import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// 大会IDとデータディレクトリのマッピング
const RACE_DATA_MAP = [
  { id: 'hakone', dir: 'university/hakone' },
  { id: 'zenjitsu', dir: 'university/all-japan' },
  { id: 'izumo', dir: 'university/izumo' },
  { id: 'morinomiyako', dir: 'university/morinomiyako' },
  { id: 'fujisan', dir: 'university/fujisan' },
  { id: 'mixed-gender', dir: 'university/mixed-gender' },
  { id: 'newyear', dir: 'corporate/newyear' },
  { id: 'queens', dir: 'corporate/queens' },
  { id: 'miyakooji-men', dir: 'highschool/boys' },
  { id: 'miyakooji-women', dir: 'highschool/girls' },
  { id: 'junior-high-men', dir: 'junior-high/boys' },
  { id: 'junior-high-women', dir: 'junior-high/girls' },
  { id: 'hiroshima', dir: 'prefectures/boys' },
  { id: 'prefecture-women', dir: 'prefectures/girls' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekiden-results.com'
  const currentDate = new Date()

  // 固定ページ
  const staticUrls = [
    '',
    '/information/scoring-table',
    '/information/privacy-policy',
    '/information/contact',
    '/information/disclaimer',
    '/information/operator-information',
  ]

  // 各大会のトップページとAboutページ
  const raceUrls = RACE_DATA_MAP.flatMap(race => [
    `/ekiden/${race.id}`,
    `/ekiden/${race.id}/about`,
  ])

  // データファイルから生成する年度別URL
  const yearUrls: MetadataRoute.Sitemap = []
  const dataBaseDir = path.join(process.cwd(), 'data')

  for (const race of RACE_DATA_MAP) {
    try {
      const dirPath = path.join(dataBaseDir, race.dir)
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            const year = file.replace('.json', '')
            const filePath = path.join(dirPath, file)
            const stats = fs.statSync(filePath)
            
            yearUrls.push({
              url: `${baseUrl}/ekiden/${race.id}/${year}`,
              lastModified: stats.mtime, // ファイルの最終更新日時を使用
              changeFrequency: 'yearly',
              priority: 0.7,
            })
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory for ${race.id}:`, error)
    }
  }

  return [
    ...staticUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: currentDate,
      changeFrequency: url === '' ? 'daily' as const : 'monthly' as const,
      priority: url === '' ? 1.0 : 0.5,
    })),
    ...raceUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...yearUrls,
  ]
}
