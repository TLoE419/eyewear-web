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

export async function GET() {
  try {
    // 檢查 Supabase 環境變數
    if (!supabase) {
      console.log("Supabase 環境變數未設置，返回空陣列");
      return NextResponse.json([], {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
    }

    // 從 Supabase 獲取所有產品
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 轉換資料格式以符合前端期望的結構
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const formattedProducts = (products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image_url,
      description: product.description,
      category: "鏡框", // 預設分類
      inStock: true, // 預設有庫存
    }));
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return NextResponse.json(formattedProducts, {
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
