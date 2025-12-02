# Cloudflare Pages デプロイガイド

このドキュメントでは、ekiden-results.comをCloudflare Pagesにデプロイする手順を説明します。

## 前提条件

- Cloudflareアカウント
- GitHubリポジトリ: `kenyan14159/ekiden-results`
- ドメイン: `ekiden-results.com`（Cloudflareで管理されていること）

## デプロイ手順

### 1. Cloudflare Pagesプロジェクトの作成

1. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログイン
2. 左サイドバーから「Workers & Pages」を選択
3. 「Pages」タブをクリック
4. 「プロジェクトを作成」または「Create a project」をクリック
5. 「GitHubと接続」を選択してGitHubアカウントを連携（初回のみ）

### 2. リポジトリの接続とビルド設定

1. 「リポジトリを選択」で `kenyan14159/ekiden-results` を選択
2. 「プロジェクト名を設定」で `ekiden-results` と入力
3. 「ビルド設定」セクションで以下を設定：

   **フレームワークプリセット**: `Next.js (Static HTML Export)`
   
   **ビルドコマンド**:
   ```bash
   npm run build
   ```
   
   **ビルド出力ディレクトリ**:
   ```
   out
   ```
   
   **ルートディレクトリ**: `/`（プロジェクトルート）

4. 「環境変数」セクション（必要に応じて設定）
   - 現在は環境変数なしで動作するはずです

5. 「保存してデプロイ」をクリック

### 3. カスタムドメインの設定

1. デプロイが完了したら、プロジェクトページの「カスタムドメイン」セクションに移動
2. 「カスタムドメインを設定」をクリック
3. `ekiden-results.com` を入力
4. CloudflareのDNS設定で以下を確認：
   - `ekiden-results.com` がCloudflareで管理されていること
   - 必要に応じてDNSレコードを設定

### 4. 自動デプロイの設定

デフォルトで、`main` ブランチへのプッシュ時に自動デプロイが実行されます。

**プロダクションブランチ**: `main`
**プレビューデプロイ**: プルリクエストごとに自動的にプレビュー環境が作成されます

## ファイル構成

### 設定ファイル

- `wrangler.toml`: Cloudflare Pages/Workersの設定ファイル
- `public/_headers`: カスタムHTTPヘッダー設定（セキュリティ、キャッシュ制御）
- `public/_redirects`: リダイレクト設定

### ビルド出力

- `out/`: Next.jsの静的エクスポート出力ディレクトリ
- `.gitignore` に含まれているため、リポジトリには含まれません

## パフォーマンス最適化

### キャッシュ設定

`public/_headers` ファイルで以下のキャッシュ設定を適用しています：

- **HTML**: 1時間キャッシュ
- **CSS/JS**: 1年間キャッシュ（immutable）
- **画像**: 1年間キャッシュ（immutable）
- **JSONデータ**: 1時間キャッシュ

### Cloudflareの追加機能

Cloudflare Pagesでは以下の機能も利用できます：

- **自動HTTPS**: すべてのリクエストがHTTPSで配信されます
- **CDN**: グローバルCDNによる高速配信
- **DDoS保護**: 自動的なDDoS攻撃対策
- **Web Analytics**: トラフィック分析（オプション）

## トラブルシューティング

### ビルドエラー

1. ローカルでビルドを実行して確認：
   ```bash
   npm run build
   ```
2. ビルドログを確認してエラーを特定
3. 環境変数が必要な場合は、Cloudflare Pagesの環境変数設定で追加

### 404エラー

- Next.jsの静的エクスポートでは、すべてのページが事前に生成される必要があります
- 動的ルート（`[slug]`など）は静的生成に対応していることを確認

### カスタムドメインが動作しない

1. DNS設定を確認（Cloudflareで管理されていること）
2. SSL/TLS設定を確認（「フル」または「フル（厳密）」を推奨）
3. ドメインのプロパゲーションを待つ（最大24時間）

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Next.js Static HTML Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages カスタムドメイン](https://developers.cloudflare.com/pages/platform/custom-domains/)

