import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import type { Locale } from "@/lib/i18n";

export function EventsContent({ locale }: { locale: Locale }) {
  const mr = locale === "mr";
  return (
    <main className={mr ? "font-devanagari" : ""}>
      <Navbar locale={locale} />
      <PageHero
        eyebrow={mr ? "कार्यक्रम आणि वर्ग" : "Events and classes"}
        title={mr ? "समुदायासोबत सहभागी होण्याच्या संधी." : "Opportunities to participate with the community."}
        description={mr ? "समितीने मंजूर केलेले कार्यक्रम, वर्ग, कार्यशाळा आणि नोंदणी माहिती येथे प्रसिद्ध केली जाईल." : "Committee-approved events, classes, workshops and registration information will be published here."}
      />
      <section className="section-space bg-white">
        <div className="site-container">
          <div className="empty-state">
            <span><CalendarDays size={42} /></span>
            <h2>{mr ? "अद्याप कोणताही कार्यक्रम प्रकाशित झालेला नाही" : "No programmes have been published yet"}</h2>
            <p>{mr ? "पुढील कार्यक्रमांची मंजूर माहिती उपलब्ध झाल्यावर ती येथे दिसेल." : "Approved information about the next programmes will appear here when available."}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [Clock3, mr ? "वेळापत्रक" : "Schedules", mr ? "तारीख, वेळ आणि कालावधी" : "Dates, times and duration"],
              [MapPin, mr ? "स्थळ किंवा ऑनलाइन" : "Venue or online", mr ? "प्रत्यक्ष आणि ऑनलाइन सहभाग माहिती" : "On-site and online participation details"],
              [Users, mr ? "पात्रता आणि नोंदणी" : "Eligibility and registration", mr ? "वयोगट, शुल्क आणि उपलब्ध जागा" : "Age groups, fees and available capacity"],
            ].map(([Icon, title, text]) => { const C = Icon; return <article key={String(title)} className="process-card"><span><C size={26} /></span><h3>{String(title)}</h3><p>{String(text)}</p></article>; })}
          </div>
          <div className="mt-12 text-center"><Link href="mailto:absthane@gmail.com" className="button-dark">{mr ? "कार्यक्रमाबद्दल चौकशी करा" : "Enquire about programmes"}</Link></div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
