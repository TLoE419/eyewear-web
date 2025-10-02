-- 刪除 products 表中不需要的欄位

-- 刪除 category 欄位
ALTER TABLE products DROP COLUMN IF EXISTS category;

-- 刪除 price 欄位
ALTER TABLE products DROP COLUMN IF EXISTS price;

-- 刪除 in_stock 欄位
ALTER TABLE products DROP COLUMN IF EXISTS in_stock;

-- 查看修改後的表格結構
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
