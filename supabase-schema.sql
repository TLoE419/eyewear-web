-- 創建產品表
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  inStock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建鏡片表
CREATE TABLE IF NOT EXISTS lenses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  price TEXT,
  inStock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用 Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenses ENABLE ROW LEVEL SECURITY;

-- 創建允許所有人讀寫的策略（用於演示，生產環境請設置適當的權限）
CREATE POLICY "Allow all operations on products" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on lenses" ON lenses
  FOR ALL USING (true) WITH CHECK (true);

-- 創建更新時間的觸發器函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 為產品表添加更新時間觸發器
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 為鏡片表添加更新時間觸發器
CREATE TRIGGER update_lenses_updated_at
  BEFORE UPDATE ON lenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
