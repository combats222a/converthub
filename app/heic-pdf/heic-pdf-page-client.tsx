"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";

function HeicPdfConverter() {
  const searchParams = useSearchParams();
  const initialTargetCode = searchParams.get("to")?.toUpperCase() || "PDF";

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
      <Converter
        heading="HEIC → PDF за секунды"
        description="Конвертация происходит прямо в браузере. Файлы никуда не загружаются."
        category="doc"
        sourceFormatOptions={["HEIC", "HEIF"]}
        targetFormatOptions={["PDF"]}
        initialTargetCode={initialTargetCode}
        fixedTarget
        mode="process"
      />
    </div>
  );
}

export function HeicPdfPageClient() {
  return (
    <>
      <Suspense fallback={null}>
        <HeicPdfConverter />
      </Suspense>
      <Footer />
    </>
  );
}
