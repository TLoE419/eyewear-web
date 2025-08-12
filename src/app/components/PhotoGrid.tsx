"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PhotoGrid = () => {
  const [isScrolledTo, setIsScrolledTo] = useState(false);

  // 檢查是否通過hash滾動到PhotoGrid區域
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#photo-grid") {
        // 立即顯示文字欄，創造特效
        setTimeout(() => {
          setIsScrolledTo(true);
        }, 1000); // 短暫延遲確保滾動開始

        // 5秒後自動隱藏文字欄
        setTimeout(() => {
          setIsScrolledTo(false);
        }, 5000);

        // 清除hash以避免重複觸發
        setTimeout(() => {
          window.history.replaceState(null, "", window.location.pathname);
        }, 2000);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);
  const openGoogleMaps = (store: string) => {
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

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件
    // 預約功能暫時停用
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
        <Image
          src="/Store_1.jpg"
          alt="Featured photo 1"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div
          className={`absolute inset-0 transition-transform duration-1000 bg-[rgb(38,38,38)]/90 flex flex-col items-center justify-center px-8 py-6 gap-4 text-center ${
            isScrolledTo
              ? "translate-x-0"
              : "-translate-x-full group-hover:translate-x-0"
          }`}
          style={{
            pointerEvents: isScrolledTo ? "none" : "auto",
          }}
        >
          <p className="text-[rgb(227,208,165)] text-xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-5xl md:text-6xl font-bold mb-4">
            六甲店
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            以一條極細的 LED 光框勾勒門楣，像替城市寫下無聲的引言<br></br>
            燈帶在米白立面上留下乾淨的一筆，映出店內大理石中島的冷白與木質展示桌的暖調
            <br></br>
            一隻摺紙鹿靜靜守候，那是視覺與藝術的守門人
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            地址：台南市六甲區民生街6號
          </p>
          <button
            className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] px-6 py-3 rounded-md font-semibold hover:bg-[rgb(217,198,155)] transition-colors duration-300"
            onClick={handleBooking}
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
        <Image
          src="/Store_2.jpg"
          alt="Featured photo 2"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(38,38,38)] via-transparent to-transparent" />
        <div
          className={`absolute inset-0 transition-transform duration-1000 bg-[rgb(38,38,38)]/90 flex flex-col items-center justify-center px-8 py-6 gap-4 text-center ${
            isScrolledTo
              ? "translate-x-0"
              : "translate-x-full group-hover:translate-x-0"
          }`}
          style={{
            pointerEvents: isScrolledTo ? "none" : "auto",
          }}
        >
          <p className="text-[rgb(227,208,165)] text-xl font-normal mb-1">
            分店資訊
          </p>
          <p className="text-[rgb(227,208,165)] text-5xl md:text-6xl font-bold mb-4">
            新營店
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            深色石柱如劇院門框，中央卻懸掛著一塊溫潤原木，矜持且不冷峻的對比
            <br></br>
            推門而入，方形天花拼板在頭頂展開節奏，映襯玻璃展櫃裡的鏡框<br></br>
            每一件都是工藝樂章的高音符
          </p>
          <p className="text-[rgb(227,208,165)] text-lg font-normal leading-relaxed mb-4">
            地址：台南市新營區三民路121之6號
          </p>
          <button
            className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] px-6 py-3 rounded-md font-semibold hover:bg-[rgb(217,198,155)] transition-colors duration-300"
            onClick={handleBooking}
          >
            立即預約
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
