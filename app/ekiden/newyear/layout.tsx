import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('newyear')

export default function NewyearLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
