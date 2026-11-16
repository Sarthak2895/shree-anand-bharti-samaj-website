import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath, ui } from "@/lib/i18n";

export function BrandMark({ locale }: { locale: Locale }) {
  const copy = ui[locale];

  return (
    <Link href={localePath(locale)} className="brand-lockup" aria-label={copy.organisation}>
      <span className="brand-logo" aria-hidden="true">
        <Image
          src="/images/abs-logo.png"
          alt=""
          fill
          priority
          sizes="64px"
          className="brand-logo-image"
        />
      </span>
      <span className="min-w-0">
        <span className="brand-title">{copy.organisation}</span>
        <span className={locale === "mr" ? "brand-subtitle" : "brand-subtitle font-devanagari"}>
          {copy.organisationMarathi}
        </span>
      </span>
    </Link>
  );
}
