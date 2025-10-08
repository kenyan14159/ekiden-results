import type { Metadata } from 'next'
import { generateInfoPageMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateInfoPageMetadata('contact')

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
