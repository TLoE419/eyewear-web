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

async function checkTables() {
  try {
    console.log("🔍 檢查 Supabase 表結構...");

    // 檢查 products 表
    console.log("\n📦 檢查 products 表:");
    try {
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .limit(1);

      if (productsError) {
        console.log("❌ products 表錯誤:", productsError.message);
      } else {
        console.log("✅ products 表存在");
        if (products && products.length > 0) {
          console.log("📋 products 表欄位:", Object.keys(products[0]));
        } else {
          console.log("📋 products 表為空");
        }
      }
    } catch (error: any) {
      console.log("❌ products 表不存在或無法訪問:", error.message);
    }

    // 檢查 lenses 表
    console.log("\n🔍 檢查 lenses 表:");
    try {
      const { data: lenses, error: lensesError } = await supabase
        .from("lenses")
        .select("*")
        .limit(1);

      if (lensesError) {
        console.log("❌ lenses 表錯誤:", lensesError.message);
      } else {
        console.log("✅ lenses 表存在");
        if (lenses && lenses.length > 0) {
          console.log("📋 lenses 表欄位:", Object.keys(lenses[0]));
        } else {
          console.log("📋 lenses 表為空");
        }
      }
    } catch (error: any) {
      console.log("❌ lenses 表不存在或無法訪問:", error.message);
    }

    // 嘗試插入測試資料
    console.log("\n🧪 測試插入資料:");
    try {
      const testProduct = {
        id: "test-1",
        name: "測試產品",
        brand: "測試品牌",
        category: "測試類別",
        image: "/test.jpg",
        description: "測試描述",
        inStock: true,
      };

      const { error: insertError } = await supabase
        .from("products")
        .insert([testProduct]);

      if (insertError) {
        console.log("❌ 插入測試資料失敗:", insertError.message);
      } else {
        console.log("✅ 插入測試資料成功");

        // 刪除測試資料
        await supabase.from("products").delete().eq("id", "test-1");
        console.log("🗑️  已刪除測試資料");
      }
    } catch (error: any) {
      console.log("❌ 測試插入失敗:", error.message);
    }
  } catch (error) {
    console.error("❌ 檢查過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  checkTables();
}

export { checkTables };
