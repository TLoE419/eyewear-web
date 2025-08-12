"use client";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgb(231, 229, 218)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">購物車</h1>
          <p className="text-gray-600">管理您的商品選擇</p>
        </div>

        {cart.length === 0 ? (
          /* 空購物車狀態 */
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                購物車是空的
              </h2>
              <p className="text-gray-600 mb-6">
                看起來您還沒有添加任何商品到購物車
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200"
              style={{ backgroundColor: "rgb(38, 38, 38)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(48, 48, 48)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(38, 38, 38)")
              }
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              開始購物
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 商品列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    商品清單 ({cart.length} 件)
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex gap-4">
                      {/* 商品圖片 */}
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* 商品資訊 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-blue-600 mb-3">
                          {item.brand}
                        </p>

                        {/* 數量控制 */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm text-gray-600">數量:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-900 font-medium min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* 小計 */}
                        <p className="text-sm text-gray-600">
                          數量: {item.quantity} 件
                        </p>
                      </div>

                      {/* 移除按鈕 */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-2"
                        title="移除商品"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 訂單摘要 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  訂單摘要
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">商品總數</span>
                    <span className="font-medium text-gray-900">
                      {cart.length} 件
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">商品總數量</span>
                    <span className="font-medium text-gray-900">
                      {total} 件
                    </span>
                  </div>
                </div>

                {/* 操作按鈕 */}
                <div className="space-y-3">
                  <button
                    onClick={handleClearCart}
                    disabled={isClearing}
                    className="w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    {isClearing ? "清空中..." : "清空購物車"}
                  </button>

                  <button
                    className="w-full px-4 py-3 text-white rounded-lg font-medium transition-colors duration-200"
                    style={{ backgroundColor: "rgb(38, 38, 38)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgb(48, 48, 48)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgb(38, 38, 38)")
                    }
                  >
                    預約配鏡
                  </button>
                </div>

                {/* 繼續購物 */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/products"
                    className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    繼續購物
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
