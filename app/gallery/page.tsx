import type { Metadata } from "next";
import { GalleryContent } from "@/components/pages/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Public community image gallery for Shree Anand Bharti Samaj. Visitor uploads are reviewed by an administrator before publication.",
};

export default function Page() {
  return <GalleryContent locale="en" />;
}
