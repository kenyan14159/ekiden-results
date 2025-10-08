import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('junior-high-men')

export default function JuniorHighMenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
