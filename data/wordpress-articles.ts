import { WordPressConfig } from '@/types/wordpress';

// デフォルトのOG画像
const DEFAULT_OG_IMAGE = 'https://ekiden-results.com/WordPress/wp-content/uploads/2025/10/ekiden3.png';

export const wordpressConfig: WordPressConfig = {
  baseUrl: 'https://ekiden-results.com/WordPress',
  articles: [
    {
      slug: 'izumo-2025-guide',
      title: '出雲駅伝2025 完全ガイド｜エントリーメンバー・注目選手・優勝予想を徹底解説',
      description: '2025年10月13日開催の出雲駅伝の全22チームのエントリーメンバー、注目選手、優勝予想を箱根駅伝出場経験者が徹底解説。青山学院、駒澤、國學院の三つ巴の戦いを予想。',
      category: 'race-preview',
      tags: ['出雲駅伝', '2025', '大学駅伝', 'エントリーメンバー', '注目選手'],
      date: '2025-10-07',
      author: '元箱根ランナー',
      url: 'https://ekiden-results.com/WordPress/izumoekiden-2025-guide/',
      thumbnail: DEFAULT_OG_IMAGE,
      featured: true,
    },
  ],
};

export { DEFAULT_OG_IMAGE };
