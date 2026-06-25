import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, body });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON", message: String(err) },
      { status: 400 },
    );
  }
}
