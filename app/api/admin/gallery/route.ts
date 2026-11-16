import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { adminRest } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const items = await adminRest<Array<{
    id: string;
    submitted_by: string | null;
    title_en: string;
    title_mr: string | null;
    caption_en: string | null;
    caption_mr: string | null;
    department_slug: string | null;
    event_date: string | null;
    storage_path: string;
    status: "pending" | "published" | "rejected";
    reviewed_at: string | null;
    reviewed_by_email: string | null;
    created_at: string;
  }>>(
    "gallery_items?select=id,submitted_by,title_en,title_mr,caption_en,caption_mr,department_slug,event_date,storage_path,status,reviewed_at,reviewed_by_email,created_at&order=created_at.desc",
  );

  if (!items) {
    return NextResponse.json({ error: "Unable to load gallery submissions." }, { status: 500 });
  }

  return NextResponse.json({ items, adminEmail: admin.email });
}
