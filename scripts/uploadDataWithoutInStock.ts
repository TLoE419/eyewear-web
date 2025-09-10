import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import productsData from "../src/data/products.json";
import lensesData from "../src/data/lenses.json";

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

async function uploadDataWithoutInStock() {
  try {
    console.log("📦 上傳資料（跳過 inStock 欄位）...");

    // 準備產品資料（移除 inStock 欄位）
    const productsWithoutInStock = productsData.map((product) => {
      const { inStock, ...productWithoutInStock } = product;
      return productWithoutInStock;
    });

    // 準備鏡片資料（移除 inStock 欄位）
    const lensesWithoutInStock = lensesData.map((lens) => {
      const { inStock, ...lensWithoutInStock } = lens;
      return lensWithoutInStock;
    });

    // 清空現有資料
    console.log("🗑️  清空現有資料...");
    await supabase.from("products").delete().neq("id", "");
    await supabase.from("lenses").delete().neq("id", "");

    // 上傳產品資料
    console.log("📦 上傳產品資料...");
    const { error: productsError } = await supabase
      .from("products")
      .insert(productsWithoutInStock);

    if (productsError) {
      console.error("❌ 產品資料上傳失敗:", productsError);
    } else {
      console.log("✅ 產品資料上傳成功");
    }

    // 上傳鏡片資料
    console.log("🔍 上傳鏡片資料...");
    const { error: lensesError } = await supabase
      .from("lenses")
      .insert(lensesWithoutInStock);

    if (lensesError) {
      console.error("❌ 鏡片資料上傳失敗:", lensesError);
    } else {
      console.log("✅ 鏡片資料上傳成功");
    }

    console.log("🎉 資料上傳完成！");
    console.log(
      "⚠️  注意：資料中不包含 inStock 欄位，請在 Supabase 控制台添加此欄位"
    );
  } catch (error) {
    console.error("❌ 上傳過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  uploadDataWithoutInStock();
}

export { uploadDataWithoutInStock };
