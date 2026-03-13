import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { StatsRibbon } from "@/lib/types";

export async function GET() {
  const rows = await query<StatsRibbon[]>("SELECT * FROM stats_ribbon ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { label, value, sort_order } = await req.json();
  await query(
    "INSERT INTO stats_ribbon (label, value, sort_order) VALUES (?, ?, ?)",
    [label, value, sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
