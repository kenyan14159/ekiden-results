# 内部リンク構造設計書
作成日: 2025年10月8日

## 目次
1. [内部リンク戦略の概要](#内部リンク戦略の概要)
2. [サイト構造図](#サイト構造図)
3. [ピラー記事とクラスター記事](#ピラー記事とクラスター記事)
4. [内部リンクルール](#内部リンクルール)
5. [実装計画](#実装計画)

---

## 内部リンク戦略の概要

### 目的
- **SEO効果の最大化**: ページランクの適切な分配
- **ユーザー体験の向上**: 関連情報への容易なアクセス
- **クロール効率の改善**: 検索エンジンボットの効率的な巡回

### 基本方針
1. **トピッククラスター型構造**: ピラー記事を中心にクラスター記事を配置
2. **階層は3レベルまで**: トップページ → カテゴリー → 詳細ページ
3. **関連性の高いページ間のリンク**: 文脈に沿った自然なリンク
4. **すべてのページに3-5個の内部リンク**: バランスの取れたリンク密度

---

## サイト構造図

```
トップページ (/)
│
├─ 実業団駅伝 (#corporate)
│  ├─ ニューイヤー駅伝 (/ekiden/newyear) [ピラー]
│  │  ├─ about (概要)
│  │  ├─ 2025年結果 [クラスター]
│  │  ├─ 2024年結果 [クラスター]
│  │  └─ 歴代結果 (1951-現在) [クラスター]
│  │
│  └─ クイーンズ駅伝 (/ekiden/queens) [ピラー]
│     ├─ about (概要)
│     ├─ 2024年結果 [クラスター]
│     └─ 歴代結果 (1981-現在) [クラスター]
│
├─ 大学駅伝 (#university)
│  ├─ 箱根駅伝 (/ekiden/hakone) [ピラー - 最重要]
│  │  ├─ about (概要・区間特徴)
│  │  ├─ 2025年結果 [クラスター]
│  │  ├─ 2024年結果 [クラスター]
│  │  ├─ 歴代結果 (1920-現在) [クラスター]
│  │  ├─ 歴代優勝校 [クラスター - 追加予定]
│  │  ├─ 区間記録ランキング [クラスター - 追加予定]
│  │  └─ シード権争い [クラスター - 追加予定]
│  │
│  ├─ 出雲駅伝 (/ekiden/izumo) [ピラー]
│  │  ├─ about (概要)
│  │  ├─ 2024年結果 [クラスター]
│  │  └─ 歴代結果 (1989-現在) [クラスター]
│  │
│  ├─ 全日本大学駅伝 (/ekiden/zenjitsu) [ピラー]
│  │  ├─ about (概要)
│  │  ├─ 2024年結果 [クラスター]
│  │  └─ 歴代結果 (1970-現在) [クラスター]
│  │
│  ├─ 富士山女子駅伝 (/ekiden/fujisan) [ピラー]
│  │  ├─ about (概要)
│  │  └─ 歴代結果 [クラスター]
│  │
│  └─ 杜の都駅伝 (/ekiden/morinomiyako) [ピラー]
│     ├─ about (概要)
│     └─ 歴代結果 [クラスター]
│
├─ 高校駅伝 (#highschool)
│  ├─ 都大路 男子 (/ekiden/miyakooji-men) [ピラー]
│  │  └─ 歴代結果 [クラスター]
│  │
│  ├─ 都大路 女子 (/ekiden/miyakooji-women) [ピラー]
│  │  └─ 歴代結果 [クラスター]
│  │
│  └─ ひろしま駅伝 (/ekiden/hiroshima) [ピラー]
│     └─ 歴代結果 [クラスター]
│
├─ 中学駅伝 (#junior-high)
│  ├─ 全国中学男子 (/ekiden/junior-high-men) [ピラー]
│  │  └─ 歴代結果 [クラスター]
│  │
│  └─ 全国中学女子 (/ekiden/junior-high-women) [ピラー]
│     └─ 歴代結果 [クラスター]
│
└─ その他 (#other)
   ├─ 都道府県女子駅伝 (/ekiden/prefecture-women) [ピラー]
   └─ 男女混合駅伝 (/ekiden/mixed-gender) [ピラー]
```

---

## ピラー記事とクラスター記事

### ピラー記事（10本） - サイトの核となる重要ページ

#### 1. 箱根駅伝 (/ekiden/hakone) ★最重要
**優先度:** 最高  
**月間検索ボリューム:** 50,000-100,000  
**役割:** サイトの顔となる最重要ピラー

**クラスター記事:**
- `/ekiden/hakone/2025` - 最新結果
- `/ekiden/hakone/2024` - 前年結果
- `/ekiden/hakone/about` - 大会概要・区間特徴
- `/ekiden/hakone/[1920-2025]` - 歴代結果（100年以上）
- [追加予定] `/ekiden/hakone/records` - 歴代区間記録
- [追加予定] `/ekiden/hakone/champions` - 歴代優勝校
- [追加予定] `/ekiden/hakone/seed-race` - シード権争い

**内部リンク戦略:**
- トップページから直接リンク
- 大学駅伝セクションのトップに配置
- 出雲・全日本との相互リンク（大学三大駅伝）
- 年度別ページ間の前後ナビゲーション

---

#### 2. ニューイヤー駅伝 (/ekiden/newyear)
**優先度:** 高  
**月間検索ボリューム:** 20,000-40,000  
**役割:** 実業団駅伝の代表格

**クラスター記事:**
- `/ekiden/newyear/2025` - 最新結果
- `/ekiden/newyear/2024` - 前年結果
- `/ekiden/newyear/about` - 大会概要
- `/ekiden/newyear/[1951-2025]` - 歴代結果（70年以上）

**内部リンク戦略:**
- トップページから直接リンク
- クイーンズ駅伝との相互リンク（実業団駅伝）
- 1月開催大会（箱根、都道府県対抗）との関連リンク

---

#### 3. クイーンズ駅伝 (/ekiden/queens)
**優先度:** 高  
**月間検索ボリューム:** 15,000-30,000  
**役割:** 実業団女子駅伝の頂点

**クラスター記事:**
- `/ekiden/queens/2024` - 最新結果
- `/ekiden/queens/2023` - 前年結果
- `/ekiden/queens/about` - 大会概要・区間特徴
- `/ekiden/queens/[1981-2024]` - 歴代結果（40年以上）

**内部リンク戦略:**
- トップページから直接リンク
- ニューイヤー駅伝との相互リンク
- 富士山女子駅伝との相互リンク（女子駅伝）

---

#### 4. 出雲駅伝 (/ekiden/izumo)
**優先度:** 高  
**月間検索ボリューム:** 15,000-25,000  
**役割:** 大学三大駅伝の開幕戦

**クラスター記事:**
- `/ekiden/izumo/2024` - 最新結果
- `/ekiden/izumo/2023` - 前年結果
- `/ekiden/izumo/about` - 大会概要
- `/ekiden/izumo/[1989-2024]` - 歴代結果

**内部リンク戦略:**
- 箱根・全日本との相互リンク（大学三大駅伝）
- 10月開催大会（杜の都）との関連リンク

---

#### 5. 全日本大学駅伝 (/ekiden/zenjitsu)
**優先度:** 高  
**月間検索ボリューム:** 15,000-25,000  
**役割:** 大学三大駅伝の中盤戦

**クラスター記事:**
- `/ekiden/zenjitsu/2024` - 最新結果
- `/ekiden/zenjitsu/2023` - 前年結果
- `/ekiden/zenjitsu/about` - 大会概要・区間特徴
- `/ekiden/zenjitsu/[1970-2024]` - 歴代結果

**内部リンク戦略:**
- 箱根・出雲との相互リンク（大学三大駅伝）
- 11月開催大会（クイーンズ）との関連リンク

---

#### 6. 富士山女子駅伝 (/ekiden/fujisan)
**優先度:** 中  
**月間検索ボリューム:** 5,000-10,000  
**役割:** 大学女子駅伝の主要大会

**クラスター記事:**
- `/ekiden/fujisan/2024` - 最新結果
- `/ekiden/fujisan/about` - 大会概要
- `/ekiden/fujisan/[年度]` - 歴代結果

**内部リンク戦略:**
- 杜の都駅伝との相互リンク（大学女子駅伝）
- クイーンズ駅伝との関連リンク（女子駅伝）

---

#### 7. 杜の都駅伝 (/ekiden/morinomiyako)
**優先度:** 中  
**月間検索ボリューム:** 5,000-10,000  
**役割:** 大学女子駅伝の主要大会

**クラスター記事:**
- `/ekiden/morinomiyako/2024` - 最新結果
- `/ekiden/morinomiyako/about` - 大会概要
- `/ekiden/morinomiyako/[年度]` - 歴代結果

**内部リンク戦略:**
- 富士山女子駅伝との相互リンク（大学女子駅伝）
- 出雲駅伝との関連リンク（10月開催）

---

#### 8. 都大路 男子 (/ekiden/miyakooji-men)
**優先度:** 中  
**月間検索ボリューム:** 10,000-15,000  
**役割:** 高校駅伝の代表格

**クラスター記事:**
- `/ekiden/miyakooji-men/[年度]` - 歴代結果

**内部リンク戦略:**
- 都大路女子との相互リンク
- ひろしま駅伝との関連リンク（高校駅伝）

---

#### 9. 都大路 女子 (/ekiden/miyakooji-women)
**優先度:** 中  
**月間検索ボリューム:** 8,000-12,000  
**役割:** 高校女子駅伝の頂点

**クラスター記事:**
- `/ekiden/miyakooji-women/[年度]` - 歴代結果

**内部リンク戦略:**
- 都大路男子との相互リンク
- ひろしま駅伝との関連リンク（高校駅伝）

---

#### 10. ひろしま駅伝 (/ekiden/hiroshima)
**優先度:** 中  
**月間検索ボリューム:** 5,000-10,000  
**役割:** 都道府県対抗駅伝

**クラスター記事:**
- `/ekiden/hiroshima/[年度]` - 歴代結果

**内部リンク戦略:**
- 都道府県女子駅伝との相互リンク
- 都大路との関連リンク（高校・中学混成）

---

## 内部リンクルール

### 1. ピラー記事に配置すべきリンク

#### 必須リンク（すべてのピラー記事）
```typescript
// 例: 箱根駅伝ピラー記事
const essentialLinks = [
  { text: 'トップページに戻る', url: '/' },
  { text: '最新結果を見る', url: '/ekiden/hakone/2025' },
  { text: '大会概要・区間特徴', url: '/ekiden/hakone/about' },
  { text: '前年の結果', url: '/ekiden/hakone/2024' }
]
```

#### 推奨リンク（関連性の高い記事）
```typescript
// 大学三大駅伝の相互リンク
const relatedLinks = [
  { text: '出雲駅伝の結果はこちら', url: '/ekiden/izumo' },
  { text: '全日本大学駅伝の結果はこちら', url: '/ekiden/zenjitsu' }
]
```

#### 追加リンク（カテゴリー内）
```typescript
// 同カテゴリー内のその他の大会
const categoryLinks = [
  { text: '富士山女子駅伝（大学女子）', url: '/ekiden/fujisan' },
  { text: '杜の都駅伝（大学女子）', url: '/ekiden/morinomiyako' }
]
```

---

### 2. クラスター記事（年度別詳細ページ）に配置すべきリンク

#### 必須リンク
```typescript
const clusterEssentialLinks = [
  { text: 'トップページ', url: '/' },
  { text: '箱根駅伝 歴代結果一覧', url: '/ekiden/hakone' }, // 親ピラー
  { text: '箱根駅伝について', url: '/ekiden/hakone/about' }
]
```

#### ナビゲーションリンク
```typescript
const navigationLinks = [
  { text: '前年の結果', url: '/ekiden/hakone/2024' },
  { text: '翌年の結果', url: '/ekiden/hakone/2026' }
]
```

#### 関連リンク（ページ内セクション）
```typescript
const sectionLinks = [
  { text: '総合成績', url: '#team-results' },
  { text: '区間別成績', url: '#section-results' },
  { text: '選手別記録', url: '#runner-results' },
  { text: '統計・記録', url: '#statistics' }
]
```

---

### 3. 概要ページ（about）に配置すべきリンク

#### 必須リンク
```typescript
const aboutEssentialLinks = [
  { text: '箱根駅伝 歴代結果に戻る', url: '/ekiden/hakone' },
  { text: '最新結果を見る', url: '/ekiden/hakone/2025' }
]
```

#### 区間別リンク（ページ内）
```typescript
const sectionLinks = [
  { text: '1区の特徴', url: '#section-1' },
  { text: '2区の特徴', url: '#section-2' },
  // ... 各区間へのリンク
]
```

---

### 4. リンクの配置場所

#### a. ページヘッダー部分
```tsx
// パンくずリスト + 戻るリンク
<Breadcrumb items={breadcrumbItems} />
<Link href="/ekiden/hakone" className="back-link">
  ← 箱根駅伝 歴代結果に戻る
</Link>
```

#### b. サイドバー/関連リンクエリア
```tsx
<aside className="related-links">
  <h3>関連ページ</h3>
  <ul>
    <li><Link href="/ekiden/izumo">出雲駅伝</Link></li>
    <li><Link href="/ekiden/zenjitsu">全日本大学駅伝</Link></li>
  </ul>
</aside>
```

#### c. ページフッター部分
```tsx
<nav className="page-navigation">
  <Link href="/ekiden/hakone/2024">← 2024年</Link>
  <Link href="/ekiden/hakone/2026">2026年 →</Link>
</nav>
```

#### d. 本文中の文脈リンク
```tsx
<p>
  箱根駅伝は<Link href="/ekiden/hakone/about">大学三大駅伝</Link>の一つで、
  <Link href="/ekiden/izumo">出雲駅伝</Link>、
  <Link href="/ekiden/zenjitsu">全日本大学駅伝</Link>と並ぶ重要な大会です。
</p>
```

---

### 5. リンクテキストのベストプラクティス

#### ✅ 良い例
```tsx
<Link href="/ekiden/hakone/2025">箱根駅伝2025年の結果を見る</Link>
<Link href="/ekiden/hakone/about">箱根駅伝の大会概要・区間特徴</Link>
<Link href="/ekiden/izumo">出雲駅伝の結果一覧</Link>
```

#### ❌ 悪い例
```tsx
<Link href="/ekiden/hakone/2025">こちら</Link>
<Link href="/ekiden/hakone/2025">クリック</Link>
<Link href="/ekiden/hakone/2025">詳細</Link>
```

**理由:**
- キーワードを含む具体的なテキスト
- リンク先の内容が明確
- SEO効果が高い

---

## 実装計画

### Phase 1: 関連リンクコンポーネント作成（Week 2）

#### 1. RelatedLinks コンポーネント
```tsx
// components/RelatedLinks.tsx
interface RelatedLink {
  title: string
  url: string
  description?: string
}

interface RelatedLinksProps {
  title: string
  links: RelatedLink[]
  className?: string
}

export function RelatedLinks({ title, links, className }: RelatedLinksProps) {
  return (
    <aside className={`related-links ${className}`}>
      <h3>{title}</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.url}>{link.title}</Link>
            {link.description && <p>{link.description}</p>}
          </li>
        ))}
      </ul>
    </aside>
  )
}
```

#### 2. PageNavigation コンポーネント
```tsx
// components/PageNavigation.tsx
interface PageNavigationProps {
  prevYear?: number
  nextYear?: number
  basePath: string
}

export function PageNavigation({ prevYear, nextYear, basePath }: PageNavigationProps) {
  return (
    <nav className="page-navigation">
      {prevYear && (
        <Link href={`${basePath}/${prevYear}`}>
          ← {prevYear}年
        </Link>
      )}
      {nextYear && (
        <Link href={`${basePath}/${nextYear}`}>
          {nextYear}年 →
        </Link>
      )}
    </nav>
  )
}
```

---

### Phase 2: 各ページへの実装（Week 2-3）

#### 優先順位
1. **箱根駅伝** - 最重要ピラー
2. **ニューイヤー駅伝** - 実業団代表
3. **クイーンズ駅伝** - 女子実業団
4. **出雲・全日本駅伝** - 大学三大駅伝
5. その他のピラー記事

---

### Phase 3: 効果測定（Week 4以降）

#### 測定指標
- **回遊率**: セッションあたりのページビュー数
- **滞在時間**: 平均セッション時間
- **直帰率**: 1ページだけ見て離脱する率
- **内部リンククリック率**: Google Analytics イベント追跡

#### 目標値
| 指標 | 現状（想定） | 1ヶ月後 | 3ヶ月後 |
|---|---|---|---|
| 平均PV/セッション | 1.5 | 2.5 | 3.5 |
| 平均滞在時間 | 1:30 | 2:30 | 3:30 |
| 直帰率 | 70% | 55% | 45% |

---

## 内部リンク実装チェックリスト

### すべてのページ
- [ ] パンくずリスト設置
- [ ] トップページへのリンク
- [ ] 親カテゴリーへのリンク
- [ ] 関連ページへのリンク（最低3つ）

### ピラー記事
- [ ] 最新結果へのリンク
- [ ] 概要ページへのリンク
- [ ] 年度別一覧へのリンク
- [ ] 関連大会へのリンク（3-5個）

### クラスター記事（年度別）
- [ ] ピラー記事へのリンク
- [ ] 前年・翌年へのナビゲーション
- [ ] ページ内セクションリンク
- [ ] 関連大会同年度へのリンク

### 概要ページ
- [ ] ピラー記事へのリンク
- [ ] 最新結果へのリンク
- [ ] ページ内セクションリンク（区間別）
- [ ] 関連大会概要へのリンク

---

## まとめ

この内部リンク構造により、以下の効果が期待できます:

### SEO効果
- ページランクの適切な分配
- クロール効率の向上
- キーワードの関連性強化

### ユーザー体験
- 情報への容易なアクセス
- 回遊性の向上
- サイト滞在時間の増加

### サイト運営
- コンテンツの体系的管理
- 新規ページ追加の容易さ
- アナリティクスでの効果測定

---

**更新日:** 2025年10月8日  
**バージョン:** 1.0  
**ステータス:** Week 2 実装中
