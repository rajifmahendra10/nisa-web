import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { Music } from "@/lib/types";

export async function GET() {
  const rows = await query<Music[]>("SELECT * FROM music ORDER BY sort_order ASC");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { title, label, composer, composer_info, description, cover_image, youtube_url, spotify_url, lyrics, is_latest, release_date, sort_order } = await req.json();
  await query(
    "INSERT INTO music (title, label, composer, composer_info, description, cover_image, youtube_url, spotify_url, lyrics, is_latest, release_date, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [title, label, composer, composer_info, description, cover_image, youtube_url, spotify_url, lyrics || null, is_latest || 0, release_date, sort_order || 0]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
