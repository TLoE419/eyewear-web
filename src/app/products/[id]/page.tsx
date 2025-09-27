import React from "react";
import ProductDetailClient from "@/app/products/[id]/ProductDetailClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 為靜態導出生成所有可能的產品 ID
export async function generateStaticParams() {
  // 從靜態資料中獲取所有產品 ID
  try {
    const products = await import("@/data/products.json");
    return products.default.map((product: { id: string }) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error loading products for static generation:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailClient productId={id} />;
}
