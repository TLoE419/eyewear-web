"use client";

import { useState, useEffect, Suspense } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, X, Search, Heart } from "lucide-react";
import { useProducts, Product } from "@/hooks/useSupabaseData";

// Product type is now imported from useSupabaseData

const brandCategories = [
  "Ray-Ban",
  "LINDBERG",
  "9999",
  "BVLGARI",
  "GUCCI",
  "MONTBLANC",
  "CLASSICO",
  "SILHOUETTE",
  "GIORGIO ARMANI",
  "CHLOÉ",
  "COACH",
  "SALVATORE FERRAGAMO",
  "AGNÈS B",
  "BROOKLYN",
  "DONNI EYE",
  "FRANK CUSTOM",
  "P+US",
  "TALOR WITH RESPECT",
  "PROJEKT PRODUKT",
  "SIBAO",
];

function ProductsPageContent() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const { addToCart, isMounted } = useCart();
  const { products, loading, error } = useProducts();

  useEffect(() => {
    // 檢查 URL 參數中是否有品牌過濾
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedBrands, searchQuery]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSearchQuery("");
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen pt-16 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 顯示錯誤狀態
  if (error) {
    return (
      <div className="min-h-screen pt-16 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">載入產品資料時發生錯誤</p>
            <p className="text-gray-500 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[rgb(136,99,64)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors"
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* 手機版搜尋欄 */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="搜尋鏡框品牌或型號..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[rgb(136,99,64)] focus:bg-white"
            />
          </div>
        </div>

        {/* 手機版篩選器按鈕 */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-[rgb(136,99,64)] text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Filter size={18} />
            <span>篩選品牌</span>
            {selectedBrands.length > 0 && (
              <span className="bg-white text-[rgb(136,99,64)] text-xs rounded-full px-2 py-1">
                {selectedBrands.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* 桌面版篩選器側邊欄 */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[rgb(136,99,64)]">
                  品牌篩選
                </h2>
                {selectedBrands.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    清除全部
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {brandCategories.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-[rgb(136,99,64)]">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 產品網格區域 */}
          <div className="flex-1">
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-[rgb(136,99,64)]">
                商品列表
              </h1>
              <p className="text-[rgb(136,99,64)] mt-1 text-sm md:text-base">
                共 {filteredProducts.length} 個商品
              </p>
            </div>

            {/* 手機版分類標籤 */}
            <div className="lg:hidden mb-6">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[rgb(136,99,64)]">
                    品牌篩選
                  </h3>
                  {selectedBrands.length > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      清除全部
                    </button>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {brandCategories.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandToggle(brand)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                        selectedBrands.includes(brand)
                          ? "bg-[rgb(136,99,64)] text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 手機版產品網格 */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full backdrop-blur-sm">
                        <Heart size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </Link>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {product.brand}
                    </p>
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: 0,
                          image: product.image,
                          quantity: 1,
                          brand: product.brand,
                        })
                      }
                      className="w-full bg-[rgb(136,99,64)] text-white py-2 rounded-lg text-sm font-medium"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 桌面版產品網格 */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-3 md:p-4">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.brand}
                    </p>

                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: 0,
                          image: product.image,
                          quantity: 1,
                          brand: product.brand,
                        })
                      }
                      className="w-full bg-[rgb(136,99,64)] text-white py-2 md:py-2.5 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors text-sm md:text-base font-medium"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 無商品時的提示 */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">沒有找到符合條件的商品</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 bg-[rgb(136,99,64)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(115,65,29)] transition-colors"
                >
                  清除篩選條件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 手機版篩選器彈出層 */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">篩選條件</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">品牌</h3>
                <div className="grid grid-cols-2 gap-2">
                  {brandCategories.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        handleBrandToggle(brand);
                      }}
                      className={`p-3 rounded-lg text-sm text-left transition-all ${
                        selectedBrands.includes(brand)
                          ? "bg-[rgb(136,99,64)] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[rgb(136,99,64)] text-white py-3 rounded-lg font-medium"
              >
                確認篩選 ({selectedBrands.length} 個品牌)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-16 md:pt-28 flex items-center justify-center">
          載入中...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
