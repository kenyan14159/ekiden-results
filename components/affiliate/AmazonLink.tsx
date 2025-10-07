'use client';

import { ExternalLink } from 'lucide-react';

interface AmazonLinkProps {
  productId: string;
  text?: string;
  className?: string;
}

export default function AmazonLink({ productId, text = 'Amazonで見る', className = '' }: AmazonLinkProps) {
  // TODO: data/products/shoes.json からproductIdに基づいてリンクを取得
  // 今は仮のリンク
  const amazonUrl = `https://www.amazon.co.jp/s?k=${productId}`;

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 bg-[#FF9900] hover:bg-[#E88B00] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.544.406-3.045.61-4.502.61-3.16 0-6.123-.844-8.89-2.535-1.064-.656-2.02-1.376-2.87-2.163-.11-.104-.132-.214-.074-.338z"/>
        <path d="M21.28 16.392c-.347 0-.623-.062-.83-.184-.206-.122-.323-.313-.35-.573-.028-.26.014-.572.126-.94.11-.367.276-.656.497-.867.22-.21.497-.316.83-.316.346 0 .623.062.83.184.207.122.324.313.35.573.028.26-.013.572-.125.94-.112.367-.277.656-.498.867-.22.21-.497.316-.83.316zm-9.906-3.45c-.48 0-.87.177-1.17.532-.3.354-.45.826-.45 1.417 0 .59.15 1.062.45 1.416.3.355.69.532 1.17.532.48 0 .87-.177 1.17-.532.3-.354.45-.826.45-1.416 0-.59-.15-1.063-.45-1.417-.3-.355-.69-.532-1.17-.532z"/>
      </svg>
      {text}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
