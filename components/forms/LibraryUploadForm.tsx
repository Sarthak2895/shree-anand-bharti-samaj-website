"use client";

import { FormEvent, useState } from "react";
import { BookOpen, LoaderCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Publish to the Library",
    title: "Upload an article or research paper",
    description:
      "No account or verification step is required. A successful submission is stored and published in the Digital Library immediately.",
    titleEn: "English title",
    titleMr: "Marathi title (optional)",
    authors: "Author or authors",
    type: "Publication type",
    language: "Primary language",
    abstractEn: "English abstract (optional)",
    abstractMr: "Marathi abstract (optional)",
    bodyEn: "English article text (optional when a PDF is attached)",
    bodyMr: "Marathi article text (optional when a PDF is attached)",
    pdf: "Research paper or document PDF (optional)",
    consent:
      "I confirm that I am authorised to publish this material and that it does not violate copyright or privacy rights.",
    button: "Upload and publish",
    sending: "Publishing…",
    success: "The article or research paper has been published successfully.",
  },
  mr: {
    eyebrow: "ग्रंथालयात प्रकाशित करा",
    title: "लेख किंवा संशोधन निबंध अपलोड करा",
    description:
      "खाते किंवा पडताळणीची गरज नाही. यशस्वी सादरीकरण त्वरित साठवले जाऊन डिजिटल ग्रंथालयात प्रकाशित होईल.",
    titleEn: "इंग्रजी शीर्षक",
    titleMr: "मराठी शीर्षक (ऐच्छिक)",
    authors: "लेखकाचे किंवा लेखकांची नावे",
    type: "प्रकाशन प्रकार",
    language: "मुख्य भाषा",
    abstractEn: "इंग्रजी सारांश (ऐच्छिक)",
    abstractMr: "मराठी सारांश (ऐच्छिक)",
    bodyEn: "इंग्रजी लेख मजकूर (PDF असल्यास ऐच्छिक)",
    bodyMr: "मराठी लेख मजकूर (PDF असल्यास ऐच्छिक)",
    pdf: "संशोधन निबंध किंवा दस्तऐवज PDF (ऐच्छिक)",
    consent:
      "हे साहित्य प्रकाशित करण्याची मला परवानगी आहे आणि ते कॉपीराइट किंवा गोपनीयतेचे उल्लंघन करत नाही, याची मी खात्री देतो/देते.",
    button: "अपलोड करून प्रकाशित करा",
    sending: "प्रकाशित होत आहे…",
    success: "लेख किंवा संशोधन निबंध यशस्वीपणे प्रकाशित झाला.",
  },
} as const;

export function LibraryUploadForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/public/library", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Publication failed.");
      }

      form.reset();
      setMessage(t.success);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="publish-library" className="section-space bg-[#F3F6FA]">
      <div className="site-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#637083]">{t.description}</p>
          <div className="upload-note mt-7">
            <BookOpen size={24} />
            <p>Article text or PDF • PDF maximum 4 MB</p>
          </div>
        </div>

        <form onSubmit={submit} className="public-upload-card">
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="form-grid">
            <label className="field-label">
              {t.titleEn}
              <input name="title_en" className="field-input" required maxLength={220} />
            </label>
            <label className="field-label">
              {t.titleMr}
              <input name="title_mr" className="field-input" maxLength={220} />
            </label>
            <label className="field-label full">
              {t.authors}
              <input name="authors" className="field-input" required maxLength={300} />
            </label>
            <label className="field-label">
              {t.type}
              <select name="publication_type" className="field-input" defaultValue="article" required>
                <option value="article">Article</option>
                <option value="research_paper">Research paper</option>
                <option value="historical_document">Historical document</option>
                <option value="educational_resource">Educational resource</option>
              </select>
            </label>
            <label className="field-label">
              {t.language}
              <select name="language" className="field-input" defaultValue={locale === "mr" ? "Marathi" : "English"}>
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>
                <option value="English and Marathi">English and Marathi</option>
              </select>
            </label>
            <label className="field-label full">
              {t.abstractEn}
              <textarea name="abstract_en" className="field-input min-h-28" maxLength={3000} />
            </label>
            <label className="field-label full">
              {t.abstractMr}
              <textarea name="abstract_mr" className="field-input min-h-28" maxLength={3000} />
            </label>
            <label className="field-label full">
              {t.bodyEn}
              <textarea name="body_en" className="field-input min-h-48" />
            </label>
            <label className="field-label full">
              {t.bodyMr}
              <textarea name="body_mr" className="field-input min-h-48" />
            </label>
            <label className="field-label full">
              {t.pdf}
              <input name="pdf" type="file" accept="application/pdf" className="field-input" />
            </label>
            <label className="consent-field full">
              <input name="consent" type="checkbox" required />
              <span>{t.consent}</span>
            </label>
          </div>

          <button className="button-dark mt-6" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Upload size={18} />}
            {isSubmitting ? t.sending : t.button}
          </button>

          {message && <p className="form-message" role="status">{message}</p>}
        </form>
      </div>
    </section>
  );
}
