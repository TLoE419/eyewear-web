"use client";

import { useState } from "react";
import { useLenses, Lens } from "@/hooks/useSupabaseData";

export default function LensesPage() {
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  const { lenses, loading, error } = useLenses();

  const cards = lenses ?? [];
  const headCount = Math.max(0, cards.length - 2);
  const head = cards.slice(0, headCount);
  const tail = cards.slice(headCount); // 0/1/2 張

  const handleLensSelect = (lens: Lens) => setSelectedLens(lens);

  // 載入狀態
  if (loading) {
    return (
      <div
        className="min-h-screen py-6 md:py-12 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]"
        style={{ backgroundColor: "rgb(231, 229, 218)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 max-w-md mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 max-w-lg mx-auto"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div
        className="min-h-screen py-6 md:py-12 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]"
        style={{ backgroundColor: "rgb(231, 229, 218)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">載入鏡片資料時發生錯誤</p>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[rgb(136,99,64)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors"
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Card = ({ lens }: { lens: Lens }) => (
    <div
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 w-full max-w-[520px]"
      onClick={() => handleLensSelect(lens)}
    >
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
              <span className="text-white text-sm sm:text-base md:text-lg font-bold">
                {lens.brand.charAt(0)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[rgb(136,99,64)]">
              {lens.brand}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {lens.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 md:mb-3">
          {lens.category}
        </p>
        <p className="text-gray-700 text-xs sm:text-sm md:text-sm mb-3 md:mb-4 line-clamp-3">
          {lens.description}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen py-6 md:py-12 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]"
      style={{ backgroundColor: "rgb(231, 229, 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題 */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(136,99,64)] mb-3 md:mb-4">
            專業鏡片系列
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[rgb(136,99,64)] max-w-2xl mx-auto px-4">
            精選世界頂級光學品牌，為您提供最優質的視覺體驗
          </p>
        </div>

        {/* 鏡片選擇區域 */}
        <div className="space-y-8 md:space-y-12 mb-8 md:mb-12">
          {/* 前面 N-2 張：正常 1/2/3 欄 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
            {head.map((lens) => (
              <Card key={lens.id} lens={lens} />
            ))}
            {head.length % 3 === 2 && <div className="invisible" />}
          </div>

          {/* 最後 1 或 2 張：lg 以上左右分佈，使用較窄的中間欄 */}
          {tail.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 justify-items-center">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
              {/* 左側：品牌視覺 */}
              <div className="space-y-4 md:space-y-6">
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                        {selectedLens.brand.charAt(0)}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[rgb(136,99,64)]">
                      {selectedLens.brand}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {selectedLens.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {selectedLens.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-[rgb(136,99,64)]">
                      {selectedLens.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* 右側：詳細規格 */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    特色功能
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedLens.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-[rgb(136,99,64)] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    技術規格
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">材質</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.material}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">鍍膜</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.coating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">折射率</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.thickness}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">透光率</span>
                      <span className="text-gray-900">
                        {selectedLens.specifications.transmission}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    適用場景
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                    <p className="text-gray-700 text-xs sm:text-sm">
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
        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-[rgb(136,99,64)] mb-3 md:mb-4">
              專業驗光服務
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto text-sm md:text-base px-4">
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
