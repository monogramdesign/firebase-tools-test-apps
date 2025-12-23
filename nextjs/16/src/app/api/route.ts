import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  const data = new Date().toISOString();

  return NextResponse.json({ data: data || "Failed to get API response" });
}

/**
 * ❌ curl http://localhost:3000/api -X POST
 *
 * ❌ curl http://localhost:3000/api -X POST -d '{"number":5}'
 *
 * ✅ curl http://localhost:3000/api -X POST -d '{"number":5}' -H Content-Type:\ application/json
 */
export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("application/json"))
      return NextResponse.json(
        { message: "Invalid content-type" },
        { status: 400 }
      );

    let number;
    try {
      const queryObj = await req.json();

      number = queryObj.number;
    } catch (e: unknown) {
      if (e instanceof Error) console.error(e.message);
    }

    if (!number)
      return NextResponse.json(
        { message: "No number provided in payload" },
        { status: 400 }
      );

    const serverTimestamp = Array.from({ length: number }, () =>
      new Date().toISOString()
    );

    return NextResponse.json({ data: serverTimestamp });
  } catch (error: unknown) {
    return NextResponse.json({
      message:
        error && typeof error === "object" && "message" in error
          ? error?.message
          : "see error",
      error,
    });
  }
}
