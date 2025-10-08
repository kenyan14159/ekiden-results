import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('miyakooji-women')

export default function MiyakoojiWomenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
