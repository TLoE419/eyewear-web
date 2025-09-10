# 後台管理頁面 Layout 修復

## ✅ 問題解決

### 問題

在後台管理頁面（`/admin`）中，主網站的 header 和 footer 組件會顯示出來，影響後台管理的界面。

### 解決方案

創建了條件渲染的 layout 組件，根據路徑判斷是否顯示 header 和 footer：

1. **新增檔案**: `src/app/components/ConditionalLayout.tsx`

   - 使用 `usePathname()` 檢測當前路徑
   - 如果是 `/admin` 開頭的路徑，不顯示 header 和 footer
   - 一般頁面正常顯示完整的 layout

2. **修改檔案**: `src/app/layout.tsx`
   - 移除直接的 Header 和 Footer 組件
   - 使用 ConditionalLayout 包裝 children

## 🔧 技術實現

### ConditionalLayout.tsx

```tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import FloatingSocialButtons from "./FloatingSocialButtons";
import ScrollToTop from "./scrollToTop";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // 如果是後台管理頁面，不顯示header和footer
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  // 一般頁面顯示完整的layout
  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
      <FloatingSocialButtons />
    </>
  );
}
```

## 🚀 測試結果

### 一般頁面（如 `/`, `/products`, `/lenses`）

- ✅ 顯示 Header
- ✅ 顯示 Footer
- ✅ 顯示 FloatingSocialButtons
- ✅ 顯示 ScrollToTop

### 後台管理頁面（如 `/admin`, `/admin/login`）

- ✅ 不顯示 Header
- ✅ 不顯示 Footer
- ✅ 不顯示 FloatingSocialButtons
- ✅ 不顯示 ScrollToTop
- ✅ 只顯示 React-admin 的界面

## 📋 測試步驟

1. **啟動開發服務器**:

   ```bash
   npm run dev
   ```

2. **測試一般頁面**:

   - 訪問 `http://localhost:3000/`
   - 應該看到完整的網站 layout（header + footer）

3. **測試後台管理**:
   - 訪問 `http://localhost:3000/admin`
   - 應該只看到 React-admin 的界面，沒有主網站的 header 和 footer

## ✅ 修復完成

現在後台管理頁面將有乾淨的界面，不會被主網站的 header 和 footer 干擾！
