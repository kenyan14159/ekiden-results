export interface WordPressArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  url: string; // WordPressの記事URL
  thumbnail?: string;
  featured?: boolean;
}

export interface WordPressConfig {
  baseUrl: string;
  articles: WordPressArticle[];
}
