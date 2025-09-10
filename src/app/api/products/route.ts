import { NextResponse } from "next/server";
import { dataStore } from "@/lib/dataStore";

// 配置動態渲染
export const dynamic = "force-dynamic";

export async function GET() {
  const products = dataStore.products.getAll();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const product = dataStore.products.create(newProduct);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
