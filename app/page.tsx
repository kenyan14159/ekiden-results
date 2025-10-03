"use client"

import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Footer } from "@/components/Footer"
import { CorporateEkiden } from "@/components/sections/CorporateEkiden"
import { UniversityEkiden } from "@/components/sections/UniversityEkiden"
import { HighSchoolEkiden } from "@/components/sections/HighSchoolEkiden"
import { JuniorHighEkiden } from "@/components/sections/JuniorHighEkiden"
import { OtherEkiden } from "@/components/sections/OtherEkiden"
import { SiteInfo } from "@/components/sections/SiteInfo"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <Hero />
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <CorporateEkiden />
          <UniversityEkiden />
          <HighSchoolEkiden />
          <JuniorHighEkiden />
          <OtherEkiden />
          <SiteInfo />
        </div>
      </main>
      <Footer />
    </div>
  )
}


