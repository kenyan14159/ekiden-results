import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('zenjitsu')

export default function ZenjitsuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
