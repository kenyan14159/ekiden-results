# 駅伝リザルト

全国の駅伝大会の結果情報を提供するWebサイトです。

## 🏃 概要

実業団駅伝、大学駅伝、高校駅伝、中学駅伝など、日本全国の主要な駅伝大会の結果を美しく、分かりやすく掲載しています。

### 掲載大会

- **実業団駅伝**: ニューイヤー駅伝、クイーンズ駅伝
- **大学駅伝**: 箱根駅伝、全日本大学駅伝、出雲駅伝、杜の都駅伝、富士山女子駅伝
- **高校駅伝**: 都大路（男子・女子）
- **中学駅伝**: 全国中学駅伝（男子・女子）
- **その他**: ひろしま駅伝、都道府県対抗女子駅伝

## 🛠 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Language**: TypeScript

## 📦 インストール

```bash
npm install
```

## 🚀 開発環境

```bash
npm run dev
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

## 🏗 ビルド

```bash
npm run build
npm start
```

## 🔒 セキュリティ

- HSTS (Strict-Transport-Security) 設定済み
- X-Frame-Options 設定済み
- X-Content-Type-Options 設定済み
- Content Security Policy 設定済み
- Google AdSense対応

## 📊 環境変数

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# Google Analytics ID (オプション)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 本番環境のURL
NEXT_PUBLIC_SITE_URL=https://ekiden-results.com
```

## 📝 ライセンス

© 2025 駅伝リザルト. All rights reserved.

## 📧 お問い合わせ

サイトに関するご質問、ご意見は[お問い合わせフォーム](https://ekiden-results.com/information/contact)よりご連絡ください。
