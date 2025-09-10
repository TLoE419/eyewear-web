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

async function setupDatabase() {
  try {
    console.log("🔧 設置 Supabase 資料庫...");

    // 檢查表是否存在
    console.log("檢查 products 表...");
    const { data: productsTable, error: productsError } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (productsError && productsError.code === "PGRST116") {
      console.log(
        "❌ products 表不存在，請先在 Supabase 控制台執行 supabase-schema.sql"
      );
      console.log("📋 步驟：");
      console.log("1. 前往 Supabase 控制台");
      console.log("2. 進入 SQL Editor");
      console.log("3. 執行 supabase-schema.sql 中的 SQL 語句");
      return;
    }

    console.log("檢查 lenses 表...");
    const { data: lensesTable, error: lensesError } = await supabase
      .from("lenses")
      .select("id")
      .limit(1);

    if (lensesError && lensesError.code === "PGRST116") {
      console.log(
        "❌ lenses 表不存在，請先在 Supabase 控制台執行 supabase-schema.sql"
      );
      return;
    }

    console.log("✅ 資料庫表已存在");

    // 清空現有資料
    console.log("🗑️  清空現有資料...");
    await supabase.from("products").delete().neq("id", "");
    await supabase.from("lenses").delete().neq("id", "");

    // 上傳產品資料
    console.log("📦 上傳產品資料...");
    const { error: productsUploadError } = await supabase
      .from("products")
      .insert(productsData);

    if (productsUploadError) {
      console.error("❌ 產品資料上傳失敗:", productsUploadError);
    } else {
      console.log("✅ 產品資料上傳成功");
    }

    // 上傳鏡片資料
    console.log("🔍 上傳鏡片資料...");
    const { error: lensesUploadError } = await supabase
      .from("lenses")
      .insert(lensesData);

    if (lensesUploadError) {
      console.error("❌ 鏡片資料上傳失敗:", lensesUploadError);
    } else {
      console.log("✅ 鏡片資料上傳成功");
    }

    console.log("🎉 資料庫設置完成！");
  } catch (error) {
    console.error("❌ 設置過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  setupDatabase();
}

export { setupDatabase };
