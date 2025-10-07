import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArticleMetadata } from '@/types/content';

interface ArticleCardProps {
  article: ArticleMetadata;
}

const categoryLabels = {
  'race-preview': 'レース情報',
  'race-report': 'レース速報',
  'gear-review': 'ギアレビュー',
  'training': 'トレーニング',
};

const categoryColors = {
  'race-preview': 'bg-blue-100 text-blue-800',
  'race-report': 'bg-red-100 text-red-800',
  'gear-review': 'bg-green-100 text-green-800',
  'training': 'bg-purple-100 text-purple-800',
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category] || article.category;
  const categoryColor = categoryColors[article.category] || 'bg-gray-100 text-gray-800';
  
  const formattedDate = new Date(article.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {article.ogImage && (
          <div className="aspect-video w-full overflow-hidden bg-gray-100">
            <img
              src={article.ogImage}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
              {categoryLabel}
            </span>
            <time className="text-sm text-gray-500">{formattedDate}</time>
          </div>
          
          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.description}
          </p>
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
