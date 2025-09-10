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

async function fixSchema() {
  try {
    console.log("🔧 修復 Supabase 表結構...");

    // 檢查並添加 inStock 欄位到 products 表
    console.log("檢查 products 表的 inStock 欄位...");
    try {
      await supabase.from("products").select("inStock").limit(1);
      console.log("✅ products 表的 inStock 欄位已存在");
    } catch (error: any) {
      if (error.code === "PGRST204") {
        console.log("❌ products 表缺少 inStock 欄位，正在添加...");
        // 注意：這裡無法直接執行 ALTER TABLE，需要手動在 Supabase 控制台執行
        console.log("請手動在 Supabase 控制台執行以下 SQL：");
        console.log(
          "ALTER TABLE products ADD COLUMN IF NOT EXISTS inStock BOOLEAN DEFAULT true;"
        );
      }
    }

    // 檢查並添加 inStock 欄位到 lenses 表
    console.log("檢查 lenses 表的 inStock 欄位...");
    try {
      await supabase.from("lenses").select("inStock").limit(1);
      console.log("✅ lenses 表的 inStock 欄位已存在");
    } catch (error: any) {
      if (error.code === "PGRST204") {
        console.log("❌ lenses 表缺少 inStock 欄位，正在添加...");
        console.log("請手動在 Supabase 控制台執行以下 SQL：");
        console.log(
          "ALTER TABLE lenses ADD COLUMN IF NOT EXISTS inStock BOOLEAN DEFAULT true;"
        );
      }
    }

    console.log("\n📋 如果表結構有問題，請在 Supabase 控制台執行以下 SQL：");
    console.log(`
-- 添加 inStock 欄位到 products 表
ALTER TABLE products ADD COLUMN IF NOT EXISTS inStock BOOLEAN DEFAULT true;

-- 添加 inStock 欄位到 lenses 表  
ALTER TABLE lenses ADD COLUMN IF NOT EXISTS inStock BOOLEAN DEFAULT true;

-- 如果表不存在，請執行完整的 supabase-schema.sql
    `);
  } catch (error) {
    console.error("❌ 修復過程中發生錯誤:", error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  fixSchema();
}

export { fixSchema };
