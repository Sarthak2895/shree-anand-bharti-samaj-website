import { DepartmentCard } from "@/components/DepartmentCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { departments } from "@/data/departments";
import type { Locale } from "@/lib/i18n";

export function DepartmentDirectoryContent({ locale }: { locale: Locale }) {
  const mr = locale === "mr";
  return (
    <main className={mr ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <PageHero eyebrow={mr ? "१२ विभाग" : "Our 12 departments"} title={mr ? "एका समुदायासाठी विविध प्रकारचे कार्य." : "Different responsibilities, one connected community."} description={mr ? "प्रत्येक विभाग शिक्षण, सहभाग, आरोग्य, संस्कृती किंवा सेवेसाठी स्वतंत्र योगदान देतो." : "Each department contributes a distinct path for learning, participation, wellness, culture or service."} />
      <section className="section-space bg-white"><div className="site-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{departments.map((d) => <DepartmentCard key={d.slug} department={d} locale={locale} />)}</div></section>
      <Footer locale={locale} />
    </main>
  );
}
