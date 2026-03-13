import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { MediaCoverage } from "@/lib/types";

export async function GET() {
  const rows = await query<MediaCoverage[]>("SELECT * FROM media_coverages ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { media_name, url, logo, sort_order } = await req.json();
  await query(
    "INSERT INTO media_coverages (media_name, url, logo, sort_order) VALUES (?, ?, ?, ?)",
    [media_name, url, logo, sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
