import { Metadata } from "next"
import { getEkidenById } from "@/lib/ekiden-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const race = getEkidenById(params.id)

  if (!race) {
    return {
      title: "ページが見つかりません | 駅伝リザルト",
    }
  }

  return {
    title: `${race.name} | 駅伝リザルト`,
    description: `${race.subtitle} - ${race.description}`,
    keywords: ["駅伝", race.name, race.subtitle, "結果", "速報", "記録"],
    openGraph: {
      title: `${race.name} | 駅伝リザルト`,
      description: `${race.subtitle} - ${race.description}`,
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `${race.name} | 駅伝リザルト`,
      description: `${race.subtitle} - ${race.description}`,
    },
    alternates: {
      canonical: `https://ekiden-results.com${race.url}`,
    },
  }
}

export default function EkidenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

