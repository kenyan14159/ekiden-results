# 駅伝リザルト - Ekiden Results

日本全国の主要駅伝大会の結果を美しく、分かりやすく表示するウェブサイト

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

## 🌟 特徴

- ✨ **美しいUI**: Tailwind CSS + shadcn/ui による洗練されたデザイン
- ⚡ **高速**: Next.js 14 App Router による最適化されたパフォーマンス
- 📱 **レスポンシブ**: モバイルからデスクトップまで完全対応
- 🎯 **SEO最適化**: メタデータ、サイトマップ、構造化データ完備
- 🔍 **検索機能**: 選手名・チーム名での高速検索
- 📊 **詳細な統計**: チーム別、区間別、選手別の多角的な分析

## 🏃 対応大会

### 実業団駅伝
- ニューイヤー駅伝（全日本実業団対抗駅伝）
- クイーンズ駅伝（全日本実業団対抗女子駅伝）

### 大学駅伝
- 箱根駅伝（東京箱根間往復大学駅伝競走）
- 全日本大学駅伝
- 出雲駅伝
- 富士山女子駅伝
- 杜の都駅伝

### 高校駅伝
- 都大路（全国高校駅伝）男子・女子

### 中学駅伝
- 全国中学駅伝 男子・女子

### その他
- ひろしま駅伝
- 都道府県対抗女子駅伝

## 🚀 技術スタック

### フロントエンド
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion

### データ管理
- JSON ファイルベース
- クライアント/サーバーサイドフェッチング

### SEO & Analytics
- Google Analytics
- Google AdSense
- 構造化データ (JSON-LD)
- サイトマップ自動生成

### セキュリティ
- セキュリティヘッダー設定
- CSP (Content Security Policy)
- HTTPS強制

## 📦 セットアップ

### 必要要件
- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/ekiden-results.git
cd ekiden-results

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 📁 プロジェクト構造

```
EKIDEN/
├── app/                      # Next.js App Router
│   ├── ekiden/              # 駅伝大会ページ
│   │   ├── [id]/           # 大会トップページ
│   │   │   ├── [year]/     # 年度別詳細ページ
│   │   │   └── about/      # 大会情報ページ
│   ├── information/         # サイト情報ページ
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # ホームページ
├── components/              # Reactコンポーネント
│   ├── ui/                 # shadcn/ui コンポーネント
│   ├── sections/           # セクションコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── data/                    # JSONデータファイル
│   ├── university/         # 大学駅伝データ
│   ├── corporate/          # 実業団駅伝データ
│   ├── highschool/         # 高校駅伝データ
│   └── ...
├── lib/                     # ユーティリティ関数
│   ├── ekiden-data.ts      # 大会メタデータ
│   ├── format-utils.ts     # フォーマット関数
│   └── utils.ts            # その他ユーティリティ
├── hooks/                   # カスタムフック
│   └── useEkidenData.ts    # データフェッチフック
├── types/                   # TypeScript型定義
│   └── ekiden.ts           # 駅伝関連の型
├── public/                  # 静的ファイル
│   └── data/               # 公開JSONデータ (シンボリックリンク)
└── ...
```

## 🔧 環境変数

`.env.local` ファイルを作成（本番環境では適切に設定）:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# サイトURL
NEXT_PUBLIC_SITE_URL=https://ekiden-results.com

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Formspree（お問い合わせフォーム）
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
```

## 📊 データ構造

### 大会データの例 (JSON)

```json
{
  "eventName": "箱根駅伝",
  "year": 2025,
  "count": 101,
  "teams": [
    {
      "rank": 1,
      "name": "青山学院大学",
      "totalTime": "10:41:19",
      "outboundTime": "5:18:52",
      "inboundTime": "5:22:27",
      "runners": [
        {
          "section": 1,
          "dist": "21.3km",
          "time": "01:02:51",
          "name": "宇田川瞬矢",
          "grade": 3,
          "rank": 10,
          "isSectionRecord": false
        }
      ]
    }
  ]
}
```

## 🎨 カスタマイズ

### カラーテーマの変更

`app/globals.css` でカラー変数を調整:

```css
:root {
  --primary-50: ...;
  --primary-100: ...;
  /* ... */
}
```

### 大学カラーの追加

`data/university-colors.ts` に大学とそのカラーを追加:

```typescript
export const universityColors: Record<string, string> = {
  '青山学院大学': '#00A040',
  // 新しい大学を追加
  '新設大学': '#FF0000',
}
```

## 📈 パフォーマンス

### Lighthouse スコア目標
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 最適化施策
- 画像の自動最適化（AVIF, WebP）
- コード分割
- 静的ファイルのキャッシング
- フォントの最適化

## 🧪 テスト

```bash
# ユニットテスト（Vitest）
npm run test

# E2Eテスト（Playwright）
npm run test:e2e

# 型チェック
npm run type-check

# リント
npm run lint
```

## 🤝 コントリビューション

プルリクエストを歓迎します！

1. フォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add some amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- デザイン: shadcn/ui, Tailwind CSS
- データ: 各大会公式サイト
- アイコン: Lucide Icons

## 📞 お問い合わせ

- Email: contact@ekiden-results.com
- Website: https://ekiden-results.com

---

## 🔍 改善提案

詳細な改善提案は [IMPROVEMENTS.md](IMPROVEMENTS.md) を参照してください。

プロのエンジニアによる包括的なレビューと、優先度付けされた実装ロードマップを掲載しています。
