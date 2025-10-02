# Cloudflare Workers 部署指南

## 步驟 1: 設定環境變數

執行以下命令來設定 Supabase 憑證：

```bash
# 設定 Supabase URL
npx wrangler secret put SUPABASE_URL
# 輸入您的 Supabase URL，例如：https://your-project.supabase.co

# 設定 Supabase Anon Key
npx wrangler secret put SUPABASE_ANON_KEY
# 輸入您的 Supabase Anon Key
```

## 步驟 2: 部署 Worker

```bash
npx wrangler deploy
```

部署成功後，您會看到類似這樣的輸出：

```
✨ Success! Published to https://eyewear-photo-api.your-subdomain.workers.dev
```

## 步驟 3: 測試 API

測試您的 Worker 是否正常運行：

```bash
# 健康檢查
curl https://eyewear-photo-api.your-subdomain.workers.dev/health

# 測試照片 API
curl https://eyewear-photo-api.your-subdomain.workers.dev/api/photos/cat/egory/hero
```

## 步驟 4: 更新網站環境變數

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 選擇您的 Pages 專案 (eyewear-web)
3. 進入 Settings > Environment variables
4. 添加新的環境變數：
   - **Name**: `NEXT_PUBLIC_PHOTO_API_URL`
   - **Value**: `https://eyewear-photo-api.your-subdomain.workers.dev`

## 步驟 5: 重新部署網站

```bash
npm run build
npx wrangler pages deploy out --project-name eyewear-web
```

## 故障排除

### 如果 Worker 部署失敗

- 檢查 Supabase 憑證是否正確
- 確認 wrangler.toml 配置是否正確

### 如果 API 無法訪問

- 檢查 Worker URL 是否正確
- 確認 CORS 設定是否正確

### 如果照片無法載入

- 檢查網站環境變數是否設定正確
- 確認 Worker API 是否正常響應
- 查看瀏覽器 Console 錯誤訊息

## 監控和日誌

查看 Worker 日誌：

```bash
npx wrangler tail eyewear-photo-api
```

## 更新 Worker

如果需要更新 Worker 代碼：

1. 修改 `cloudflare-worker.js`
2. 執行 `npx wrangler deploy`
3. 重新部署網站
