import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { InstagramStat } from "@/lib/types";

export async function GET() {
  const rows = await query<InstagramStat[]>("SELECT * FROM instagram_stats ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { label, value, sub_label, icon, color, sort_order } = await req.json();
  await query(
    "INSERT INTO instagram_stats (label, value, sub_label, icon, color, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
    [label, value, sub_label, icon || "📊", color || "pink", sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
