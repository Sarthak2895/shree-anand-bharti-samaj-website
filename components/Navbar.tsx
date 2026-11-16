"use client";

import Link from "next/link";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import type { Locale } from "@/lib/i18n";
import { localePath, ui } from "@/lib/i18n";
import { socialLinks } from "@/lib/site";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = ui[locale];
  const opposite: Locale = locale === "en" ? "mr" : "en";
  const links = [
    [copy.nav.about, localePath(locale, "/about")],
    [copy.nav.departments, localePath(locale, "/departments")],
    [copy.nav.library, localePath(locale, "/library")],
    [copy.nav.gallery, localePath(locale, "/gallery")],
    [copy.nav.events, localePath(locale, "/events")],
    [copy.nav.contact, `${localePath(locale)}#contact`],
  ];

  return (
    <header className="site-header">
      <div className="site-container flex min-h-20 items-center justify-between gap-4 py-2">
        <BrandMark locale={locale} />

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
          <div className="header-divider" />
          {socialLinks.instagram && (
            <a className="social-icon" href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          )}
          {socialLinks.facebook && (
            <a className="social-icon" href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          )}
          <Link href={localePath(opposite)} className="language-switch">
            {copy.switchLanguage}
          </Link>
        </nav>

        <button
          type="button"
          className="mobile-menu-button xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav xl:hidden" aria-label="Mobile navigation">
          <div className="site-container grid gap-1 py-4">
            <Link href={localePath(locale)} className="mobile-nav-link" onClick={() => setOpen(false)}>
              {copy.nav.home}
            </Link>
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2 border-t border-[#DCE5EF] pt-4">
              <Link href={localePath(opposite)} className="language-switch" onClick={() => setOpen(false)}>
                {copy.switchLanguage}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
