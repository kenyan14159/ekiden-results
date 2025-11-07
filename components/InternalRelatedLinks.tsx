import Link from "next/link"
import { Calendar, TrendingUp, ArrowRight } from "lucide-react"

interface InternalLink {
  title: string
  url: string
  description: string
  year?: string
  tag?: string
}

interface InternalRelatedLinksProps {
  raceName: string
  currentYear?: string
  links?: InternalLink[]
}

export function InternalRelatedLinks({ links }: InternalRelatedLinksProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        関連ページ
      </h2>
      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links && links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="block p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {link.year && (
                  <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    <Calendar className="w-3 h-3" />
                    {link.year}
                  </span>
                )}
                {link.tag && (
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                    {link.tag}
                  </span>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 text-sm">
              {link.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
