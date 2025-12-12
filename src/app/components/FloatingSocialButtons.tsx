"use client";

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLine } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaFacebookF size={40} />,
    url: "https://www.facebook.com/sibao.optician/?locale=zh_TW",
    label: "Facebook",
  },
  {
    icon: <FaInstagram size={40} />,
    url: "https://www.instagram.com/sibao_eyewear/",
    label: "Instagram",
  },
];

const lineStores = [
  {
    name: "六甲店",
    url: "https://liff.line.me/1645278921-kWRPP32q/?accountId=tto2607l",
  },
  {
    name: "新營店",
    url: "https://line.me/R/ti/p/@ksn7157i",
  },
];

const FloatingSocialButtons = () => {
  const [isLineHovered, setIsLineHovered] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsLineHovered(true);
  };

  const handleMouseLeave = () => {
    // 延遲 200ms 隱藏，給用戶時間移動滑鼠
    const timeout = setTimeout(() => {
      setIsLineHovered(false);
    }, 200);
    setHideTimeout(timeout);
  };

  // 清理 timeout，避免內存洩漏
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* LINE 按鈕與彈出選單 */}
      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* LINE 主按鈕 */}
        <div className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] hover:bg-[rgb(38,38,38)] hover:text-[rgb(227,208,165)] shadow-lg rounded-full p-1.5 transition-colors duration-200 flex items-center justify-center border-4 border-[rgb(38,38,38)] cursor-pointer">
          <FaLine size={40} />
        </div>

        {/* 不可見的橋接區域，填補按鈕和選單之間的間隙 */}
        <div
          className={`absolute right-full top-0 w-3 h-full ${
            isLineHovered ? "" : "pointer-events-none"
          }`}
        />

        {/* 彈出的分店選單 */}
        <div
          className={`absolute right-full mr-3 top-0 flex flex-col gap-2 transition-all duration-300 ${
            isLineHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {lineStores.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] hover:bg-[rgb(38,38,38)] hover:text-[rgb(227,208,165)] shadow-lg rounded-full px-4 py-2 transition-all duration-200 flex items-center justify-center border-3 border-[rgb(38,38,38)] whitespace-nowrap font-semibold text-sm min-w-[100px]"
            >
              {store.name}
            </a>
          ))}
        </div>
      </div>

      {/* Facebook 和 Instagram 按鈕 */}
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="bg-[rgb(227,208,165)] text-[rgb(38,38,38)] hover:bg-[rgb(38,38,38)] hover:text-[rgb(227,208,165)] shadow-lg rounded-full p-1.5 transition-colors duration-200 flex items-center justify-center border-4 border-[rgb(38,38,38)]"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialButtons;
