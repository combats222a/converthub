"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, FileUp, Lock, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConvert } from "@/components/home/convert-context";
import { FixedFormatPicker, FullFormatPicker } from "@/components/home/format-selector";

const HEIC_EXT = /\.(heic|heif)$/i;
const EBOOK_SOURCE_EXT = /\.(txt|md|markdown|html?|fb2|epub)$/i;

export interface UploadCardProps {
  /** Если true — слева полный пикер (источник), справа фиксированный (цель). */
  reversed?: boolean;
}

export function UploadCard({ reversed = false }: UploadCardProps) {
  const { category, targetCode, mode, dropzoneRef, setOpenPicker, showToast } = useConvert();
  const [statsHidden, setStatsHidden] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setStatsHidden(localStorage.getItem("ch_stats_dismissed") === "1");
  }, []);

  function dismissStats() {
    setStatsHidden(true);
    localStorage.setItem("ch_stats_dismissed", "1");
  }

  function handleFiles(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    if (!targetCode) {
      showToast("Сначала выберите формат, в который конвертировать");
      setOpenPicker("target");
      return;
    }

    if (mode === "process") {
      // Мы уже находимся на выделенной странице-конвертере — конвертируем на месте.
      showToast(`Готово! Файл сконвертирован в ${targetCode}`);
      return;
    }

    // mode === "redirect": часть форматов уводит на отдельную страницу-конвертер.
    if (HEIC_EXT.test(file.name)) {
      showToast("Обнаружен HEIC-файл — переходим к конвертации…");
      setTimeout(() => {
        window.location.href = `/heic?to=${targetCode.toLowerCase()}`;
      }, 900);
    } else if (category === "ebook" && EBOOK_SOURCE_EXT.test(file.name)) {
      showToast("Переходим к конвертации книги…");
      setTimeout(() => {
        window.location.href = `/ebook?to=${targetCode.toLowerCase()}`;
      }, 900);
    } else {
      const ext = (file.name.split(".").pop() || "файл").toUpperCase();
      showToast(`Конвертация формата ${ext} скоро появится — пока доступен HEIC → JPG/PNG`);
    }
  }

  return (
    <div
      ref={dropzoneRef}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "relative rounded-[20px] border border-transparent bg-card p-[30px] pb-6.5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_-40px_rgba(31,86,220,0.28)] transition-shadow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-px before:opacity-55 before:transition-opacity before:content-['']",
        "before:bg-gradient-to-br before:from-[#2c5bce] before:to-[#4b4391]",
        "before:[mask-composite:exclude] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        dragActive && "shadow-[0_0_0_1px_var(--primary),0_30px_80px_-30px_rgba(31,86,220,0.28)] before:opacity-100"
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(31,86,220,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(122,160,255,0.10), transparent 50%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat, no-repeat, repeat",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!statsHidden && (
        <div className="relative -mx-[30px] -mt-[30px] mb-5.5 rounded-t-[19px] border-b border-border bg-white/[0.035] px-[46px] py-4 pl-5 text-center text-sm leading-[1.5] text-muted-foreground">
          <button
            type="button"
            onClick={dismissStats}
            aria-label="Скрыть"
            className="absolute top-2.5 right-3 flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          Мы преобразовали <b className="tabular-nums text-foreground">3 309 088</b> файлов общим
          размером <b className="tabular-nums text-foreground">60 086</b> ГБ
        </div>
      )}

      <div className="mx-auto mb-4 flex size-14 items-center justify-center text-primary">
        <FileUp className="size-11" strokeWidth={1.6} />
      </div>
      <div className="mb-1.5 text-center text-[19px] font-bold">
        Выберите файлы или перетащите их сюда
      </div>
      <div className="mb-5.5 text-center text-[13.5px] text-muted-foreground">
        Поддерживаются все популярные форматы
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2.5 rounded-md bg-primary px-6.5 py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Upload className="size-4.5 shrink-0" />
          Выбрать файлы
        </button>
        <button
          type="button"
          title="Dropbox — скоро"
          onClick={() => showToast("Загрузка из Dropbox скоро появится")}
          className="flex size-11 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/6 text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor">
            <path d="m6 2 6 3.8L6 9.6 0 5.8 6 2Zm12 0 6 3.8-6 3.8-6-3.8L18 2ZM0 13.4l6-3.8 6 3.8-6 3.8-6-3.8Zm18-3.8 6 3.8-6 3.8-6-3.8 6-3.8ZM6 17.9l6-3.8 6 3.8-6 3.7-6-3.7Z" />
          </svg>
        </button>
        <button
          type="button"
          title="Google Drive — скоро"
          onClick={() => showToast("Загрузка из Google Drive скоро появится")}
          className="flex size-11 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/6 text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor">
            <path d="M7.6 2h8.8l7.1 12.3-4.4 7.7H4.9L.5 14.3 7.6 2Zm1.1 2-5.4 9.4h10.8L8.7 4Zm2 10.4L6.3 22h11.4l-2.1-3.7-4.9-3.9Zm7.3-1L13.9 22h5.6l3-5.3-3.5-5.3ZM8.1 4l4.4 7.6h5.4L13.5 4H8.1Z" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-muted-foreground">
        <Lock className="size-3.5 shrink-0" />
        Ваши файлы защищены и не загружаются на сервер
      </div>

      <div className="mt-6.5 flex items-center justify-center gap-2.5">
        {reversed ? <FullFormatPicker side="source" /> : <FixedFormatPicker side="source" />}
        <SwapButton />
        {reversed ? <FixedFormatPicker side="target" /> : <FullFormatPicker side="target" />}
      </div>

      <div className="mt-4.5 text-center text-[13px] text-muted-foreground">
        1 GB максимальный размер файла или{" "}
        <a
          onClick={(e) => {
            e.preventDefault();
            showToast("Регистрация скоро появится");
          }}
          href="#"
          className="cursor-pointer text-primary underline"
        >
          Регистрация
        </a>
      </div>
    </div>
  );
}

function SwapButton() {
  const { swapFormats } = useConvert();
  return (
    <button
      type="button"
      title="Поменять местами"
      aria-label="Поменять местами"
      onClick={swapFormats}
      className="flex size-9.5 shrink-0 items-center justify-center rounded-md border border-border bg-input text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <ArrowLeftRight className="size-4" />
    </button>
  );
}
