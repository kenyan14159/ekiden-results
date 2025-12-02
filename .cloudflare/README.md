# Cloudflare Pages デプロイ設定

このディレクトリには、Cloudflare Pages用の設定ファイルが含まれます。

## デプロイ手順

1. Cloudflareダッシュボードにログイン
2. Pagesセクションに移動
3. 「プロジェクトを作成」をクリック
4. GitHubリポジトリを接続: `kenyan14159/ekiden-results`
5. ビルド設定:
   - **フレームワークプリセット**: Next.js (Static HTML Export)
   - **ビルドコマンド**: `npm run build`
   - **ビルド出力ディレクトリ**: `out`
   - **ルートディレクトリ**: `/` (プロジェクトルート)
6. 環境変数（必要に応じて設定）
7. 「保存してデプロイ」をクリック

## カスタムドメイン設定

1. Cloudflare Pagesプロジェクトの「カスタムドメイン」セクションに移動
2. 「カスタムドメインを設定」をクリック
3. `ekiden-results.com` を入力
4. CloudflareのDNS設定でドメインを確認

## 注意事項

- 静的エクスポート（`output: 'export'`）を使用しているため、サーバーサイド機能は使用できません
- `_headers` と `_redirects` ファイルは `public` ディレクトリに配置してください（ビルド時に `out` ディレクトリにコピーされます）

