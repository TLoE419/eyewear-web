"use client";

import { useState } from "react";
import Image from "next/image";
import { useLenses, Lens } from "@/hooks/useSupabaseData";

export default function LensesPage() {
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  const { lenses, loading, error } = useLenses();

  const cards = lenses ?? [];
  const headCount = Math.max(0, cards.length - 2);
  const head = cards.slice(0, headCount);
  const tail = cards.slice(headCount); // 0/1/2 張

  const handleLensSelect = (lens: Lens) => {
    setSelectedLens(lens);
    // 滾動到詳細資訊區域
    setTimeout(() => {
      const detailSection = document.getElementById("lens-detail-section");
      if (detailSection) {
        detailSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100); // 稍微延遲確保狀態更新完成
  };

  // 獲取品牌 logo 圖片路徑
  const getBrandLogo = (brand: string) => {
    const logoMap: { [key: string]: string } = {
      Essilor: "/Lense Logo/Essilor.jpg",
      依視路: "/Lense Logo/Essilor.jpg", // 依視路是 Essilor 的中文名
      HOYA: "/Lense Logo/HOYA.jpg",
      Nikon: "/Lense Logo/Nikon.jpg",
      TOKAI: "/Lense Logo/Tokai.jpg",
      Tokai: "/Lense Logo/Tokai.jpg",
      Zeiss: "/Lense Logo/Zeiss.jpg",
      ZEISS: "/Lense Logo/Zeiss.jpg", // 處理大寫版本
    };
    return logoMap[brand] || null;
  };

  // 載入狀態
  if (loading) {
    return (
      <div
        className="min-h-screen pt-16 md:pt-28"
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
        className="min-h-screen pt-16 md:pt-28"
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
      <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {getBrandLogo(lens.brand) ? (
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto relative">
                <Image
                  src={getBrandLogo(lens.brand)!}
                  alt={`${lens.brand} logo`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                  {lens.brand.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          {lens.name}
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm md:text-sm mb-3 md:mb-4 line-clamp-3">
          {lens.shortDescription || "無描述"}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen pt-16 md:pt-28"
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
          <div
            id="lens-detail-section"
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
              {/* 左側：品牌視覺 */}
              <div className="space-y-4 md:space-y-6">
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {getBrandLogo(selectedLens.brand) ? (
                      <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto relative">
                        <Image
                          src={getBrandLogo(selectedLens.brand)!}
                          alt={`${selectedLens.brand} logo`}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-[rgb(136,99,64)] rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                          {selectedLens.brand.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 右側：品牌名稱和詳細描述 */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(136,99,64)] mb-4 md:mb-6">
                    {selectedLens.name}
                  </h3>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    詳細介紹
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {selectedLens.longDescription || "無詳細描述"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部說明 */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12 text-center">
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
