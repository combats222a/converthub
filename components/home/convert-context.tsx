"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

import type { FormatCategory } from "@/lib/formats";

export type OpenPicker = "source" | "target" | null;

/** Как обрабатывать выбранный/сброшенный файл. */
export type ConvertMode =
  /** Домашняя страница: часть форматов уводит на отдельные страницы-конвертеры. */
  | "redirect"
  /** Отдельная страница-конвертер: конвертация выполняется на месте. */
  | "process";

export interface ConvertProviderProps {
  children: React.ReactNode;
  /** Категория форматов, открытая в пикере целевого формата по умолчанию. */
  initialCategory?: FormatCategory;
  /** Предзаполненный целевой формат (например, из ?to=). */
  initialTargetCode?: string | null;
  /** Список кодов в упрощённом (fixed-list) пикере исходного формата. */
  sourceFormatOptions?: string[];
  /** Список кодов в упрощённом (fixed-list) пикере целевого формата. */
  targetFormatOptions?: string[];
  mode?: ConvertMode;
}

interface ConvertContextValue {
  sourceLabel: string;
  sourceCode: string | null;
  targetLabel: string;
  targetCode: string | null;
  category: FormatCategory;
  openPicker: OpenPicker;
  toastMessage: string | null;
  toastVisible: boolean;
  dropzoneRef: React.RefObject<HTMLDivElement | null>;
  sourceFormatOptions: string[];
  targetFormatOptions: string[];
  mode: ConvertMode;
  setCategory: (cat: FormatCategory) => void;
  setOpenPicker: (p: OpenPicker) => void;
  selectSourceFormat: (code: string) => void;
  selectTargetFormat: (code: string) => void;
  swapFormats: () => void;
  showToast: (msg: string) => void;
  scrollToDropzone: () => void;
}

const ConvertContext = createContext<ConvertContextValue | null>(null);

const DEFAULT_SOURCE_FORMAT_OPTIONS = ["HEIC", "HEIF"];

export function ConvertProvider({
  children,
  initialCategory = "image",
  initialTargetCode = null,
  sourceFormatOptions = DEFAULT_SOURCE_FORMAT_OPTIONS,
  targetFormatOptions = [],
  mode = "redirect",
}: ConvertProviderProps) {
  const [sourceLabel, setSourceLabel] = useState("Выберите формат");
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [targetLabel, setTargetLabel] = useState(initialTargetCode ?? "Выберите формат");
  const [targetCode, setTargetCode] = useState<string | null>(initialTargetCode);
  const [category, setCategory] = useState<FormatCategory>(initialCategory);
  const [openPicker, setOpenPicker] = useState<OpenPicker>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const scrollToDropzone = useCallback(() => {
    dropzoneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const selectSourceFormat = useCallback((code: string) => {
    setSourceLabel(code);
    setSourceCode(code);
    setOpenPicker(null);
  }, []);

  const selectTargetFormat = useCallback((code: string) => {
    setTargetLabel(code);
    setTargetCode(code);
    setOpenPicker(null);
  }, []);

  const swapFormats = useCallback(() => {
    if (!targetCode) {
      showToast("Сначала выберите формат, в который конвертировать");
      return;
    }
    const oldSource = sourceLabel;
    const oldTarget = targetLabel;
    setSourceLabel(oldTarget);
    setSourceCode(oldTarget);
    setTargetLabel(oldSource);
    setTargetCode(oldSource);
    showToast(`Теперь конвертируем из ${oldTarget} в ${oldSource}`);
  }, [sourceLabel, targetLabel, targetCode, showToast]);

  return (
    <ConvertContext.Provider
      value={{
        sourceLabel,
        sourceCode,
        targetLabel,
        targetCode,
        category,
        openPicker,
        toastMessage,
        toastVisible,
        dropzoneRef,
        sourceFormatOptions,
        targetFormatOptions,
        mode,
        setCategory,
        setOpenPicker,
        selectSourceFormat,
        selectTargetFormat,
        swapFormats,
        showToast,
        scrollToDropzone,
      }}
    >
      {children}
    </ConvertContext.Provider>
  );
}

export function useConvert() {
  const ctx = useContext(ConvertContext);
  if (!ctx) throw new Error("useConvert must be used within ConvertProvider");
  return ctx;
}
