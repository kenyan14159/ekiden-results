import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('queens')

export default function QueensLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
