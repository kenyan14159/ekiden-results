import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('izumo')

export default function IzumoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
