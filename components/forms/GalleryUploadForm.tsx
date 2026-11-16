"use client";

import { FormEvent, useState } from "react";
import { ImagePlus, LoaderCircle, ShieldCheck, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Submit to the gallery",
    title: "Share an organisation image",
    description:
      "No visitor account is required. Your image is stored privately as pending and appears in the public gallery only after an administrator approves it.",
    submittedBy: "Submitted by (optional)",
    titleEn: "English title",
    titleMr: "Marathi title (optional)",
    captionEn: "English caption (optional)",
    captionMr: "Marathi caption (optional)",
    department: "Department slug (optional)",
    eventDate: "Event date (optional)",
    image: "Image",
    consent:
      "I confirm that I have permission to share this image and that it is appropriate for public display.",
    button: "Submit for approval",
    sending: "Submitting…",
    success: "Image submitted successfully. It will appear in the gallery after administrator approval.",
    review: "Administrator review required before publication",
  },
  mr: {
    eyebrow: "गॅलरीसाठी सादर करा",
    title: "संस्थेचे छायाचित्र शेअर करा",
    description:
      "भेट देणाऱ्याला खाते आवश्यक नाही. छायाचित्र प्रथम खाजगी स्वरूपात प्रलंबित म्हणून साठवले जाते आणि प्रशासकाच्या मंजुरीनंतरच सार्वजनिक गॅलरीमध्ये दिसते.",
    submittedBy: "सादर करणाऱ्याचे नाव (ऐच्छिक)",
    titleEn: "इंग्रजी शीर्षक",
    titleMr: "मराठी शीर्षक (ऐच्छिक)",
    captionEn: "इंग्रजी माहिती (ऐच्छिक)",
    captionMr: "मराठी माहिती (ऐच्छिक)",
    department: "विभाग स्लग (ऐच्छिक)",
    eventDate: "कार्यक्रमाची तारीख (ऐच्छिक)",
    image: "छायाचित्र",
    consent:
      "हे छायाचित्र सार्वजनिकपणे शेअर करण्याची मला परवानगी आहे आणि ते योग्य आहे, याची मी खात्री देतो/देते.",
    button: "मंजुरीसाठी सादर करा",
    sending: "सादर होत आहे…",
    success: "छायाचित्र यशस्वीपणे सादर झाले. प्रशासकाच्या मंजुरीनंतर ते गॅलरीमध्ये दिसेल.",
    review: "प्रकाशनापूर्वी प्रशासकाची मंजुरी आवश्यक आहे",
  },
} as const;

export function GalleryUploadForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/public/gallery", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Upload failed.");
      }

      form.reset();
      setMessage(t.success);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="upload-gallery" className="section-space bg-[#F3F6FA]">
      <div className="site-container grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#637083]">{t.description}</p>
          <div className="upload-note mt-7">
            <ImagePlus size={24} />
            <p>JPG, PNG or WebP • Maximum 4 MB</p>
          </div>
          <div className="upload-note mt-3">
            <ShieldCheck size={24} />
            <p>{t.review}</p>
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
              {t.submittedBy}
              <input name="submitted_by" className="field-input" maxLength={120} />
            </label>
            <label className="field-label">
              {t.department}
              <input name="department_slug" className="field-input" placeholder="gymnasium" maxLength={80} />
            </label>
            <label className="field-label">
              {t.titleEn}
              <input name="title_en" className="field-input" required maxLength={160} />
            </label>
            <label className="field-label">
              {t.titleMr}
              <input name="title_mr" className="field-input" maxLength={160} />
            </label>
            <label className="field-label full">
              {t.captionEn}
              <textarea name="caption_en" className="field-input min-h-28" maxLength={1200} />
            </label>
            <label className="field-label full">
              {t.captionMr}
              <textarea name="caption_mr" className="field-input min-h-28" maxLength={1200} />
            </label>
            <label className="field-label">
              {t.eventDate}
              <input name="event_date" type="date" className="field-input" />
            </label>
            <label className="field-label">
              {t.image}
              <input
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="field-input"
                required
              />
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
