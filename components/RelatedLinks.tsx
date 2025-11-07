"use client"

import { ExternalLink } from "lucide-react"

interface RelatedLink {
  title: string
  url: string
  description: string
  category: 'official' | 'media' | 'reference'
}

interface RelatedLinksProps {
  raceName: string
  links?: RelatedLink[]
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  // デフォルトの関連リンク
  const defaultLinks: RelatedLink[] = [
    {
      title: '関東学生陸上競技連盟',
      url: 'https://www.kgrr.org/',
      description: '箱根駅伝の主催団体。公式記録やエントリー情報を掲載',
      category: 'official'
    },
    {
      title: '日本陸上競技連盟',
      url: 'https://www.jaaf.or.jp/',
      description: '日本の陸上競技を統括する団体',
      category: 'official'
    },
    {
      title: 'Wikipedia - 箱根駅伝',
      url: 'https://ja.wikipedia.org/wiki/箱根駅伝',
      description: '箱根駅伝の歴史や詳細情報',
      category: 'reference'
    },
    {
      title: 'スポーツナビ - 駅伝',
      url: 'https://sports.yahoo.co.jp/ekiden/',
      description: '最新の駅伝ニュースと速報',
      category: 'media'
    }
  ]

  const displayLinks = links || defaultLinks

  const categoryLabels = {
    official: '公式サイト',
    media: 'メディア',
    reference: '参考資料'
  }

  const categoryColors = {
    official: 'bg-blue-100 text-blue-700',
    media: 'bg-green-100 text-green-700',
    reference: 'bg-purple-100 text-purple-700'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ExternalLink className="w-5 h-5 text-blue-600" />
        関連リンク
      </h2>
      
      <div className="space-y-4">
        {displayLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[link.category]}`}>
                    {categoryLabels[link.category]}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">📢 メディア・ブロガーの皆様へ</h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            当サイトのデータは自由に引用いただけます。記事やブログで使用される際は、
            <strong>「駅伝リザルト」</strong>として出典を明記し、当サイトへのリンクを設置してください。
            より多くの駅伝ファンに情報をお届けできれば幸いです。
          </p>
        </div>
      </div>
    </div>
  )
}
