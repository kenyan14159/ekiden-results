import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('hakone')

export default function HakoneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
