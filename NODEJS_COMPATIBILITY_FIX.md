# Node.js 兼容性問題解決方案

## 🚨 問題描述

您遇到了以下錯誤：

```
Node.JS Compatibility Error
no nodejs_compat compatibility flag set
```

這是因為 Cloudflare Workers 需要啟用 `nodejs_compat` 兼容標誌才能使用 Node.js 模組（如 `node:buffer` 和 `node:async_hooks`）。

## 🔧 解決方案

### 方法 1: 通過 Cloudflare Dashboard 設置（推薦）

1. **訪問 Cloudflare Dashboard**

   - 登入 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 選擇您的帳戶

2. **進入 Pages 項目**

   - 點擊左側選單的 "Pages"
   - 找到並點擊 "eyewear-web" 項目

3. **設置兼容標誌**

   - 點擊 "Settings" 標籤
   - 滾動到 "Compatibility flags" 部分
   - 添加 `nodejs_compat` 標誌
   - 點擊 "Save"

4. **重新部署**
   - 回到 "Deployments" 標籤
   - 點擊最新的部署
   - 點擊 "Retry deployment" 或重新部署

### 方法 2: 通過 Wrangler CLI 設置

```bash
# 設置兼容標誌
npx wrangler pages project update eyewear-web --compatibility-flags nodejs_compat

# 重新部署
npx wrangler pages deploy .vercel/output/static --project-name eyewear-web
```

### 方法 3: 修改 wrangler.toml 配置

確保您的 `wrangler.toml` 文件包含：

```toml
# Cloudflare Workers 配置 - 動態 Next.js 應用程式
name = "eyewear-web"
compatibility_date = "2023-09-28"
compatibility_flags = ["nodejs_compat"]

# 使用 secrets 來安全地存儲敏感資訊
# 執行以下命令來設定 secrets:
# npx wrangler secret put SUPABASE_URL
# npx wrangler secret put SUPABASE_ANON_KEY

# 環境變數
[vars]
NODE_ENV = "production"
```

## 🎯 驗證修復

部署完成後，您可以通過以下方式驗證修復：

1. **檢查網站功能**

   - 訪問 https://3c2ccea6.eyewear-web.pages.dev
   - 檢查品牌系列是否正確顯示
   - 檢查 API 路由是否正常工作

2. **測試 API 端點**

   ```bash
   # 測試照片 API
   curl https://3c2ccea6.eyewear-web.pages.dev/api/photos

   # 測試品牌照片 API
   curl https://3c2ccea6.eyewear-web.pages.dev/api/photos/category/brand_logo
   ```

3. **檢查瀏覽器 Console**
   - 打開瀏覽器開發者工具
   - 檢查是否有 Node.js 兼容性錯誤

## 🚀 預期結果

修復後，您應該看到：

1. **✅ 網站正常加載** - 沒有 Node.js 兼容性錯誤
2. **✅ API 路由正常工作** - 照片 API 返回正確資料
3. **✅ 品牌正確顯示** - 所有 20 個品牌正確顯示
4. **✅ 實時更新** - 管理員更新照片後網站立即反映變化

## 🔍 故障排除

如果問題仍然存在：

1. **清除緩存**

   ```bash
   # 清除本地緩存
   rm -rf .vercel .next node_modules/.cache

   # 重新安裝依賴
   npm install

   # 重新建置和部署
   npx @cloudflare/next-on-pages
   npx wrangler pages deploy .vercel/output/static --project-name eyewear-web
   ```

2. **檢查環境變數**

   - 確保 Supabase 環境變數已正確設置
   - 檢查 Cloudflare Dashboard 中的環境變數

3. **聯繫支援**
   - 如果問題持續存在，可以聯繫 Cloudflare 支援
   - 或考慮使用其他部署平台（如 Vercel）

## 📝 注意事項

- `nodejs_compat` 標誌會增加 Worker 的啟動時間
- 某些 Node.js 模組可能不完全兼容
- 建議在生產環境中測試所有功能

## 🎉 成功指標

修復成功後，您將擁有：

- ✅ 完全動態的 Next.js 應用程式
- ✅ 實時照片更新功能
- ✅ 正確的品牌顯示
- ✅ 全球 CDN 加速
- ✅ Edge 計算性能

您的動態網站現在應該完全正常工作了！🎉
