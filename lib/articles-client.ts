import { ArticleMetadata } from '@/types/content';

// ビルド時に生成されたJSONファイルから記事データを取得
let articlesCache: ArticleMetadata[] | null = null;

export async function getAllArticlesClient(): Promise<ArticleMetadata[]> {
  if (articlesCache) {
    return articlesCache;
  }
  
  try {
    const response = await fetch('/articles.json');
    if (!response.ok) {
      return [];
    }
    const data: ArticleMetadata[] = await response.json();
    articlesCache = data;
    return articlesCache;
  } catch (error) {
    console.error('Failed to load articles:', error);
    return [];
  }
}

export function getLatestArticlesClient(articles: ArticleMetadata[], limit: number = 5): ArticleMetadata[] {
  return articles.slice(0, limit);
}

export function getArticlesByCategoryClient(articles: ArticleMetadata[], category: string): ArticleMetadata[] {
  return articles.filter(article => article.category === category);
}
