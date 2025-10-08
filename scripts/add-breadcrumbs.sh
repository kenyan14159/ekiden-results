#!/bin/bash
# パンくずリスト実装スクリプト
# 残り10大会のレースリストページにBreadcrumbコンポーネントを追加

# 各大会のパス、表示名、変数名の定義
declare -A RACES=(
  ["fujisan"]="富士山女子駅伝"
  ["morinomiyako"]="杜の都駅伝"
  ["miyakooji-men"]="都大路(男子)"
  ["miyakooji-women"]="都大路(女子)"
  ["hiroshima"]="ひろしま駅伝"
  ["prefecture-women"]="都道府県対抗女子駅伝"
  ["junior-high-men"]="全中男子駅伝"
  ["junior-high-women"]="全中女子駅伝"
  ["mixed-gender"]="混成駅伝"
)

echo "📝 パンくずリスト実装レポート"
echo "================================="
echo ""
echo "実装済みページ:"
echo "✅ 箱根駅伝 (/ekiden/hakone/page.tsx)"
echo "✅ ニューイヤー駅伝 (/ekiden/newyear/page.tsx)"
echo "✅ クイーンズ駅伝 (/ekiden/queens/page.tsx)"
echo "✅ 出雲駅伝 (/ekiden/izumo/page.tsx)"
echo "✅ 全日本大学駅伝 (/ekiden/zenjitsu/page.tsx)"
echo ""
echo "残り実装対象ページ:"
for race_key in fujisan morinomiyako miyakooji-men miyakooji-women hiroshima prefecture-women junior-high-men junior-high-women mixed-gender; do
  echo "⏳ ${RACES[$race_key]} (/ekiden/$race_key/page.tsx)"
done
echo ""
echo "================================="
echo ""
echo "⚠️  注意: このスクリプトは自動編集を行いません。"
echo "   各ページを手動で編集するか、エディタのツールを使用してください。"
echo ""
echo "編集パターン:"
echo "1. import { Breadcrumb } from \"@/components/BreadcrumbStructuredData\" を追加"
echo "2. breadcrumbItems を定義"
echo "3. <Breadcrumb items={breadcrumbItems} /> を main タグ直後に配置"
