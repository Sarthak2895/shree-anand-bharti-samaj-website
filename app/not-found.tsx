import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fffdf9]">
      <Navbar />
      <section className="site-container flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 font-heading text-5xl font-bold text-[#17233A]">The requested page is unavailable</h1>
        <p className="mt-5 max-w-xl leading-8 text-[#637083]">Return to the department directory or the main website.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/departments" className="button-primary"><ArrowLeft size={18} /> Departments</Link>
          <Link href="/" className="inline-flex min-h-[3.2rem] items-center justify-center rounded-full border border-[#0B1F3A]/30 px-6 font-bold text-[#0B1F3A]">Homepage</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
