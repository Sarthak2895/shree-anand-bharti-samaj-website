import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { adminUpdate } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };
const allowedStatuses = new Set(["pending", "published", "rejected"]);

export async function PATCH(request: Request, { params }: Context) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { status?: string };
  const status = String(body.status || "");

  if (!allowedStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid review status." }, { status: 400 });
  }

  const updated = await adminUpdate<{ id: string; status: string }>(
    "gallery_items",
    `id=eq.${encodeURIComponent(id)}`,
    {
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by_email: admin.email,
    },
  );

  if (!updated) {
    return NextResponse.json({ error: "Unable to update the gallery submission." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, item: updated });
}
