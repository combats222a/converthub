import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { EbookPageClient } from "./ebook-page-client";

const TITLE = "Конвертер электронных книг — ConvertContext";
const DESCRIPTION =
  "Конвертируйте электронные книги и текстовые файлы EPUB, FB2, TXT, MD, HTML и PDB в нужный формат прямо в браузере — без загрузки на сервер.";
const PATH = "/ebook";

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

export default function EbookPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <EbookPageClient />
    </>
  );
}
