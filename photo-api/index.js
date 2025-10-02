const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3002;

// 中間件
app.use(cors());
app.use(express.json());

// Supabase 客戶端
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 照片類別對應
const PHOTO_CATEGORIES = {
  hero: "hero",
  image_slider: "image_slider",
  brand_logo: "brand_logo",
  store_photo: "store_photo",
  news_carousel: "news_carousel",
};

// 獲取所有照片
app.get("/api/photos", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(data || []);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 根據類別獲取照片
app.get("/api/photos/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    if (!PHOTO_CATEGORIES[category]) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("category", PHOTO_CATEGORIES[category])
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(data || []);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 健康檢查
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Photo API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
