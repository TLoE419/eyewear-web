-- 創建 products 資料表
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  description TEXT,
  made_in TEXT,
  size TEXT,
  in_stock BOOLEAN DEFAULT true,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以提高查詢效能
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- 啟用 Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 創建 RLS 政策：允許所有人讀取產品資料
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

-- 創建 RLS 政策：允許認證用戶插入產品資料
CREATE POLICY "Allow authenticated users to insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 創建 RLS 政策：允許認證用戶更新產品資料
CREATE POLICY "Allow authenticated users to update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 創建 RLS 政策：允許認證用戶刪除產品資料
CREATE POLICY "Allow authenticated users to delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- 創建更新時間的自動觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();