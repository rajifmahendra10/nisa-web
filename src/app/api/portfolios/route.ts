import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { Portfolio } from "@/lib/types";

export async function GET() {
  const rows = await query<Portfolio[]>("SELECT * FROM portfolios ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { title, description, category, tags, image, video_url, sort_order } = await req.json();
  await query(
    "INSERT INTO portfolios (title, description, category, tags, image, video_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, category || "commercial", tags, image, video_url, sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
