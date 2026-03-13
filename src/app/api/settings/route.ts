import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSettings, updateSetting } from "@/lib/data";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  for (const [key, value] of Object.entries(body)) {
    await updateSetting(key, String(value));
  }

  return NextResponse.json({ success: true });
}
