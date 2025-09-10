"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";

interface HeaderProps {
  disableTransparency?: boolean;
}

export default function Header({ disableTransparency = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrolled(window.scrollY > 50);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMounted]);

  // 處理URL hash，當頁面載入時滾動到指定區域
  useEffect(() => {
    if (!isMounted) return;

    if (
      pathname === "/" &&
      typeof window !== "undefined" &&
      window.location.hash === "#photo-grid"
    ) {
      // 使用多次嘗試的方法，確保滾動成功
      const attemptScroll = (attempts = 0) => {
        if (attempts > 5) return; // 最多嘗試5次

        const photoGrid = document.getElementById("photo-grid");
        if (photoGrid) {
          // 檢查元素是否已經完全渲染
          const rect = photoGrid.getBoundingClientRect();
          if (rect.height === 0 && attempts < 5) {
            // 如果元素還沒有高度，等待一下再試
            setTimeout(() => attemptScroll(attempts + 1), 200);
            return;
          }

          // 使用 scrollIntoView 但添加 block: 'start' 和 inline: 'nearest'
          photoGrid.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });

          // 滾動後微調位置，確保不被header遮擋
          setTimeout(() => {
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 80;
            const currentScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            const adjustedScroll = currentScroll - headerHeight - 10;

            window.scrollTo({
              top: Math.max(0, adjustedScroll),
              behavior: "smooth",
            });
          }, 100);
        } else if (attempts < 5) {
          // 如果元素還沒找到，等待一下再試
          setTimeout(() => attemptScroll(attempts + 1), 200);
        }
      };

      // 開始嘗試滾動
      setTimeout(() => attemptScroll(), 300);
    }
  }, [pathname, isMounted]);

  // 檢查是否在特定頁面（如 products 頁面、個別商品頁面、鏡片頁面或 cart 頁面）
  const isProductsPage = pathname === "/products";
  const isProductDetailPage = pathname.startsWith("/products/");
  const isLensesPage = pathname === "/lenses";
  const isCartPage = pathname === "/cart";
  const shouldDisableTransparency =
    disableTransparency ||
    isProductsPage ||
    isProductDetailPage ||
    isLensesPage ||
    isCartPage;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false); // 關閉手機選單
    if (pathname === "/") {
      // 如果已經在主頁，先滾動到PhotoGrid，然後設置hash
      const photoGrid = document.getElementById("photo-grid");
      if (photoGrid) {
        // 計算 PhotoGrid 的準確位置並滾動到上沿
        const rect = photoGrid.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;

        // 考慮 header 的高度，讓 PhotoGrid 貼齊 header 下沿
        const header = document.querySelector("header");
        // 使用更精確的header高度計算，考慮可能的動態變化
        const headerHeight = header ? header.offsetHeight : 80;
        // 添加一點額外的緩衝，確保不會被header遮擋
        const adjustedPosition = targetPosition - headerHeight - 5;

        // 使用更精確的滾動到 PhotoGrid 的上沿
        window.scrollTo({
          top: Math.max(0, adjustedPosition), // 確保不會滾動到負數位置
          behavior: "smooth",
        });
        // 滾動開始後設置hash
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.hash = "#photo-grid";
          }
        }, 500); // 增加延遲時間確保滾動完成
      }
    } else {
      // 如果不在主頁，先導航到主頁，然後滾動到PhotoGrid
      router.push("/#photo-grid");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
        scrolled ? "shadow-md translate-y-0" : "translate-y-0"
      }`}
      style={{
        backgroundColor: shouldDisableTransparency
          ? "rgb(38, 38, 38)"
          : scrolled
          ? "rgb(38, 38, 38)"
          : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-0 flex items-center justify-between transition-all duration-500 ease-in-out h-16 md:h-20">
        {/* 左側 LOGO 區塊 */}
        <div className="relative -ml-2 md:-ml-4 z-20">
          <div className="flex items-center bg-[url('/LogoBackground.png')] bg-cover bg-center h-20 md:h-28 px-3 md:px-6 rounded-bl-2xl rounded-br-2xl shadow-lg">
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-1 text-white"
            >
              <Image
                src="/SiBao.png"
                alt="SiBao"
                width={80}
                height={156}
                className="md:w-32 md:h-64 object-contain"
              />
            </Link>
          </div>
        </div>

        {/* 中間選單 - 桌面版 */}
        <nav
          className="hidden md:flex gap-8 font-medium transition-colors duration-500 ease-in-out"
          style={{
            color: shouldDisableTransparency
              ? "rgb(227, 208, 165)"
              : scrolled
              ? "rgb(227, 208, 165)"
              : "rgb(250, 243, 224)",
          }}
        >
          <Link href="/">關於視寶</Link>
          <Link href="/products">鏡框品牌</Link>
          <Link href="/lenses">鏡片品牌</Link>
          <a href="#photo-grid" onClick={handleContactClick}>
            聯絡我們
          </a>
        </nav>

        {/* 右側功能區 */}
        <div
          className="flex items-center gap-2 md:gap-4 transition-colors duration-500 ease-in-out"
          style={{
            color: shouldDisableTransparency
              ? "rgb(227, 208, 165)"
              : scrolled
              ? "rgb(227, 208, 165)"
              : "rgb(38, 38, 38)",
          }}
        >
          {/* 搜尋欄位 - 桌面版 */}
          <div className="hidden md:flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow">
            <Search size={16} style={{ color: "rgb(227, 208, 165)" }} />
            <input
              type="text"
              placeholder="產品名稱"
              className="text-sm focus:outline-none w-24"
              style={{
                color: "rgb(38, 38, 38)",
                border: "none",
              }}
            />
            <button
              className="bg-[rgb(115,65,29)] rounded-full px-3 py-1 text-sm"
              style={{ color: "rgb(227, 208, 165)" }}
            >
              搜尋
            </button>
          </div>

          {/* 購物車 - 桌面版 */}
          <Link
            href="/cart"
            className="hidden md:flex items-center gap-1 hover:text-blue-400"
          >
            <ShoppingCart size={20} />
            <span>
              購物車({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </Link>

          {/* 手機版功能按鈕 */}
          <div className="flex md:hidden items-center gap-2">
            {/* 搜尋按鈕 */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Search size={18} />
            </button>

            {/* 購物車按鈕 */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* 漢堡選單按鈕 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版搜尋欄位 */}
      {searchOpen && (
        <div className="md:hidden bg-[rgb(38,38,38)]/95 backdrop-blur-sm p-4 border-t border-[rgb(136,99,64)]">
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow">
            <Search size={16} style={{ color: "rgb(136, 99, 64)" }} />
            <input
              type="text"
              placeholder="搜尋產品..."
              className="flex-1 text-sm focus:outline-none"
              style={{
                color: "rgb(38, 38, 38)",
                border: "none",
              }}
            />
            <button
              className="bg-[rgb(136,99,64)] rounded-full px-3 py-1 text-sm text-white"
              onClick={() => setSearchOpen(false)}
            >
              搜尋
            </button>
          </div>
        </div>
      )}

      {/* 手機版導航選單 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgb(38,38,38)]/95 backdrop-blur-sm border-t border-[rgb(136,99,64)]">
          <nav className="flex flex-col py-4">
            <Link
              href="/"
              className="px-6 py-3 text-[rgb(227,208,165)] hover:bg-[rgb(136,99,64)]/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              關於視寶
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 text-[rgb(227,208,165)] hover:bg-[rgb(136,99,64)]/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              鏡框品牌
            </Link>
            <Link
              href="/lenses"
              className="px-6 py-3 text-[rgb(227,208,165)] hover:bg-[rgb(136,99,64)]/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              鏡片品牌
            </Link>
            <button
              onClick={handleContactClick}
              className="px-6 py-3 text-left text-[rgb(227,208,165)] hover:bg-[rgb(136,99,64)]/20 transition-colors"
            >
              聯絡我們
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
