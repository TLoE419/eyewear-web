"use client";

import { useState } from "react";
import Image from "next/image";
import lensesData from "@/data/lenses.json";

interface Lens {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  specifications: {
    material: string;
    coating: string;
    thickness: string;
    transmission: string;
  };
  price: string;
  inStock: boolean;
}

export default function LensesPage() {
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);

  const cards = (lensesData as unknown as Lens[]) ?? [];
  const headCount = Math.max(0, cards.length - 2);
  const head = cards.slice(0, headCount);
  const tail = cards.slice(headCount); // 0/1/2 張

  const handleLensSelect = (lens: Lens) => setSelectedLens(lens);

  const Card = ({ lens }: { lens: Lens }) => (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 w-full max-w-[520px]"
      onClick={() => handleLensSelect(lens)}
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {lens.brand.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[rgb(136,99,64)]">
              {lens.brand}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{lens.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{lens.category}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {lens.description}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen py-12 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]"
      style={{ backgroundColor: "rgb(231, 229, 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[rgb(136,99,64)] mb-4">
            專業鏡片系列
          </h1>
          <p className="text-lg text-[rgb(136,99,64)] max-w-2xl mx-auto">
            精選世界頂級光學品牌，為您提供最優質的視覺體驗
          </p>
        </div>

        {/* 鏡片選擇區域 */}
        <div className="space-y-12 mb-12">
          {/* 前面 N-2 張：正常 1/2/3 欄 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {head.map((lens) => (
              <Card key={lens.id} lens={lens} />
            ))}
            {head.length % 3 === 2 && <div className="invisible" />}
          </div>

          {/* 最後 1 或 2 張：lg 以上左右分佈，使用較窄的中間欄 */}
          {tail.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-6 justify-items-center">
              {/* 左 */}
              <Card lens={tail[0]} />

              {/* 中間固定寬度的佔位（lg 以上顯示） */}
              <div className="hidden lg:block w-[60px]" />

              {/* 右（如果只有 1 張就不渲染） */}
              {tail.length === 2 ? <Card lens={tail[1]} /> : null}
            </div>
          )}
        </div>

        {/* 詳細資訊區域 */}
        {selectedLens && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* 左側：品牌視覺 */}
              <div className="space-y-6">
                <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {selectedLens.brand.charAt(0)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[rgb(136,99,64)]">
                      {selectedLens.brand}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedLens.name}
                  </h3>
                  <p className="text-gray-600">{selectedLens.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-[rgb(136,99,64)]">
                      {selectedLens.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* 右側：詳細規格 */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    特色功能
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedLens.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-[rgb(136,99,64)] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    技術規格
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">材質</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.material}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">鍍膜</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.coating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">折射率</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.thickness}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">透光率</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.transmission}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    適用場景
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 text-sm">
                      根據您的視力需求和生活方式，我們的專業驗光師將為您推薦最適合的鏡片。
                      每款鏡片都經過精心設計，確保最佳的視覺效果和舒適度。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部說明 */}
        <div className="mt-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-xl font-semibold text-[rgb(136,99,64)] mb-4">
              專業驗光服務
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              我們提供專業的驗光服務，確保為您選擇最適合的鏡片。
              每款鏡片都經過嚴格品質控制，為您的視力健康提供最佳保障。
              歡迎預約專業驗光師諮詢，為您量身定制最適合的視覺解決方案。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
