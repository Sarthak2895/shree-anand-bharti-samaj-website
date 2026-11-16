import { NextResponse } from "next/server";
import {
  adminDeleteObject,
  adminInsert,
  adminUpload,
  isServerSupabaseConfigured,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

const maxPdfBytes = 4 * 1024 * 1024;
const publicationTypes = new Set([
  "article",
  "research_paper",
  "historical_document",
  "educational_resource",
]);

function value(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-140) || "publication.pdf";
}

export async function POST(request: Request) {
  if (!isServerSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase storage is not configured on the server." },
      { status: 503 },
    );
  }

  let pdfPath: string | null = null;

  try {
    const form = await request.formData();

    if (value(form, "website")) {
      return NextResponse.json({ ok: true });
    }

    const titleEn = value(form, "title_en");
    const titleMr = value(form, "title_mr");
    const abstractEn = value(form, "abstract_en");
    const abstractMr = value(form, "abstract_mr");
    const bodyEn = value(form, "body_en");
    const bodyMr = value(form, "body_mr");
    const authors = value(form, "authors");
    const publicationType = value(form, "publication_type");
    const language = value(form, "language") || "English";
    const pdf = form.get("pdf");
    const consent = value(form, "consent");

    if (!consent) {
      return NextResponse.json({ error: "Publishing permission confirmation is required." }, { status: 400 });
    }

    if (!titleEn || titleEn.length > 220) {
      return NextResponse.json(
        { error: "Enter an English title of up to 220 characters." },
        { status: 400 },
      );
    }

    if (!authors || authors.length > 300) {
      return NextResponse.json(
        { error: "Enter the author name or names." },
        { status: 400 },
      );
    }

    if (!publicationTypes.has(publicationType)) {
      return NextResponse.json({ error: "Choose a valid publication type." }, { status: 400 });
    }

    if (abstractEn.length > 3000 || abstractMr.length > 3000) {
      return NextResponse.json({ error: "Abstracts must be 3,000 characters or fewer." }, { status: 400 });
    }

    if (bodyEn.length > 50000 || bodyMr.length > 50000) {
      return NextResponse.json({ error: "Article text must be 50,000 characters or fewer per language." }, { status: 400 });
    }

    const hasBody = Boolean(bodyEn || bodyMr);
    const hasPdf = pdf instanceof File && pdf.size > 0;

    if (!hasBody && !hasPdf) {
      return NextResponse.json(
        { error: "Add article text or attach a PDF." },
        { status: 400 },
      );
    }

    if (hasPdf && pdf instanceof File) {
      if (pdf.type !== "application/pdf" || pdf.size > maxPdfBytes) {
        return NextResponse.json(
          { error: "The PDF must be smaller than 4 MB." },
          { status: 400 },
        );
      }

      pdfPath = `public/${Date.now()}-${crypto.randomUUID()}-${safeFileName(pdf.name)}`;
      const uploaded = await adminUpload("library-documents", pdfPath, pdf);
      if (!uploaded) {
        return NextResponse.json({ error: "The PDF could not be stored." }, { status: 500 });
      }
    }

    const now = new Date().toISOString();
    const inserted = await adminInsert<{ id: string }>("publications", {
      owner_id: null,
      title_en: titleEn,
      title_mr: titleMr || null,
      abstract_en: abstractEn || null,
      abstract_mr: abstractMr || null,
      body_en: bodyEn || null,
      body_mr: bodyMr || null,
      authors,
      publication_type: publicationType,
      language,
      pdf_path: pdfPath,
      status: "published",
      published_at: now,
    });

    if (!inserted) {
      if (pdfPath) await adminDeleteObject("library-documents", pdfPath);
      return NextResponse.json({ error: "The publication record could not be saved." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (error) {
    if (pdfPath) await adminDeleteObject("library-documents", pdfPath);
    console.error("Public Library upload failed", error);
    return NextResponse.json({ error: "The publication could not be completed." }, { status: 500 });
  }
}
