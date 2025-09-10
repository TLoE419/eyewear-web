# Cloudflare 部署完整指南

## 🎯 推薦方案：Supabase + Cloudflare Pages

這是最適合您項目的方案，提供實時資料更新且易於部署。

## 📋 部署步驟

### 第一步：設置 Supabase

1. **創建 Supabase 項目**

   - 訪問 [supabase.com](https://supabase.com)
   - 點擊 "New Project"
   - 選擇組織和項目名稱
   - 設置資料庫密碼
   - 選擇地區（建議選擇離用戶最近的）

2. **設置資料庫**

   - 在 Supabase 控制台，進入 "SQL Editor"
   - 執行 `supabase-schema.sql` 中的 SQL 語句
   - 這會創建 `products` 和 `lenses` 表

3. **獲取 API 金鑰**
   - 進入 "Settings" > "API"
   - 複製 "Project URL" 和 "anon public" 金鑰

### 第二步：配置環境變數

1. **創建 `.env.local` 檔案**

```bash
# 複製範例檔案
cp env.example .env.local
```

2. **編輯 `.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 第三步：初始化資料

1. **上傳初始資料到 Supabase**

```bash
npm run init-supabase
```

2. **驗證資料上傳**
   - 在 Supabase 控制台查看 "Table Editor"
   - 確認 `products` 和 `lenses` 表有資料

### 第四步：本地測試

1. **啟動開發服務器**

```bash
npm run dev
```

2. **測試後台管理**
   - 訪問 `http://localhost:3000/admin`
   - 登入：`admin` / `admin`
   - 測試新增、編輯、刪除功能
   - 確認資料變更在 Supabase 中同步

### 第五步：部署到 Cloudflare Pages

1. **準備部署**

```bash
# 構建項目
npm run build
```

2. **設置 Cloudflare Pages**

   - 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 進入 "Pages" > "Create a project"
   - 選擇 "Upload assets"
   - 上傳 `out` 資料夾

3. **配置環境變數**
   在 Cloudflare Pages 設置中添加：

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **設置自定義域名**（可選）
   - 在 Pages 項目設置中添加自定義域名
   - 配置 DNS 記錄

## 🔧 自動化部署（推薦）

### 使用 Git 整合

1. **推送代碼到 GitHub**

```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

2. **連接 Cloudflare Pages**

   - 在 Cloudflare Pages 選擇 "Connect to Git"
   - 選擇您的 GitHub 倉庫
   - 設置構建配置：
     - Build command: `npm run build`
     - Build output directory: `out`
     - Root directory: `/`

3. **設置環境變數**
   在 Pages 設置中添加環境變數

4. **自動部署**
   - 每次推送代碼到 main 分支會自動部署
   - 可以在 Pages 控制台查看部署狀態

## 🚀 部署後驗證

1. **測試網站功能**

   - 訪問部署的網站
   - 測試前台功能（產品展示、購物車等）
   - 測試後台管理功能

2. **測試資料同步**
   - 在後台新增/編輯產品
   - 檢查前台是否即時更新
   - 驗證資料在 Supabase 中正確保存

## 💰 成本估算

### Supabase

- **免費方案**: 50,000 行資料，500MB 存儲
- **Pro 方案**: $25/月，無限制資料，8GB 存儲

### Cloudflare Pages

- **免費方案**: 500 次構建/月，100GB 頻寬
- **Pro 方案**: $20/月，5,000 次構建/月，1TB 頻寬

### 總成本

- **小型項目**: 免費
- **中型項目**: $25-45/月
- **大型項目**: 根據使用量

## 🔒 安全建議

1. **Supabase 安全設置**

   - 啟用 Row Level Security (RLS)
   - 設置適當的資料庫策略
   - 定期備份資料

2. **環境變數安全**

   - 不要在代碼中硬編碼 API 金鑰
   - 使用環境變數管理敏感資訊
   - 定期輪換 API 金鑰

3. **訪問控制**
   - 考慮添加更強的認證機制
   - 限制後台管理訪問
   - 監控異常活動

## 🛠 故障排除

### 常見問題

1. **資料不同步**

   - 檢查 Supabase 連接
   - 驗證環境變數設置
   - 查看瀏覽器控制台錯誤

2. **部署失敗**

   - 檢查構建日誌
   - 確認環境變數設置
   - 驗證代碼語法

3. **性能問題**
   - 啟用 Cloudflare 快取
   - 優化圖片大小
   - 使用 CDN 加速

### 監控和日誌

1. **Supabase 監控**

   - 查看 API 使用量
   - 監控資料庫性能
   - 設置警報

2. **Cloudflare 分析**
   - 查看訪問統計
   - 監控錯誤率
   - 分析性能指標

## 📞 支援

如果遇到問題：

1. 檢查 [Supabase 文檔](https://supabase.com/docs)
2. 查看 [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
3. 檢查項目中的 `CLOUDFLARE_DEPLOYMENT.md` 檔案

## ✅ 部署檢查清單

- [ ] Supabase 項目創建完成
- [ ] 資料庫 schema 執行成功
- [ ] 環境變數配置正確
- [ ] 初始資料上傳完成
- [ ] 本地測試通過
- [ ] Cloudflare Pages 部署成功
- [ ] 環境變數在 Pages 中設置
- [ ] 網站功能正常
- [ ] 資料同步正常
- [ ] 自定義域名設置（可選）

完成這些步驟後，您的網站就可以在 Cloudflare 上運行，並支援實時資料更新了！
