import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  BookOpen,
  CreditCard,
  History,
  ImageIcon,
  LayoutGrid,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for a colored icon badge (conversion tools). */
  gradient?: string;
}

export interface NavSection {
  title: string;
  items: NavLink[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Конвертация",
    items: [
      { href: "/apps", label: "Все инструменты", icon: LayoutGrid },
      {
        href: "/heic",
        label: "HEIC → в любой формат",
        icon: ImageIcon,
        gradient: "from-primary to-blue-600",
      },
      {
        href: "/heic-to",
        label: "Любой формат → HEIC",
        icon: ArrowLeftRight,
        gradient: "from-indigo-500 to-violet-600",
      },
      {
        href: "/ebook",
        label: "Книги → в любой формат",
        icon: BookOpen,
        gradient: "from-emerald-500 to-emerald-600",
      },
    ],
  },
  {
    title: "Мои файлы",
    items: [
      { href: "/history", label: "История конвертаций", icon: History },
      { href: "/favorites", label: "Избранное", icon: Star },
    ],
  },
  {
    title: "Аккаунт",
    items: [
      { href: "/pricing", label: "Тарифы и подписка", icon: CreditCard },
      { href: "/settings", label: "Настройки", icon: Settings },
    ],
  },
  {
    title: "Информация",
    items: [
      { href: "/privacy", label: "Конфиденциальность", icon: ShieldCheck },
      { href: "/support", label: "Поддержка", icon: LifeBuoy },
    ],
  },
];
