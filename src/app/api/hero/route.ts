import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { HeroSection } from "@/lib/types";

export async function GET() {
  const rows = await query<HeroSection[]>("SELECT * FROM hero_section LIMIT 1");
  return NextResponse.json({ success: true, data: rows[0] || null });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { badge_text, title_line1, title_line2, title_line3, subtitle, cta_text1, cta_link1, cta_text2, cta_link2, hero_image } = body;

  await query(
    `UPDATE hero_section SET badge_text=?, title_line1=?, title_line2=?, title_line3=?, subtitle=?, cta_text1=?, cta_link1=?, cta_text2=?, cta_link2=?, hero_image=? WHERE id=1`,
    [badge_text, title_line1, title_line2, title_line3, subtitle, cta_text1, cta_link1, cta_text2, cta_link2, hero_image]
  );

  return NextResponse.json({ success: true });
}
