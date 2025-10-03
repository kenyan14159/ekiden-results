import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

const sectionFeatures = [
  {
    num: "1区",
    distance: "12.3km",
    title: "新春の1区",
    description: "前橋市県庁前から高崎市役所まで。国道17号線の片側3車線のフラットコースで集団走が基本となる。序盤の駆け引きと終盤の激しい上位争いが見どころ。新春の風物詩として、スタート直後の選手たちの駆け引きが始まり、フラットながらも油断できない展開が待ち受けます。",
  },
  {
    num: "2区",
    distance: "21.9km",
    title: "花の2区",
    description: "高崎から伊勢崎まで。エース級選手が集結し、昭和大橋周辺での仕掛けが勝負のポイント。緩やかな下り基調でスピードレースが展開される。全区間中2番目の長距離で、各チームのエースが激突する最も注目度の高い区間です。",
  },
  {
    num: "3区",
    distance: "15.3km",
    title: "変動の3区",
    description: "2025年大会より区間距離が100m延長。追い風が吹きやすく順位変動が激しい区間。境萩原周辺でのペースアップが鍵を握る。風向きによって展開が大きく変わり、ここで一気に順位を上げるチームも多い変化に富んだ区間です。",
  },
  {
    num: "4区",
    distance: "22.4km",
    title: "高速の4区",
    description: "全区間中最長区間で、外国人選手登録可能な唯一の区間。平坦基調だが距離の長さが選手を苦しめる激戦区。ここで大きくリードを奪うか、逆に追い上げるかがレースの行方を大きく左右します。世界トップクラスの外国人選手の爆走が見られる区間です。",
  },
  {
    num: "5区",
    distance: "15.8km",
    title: "逆転の5区",
    description: "太田から桐生への北上コース。松原橋周辺のアップダウンで脚が削られ、後続チームの逆転劇が頻発する「ドラマ区間」。平坦に見えて実は小刻みなアップダウンが続き、ここでの粘りが最終順位を決める重要なポイントとなります。",
  },
  {
    num: "6区",
    distance: "12.1km",
    title: "戦略の6区",
    description: "桐生から西久保まで。相生町付近の小刻みなアップダウンがペース配分を狂わせる。チーム戦術が色濃く出る区間。アンカーへどのような形で襷を渡すか、各チームの戦略が問われる重要な準アンカー区間です。",
  },
  {
    num: "7区",
    distance: "12.3km",
    title: "栄光の7区",
    description: "アンカー区間。平和大通りから城南通りを経由して県庁前フィニッシュまで。最後の直線で繰り広げられる激闘が感動を呼ぶ。ニューイヤー駅伝の栄冠を決める最終決戦で、各チームのアンカーが全てを懸けた走りを見せる感動のフィナーレです。",
  },
]

export default function NewyearAboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link
              href="/ekiden/newyear"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              ニューイヤー駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ニューイヤー駅伝 区間特徴
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              群馬県を舞台にした100km、7区間のお正月の風物詩。各区間の個性、戦術、注目ポイントを徹底解説します。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectionFeatures.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-blue-100 text-blue-800">
                  {section.num} ({section.distance})
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-gray-600 text-sm">
            <p>
              ※上記情報は一般的な特徴であり、大会状況により異なる場合があります。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
