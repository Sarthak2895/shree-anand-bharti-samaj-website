import Image from "next/image";
import { CalendarDays, Images, ImagePlus, ShieldCheck, Upload } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GalleryUploadForm } from "@/components/forms/GalleryUploadForm";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { getPublishedGalleryItems } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Community gallery",
    title: "Community images, reviewed before publication.",
    description:
      "Visitors can view approved gallery images without signing in. Anyone can submit an image, but it remains private until the administrator reviews and approves it.",
    emptyTitle: "No gallery images have been uploaded yet",
    emptyText: "Use the upload form below to submit the first organisation image for approval.",
    processTitle: "How gallery uploads work",
    steps: [
      [ImagePlus, "Choose an image", "Select a JPG, PNG or WebP image and add useful details."],
      [Upload, "Submit for review", "No visitor login is required. The image is stored privately with pending status."],
      [ShieldCheck, "Administrator approval", "Only approved images are published and become visible in the gallery."],
    ],
    upload: "Upload an image",
  },
  mr: {
    eyebrow: "सामुदायिक गॅलरी",
    title: "मंजुरीनंतर प्रकाशित होणारी सामुदायिक छायाचित्रे.",
    description:
      "मंजूर गॅलरी छायाचित्रे पाहण्यासाठी प्रवेशाची गरज नाही. कोणीही छायाचित्र सादर करू शकतो, परंतु प्रशासकाच्या मंजुरीपर्यंत ते खाजगी आणि प्रलंबित राहते.",
    emptyTitle: "अद्याप कोणतेही छायाचित्र अपलोड झालेले नाही",
    emptyText: "संस्थेचे पहिले छायाचित्र मंजुरीसाठी सादर करण्यासाठी खालील फॉर्म वापरा.",
    processTitle: "गॅलरी अपलोड प्रक्रिया",
    steps: [
      [ImagePlus, "छायाचित्र निवडा", "JPG, PNG किंवा WebP छायाचित्र निवडा आणि आवश्यक माहिती भरा."],
      [Upload, "पुनरावलोकनासाठी सादर करा", "भेट देणाऱ्याला लॉगिन आवश्यक नाही. छायाचित्र प्रलंबित म्हणून खाजगी साठवले जाते."],
      [ShieldCheck, "प्रशासकाची मंजुरी", "फक्त मंजूर छायाचित्रे प्रकाशित होऊन गॅलरीमध्ये दिसतात."],
    ],
    upload: "छायाचित्र अपलोड करा",
  },
} as const;

export async function GalleryContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const items = await getPublishedGalleryItems();

  return (
    <main className={locale === "mr" ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        actions={<a href="#upload-gallery" className="button-primary"><Upload size={18} />{t.upload}</a>}
      />

      <section className="section-space bg-white">
        <div className="site-container">
          {items.length === 0 ? (
            <div className="empty-state">
              <span><Images size={42} /></span>
              <h2>{t.emptyTitle}</h2>
              <p>{t.emptyText}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const title = locale === "mr" && item.title_mr ? item.title_mr : item.title_en;
                const caption = locale === "mr" && item.caption_mr ? item.caption_mr : item.caption_en;
                return (
                  <article key={item.id} className="gallery-card">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E8EFF7]">
                      <Image
                        src={`/api/gallery/file/${item.id}`}
                        alt={title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h2 className="mt-5 font-heading text-2xl font-bold text-[#17233A]">{title}</h2>
                    {caption && <p className="mt-2 leading-7 text-[#637083]">{caption}</p>}
                    {item.event_date && (
                      <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#2F6FA5]">
                        <CalendarDays size={16} />
                        {new Date(item.event_date).toLocaleDateString(locale === "mr" ? "mr-IN" : "en-IN")}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <GalleryUploadForm locale={locale} />

      <section className="section-space bg-white">
        <div className="site-container">
          <h2 className="text-center font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">{t.processTitle}</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {t.steps.map(([Icon, title, text]) => {
              const StepIcon = Icon;
              return <article key={title} className="process-card"><span><StepIcon size={26} /></span><h3>{title}</h3><p>{text}</p></article>;
            })}
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
