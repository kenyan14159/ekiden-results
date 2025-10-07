"use client"

import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Footer } from "@/components/Footer"
import dynamic from 'next/dynamic'

// 遅延ロードコンポーネント
// 【一時的に非表示】ブログ記事セクション - 準備ができたら以下のコメントを解除
// const LatestArticles = dynamic(() => import("@/components/blog/LatestArticles"), {
//   loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-16"></div>,
//   ssr: true
// })
const CorporateEkiden = dynamic(() => import("@/components/sections/CorporateEkiden").then(mod => ({ default: mod.CorporateEkiden })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
const UniversityEkiden = dynamic(() => import("@/components/sections/UniversityEkiden").then(mod => ({ default: mod.UniversityEkiden })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
const HighSchoolEkiden = dynamic(() => import("@/components/sections/HighSchoolEkiden").then(mod => ({ default: mod.HighSchoolEkiden })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
const JuniorHighEkiden = dynamic(() => import("@/components/sections/JuniorHighEkiden").then(mod => ({ default: mod.JuniorHighEkiden })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
const OtherEkiden = dynamic(() => import("@/components/sections/OtherEkiden").then(mod => ({ default: mod.OtherEkiden })), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})
const SiteInfo = dynamic(() => import("@/components/sections/SiteInfo").then(mod => ({ default: mod.SiteInfo })), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <Hero />
        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* 【一時的に非表示】新着ブログ記事セクション - 準備ができたら以下のコメントを解除 */}
          {/* <LatestArticles /> */}
          
          <CorporateEkiden />
          <UniversityEkiden />
          <HighSchoolEkiden />
          <JuniorHighEkiden />
          <OtherEkiden />
          <SiteInfo />
        </div>
      </main>
      <Footer />
    </div>
  )
}

