import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    return NextResponse.json({
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPrefix: supabaseUrl
        ? supabaseUrl.substring(0, 30) + "..."
        : "undefined",
      keyPrefix: supabaseKey
        ? supabaseKey.substring(0, 30) + "..."
        : "undefined",
      timestamp: new Date().toISOString(),
      runtime: "edge",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Debug API error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
