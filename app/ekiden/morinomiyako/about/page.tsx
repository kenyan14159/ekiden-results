import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('morinomiyako')

const sectionFeatures = [
  {
    num: "1区",
    distance: "6.6km",
    title: "レースの流れを作る",
    description: "仙台市陸上競技場スタート。レース全体の流れを左右する重要区間で、比較的平坦ながら仕掛け上手な選手が揃う。大学女子駅伝の頂点を目指す戦いの序盤で、各チームの戦略が問われる重要なスタート区間です。",
  },
  {
    num: "2区",
    distance: "4.2km",
    title: "スピード自慢の競演",
    description: "全6区間最短区間。各校のスピード自慢が集結し、トラック実績豊富な選手の投入が多い。短い距離の中で順位が大きく変動する可能性があり、スピードランナーの真価が問われる区間です。",
  },
  {
    num: "3区",
    distance: "5.8km",
    title: "仙台の景観美",
    description: "市中心部を駆け抜け、広瀬橋での仙台らしい景観が美しい。レースが一気に白熱化する転換点。美しい街並みの中、ここから優勝争いが本格化し、各チームのエース級選手が激突します。",
  },
  {
    num: "4区",
    distance: "4.8km",
    title: "エース区間への布石",
    description: "緩やかなアップダウンと風向き変化に対応が必要。エース区間5区への好位置リレーが鍵。ここでの走りが次のエース区間での戦いを有利に進められるかどうかを左右する重要な区間です。",
  },
  {
    num: "5区",
    distance: "9.2km",
    title: "花の5区",
    description: "「花の5区」最長区間。仙台城跡周辺の長い上りと定禅寺通りを走るエース区間で大逆転も可能。各チームのエースが激突し、ここでの走りが優勝争いの行方を大きく左右する最も注目される区間です。",
  },
  {
    num: "6区",
    distance: "6.7km",
    title: "最終決戦",
    description: "アンカー区間。愛宕上杉通りから仙台駅横を抜けて競技場フィニッシュ。2番目の長距離で最終逆転に期待。大学女子駅伝の頂点を決める最終決戦で、各チームのアンカーが全てを懸けた走りを見せる感動のフィナーレです。",
  },
]

export default function MorinomiyakoAboutPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '杜の都駅伝', url: '/ekiden/morinomiyako' },
    { name: '大会概要', url: '/ekiden/morinomiyako/about' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link href="/ekiden/morinomiyako" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              杜の都駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              杜の都駅伝 区間特徴
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              仙台市内38.0km、6区間の大学女子ナンバーワン決定戦。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-emerald-100 text-emerald-800">
                  {section.num} ({section.distance})
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{section.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-gray-600 text-sm">
            <p>※上記情報は一般的な特徴であり、大会状況により異なる場合があります。</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

