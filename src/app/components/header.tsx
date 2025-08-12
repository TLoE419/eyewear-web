"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";

interface HeaderProps {
  disableTransparency?: boolean;
}

export default function Header({ disableTransparency = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 處理URL hash，當頁面載入時滾動到指定區域
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#photo-grid") {
      setTimeout(() => {
        const photoGrid = document.getElementById("photo-grid");
        if (photoGrid) {
          photoGrid.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // 增加延遲時間確保頁面完全載入
    }
  }, [pathname]);

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
    if (pathname === "/") {
      // 如果已經在主頁，先滾動到PhotoGrid，然後設置hash
      const photoGrid = document.getElementById("photo-grid");
      if (photoGrid) {
        // 使用更平滑的滾動動畫
        photoGrid.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        // 滾動開始後設置hash
        setTimeout(() => {
          window.location.hash = "#photo-grid";
        }, 300);
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
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 py-0 flex items-center justify-between transition-all duration-500 ease-in-out h-20">
        {/* 左側 LOGO 區塊 */}
        <div className="relative -ml-4 z-20">
          <div className="flex items-center bg-[url('/LogoBackground.png')] bg-cover bg-center h-28 px-6 rounded-bl-2xl rounded-br-2xl shadow-lg">
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-1 text-white"
            >
              <Image
                src="/SiBao.png"
                alt="SiBao"
                width={128}
                height={248}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* 中間選單 */}
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
          className="flex items-center gap-4 transition-colors duration-500 ease-in-out"
          style={{
            color: shouldDisableTransparency
              ? "rgb(227, 208, 165)"
              : scrolled
              ? "rgb(227, 208, 165)"
              : "rgb(38, 38, 38)",
          }}
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow">
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
          <Link
            href="/cart"
            className="flex items-center gap-1 hover:text-blue-400"
          >
            <ShoppingCart size={20} />
            <span>
              購物車({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
