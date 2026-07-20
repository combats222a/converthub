"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";

function HeicJpgConverter() {
  const searchParams = useSearchParams();
  const initialTargetCode = searchParams.get("to")?.toUpperCase() || "JPG";

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
      <Converter
        heading="HEIC → JPG / PNG за секунды"
        description="Конвертация происходит прямо в браузере. Файлы никуда не загружаются."
        category="image"
        sourceFormatOptions={["HEIC", "HEIF"]}
        targetFormatOptions={["JPG", "PNG"]}
        initialTargetCode={initialTargetCode}
        fixedTarget
        mode="process"
      />
    </div>
  );
}

export function HeicJpgPageClient() {
  return (
    <>
      <Suspense fallback={null}>
        <HeicJpgConverter />
      </Suspense>
      <Footer />
    </>
  );
}
