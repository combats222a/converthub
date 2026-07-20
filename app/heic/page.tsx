import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { HeicPageClient } from "./heic-page-client";

const TITLE = "HEIC — конвертируйте в любой формат — ConvertContext";
const DESCRIPTION =
  "Конвертируйте HEIC-фото с iPhone в JPG, PNG и другие форматы. Выберите нужный формат — конвертация происходит прямо в браузере.";
const PATH = "/heic";

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
  name: TITLE,
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

export default function HeicPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HeicPageClient />
    </>
  );
}
