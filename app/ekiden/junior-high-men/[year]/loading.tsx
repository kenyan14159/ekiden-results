import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-96 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <LoadingSpinner />
      </main>
      <Footer />
    </div>
  )
}

