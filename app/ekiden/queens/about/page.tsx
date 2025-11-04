import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('queens')

const sectionFeatures = [
  {
    num: "1区",
    distance: "7.0km",
    title: "松島からのスタート",
    description: "松島町文化観光交流館前から塩竈市地域活動支援センター前まで。日本三景・松島をバックに各チームの主導権争いが展開される。美しい景色の中、レース全体の流れを決める重要な序盤戦。各チームのスピードランナーが激突します。",
  },
  {
    num: "2区",
    distance: "4.2km",
    title: "短距離高速バトル",
    description: "塩竈市内の短距離高速区間。スピード自慢の選手が集結し、トラック経験豊富な選手が多数投入される激戦区。わずか4.2kmの中で順位が大きく入れ替わる可能性がある、目が離せない区間です。",
  },
  {
    num: "3区",
    distance: "10.6km",
    title: "エースの激突",
    description: "最長区間でエース区間。富士化学工業前まで続く長丁場で、各チームの主力選手による壮絶なバトルが繰り広げられる。ここでの走りが優勝争いやシード権争いを大きく左右する、クイーンズ駅伝のハイライト区間です。",
  },
  {
    num: "4区",
    distance: "3.6km",
    title: "逆転のチャンス",
    description: "短距離スピード区間。外国人選手の投入も可能で、順位の大幅変動が期待される区間。わずかな距離ながらも、ここで一気に順位を上げるチームも多く、レース展開を大きく変える可能性を秘めています。",
  },
  {
    num: "5区",
    distance: "10.0km",
    title: "過酷の5区",
    description: "「過酷の5区」と呼ばれる高低差激しい難所。広瀬川の河岸段丘を上下する約8.5mのアップダウンが選手を苦しめる。平坦に見えて実は体力を削られる難関区間で、ここでの粘りが最終順位を決める鍵となります。",
  },
  {
    num: "6区",
    distance: "6.795km",
    title: "運命のアンカー",
    description: "「運命の6区」アンカー区間。定禅寺通りを通って仙台市陸上競技場でフィニッシュ。最後まで勝負の行方がわからない展開が魅力。各チームのアンカーが全てを懸けた走りで、クイーンズ駅伝の女王が決まる感動のフィナーレです。",
  },
]

export default function QueensAboutPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'クイーンズ駅伝', url: '/ekiden/queens' },
    { name: '大会概要', url: '/ekiden/queens/about' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 pt-3 sm:pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 border-b">
          <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
            <Link
              href="/ekiden/queens"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-xs sm:text-sm"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              クイーンズ駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              クイーンズ駅伝 区間特徴
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
              宮城県の松島から仙台まで42.195kmのフルマラソン駅伝。実業団女子日本一を決める戦い。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-pink-100 text-pink-800">
                  {section.num} ({section.distance})
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
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

