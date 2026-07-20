"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";

const EBOOK_SOURCE_FORMATS = ["EPUB", "FB2", "TXT", "MD", "HTML", "PDB"];

function EbookConverter() {
  const searchParams = useSearchParams();
  const initialTargetCode = searchParams.get("to")?.toUpperCase() || null;

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
      <Converter
        heading="Книги → в любой формат"
        description="Сконвертируйте электронную книгу в EPUB, FB2, TXT и другие форматы прямо в браузере."
        category="ebook"
        sourceFormatOptions={EBOOK_SOURCE_FORMATS}
        initialTargetCode={initialTargetCode}
        mode="process"
      />
    </div>
  );
}

export default function EbookPage() {
  return (
    <>
      <Suspense fallback={null}>
        <EbookConverter />
      </Suspense>
      <Footer />
    </>
  );
}
