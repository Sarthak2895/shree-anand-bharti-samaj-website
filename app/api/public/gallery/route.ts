import { NextResponse } from "next/server";
import {
  adminDeleteObject,
  adminInsert,
  adminUpload,
  isServerSupabaseConfigured,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageBytes = 4 * 1024 * 1024;

function value(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-120) || "image";
}

export async function POST(request: Request) {
  if (!isServerSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase storage is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const form = await request.formData();

    // Hidden bot field. Real users never fill this input.
    if (value(form, "website")) {
      return NextResponse.json({ ok: true });
    }

    const titleEn = value(form, "title_en");
    const titleMr = value(form, "title_mr");
    const captionEn = value(form, "caption_en");
    const captionMr = value(form, "caption_mr");
    const departmentSlug = value(form, "department_slug");
    const eventDate = value(form, "event_date");
    const submittedBy = value(form, "submitted_by");
    const image = form.get("image");
    const consent = value(form, "consent");

    if (!consent) {
      return NextResponse.json({ error: "Permission confirmation is required." }, { status: 400 });
    }

    if (!titleEn || titleEn.length > 160) {
      return NextResponse.json(
        { error: "Enter an English title of up to 160 characters." },
        { status: 400 },
      );
    }

    if (captionEn.length > 1200 || captionMr.length > 1200) {
      return NextResponse.json({ error: "Captions must be 1,200 characters or fewer." }, { status: 400 });
    }

    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }

    if (!allowedImageTypes.has(image.type) || image.size > maxImageBytes) {
      return NextResponse.json(
        { error: "Use a JPG, PNG or WebP image smaller than 4 MB." },
        { status: 400 },
      );
    }

    const path = `public/${Date.now()}-${crypto.randomUUID()}-${safeFileName(image.name)}`;
    const uploaded = await adminUpload("gallery-media", path, image);

    if (!uploaded) {
      return NextResponse.json({ error: "The image could not be stored." }, { status: 500 });
    }

    const inserted = await adminInsert<{ id: string }>("gallery_items", {
      owner_id: null,
      title_en: titleEn,
      title_mr: titleMr || null,
      caption_en: captionEn || null,
      caption_mr: captionMr || null,
      department_slug: departmentSlug || null,
      event_date: eventDate || null,
      submitted_by: submittedBy || null,
      storage_path: path,
      status: "pending",
    });

    if (!inserted) {
      await adminDeleteObject("gallery-media", path);
      return NextResponse.json({ error: "The gallery record could not be saved." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (error) {
    console.error("Public gallery upload failed", error);
    return NextResponse.json({ error: "The upload could not be completed." }, { status: 500 });
  }
}
