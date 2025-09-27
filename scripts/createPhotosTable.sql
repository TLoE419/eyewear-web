-- 建立照片管理資料表
-- 在 Supabase 中執行此 SQL 來建立照片管理系統

-- 建立照片表
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hero', 'image_slider', 'news_carousel', 'brand_logo', 'store_photo')),
  title TEXT,
  subtitle TEXT,
  brand_name TEXT,
  store_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category);
CREATE INDEX IF NOT EXISTS idx_photos_active ON photos(is_active);
CREATE INDEX IF NOT EXISTS idx_photos_display_order ON photos(display_order);
CREATE INDEX IF NOT EXISTS idx_photos_brand_name ON photos(brand_name);

-- 建立更新時間的觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_photos_updated_at 
    BEFORE UPDATE ON photos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 建立 Storage Bucket (如果不存在)
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- 設定 Storage 政策
-- 允許所有人讀取照片
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'photos');

-- 允許認證用戶上傳照片
CREATE POLICY "Authenticated users can upload photos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- 允許認證用戶更新照片
CREATE POLICY "Authenticated users can update photos" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- 允許認證用戶刪除照片
CREATE POLICY "Authenticated users can delete photos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'photos' 
  AND auth.role() = 'authenticated'
);

-- 插入一些預設資料
INSERT INTO photos (image_url, category, title, subtitle, display_order, is_active) VALUES
('/hero-1.jpg', 'hero', 'Hero Image 1', NULL, 1, true),
('/hero-2.jpg', 'hero', 'Hero Image 2', NULL, 2, true),
('/Store_1.jpg', 'image_slider', '精品眼鏡', '時尚與品質的完美結合', 1, true),
('/Store_2.jpg', 'image_slider', '專業服務', '為您提供最優質的視覺體驗', 2, true),
('/Store_3.jpg', 'image_slider', '實體店面', '歡迎蒞臨參觀選購', 3, true),
('/Store_4.jpg', 'image_slider', '專業驗光', '精準驗光，舒適配戴', 4, true),
('/BVLGARI/BVLGARI_1.jpg', 'news_carousel', 'BVLGARI 眼鏡', NULL, 1, true),
('/GUCCI/GUCCI_1.jpg', 'news_carousel', 'GUCCI 眼鏡', NULL, 2, true),
('/MONTBLANC/MONTBLANC_1.jpg', 'news_carousel', 'MONTBLANC 眼鏡', NULL, 3, true),
('/Ray.Ban/RayBan_1.jpg', 'news_carousel', 'Ray-Ban 眼鏡', NULL, 4, true),
('/Logo/rayban.jpg', 'brand_logo', NULL, NULL, 1, true),
('/Logo/lindberg.jpg', 'brand_logo', NULL, NULL, 2, true),
('/Logo/9999.jpg', 'brand_logo', NULL, NULL, 3, true),
('/Logo/bvlgari.jpg', 'brand_logo', NULL, NULL, 4, true),
('/Logo/gucci.jpg', 'brand_logo', NULL, NULL, 5, true),
('/Logo/montblanc.jpg', 'brand_logo', NULL, NULL, 6, true),
('/Store_4.jpg', 'store_photo', '六甲店', NULL, 1, true)
ON CONFLICT DO NOTHING;
