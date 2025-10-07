"use client"

import { Share2, Twitter, Facebook, Link as LinkIcon } from "lucide-react"
import { useState } from "react"

interface SocialShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function SocialShareButtons({ url, title, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `https://ekiden-results.com${url}`
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('コピーに失敗しました:', err)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    hatena: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodedUrl}&title=${encodedTitle}`,
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-900">この結果をシェア</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-colors shadow-sm"
          aria-label="Twitterでシェア"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-sm">X (Twitter)</span>
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#1664d8] text-white rounded-lg font-medium transition-colors shadow-sm"
          aria-label="Facebookでシェア"
        >
          <Facebook className="w-4 h-4" />
          <span className="text-sm">Facebook</span>
        </a>

        {/* LINE */}
        <a
          href={shareLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#06C755] hover:bg-[#05b34b] text-white rounded-lg font-medium transition-colors shadow-sm"
          aria-label="LINEでシェア"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span className="text-sm">LINE</span>
        </a>

        {/* はてなブックマーク */}
        <a
          href={shareLinks.hatena}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A4DE] hover:bg-[#0090c4] text-white rounded-lg font-medium transition-colors shadow-sm"
          aria-label="はてなブックマークに追加"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zM8.3 5.9H5.46v12.2H8.3V5.9zm9.94 6.24c.04.22.06.44.06.68 0 2.26-1.83 4.09-4.09 4.09-2.26 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.18 0 2.24.5 2.99 1.3l-1.21 1.21c-.44-.44-1.05-.71-1.78-.71-1.36 0-2.46 1.1-2.46 2.46s1.1 2.46 2.46 2.46c1.23 0 2.25-.9 2.43-2.08h-2.43v-1.63h4.03zM8.3 3.48H5.46v1.85H8.3V3.48z"/>
          </svg>
          <span className="text-sm">はてブ</span>
        </a>

        {/* リンクコピー */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          aria-label="URLをコピー"
        >
          <LinkIcon className="w-4 h-4" />
          <span className="text-sm">{copied ? 'コピー済み!' : 'URLコピー'}</span>
        </button>
      </div>

      {/* 引用促進メッセージ */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-600">
          このデータを引用する場合は、出典として「駅伝リザルト（ekiden-results.com）」をご記載ください。
        </p>
      </div>
    </div>
  )
}
