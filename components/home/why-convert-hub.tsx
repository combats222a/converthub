import { Lock, Shapes, Zap } from "lucide-react";

const CARDS = [
  {
    icon: Zap,
    bg: "rgba(31,86,220,0.14)",
    color: "var(--primary)",
    title: "Быстрая конвертация",
    text: "Мгновенная обработка файлов без ожидания в очереди.",
  },
  {
    icon: Lock,
    bg: "rgba(62,207,142,0.14)",
    color: "#3ecf8e",
    title: "Безопасность",
    text: "Файлы не загружаются на сервер и полностью защищены.",
  },
  {
    icon: Shapes,
    bg: "rgba(168,107,255,0.14)",
    color: "#c39bff",
    title: "Любые форматы",
    text: "Конвертация в более чем 100 форматов файлов.",
  },
];

export function WhyConvertContext() {
  return (
    <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
      {CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-[14px] border border-border bg-card p-5 transition-all hover:-translate-y-0.5"
        >
          <div
            className="mb-3.5 flex size-8.5 items-center justify-center rounded-md"
            style={{ background: card.bg, color: card.color }}
          >
            <card.icon className="size-4.5" />
          </div>
          <h3 className="mb-1.5 text-[14.5px] font-bold">{card.title}</h3>
          <p className="text-[13px] leading-[1.5] text-muted-foreground">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
