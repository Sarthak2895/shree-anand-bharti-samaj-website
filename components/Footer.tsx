import Link from "next/link";
import { Facebook, Instagram, LockKeyhole, Mail, MapPin } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import type { Locale } from "@/lib/i18n";
import { localePath, ui } from "@/lib/i18n";
import { socialLinks } from "@/lib/site";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const copy = ui[locale];

  return (
    <footer id="contact" className="site-footer">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.35fr_0.8fr_1fr]">
        <div>
          <BrandMark locale={locale} />
          <p className="mt-6 max-w-lg leading-7 text-[#d9d3c9]">{copy.footerDescription}</p>
          {(socialLinks.instagram || socialLinks.facebook) && (
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D7B56D]">{copy.follow}</p>
              <div className="mt-3 flex gap-3">
                {socialLinks.instagram && (
                  <a className="footer-social" href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a className="footer-social" href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="footer-heading">Explore</h3>
          <div className="mt-5 grid gap-3 text-sm text-[#ded7cd]">
            <Link href={localePath(locale, "/about")} className="hover:text-white">{copy.nav.about}</Link>
            <Link href={localePath(locale, "/departments")} className="hover:text-white">{copy.nav.departments}</Link>
            <Link href={localePath(locale, "/library")} className="hover:text-white">{copy.nav.library}</Link>
            <Link href={localePath(locale, "/gallery")} className="hover:text-white">{copy.nav.gallery}</Link>
            <Link href={localePath(locale, "/events")} className="hover:text-white">{copy.nav.events}</Link>
            <Link href="/admin/login" className="inline-flex items-center gap-2 text-[#bfb8ae] hover:text-white"><LockKeyhole size={14} />Administrator login</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Contact</h3>
          <div className="mt-5 grid gap-4 text-sm text-[#ded7cd]">
            <p className="flex gap-3"><MapPin className="mt-0.5 shrink-0" size={18} />Chendani Koliwada, Thane East, Maharashtra, India</p>
            <a href="mailto:absthane@gmail.com" className="flex gap-3 hover:text-white"><Mail className="mt-0.5 shrink-0" size={18} />absthane@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-2 py-5 text-sm text-[#bfb8ae] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Shree Anand Bharti Samaj. All rights reserved.</p>
          <p>Established in 1910 • Thane, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
