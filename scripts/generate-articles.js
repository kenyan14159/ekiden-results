const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'public', 'articles.json');

function getAllArticles() {
  const articles = [];
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
          category: data.category || category,
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

// 記事データを生成
const articles = getAllArticles();

// public/articles.jsonに保存
fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));

console.log(`✅ Generated ${articles.length} articles to ${outputFile}`);
