# 駅伝情報サイト - EKIDEN

## 🎯 概要
日本の駅伝競技に関する総合情報サイトです。箱根駅伝、出雲駅伝、全日本大学駅伝など、主要な駅伝大会の結果や選手情報を提供します。

## 🚀 技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ホスティング**: エックスサーバー

## 📦 自動デプロイ
GitHub Actionsを使用して、mainブランチへのpush時に自動的にエックスサーバーへデプロイされます。

✅ **デプロイ設定完了** (2025年10月9日)

詳細は [GitHub Actions FTP設定ガイド](./docs/GITHUB_ACTIONS_FTP_SETUP.md) を参照してください。

## 🌐 サイトURL
https://ekiden-results.com

## 💻 ローカル開発

### インストール
```bash
npm install
```

### 環境変数の設定（オプション）
Google Analyticsを使用する場合、`.env.local` ファイルを作成して環境変数を設定してください。

詳細は [環境変数設定ガイド](./docs/ENV_SETUP.md) を参照してください。

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

## 📝 ドキュメント
- [SEO改善プラン](./docs/SEO_IMPROVEMENT_PLAN.md)
- [コンテンツ構造ガイド](./docs/CONTENT_STRUCTURE_GUIDE.md)
- [内部リンク戦略](./docs/INTERNAL_LINK_STRATEGY.md)
- [GitHub Actions FTP設定](./docs/GITHUB_ACTIONS_FTP_SETUP.md)

## 📊 主要コンテンツ
- 箱根駅伝の歴史と記録
- 大学駅伝チーム情報
- 選手プロフィール
- レース結果とデータ分析

---

**Last Updated**: 2025年10月9日
