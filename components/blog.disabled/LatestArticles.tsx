'use client';

import { useEffect, useState } from 'react';
import { getAllArticlesClient, getLatestArticlesClient } from '@/lib/articles-client';
import { ArticleMetadata } from '@/types/content';
import ArticleCard from '@/components/blog.disabled/ArticleCard';
import Link from 'next/link';

export default function LatestArticles() {
  const [latestArticles, setLatestArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      const articles = await getAllArticlesClient();
      const latest = getLatestArticlesClient(articles, 3);
      setLatestArticles(latest);
      setLoading(false);
    }
    loadArticles();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
      </section>
    );
  }

  if (latestArticles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            新着記事
          </h2>
          <p className="text-gray-600">
            箱根駅伝出場経験者が、大会速報・シューズレビュー・選手情報を解説
          </p>
        </div>
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 group"
        >
          すべて見る
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
