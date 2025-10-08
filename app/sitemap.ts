import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekiden-results.com'
  const currentDate = new Date()

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

  // 年度別ページ
  const currentYear = new Date().getFullYear()
  const yearUrls: string[] = []
  
  // 箱根駅伝（1920年から、1944-1946年は中止）
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
  
  // 出雲駅伝（1989年から）
  for (let year = 1989; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/izumo/${year}`)
  }
  
  // 富士山女子駅伝（2006年から）
  for (let year = 2006; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/fujisan/${year}`)
  }
  
  // 杜の都駅伝（1983年から）
  for (let year = 1983; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/morinomiyako/${year}`)
  }
  
  // 都大路 男子（1950年から）
  for (let year = 1950; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/miyakooji-men/${year}`)
  }
  
  // 都大路 女子（1989年から）
  for (let year = 1989; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/miyakooji-women/${year}`)
  }
  
  // ひろしま駅伝（1996年から）
  for (let year = 1996; year <= currentYear + 1; year++) {
    yearUrls.push(`/ekiden/hiroshima/${year}`)
  }
  
  // 都道府県対抗女子駅伝（1983年から）
  for (let year = 1983; year <= currentYear + 1; year++) {
    yearUrls.push(`/ekiden/prefecture-women/${year}`)
  }
  
  // 全中男子駅伝（1993年から）
  for (let year = 1993; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/junior-high-men/${year}`)
  }
  
  // 全中女子駅伝（1993年から）
  for (let year = 1993; year <= currentYear; year++) {
    yearUrls.push(`/ekiden/junior-high-women/${year}`)
  }

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...raceUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...yearUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...infoUrls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}


