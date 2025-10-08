import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('hiroshima')

export default function HiroshimaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
