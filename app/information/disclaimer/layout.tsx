import type { Metadata } from 'next'
import { generateInfoPageMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateInfoPageMetadata('disclaimer')

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
