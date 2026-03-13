import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { AboutSection } from "@/lib/types";

export async function GET() {
  const rows = await query<AboutSection[]>("SELECT * FROM about_section LIMIT 1");
  return NextResponse.json({ success: true, data: rows[0] || null });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, photo, birth_date, height, weight, domicile } = body;

  await query(
    `UPDATE about_section SET title=?, description=?, photo=?, birth_date=?, height=?, weight=?, domicile=? WHERE id=1`,
    [title, description, photo, birth_date, height, weight, domicile]
  );

  return NextResponse.json({ success: true });
}
