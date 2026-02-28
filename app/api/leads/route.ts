import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const leadsSheetUrl = process.env.LEADS_SHEET_URL;

  if (!leadsSheetUrl) {
    return NextResponse.json({ ok: false, reason: "LEADS_SHEET_URL not configured" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const response = await fetch(leadsSheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    console.error("[leads] Erro ao enviar para Google Sheets:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
