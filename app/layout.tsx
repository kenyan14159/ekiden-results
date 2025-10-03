import type { Metadata } from "next"
import { Noto_Sans_JP, Inter } from "next/font/google"
import "./globals.css"
import { StructuredData } from "@/components/StructuredData"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "駅伝リザルト | 全国駅伝大会の結果一覧",
  description: "箱根駅伝、ニューイヤー駅伝、クイーンズ駅伝など、実業団駅伝、大学駅伝、高校駅伝、中学駅伝の結果をまとめたサイトです。最新の大会情報を分かりやすく掲載。",
  keywords: ["駅伝", "箱根駅伝", "ニューイヤー駅伝", "クイーンズ駅伝", "全日本大学駅伝", "出雲駅伝", "都大路", "駅伝結果", "駅伝速報"],
  authors: [{ name: "駅伝リザルト" }],
  creator: "駅伝リザルト",
  publisher: "駅伝リザルト",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://ekiden-results.com",
    title: "駅伝リザルト | 全国駅伝大会の結果一覧",
    description: "箱根駅伝、ニューイヤー駅伝など、全国の主要駅伝大会の結果を網羅したサイトです。",
    siteName: "駅伝リザルト",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "駅伝リザルト - 全国駅伝大会の結果一覧",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "駅伝リザルト | 全国駅伝大会の結果一覧",
    description: "箱根駅伝、ニューイヤー駅伝など、全国の主要駅伝大会の結果を網羅したサイトです。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ekiden-results.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
        <script 
          async 
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </head>
      <body className="font-noto antialiased">
        <GoogleAnalytics />
        <amp-auto-ads 
          type="adsense"
          data-ad-client="ca-pub-7505086484817015"
        />
        {children}
      </body>
    </html>
  )
}


