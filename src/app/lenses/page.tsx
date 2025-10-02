"use client";

import { useState } from "react";
import Image from "next/image";

// 定義 Lens 介面，避免依賴 Supabase
interface Lens {
  id: string;
  name: string;
  brand: string;
  image: string;
  shortDescription: string;
  longDescription: string;
}

// 硬編碼的鏡片資料
const hardcodedLenses: Lens[] = [
  {
    id: "lens-1",
    name: "ZEISS",
    brand: "ZEISS",
    image: "/lens-logos/Zeiss.jpg",
    shortDescription:
      "德國 ZEISS 蔡司創立於 1846 年，是全球光學領域領導品牌，鏡片以精準度、舒適度與耐用性著稱...",
    longDescription:
      "德國 ZEISS 蔡司創立於 1846 年，是全球光學領域領導品牌，鏡片以精準度、舒適度與耐用性著稱。結合先進鍍膜、防紫外線、防藍光與個人化設計，提供清晰穩定的視覺體驗。從日常閱讀、3C 使用到駕駛，蔡司鏡片皆能滿足不同需求，守護雙眼每一刻。",
  },
  {
    id: "lens-2",
    name: "依視路",
    brand: "依視路",
    image: "/lens-logos/Essilor.jpg",
    shortDescription:
      "法國依視路（Essilor）創立於 1849 年，是全球最大眼鏡鏡片製造商之一，以創新光學科技聞名...",
    longDescription:
      "法國依視路（Essilor）創立於 1849 年，是全球最大眼鏡鏡片製造商之一，以創新光學科技聞名。依視路鏡片涵蓋單光、漸進多焦點、防藍光、防紫外線與變色等多元選擇，並透過精準度數與個人化設計，提供清晰、舒適、自然的視覺體驗。無論閱讀、戶外或數位生活，依視路都致力守護你的雙眼健康。",
  },
  {
    id: "lens-3",
    name: "HOYA",
    brand: "HOYA",
    image: "/lens-logos/HOYA.jpg",
    shortDescription:
      "日本 HOYA 創立於 1941 年，為全球光學與醫療科技領導品牌之一...",
    longDescription:
      "日本 HOYA 創立於 1941 年，為全球光學與醫療科技領導品牌之一。HOYA 鏡片以輕薄、高透光與精密加工聞名，並具備防紫外線、防藍光與高耐刮等鍍膜技術。從日常用眼、長時間 3C 使用到專業需求，HOYA 提供多樣化鏡片方案，為雙眼帶來清晰舒適的視覺享受。",
  },
  {
    id: "lens-4",
    name: "TOKAI",
    brand: "TOKAI",
    image: "/lens-logos/Tokai.jpg",
    shortDescription:
      "日本東海光學（TOKAI）創立於 1939 年，以高端訂製鏡片聞名，是日本光學技術的代表之一...",
    longDescription:
      "日本東海光學（TOKAI）創立於 1939 年，以高端訂製鏡片聞名，是日本光學技術的代表之一。TOKAI 鏡片以超輕薄、高透光與精密加工著稱，並擁有防藍光、全時 UV 防護、變色與多層耐刮鍍膜等技術。其多樣化產品可依度數、臉型與生活需求量身訂製，為配戴者帶來清晰、舒適且優雅的視覺體驗。",
  },
  {
    id: "lens-5",
    name: "Nikon",
    brand: "Nikon",
    image: "/lens-logos/Nikon.jpg",
    shortDescription:
      "日本 NIKON 依視路創立於 1917 年，源自精密光學與相機鏡頭技術，將頂級光學工藝延伸至眼鏡鏡片領域...",
    longDescription:
      "日本 NIKON 依視路創立於 1917 年，源自精密光學與相機鏡頭技術，將頂級光學工藝延伸至眼鏡鏡片領域。NIKON 鏡片以高解析度、色彩真實與輕薄舒適著稱，結合防藍光、全時 UV 防護、抗反光與耐刮鍍膜等技術，提供清晰穩定的視覺體驗。無論日常佩戴或專業需求，NIKON 都以精準光學守護你的雙眼。",
  },
];

export default function LensesPage() {
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);

  // 使用硬編碼資料，移除 Supabase 依賴
  const lenses = hardcodedLenses;

  const cards = lenses;
  const headCount = Math.max(0, cards.length - 2);
  const head = cards.slice(0, headCount);
  const tail = cards.slice(headCount); // 0/1/2 張

  const handleLensSelect = (lens: Lens) => {
    setSelectedLens(lens);
    // 滾動到詳細資訊區域
    setTimeout(() => {
      const detailSection = document.getElementById("lens-detail-section");
      if (detailSection) {
        // 獲取元素位置
        const elementTop = detailSection.offsetTop;
        // 計算偏移量：手機端需要考慮固定導航欄高度
        const isMobile = window.innerWidth < 768; // md breakpoint
        const offset = isMobile ? 80 : 20; // 手機端80px，桌面端20px
        const scrollPosition = elementTop - offset;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 100); // 稍微延遲確保狀態更新完成
  };

  // 獲取品牌 logo 圖片路徑
  const getBrandLogo = (brand: string) => {
    const logoMap: { [key: string]: string } = {
      Essilor: "/lens-logos/Essilor.jpg",
      依視路: "/lens-logos/Essilor.jpg", // 依視路是 Essilor 的中文名
      HOYA: "/lens-logos/HOYA.jpg",
      Nikon: "/lens-logos/Nikon.jpg",
      TOKAI: "/lens-logos/Tokai.jpg",
      Tokai: "/lens-logos/Tokai.jpg",
      Zeiss: "/lens-logos/Zeiss.jpg",
      ZEISS: "/lens-logos/Zeiss.jpg", // 處理大寫版本
    };
    return logoMap[brand] || null;
  };

  // 移除載入和錯誤狀態，因為使用硬編碼資料

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
