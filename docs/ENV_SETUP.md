# 環境変数設定ガイド

## 📋 概要
このプロジェクトで使用する環境変数の設定方法を説明します。

## 🔧 必要な環境変数

### 必須環境変数
現在、必須の環境変数はありません。

### オプション環境変数

#### `NEXT_PUBLIC_GA_ID`
- **説明**: Google Analyticsの測定ID
- **形式**: `G-XXXXXXXXXX` または `UA-XXXXXXXXX-X`
- **用途**: Google Analyticsによるアクセス解析
- **設定方法**: 
  1. `.env.local` ファイルを作成（プロジェクトルートに）
  2. `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` を追加
  3. 実際のGoogle Analytics IDに置き換える
- **注意**: 設定しない場合、Google Analyticsは動作しませんが、サイトは正常に動作します

#### `NEXT_PUBLIC_SITE_URL`
- **説明**: サイトのURL
- **形式**: `https://ekiden-results.com`
- **用途**: 一部のメタデータ生成で使用（通常は不要）
- **設定方法**: 
  1. `.env.local` ファイルを作成（プロジェクトルートに）
  2. `NEXT_PUBLIC_SITE_URL=https://ekiden-results.com` を追加
- **注意**: 静的エクスポート時は通常不要です

#### `NEXT_PUBLIC_ADSENSE_ID`
- **説明**: Google AdSenseのパブリッシャーID
- **形式**: `ca-pub-XXXXXXXXXX`
- **用途**: Google AdSense広告の表示
- **設定方法**: 
  1. `.env.local` ファイルを作成（プロジェクトルートに）
  2. `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX` を追加
  3. 実際のAdSenseパブリッシャーIDに置き換える
- **注意**: 設定しない場合、デフォルトのIDが使用されます

## 📝 設定手順

### 1. 環境変数ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成します：

```bash
touch .env.local
```

### 2. 環境変数の追加

`.env.local` ファイルに以下のように記述します：

```env
# Google Analytics ID（オプション）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# サイトURL（オプション）
NEXT_PUBLIC_SITE_URL=https://ekiden-results.com
```

### 3. 実際の値に置き換え

- `G-XXXXXXXXXX` を実際のGoogle Analytics IDに置き換え
- `https://ekiden-results.com` を実際のサイトURLに置き換え

## ⚠️ 重要な注意事項

1. **`.env.local` はGitにコミットしないでください**
   - `.gitignore` に既に含まれています
   - 機密情報を含む可能性があるため

2. **本番環境での設定**
   - GitHub Actionsを使用している場合、GitHub Secretsに設定してください
   - エックスサーバーなどのホスティング環境では、環境変数の設定方法を確認してください

3. **環境変数の変更後**
   - 開発サーバーを再起動してください
   - `npm run dev` を停止して再起動

## 🔍 環境変数の確認

環境変数が正しく設定されているか確認するには：

```bash
# 開発サーバー起動時に環境変数が読み込まれます
npm run dev
```

ブラウザのコンソールで確認する場合（開発環境のみ）：

```javascript
console.log(process.env.NEXT_PUBLIC_GA_ID)
```

## 📚 関連ドキュメント

- [Next.js 環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Actions FTP設定](./GITHUB_ACTIONS_FTP_SETUP.md)

