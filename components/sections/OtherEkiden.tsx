"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { getEkidenByCategory } from "@/lib/ekiden-data"

const races = getEkidenByCategory("other")

export function OtherEkiden() {
  return (
    <section className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
      >
        その他の駅伝
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4">
        {races.map((race, index) => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={race.url} className="block h-full">
              <Card className="h-full border-l-4 border-pink-500 bg-gradient-to-br from-white to-pink-50/30">
                <CardHeader>
                  <CardTitle className="text-lg mb-2 text-pink-900">{race.name}</CardTitle>
                  <p className="text-sm text-pink-600">{race.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{race.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
