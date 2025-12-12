"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePhotosByCategory } from "@/hooks/usePhotoManagement";
import { PhotoCategory } from "@/lib/photoManagement";
import { ImageSkeleton } from "./LoadingSpinner";

const PhotoGrid = () => {
  const [isScrolledTo, setIsScrolledTo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { photos: storePhotos, loading } = usePhotosByCategory(
    PhotoCategory.STORE_PHOTO
  );

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 檢測是否滑到 PhotoGrid 區域（手機版自動顯示文字欄）
  useEffect(() => {
    if (!isMounted) return;

    // 檢查是否為手機螢幕
    const isMobile = () => {
      if (typeof window === "undefined") return false;
      return window.innerWidth < 768; // md breakpoint
    };

    const photoGridElement = document.getElementById("photo-grid");
    if (!photoGridElement) return;

    let showTimeout: NodeJS.Timeout | null = null;

    // 使用 Intersection Observer 檢測元素是否進入/離開視窗
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isMobile()) return;

          if (entry.isIntersecting) {
            // 進入視窗 - 延遲後顯示文字欄
            showTimeout = setTimeout(() => {
              setIsScrolledTo(true);
            }, 1200);
          } else {
            // 離開視窗 - 立即隱藏文字欄
            if (showTimeout) {
              clearTimeout(showTimeout);
              showTimeout = null;
            }
            setIsScrolledTo(false);
          }
        });
      },
      {
        threshold: 0.3, // 當 30% 的元素進入視窗時觸發
        rootMargin: "0px",
      }
    );

    observer.observe(photoGridElement);

    // 同時保留原有的 hash 檢查功能
    const checkHash = () => {
      if (
        typeof window !== "undefined" &&
        window.location.hash === "#photo-grid"
      ) {
        setTimeout(() => {
          setIsScrolledTo(true);
        }, 1000);

        setTimeout(() => {
          setIsScrolledTo(false);
        }, 5000);

        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }, 2000);
      }
    };

    checkHash();
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", checkHash);
    }

    return () => {
      observer.disconnect();
      if (showTimeout) {
        clearTimeout(showTimeout);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("hashchange", checkHash);
      }
    };
  }, [isMounted]);

  const openGoogleMaps = (store: string) => {
    if (typeof window === "undefined") return;

    let googleMapsUrl = "";

    if (store === "liujia") {
      // 六甲店
      googleMapsUrl =
        "https://www.google.com/maps/place/%E8%A6%96%E5%AF%B6%E7%9C%BC%E9%8F%A1%E8%A1%8C/@23.2272767,120.3517964,17z/data=!4m15!1m8!3m7!1s0x346e880cd12f4fa5:0x6f0eb8d26cffe6c3!2sNo.+6%E8%99%9F,+Minsheng+St,+Liujia+District,+Tainan+City,+734!3b1!8m2!3d23.2272767!4d120.3517964!16s%2Fg%2F11krcnjnyq!3m5!1s0x346e880cd0e04505:0x8af04ffe820f9a90!8m2!3d23.2272767!4d120.3517964!16s%2Fg%2F1pzrj16w2?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D";
    } else if (store === "xinying") {
      // 新營店
      googleMapsUrl =
        "https://www.google.com/maps/place/%E8%A6%96%E5%AF%B6%E7%9C%BC%E9%8F%A1%E3%80%8A%E6%96%B0%E7%87%9F%E5%BA%97%E3%80%8B/@23.3060615,120.3081231,17z/data=!3m1!4b1!4m6!3m5!1s0x346e85d9f723bd8d:0x50d16804b94936ca!8m2!3d23.3060615!4d120.3099103!16s%2Fg%2F11ggbvl564?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D";
    }

    window.open(googleMapsUrl, "_blank");
  };

  const handleBooking = (url: string) => (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件

    // 點擊回饋特效
    const button = e.currentTarget as HTMLButtonElement;

    // 縮放特效
    button.style.transform = "scale(0.95)";
    button.style.transition = "all 0.1s ease";

    // 顏色變化特效
    button.style.backgroundColor = "rgb(217,198,155)";

    // 恢復原狀
    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.backgroundColor = "rgb(227,208,165)";
    }, 100);

    // 跳轉到預約連結
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.open(url, "_blank");
      }
    }, 150);
  };

  return (
    <div
      id="photo-grid"
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-0"
    >
      <div
        className={`relative w-full aspect-[4/3] overflow-hidden cursor-pointer ${
          isScrolledTo ? "" : "group"
        }`}
        onClick={() => openGoogleMaps("liujia")}
      >
        {loading ? (
          <ImageSkeleton className="w-full h-full" />
        ) : (
          <Image
            src={
              storePhotos.length > 0 ? storePhotos[0].image_url : "/Store_1.jpg"
            }
            alt={
              storePhotos.length > 0
                ? storePhotos[0].title || "Featured photo 1"
                : "Featured photo 1"
            }
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div
          className={`absolute inset-0 transition-transform duration-1000 bg-[rgb(38,38,38)]/90 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 gap-2 sm:gap-3 md:gap-4 text-center overflow-y-auto ${
            isScrolledTo
              ? "translate-x-0"
              : "-translate-x-full group-hover:translate-x-0"
          }`}
        >
          <p className="text-[rgb(227,208,165)] text-base md:text-2xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 md:mb-4">
            六甲店
          </p>
          <p className="text-[rgb(227,208,165)] text-sm sm:text-base md:text-xl font-normal leading-relaxed mb-1">
            地址：台南市六甲區民生街6號
          </p>
          <p className="text-[rgb(227,208,165)] text-sm sm:text-base md:text-xl font-normal leading-relaxed mb-2 sm:mb-3 md:mb-4">
            電話：06-6994868
          </p>
          <button
            className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-[rgb(217,198,155)] hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
            onClick={handleBooking("https://liff.line.me/1645278921-kWRPP32q/?accountId=tto2607l")}
          >
            立即預約
          </button>
        </div>
      </div>
      <div
        className={`relative w-full aspect-[4/3] overflow-hidden cursor-pointer ${
          isScrolledTo ? "" : "group"
        }`}
        onClick={() => openGoogleMaps("xinying")}
      >
        {loading ? (
          <ImageSkeleton className="w-full h-full" />
        ) : (
          <Image
            src="/Store_2.jpg"
            alt="Featured photo 2"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div
          className={`absolute inset-0 transition-transform duration-1000 bg-[rgb(38,38,38)]/90 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 gap-2 sm:gap-3 md:gap-4 text-center overflow-y-auto ${
            isScrolledTo
              ? "translate-x-0"
              : "translate-x-full group-hover:translate-x-0"
          }`}
        >
          <p className="text-[rgb(227,208,165)] text-base md:text-2xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 md:mb-4">
            新營店
          </p>
          <p className="text-[rgb(227,208,165)] text-sm sm:text-base md:text-xl font-normal leading-relaxed mb-1">
            地址：台南市新營區三民路121之6號
          </p>
          <p className="text-[rgb(227,208,165)] text-sm sm:text-base md:text-xl font-normal leading-relaxed mb-2 sm:mb-3 md:mb-4">
            電話：06-6331141
          </p>
          <button
            className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-[rgb(217,198,155)] hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
            onClick={handleBooking("https://line.me/R/ti/p/@ksn7157i")}
          >
            立即預約
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
