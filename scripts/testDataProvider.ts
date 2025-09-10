import { config } from "dotenv";
import { supabaseDataProvider } from "../src/lib/supabaseDataProvider";

// 載入環境變數
config({ path: ".env.local" });

async function testDataProvider() {
  try {
    console.log("🧪 測試 Supabase 資料提供者...");

    // 測試獲取產品列表
    console.log("\n📦 測試獲取產品列表:");
    try {
      const productsResult = await supabaseDataProvider.getList("products", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      });

      console.log("✅ 產品列表獲取成功");
      console.log("📊 產品數量:", productsResult.total);
      console.log(
        "📋 前3個產品:",
        productsResult.data
          .slice(0, 3)
          .map((p) => ({ id: p.id, name: p.name, brand: p.brand }))
      );
    } catch (error: any) {
      console.log("❌ 產品列表獲取失敗:", error.message);
    }

    // 測試獲取鏡片列表
    console.log("\n🔍 測試獲取鏡片列表:");
    try {
      const lensesResult = await supabaseDataProvider.getList("lenses", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      });

      console.log("✅ 鏡片列表獲取成功");
      console.log("📊 鏡片數量:", lensesResult.total);
      console.log(
        "📋 前3個鏡片:",
        lensesResult.data
          .slice(0, 3)
          .map((l) => ({ id: l.id, name: l.name, brand: l.brand }))
      );
    } catch (error: any) {
      console.log("❌ 鏡片列表獲取失敗:", error.message);
    }

    // 測試獲取單個產品
    console.log("\n🔍 測試獲取單個產品:");
    try {
      const productResult = await supabaseDataProvider.getOne("products", {
        id: "1",
      });
      console.log("✅ 單個產品獲取成功");
      console.log("📋 產品詳情:", {
        id: productResult.data.id,
        name: productResult.data.name,
        brand: productResult.data.brand,
      });
    } catch (error: any) {
      console.log("❌ 單個產品獲取失敗:", error.message);
    }
  } catch (error) {
    console.error("❌ 測試過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  testDataProvider();
}

export { testDataProvider };
