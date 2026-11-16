import type { Metadata } from "next";
import { GalleryContent } from "@/components/pages/GalleryContent";

export const metadata: Metadata = {
  title: "छायाचित्र संग्रह",
  description: "श्री आनंद भारती समाजची सार्वजनिक गॅलरी आणि थेट छायाचित्र अपलोड सुविधा.",
};

export default function Page() {
  return <GalleryContent locale="mr" />;
}
