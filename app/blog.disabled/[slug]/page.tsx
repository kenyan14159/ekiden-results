import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { wordpressConfig, DEFAULT_OG_IMAGE } from '@/data/wordpress-articles';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  // WordPress記事のslugを返す
  const params = wordpressConfig.articles.map((article) => ({
    slug: article.slug,
  }));
  
  console.log('generateStaticParams:', params);
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = wordpressConfig.articles.find(a => a.slug === params.slug);
  
  if (!article) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: `${article.title} | 駅伝リザルト`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.thumbnail ? [article.thumbnail] : [DEFAULT_OG_IMAGE],
    },
  };
}

const categoryLabels: Record<string, string> = {
  'race-preview': 'レース情報',
  'race-report': 'レース速報',
  'gear-review': 'ギアレビュー',
  'training': 'トレーニング',
};

export default function ArticlePage({ params }: Props) {
  const article = wordpressConfig.articles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const categoryLabel = categoryLabels[article.category] || article.category;
  
  const formattedDate = new Date(article.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* パンくずリスト */}
        <div className="border-b bg-gray-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                ブログ
              </Link>
              <span>/</span>
              <span className="text-gray-900">{article.title}</span>
            </nav>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ヘッダー */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {categoryLabel}
            </span>
            <time className="text-gray-500">{formattedDate}</time>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {article.description}
          </p>

          {article.author && (
            <div className="flex items-center gap-2 text-gray-600">
              <span>執筆：</span>
              <span className="font-semibold">{article.author}</span>
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* WordPress記事を埋め込み */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <iframe
              src={article.url}
              className="w-full min-h-[2000px] border-0"
              title={article.title}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              別タブで開く
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* 関連記事へのリンク */}
        <div className="mt-16 pt-8 border-t">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← ブログ一覧に戻る
          </Link>
        </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
