// 選手データの型定義
export interface Athlete {
  id: string;              // 例: "aoyamagakuin-kondou-yuudai"
  name: string;            // 例: "近藤幸太郎"
  nameKana: string;        // 例: "こんどう こうたろう"
  university: string;      // 例: "青山学院大学"
  grade: number;           // 1-4年生
  graduationYear?: number; // 卒業年（OBの場合）
  birthYear: number;       // 生年
  height?: number;         // 身長(cm)
  weight?: number;         // 体重(kg)
  highSchool?: string;     // 出身高校
  
  // 記録
  records?: {
    "5000m"?: string;      // 例: "13:25.87"
    "10000m"?: string;
    halfMarathon?: string;
    fullMarathon?: string;
  };
  
  // 箱根駅伝出場歴
  hakone?: Array<{
    year: number;
    section: number;       // 区間
    time?: string;         // タイム
    rank?: number;         // 区間順位
  }>;
  
  // 使用シューズ情報
  shoes?: {
    brand: string;         // 例: "Nike"
    model: string;         // 例: "ZoomX Vaporfly Next% 3"
    productId?: string;    // 商品データとの紐付け
  };
  
  // SNS
  social?: {
    twitter?: string;
    instagram?: string;
  };
  
  // その他
  profile?: string;        // プロフィール文
  achievements?: string[]; // 主な実績
}

// 大学ごとのチームデータ
export interface Team {
  id: string;              // 例: "aoyamagakuin"
  name: string;            // 例: "青山学院大学"
  shortName: string;       // 例: "青学"
  founded?: number;        // 創部年
  coach?: string;          // 監督名
  colors: {
    primary: string;       // メインカラー
    secondary?: string;
  };
  athletes: string[];      // 選手IDの配列
}

// 商品データの型定義
export interface Product {
  id: string;              // 例: "nike-vaporfly-3"
  type: "shoes" | "watch" | "wear";
  brand: string;           // 例: "Nike"
  name: string;            // 例: "ZoomX Vaporfly Next% 3"
  model: string;           // 例: "Vaporfly 3"
  
  // 価格情報
  price?: {
    list: number;          // 定価
    amazon?: number;       // Amazon価格
    rakuten?: number;      // 楽天価格
  };
  
  // アフィリエイトリンク
  links: {
    amazon?: string;
    rakuten?: string;
    official?: string;
  };
  
  // 商品仕様（シューズの場合）
  specs?: {
    weight?: number;       // 重量(g)
    drop?: number;         // ドロップ(mm)
    plate?: string;        // プレート素材
    foam?: string;         // ミッドソール素材
  };
  
  // 使用選手数（統計データ）
  usage?: {
    hakone2025?: number;
    izumo2025?: number;
  };
  
  // レビュー記事へのリンク
  reviewArticle?: string;  // 記事slug
  
  // 画像
  images?: string[];
  
  // 説明
  description?: string;
}

// 記事メタデータの型定義
export interface ArticleMetadata {
  slug: string;            // URL用（例: "izumo-2025-guide"）
  title: string;           // タイトル
  description: string;     // 説明文（SEO用）
  category: "race-preview" | "race-report" | "gear-review" | "training";
  tags: string[];          // タグ
  date: string;            // 公開日（YYYY-MM-DD）
  updatedAt?: string;      // 更新日
  author: string;          // 著者名
  
  // SEO
  ogImage?: string;        // OGP画像
  keywords?: string[];     // キーワード
  
  // アフィリエイト関連
  hasAffiliateLinks: boolean;
  mainProducts?: string[]; // 主に紹介する商品ID
  
  // レース関連
  race?: {
    name: string;          // 例: "出雲駅伝"
    year: number;
    date: string;
  };
}
