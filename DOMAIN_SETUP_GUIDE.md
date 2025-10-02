# 網域設定指南 - Cloudflare + Vercel

## 🌐 第一部分：在 Cloudflare 購買網域

### 1. 註冊 Cloudflare 帳戶
- 前往 [https://www.cloudflare.com/](https://www.cloudflare.com/)
- 點擊 "Sign Up" 註冊
- 驗證電子郵件地址

### 2. 購買網域
- 登入 Cloudflare 控制台
- 左側選單 → "Domain Registration"
- 點擊 "Register Domains"
- 搜尋網域（建議：`sibao-eyewear.com`、`sibao-optical.com`、`視寶眼鏡.tw`）
- 選擇並購買

### 3. 網域建議
**推薦網域**：
- `sibao-eyewear.com` - 國際化，易記
- `sibao-optical.com` - 專業眼鏡相關
- `sibao.tw` - 台灣地區專用
- `視寶眼鏡.tw` - 中文品牌

## 🚀 第二部分：在 Vercel 部署網站

### 1. 部署到 Vercel
- 前往 [https://vercel.com/](https://vercel.com/)
- 使用 GitHub 帳戶登入
- 點擊 "New Project"
- 選擇 `eyewear-web` 儲存庫
- 配置設定：
  ```
  Framework Preset: Next.js
  Root Directory: ./
  Build Command: npm run build
  Output Directory: .next
  ```

### 2. 設定環境變數
在 Vercel 專案設定 → Environment Variables 中添加：
```
SUPABASE_URL=您的Supabase URL
SUPABASE_ANON_KEY=您的Supabase匿名金鑰
```

## 🔗 第三部分：連接網域

### 1. 在 Vercel 添加自訂網域
- Vercel 專案 → Settings → Domains
- 點擊 "Add Domain"
- 輸入您的網域名稱
- 複製 Vercel 提供的 DNS 設定

### 2. 在 Cloudflare 設定 DNS 記錄

**方法一：使用 Vercel 提供的設定**
```
Type: A
Name: @
IPv4 address: 76.76.19.61
Proxy status: 已代理 (橙色雲朵)

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: 已代理 (橙色雲朵)
```

**方法二：使用 Cloudflare 的 CNAME 設定**
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
Proxy status: 已代理 (橙色雲朵)

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: 已代理 (橙色雲朵)
```

### 3. SSL/TLS 設定
- Cloudflare → SSL/TLS → Overview
- 設定為 "Full (strict)" 模式
- 確保 SSL 憑證自動更新

## ⚙️ 第四部分：進階設定

### 1. Cloudflare 優化設定
**Speed 優化**：
- Auto Minify: 啟用 HTML, CSS, JS
- Brotli Compression: 啟用
- Rocket Loader: 啟用

**Caching 設定**：
- Caching Level: Standard
- Browser Cache TTL: 4 hours
- Always Online: 啟用

### 2. Vercel 優化設定
**Performance**：
- 啟用 Vercel Analytics
- 設定適當的 Cache Headers
- 啟用 Image Optimization

**Security**：
- 啟用 Vercel Security Headers
- 設定 CORS 政策

## 🔍 第五部分：驗證與測試

### 1. DNS 傳播檢查
使用以下工具檢查 DNS 傳播：
- [https://dnschecker.org/](https://dnschecker.org/)
- [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

### 2. 網站功能測試
- [ ] 首頁載入正常
- [ ] 品牌照片顯示
- [ ] 產品頁面功能
- [ ] 鏡片頁面功能
- [ ] 聯絡資訊正確
- [ ] 載入動畫正常
- [ ] 響應式設計

### 3. 效能測試
- [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
- [https://gtmetrix.com/](https://gtmetrix.com/)

## 📞 第六部分：聯絡資訊更新

### 更新網站中的聯絡資訊
確保以下頁面的聯絡資訊正確：
- 首頁 footer
- 隱私權政策頁面
- 使用條款頁面
- 聯絡我們區塊

## 🚨 常見問題排除

### 1. DNS 不生效
- 等待 24-48 小時完整傳播
- 清除瀏覽器快取
- 檢查 DNS 記錄設定

### 2. SSL 憑證問題
- 確認 Cloudflare SSL 設定為 "Full (strict)"
- 檢查 Vercel 的 SSL 設定
- 等待憑證自動更新

### 3. 網站無法載入
- 檢查 Vercel 部署狀態
- 確認環境變數設定正確
- 查看 Vercel 和 Cloudflare 的錯誤日誌

## 📋 完成檢查清單

- [ ] Cloudflare 帳戶註冊完成
- [ ] 網域購買完成
- [ ] Vercel 專案部署成功
- [ ] 環境變數設定正確
- [ ] DNS 記錄設定完成
- [ ] SSL 憑證正常
- [ ] 網站功能測試通過
- [ ] 效能測試達標
- [ ] 聯絡資訊更新完成

## 💡 額外建議

### 1. 備用網域
考慮購買 `.com` 和 `.tw` 兩個版本，並設定重定向。

### 2. 子網域設定
可以設定子網域：
- `admin.sibao-eyewear.com` → 管理後台
- `api.sibao-eyewear.com` → API 服務

### 3. 監控設定
- 設定 Uptime 監控
- 啟用 Vercel Analytics
- 設定 Cloudflare Analytics

---

**注意**：整個設定過程可能需要 24-48 小時完全生效，請耐心等待 DNS 傳播。
