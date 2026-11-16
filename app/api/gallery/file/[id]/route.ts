import { NextResponse } from "next/server";
import { adminDownload, adminRestSingle } from "@/lib/supabase/server";
type Context = { params: Promise<{ id: string }> };
export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  const item = await adminRestSingle<{ storage_path: string; status: string }>(`gallery_items?id=eq.${encodeURIComponent(id)}&select=storage_path,status`);
  if (!item || item.status !== "published") return NextResponse.json({ error: "Not found" }, { status: 404 });
  const response = await adminDownload("gallery-media", item.storage_path);
  if (!response) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(response.body, { headers: { "Content-Type": response.headers.get("content-type") || "image/jpeg", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
