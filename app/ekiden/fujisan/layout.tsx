import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('fujisan')

export default function FujisanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
