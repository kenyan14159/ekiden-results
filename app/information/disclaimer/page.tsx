import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">免責事項</h1>
            <p className="text-sm text-gray-500">最終更新日: 2025年1月</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">当サイトの情報について</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  当サイトで掲載している駅伝大会の結果やデータは、公式発表や信頼できる情報源を基に作成していますが、その正確性、完全性、有用性について保証するものではありません。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  情報の利用により生じた損害等については、当サイトは一切の責任を負いかねますので、あらかじめご了承ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">リンク先について</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">著作権について</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトに掲載されているコンテンツ（文章、画像、データ等）の著作権は当サイトまたはその権利者に帰属します。無断での転載・複製を禁止します。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">データの訂正について</h2>
                <p className="text-gray-700 leading-relaxed">
                  掲載情報に誤りを発見された場合は、<Link href="/information/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</Link>よりご連絡いただけますと幸いです。確認の上、必要に応じて訂正させていただきます。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">免責事項の変更</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトは、予告なく本免責事項の内容を変更することがあります。変更後の免責事項は、当サイトに掲載した時点で効力を生じるものとします。
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

