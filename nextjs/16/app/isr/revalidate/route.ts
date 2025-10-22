import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/isr/[id]"

  revalidatePath(path)

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: "no-store",
  })
}
