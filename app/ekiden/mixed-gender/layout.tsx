import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('mixed-gender')

export default function MixedGenderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
