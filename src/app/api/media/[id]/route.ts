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
  const { media_name, url, logo, sort_order, is_active } = await req.json();

  await query(
    "UPDATE media_coverages SET media_name=?, url=?, logo=?, sort_order=?, is_active=? WHERE id=?",
    [media_name, url, logo, sort_order, is_active ?? 1, id]
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
  await query("DELETE FROM media_coverages WHERE id=?", [id]);

  return NextResponse.json({ success: true });
}
