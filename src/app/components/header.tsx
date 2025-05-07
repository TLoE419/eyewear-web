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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7x1 mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-x1 font-bold text-gray-800">
          👓 眼鏡行
        </Link>

        {/* 中間選單 */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/about">關於眼鏡店</Link>

          {/* 鏡框品牌 dropdown 專區 */}
          <div className="relative group">
            {/* 主選單文字 */}
            <div className="hover:text-blue-600 inline-block cursor-pointer">
              鏡框品牌
            </div>

            {/* hover 時的透明橋接層，位置改小不會擠到其他元素 */}
            <div className="absolute left-0 top-full w-40 h-3 group-hover:block hidden z-40"></div>

            {/* 真正的 dropdown */}
            <div className="absolute top-[calc(100%+0.5rem)] left-0 hidden group-hover:block bg-white shadow rounded p-2 w-40 z-50">
              <Link
                href="/brands/rayban"
                className="block px-2 py-1 hover:bg-gray-100"
              >
                Ray-Ban
              </Link>
              <Link
                href="/brands/gucci"
                className="block px-2 py-1 hover:bg-gray-100"
              >
                Gucci
              </Link>
              <Link
                href="/brands/oakley"
                className="block px-2 py-1 hover:bg-gray-100"
              >
                Oakley
              </Link>
            </div>
          </div>

          <Link href="/contact">聯絡眼鏡店</Link>
        </nav>

        {/* 右側功能 */}
        <div className="flex items-center gap-4 text-gray-700">
          <Link
            href="/login"
            className="hover:text-blue-600 hidden md:inline-flex"
          >
            <User size={20} />
            <span className="ml-1">會員登入</span>
          </Link>
          <button className="hover:text-blue-600">
            <Search size={20} />
          </button>
          <Link href="/cart" className="hover:text-blue-600">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
