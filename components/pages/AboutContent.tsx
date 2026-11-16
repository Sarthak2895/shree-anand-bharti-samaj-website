import Link from "next/link";
import { ArrowRight, Building2, Compass, HeartHandshake, Landmark, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "About the organisation",
    title: "More than a century of service, participation and shared identity.",
    intro: "Shree Anand Bharti Samaj was established in 1910 and is located in Chendani Koliwada, Thane East. The organisation has grown through the contribution of generations of members, volunteers, participants and committee leaders.",
    heritageTitle: "Our heritage",
    heritageText: "For 116 years, the Samaj has provided a common space for physical development, culture, music, education, wellbeing, service and social connection. Its 12 departments reflect the varied needs and interests of the community while preserving a shared institutional identity.",
    timelineTitle: "Historical timeline",
    timelineNote: "Only committee-confirmed facts should be added to this timeline. The entries below provide the approved structural starting point.",
    timeline: [
      ["1910", "Shree Anand Bharti Samaj was established in Thane."],
      ["Across generations", "Community members expanded participation through sports, culture, education, wellness and service."],
      ["12 departments", "The organisation developed specialised departments serving different community needs."],
      ["2026", "The Samaj began strengthening its digital presence to reach more people and support transparent participation."],
    ],
    purposeTitle: "What guides the organisation",
    values: [
      [Landmark, "Preserve the legacy", "Protect the history, values and traditions built over more than a century."],
      [Users, "Empower generations", "Create meaningful opportunities for children, youth, adults and senior citizens."],
      [HeartHandshake, "Serve the community", "Support participation, wellbeing, learning and responsible social service."],
      [Compass, "Grow responsibly", "Use modern tools while retaining committee oversight, trust and inclusiveness."],
    ],
    leadershipTitle: "Committee leadership",
    leadershipText: "The organisation is managed by a committee. Mr. Hareshwar M. Morekar serves as the Adhyaksh and guides the institution together with committee members and department representatives.",
    archiveTitle: "Help preserve the official history",
    archiveText: "Committee-confirmed milestones, names of past office bearers and historic documents can be added gradually through the website and Digital Library.",
    action: "Explore the 12 departments",
  },
  mr: {
    eyebrow: "संस्थेविषयी",
    title: "शतकाहून अधिक सेवा, सहभाग आणि सामूहिक ओळख.",
    intro: "श्री आनंद भारती समाजाची स्थापना १९१० मध्ये झाली असून संस्था चेंदणी कोळीवाडा, ठाणे पूर्व येथे स्थित आहे. अनेक पिढ्यांतील सदस्य, स्वयंसेवक, सहभागी आणि समिती पदाधिकाऱ्यांच्या योगदानातून संस्था विकसित झाली आहे.",
    heritageTitle: "आमचा वारसा",
    heritageText: "११६ वर्षांपासून समाजाने शारीरिक विकास, संस्कृती, संगीत, शिक्षण, आरोग्य, सेवा आणि सामाजिक जोडणीसाठी सामायिक व्यासपीठ उपलब्ध करून दिले आहे. संस्थेचे १२ विभाग विविध सामुदायिक गरजा पूर्ण करताना एकात्मिक संस्थात्मक ओळख जपतात.",
    timelineTitle: "ऐतिहासिक कालरेषा",
    timelineNote: "या कालरेषेत फक्त समितीने प्रमाणित केलेली माहितीच जोडावी. खालील नोंदी मंजूर प्रारंभिक रचना दर्शवतात.",
    timeline: [
      ["१९१०", "ठाण्यात श्री आनंद भारती समाजाची स्थापना झाली."],
      ["अनेक पिढ्या", "क्रीडा, संस्कृती, शिक्षण, आरोग्य आणि सेवेद्वारे सामुदायिक सहभाग वाढला."],
      ["१२ विभाग", "विविध सामुदायिक गरजांसाठी विशेष विभाग विकसित झाले."],
      ["२०२६", "अधिक लोकांपर्यंत पोहोचण्यासाठी आणि पारदर्शक सहभागासाठी संस्थेने डिजिटल उपस्थिती मजबूत करण्यास सुरुवात केली."],
    ],
    purposeTitle: "संस्थेला दिशा देणारी तत्त्वे",
    values: [
      [Landmark, "वारसा जपणे", "शतकाहून अधिक काळ घडलेल्या इतिहास, मूल्ये आणि परंपरांचे संरक्षण."],
      [Users, "पिढ्यांना सक्षम करणे", "मुले, युवक, प्रौढ आणि ज्येष्ठ नागरिकांसाठी अर्थपूर्ण संधी निर्माण करणे."],
      [HeartHandshake, "समुदायाची सेवा", "सहभाग, आरोग्य, शिक्षण आणि जबाबदार सामाजिक सेवेला सहाय्य करणे."],
      [Compass, "जबाबदारीने वाढणे", "समितीचे नियंत्रण, विश्वास आणि सर्वसमावेशकता राखून आधुनिक साधनांचा वापर करणे."],
    ],
    leadershipTitle: "समिती नेतृत्व",
    leadershipText: "संस्था समितीद्वारे चालवली जाते. श्री. हरेश्वर एम. मोरेकर अध्यक्ष म्हणून समिती सदस्य आणि विभाग प्रतिनिधींसोबत संस्थेला मार्गदर्शन करतात.",
    archiveTitle: "अधिकृत इतिहास जतन करण्यास मदत करा",
    archiveText: "समितीने प्रमाणित केलेले टप्पे, माजी पदाधिकाऱ्यांची नावे आणि ऐतिहासिक दस्तऐवज वेबसाइट व डिजिटल ग्रंथालयातून हळूहळू जोडता येतील.",
    action: "१२ विभाग पाहा",
  },
} as const;

export function AboutContent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <main className={locale === "mr" ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.intro} />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="heritage-number-card">
            <span>116</span>
            <small>{locale === "mr" ? "वर्षांचा वारसा" : "years of legacy"}</small>
          </div>
          <div>
            <p className="eyebrow">{t.heritageTitle}</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">1910 — {locale === "mr" ? "आजपर्यंत" : "Present"}</h2>
            <p className="mt-6 text-lg leading-9 text-[#607087]">{t.heritageText}</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#F3F6FA]">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">{t.timelineTitle}</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-[#17233A] sm:text-5xl">{locale === "mr" ? "पिढ्यांतून घडलेली वाटचाल" : "A journey built across generations"}</h2>
            <p className="mt-5 leading-8 text-[#637083]">{t.timelineNote}</p>
          </div>
          <div className="timeline mt-12">
            {t.timeline.map(([year, text]) => (
              <article key={year} className="timeline-item">
                <div className="timeline-marker" />
                <p className="timeline-year">{year}</p>
                <p className="mt-3 leading-7 text-[#607087]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <p className="eyebrow text-center">{t.purposeTitle}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {t.values.map(([Icon, title, text]) => {
              const ValueIcon = Icon;
              return (
                <article key={title} className="value-card">
                  <span><ValueIcon size={27} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#07162B] text-white">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 sm:p-10">
            <Building2 size={34} className="text-[#D7B56D]" />
            <h2 className="mt-6 font-heading text-4xl font-bold">{t.leadershipTitle}</h2>
            <p className="mt-5 leading-8 text-white/68">{t.leadershipText}</p>
          </article>
          <article className="rounded-[2rem] bg-[#D7B56D] p-8 text-[#0B1F3A] sm:p-10">
            <Landmark size={34} />
            <h2 className="mt-6 font-heading text-4xl font-bold">{t.archiveTitle}</h2>
            <p className="mt-5 leading-8 text-[#385E80]">{t.archiveText}</p>
            <Link href={localePath(locale, "/departments")} className="button-dark mt-8">{t.action}<ArrowRight size={18} /></Link>
          </article>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
