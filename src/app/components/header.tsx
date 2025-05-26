"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, User } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "rgb(136, 99, 64)" : "white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
        scrolled ? "shadow-md translate-y-0" : "translate-y-0"
      }`}
      style={{
        backgroundColor: scrolled ? "white" : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 py-0 flex items-center justify-between transition-all duration-500 ease-in-out h-20">
        {/* 左側 LOGO 區塊 */}
        <div className="relative -ml-4 z-20">
          <div className="flex items-center bg-[url('/LogoBackground.png')] bg-cover bg-center h-28 px-6 rounded-bl-2xl rounded-br-2xl shadow-lg">
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-1 text-white"
            >
              <img
                src="/SiBao.png"
                alt="SiBao"
                className="object-contain"
                style={{ width: "128px", height: "128px" }}
              />
            </Link>
          </div>
        </div>

        {/* 中間選單 */}
        <nav
          className="hidden md:flex gap-8 font-medium transition-colors duration-500 ease-in-out"
          style={{ color: textColor }}
        >
          <Link href="/products">關於視寶</Link>
          <Link href="/products">鏡片品牌</Link>
          <Link href="/products">鏡框品牌</Link>
          <Link href="/booking">聯絡眼鏡</Link>
        </nav>

        {/* 右側功能區 */}
        <div
          className="flex items-center gap-4 transition-colors duration-500 ease-in-out"
          style={{ color: textColor }}
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow">
            <Search size={16} />
            <input
              type="text"
              placeholder="產品名稱"
              className="text-sm focus:outline-none w-24"
            />
            <button className="text-white bg-[rgb(115,65,29)] rounded-full px-3 py-1 text-sm">
              搜尋
            </button>
          </div>
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-blue-400"
          >
            <ShoppingCart size={20} />
            <span>購物車(0)</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
