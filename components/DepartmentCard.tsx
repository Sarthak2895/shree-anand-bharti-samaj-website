import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Department } from "@/data/departments";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function DepartmentCard({
  department,
  locale = "en",
}: {
  department: Department;
  locale?: Locale;
}) {
  const isMr = locale === "mr";
  const title = isMr ? department.nameMr : department.name;
  const description = isMr
    ? department.shortDescriptionMr
    : department.shortDescription;

  return (
    <Link
      href={localePath(locale, `/departments/${department.slug}`)}
      className="department-card group"
      aria-label={title}
    >
      <Image
        src={department.image}
        alt=""
        fill
        className="department-card-image"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
      <span className="department-card-shade" aria-hidden="true" />

      <span className="department-card-content">
        <span className="department-card-title font-heading">{title}</span>
        <span className="department-card-description">{description}</span>
        <span className="department-card-link">
          {isMr ? "अधिक माहिती" : "Learn more"}
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </span>
    </Link>
  );
}
