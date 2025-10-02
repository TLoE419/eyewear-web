# 視寶眼鏡照片 API

這個 API 服務提供照片資料給視寶眼鏡網站使用。

## 部署選項

### 選項 1: 使用 Railway (推薦)

1. 將 `photo-api` 資料夾推送到 GitHub
2. 在 Railway 創建新專案
3. 連接 GitHub 儲存庫
4. 設定環境變數：
   - `SUPABASE_URL`: 你的 Supabase URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase Anon Key
   - `PORT`: 3002 (可選)
5. 部署後會得到一個 URL，例如：`https://your-app.railway.app`

### 選項 2: 使用 Vercel

1. 安裝 Vercel CLI: `npm i -g vercel`
2. 在 `photo-api` 資料夾執行: `vercel`
3. 設定環境變數
4. 部署

### 選項 3: 使用 Heroku

1. 在 `photo-api` 資料夾初始化 git: `git init`
2. 創建 `Procfile`: `web: node index.js`
3. 推送到 Heroku: `git push heroku main`

## 本地開發

```bash
cd photo-api
npm install
cp env.example .env
# 編輯 .env 檔案設定 Supabase 憑證
npm run dev
```

## 使用方式

部署後，更新網站環境變數：

```
NEXT_PUBLIC_PHOTO_API_URL=https://your-api-url.com
```

## API 端點

- `GET /api/photos` - 獲取所有照片
- `GET /api/photos/category/:category` - 根據類別獲取照片
- `GET /health` - 健康檢查

支援的類別：

- `hero` - 首頁輪播
- `image_slider` - 圖片輪播
- `brand_logo` - 品牌 Logo
- `store_photo` - 店面照片
- `news_carousel` - 新聞輪播
