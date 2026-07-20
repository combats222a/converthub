"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";

function HeicConverter() {
  const searchParams = useSearchParams();
  const initialTargetCode = searchParams.get("to")?.toUpperCase() || null;

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
      <Converter
        heading="HEIC → в любой формат"
        description="Сконвертируйте HEIC/HEIF-фото в JPG, PNG и другие форматы прямо в браузере."
        category="image"
        sourceFormatOptions={["HEIC", "HEIF"]}
        initialTargetCode={initialTargetCode}
        mode="process"
      />
    </div>
  );
}

export function HeicPageClient() {
  return (
    <>
      <Suspense fallback={null}>
        <HeicConverter />
      </Suspense>
      <Footer />
    </>
  );
}
