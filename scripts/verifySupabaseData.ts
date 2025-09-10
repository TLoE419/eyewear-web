import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// 載入環境變數
config({ path: ".env.local" });

// 從環境變數獲取 Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("請設置 Supabase 環境變數");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySupabaseData() {
  try {
    console.log("🔍 驗證 Supabase 資料...");

    // 檢查產品資料
    console.log("\n📦 檢查產品資料:");
    const {
      data: products,
      error: productsError,
      count: productsCount,
    } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("id");

    if (productsError) {
      console.log("❌ 產品資料查詢失敗:", productsError.message);
    } else {
      console.log("✅ 產品資料查詢成功");
      console.log("📊 產品總數:", productsCount);
      console.log("📋 前5個產品:");
      products?.slice(0, 5).forEach((product) => {
        console.log(`  - ${product.id}: ${product.name} (${product.brand})`);
      });
    }

    // 檢查鏡片資料
    console.log("\n🔍 檢查鏡片資料:");
    const {
      data: lenses,
      error: lensesError,
      count: lensesCount,
    } = await supabase
      .from("lenses")
      .select("*", { count: "exact" })
      .order("id");

    if (lensesError) {
      console.log("❌ 鏡片資料查詢失敗:", lensesError.message);
    } else {
      console.log("✅ 鏡片資料查詢成功");
      console.log("📊 鏡片總數:", lensesCount);
      console.log("📋 所有鏡片:");
      lenses?.forEach((lens) => {
        console.log(`  - ${lens.id}: ${lens.name} (${lens.brand})`);
      });
    }

    // 檢查資料完整性
    console.log("\n🔍 檢查資料完整性:");
    const expectedProducts = 24;
    const expectedLenses = 5;

    if (productsCount === expectedProducts) {
      console.log("✅ 產品數量正確:", productsCount);
    } else {
      console.log(
        "⚠️  產品數量不正確:",
        productsCount,
        "期望:",
        expectedProducts
      );
    }

    if (lensesCount === expectedLenses) {
      console.log("✅ 鏡片數量正確:", lensesCount);
    } else {
      console.log("⚠️  鏡片數量不正確:", lensesCount, "期望:", expectedLenses);
    }

    // 檢查必要欄位
    console.log("\n🔍 檢查必要欄位:");
    if (products && products.length > 0) {
      const firstProduct = products[0];
      const requiredFields = ["id", "name", "brand", "category", "image"];
      const missingFields = requiredFields.filter(
        (field) => !firstProduct[field]
      );

      if (missingFields.length === 0) {
        console.log("✅ 產品必要欄位完整");
      } else {
        console.log("❌ 產品缺少欄位:", missingFields);
      }
    }

    if (lenses && lenses.length > 0) {
      const firstLens = lenses[0];
      const requiredFields = ["id", "name", "brand", "category", "image"];
      const missingFields = requiredFields.filter((field) => !firstLens[field]);

      if (missingFields.length === 0) {
        console.log("✅ 鏡片必要欄位完整");
      } else {
        console.log("❌ 鏡片缺少欄位:", missingFields);
      }
    }

    console.log("\n🎉 資料驗證完成！");
  } catch (error) {
    console.error("❌ 驗證過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  verifySupabaseData();
}

export { verifySupabaseData };
