import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

export default function ScoringTablePage() {
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">スコアリングテーブル</h1>
            <p className="text-lg text-gray-600">各大会の採点基準表</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  現在、スコアリングテーブルのページを準備中です。
                  <br />
                  各駅伝大会の採点基準や記録評価システムについて、詳細な情報を提供予定です。
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">掲載予定の内容</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>大学駅伝のシード権獲得基準</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>区間賞・区間記録の評価基準</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>各大会の出場資格と選考基準</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>タイム換算表と記録評価</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ご要望について</h2>
                <p className="text-gray-700 leading-relaxed">
                  スコアリングテーブルに関してご要望やご質問がございましたら、<Link href="/information/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</Link>よりお気軽にご連絡ください。
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

