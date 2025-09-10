"use client";

import React from "react";
import { useProduct } from "@/hooks/useSupabaseData";
import ProductDetailClient from "@/app/products/[id]/ProductDetailClient";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const [productId, setProductId] = React.useState<string>("");
  const { product, loading, error } = useProduct(productId);

  React.useEffect(() => {
    params.then(({ id }) => setProductId(id));
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 max-w-lg mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            載入商品時發生錯誤
          </h1>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">商品未找到</h1>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
