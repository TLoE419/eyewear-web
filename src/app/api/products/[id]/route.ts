import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

// Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// 只有在有環境變數時才創建 Supabase 客戶端
let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 檢查 Supabase 環境變數
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase 環境變數未設置" },
        { status: 500 }
      );
    }

    const { id: productId } = await params;

    // 從 Supabase 獲取特定產品
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "產品不存在" }, { status: 404 });
    }

    if (!product) {
      return NextResponse.json({ error: "產品不存在" }, { status: 404 });
    }

    // 轉換資料格式以符合前端期望的結構
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const formattedProduct = {
      id: (product as any).id,
      name: (product as any).name,
      brand: (product as any).brand,
      image: (product as any).image_url,
      description: (product as any).description,
      category: "鏡框", // 預設分類
      inStock: true, // 預設有庫存
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return NextResponse.json(formattedProduct, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
