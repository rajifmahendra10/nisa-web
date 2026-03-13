import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { GalleryItem } from "@/lib/types";

export async function GET() {
  const rows = await query<GalleryItem[]>("SELECT * FROM gallery ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { title, image_url, alt_text, category, sort_order } = await req.json();
  await query(
    "INSERT INTO gallery (title, image_url, alt_text, category, sort_order) VALUES (?, ?, ?, ?, ?)",
    [title, image_url, alt_text, category || "general", sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
