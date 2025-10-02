-- 修改 products 表的 RLS 政策，允許匿名用戶插入產品資料

-- 刪除現有的插入政策
DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON products;

-- 創建新的插入政策：允許所有人插入產品資料
CREATE POLICY "Allow public insert access to products" ON products
  FOR INSERT WITH CHECK (true);

-- 刪除現有的更新政策
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON products;

-- 創建新的更新政策：允許所有人更新產品資料
CREATE POLICY "Allow public update access to products" ON products
  FOR UPDATE USING (true);

-- 刪除現有的刪除政策
DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON products;

-- 創建新的刪除政策：允許所有人刪除產品資料
CREATE POLICY "Allow public delete access to products" ON products
  FOR DELETE USING (true);
