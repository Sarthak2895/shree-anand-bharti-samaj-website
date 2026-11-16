import { publicRest } from "@/lib/supabase/server";
import type { GalleryItem, Publication } from "@/lib/types";

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  const query = "gallery_items?select=id,title_en,title_mr,caption_en,caption_mr,department_slug,event_date,created_at&status=eq.published&order=event_date.desc.nullslast,created_at.desc";
  return (await publicRest<GalleryItem[]>(query)) || [];
}

export async function getPublishedPublications(): Promise<Publication[]> {
  const query = "publications?select=id,title_en,title_mr,abstract_en,abstract_mr,body_en,body_mr,authors,publication_type,language,published_at,pdf_path,created_at&status=eq.published&order=published_at.desc.nullslast,created_at.desc";
  return (await publicRest<Publication[]>(query)) || [];
}
