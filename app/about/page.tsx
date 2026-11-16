import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";
export const metadata: Metadata = { title: "About Us", description: "History, vision and committee leadership of Shree Anand Bharti Samaj, Thane." };
export default function Page() { return <AboutContent locale="en" />; }
