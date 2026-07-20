import Link from "next/link";
import { FileText } from "lucide-react";

const ITEMS = [
  {
    name: "IMG_2024.HEIC",
    meta: "HEIC · 2.4 MB",
    toName: "IMG_2024.jpg",
    toMeta: "1.8 MB",
    badge: "JPG",
    badgeColor: "#3ecf8e",
    time: "2 мин. назад",
  },
  {
    name: "photo.heic",
    meta: "HEIC · 1.7 MB",
    toName: "photo.png",
    toMeta: "3.1 MB",
    badge: "PNG",
    badgeColor: "var(--primary)",
    time: "15 мин. назад",
  },
  {
    name: "image.heic",
    meta: "HEIC · 3.2 MB",
    toName: "image.webp",
    toMeta: "2.1 MB",
    badge: "WEBP",
    badgeColor: "#c39bff",
    time: "1 ч. назад",
  },
];

export function RecentConversions() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-0 flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] text-muted-foreground uppercase">
          🕘 Недавние конвертации
        </div>
        <Link href="/history" className="text-[12.5px] font-semibold text-primary">
          Смотреть все
        </Link>
      </div>
      <div className="flex flex-col gap-0.5">
        {ITEMS.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3.5 rounded-md px-2.5 py-3 transition-colors hover:bg-card max-[900px]:grid-cols-[1fr_auto] max-[900px]:grid-rows-2 max-[900px]:gap-y-1.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-input text-muted-foreground">
                <FileText className="size-4" />
              </span>
              <div>
                <div className="truncate text-[13.5px] font-semibold">{item.name}</div>
                <div className="text-[11.5px] text-muted-foreground">{item.meta}</div>
              </div>
            </div>
            <span className="text-muted-foreground max-[900px]:hidden">→</span>
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="w-fit rounded-md px-2.5 py-1 text-[11px] font-bold"
                style={{ background: `${item.badgeColor}26`, color: item.badgeColor }}
              >
                {item.badge}
              </span>
              <div>
                <div className="truncate text-[13.5px] font-semibold">{item.toName}</div>
                <div className="text-[11.5px] text-muted-foreground">{item.toMeta}</div>
              </div>
            </div>
            <span className="text-right text-xs text-muted-foreground max-[900px]:hidden">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
