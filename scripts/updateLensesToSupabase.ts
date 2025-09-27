import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 創建 Supabase 客戶端
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase 環境變數未設置");
  }

  return createClient(supabaseUrl, supabaseKey);
};

// 鏡片數據接口
interface Lens {
  id: string;
  name: string;
  brand: string;
  image: string;
  shortDescription: string;
  longDescription: string;
}

async function updateLensesToSupabase() {
  try {
    console.log("開始更新鏡片數據到 Supabase...");

    // 讀取本地鏡片數據
    const lensesPath = path.join(process.cwd(), "src", "data", "lenses.json");
    const lensesData: Lens[] = JSON.parse(fs.readFileSync(lensesPath, "utf8"));

    console.log(`讀取到 ${lensesData.length} 個鏡片數據`);

    // 創建 Supabase 客戶端
    const supabase = createSupabaseClient();

    // 清空現有的鏡片數據
    console.log("清空現有的鏡片數據...");
    const { error: deleteError } = await supabase
      .from("lenses")
      .delete()
      .neq("id", ""); // 刪除所有記錄

    if (deleteError) {
      console.error("清空數據失敗:", deleteError);
      throw deleteError;
    }

    console.log("成功清空現有數據");

    // 插入新的鏡片數據
    console.log("插入新的鏡片數據...");
    const { data, error: insertError } = await supabase
      .from("lenses")
      .insert(lensesData)
      .select();

    if (insertError) {
      console.error("插入數據失敗:", insertError);
      throw insertError;
    }

    console.log("成功插入鏡片數據:");
    data?.forEach((lens, index) => {
      console.log(`${index + 1}. ${lens.name} (${lens.brand})`);
    });

    console.log("\n✅ 鏡片數據更新完成！");
    console.log(`總共更新了 ${data?.length || 0} 個鏡片`);
  } catch (error) {
    console.error("❌ 更新失敗:", error);
    process.exit(1);
  }
}

// 執行更新
updateLensesToSupabase();
