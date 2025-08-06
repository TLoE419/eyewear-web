"use client";

import { useCart } from "@/context/cartContext";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
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
    <div className="min-h-screen bg-gray-50 py-12">
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
                <p className="text-2xl font-bold text-rose-600">
                  NT$ {product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">品牌</p>
                    <p className="text-gray-900">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">類別</p>
                    <p className="text-gray-900">{product.category}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                  product.inStock
                    ? "bg-[rgb(136,99,64)] hover:bg-[rgb(115,65,29)]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "加入購物車" : "暫時缺貨"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
