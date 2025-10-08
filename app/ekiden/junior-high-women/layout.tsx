import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('junior-high-women')

export default function JuniorHighWomenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
