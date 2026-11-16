import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Mail } from "lucide-react";
import { DepartmentIcon } from "@/components/DepartmentIcon";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { Department } from "@/data/departments";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function DepartmentDetailContent({ locale, department }: { locale: Locale; department: Department }) {
  const mr = locale === "mr";
  const name = mr ? department.nameMr : department.name;
  const description = mr ? department.shortDescriptionMr : department.shortDescription;
  const overview = mr ? department.overviewMr : department.overview;
  const areas = mr ? department.focusAreasMr : department.focusAreas;
  return (
    <main className={mr ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <section className="page-hero"><div className="site-container relative py-20 sm:py-28"><span className="department-icon department-icon-large"><DepartmentIcon name={department.icon} size={38} /></span><p className="hero-eyebrow mt-8">{mr ? "श्री आनंद भारती समाज" : "Shree Anand Bharti Samaj"}</p><h1 className="mt-4 font-heading text-5xl font-bold text-white sm:text-7xl">{name}</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-white/72">{description}</p></div></section>
      <section className="section-space bg-white"><div className="site-container grid gap-12 lg:grid-cols-[1.15fr_0.85fr]"><article><p className="eyebrow">{mr ? "विभागाविषयी" : "About the department"}</p><h2 className="mt-4 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">{mr ? "उद्देश आणि सामुदायिक भूमिका" : "Purpose and community role"}</h2><p className="mt-7 text-lg leading-9 text-[#637083]">{overview}</p><h3 className="mt-12 font-heading text-3xl font-bold text-[#17233A]">{mr ? "मुख्य कार्यक्षेत्रे" : "Areas of focus"}</h3><div className="mt-6 grid gap-4 sm:grid-cols-2">{areas.map((area) => <div key={area} className="focus-card"><CheckCircle2 size={20} />{area}</div>)}</div></article><aside className="space-y-6">{department.slug === "library" && <div className="aside-card aside-card-dark"><BookOpen size={32} /><h2>{mr ? "डिजिटल ग्रंथालय" : "Digital Library"}</h2><p>{mr ? "लेख आणि संशोधन निबंध वाचा किंवा खाते न बनवता थेट प्रकाशित करा." : "Read articles and research papers or publish directly without creating an account."}</p><Link href={localePath(locale, "/library")} className="button-light mt-6">{mr ? "ग्रंथालय उघडा" : "Open Library"}<ArrowRight size={18} /></Link></div>}<div className="aside-card"><Mail size={30} /><h2>{mr ? "विभागाबद्दल चौकशी" : "Department enquiry"}</h2><p>{mr ? `ईमेलमध्ये “${name}” असे नमूद करा.` : `Mention “${name}” in the email subject.`}</p><a href={`mailto:absthane@gmail.com?subject=${encodeURIComponent(`${name} enquiry`)}`} className="text-link mt-5">absthane@gmail.com<ArrowRight size={17} /></a></div></aside></div></section>
      <section className="bg-[#F3F6FA] py-12"><div className="site-container"><Link href={localePath(locale, "/departments")} className="text-link"><ArrowLeft size={18} />{mr ? "सर्व विभागांकडे परत" : "Back to all departments"}</Link></div></section>
      <Footer locale={locale} />
    </main>
  );
}
