import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('morinomiyako')

export default function MorinomiyakoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
