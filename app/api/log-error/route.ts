import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.error("====== CLIENT-SIDE ERROR LOGGED ======");
    console.error("URL:", body.url);
    console.error("Message:", body.message);
    console.error("Stack:", body.stack);
    console.error("======================================");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
