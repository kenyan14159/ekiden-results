# プロジェクト構造ガイド

このドキュメントは、EKIDENサイトの記事管理とデータ構造について説明します。

## 📁 ディレクトリ構造

```
EKIDEN/
├── app/                    # Next.js App Router
│   ├── ekiden/            # 駅伝リザルトページ（既存）
│   ├── blog/              # 収益化記事（新規）
│   ├── athletes/          # 選手データベース（新規）
│   └── information/       # 必須ページ（既存）
│
├── content/               # MDX記事ファイル（新規）
│   ├── race-preview/     # レース事前情報
│   ├── race-report/      # レース速報・分析
│   └── gear-review/      # ギアレビュー
│
├── data/                  # 構造化データ
│   ├── results/          # リザルトデータ（既存）
│   ├── athletes/         # 選手データ（新規・JSON）
│   └── products/         # 商品データ（新規・JSON）
│
├── components/
│   ├── blog/             # ブログ用コンポーネント
│   ├── affiliate/        # アフィリエイト用コンポーネント
│   └── athletes/         # 選手用コンポーネント
│
└── types/
    ├── content.ts        # コンテンツの型定義
    └── ekiden.ts         # 既存の型定義
```

## 📝 記事の作成方法

### 1. MDXファイルを作成

`content/` 配下の適切なカテゴリに `.mdx` ファイルを作成します。

**ファイル名 = URL slug** になります。

例: `content/race-preview/izumo-2025-guide.mdx`
→ URL: `/blog/race-preview/izumo-2025-guide`

### 2. フロントマターを記述

記事の先頭にメタデータを記述します：

```yaml
---
slug: "izumo-2025-guide"
title: "出雲駅伝2025 完全ガイド"
description: "出雲駅伝の見どころを徹底解説"
category: "race-preview"
tags: ["出雲駅伝", "2025"]
date: "2025-10-07"
author: "元箱根ランナー"
hasAffiliateLinks: true
mainProducts: ["nike-vaporfly-3"]
---
```

### 3. 本文を執筆

通常のMarkdownで記事を書きます。

特別なコンポーネントも使用できます：

```jsx
<ProductCard id="nike-vaporfly-3" />
<AmazonLink productId="nike-vaporfly-3" />
<ComparisonTable products={["nike-vaporfly-3", "adidas-adios-pro-evo1"]} />
```

## 👥 選手データの管理

### JSONファイルで管理

`data/athletes/` 配下にJSONファイルを作成します。

**大学ごとにファイルを分ける**ことを推奨：

```
data/athletes/
├── aoyama-gakuin.json    # 青山学院大学の選手
├── komazawa.json          # 駒澤大学の選手
└── kokugakuin.json        # 國學院大學の選手
```

### データ構造

```json
[
  {
    "id": "aoyamagakuin-kondou-yuudai",
    "name": "近藤幸太郎",
    "nameKana": "こんどう こうたろう",
    "university": "青山学院大学",
    "grade": 4,
    "records": {
      "5000m": "13:34.88",
      "10000m": "27:23.87"
    },
    "hakone": [
      {
        "year": 2023,
        "section": 2,
        "time": "1:06:45",
        "rank": 1
      }
    ],
    "shoes": {
      "brand": "Nike",
      "model": "ZoomX Vaporfly Next% 3",
      "productId": "nike-vaporfly-3"
    }
  }
]
```

詳しい型定義は `types/content.ts` を参照してください。

## 🛍️ 商品データの管理

### JSONファイルで管理

`data/products/` 配下に商品タイプごとのJSONファイルを作成：

```
data/products/
├── shoes.json      # シューズ
├── watches.json    # GPSウォッチ
└── wear.json       # ウェア
```

### データ構造

```json
[
  {
    "id": "nike-vaporfly-3",
    "type": "shoes",
    "brand": "Nike",
    "name": "ZoomX Vaporfly Next% 3",
    "price": {
      "list": 33000,
      "amazon": 29800
    },
    "links": {
      "amazon": "https://amzn.to/xxxxx",
      "rakuten": "https://hb.afl.rakuten.co.jp/xxxxx"
    },
    "specs": {
      "weight": 196,
      "drop": 8
    },
    "reviewArticle": "vaporfly-3-review"
  }
]
```

## 🎯 カテゴリ別の記事タイプ

### race-preview（レース事前情報）
- 大会ガイド記事
- 注目選手紹介
- シューズ予測記事
- 初心者向け観戦ガイド

**投稿タイミング**: 大会1週間前～前日

### race-report（レース速報・分析）
- リアルタイム速報
- シューズシェア分析
- 区間分析
- 優勝校の戦略解説

**投稿タイミング**: 大会当日～翌日

### gear-review（ギアレビュー）
- シューズレビュー（最重要）
- GPSウォッチレビュー
- ウェアレビュー
- 比較記事

**投稿タイミング**: 常時（週1-2本）

## 📊 記事執筆のベストプラクティス

### 1. SEOを意識したタイトル
```
❌ 「Vaporfly 3がすごい」
✅ 「Nike Vaporfly 3 徹底レビュー｜箱根駅伝出場選手が実際に履いて評価」
```

### 2. 実体験を必ず入れる
- 自分が実際に使った感想
- 箱根駅伝での経験
- 具体的な数値（タイム、距離、ペース）

### 3. 比較表を活用
- 他商品との違いを明確に
- 読者が選びやすい情報を提供

### 4. 内部リンクを張る
- リザルトサイトへのリンク
- 関連記事へのリンク
- 選手プロフィールへのリンク

### 5. アフィリエイトリンクは自然に
- 記事の最後に商品リンク
- 比較表に含める
- 「最安値で購入する方法」セクションを設ける

## 🚀 出雲駅伝までのロードマップ

### 10月7日（今日）
- [ ] ASP登録（A8.net, Amazon, 楽天）
- [ ] 記事1本目を執筆開始

### 10月8日
- [ ] 出雲駅伝ガイド記事を公開
- [ ] Vaporfly 3レビュー記事を公開

### 10月9-12日
- [ ] シューズ予測記事を公開
- [ ] 初心者向けガイドを公開
- [ ] もう1本シューズレビューを追加

### 10月13日（出雲駅伝当日）
- [ ] リアルタイム速報実施
- [ ] 使用シューズを特定

### 10月14日
- [ ] シューズシェア分析記事を公開（最重要！）

## 💡 Tips

### ファイル命名規則
- **小文字とハイフン**を使用: `izumo-2025-guide.mdx`
- **日本語は使わない**: `出雲駅伝.mdx` ❌
- **年号を含める**: `izumo-2025-shoes.mdx` ✅

### 画像の管理
```
public/images/
├── og/              # OGP画像
├── products/        # 商品画像
├── athletes/        # 選手写真
└── races/           # レース写真
```

### コンポーネントの再利用
- `<ProductCard>`: 商品カード表示
- `<AmazonLink>`: Amazonアフィリエイトリンク
- `<RakutenLink>`: 楽天アフィリエイトリンク
- `<ComparisonTable>`: 商品比較表

## ❓ よくある質問

**Q: 記事の文字数は？**
A: 最低2,000文字。できれば3,000文字以上。

**Q: 画像は必須？**
A: OGP画像は必須。記事内の画像は3-5枚推奨。

**Q: 更新頻度は？**
A: 大会前後は毎日。通常期は週2-3本。

**Q: アフィリエイトリンクの数は？**
A: 1記事あたり3-5個。多すぎると逆効果。

## 📚 参考リソース

- 型定義: `types/content.ts`
- サンプル選手データ: `data/athletes/athletes-sample.json`
- サンプル商品データ: `data/products/shoes.json`
- サンプル記事: `content/race-preview/izumo-2025-guide.mdx`

---

このガイドに従って、シンプルかつ効率的にコンテンツを管理しましょう！
