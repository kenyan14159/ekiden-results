import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('fujisan')

const sectionFeatures = [
  {
    num: "1区",
    distance: "4.1km",
    title: "浅間大社スタート",
    description: "富士山本宮浅間大社スタート。20mの上り下りがある市内周回で、短距離ながら主導権争いが激化。世界遺産の富士山本宮浅間大社の荘厳な雰囲気の中、各チームのスタートダッシュが繰り広げられます。",
  },
  {
    num: "2区",
    distance: "6.8km",
    title: "長い下り坂",
    description: "富士宮から富士市への高低差98mの長い下り。毎年3区への順位が勝負のポイントとなる戦略区間。ダウンヒルでスピードを活かせる選手が有利で、ここでの大きなリードが後半戦を有利に運びます。",
  },
  {
    num: "3区",
    distance: "3.3km",
    title: "平坦スピード区間",
    description: "ほぼ平坦なスピード区間。短距離ながら、次の4区への好位置でのリレーが重要。トラックスペシャリストが起用されやすく、スピード勝負が展開される区間です。",
  },
  {
    num: "4区",
    distance: "4.4km",
    title: "富士川の風",
    description: "ほぼ平坦だが、富士川河川敷の冬の風が選手を悩ませる自然との戦い。風向きによって体感タイムが大きく変わり、気象条件への対応力が問われる区間です。",
  },
  {
    num: "5区",
    distance: "10.5km",
    title: "エースの大舞台",
    description: "最長区間でエース区間。しらす街道、田子の浦港、吉原商店街を駆け抜ける多彩なコースレイアウト。各チームのエースが激突し、ここでの走りが優勝争いの行方を大きく左右します。",
  },
  {
    num: "6区",
    distance: "6.0km",
    title: "富士山ビューポイント",
    description: "田園地帯の直線コースが続く富士山撮影ビューポイント。絶景と疲労との両立が求められる。美しい富士山を背景に、各選手が疲労との戦いを繰り広げます。",
  },
  {
    num: "7区",
    distance: "8.3km",
    title: "女子最大の難関",
    description: "女子最大の難関区間。3km過ぎから4.6kmで169m上る驚異的な上り坂。ペース配分で大逆転劇が生まれる最終決戦場。この激坂を制した者だけが富士山女子駅伝の女王となれる、最も過酷で感動的なアンカー区間です。",
  },
]

export default function FujisanAboutPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '富士山女子駅伝', url: '/ekiden/fujisan' },
    { name: '大会概要', url: '/ekiden/fujisan/about' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link href="/ekiden/fujisan" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              富士山女子駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              富士山女子駅伝 区間特徴
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              富士山麓の過酷な高低差174m、7区間43.4km。女子大学駅伝最大の難関コース。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-purple-100 text-purple-800">
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

