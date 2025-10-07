# ブログ機能の復元手順

ブログ機能は一時的に無効化されています。準備ができたら以下の手順で復元してください。

## 📋 無効化された内容

### 1. **ページ**
- `app/blog/` → `app/blog.disabled/` にリネーム
  - ブログ一覧ページ: `app/blog.disabled/page.tsx`
  - 記事詳細ページ: `app/blog.disabled/[slug]/page.tsx`

### 2. **コンポーネント**
- `components/blog/` → `components/blog.disabled/` にリネーム
  - `components/blog.disabled/LatestArticles.tsx` - トップページの新着記事セクション

### 3. **コード修正**
- `app/page.tsx` - LatestArticlesコンポーネントのインポートと表示をコメントアウト
- `components/Header.tsx` - ブログリンク（デスクトップ・モバイル）をコメントアウト

---

## 🔄 復元手順

### ステップ 1: ディレクトリ名を戻す

```bash
# ブログページを復元
mv app/blog.disabled app/blog

# ブログコンポーネントを復元
mv components/blog.disabled components/blog
```

### ステップ 2: app/page.tsx を編集

`app/page.tsx` の以下のコメントを解除：

```tsx
// 【修正前】
// 【一時的に非表示】ブログ記事セクション - 準備ができたら以下のコメントを解除
// const LatestArticles = dynamic(() => import("@/components/blog/LatestArticles"), {
//   loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-16"></div>,
//   ssr: true
// })

// 【修正後】
const LatestArticles = dynamic(() => import("@/components/blog/LatestArticles"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-16"></div>,
  ssr: true
})
```

```tsx
// 【修正前】
{/* 【一時的に非表示】新着ブログ記事セクション - 準備ができたら以下のコメントを解除 */}
{/* <LatestArticles /> */}

// 【修正後】
{/* 新着ブログ記事セクション */}
<LatestArticles />
```

### ステップ 3: components/Header.tsx を編集

#### デスクトップ版ブログリンク（144行目付近）

```tsx
// 【修正前】
{/* 【一時的に非表示】ブログリンク - 準備ができたら以下のコメントを解除 */}
{/* <Link
  href="/blog"
  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 relative group"
>
  ブログ
  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 transition-all duration-300"></span>
</Link> */}

// 【修正後】
{/* ブログリンク */}
<Link
  href="/blog"
  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 relative group"
>
  ブログ
  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 transition-all duration-300"></span>
</Link>
```

#### モバイル版ブログリンク（297行目付近）

```tsx
// 【修正前】
{/* 【一時的に非表示】ブログリンク (Mobile) - 準備ができたら以下のコメントを解除 */}
{/* <Link
  href="/blog"
  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
  onClick={() => setIsMenuOpen(false)}
>
  ブログ
</Link> */}

// 【修正後】
{/* ブログリンク (Mobile) */}
<Link
  href="/blog"
  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
  onClick={() => setIsMenuOpen(false)}
>
  ブログ
</Link>
```

### ステップ 4: 開発サーバーを再起動

```bash
npm run dev
```

---

## ✅ 確認事項

復元後、以下を確認してください：

1. **トップページ** (http://localhost:3000/)
   - 新着ブログ記事セクションが表示されること

2. **ヘッダー**
   - デスクトップ版：「ブログ」リンクが表示されること
   - モバイル版：ハンバーガーメニューに「ブログ」が表示されること

3. **ブログページ** (http://localhost:3000/blog/)
   - ブログ一覧ページが正常に表示されること

4. **記事詳細ページ**
   - http://localhost:3000/blog/izumo-2025-guide/
   - http://localhost:3000/blog/vaporfly-3-review/
   - WordPress記事がiframeで表示されること

---

## 📝 関連ファイル

### ブログ関連のデータファイル
- `data/wordpress-articles.ts` - WordPress記事の設定
- `content/race-preview/` - レース情報記事（MDX）
- `content/gear-review/` - ギアレビュー記事（MDX）
- `public/articles.json` - 自動生成される記事一覧データ

### WordPress統合
- WordPressサイト: https://ekiden-results.com/WordPress/
- 記事URL例: https://ekiden-results.com/WordPress/izumoekiden-2025-guide/

---

## 🛠️ トラブルシューティング

### ビルドエラーが出る場合

```bash
# キャッシュをクリア
rm -rf .next
npm run dev
```

### 画像404エラーが出る場合

OG画像はデフォルト画像を使用するように設定されています：
- `https://ekiden-results.com/WordPress/wp-content/uploads/2025/10/ekiden3.png`

---

**作成日**: 2025年10月7日  
**最終更新**: 2025年10月7日
