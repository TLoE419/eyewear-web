// Cloudflare Worker for Photo API
import { createClient } from "@supabase/supabase-js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 照片類別對應
    const PHOTO_CATEGORIES = {
      hero: "hero",
      image_slider: "image_slider",
      brand_logo: "brand_logo",
      store_photo: "store_photo",
      news_carousel: "news_carousel",
    };

    try {
      // 檢查環境變數
      if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
        return new Response(
          JSON.stringify({ error: "Missing environment variables" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // 初始化 Supabase 客戶端
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

      // 獲取所有照片
      if (url.pathname === "/api/photos") {
        const { data, error } = await supabase
          .from("photos")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) {
          return new Response(JSON.stringify({ error: "Database error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data || []), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 根據類別獲取照片
      if (url.pathname.startsWith("/api/photos/category/")) {
        const category = url.pathname.split("/").pop();

        if (!PHOTO_CATEGORIES[category]) {
          return new Response(JSON.stringify({ error: "Invalid category" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { data, error } = await supabase
          .from("photos")
          .select("*")
          .eq("category", PHOTO_CATEGORIES[category])
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) {
          return new Response(JSON.stringify({ error: "Database error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data || []), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 健康檢查
      if (url.pathname === "/health") {
        return new Response(
          JSON.stringify({
            status: "OK",
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
