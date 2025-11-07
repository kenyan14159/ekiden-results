import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { wordpressConfig } from '@/data/wordpress-articles';
import Link from 'next/link';
import Image from 'next/image';
import { WordPressArticle } from '@/types/wordpress';

export const metadata: Metadata = {
  title: 'ブログ | 駅伝リザルト',
  description: '大学駅伝の速報、シューズレビュー、注目選手情報など、箱根駅伝出場経験者が解説するブログ記事',
};

function WordPressArticleCard({ article }: { article: WordPressArticle }) {
  return (
    <Link 
      href={`/blog/${article.slug}`}
      className="block group"
    >
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100">
        {/* サムネイル */}
        {article.thumbnail && (
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        )}
        
        {/* コンテンツ */}
        <div className="p-6">
          {/* カテゴリーとタグ */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {article.category === 'race-preview' ? 'レース情報' : article.category}
            </span>
            {article.featured && (
              <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                注目
              </span>
            )}
          </div>
          
          {/* タイトル */}
          <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
          
          {/* 説明 */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
          
          {/* メタ情報 */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <time>{new Date(article.date).toLocaleDateString('ja-JP')}</time>
            <span>{article.author}</span>
          </div>
          
          {/* タグ */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const articles = wordpressConfig.articles;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              駅伝ブログ
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              箱根駅伝出場経験者が、大会速報・シューズレビュー・選手情報を詳しく解説
            </p>
          </div>

        {/* カテゴリフィルター（将来的に実装） */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-6 py-2 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              {category.label}
            </button>
          ))}
        </div> */}

        {/* 記事一覧 */}
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">記事はまだありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <WordPressArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        {/* ページネーション（将来的に実装） */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
