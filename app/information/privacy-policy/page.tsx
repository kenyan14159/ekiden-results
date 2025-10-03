import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
            <p className="text-sm text-gray-500">最終更新日: 2025年1月</p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">個人情報の取り扱いについて</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトでは、お問い合わせフォームから送信された個人情報（氏名、メールアドレス等）については、適切に管理し、第三者への開示・提供は一切行いません。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">アクセス解析ツールについて</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用しています。これらのツールはCookieを使用して、個人を特定する情報を含まない形で統計データを収集しています。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">広告配信について</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトでは、第三者配信の広告サービス（Google AdSense等）を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">免責事項</h2>
                <p className="text-gray-700 leading-relaxed">
                  当サイトで掲載している情報の正確性については万全を期しておりますが、その内容について保証するものではありません。詳細は免責事項のページをご確認ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
                <p className="text-gray-700 leading-relaxed">
                  プライバシーポリシーに関するご質問は、<Link href="/information/contact" className="text-blue-600 hover:underline">お問い合わせフォーム</Link>よりご連絡ください。
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

