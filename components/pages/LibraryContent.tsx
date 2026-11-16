import { BookOpen, Download, FileText, Library, Save, Search, Upload } from "lucide-react";
import { Footer } from "@/components/Footer";
import { LibraryUploadForm } from "@/components/forms/LibraryUploadForm";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { getPublishedPublications } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Digital Library",
    title: "A public space for community knowledge.",
    description:
      "Visitors can read and download publications without signing in. Anyone can upload an article or research paper, and a successful submission is stored and published immediately.",
    emptyTitle: "No publications have been uploaded yet",
    emptyText: "Use the publishing form below to add the first article or research paper.",
    upload: "Publish an article or paper",
    types: "Publication options",
    typeCards: [
      [FileText, "Articles", "Write and publish community, cultural, educational or departmental articles."],
      [BookOpen, "Research papers", "Upload research with clear authorship and an optional PDF document."],
      [Save, "Immediate storage", "Successful submissions are stored and become publicly available immediately."],
    ],
    read: "Read article",
    download: "Download PDF",
  },
  mr: {
    eyebrow: "डिजिटल ग्रंथालय",
    title: "सामुदायिक ज्ञानासाठी सार्वजनिक व्यासपीठ.",
    description:
      "प्रकाशने पाहण्यासाठी किंवा डाउनलोड करण्यासाठी प्रवेशाची गरज नाही. कोणीही लेख किंवा संशोधन निबंध अपलोड करू शकतो आणि यशस्वी सादरीकरण त्वरित साठवले व प्रकाशित केले जाते.",
    emptyTitle: "अद्याप कोणतेही प्रकाशन अपलोड झालेले नाही",
    emptyText: "पहिला लेख किंवा संशोधन निबंध जोडण्यासाठी खालील प्रकाशन फॉर्म वापरा.",
    upload: "लेख किंवा निबंध प्रकाशित करा",
    types: "प्रकाशन पर्याय",
    typeCards: [
      [FileText, "लेख", "समुदाय, संस्कृती, शिक्षण किंवा विभागाशी संबंधित लेख लिहून प्रकाशित करा."],
      [BookOpen, "संशोधन निबंध", "लेखक माहिती आणि ऐच्छिक PDF सह संशोधन अपलोड करा."],
      [Save, "त्वरित साठवण", "यशस्वी सादरीकरण त्वरित साठवले जाऊन सार्वजनिकपणे उपलब्ध होते."],
    ],
    read: "लेख वाचा",
    download: "PDF डाउनलोड करा",
  },
} as const;

export async function LibraryContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const publications = await getPublishedPublications();

  return (
    <main className={locale === "mr" ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        actions={<a href="#publish-library" className="button-primary"><Upload size={18} />{t.upload}</a>}
      />

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-4xl font-bold text-[#17233A]">{locale === "mr" ? "प्रकाशित साहित्य" : "Published resources"}</h2>
            <div className="search-placeholder"><Search size={18} />{locale === "mr" ? "साहित्य शोध सुविधा पुढील टप्प्यात" : "Search will activate with published content"}</div>
          </div>
          {publications.length === 0 ? (
            <div className="empty-state">
              <span><Library size={42} /></span>
              <h2>{t.emptyTitle}</h2>
              <p>{t.emptyText}</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {publications.map((publication) => {
                const title = locale === "mr" && publication.title_mr ? publication.title_mr : publication.title_en;
                const abstract = locale === "mr" && publication.abstract_mr ? publication.abstract_mr : publication.abstract_en;
                const body = locale === "mr" && publication.body_mr ? publication.body_mr : publication.body_en;
                return (
                  <article key={publication.id} className="publication-card">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#2F6FA5]">
                      <span>{publication.publication_type.replaceAll("_", " ")}</span><span>•</span><span>{publication.language}</span>
                    </div>
                    <h2 className="mt-4 font-heading text-3xl font-bold text-[#17233A]">{title}</h2>
                    <p className="mt-2 text-sm font-bold text-[#637083]">{publication.authors}</p>
                    {abstract && <p className="mt-5 leading-8 text-[#637083]">{abstract}</p>}
                    {body && (
                      <details className="mt-6">
                        <summary className="cursor-pointer font-extrabold text-[#2F6FA5]">{t.read}</summary>
                        <div className="prose-copy mt-4 whitespace-pre-wrap">{body}</div>
                      </details>
                    )}
                    {publication.pdf_path && <a href={`/api/library/file/${publication.id}`} className="text-link mt-6"><Download size={18} />{t.download}</a>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <LibraryUploadForm locale={locale} />

      <section className="section-space bg-white">
        <div className="site-container">
          <h2 className="text-center font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">{t.types}</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {t.typeCards.map(([Icon, title, text]) => {
              const TypeIcon = Icon;
              return <article key={title} className="process-card"><span><TypeIcon size={26} /></span><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
