"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const siteInfoLinks = [
  { id: "home", name: "ホーム", subtitle: "トップページ", description: "駅伝大会情報のトップページ", url: "/" },
  { id: "scoring-table", name: "スコアリングテーブル", subtitle: "採点基準表", description: "各大会のスコアリングテーブル", url: "/information/scoring-table" },
  { id: "privacy-policy", name: "プライバシーポリシー", subtitle: "個人情報保護方針", description: "当サイトのプライバシーポリシー", url: "/information/privacy-policy" },
  { id: "contact", name: "お問い合わせ", subtitle: "Contact", description: "ご質問・ご意見はこちら", url: "/information/contact" },
  { id: "disclaimer", name: "免責事項", subtitle: "Disclaimer", description: "当サイトの免責事項", url: "/information/disclaimer" },
  { id: "operator", name: "運営者情報", subtitle: "運営情報", description: "当サイトの運営者情報", url: "/information/operator-information" },
]

export function SiteInfo() {
  return (
    <section className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
      >
        サイト情報
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {siteInfoLinks.map((link, index) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={link.url} className="block h-full">
              <Card className="h-full border-l-4 border-gray-500 bg-gradient-to-br from-white to-gray-50/30">
                <CardHeader>
                  <CardTitle className="text-lg mb-2 text-gray-900">{link.name}</CardTitle>
                  <p className="text-sm text-gray-600">{link.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

