import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { adminDownload, adminRestSingle } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const item = await adminRestSingle<{ storage_path: string }>(
    `gallery_items?id=eq.${encodeURIComponent(id)}&select=storage_path`,
  );

  if (!item) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  const response = await adminDownload("gallery-media", item.storage_path);
  if (!response) {
    return NextResponse.json({ error: "Image file not found." }, { status: 404 });
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "private, no-store",
    },
  });
}
