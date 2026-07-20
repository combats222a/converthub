import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export interface PageSeoInput {
  title: string;
  description: string;
  /** Путь страницы, например "/pricing". */
  path: string;
}

/** Единая сборка title/description/canonical/OG/Twitter для страницы. */
export function buildMetadata({ title, description, path }: PageSeoInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${path}`,
      title,
      description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

/** JSON-LD для страницы-конвертера (реально работающий инструмент). */
export function buildWebApplicationJsonLd({ title, description, path }: PageSeoInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `${siteConfig.url}${path}`,
    description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (веб-браузер)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/** JSON-LD для информационной страницы (заглушки, поддержка и т.д.). */
export function buildWebPageJsonLd({ title, description, path }: PageSeoInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: `${siteConfig.url}${path}`,
    description,
  };
}
