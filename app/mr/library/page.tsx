import type { Metadata } from "next";
import { LibraryContent } from "@/components/pages/LibraryContent";

export const metadata: Metadata = {
  title: "डिजिटल ग्रंथालय",
  description: "श्री आनंद भारती समाजचे लेख, संशोधन निबंध आणि शैक्षणिक साहित्य वाचा किंवा थेट प्रकाशित करा.",
};

export default function Page() {
  return <LibraryContent locale="mr" />;
}
