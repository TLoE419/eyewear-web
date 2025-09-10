import { config } from "dotenv";
import { clientSupabaseDataProvider } from "../src/lib/clientSupabaseDataProvider";

// 載入環境變數
config({ path: ".env.local" });

async function testUpdate() {
  try {
    console.log("🧪 測試更新功能...");

    // 先獲取一個產品來測試更新
    console.log("\n📦 獲取第一個產品:");
    const productsResult = await clientSupabaseDataProvider.getList(
      "products",
      {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
        filter: {},
      }
    );

    if (productsResult.data.length === 0) {
      console.log("❌ 沒有找到產品資料");
      return;
    }

    const product = productsResult.data[0];
    console.log("✅ 找到產品:", {
      id: product.id,
      name: product.name,
      brand: product.brand,
    });

    // 測試更新產品
    console.log("\n🔄 測試更新產品:");
    try {
      const updateData = {
        ...product,
        name: `${product.name} (已更新)`,
        updated_at: new Date().toISOString(),
      };

      console.log("更新資料:", updateData);

      const updateResult = await clientSupabaseDataProvider.update("products", {
        id: product.id,
        data: updateData,
        previousData: product,
      });

      console.log("✅ 更新成功:", updateResult.data);
    } catch (error: any) {
      console.log("❌ 更新失敗:", error.message);
      console.log("錯誤詳情:", error);
    }

    // 測試更新鏡片
    console.log("\n🔍 獲取第一個鏡片:");
    const lensesResult = await clientSupabaseDataProvider.getList("lenses", {
      pagination: { page: 1, perPage: 1 },
      sort: { field: "id", order: "ASC" },
      filter: {},
    });

    if (lensesResult.data.length === 0) {
      console.log("❌ 沒有找到鏡片資料");
      return;
    }

    const lens = lensesResult.data[0];
    console.log("✅ 找到鏡片:", {
      id: lens.id,
      name: lens.name,
      brand: lens.brand,
    });

    // 測試更新鏡片
    console.log("\n🔄 測試更新鏡片:");
    try {
      const updateData = {
        ...lens,
        name: `${lens.name} (已更新)`,
        updated_at: new Date().toISOString(),
      };

      console.log("更新資料:", updateData);

      const updateResult = await clientSupabaseDataProvider.update("lenses", {
        id: lens.id,
        data: updateData,
        previousData: lens,
      });

      console.log("✅ 更新成功:", updateResult.data);
    } catch (error: any) {
      console.log("❌ 更新失敗:", error.message);
      console.log("錯誤詳情:", error);
    }
  } catch (error) {
    console.error("❌ 測試過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  testUpdate();
}

export { testUpdate };
