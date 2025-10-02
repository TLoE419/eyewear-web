import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// 載入環境變數
import { config } from "dotenv";
config({ path: ".env.local" });

// Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("請設定 Supabase 環境變數");
  console.error("需要的變數: SUPABASE_URL 和 SUPABASE_ANON_KEY");
  process.exit(1);
}

console.log("Supabase URL:", supabaseUrl);
console.log("使用 Key:", supabaseKey.substring(0, 20) + "...");

const supabase = createClient(supabaseUrl, supabaseKey);

// 產品資料配置
const products = [
  {
    id: "1",
    name: "Ray-Ban 經典款",
    brand: "Ray-Ban",
    category: "經典款式",
    image: "/Ray.Ban/RayBan_1.jpg",
    description: "經典 Ray-Ban 太陽眼鏡，時尚百搭。",
    inStock: true,
  },
  {
    id: "2",
    name: "LINDBERG 輕量鏡框",
    brand: "LINDBERG",
    category: "輕量設計",
    image: "/LINDBERG/Lindberg_1.jpg",
    description: "極致輕量設計，舒適配戴。",
    inStock: true,
  },
  {
    id: "3",
    name: "999.9 高彈性鏡框",
    brand: "9999",
    category: "創新科技",
    image: "/999.9/999.9_1.jpg",
    description: "高彈性材質，耐用不易變形。",
    inStock: true,
  },
  {
    id: "4",
    name: "GUCCI 時尚鏡框 1",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_1.jpg",
    description: "奢華時尚設計，展現個人品味。",
    inStock: true,
  },
  {
    id: "5",
    name: "GUCCI 時尚鏡框 2",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_2.jpg",
    description: "優雅設計，經典不敗。",
    inStock: true,
  },
  {
    id: "6",
    name: "GUCCI 時尚鏡框 3",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_3.jpg",
    description: "現代時尚，引領潮流。",
    inStock: true,
  },
  {
    id: "7",
    name: "GUCCI 時尚鏡框 4",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_4.jpg",
    description: "精緻工藝，品質保證。",
    inStock: true,
  },
  {
    id: "8",
    name: "GUCCI 時尚鏡框 5",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_5.jpg",
    description: "獨特設計，彰顯個性。",
    inStock: true,
  },
  {
    id: "9",
    name: "GUCCI 時尚鏡框 6",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_6.jpg",
    description: "經典款式，永不過時。",
    inStock: true,
  },
  {
    id: "10",
    name: "GUCCI 時尚鏡框 7",
    brand: "GUCCI",
    category: "奢華時尚",
    image: "/GUCCI/GUCCI_7.jpg",
    description: "時尚前衛，引領風潮。",
    inStock: true,
  },
  {
    id: "11",
    name: "BVLGARI 精品鏡框 1",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_1.jpg",
    description: "義大利精品工藝，優雅設計。",
    inStock: true,
  },
  {
    id: "12",
    name: "BVLGARI 精品鏡框 2",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_2.jpg",
    description: "奢華體驗，尊貴享受。",
    inStock: true,
  },
  {
    id: "13",
    name: "BVLGARI 精品鏡框 3",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_3.jpg",
    description: "精緻工藝，完美細節。",
    inStock: true,
  },
  {
    id: "14",
    name: "BVLGARI 精品鏡框 4",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_4.jpg",
    description: "經典設計，永恆魅力。",
    inStock: true,
  },
  {
    id: "15",
    name: "BVLGARI 精品鏡框 5",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_5.jpg",
    description: "優雅氣質，非凡品味。",
    inStock: true,
  },
  {
    id: "16",
    name: "BVLGARI 精品鏡框 6",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_6.jpg",
    description: "時尚設計，引領潮流。",
    inStock: true,
  },
  {
    id: "17",
    name: "BVLGARI 精品鏡框 7",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_7.jpg",
    description: "精緻美學，藝術氣息。",
    inStock: true,
  },
  {
    id: "18",
    name: "BVLGARI 精品鏡框 8",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_8.jpg",
    description: "現代設計，前衛創新。",
    inStock: true,
  },
  {
    id: "19",
    name: "BVLGARI 精品鏡框 9",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_9.jpg",
    description: "經典款式，永不過時。",
    inStock: true,
  },
  {
    id: "20",
    name: "BVLGARI 精品鏡框 10",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_10.jpg",
    description: "優雅設計，彰顯品味。",
    inStock: true,
  },
  {
    id: "21",
    name: "BVLGARI 精品鏡框 11",
    brand: "BVLGARI",
    category: "精品工藝",
    image: "/BVLGARI/BVLGARI_11.jpg",
    description: "精緻工藝，品質保證。",
    inStock: true,
  },
  {
    id: "22",
    name: "MONTBLANC 商務鏡框 1",
    brand: "MONTBLANC",
    category: "商務精英",
    image: "/MONTBLANC/MONTBLANC_1.jpg",
    description: "商務精英首選，專業形象。",
    inStock: true,
  },
  {
    id: "23",
    name: "MONTBLANC 商務鏡框 2",
    brand: "MONTBLANC",
    category: "商務精英",
    image: "/MONTBLANC/MONTBLANC_2.jpg",
    description: "經典商務風格，穩重可靠。",
    inStock: true,
  },
  {
    id: "24",
    name: "MONTBLANC 商務鏡框 3",
    brand: "MONTBLANC",
    category: "商務精英",
    image: "/MONTBLANC/MONTBLANC_3.jpg",
    description: "現代商務設計，時尚專業。",
    inStock: true,
  },
];

async function clearExistingProductPhotos() {
  console.log("🗑️  清除現有產品照片資料...");

  try {
    // 刪除資料庫中的產品照片記錄 (category = 'product')
    const { error: deleteError } = await supabase
      .from("photos")
      .delete()
      .eq("category", "product");

    if (deleteError) {
      console.error("刪除產品照片記錄失敗:", deleteError);
      return false;
    }

    // 刪除 storage 中的產品照片
    const { data: files, error: listError } = await supabase.storage
      .from("photos")
      .list();

    if (listError) {
      console.error("列出檔案失敗:", listError);
      return false;
    }

    if (files && files.length > 0) {
      // 只刪除產品相關的檔案
      const productFiles = files.filter((file) =>
        file.name.startsWith("product-")
      );
      if (productFiles.length > 0) {
        const fileNames = productFiles.map((file) => file.name);
        const { error: removeError } = await supabase.storage
          .from("photos")
          .remove(fileNames);

        if (removeError) {
          console.error("刪除檔案失敗:", removeError);
          return false;
        }
      }
    }

    console.log("✅ 現有產品照片已清除");
    return true;
  } catch (error) {
    console.error("清除產品照片時發生錯誤:", error);
    return false;
  }
}

async function uploadProductImage(imagePath, productId) {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath.substring(1));

    // 檢查檔案是否存在
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  檔案不存在: ${fullPath}`);
      return null;
    }

    // 讀取檔案
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExt = path.extname(imagePath);
    const uploadFileName = `product-${productId}-${Date.now()}${fileExt}`;
    const storagePath = `products/${uploadFileName}`;

    // 修正 MIME 類型
    let contentType = `image/${fileExt.substring(1)}`;
    if (contentType === "image/jpg") {
      contentType = "image/jpeg";
    }

    // 上傳到 Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(storagePath, fileBuffer, {
        contentType: contentType,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error(`上傳檔案失敗 ${imagePath}:`, uploadError);
      return null;
    }

    // 獲取公開 URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("photos").getPublicUrl(storagePath);

    console.log(`✅ 圖片上傳成功: ${imagePath} -> ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`處理圖片時發生錯誤 ${imagePath}:`, error);
    return null;
  }
}

async function uploadProductsAsPhotos() {
  console.log("🚀 開始上傳產品照片...");

  for (const product of products) {
    console.log(`\n📦 處理產品: ${product.name}`);

    // 上傳產品圖片
    const imageUrl = await uploadProductImage(product.image, product.id);

    if (!imageUrl) {
      console.warn(`⚠️  跳過產品 ${product.name}，圖片上傳失敗`);
      continue;
    }

    // 準備產品資料 (使用 photos table 結構)
    const photoData = {
      image_url: imageUrl,
      category: "product", // 使用 "product" 作為分類
      title: product.name, // 使用 title 欄位儲存產品名稱
      display_order: parseInt(product.id), // 使用產品 ID 作為顯示順序
      is_active: product.inStock,
      // 將額外資訊儲存在現有欄位中
      文字欄1: product.brand, // 使用文字欄1儲存品牌
      文字欄2: product.category, // 使用文字欄2儲存產品分類
      文字欄3: product.id, // 使用文字欄3儲存產品ID
      文字欄4: product.description, // 使用文字欄4儲存產品描述
    };

    // 儲存到資料庫 (使用 photos table)
    const { data: savedPhoto, error: dbError } = await supabase
      .from("photos")
      .insert([photoData])
      .select()
      .single();

    if (dbError) {
      console.error(`儲存產品照片資料失敗 ${product.name}:`, dbError);
      continue;
    }

    console.log(`✅ 產品照片上傳成功: ${product.name}`);

    // 避免過快上傳
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log("\n🎉 產品照片上傳完成！");
}

async function main() {
  console.log("📦 產品照片上傳工具啟動");

  // 清除現有產品照片
  const cleared = await clearExistingProductPhotos();
  if (!cleared) {
    console.error("❌ 清除現有產品照片失敗，停止執行");
    return;
  }

  // 上傳新產品照片
  await uploadProductsAsPhotos();

  // 顯示統計
  const { data: photos, error } = await supabase
    .from("photos")
    .select("category, 文字欄1, 文字欄2")
    .eq("category", "product")
    .eq("is_active", true);

  if (!error && photos) {
    const brandStats = photos.reduce((acc, photo) => {
      const brand = photo.文字欄1 || "未知品牌";
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});

    const categoryStats = photos.reduce((acc, photo) => {
      const category = photo.文字欄2 || "未知分類";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    console.log("\n📊 上傳統計:");
    console.log(`  總產品照片數: ${photos.length}`);
    console.log("\n  品牌統計:");
    Object.entries(brandStats).forEach(([brand, count]) => {
      console.log(`    ${brand}: ${count} 張照片`);
    });
    console.log("\n  分類統計:");
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`    ${category}: ${count} 張照片`);
    });
  }
}

main().catch(console.error);
