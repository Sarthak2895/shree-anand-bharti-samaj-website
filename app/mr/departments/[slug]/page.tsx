import { notFound } from "next/navigation";
import { DepartmentDetailContent } from "@/components/pages/DepartmentDetailContent";
import { departments, getDepartment } from "@/data/departments";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return departments.map(({ slug }) => ({ slug })); }
export default async function Page({ params }: Props) { const { slug } = await params; const d = getDepartment(slug); if (!d) return notFound(); return <DepartmentDetailContent locale="mr" department={d} />; }
