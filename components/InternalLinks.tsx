import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface RelatedLink {
  title: string
  url: string
  description?: string
  badge?: string
}

interface RelatedArticlesProps {
  title?: string
  links: RelatedLink[]
  variant?: 'compact' | 'detailed'
}

/**
 * 関連記事コンポーネント
 * 内部リンクを効果的に配置して、SEO・ユーザー体験を向上させる
 */
export function RelatedArticles({ 
  title = '関連記事', 
  links,
  variant = 'compact'
}: RelatedArticlesProps) {
  if (links.length === 0) return null

  return (
    <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900">
        <span className="w-1 h-6 bg-blue-600 mr-3"></span>
        {title}
      </h3>
      <ul className={variant === 'compact' ? 'space-y-2' : 'space-y-4'}>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.url}
              className="group flex items-start hover:bg-white/70 p-3 rounded-md transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-medium group-hover:text-blue-900 group-hover:underline">
                    {link.title}
                  </span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </div>
                {variant === 'detailed' && link.description && (
                  <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * ピラー記事へのナビゲーション
 * トップページや一覧ページで使用
 */
export function PillarNavigation() {
  const pillars = [
    {
      title: '箱根駅伝',
      url: '/ekiden/hakone',
      description: '関東学生連合含む21チームが出場する、正月の風物詩',
      category: '大学駅伝',
      badge: '人気'
    },
    {
      title: 'ニューイヤー駅伝',
      url: '/ekiden/newyear',
      description: '全日本実業団対抗駅伝。トップ選手が集結',
      category: '実業団駅伝',
      badge: '注目'
    },
    {
      title: 'クイーンズ駅伝',
      url: '/ekiden/queens',
      description: '実業団女子駅伝の頂点を決める大会',
      category: '実業団駅伝'
    },
    {
      title: '出雲駅伝',
      url: '/ekiden/izumo',
      description: '大学駅伝日本一を決める三大駅伝の開幕戦',
      category: '大学駅伝'
    },
  ]

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">主要大会から探す</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((pillar, index) => (
          <Link
            key={index}
            href={pillar.url}
            className="group block p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-xs text-gray-500 font-medium">{pillar.category}</span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  {pillar.title}
                  {pillar.badge && (
                    <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-bold">
                      {pillar.badge}
                    </span>
                  )}
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-600">{pillar.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * パンくずリスト風の内部リンク
 * 年度別ページで使用し、一覧ページへの導線を強化
 */
interface BreadcrumbLinksProps {
  race: {
    name: string
    url: string
  }
  year?: number
}

export function BreadcrumbLinks({ race, year }: BreadcrumbLinksProps) {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
        ホーム
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <Link href={race.url} className="text-blue-600 hover:text-blue-800 hover:underline">
        {race.name}
      </Link>
      {year && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">{year}年</span>
        </>
      )}
    </div>
  )
}
