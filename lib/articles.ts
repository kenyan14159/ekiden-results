import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleMetadata } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * すべての記事のメタデータを取得
 */
export function getAllArticles(): ArticleMetadata[] {
  const articles: ArticleMetadata[] = [];
  
  // content配下のすべてのカテゴリを取得
  const categories = ['race-preview', 'race-report', 'gear-review'];
  
  categories.forEach(category => {
    const categoryPath = path.join(contentDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      return;
    }
    
    const files = fs.readdirSync(categoryPath);
    
    files.forEach(filename => {
      if (filename.endsWith('.mdx') || filename.endsWith('.md')) {
        const filePath = path.join(categoryPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        articles.push({
          slug: data.slug || filename.replace(/\.mdx?$/, ''),
          title: data.title || '',
          description: data.description || '',
          category: data.category || category as any,
          tags: data.tags || [],
          date: data.date || '',
          updatedAt: data.updatedAt,
          author: data.author || '',
          ogImage: data.ogImage,
          keywords: data.keywords,
          hasAffiliateLinks: data.hasAffiliateLinks || false,
          mainProducts: data.mainProducts,
          race: data.race,
        });
      }
    });
  });
  
  // 日付順にソート（新しい順）
  return articles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * カテゴリ別に記事を取得
 */
export function getArticlesByCategory(category: string): ArticleMetadata[] {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.category === category);
}

/**
 * 特定の記事を取得
 */
export function getArticleBySlug(slug: string): {
  metadata: ArticleMetadata;
  content: string;
} | null {
  const categories = ['race-preview', 'race-report', 'gear-review'];
  
  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      continue;
    }
    
    const files = fs.readdirSync(categoryPath);
    
    for (const filename of files) {
      if (filename.endsWith('.mdx') || filename.endsWith('.md')) {
        const filePath = path.join(categoryPath, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (data.slug === slug || filename.replace(/\.mdx?$/, '') === slug) {
          return {
            metadata: {
              slug: data.slug || filename.replace(/\.mdx?$/, ''),
              title: data.title || '',
              description: data.description || '',
              category: data.category || category as any,
              tags: data.tags || [],
              date: data.date || '',
              updatedAt: data.updatedAt,
              author: data.author || '',
              ogImage: data.ogImage,
              keywords: data.keywords,
              hasAffiliateLinks: data.hasAffiliateLinks || false,
              mainProducts: data.mainProducts,
              race: data.race,
            },
            content,
          };
        }
      }
    }
  }
  
  return null;
}

/**
 * 最新の記事を取得
 */
export function getLatestArticles(limit: number = 5): ArticleMetadata[] {
  const allArticles = getAllArticles();
  return allArticles.slice(0, limit);
}
