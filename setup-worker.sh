#!/bin/bash

echo "🚀 設定 Cloudflare Worker 環境變數"
echo "=================================="
echo ""

echo "請提供您的 Supabase 憑證："
echo ""

# 設定 Supabase URL
echo "1. 設定 Supabase URL..."
read -p "請輸入您的 Supabase URL: " SUPABASE_URL
npx wrangler secret put SUPABASE_URL <<< "$SUPABASE_URL"

echo ""
echo "2. 設定 Supabase Anon Key..."
read -p "請輸入您的 Supabase Anon Key: " SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_ANON_KEY <<< "$SUPABASE_ANON_KEY"

echo ""
echo "✅ 環境變數設定完成！"
echo ""
echo "下一步："
echo "1. 執行: npx wrangler deploy"
echo "2. 部署完成後，會得到一個 Worker URL"
echo "3. 在 Cloudflare Pages 設定環境變數: NEXT_PUBLIC_PHOTO_API_URL=<Worker URL>"
