'use client';

import { Card } from '@/components/ui/card';
import AmazonLink from './AmazonLink';
import RakutenLink from './RakutenLink';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  id: string;
  // TODO: data/products/shoes.json から商品情報を取得
}

// 仮のデータ（後でJSONから取得する）
const sampleProduct = {
  id: 'nike-vaporfly-3',
  name: 'Nike ZoomX Vaporfly Next% 3',
  brand: 'Nike',
  price: {
    list: 33000,
    amazon: 29800,
  },
  specs: {
    weight: 196,
    drop: 8,
  },
  description: '箱根駅伝で最も使用されているレーシングシューズ',
};

export default function ProductCard({ id }: ProductCardProps) {
  const product = sampleProduct; // TODO: JSONから取得

  return (
    <Card className="p-6 my-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="flex items-start gap-4">
        {/* 商品画像プレースホルダー */}
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-xs">商品画像</span>
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-semibold text-blue-600">{product.brand}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          {/* スペック */}
          <div className="flex gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-semibold">重量:</span>
              <span>{product.specs.weight}g</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">ドロップ:</span>
              <span>{product.specs.drop}mm</span>
            </div>
          </div>

          {/* 価格 */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">
                ¥{product.price.amazon.toLocaleString()}
              </span>
              {product.price.list && (
                <span className="text-sm text-gray-500 line-through">
                  ¥{product.price.list.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* 購入リンク */}
          <div className="flex flex-wrap gap-3">
            <AmazonLink productId={id} text="Amazonで見る" />
            <RakutenLink productId={id} text="楽天で見る" />
          </div>
        </div>
      </div>
    </Card>
  );
}
