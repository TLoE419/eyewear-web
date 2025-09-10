"use client";

import dynamicImport from "next/dynamic";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// 配置動態渲染
export const dynamic = "force-dynamic";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

// 動態導入 Admin 組件，禁用 SSR
const DynamicAdmin = dynamicImport(() => import("./AdminLoginComponent"), {
  ssr: false,
  loading: () => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              視寶眼鏡後台管理
            </Typography>
            <Typography variant="body1" color="text.secondary">
              載入中...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  ),
});

const AdminLogin = () => <DynamicAdmin />;

export default AdminLogin;
