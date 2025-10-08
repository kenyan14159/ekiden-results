import type { Metadata } from 'next'
import { generateInfoPageMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateInfoPageMetadata('operator-information')

export default function OperatorInformationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
