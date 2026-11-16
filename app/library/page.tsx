import type { Metadata } from "next";
import { LibraryContent } from "@/components/pages/LibraryContent";

export const metadata: Metadata = {
  title: "Digital Library",
  description: "Read and directly publish articles, research papers and educational resources from Shree Anand Bharti Samaj.",
};

export default function Page() {
  return <LibraryContent locale="en" />;
}
