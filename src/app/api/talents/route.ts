import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { Talent } from "@/lib/types";

export async function GET() {
  const rows = await query<Talent[]>("SELECT * FROM talents ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { icon, title, description, sort_order } = await req.json();
  await query(
    "INSERT INTO talents (icon, title, description, sort_order) VALUES (?, ?, ?, ?)",
    [icon || "🎤", title, description, sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
