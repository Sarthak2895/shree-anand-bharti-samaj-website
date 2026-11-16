import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepartmentDetailContent } from "@/components/pages/DepartmentDetailContent";
import { departments, getDepartment } from "@/data/departments";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return departments.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const d = getDepartment(slug); return d ? { title: d.name, description: d.shortDescription } : {}; }
export default async function Page({ params }: Props) { const { slug } = await params; const d = getDepartment(slug); if (!d) return notFound(); return <DepartmentDetailContent locale="en" department={d} />; }
