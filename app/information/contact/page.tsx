import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

export default function ContactPage() {
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
            <p className="text-lg text-gray-600">
              サイトに関するご質問、ご意見、情報の訂正依頼等がございましたら、
              <br className="hidden md:block" />
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせフォーム</h2>

              <form action="https://formspree.io/f/mvgrvzal" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="一般的なお問い合わせ">一般的なお問い合わせ</option>
                    <option value="情報の訂正依頼">情報の訂正依頼</option>
                    <option value="技術的な問題">技術的な問題</option>
                    <option value="ご意見・ご要望">ご意見・ご要望</option>
                    <option value="掲載協力について">掲載協力について</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    関連する競技カテゴリー（該当する場合）
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">選択してください</option>
                    <option value="大学駅伝 - 箱根駅伝">大学駅伝 - 箱根駅伝</option>
                    <option value="大学駅伝 - 全日本大学駅伝">大学駅伝 - 全日本大学駅伝</option>
                    <option value="大学駅伝 - 出雲駅伝">大学駅伝 - 出雲駅伝</option>
                    <option value="大学駅伝 - 富士山女子駅伝">大学駅伝 - 富士山女子駅伝</option>
                    <option value="大学駅伝 - 杜の都駅伝">大学駅伝 - 杜の都駅伝</option>
                    <option value="実業団 - ニューイヤー駅伝">実業団 - ニューイヤー駅伝</option>
                    <option value="実業団 - クイーンズ駅伝">実業団 - クイーンズ駅伝</option>
                    <option value="高校駅伝 - 男子">高校駅伝 - 男子</option>
                    <option value="高校駅伝 - 女子">高校駅伝 - 女子</option>
                    <option value="中学駅伝 - 男子">中学駅伝 - 男子</option>
                    <option value="中学駅伝 - 女子">中学駅伝 - 女子</option>
                    <option value="都道府県駅伝 - 男子">都道府県駅伝 - 男子</option>
                    <option value="都道府県駅伝 - 女子">都道府県駅伝 - 女子</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

