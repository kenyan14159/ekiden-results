import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { year: string } 
}): Promise<Metadata> {
  const year = params.year
  
  // データを取得して優勝校を特定
  let winner = ''
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/data/university/hakone/${year}.json`, {
      cache: 'force-cache'
    })
    if (response.ok) {
      const data = await response.json()
      const topTeam = data.teams?.find((t: any) => t.rank === 1)
      winner = topTeam ? topTeam.name : ''
    }
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
  }

  const title = `箱根駅伝 ${year}年 第${getHakoneCount(parseInt(year))}回大会 結果${winner ? ` - ${winner}優勝` : ''}`
  const description = `箱根駅伝 ${year}年（第${getHakoneCount(parseInt(year))}回大会）の詳細な結果。${winner ? `優勝は${winner}。` : ''}チーム別成績、区間別成績、選手別記録、統計データを網羅的に掲載。往路・復路のタイム、区間賞、区間新記録も完全収録。`

  return {
    title,
    description,
    keywords: [
      '箱根駅伝',
      `箱根駅伝${year}`,
      `第${getHakoneCount(parseInt(year))}回箱根駅伝`,
      winner,
      '箱根駅伝結果',
      '箱根駅伝成績',
      '区間記録',
      '往路',
      '復路',
      '大学駅伝'
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: `${year}-01-02T08:00:00+09:00`,
      authors: ['駅伝リザルト'],
      url: `https://ekiden-results.com/ekiden/hakone/${year}`,
      images: [
        {
          url: `https://ekiden-results.com/og-images/hakone-${year}.png`,
          width: 1200,
          height: 630,
          alt: `箱根駅伝 ${year}年 結果`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://ekiden-results.com/og-images/hakone-${year}.png`],
    },
    alternates: {
      canonical: `https://ekiden-results.com/ekiden/hakone/${year}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

function getHakoneCount(year: number): number {
  // 1920年が第1回、中止年を考慮
  const canceledYears = [1944, 1945, 1946]
  let count = year - 1920 + 1
  
  for (const canceledYear of canceledYears) {
    if (year > canceledYear) {
      count--
    }
  }
  
  return count
}

