import type { Metadata } from "next";

import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const TITLE = "В любой формат → HEIC — ConvertHub";
const DESCRIPTION =
  "Конвертируйте изображения из JPG, PNG и других форматов в HEIC прямо в браузере — быстро, бесплатно, без загрузки на сервер.";
const PATH = "/heic-to";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/twitter-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "В любой формат → HEIC — ConvertHub",
  url: `${siteConfig.url}${PATH}`,
  description: DESCRIPTION,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (веб-браузер)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function HeicToPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
        <Converter
          heading="Любой формат → HEIC"
          description="Сконвертируйте изображение любого формата в HEIC прямо в браузере."
          category="image"
          initialTargetCode="HEIC"
          targetFormatOptions={["HEIC"]}
          reversed
          mode="process"
        />
      </div>
      <Footer />
    </>
  );
}
