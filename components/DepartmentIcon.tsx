import {
  CircleDollarSign,
  Dumbbell,
  HeartHandshake,
  Library,
  Music2,
  Palette,
  PersonStanding,
  Plane,
  ShieldPlus,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import type { DepartmentIconName } from "@/data/departments";

const icons = {
  dumbbell: Dumbbell,
  credit: CircleDollarSign,
  music: Music2,
  palette: Palette,
  library: Library,
  women: Users,
  nursing: ShieldPlus,
  festival: Sparkles,
  "indigenous-sports": Trophy,
  "foreign-sports": PersonStanding,
  excursion: Plane,
  yoga: HeartHandshake,
};

export function DepartmentIcon({
  name,
  size = 28,
  className,
}: {
  name: DepartmentIconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.8} className={className} aria-hidden="true" />;
}
