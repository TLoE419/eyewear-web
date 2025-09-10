import { DataProvider } from "react-admin";
import { dataProvider as localDataProvider } from "./dataProvider";

// 根據環境選擇 dataProvider
export const getDataProvider = (): DataProvider => {
  // 檢查是否在客戶端環境
  if (typeof window === "undefined") {
    console.log("服務端環境，使用本地 dataProvider");
    return localDataProvider;
  }

  // 檢查是否有 Supabase 配置
  const hasSupabaseConfig =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (hasSupabaseConfig) {
    console.log("客戶端環境，使用 Supabase dataProvider");
    try {
      // 動態導入 Supabase dataProvider 以避免服務端渲染問題
      const {
        clientSupabaseDataProvider,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require("./clientSupabaseDataProvider");
      return clientSupabaseDataProvider;
    } catch (error) {
      console.warn(
        "無法載入 Supabase dataProvider，回退到本地 dataProvider:",
        error
      );
      return localDataProvider;
    }
  } else {
    console.log("客戶端環境，使用本地 dataProvider");
    return localDataProvider;
  }
};

// 導出預設的 dataProvider（在服務端環境中總是使用本地 dataProvider）
export const dataProvider =
  typeof window === "undefined" ? localDataProvider : getDataProvider();
