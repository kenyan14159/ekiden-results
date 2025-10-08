# メタデータ最適化 クイックガイド

## 📋 Week 1 完了サマリー

### ✅ 実装完了（27ページ）
- 駅伝大会一覧ページ: 14ページ
- 概要ページ: 7ページ
- 情報ページ: 5ページ
- ルートレイアウト: metadataBase設定

### 📁 作成ファイル一覧

#### 1. コアユーティリティ
```
lib/metadata-utils.ts        # メタデータ生成関数
```

#### 2. 駅伝大会 layout.tsx（14件）
```
app/ekiden/hakone/layout.tsx
app/ekiden/newyear/layout.tsx
app/ekiden/queens/layout.tsx
app/ekiden/izumo/layout.tsx
app/ekiden/zenjitsu/layout.tsx
app/ekiden/fujisan/layout.tsx
app/ekiden/morinomiyako/layout.tsx
app/ekiden/miyakooji-men/layout.tsx
app/ekiden/miyakooji-women/layout.tsx
app/ekiden/prefecture-women/layout.tsx
app/ekiden/hiroshima/layout.tsx
app/ekiden/junior-high-men/layout.tsx
app/ekiden/junior-high-women/layout.tsx
app/ekiden/mixed-gender/layout.tsx
```

#### 3. 情報ページ layout.tsx（5件）
```
app/information/scoring-table/layout.tsx
app/information/privacy-policy/layout.tsx
app/information/contact/layout.tsx
app/information/disclaimer/layout.tsx
app/information/operator-information/layout.tsx
```

#### 4. ドキュメント（3件）
```
docs/METADATA_AUDIT_REPORT.md        # 監査レポート
docs/SEARCH_CONSOLE_SETUP.md         # Search Console設定ガイド
docs/WEEK1_COMPLETION_REPORT.md      # 完了レポート
```

---

## 🎯 メタデータの特徴

### タイトルタグの構造
```
[大会名][年度?]結果[速報?] | [キーワード]・[カテゴリー]
```

**例:**
- 一覧: `箱根駅伝結果一覧 | 歴代優勝チーム・記録【大学駅伝】`
- 年度別: `箱根駅伝2025結果速報 | 区間記録・優勝青山学院大学・成績一覧`
- 概要: `箱根駅伝とは | 大会概要・コース・歴史【完全ガイド】`

### ディスクリプションの構造
```
[大会名]の[内容]。[具体的な情報]。[開催情報][詳細説明]。
```

**文字数:** 120文字前後（最大160文字）

### キーワード設定
- 大会名
- 大会名 + 年度
- 大会名 + "結果"/"記録"/"速報"
- カテゴリー（実業団/大学/高校/中学）
- 固有キーワード（往路/復路/シード権など）

---

## 🔧 使い方

### 新しい大会を追加する場合

#### 1. `lib/metadata-utils.ts` に定義追加
```typescript
export const RACE_METADATA: Record<string, RaceMetadata> = {
  // ... 既存の定義
  'new-race': {
    name: '新規駅伝',
    nameEn: 'New Race Ekiden',
    shortName: '新規',
    category: '大学',
    season: '12月',
    keywords: ['キーワード1', 'キーワード2']
  }
}
```

#### 2. layout.tsx を作成
```typescript
// app/ekiden/new-race/layout.tsx
import type { Metadata } from 'next'
import { generateRaceListMetadata } from '@/lib/metadata-utils'

export const metadata: Metadata = generateRaceListMetadata('new-race')

export default function NewRaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

これだけで完了！

---

## 📊 効果測定方法

### Google Search Console で確認
1. `https://search.google.com/search-console` にアクセス
2. 「検索パフォーマンス」を確認
   - クリック数の推移
   - 表示回数の増加
   - 平均CTRの向上（目標: +15-25%）
   - 平均掲載順位の上昇

### Rich Results Test
1. `https://search.google.com/test/rich-results` にアクセス
2. URLを入力してテスト
3. エラーがないか確認

### 確認すべきメトリクス

| 指標 | 現状（想定） | 1ヶ月後目標 | 3ヶ月後目標 |
|---|---|---|---|
| 月間PV | 5,000 | 15,000 | 30,000 |
| オーガニック流入 | 3,000 | 10,000 | 25,000 |
| 平均CTR | 2-3% | 3-4% | 4-5% |
| TOP10入りキーワード | 5個 | 15個 | 30個 |

---

## 🚀 次のステップ（Week 2）

### 1. 残りのページのメタデータ設定
- [ ] 年度別詳細ページ（動的）の実装完了
  - ニューイヤー駅伝
  - クイーンズ駅伝
  - 出雲駅伝
  - その他11大会

### 2. Search Console 登録
```html
<!-- app/layout.tsx に追加 -->
<meta name="google-site-verification" content="YOUR_CODE" />
```

### 3. Bing Webmaster Tools 登録
- Google Search Console からインポート（推奨）

### 4. 効果測定開始
- Search Console データ収集
- インデックス状況確認
- CTR分析

---

## 📝 メンテナンス

### 定期チェック項目（週次）
- [ ] 新規インデックスページ数
- [ ] クロールエラーの有無
- [ ] 検索パフォーマンス
- [ ] CTRの推移
- [ ] 掲載順位の変動

### メタデータ更新タイミング
- 大会結果更新時
- 新規年度データ追加時
- 優勝チーム確定時
- キーワード戦略変更時

---

## 🛠️ トラブルシューティング

### メタデータが反映されない
**原因:** キャッシュ
**対処法:**
```bash
rm -rf .next
npm run build
```

### ビルドエラー
**原因:** TypeScript型エラー
**対処法:**
```bash
npm run lint
# エラー箇所を修正
```

### metadataBase警告
**原因:** ルートlayout.tsxでmetadataBase未設定
**対処法:**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://ekiden-results.com'),
  // ...
}
```

---

## 📚 参考リソース

### 公式ドキュメント
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org - SportsEvent](https://schema.org/SportsEvent)

### 社内ドキュメント
- `docs/METADATA_AUDIT_REPORT.md` - 監査レポート
- `docs/SEARCH_CONSOLE_SETUP.md` - 設定ガイド
- `docs/WEEK1_COMPLETION_REPORT.md` - 完了レポート

---

## ✅ チェックリスト

### 新規ページ作成時
- [ ] `lib/metadata-utils.ts` に大会定義追加
- [ ] `layout.tsx` 作成
- [ ] ビルドエラーチェック
- [ ] Rich Results Test 実行
- [ ] Search Console でインデックス確認

### メタデータ更新時
- [ ] タイトル32文字以内
- [ ] ディスクリプション120文字前後
- [ ] キーワード適切に設定
- [ ] OpenGraph / Twitter Card 対応
- [ ] Canonical URL 正しい

---

**更新日:** 2025年10月8日  
**バージョン:** 1.0  
**ステータス:** Week 1 完了
