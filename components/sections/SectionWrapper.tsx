"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  title: string
  icon: ReactNode
}

export function SectionWrapper({ children, title, icon }: SectionWrapperProps) {
  return (
    <section className="mb-20 lg:mb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-10">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-50"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
              {icon}
            </div>
          </motion.div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  )
}

