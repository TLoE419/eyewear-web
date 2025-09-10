"use client";

import dynamicImport from "next/dynamic";

// 動態導入AdminWrapper，禁用SSR
const AdminWrapper = dynamicImport(() => import("./AdminWrapper"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
      }}
    >
      載入中...
    </div>
  ),
});

const AdminApp = () => {
  return <AdminWrapper />;
};

export default AdminApp;
