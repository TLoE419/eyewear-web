import { NextResponse } from "next/server";
import { dataStore } from "@/lib/dataStore";

// 配置動態渲染
export const dynamic = "force-dynamic";

export async function GET() {
  const lenses = dataStore.lenses.getAll();
  return NextResponse.json(lenses);
}

export async function POST(request: Request) {
  try {
    const newLens = await request.json();
    const lens = dataStore.lenses.create(newLens);
    return NextResponse.json(lens, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create lens" },
      { status: 500 }
    );
  }
}
