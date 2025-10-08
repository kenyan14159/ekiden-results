import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('miyakooji-men')

export default function MiyakoojiMenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
