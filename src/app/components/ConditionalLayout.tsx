"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import FloatingSocialButtons from "./FloatingSocialButtons";
import ScrollToTop from "./scrollToTop";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
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
