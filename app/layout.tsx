import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, Inter } from "next/font/google"
import "./globals.css"
import { StructuredData } from "@/components/StructuredData"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { GoogleAdSense } from "@/components/GoogleAdSense"
import { ContentProtection } from "@/components/ContentProtection"

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e40af',
}

export const metadata: Metadata = {
  title: "駅伝リザルト | 全国駅伝大会の結果一覧",
  description: "箱根駅伝、ニューイヤー駅伝、クイーンズ駅伝など、実業団駅伝、大学駅伝、高校駅伝、中学駅伝の結果をまとめたサイトです。最新の大会情報を分かりやすく掲載。",
  authors: [{ name: "駅伝リザルト" }],
  creator: "駅伝リザルト",
  publisher: "駅伝リザルト",
  icons: {
    icon: '/ekiden-logo.png',
    apple: '/ekiden-logo.png',
  },
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
      </head>
      <body className="font-noto antialiased">
        <ContentProtection />
        <GoogleAnalytics />
        <GoogleAdSense />
        {children}
      </body>
    </html>
  )
}


