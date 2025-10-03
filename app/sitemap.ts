import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekiden-results.com'
  
  // 各駅伝大会のURL
  const raceUrls = [
    '/ekiden/newyear',
    '/ekiden/queens',
    '/ekiden/hakone',
    '/ekiden/hakone/about',
    '/ekiden/zenjitsu',
    '/ekiden/izumo',
    '/ekiden/morinomiyako',
    '/ekiden/fujisan',
    '/ekiden/miyakooji-men',
    '/ekiden/miyakooji-women',
    '/ekiden/junior-high-men',
    '/ekiden/junior-high-women',
    '/ekiden/hiroshima',
    '/ekiden/prefecture-women',
  ]

  // サイト情報ページ
  const infoUrls = [
    '/information/scoring-table',
    '/information/privacy-policy',
    '/information/contact',
    '/information/disclaimer',
    '/information/operator-information',
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...raceUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...infoUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}

