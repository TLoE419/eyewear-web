import productsData from "@/data/products.json";
import ProductDetailClient from "@/app/products/[id]/ProductDetailClient";
import Link from "next/link";

// 靜態生成參數
export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

// 確保不跑動態
export const dynamic = "error";
export const revalidate = false;

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // 等待params Promise
  const { id } = await params;

  // 根據params.id找到對應的產品
  const product = productsData.find((p) => p.id === id) as Product;

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
