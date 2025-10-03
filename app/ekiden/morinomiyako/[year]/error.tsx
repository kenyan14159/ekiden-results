'use client'

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ErrorMessage } from "@/components/LoadingSpinner"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <Link href="/ekiden/morinomiyako" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              morinomiyako 歴代結果に戻る
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">morinomiyako 詳細結果</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <ErrorMessage 
            message={error.message || "データの読み込みに失敗しました"} 
            retry={reset}
          />
          <div className="text-center mt-8">
            <Link 
              href="/ekiden/morinomiyako"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              morinomiyakoトップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

