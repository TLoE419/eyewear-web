import { NextResponse } from "next/server";
import { dataStore } from "@/lib/dataStore";

// 配置動態渲染
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const product = dataStore.products.getById(resolvedParams.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const updatedProduct = await request.json();
    const resolvedParams = await params;
    const product = dataStore.products.update(
      resolvedParams.id,
      updatedProduct
    );
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const result = dataStore.products.delete(resolvedParams.id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
