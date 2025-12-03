import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { Metadata } from "next"
import { generateInfoPageMetadata } from "@/lib/metadata-utils"

export const metadata: Metadata = generateInfoPageMetadata('operator-information')

export default function OperatorInformationPage() {
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">運営者情報</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">サイト名</h2>
                <p className="text-gray-700 leading-relaxed">
                  駅伝リザルト
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">サイトURL</h2>
                <p className="text-gray-700 leading-relaxed">
                  https://ekiden-results.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">運営目的</h2>
                <p className="text-gray-700 leading-relaxed">
                  日本全国の駅伝大会の結果情報を、わかりやすく提供することを目的としています。実業団駅伝、大学駅伝、高校駅伝、中学駅伝など、幅広い駅伝大会の情報を網羅し、駅伝ファンの皆様に役立つ情報源となることを目指しています。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">運営者</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-semibold text-lg">ピーナッツ</p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      関東の某大学駅伝部に所属していました。箱根駅伝・全日本大学駅伝・関東ICに出場。<br />
                      5000m 13分台、10000m 29分台前半の自己ベスト。<br />
                      引退後も趣味でランニングを継続し、駅伝・陸上競技の魅力を伝えるため本サイトを運営。
                    </p>
                    
                    <p className="text-gray-600 text-sm">
                      ※プライバシー保護のため、詳細な個人情報は非公開としています。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
                <p className="text-gray-700 leading-relaxed">
                  サイトに関するご質問、ご意見、情報の訂正依頼等は、<Link href="/information/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</Link>よりご連絡ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">免責事項</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトで掲載している情報については、<Link href="/information/disclaimer" className="text-blue-600 hover:underline">免責事項</Link>をご確認ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">プライバシーポリシー</h2>
                <p className="text-gray-700 leading-relaxed">
                  個人情報の取り扱いについては、<Link href="/information/privacy-policy" className="text-blue-600 hover:underline">プライバシーポリシー</Link>をご確認ください。
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

