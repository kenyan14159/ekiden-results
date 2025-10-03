import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekiden-results.com'

  // 各駅伝大会のURL
  const raceUrls = [
    '/ekiden/newyear',
    '/ekiden/newyear/about',
    '/ekiden/queens',
    '/ekiden/queens/about',
    '/ekiden/hakone',
    '/ekiden/hakone/about',
    '/ekiden/zenjitsu',
    '/ekiden/zenjitsu/about',
    '/ekiden/izumo',
    '/ekiden/izumo/about',
    '/ekiden/morinomiyako',
    '/ekiden/morinomiyako/about',
    '/ekiden/fujisan',
    '/ekiden/fujisan/about',
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

  // 年度別ページ（箱根駅伝の例 - 1920年から現在まで）
  const currentYear = new Date().getFullYear()
  const yearUrls: string[] = []
  
  // 箱根駅伝
  for (let year = 1920; year <= currentYear; year++) {
    if (![1944, 1945, 1946].includes(year)) {
      yearUrls.push(`/ekiden/hakone/${year}`)
    }
  }
  
  // ニューイヤー駅伝（1951年から）
  for (let year = 1951; year <= currentYear + 1; year++) {
    yearUrls.push(`/ekiden/newyear/${year}`)
  }
  
  // 全日本大学駅伝（1970年から）
  for (let year = 1970; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/zenjitsu/${year}`)
  }
  
  // クイーンズ駅伝（1981年から）
  for (let year = 1981; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/queens/${year}`)
  }

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
    ...yearUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...infoUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}

