# 環境變數設置指南

## 🚨 錯誤解決

如果您遇到 `Error: Failed to construct 'URL': Invalid URL` 錯誤，這是因為 Supabase 環境變數未正確設置。

## 📋 解決步驟

### 1. 創建環境變數檔案

在項目根目錄創建 `.env.local` 檔案：

```bash
# 在項目根目錄執行
touch .env.local
```

### 2. 編輯 `.env.local` 檔案

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 其他配置
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. 獲取 Supabase 配置

1. **訪問 Supabase 控制台**

   - 前往 [supabase.com](https://supabase.com)
   - 登入您的帳號

2. **選擇您的項目**

   - 點擊您的項目

3. **獲取 API 金鑰**
   - 進入 "Settings" > "API"
   - 複製 "Project URL" 到 `NEXT_PUBLIC_SUPABASE_URL`
   - 複製 "anon public" 金鑰到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. 設置資料庫

1. **執行 SQL Schema**

   - 在 Supabase 控制台進入 "SQL Editor"
   - 執行 `supabase-schema.sql` 中的 SQL 語句

2. **初始化資料**
   ```bash
   npm run init-supabase
   ```

### 5. 重啟開發服務器

```bash
# 停止當前服務器 (Ctrl+C)
# 重新啟動
npm run dev
```

## 🔧 故障排除

### 問題 1: 環境變數未生效

**解決方案**: 確保檔案名為 `.env.local` 且位於項目根目錄

### 問題 2: Supabase 連接失敗

**解決方案**:

- 檢查 URL 格式是否正確
- 確認 API 金鑰是否有效
- 檢查 Supabase 項目是否正常運行

### 問題 3: 資料庫表不存在

**解決方案**:

- 執行 `supabase-schema.sql` 創建表
- 運行 `npm run init-supabase` 初始化資料

## 📝 環境變數說明

| 變數名                          | 說明              | 範例                                      |
| ------------------------------- | ----------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 項目 URL | `https://abc123.supabase.co`              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名金鑰 | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_API_URL`           | API 基礎 URL      | `http://localhost:3000/api`               |

## ✅ 驗證設置

設置完成後，您應該看到：

1. **控制台訊息**:

   ```
   使用 Supabase dataProvider
   ```

2. **後台管理正常運作**:
   - 可以查看產品和鏡片列表
   - 可以新增、編輯、刪除資料
   - 資料變更會同步到 Supabase

## 🚀 下一步

環境變數設置完成後，您可以：

1. 測試本地功能
2. 部署到 Cloudflare Pages
3. 在 Cloudflare Pages 中設置相同的環境變數

## 📞 需要幫助？

如果仍有問題，請檢查：

1. `.env.local` 檔案是否存在且格式正確
2. Supabase 項目是否正常運行
3. 資料庫表是否已創建
4. 網路連接是否正常
