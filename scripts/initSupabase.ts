import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import productsData from "../src/data/products.json";
import lensesData from "../src/data/lenses.json";

// 載入環境變數
config({ path: ".env.local" });

// 從環境變數獲取 Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("檢查環境變數:");
console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "已設置" : "未設置");
console.log(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
  supabaseKey ? "已設置" : "未設置"
);

if (!supabaseUrl || !supabaseKey) {
  console.error("請設置 Supabase 環境變數");
  console.error("請確保 .env.local 檔案存在且包含正確的 Supabase 配置");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initializeData() {
  try {
    console.log("開始初始化 Supabase 資料...");

    // 初始化產品資料
    console.log("上傳產品資料...");
    const { error: productsError } = await supabase
      .from("products")
      .upsert(productsData, { onConflict: "id" });

    if (productsError) {
      console.error("產品資料上傳失敗:", productsError);
    } else {
      console.log("✅ 產品資料上傳成功");
    }

    // 初始化鏡片資料
    console.log("上傳鏡片資料...");
    const { error: lensesError } = await supabase
      .from("lenses")
      .upsert(lensesData, { onConflict: "id" });

    if (lensesError) {
      console.error("鏡片資料上傳失敗:", lensesError);
    } else {
      console.log("✅ 鏡片資料上傳成功");
    }

    console.log("🎉 資料初始化完成！");
  } catch (error) {
    console.error("初始化過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  initializeData();
}

export { initializeData };
