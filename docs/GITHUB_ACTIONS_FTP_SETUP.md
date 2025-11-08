# GitHub Actions FTPデプロイ設定ガイド

## 📋 概要
このガイドでは、GitHub Actionsを使用してエックスサーバーへ自動的にFTPデプロイする設定手順を説明します。

## 🔐 セキュリティに関する重要な注意事項

⚠️ **FTP接続情報は絶対にコードに直接書き込まないでください！**
必ずGitHub Secretsに保存してください。

---

## ステップ1: GitHub Secretsの設定

### 1.1 GitHubリポジトリにアクセス
1. ブラウザで https://github.com/kenyan14159/ekiden にアクセス
2. ログインしていることを確認

### 1.2 Settings > Secrets and variables > Actions に移動
1. リポジトリページ上部の **Settings** タブをクリック
2. 左サイドバーの **Secrets and variables** を展開
3. **Actions** をクリック

### 1.3 New repository secret をクリックして以下の3つを登録

#### Secret 1: FTP_SERVER
- **Name**: `FTP_SERVER`
- **Value**: `あなたのFTPサーバーアドレス` (例: `sv16346.xserver.jp`)
- **Add secret** をクリック

#### Secret 2: FTP_USERNAME
- **Name**: `FTP_USERNAME`
- **Value**: `あなたのFTPユーザー名` (例: `your-username`)
- **Add secret** をクリック

#### Secret 3: FTP_PASSWORD
- **Name**: `FTP_PASSWORD`
- **Value**: `あなたのFTPパスワード` (例: `your-secure-password`)
- **Add secret** をクリック

⚠️ **重要**: 実際の認証情報は絶対にこのドキュメントに記載しないでください。GitHub Secretsにのみ保存してください。

### 1.4 設定完了の確認
3つのSecretが登録されていることを確認してください：
- ✅ FTP_SERVER
- ✅ FTP_USERNAME
- ✅ FTP_PASSWORD

---

## ステップ2: ワークフローファイルの確認

`.github/workflows/deploy.yml` ファイルが作成されています。
このファイルには以下の機能が含まれています：

- ✅ mainブランチへのpush時に自動実行
- ✅ Node.js 20のセットアップ
- ✅ 依存関係のインストール
- ✅ Next.jsアプリケーションのビルド
- ✅ FTP経由でのデプロイ
- ✅ 手動実行も可能（workflow_dispatch）

---

## ステップ3: デプロイの実行

### 3.1 自動デプロイ
mainブランチにpushすると自動的にデプロイされます：

```bash
git add .
git commit -m "Deploy configuration added"
git push origin main
```

### 3.2 手動デプロイ
GitHubのUIから手動で実行することもできます：

1. リポジトリの **Actions** タブをクリック
2. 左サイドバーから **Deploy to Xserver via FTP** を選択
3. **Run workflow** をクリック
4. ブランチを選択（通常はmain）
5. **Run workflow** ボタンをクリック

---

## ステップ4: デプロイの確認

### 4.1 GitHub Actionsでの確認
1. リポジトリの **Actions** タブを開く
2. 最新のワークフロー実行を確認
3. 緑色のチェックマーク✅が表示されれば成功

### 4.2 各ステップの確認
ワークフロー実行をクリックすると、以下のステップが表示されます：
- Checkout code
- Setup Node.js
- Install dependencies
- Build Next.js application
- Create deployment package
- Deploy to Xserver via FTP
- Deployment completed

### 4.3 ウェブサイトでの確認
デプロイ完了後、以下のURLでサイトが正しく表示されることを確認：
- https://ekiden-results.com

---

## 🔧 トラブルシューティング

### エラー: Authentication failed
**原因**: FTP接続情報が正しくない
**解決策**: 
- GitHub Secretsの設定を再確認
- FTP_SERVER、FTP_USERNAME、FTP_PASSWORDが正しいか確認
- エックスサーバーのコントロールパネルでFTP情報を再確認

### エラー: Build failed
**原因**: ビルドプロセスでエラーが発生
**解決策**:
- ローカルで `npm run build` を実行してエラーを確認
- package.jsonの依存関係を確認
- エラーログを詳しく確認

### エラー: FTP upload failed
**原因**: FTPサーバーへの接続やアップロードに問題
**解決策**:
- server-dirのパスを確認: `/ekiden-results.com/public_html/`
- エックスサーバーのFTP接続制限を確認
- ファイルサイズやディスク容量を確認

### デプロイは成功するが、サイトが表示されない
**原因**: Next.jsの設定やサーバーの設定に問題
**解決策**:
- next.config.jsで `output: 'export'` が設定されているか確認
- .htaccessファイルの設定を確認
- サーバー側のパスが正しいか確認

---

## 📝 重要な設定オプション

### デプロイディレクトリの変更
サーバー上のデプロイ先を変更する場合は、`deploy.yml` の以下の行を編集：

```yaml
server-dir: /ekiden-results.com/public_html/
```

### 既存ファイルの削除（危険）
サーバー上の既存ファイルを削除してクリーンなデプロイを行う場合：

```yaml
dangerous-clean-slate: true  # false から true に変更
```

⚠️ **注意**: この設定を有効にすると、サーバー上の指定ディレクトリの内容が完全に削除されます。

### 除外ファイルの設定
アップロードから除外するファイルは `exclude` セクションで設定：

```yaml
exclude: |
  **/.git*
  **/.git*/**
  **/node_modules/**
  **/.DS_Store
```

---

## 🎯 ベストプラクティス

1. **まずテスト環境で試す**: 本番環境への適用前に、テスト環境で動作確認
2. **バックアップを取る**: 重要なデータは必ずバックアップ
3. **段階的にデプロイ**: 初回は `dangerous-clean-slate: false` で実行
4. **ログを確認**: デプロイ後は必ずActionsのログを確認
5. **Secretsの定期更新**: パスワードは定期的に変更し、Secretsも更新

---

## 📞 サポート

問題が解決しない場合：
1. GitHub Actionsのログを詳しく確認
2. エックスサーバーのサポートに問い合わせ
3. Next.jsの公式ドキュメントを参照

---

## ✅ チェックリスト

デプロイ設定完了前に以下を確認：

- [ ] GitHub Secretsに3つの値を設定済み
- [ ] .github/workflows/deploy.yml が存在する
- [ ] ローカルで `npm run build` が成功する
- [ ] .gitignore が適切に設定されている
- [ ] next.config.js の設定を確認済み
- [ ] 初回デプロイをテストした
- [ ] デプロイ後のサイトを確認した

---

## 🔄 更新履歴

- 2025-10-09: 初版作成
