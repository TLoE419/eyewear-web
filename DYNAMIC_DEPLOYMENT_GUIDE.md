# 動態網站部署指南

## 🎯 問題解決

您的網站已經成功從靜態網站轉換為動態網站，現在可以：

1. ✅ **調用本地 API 路由** - 不再依賴外部 API
2. ✅ **實時更新照片** - 直接從 Supabase 獲取最新資料
3. ✅ **正確顯示品牌** - 使用 API 資料並映射到正確的品牌名稱格式

## 🚀 部署選項

### 選項 1: Vercel (推薦)

Vercel 是 Next.js 的官方平台，完美支援動態 Next.js 應用程式。

#### 步驟：

1. 訪問 [vercel.com](https://vercel.com) 並註冊/登入
2. 連接您的 GitHub 帳戶
3. 導入 `eyewear-web` 專案
4. 設置環境變數：
   ```
   SUPABASE_URL=https://avzngmdgeisolmnomegs.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2em5nbWRnZWlzb2xtbm9tZWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjAyOTksImV4cCI6MjA3MjgzNjI5OX0.CO5o7iWv2J8PfnF29bTNg0O0GKLw1q2tDikukgeIcww
   ```
5. 部署完成！

### 選項 2: Netlify

Netlify 也支援 Next.js 動態應用程式。

#### 步驟：

1. 訪問 [netlify.com](https://netlify.com) 並註冊/登入
2. 連接您的 GitHub 帳戶
3. 新建網站，選擇 `eyewear-web` 專案
4. 設置環境變數（同上）
5. 部署完成！

### 選項 3: Railway

Railway 是另一個支援 Next.js 的平台。

#### 步驟：

1. 訪問 [railway.app](https://railway.app) 並註冊/登入
2. 連接您的 GitHub 帳戶
3. 新建專案，選擇 `eyewear-web` 專案
4. 設置環境變數（同上）
5. 部署完成！

## 🔧 本地測試

在部署之前，您可以在本地測試動態版本：

```bash
# 設置環境變數
export SUPABASE_URL="https://avzngmdgeisolmnomegs.supabase.co"
export SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2em5nbWRnZWlzb2xtbm9tZWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjAyOTksImV4cCI6MjA3MjgzNjI5OX0.CO5o7iWv2J8PfnF29bTNg0O0GKLw1q2tDikukgeIcww"

# 啟動開發服務器
npm run dev
```

## 📊 功能對比

| 功能       | 靜態版本         | 動態版本               |
| ---------- | ---------------- | ---------------------- |
| 照片更新   | ❌ 需要重新部署  | ✅ 實時更新            |
| API 調用   | ❌ 不支援        | ✅ 完全支援            |
| 品牌顯示   | ⚠️ 預設資料      | ✅ API 資料 + 映射     |
| 部署平台   | Cloudflare Pages | Vercel/Netlify/Railway |
| 建置時間   | 快               | 稍慢                   |
| 運行時性能 | 快               | 快                     |

## 🎉 優勢

1. **實時更新** - 管理員在 `eyewear-admin` 更新照片後，網站會立即顯示最新內容
2. **正確品牌顯示** - 使用 API 資料並自動映射到正確的品牌名稱格式
3. **更好的 SEO** - 動態渲染支援更好的搜索引擎優化
4. **靈活性** - 可以輕鬆添加更多動態功能

## 🔗 重要檔案

- `src/app/api/photos/route.ts` - 照片 API 路由
- `src/app/api/photos/category/[category]/route.ts` - 分類照片 API 路由
- `src/hooks/usePhotoManagement.ts` - 照片管理 Hook
- `src/app/components/EyeglassCardGrid.tsx` - 品牌網格組件（包含品牌名稱映射）

## 📝 注意事項

1. **環境變數** - 確保在部署平台設置正確的 Supabase 環境變數
2. **API 路由** - 動態版本使用本地 API 路由，不再依賴外部 Cloudflare Worker
3. **品牌映射** - 系統會自動將 API 返回的小寫品牌名稱映射到正確的顯示格式
4. **備援機制** - 如果 API 不可用，系統會自動使用預設的品牌資料

現在您的網站已經準備好部署為動態版本了！🎉
