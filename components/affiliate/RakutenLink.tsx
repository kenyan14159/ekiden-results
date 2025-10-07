'use client';

import { ExternalLink } from 'lucide-react';

interface RakutenLinkProps {
  productId: string;
  text?: string;
  className?: string;
}

export default function RakutenLink({ productId, text = '楽天市場で見る', className = '' }: RakutenLinkProps) {
  // TODO: data/products/shoes.json からproductIdに基づいてリンクを取得
  // 今は仮のリンク
  const rakutenUrl = `https://search.rakuten.co.jp/search/mall/${productId}/`;

  return (
    <a
      href={rakutenUrl}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 bg-[#BF0000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.836 17.828c-1.145 0-2.074-.93-2.074-2.074V8.246c0-1.145.93-2.074 2.074-2.074h3.586c.856 0 1.602.52 1.918 1.26.316-.74 1.062-1.26 1.918-1.26h3.586c1.145 0 2.074.93 2.074 2.074v7.508c0 1.145-.93 2.074-2.074 2.074h-3.586c-.856 0-1.602-.52-1.918-1.26-.316.74-1.062 1.26-1.918 1.26H6.836z"/>
      </svg>
      {text}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
