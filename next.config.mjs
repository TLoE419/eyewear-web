/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // 暫時移除靜態導出以支援客戶端 API 調用
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // 優化配置
  compress: true,

  // 實驗性功能：更好的 code splitting
  experimental: {
    optimizePackageImports: [
      "@supabase/supabase-js",
      "framer-motion",
      "swiper",
    ],
  },

  // Webpack 配置優化
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 將大型依賴項分離到單獨的 chunks
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Supabase 相關套件
          supabase: {
            name: "supabase",
            test: /[\\/]node_modules[\\/](@supabase[\\/])/,
            chunks: "all",
            priority: 20,
          },
          // 動畫相關套件
          animation: {
            name: "animation",
            test: /[\\/]node_modules[\\/](framer-motion|swiper)[\\/]/,
            chunks: "all",
            priority: 20,
          },
          // 其他大型依賴項
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 10,
            maxSize: 244000, // 限制每個 chunk 大小
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
