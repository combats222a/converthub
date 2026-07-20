"use client";

import { POPULAR_FORMATS } from "@/lib/formats";
import { useConvert } from "@/components/home/convert-context";

export function PopularFormats() {
  const { selectTargetFormat, scrollToDropzone, showToast } = useConvert();

  function handleSelect(code: string) {
    selectTargetFormat(code);
    showToast(`Выбран формат ${code} — теперь выберите файл`);
    scrollToDropzone();
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {POPULAR_FORMATS.map((f) => (
        <button
          key={f.code}
          type="button"
          onClick={() => handleSelect(f.code)}
          className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-input"
        >
          <span
            className="flex size-6.5 shrink-0 items-center justify-center rounded-md text-[9px] font-extrabold text-white"
            style={{ background: f.color }}
          >
            {f.code}
          </span>
          <div>
            <div className="text-[13.5px] font-semibold">{f.label}</div>
            <div className="text-[11px] text-muted-foreground">{f.sub}</div>
          </div>
        </button>
      ))}
      <button
        type="button"
        onClick={() => showToast("Полный список форматов — в выборе формата выше")}
        className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-input"
      >
        <span className="flex size-6.5 shrink-0 items-center justify-center rounded-md bg-[#4b5062] text-[9px] font-extrabold text-white">
          •••
        </span>
        <div>
          <div className="text-[13.5px] font-semibold">Ещё</div>
          <div className="text-[11px] text-muted-foreground">100+ форматов</div>
        </div>
      </button>
    </div>
  );
}
