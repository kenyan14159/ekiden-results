import type { Metadata } from 'next'
import { generateInfoPageMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateInfoPageMetadata('scoring-table')

export default function ScoringTableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
