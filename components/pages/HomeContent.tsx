import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Images,
  Landmark,
  Languages,
  Upload,
  Sparkles,
  Users,
} from "lucide-react";
import { DepartmentCard } from "@/components/DepartmentCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { departments } from "@/data/departments";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const copy = {
  en: {
    badge: "Established in 1910 • Chendani Koliwada, Thane",
    title: "A living legacy, shaped by community.",
    intro:
      "Shree Anand Bharti Samaj connects generations through sports, culture, education, wellness, service and meaningful participation across 12 departments.",
    explore: "Explore departments",
    history: "Read our history",
    stats: [["1910", "Established"], ["116", "Years of service"], ["12", "Departments"], ["Open", "To everyone"]],
    storyEyebrow: "Our story",
    storyTitle: "Rooted in Thane. Growing with every generation.",
    storyText:
      "Founded in 1910, the organisation has served Chendani Koliwada and the wider Thane community for more than a century. Its work brings together physical development, creative expression, learning, wellbeing and social responsibility.",
    vision:
      "To preserve our 116-year legacy while empowering generations through sports, culture, education, wellness, service, and community participation across our 12 departments.",
    deptEyebrow: "Our departments",
    deptTitle: "Twelve ways to learn, participate and serve",
    deptText: "Each department has a distinct purpose and contributes to one connected community.",
    digitalEyebrow: "Open digital participation",
    digitalTitle: "Open for viewing, with safe gallery submissions.",
    digitalText:
      "Everyone can explore the website without signing in. Visitors can submit Gallery images without an account; submitted images are reviewed by the administrator before they become public. Library publishing remains available separately.",
    accountNote: "No visitor account is needed to submit a gallery image",
    publicLabel: "Public access",
    publicText: "History, departments, approved gallery images, publications and events remain freely viewable.",
    verifiedLabel: "Public submissions",
    verifiedText: "Anyone can submit a Gallery image without creating an account.",
    moderationLabel: "Administrator approval",
    moderationText: "New Gallery images remain private until the administrator approves them for publication.",
    galleryTitle: "Moderated community gallery",
    galleryText: "View approved community images or submit a new image for administrator review.",
    libraryTitle: "Digital Library",
    libraryText: "Read or directly publish articles, research papers, historical documents and educational resources.",
    viewGallery: "Open gallery",
    viewLibrary: "Explore Library",
    eventsTitle: "Events, classes and community programmes",
    eventsText: "Approved schedules and participation information will be published in one clear place.",
    leadership: "Managed by a committee under the leadership of Adhyaksh Mr. Hareshwar M. Morekar.",
  },
  mr: {
    badge: "स्थापना १९१० • चेंदणी कोळीवाडा, ठाणे",
    title: "समुदायाने घडवलेला जिवंत वारसा.",
    intro:
      "श्री आनंद भारती समाज १२ विभागांद्वारे क्रीडा, संस्कृती, शिक्षण, आरोग्य, सेवा आणि अर्थपूर्ण सहभागातून पिढ्यांना जोडतो.",
    explore: "विभाग पाहा",
    history: "इतिहास वाचा",
    stats: [["१९१०", "स्थापना"], ["११६", "वर्षांची सेवा"], ["१२", "विभाग"], ["सर्वांसाठी", "मुक्त प्रवेश"]],
    storyEyebrow: "आमचा इतिहास",
    storyTitle: "ठाण्यात रुजलेली आणि प्रत्येक पिढीसोबत वाढणारी संस्था.",
    storyText:
      "१९१० मध्ये स्थापन झालेल्या संस्थेने चेंदणी कोळीवाडा आणि ठाणे परिसरातील समाजाची शतकाहून अधिक काळ सेवा केली आहे. शारीरिक विकास, सर्जनशीलता, शिक्षण, आरोग्य आणि सामाजिक जबाबदारी यांना संस्था एकत्र आणते.",
    vision:
      "क्रीडा, संस्कृती, शिक्षण, आरोग्य, सेवा आणि १२ विभागांतील सामुदायिक सहभागातून ११६ वर्षांचा वारसा जपत पुढील पिढ्यांना सक्षम करणे.",
    deptEyebrow: "आमचे विभाग",
    deptTitle: "शिकणे, सहभागी होणे आणि सेवा करण्याचे बारा मार्ग",
    deptText: "प्रत्येक विभागाची स्वतंत्र भूमिका असून सर्व विभाग एकाच समुदायासाठी कार्य करतात.",
    digitalEyebrow: "खुले डिजिटल सहभाग व्यासपीठ",
    digitalTitle: "पाहण्यासाठी खुले, सुरक्षित गॅलरी सादरीकरणासह.",
    digitalText:
      "वेबसाइट पाहण्यासाठी प्रवेशाची गरज नाही. खाते न बनवता गॅलरीसाठी छायाचित्र सादर करता येते; सार्वजनिक होण्यापूर्वी प्रशासक त्याची तपासणी आणि मंजुरी करतो.",
    accountNote: "गॅलरी छायाचित्र सादर करण्यासाठी भेट देणाऱ्याला खाते आवश्यक नाही",
    publicLabel: "सार्वजनिक प्रवेश",
    publicText: "इतिहास, विभाग, मंजूर गॅलरी छायाचित्रे, प्रकाशने आणि कार्यक्रम सर्वांना मुक्तपणे पाहता येतात.",
    verifiedLabel: "सार्वजनिक सादरीकरण",
    verifiedText: "खाते न बनवता कोणीही गॅलरीसाठी छायाचित्र सादर करू शकतो.",
    moderationLabel: "प्रशासकाची मंजुरी",
    moderationText: "नवीन गॅलरी छायाचित्रे प्रशासकाच्या मंजुरीपर्यंत खाजगी राहतात.",
    galleryTitle: "नियंत्रित सामुदायिक गॅलरी",
    galleryText: "मंजूर सामुदायिक छायाचित्रे पाहा किंवा प्रशासकाच्या पुनरावलोकनासाठी नवीन छायाचित्र सादर करा.",
    libraryTitle: "डिजिटल ग्रंथालय",
    libraryText: "लेख, संशोधन निबंध, ऐतिहासिक दस्तऐवज आणि शैक्षणिक साहित्य वाचा किंवा थेट प्रकाशित करा.",
    viewGallery: "गॅलरी उघडा",
    viewLibrary: "ग्रंथालय पाहा",
    eventsTitle: "कार्यक्रम, वर्ग आणि सामुदायिक उपक्रम",
    eventsText: "मंजूर वेळापत्रक आणि सहभागाची माहिती एका स्पष्ट ठिकाणी प्रसिद्ध केली जाईल.",
    leadership: "अध्यक्ष श्री. हरेश्वर एम. मोरेकर यांच्या नेतृत्वाखाली समितीद्वारे संस्था चालवली जाते.",
  },
} as const;

export function HomeContent({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <main className={locale === "mr" ? "font-devanagari" : ""}>
      <Navbar locale={locale} />

      <section className="home-hero">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="site-container relative grid min-h-[700px] items-center gap-16 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="hero-badge"><Sparkles size={16} />{t.badge}</div>
            <h1 className="mt-8 max-w-4xl font-heading text-6xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.6rem]">
              {t.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{t.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={localePath(locale, "/departments")} className="button-primary">
                {t.explore}<ArrowRight size={18} />
              </Link>
              <Link href={localePath(locale, "/about")} className="button-secondary">
                {t.history}
              </Link>
            </div>
          </div>

          <div className="heritage-panel">
            <div className="heritage-seal" aria-hidden="true">
              <span>ABS</span><small>1910</small>
            </div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#D7B56D]">Shree Anand Bharti Samaj</p>
            <p className="mt-5 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.vision}</p>
            <div className="mt-8 h-px bg-white/15" />
            <p className="mt-6 leading-7 text-white/66">{t.leadership}</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pb-6">
        <div className="site-container grid overflow-hidden rounded-[2rem] border border-[#DCE5EF] bg-white shadow-[0_28px_80px_rgba(20,42,35,0.13)] sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map(([value, label], index) => (
            <div key={label} className={`stat-card ${index ? "stat-divider" : ""}`}>
              <p className="font-heading text-4xl font-bold text-[#0B1F3A]">{value}</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#6D7A8C]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#F8FAFC]">
        <div className="site-container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="story-art" aria-hidden="true">
            <div className="story-year">1910</div>
            <div className="story-line" />
            <div className="story-year story-year-end">2026</div>
            <div className="story-copy">116 YEARS<br />OF COMMUNITY</div>
          </div>
          <div>
            <SectionHeading eyebrow={t.storyEyebrow} title={t.storyTitle} description={t.storyText} />
            <Link href={localePath(locale, "/about")} className="text-link mt-8">
              {t.history}<ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading eyebrow={t.deptEyebrow} title={t.deptTitle} description={t.deptText} centered />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {departments.map((department) => (
              <DepartmentCard key={department.slug} department={department} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space security-section">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t.digitalEyebrow} title={t.digitalTitle} description={t.digitalText} />
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#BACBDC] bg-white px-5 py-4 text-sm font-bold text-[#254B6B]">
              <Upload size={23} /> {t.accountNote}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              [Users, t.publicLabel, t.publicText],
              [CheckCircle2, t.verifiedLabel, t.verifiedText],
              [Landmark, t.moderationLabel, t.moderationText],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof Users;
              return (
                <article key={String(title)} className="security-card">
                  <span className="security-icon"><IconComponent size={25} /></span>
                  <div><h3>{String(title)}</h3><p>{String(text)}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#07162B] text-white">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <article className="feature-panel">
            <Images size={38} className="text-[#D7B56D]" />
            <h2 className="mt-7 font-heading text-4xl font-bold">{t.galleryTitle}</h2>
            <p className="mt-4 max-w-xl leading-8 text-white/68">{t.galleryText}</p>
            <Link href={localePath(locale, "/gallery")} className="button-light mt-8">{t.viewGallery}<ArrowRight size={18} /></Link>
          </article>
          <article className="feature-panel feature-panel-gold">
            <BookOpen size={38} className="text-[#0B1F3A]" />
            <h2 className="mt-7 font-heading text-4xl font-bold text-[#0B1F3A]">{t.libraryTitle}</h2>
            <p className="mt-4 max-w-xl leading-8 text-[#416785]">{t.libraryText}</p>
            <Link href={localePath(locale, "/library")} className="button-dark mt-8">{t.viewLibrary}<ArrowRight size={18} /></Link>
          </article>
        </div>
      </section>

      <section className="section-space bg-[#F8FAFC]">
        <div className="site-container rounded-[2rem] border border-[#DCE5EF] bg-white p-8 shadow-sm sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#2F6FA5]"><CalendarDays size={28} /><Languages size={25} /></div>
            <h2 className="mt-5 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">{t.eventsTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-[#66758A]">{t.eventsText}</p>
          </div>
          <Link href={localePath(locale, "/events")} className="button-dark mt-8 shrink-0 lg:mt-0">
            {locale === "mr" ? "कार्यक्रम पाहा" : "View programmes"}<ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
