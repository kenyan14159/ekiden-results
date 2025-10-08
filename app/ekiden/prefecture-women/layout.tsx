import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('prefecture-women')

export default function PrefectureWomenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
