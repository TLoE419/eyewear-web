import { NextResponse } from "next/server";
import { dataStore } from "@/lib/dataStore";

// 配置動態渲染
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const lens = dataStore.lenses.getById(resolvedParams.id);
    if (!lens) {
      return NextResponse.json({ error: "Lens not found" }, { status: 404 });
    }
    return NextResponse.json(lens);
  } catch {
    return NextResponse.json({ error: "Failed to get lens" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const updatedLens = await request.json();
    const resolvedParams = await params;
    const lens = dataStore.lenses.update(resolvedParams.id, updatedLens);
    return NextResponse.json(lens);
  } catch {
    return NextResponse.json(
      { error: "Failed to update lens" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const result = dataStore.lenses.delete(resolvedParams.id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete lens" },
      { status: 500 }
    );
  }
}
