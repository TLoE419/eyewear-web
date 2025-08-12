"use client";

import { useCart } from "@/context/cartContext";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="min-h-screen py-12 pt-[calc(env(safe-area-inset-top)+80px)] md:pt-[calc(env(safe-area-inset-top)+96px)]"
      style={{ backgroundColor: "rgb(231, 229, 218)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 mt-2">{product.brand}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-sm text-gray-500">
                  {product.inStock ? "庫存充足" : "暫時缺貨"}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  商品描述
                </h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  商品規格
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">產地</p>
                    <p className="text-gray-900">日本</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">材料</p>
                    <p className="text-gray-900">-</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">尺寸</p>
                    <p className="text-gray-900">
                      單鏡面寬：52mm
                      <br />
                      鼻距：19mm
                      <br />
                      鏡腳長：145mm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
