# 照片管理系統 - Admin 介面設計

## 概述

此文件描述如何在 eyewear-admin 專案中建立照片管理介面，讓管理員可以管理主頁的所有照片。

## 資料庫結構

### photos 表

```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL, -- 'hero', 'image_slider', 'news_carousel', 'brand_logo', 'store_photo'
  title TEXT,
  subtitle TEXT,
  brand_name TEXT,
  store_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API 端點

### 1. 獲取所有照片

```
GET /api/photos
```

### 2. 根據類別獲取照片

```
GET /api/photos/category/{category}
```

### 3. 上傳照片

```
POST /api/photos/upload
Content-Type: multipart/form-data

FormData:
- file: File
- category: string
- title?: string
- subtitle?: string
- brand_name?: string
- store_name?: string
- display_order?: number
- is_active?: boolean
```

### 4. 更新照片

```
PUT /api/photos/{id}
Content-Type: application/json

Body: Partial<Photo>
```

### 5. 刪除照片

```
DELETE /api/photos/{id}
```

## Admin 介面功能需求

### 1. 照片列表頁面 (`/admin/photos`)

- 顯示所有照片的表格
- 按類別篩選
- 搜尋功能
- 分頁
- 排序功能

### 2. 照片上傳頁面 (`/admin/photos/upload`)

- 檔案上傳
- 類別選擇
- 標題和副標題輸入
- 品牌名稱輸入
- 分店名稱輸入
- 顯示順序設定
- 啟用/停用切換

### 3. 照片編輯頁面 (`/admin/photos/{id}/edit`)

- 編輯照片資訊
- 重新上傳照片
- 預覽功能

### 4. 類別管理頁面 (`/admin/photos/categories`)

- 顯示各類別的照片數量
- 快速編輯各類別照片

## 照片類別說明

### 1. Hero 輪播照片

- **用途**: 首頁主要輪播背景
- **建議尺寸**: 1920x1080
- **最大數量**: 5 張
- **支援格式**: JPG, PNG, WebP

### 2. Image Slider 輪播照片

- **用途**: 首頁圖片輪播區塊
- **建議尺寸**: 1920x1080
- **最大數量**: 10 張
- **支援格式**: JPG, PNG, WebP
- **額外欄位**: title, subtitle

### 3. News Carousel 跑馬燈照片

- **用途**: 首頁新聞跑馬燈
- **建議尺寸**: 800x800
- **最大數量**: 20 張
- **支援格式**: JPG, PNG, WebP
- **額外欄位**: title, brand_name

### 4. Brand Logo 品牌 Logo

- **用途**: 品牌系列展示
- **建議尺寸**: 400x400
- **最大數量**: 50 張
- **支援格式**: JPG, PNG, WebP, SVG
- **額外欄位**: brand_name

### 5. Store Photo 分店照片

- **用途**: 分店展示
- **建議尺寸**: 1200x800
- **最大數量**: 20 張
- **支援格式**: JPG, PNG, WebP
- **額外欄位**: title, store_name

## 實作建議

### 1. 在 eyewear-admin 中建立以下檔案結構：

```
src/
├── pages/
│   └── admin/
│       └── photos/
│           ├── index.tsx          # 照片列表
│           ├── upload.tsx         # 上傳照片
│           ├── [id]/
│           │   └── edit.tsx       # 編輯照片
│           └── categories.tsx     # 類別管理
├── components/
│   └── admin/
│       └── photos/
│           ├── PhotoList.tsx      # 照片列表組件
│           ├── PhotoUpload.tsx    # 照片上傳組件
│           ├── PhotoEdit.tsx      # 照片編輯組件
│           └── PhotoPreview.tsx   # 照片預覽組件
├── hooks/
│   └── usePhotoManagement.ts     # 照片管理 Hook
└── lib/
    └── photoManagement.ts        # 照片管理工具函數
```

### 2. 使用相同的 API 端點

- 直接調用 eyewear-web 的 API 端點
- 確保 CORS 設定正確
- 使用相同的認證機制

### 3. 功能特色

- **拖拽排序**: 支援拖拽調整照片顯示順序
- **批量操作**: 支援批量上傳、刪除、啟用/停用
- **圖片預覽**: 上傳前預覽圖片
- **響應式設計**: 適配各種螢幕尺寸
- **即時更新**: 修改後即時反映到前端

### 4. 權限控制

- 只有管理員可以上傳、編輯、刪除照片
- 記錄操作日誌
- 支援照片版本管理

## 部署注意事項

1. **環境變數**: 確保 eyewear-admin 有正確的 Supabase 配置
2. **CORS**: 設定允許 eyewear-admin 域名訪問 API
3. **檔案大小限制**: 設定適當的檔案上傳大小限制
4. **快取策略**: 設定適當的圖片快取策略

## 使用流程

1. 管理員登入 eyewear-admin
2. 進入照片管理頁面
3. 選擇要管理的照片類別
4. 上傳新照片或編輯現有照片
5. 設定照片資訊（標題、品牌等）
6. 調整顯示順序
7. 啟用/停用照片
8. 儲存變更
9. 變更即時反映到 eyewear-web 主頁
