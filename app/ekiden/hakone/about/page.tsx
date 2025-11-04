import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Breadcrumb } from "@/components/BreadcrumbStructuredData"
import Link from "next/link"
import { generateRaceAboutMetadata } from '@/lib/metadata-utils'

export const metadata = generateRaceAboutMetadata('hakone')

export default function HakoneAboutPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '箱根駅伝', url: '/ekiden/hakone' },
    { name: '大会概要', url: '/ekiden/hakone/about' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 pt-3 sm:pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        {/* ヘッダー */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
            <Link 
              href="/ekiden/hakone" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-xs sm:text-sm"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              箱根駅伝 歴代結果に戻る
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">箱根駅伝 区間特徴</h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2">箱根駅伝10区間の個性をこれでもかと味わい尽くす！</p>
            <p className="text-xs sm:text-sm text-gray-500">総合距離は217.1km、標高差800m超の激闘を経て決まる王者決定戦。区間ごとの"クセ"や"心理戦"、そしてドラマを詳細に解説します。</p>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* 往路セクション */}
            <section className="mb-10 sm:mb-16">
              <div className="bg-blue-50 border-l-4 border-blue-600 px-4 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900">往路（1区〜5区）</h2>
              </div>

              {/* 1区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">1区（21.3km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">序盤のパワーバランス調整人</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  東京大手町を飛び出し、多摩川沿いをひた走る序盤戦。前半はほぼ平坦で自分のペースを守りやすいものの、中盤の六郷橋（約17km）手前で息を呑む"激坂"ポイントが待ち受けています。ここで先頭集団が一気にギアを上げ、マインドゲームが始まるのです。勝負どころを見極め、脚を温存しつつ先手を取ったランナーだけが、後続にプレッシャーをかけることができる"心理戦区間"でもあります。1区の駆け引きが、その後の展開を大きく左右するキーポイントです。
                </p>
              </div>

              {/* 2区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">2区（23.1km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">花の2区の権太坂バトル</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  "花の2区"の異名を持ち、チームのエースや注目選手が顔を揃える超VIP待遇区間。10km地点の最初の急坂を越えると、13km付近で現れる権太坂という中ボス級の登りが待ち構えています。ここでの仕掛けが遅れると、後半の戸塚の壁（最後の3kmにかけての連続アップダウン）で痛い目を見ることに。後続のランナーを一気にゴボウ抜きする爆走劇や、逆にここで脚を使い果たして後退する"栄光と挫折のドラマ"が生まれやすい区間です。
                </p>
              </div>

              {/* 3区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">3区（21.4km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">絶景＆向かい風覚悟のフリーライド区間</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  箱根駅伝随一の"景観ラン"区間。前半9kmは下り基調で、スピードを乗せやすく、タイムを稼ぎやすいフリーライドゾーン。しかし後半は富士山と相模湾を右手に臨む絶景エリアに入ると、海風の影響をまともに受けるポイントが数か所あります。追い風なら最高ですが、強い向かい風に変わると、まるでシャワーを浴びるかのように体力が削られ、体感タイムが1.5倍になる恐怖区間です。走力だけでなく、風向きを読む戦略性も問われます。
                </p>
              </div>

              {/* 4区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">4区（20.9km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">"延長された平常心テスト"区間</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  2017年から約3km延長されたこのフラット最短区間は、一見イージーに見えて、実は最もメンタルの強さが問われる"平常心テスト"区間。延長部分の緩やかな上りは、一度ペースを崩すと集団復帰が難しく、先頭に出てでも自分のリズムを作るか、集団にしがみつくか、判断力が問われます。チーム戦術が色濃く出るため、区間途中での緻密な給水やピッチ調整が勝敗を分けます。
                </p>
              </div>

              {/* 5区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">5区（20.8km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">山上り＆ダウンヒルの心臓破り</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  往路の"キングメーカー"区間と呼べる急勾配ルート。スタート直後から標高874mの箱根関所跡まで長い上り坂が続き、16.2km地点の最高点で折り返すと、容赦ないダウンヒルがランナーの脚を逆撫でする構成です。上りで脚を使い切るか、急坂をゆっくりペースで刻むか、選手の戦略が極限まで試されます。箱根神社の大鳥居前では観客の声援に背中を押されるものの、勢い余って膝を痛めるリスクも。登りと下り、相反する脚づかいをこの1区間に詰め込んだ"心臓破り"の山場です。
                </p>
              </div>
            </section>

            {/* 復路セクション */}
            <section className="mb-10 sm:mb-16">
              <div className="bg-green-50 border-l-4 border-green-600 px-4 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900">復路（6区〜10区）</h2>
              </div>

              {/* 6区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">6区（20.8km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-green-600">スリリングな一気下り区間</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  復路スタート直後の小刻みな上り（約4km）をクリアすれば、後は一気に下るロングダウンヒル。急カーブやS字の連続は、足腰への衝撃と残り距離の疲労との壮絶なバランスゲーム。路面の曲がり角で膝に衝撃が走るたび、「イテテ…」と声を上げたくなるほどですが、ここで攻め切れるかどうかが、総合順位の行方を大きく左右します。早朝の冷気で体が硬直しやすい時間帯にも関わらず、高速で駆け下りる勇気が求められるスリリングな区間です。
                </p>
              </div>

              {/* 7区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">7区（21.3km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-green-600">気温ジェットコースター地帯</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  山間部の冷気と、下山につれて上がる気温の"二重苦"と戦うアップダウンコース。約9km付近から連続する小さな峠越えでは、心肺にショートパンチを浴び、脚に追い打ちをかけられます。復路特有のタイムプレッシャーの中、体温を上げすぎず、かつ冷えすぎない絶妙なペース配分が攻略の鍵。選手は時に上着を脱ぎ、時に腕まくりをしながら、気温のジェットコースターに翻弄されるのです。
                </p>
              </div>

              {/* 8区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">8区（21.4km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-green-600">追い風の罠＆体力消耗ルーレット</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  かつて"追い風恩恵区間"として知られた湘南新道ですが、実は"追い風の罠"とも呼ばれます。風速と選手のスピードが同じになると体感的に無風状態となり、発汗が止まらない"暑さ地獄"に陥ることも。約9km続く上り坂は、体温と疲労のダブルパンチで脚にボディーブローを浴びせます。この区間を笑顔で走り抜けた者だけが、復路後半の"逆転劇"への切符を手に入れられます。
                </p>
              </div>

              {/* 9区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    9
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">9区（23.1km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-green-600">大逆転を呼ぶドラマ区間</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  最長距離の区間記録保持区間。鶴見中継所を飛び出すとフラットな市街地、そしてラスト5kmでまた小さな丘越えが待ち受けます。ここでの"攻めるラン"と"守りの走り"の駆け引きはまさに大舞台。20分以上のビハインドを背負ったチームは「繰り上げスタート」の恐怖とも戦いながら、最後の望みをつなぐ鬼気迫る走りを披露します。優勝争いだけでなく、来年のシード権を賭けた激闘が展開されるまさに"ドラマ区間"です。
                </p>
              </div>

              {/* 10区 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl">
                    10
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-lg sm:text-xl font-bold text-gray-900 mb-1">10区（23.0km）</h3>
                    <p className="text-xs sm:text-sm font-medium text-green-600">歓声浴びてゴールへラストスパート</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  日本橋、京橋、銀座の華やかな都心を舞台にしたフィナーレ。沿道でスタンバイする大観衆の声援が選手の背中を包み込み、その興奮はラストスパートに火をつけます。気温が上昇する昼前の時間帯ながら、応援のエネルギーで酸素不足も吹き飛ぶほど。最後の直線では、襷をつないだチーム全員の思いが凝縮され、涙と歓喜のゴールシーンが生まれます。箱根駅伝の結末を飾るにふさわしい、感動のクライマックスです。
                </p>
              </div>
            </section>

            {/* まとめ */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">箱根駅伝の魅力</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                217.1kmに及ぶ長距離、標高差800m超の起伏、そして各区間に秘められた独自の"クセ"。箱根駅伝は単なる駅伝競走ではなく、戦略、メンタル、チームワーク、そして自然との戦いが凝縮された総合格闘技です。10区間それぞれが持つドラマを知ることで、箱根駅伝の観戦がさらに深く、楽しくなることでしょう。
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

