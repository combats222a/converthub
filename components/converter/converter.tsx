"use client";

import { ConvertProvider, type ConvertMode } from "@/components/home/convert-context";
import { Hero } from "@/components/home/hero";
import { UploadCard } from "@/components/home/upload-card";
import { Toast } from "@/components/home/toast";
import type { FormatCategory } from "@/lib/formats";

export interface ConverterProps {
  /** Заголовок над виджетом. По умолчанию — общий заголовок конвертера. */
  heading?: string;
  /** Подзаголовок под заголовком. */
  description?: string;
  /** Скрыть заголовок/подзаголовок, если страница выводит их сама. */
  showHero?: boolean;
  /** Категория форматов, открытая в полном пикере по умолчанию. */
  category?: FormatCategory;
  /** Предзаполненный целевой формат, например из query-параметра ?to=. */
  initialTargetCode?: string | null;
  /** Короткий список кодов для фиксированного пикера источника. */
  sourceFormatOptions?: string[];
  /** Короткий список кодов для фиксированного пикера цели (используется вместе с reversed). */
  targetFormatOptions?: string[];
  /** Поменять местами: слева полный пикер (источник), справа фиксированный (цель). */
  reversed?: boolean;
  /** "redirect" — часть форматов уводит на отдельную страницу (главная страница). */
  /** "process" — конвертация выполняется прямо на этой странице. */
  mode?: ConvertMode;
  /** Дополнительный контент, отрисовывается внутри того же ConvertProvider
   *  (например блоки «Популярные форматы» на главной, которым нужен тот же
   *  контекст, что и у виджета загрузки). */
  children?: React.ReactNode;
}

/**
 * Единый компонент конвертации файлов.
 *
 * Инкапсулирует всю логику виджета — выбор форматов, drag&drop/загрузку
 * файла, тосты и переключение источник↔цель — и используется на каждой
 * странице-конвертере (главная, /heic, /heic-to, /ebook и т.д.), чтобы эта
 * логика не дублировалась между страницами.
 */
export function Converter({
  heading,
  description,
  showHero = true,
  category = "image",
  initialTargetCode = null,
  sourceFormatOptions,
  targetFormatOptions,
  reversed = false,
  mode = "redirect",
  children,
}: ConverterProps) {
  return (
    <ConvertProvider
      initialCategory={category}
      initialTargetCode={initialTargetCode}
      sourceFormatOptions={sourceFormatOptions}
      targetFormatOptions={targetFormatOptions}
      mode={mode}
    >
      {showHero && <Hero heading={heading} description={description} />}
      <UploadCard reversed={reversed} />
      {children}
      <Toast />
    </ConvertProvider>
  );
}
