"use client";

import { Admin, Login, LoginForm } from "react-admin";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { dataProvider } from "@/lib/dynamicDataProvider";
import { authProvider } from "@/lib/authProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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

const CustomLoginForm = () => (
  <Card sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
    <CardContent>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          視寶眼鏡後台管理
        </Typography>
        <Typography variant="body1" color="text.secondary">
          請登入以訪問管理系統
        </Typography>
      </Box>
      <LoginForm />
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          預設帳號：admin / admin
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const AdminLoginComponent = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="視寶眼鏡後台管理"
    >
      <Login>
        <CustomLoginForm />
      </Login>
    </Admin>
  </ThemeProvider>
);

export default AdminLoginComponent;
