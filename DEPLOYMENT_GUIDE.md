# 視寶眼鏡網站部署指南

## 問題解決方案

由於移除了 API 路由以支援靜態導出，照片資料無法即時更新。以下是幾個解決方案：

## 方案 1: 使用外部照片 API 服務 (推薦)

### 步驟 1: 部署照片 API

選擇以下其中一個方式部署照片 API：

#### 選項 A: Railway (最簡單)

1. 將 `photo-api` 資料夾推送到 GitHub
2. 在 [Railway](https://railway.app) 創建新專案
3. 連接 GitHub 儲存庫
4. 設定環境變數：
   - `SUPABASE_URL`: 你的 Supabase URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase Anon Key
5. 部署後會得到一個 URL，例如：`https://your-app.railway.app`

#### 選項 B: Vercel

1. 安裝 Vercel CLI: `npm i -g vercel`
2. 在 `photo-api` 資料夾執行: `vercel`
3. 設定環境變數
4. 部署

#### 選項 C: Cloudflare Workers

1. 安裝 Wrangler: `npm i -g wrangler`
2. 設定環境變數: `wrangler secret put SUPABASE_URL`
3. 部署: `wrangler deploy`

### 步驟 2: 更新網站環境變數

在 Cloudflare Pages 設定環境變數：

```
NEXT_PUBLIC_PHOTO_API_URL=https://your-api-url.com
```

### 步驟 3: 重新部署網站

```bash
npm run build
npx wrangler pages deploy out --project-name eyewear-web
```

## 方案 2: 使用 GitHub Actions 定期重建

創建 `.github/workflows/redeploy.yml`:

```yaml
name: Redeploy Site
on:
  schedule:
    - cron: "0 */6 * * *" # 每 6 小時執行一次
  workflow_dispatch: # 手動觸發

jobs:
  redeploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Cloudflare Pages
        run: npx wrangler pages deploy out --project-name eyewear-web
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 方案 3: 使用靜態資料 (目前狀態)

目前網站使用預設照片資料，不依賴資料庫。如果需要更新照片：

1. 直接修改 `src/hooks/usePhotoManagement.ts` 中的 `getDefaultPhotos` 函數
2. 重新建置和部署

## 推薦方案

**建議使用方案 1 (外部 API 服務)**，因為：

- 支援即時更新
- 不影響靜態導出
- 效能最佳
- 維護簡單

## 測試

部署後，檢查照片是否正常載入：

1. 開啟瀏覽器開發者工具
2. 查看 Console 是否有 API 調用日誌
3. 檢查 Network 標籤中的 API 請求

## 故障排除

如果照片無法載入：

1. 檢查 `NEXT_PUBLIC_PHOTO_API_URL` 環境變數是否正確設定
2. 確認照片 API 服務是否正常運行
3. 檢查 Supabase 資料庫連線
4. 查看瀏覽器 Console 錯誤訊息
