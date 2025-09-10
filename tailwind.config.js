/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair-display)"],
        sans: [
          "var(--font-noto-sans-tc)",
          "Noto Sans TC",
          "Microsoft JhengHei",
          "微軟正黑體",
          "Microsoft YaHei",
          "微軟雅黑",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
      },
      screens: {
        xs: "475px",
      },
      lineClamp: {
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
