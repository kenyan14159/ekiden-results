import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('izumo')

const sectionFeatures = [
  {
    num: "1区",
    distance: "8.0km",
    title: "聖地スタート",
    description: "出雲大社正面鳥居前から出雲市役所まで。浜山公園のアップダウンが最初の仕掛け所となる聖地スタート区間。日本最古の神社の一つである出雲大社の荘厳な雰囲気の中、各チームのスピードランナーが序盤の主導権を争います。",
  },
  {
    num: "2区",
    distance: "5.8km",
    title: "スピード勝負",
    description: "最短区間でスピード自慢対決。平坦基調でトラック選手の投入が多い高速バトル区間。わずか5.8kmの中で順位が大きく変動する可能性があり、各チームのトラックスペシャリストが激突する見どころ満載の区間です。",
  },
  {
    num: "3区",
    distance: "8.5km",
    title: "風との戦い",
    description: "出雲平野を駆け抜ける風との戦い。強風時には体感タイムが大幅に変わる気象条件重要区間。平坦なコースながら、日本海からの風の影響を強く受けやすく、風向きによってレース展開が大きく変わる戦略的な区間です。",
  },
  {
    num: "4区",
    distance: "6.2km",
    title: "展開を左右する要",
    description: "田園空間を走る中盤の要。レース展開を左右する重要な位置づけの区間。ここでの走りが後半戦への布石となり、優勝争いやシード権争いの行方を大きく左右する重要なポジションです。",
  },
  {
    num: "5区",
    distance: "6.4km",
    title: "技術の5区",
    description: "「波のようなアップダウン」が連続する難所。ペース配分を誤ると一気に後退する技術区間。見た目以上に体力を消耗するアップダウンが続き、ここでの粘りが最終順位を決める鍵となります。",
  },
  {
    num: "6区",
    distance: "10.2km",
    title: "逆転のアンカー",
    description: "アンカー区間で過去13回の逆転優勝を記録。出雲ドームに向けた最後のドラマが待つ運命の区間。最長区間で、ここでの逆転劇が出雲駅伝の醍醐味。各チームのアンカーが全てを懸けた走りで感動のフィニッシュを目指します。",
  },
]

export default function IzumoAboutPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '出雲駅伝', url: '/ekiden/izumo' },
    { name: '大会概要', url: '/ekiden/izumo/about' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-green-50 via-white to-teal-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link href="/ekiden/izumo" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              出雲駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              出雲駅伝 区間特徴
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              島根県の「高速駅伝」45.1km、6区間。大学駅伝シーズンの開幕を告げる伝統の一戦。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-green-100 text-green-800">
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

