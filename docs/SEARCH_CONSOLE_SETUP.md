# Search Console & Webmaster Tools 登録ガイド

## Google Search Console 登録確認

### 1. Google Search Console へのアクセス
https://search.google.com/search-console

### 2. プロパティの追加
- サイトURL: `https://ekiden-results.com`
- 所有権の確認方法（推奨順）:
  1. **HTMLタグ** - `<head>`タグ内に確認タグを追加
  2. **HTMLファイル** - ルートディレクトリにHTMLファイルをアップロード
  3. **Google Analytics** - GAアカウントを使用
  4. **Google Tag Manager** - GTMコンテナを使用
  5. **DNSレコード** - TXTレコードを追加

### 3. 確認方法（HTMLタグ推奨）

#### app/layout.tsx に追加
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Search Console 確認タグ */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### 4. サイトマップの送信
登録後、以下のサイトマップを送信:
- `https://ekiden-results.com/sitemap.xml`

### 5. 確認すべき項目

#### a. インデックスカバレッジ
- インデックス済みページ数を確認
- エラーページがないかチェック
- 除外ページの理由を確認

#### b. 検索パフォーマンス
- クリック数
- 表示回数
- 平均CTR
- 平均掲載順位
- 上位クエリ
- 上位ページ

#### c. モバイルユーザビリティ
- モバイルフレンドリーテスト合格
- エラーなし

#### d. Core Web Vitals
- LCP（Largest Contentful Paint）: 2.5秒以下
- FID（First Input Delay）: 100ms以下
- CLS（Cumulative Layout Shift）: 0.1以下

### 6. 定期チェック（週1回）
```
□ 新規インデックスページ数
□ クロールエラーの有無
□ 検索パフォーマンスの推移
□ モバイルユーザビリティ問題
□ セキュリティ問題の有無
```

---

## Bing Webmaster Tools 登録確認

### 1. Bing Webmaster Tools へのアクセス
https://www.bing.com/webmasters

### 2. サイトの追加
- サイトURL: `https://ekiden-results.com`
- 所有権の確認方法:
  1. **XMLファイル** - ルートディレクトリにXMLファイルをアップロード
  2. **メタタグ** - `<head>`タグ内に確認タグを追加
  3. **CNAME レコード** - DNSにCNAMEレコードを追加
  4. **Google Search Console からインポート** ★推奨（最速）

### 3. Google Search Console からのインポート（推奨）

#### 手順:
1. Bing Webmaster Tools にサインイン
2. "Import from Google Search Console" を選択
3. Googleアカウントで認証
4. インポートするプロパティを選択
5. 自動でサイトマップもインポート

**メリット:**
- 即座に登録完了
- サイトマップも自動設定
- 手間なし

### 4. 確認すべき項目

#### a. サイトスキャン
- SEO問題の有無
- アクセシビリティ問題
- モバイル対応状況

#### b. インデックスページ数
- Bingにインデックスされているページ数
- クロールエラーの確認

#### c. 検索パフォーマンス
- クリック数
- 表示回数
- 平均掲載順位

#### d. バックリンク
- 被リンク元の確認
- リンク品質チェック

### 5. サイトマップ送信
- `https://ekiden-results.com/sitemap.xml`

### 6. SEOレポート
週次で生成されるSEOレポートを確認:
- 重複コンテンツ
- メタディスクリプション不足
- タイトルタグ問題
- 画像altタグ不足

---

## その他の検索エンジン登録

### Yandex Webmaster（ロシア）
https://webmaster.yandex.com/
- 日本でのシェアは低いが、海外からのアクセスも考慮

### Baidu Webmaster Tools（中国）
https://ziyuan.baidu.com/
- 中国からのアクセスがある場合

### Naver Search Advisor（韓国）
https://searchadvisor.naver.com/
- 韓国からのアクセスがある場合

---

## 登録後の初期設定チェックリスト

### Week 1: 登録・確認
- [ ] Google Search Console 登録完了
- [ ] サイトマップ送信完了
- [ ] Bing Webmaster Tools 登録完了（GSCからインポート）
- [ ] 所有権確認完了

### Week 2: 初期データ収集
- [ ] インデックス状況確認
- [ ] クロールエラーチェック
- [ ] モバイルユーザビリティ確認
- [ ] Core Web Vitals 確認

### Week 3: 分析開始
- [ ] 検索パフォーマンスデータ確認
- [ ] 上位クエリ分析
- [ ] CTR分析
- [ ] 掲載順位トラッキング開始

### Week 4: 最適化
- [ ] 検出された問題の修正
- [ ] メタデータ最適化の効果測定
- [ ] インデックスカバレッジ向上施策
- [ ] 次の改善計画立案

---

## よくある問題と対処法

### 1. インデックスされない
**原因:**
- robots.txt でブロックされている
- noindex タグが設定されている
- サイトマップに含まれていない
- 内部リンクがない（孤立ページ）

**対処法:**
```tsx
// app/robots.ts を確認
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://ekiden-results.com/sitemap.xml',
  }
}
```

### 2. モバイルユーザビリティエラー
**原因:**
- テキストが小さすぎる
- クリック要素が近すぎる
- ビューポート設定なし
- コンテンツ幅が画面幅を超える

**対処法:**
```tsx
// app/layout.tsx の viewport 設定を確認
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}
```

### 3. Core Web Vitals 不合格
**原因:**
- 画像サイズが大きすぎる
- JavaScriptが多すぎる
- レンダリングブロックリソース
- レイアウトシフト

**対処法:**
- 画像最適化（WebP変換）
- 遅延ロード実装
- フォントプリロード
- CLS対策（width/height指定）

---

## 月次レポートテンプレート

### 検索パフォーマンス
| 指標 | 今月 | 先月 | 変化 |
|---|---|---|---|
| クリック数 | - | - | - |
| 表示回数 | - | - | - |
| 平均CTR | - | - | - |
| 平均掲載順位 | - | - | - |

### インデックス状況
| 項目 | 今月 | 先月 | 変化 |
|---|---|---|---|
| インデックス済み | - | - | - |
| エラー | - | - | - |
| 除外 | - | - | - |

### Core Web Vitals
| 指標 | デスクトップ | モバイル | 基準 |
|---|---|---|---|
| LCP | - | - | < 2.5秒 |
| FID | - | - | < 100ms |
| CLS | - | - | < 0.1 |

### アクション項目
1. 
2. 
3. 

---

## 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters/)
- [Bing Webmaster Tools ガイド](https://www.bing.com/webmasters/help/)
- [構造化データテストツール](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## 次のステップ

1. ✅ Google Search Console 登録
2. ✅ Bing Webmaster Tools 登録
3. ⬜ 週次モニタリング設定
4. ⬜ 月次レポート作成
5. ⬜ 継続的な最適化
