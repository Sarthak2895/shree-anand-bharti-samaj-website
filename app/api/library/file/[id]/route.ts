import { NextResponse } from "next/server";
import { adminDownload, adminRestSingle } from "@/lib/supabase/server";
type Context = { params: Promise<{ id: string }> };
export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  const item = await adminRestSingle<{ pdf_path: string | null; status: string; title_en: string }>(`publications?id=eq.${encodeURIComponent(id)}&select=pdf_path,status,title_en`);
  if (!item || item.status !== "published" || !item.pdf_path) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const response = await adminDownload("library-documents", item.pdf_path);
  if (!response) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const name = `${item.title_en.replace(/[^a-zA-Z0-9 -]/g, "").replaceAll(" ", "-") || "publication"}.pdf`;
  return new NextResponse(response.body, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${name}"` } });
}
