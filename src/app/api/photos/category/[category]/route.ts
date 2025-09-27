import { NextRequest, NextResponse } from "next/server";

// 代理 API - 將請求轉發到 eyewear-admin
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);

    // 從環境變數獲取 admin API 基礎 URL，如果沒有則使用預設值
    const adminBaseUrl =
      process.env.ADMIN_API_BASE_URL || "http://localhost:3000";

    // 構建轉發 URL
    const adminUrl = `${adminBaseUrl}/api/photos/category/${category}/${
      searchParams ? `?${searchParams}` : ""
    }`;

    console.log(`Proxying request to: ${adminUrl}`);

    // 轉發請求到 eyewear-admin
    const response = await fetch(adminUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Admin API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Proxy API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
