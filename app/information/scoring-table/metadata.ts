import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "スコアリングテーブル | 世界陸上ポイント計算機 - 駅伝リザルト",
  description: "陸上競技のポイントを記録に変換する無料ツール。800-1400ポイント対応。短距離、中距離、長距離、跳躍、投てき、混成競技など全種目のスコアリングテーブルを搭載。世界陸連2025年版得点表準拠。",
  keywords: [
    "スコアリングテーブル",
    "陸上競技",
    "ポイント計算",
    "世界陸連",
    "得点表",
    "記録換算",
    "World Athletics",
    "スコアリング",
    "陸上得点",
    "100m",
    "走幅跳",
    "砲丸投",
    "十種競技",
    "七種競技",
    "マラソン",
    "長距離",
    "短距離",
    "中距離",
    "跳躍",
    "投てき",
    "混成競技",
    "ハードル",
    "競歩"
  ],
  authors: [{ name: "駅伝リザルト" }],
  creator: "駅伝リザルト",
  publisher: "駅伝リザルト",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://ekiden-results.com/information/scoring-table",
    title: "スコアリングテーブル | 世界陸上ポイント計算機",
    description: "陸上競技のポイントを記録に変換する無料ツール。世界陸連2025年版得点表準拠。全種目対応。",
    siteName: "駅伝リザルト",
    images: [
      {
        url: "/og-scoring-table.png",
        width: 1200,
        height: 630,
        alt: "スコアリングテーブル - 世界陸上ポイント計算機",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "スコアリングテーブル | 世界陸上ポイント計算機",
    description: "陸上競技のポイントを記録に変換する無料ツール。世界陸連2025年版得点表準拠。",
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
    canonical: "https://ekiden-results.com/information/scoring-table",
  },
}
