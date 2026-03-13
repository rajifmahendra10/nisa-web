import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { label, value, sub_label, icon, color, sort_order } = await req.json();

  await query(
    "UPDATE instagram_stats SET label=?, value=?, sub_label=?, icon=?, color=?, sort_order=? WHERE id=?",
    [label, value, sub_label, icon, color, sort_order, id]
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await query("DELETE FROM instagram_stats WHERE id=?", [id]);

  return NextResponse.json({ success: true });
}
