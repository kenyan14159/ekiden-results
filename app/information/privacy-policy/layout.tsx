import type { Metadata } from 'next'
import { generateInfoPageMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateInfoPageMetadata('privacy-policy')

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
