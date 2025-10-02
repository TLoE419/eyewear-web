"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePhotosByCategory } from "@/hooks/usePhotoManagement";
import { PhotoCategory } from "@/lib/photoManagement";
import LoadingSpinner from "./LoadingSpinner";

export default function News() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const { photos: newsPhotos, loading } = usePhotosByCategory(
    PhotoCategory.NEWS_CAROUSEL
  );

  // 預設標題陣列（移到組件外部避免重新創建）
  const defaultTitles = [
    "BVLGARI 眼鏡",
    "GUCCI 眼鏡",
    "MONTBLANC 眼鏡",
    "Ray-Ban 眼鏡",
    "999.9 眼鏡",
    "LINDBERG 眼鏡",
  ];

  // 輪播圖片數據 - 使用眼鏡產品照片
  const carouselItems =
    newsPhotos.length > 0
      ? newsPhotos.map((photo, index) => {
          return {
            id: photo.id,
            image: photo.image_url,
            title:
              photo.title && !photo.title.includes("_")
                ? photo.title
                : photo.文字欄1 || defaultTitles[index % defaultTitles.length],
            action: "products",
          };
        })
      : [
          {
            id: 1,
            image: "/BVLGARI/BVLGARI_1.jpg",
            title: "BVLGARI 眼鏡",
            action: "products",
          },
          {
            id: 2,
            image: "/GUCCI/GUCCI_1.jpg",
            title: "GUCCI 眼鏡",
            action: "products",
          },
          {
            id: 3,
            image: "/MONTBLANC/MONTBLANC_1.jpg",
            title: "MONTBLANC 眼鏡",
            action: "products",
          },
          {
            id: 4,
            image: "/Ray.Ban/RayBan_1.jpg",
            title: "Ray-Ban 眼鏡",
            action: "products",
          },
          {
            id: 5,
            image: "/LINDBERG/Lindberg_1.jpg",
            title: "LINDBERG 眼鏡",
            action: "products",
          },
          {
            id: 6,
            image: "/BVLGARI/BVLGARI_2.jpg",
            title: "BVLGARI 眼鏡",
            action: "products",
          },
          {
            id: 7,
            image: "/GUCCI/GUCCI_2.jpg",
            title: "GUCCI 眼鏡",
            action: "products",
          },
          {
            id: 8,
            image: "/MONTBLANC/MONTBLANC_2.jpg",
            title: "MONTBLANC 眼鏡",
            action: "products",
          },
        ];

  // 創建重複的圖片陣列以實現無縫循環
  const duplicatedItems = [
    ...carouselItems,
    ...carouselItems,
    ...carouselItems,
  ];

  // 連續滾動動畫
  useEffect(() => {
    const animate = () => {
      if (!isHovered) {
        setScrollPosition((prev) => {
          const newPosition = prev - 0.5; // 緩慢向左移動
          const maxScroll = carouselItems.length * 192; // 每張圖片寬度 (w-48 = 192px)
          return newPosition <= -maxScroll ? 0 : newPosition;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, carouselItems.length]);

  const handleItemClick = (item: (typeof carouselItems)[0]) => {
    if (item.action === "products") {
      router.push("/products");
    }
  };

  return (
    <div className="relative py-12 md:py-16 text-center min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(231,229,218)]/0 via-[rgb(231,229,218)]/50 to-[rgb(231,229,218)]/0" />

      {/* 標題 */}
      <div className="relative z-10 mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(136,99,64)] mb-3">
          精選眼鏡系列
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          探索世界頂級品牌眼鏡，展現您的獨特風格
        </p>
      </div>

      {/* 跑馬燈容器 */}
      {loading ? (
        <div className="relative w-full h-48 sm:h-64 md:h-[28rem] overflow-hidden flex items-center justify-center">
          <LoadingSpinner size="lg" text="載入精選眼鏡系列..." />
        </div>
      ) : (
        <div
          className="relative w-full h-48 sm:h-64 md:h-[28rem] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex items-center h-full"
            style={{
              transform: `translateX(${scrollPosition}px)`,
              width: `${duplicatedItems.length * 192}px`, // 每張圖片寬度 (w-48 = 192px)
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-48 sm:w-64 md:w-[28rem] h-48 sm:h-64 md:h-[28rem] cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative w-full h-full overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 8} // 只對前8張圖片設置優先載入
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
