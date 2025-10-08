import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('zenjitsu')

const sectionFeatures = [
  {
    num: "1区",
    distance: "9.5km",
    title: "序盤のスピードバトル",
    description: "熱田神宮西門前から名古屋市港区藤前まで。スタート直後から名古屋港エリアの小刻みなアップダウンが連続し、「序盤から飛ばしすぎると後半失速」のジレンマを突きつける。橋梁が多く風の影響も受けやすいため、スピードランナー同士の駆け引きが白熱。区間記録はピーター・ワンジル（大東文化大）が26分58秒で叩き出した驚異のペース（1km＝2分50秒）。",
  },
  {
    num: "2区",
    distance: "11.1km",
    title: "ごぼう抜き区間",
    description: "港区藤前から桑名市長島町まで。三重県入りしてからの序盤は平坦だが、中盤の日光川大橋、終盤の木曽川大橋という２つの大きなアップダウンが牙を剥く。過去には一気に13人抜き、17人抜きが飛び出す「ごぼう抜き区間」として名を馳せ、追い風時の爆走劇はまさに圧巻。",
  },
  {
    num: "3区",
    distance: "11.9km",
    title: "風との戦い",
    description: "桑名市長島町から四日市市羽津まで。工場群の煙突を右手に見て走ると、四日市港特有の潮風が選手を迎える。微妙な平坦路だが、海沿い特有の突風や向かい風に翻弄されやすく、風向きを読むランナーがタイムを稼ぐ鍵を握る。",
  },
  {
    num: "4区",
    distance: "11.8km",
    title: "勝負どころ見極め区間",
    description: "四日市市羽津から鈴鹿市林崎町まで。近年は区間配置や距離変更の影響で、高速ランナーだけでなくタフな選手も求められるレイアウトに変化。鈴鹿サーキットを彷彿とさせる直線と小刻みな起伏が続き、「勝負どころ」をいかに見極めるかがポイント。",
  },
  {
    num: "5区",
    distance: "12.4km",
    title: "暑さ対策区間",
    description: "鈴鹿市林崎町から津市河芸町まで。距離中盤以降の下り基調でタイムを稼ぎたいところだが、晴天時には気温が急上昇しやすく、熱中症リスクも無視できない。服装と給水タイミングの見極めが勝敗を分ける「暑さ対策区間」。",
  },
  {
    num: "6区",
    distance: "12.8km",
    title: "平地の難所",
    description: "津市河芸町から津市藤方まで。第５区に続く津市内区間。市街地の平坦路ながら折り返し地点を含む度重なるコーナーでペースダウンを強いられ、ジワジワと体力を削られる難所。「平地だからこそ油断禁物」の典型で、戦略性が問われる。",
  },
  {
    num: "7区",
    distance: "17.6km",
    title: "シード権の攻防",
    description: "津市藤方から松阪市豊原町まで。８区間中２番目の長丁場。平坦基調ながら、ラスト1kmの新生橋を越える上りが「ラストチャンスのボス」となる。シード権や優勝を狙うチームは、この長距離区間でリードを奪うか、逆にここで粘って他校との差を縮めるかの駆け引きが熱い。",
  },
  {
    num: "8区",
    distance: "19.7km",
    title: "栄光のアンカー",
    description: "松阪市豊原町から伊勢神宮内宮宇治橋前まで。最長かつアンカー区間。中間のJR参宮線高架越えから16km過ぎの皇學館大学前の上り坂まで、勝負所が目白押し。フィニッシュ直前の上りを制した者だけが栄光のゴールテープを切り、山梨学院大・モグスが2007年に樹立した区間記録55分32秒（1km＝2分49秒）はいまだ破られず、伝説となっている。",
  },
]

export default function ZenjitsuAboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link
              href="/ekiden/zenjitsu"
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
              全日本大学駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              全日本大学駅伝 区間特徴
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              距離106.8km、名古屋・熱田神宮から伊勢神宮までを襷でつなぐ大学駅伝日本一決定戦。序盤のスピードバトルから中盤のごぼう抜き劇、後半のスタミナ戦まで、８区間それぞれがドラマにあふれる！
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
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-cyan-100 text-cyan-800">
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
