"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

import type { FormatCategory } from "@/lib/formats";

export type OpenPicker = "source" | "target" | null;

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
  setCategory: (cat: FormatCategory) => void;
  setOpenPicker: (p: OpenPicker) => void;
  selectSourceFormat: (code: string) => void;
  selectTargetFormat: (code: string) => void;
  swapFormats: () => void;
  showToast: (msg: string) => void;
  scrollToDropzone: () => void;
}

const ConvertContext = createContext<ConvertContextValue | null>(null);

export function ConvertProvider({ children }: { children: React.ReactNode }) {
  const [sourceLabel, setSourceLabel] = useState("Выберите формат");
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [targetLabel, setTargetLabel] = useState("Выберите формат");
  const [targetCode, setTargetCode] = useState<string | null>(null);
  const [category, setCategory] = useState<FormatCategory>("image");
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
