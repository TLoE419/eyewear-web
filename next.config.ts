import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除靜態導出，改為動態網站
  images: {
    unoptimized: true,
  },
  compress: true,
  experimental: {
    optimizePackageImports: [
      "@supabase/supabase-js",
      "framer-motion",
      "swiper",
    ],
  },
  // 確保 Edge Runtime 配置
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: "all",
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
