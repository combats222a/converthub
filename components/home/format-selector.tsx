"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, FORMATS, type FormatCategory } from "@/lib/formats";
import { useConvert } from "@/components/home/convert-context";

type PickerSide = "source" | "target";

function useCloseOnOutside(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return ref;
}

/** Общий хук: достаёт для указанной стороны (source/target) лейбл, код и сеттер. */
function useSideState(side: PickerSide) {
  const ctx = useConvert();
  return side === "source"
    ? {
        label: ctx.sourceLabel,
        code: ctx.sourceCode,
        select: ctx.selectSourceFormat,
        fixedOptions: ctx.sourceFormatOptions,
      }
    : {
        label: ctx.targetLabel,
        code: ctx.targetCode,
        select: ctx.selectTargetFormat,
        fixedOptions: ctx.targetFormatOptions,
      };
}

/**
 * Упрощённый пикер — короткий фиксированный список кодов (например,
 * HEIC/HEIF или набор форматов книг). Список задаётся на уровне
 * ConvertProvider через `sourceFormatOptions`/`targetFormatOptions`, так что
 * этот компонент не завязан на конкретную страницу.
 */
export function FixedFormatPicker({ side }: { side: PickerSide }) {
  const { label, code, select, fixedOptions } = useSideState(side);
  const { openPicker, setOpenPicker } = useConvert();
  const open = openPicker === side;
  const ref = useCloseOnOutside(open, () => setOpenPicker(null));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpenPicker(open ? null : side)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-white/[0.03] px-3 py-2 text-[13px] font-semibold transition-colors hover:border-white/20",
          code ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span>{label}</span>
        <ChevronDown className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-20 flex min-w-[150px] flex-col gap-0.5 rounded-xl border border-border bg-popover p-3.5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.5)]">
          {fixedOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => select(c)}
              className="rounded-md px-2.5 py-2.5 text-left text-sm font-medium text-foreground hover:bg-white/[0.05]"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Полный пикер — поиск + категории + сетка кодов из lib/formats.ts. */
export function FullFormatPicker({ side }: { side: PickerSide }) {
  const { label, code, select } = useSideState(side);
  const { category, setCategory, openPicker, setOpenPicker, showToast } = useConvert();
  const open = openPicker === side;
  const ref = useCloseOnOutside(open, () => setOpenPicker(null));
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toUpperCase();
    const items = FORMATS[category] || [];
    return items.filter((f) => !q || f.code.includes(q));
  }, [category, query]);

  function handleCategoryChange(cat: FormatCategory) {
    if (cat === category) return;
    setCategory(cat);
    setQuery("");
    const hasWorkingFormat = (FORMATS[cat] || []).some((f) => f.enabled);
    if (cat !== "image" && cat !== "ebook" && !hasWorkingFormat) {
      showToast(`Раздел «${CATEGORY_LABELS[cat]}» скоро появится`);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpenPicker(open ? null : side)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-white/[0.03] px-3 py-2 text-[13px] font-semibold transition-colors hover:border-white/20",
          code ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span>{label}</span>
        <ChevronDown className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 left-auto z-20 w-[420px] max-w-[86vw] rounded-xl border border-border bg-popover p-3.5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.5)]">
          <div className="mb-3 flex items-center gap-2 rounded-md border border-border/70 px-2.5 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск"
              className="w-full bg-transparent text-sm text-foreground outline-none"
            />
          </div>
          <div className="flex gap-3.5 max-[480px]:flex-col">
            <div className="flex min-w-[150px] flex-col gap-0.5 border-r border-border pr-3 max-h-[280px] overflow-y-auto max-[480px]:max-h-none max-[480px]:flex-row max-[480px]:overflow-x-auto max-[480px]:border-r-0 max-[480px]:border-b max-[480px]:pr-0 max-[480px]:pb-2">
              {(Object.keys(CATEGORY_LABELS) as FormatCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "flex items-center justify-between gap-1.5 whitespace-nowrap rounded-md px-2 py-2 text-left text-[13px] text-muted-foreground hover:bg-white/[0.05]",
                    cat === category && "bg-white/5 text-foreground"
                  )}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
            <div className="grid flex-1 auto-rows-min grid-cols-3 gap-2 max-h-[280px] content-start overflow-y-auto pr-1 max-[480px]:max-h-[220px]">
              {list.length === 0 && (
                <div className="col-span-3 py-5 text-center text-[13px] text-muted-foreground">
                  Ничего не найдено
                </div>
              )}
              {list.map((f) => (
                <button
                  key={f.code}
                  type="button"
                  onClick={() =>
                    f.enabled ? select(f.code) : showToast(`${f.code} — конвертация скоро появится`)
                  }
                  className={cn(
                    "rounded-md border border-border/70 bg-white/[0.03] px-1 py-2.5 text-center text-xs font-semibold text-foreground transition-colors hover:border-primary",
                    f.code === code && "border-primary bg-primary text-primary-foreground",
                    !f.enabled && "cursor-not-allowed opacity-40 hover:border-border/70"
                  )}
                >
                  {f.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
