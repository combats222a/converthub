import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebApplicationJsonLd } from "@/lib/seo";
import { HeicPdfPageClient } from "./heic-pdf-page-client";

const TITLE = "HEIC в PDF онлайн — ConvertContext";
const DESCRIPTION =
  "Конвертируйте HEIC-фото с iPhone в PDF-документ прямо в браузере. Быстро и без загрузки на сервер.";
const PATH = "/heic-pdf";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebApplicationJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function HeicPdfPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HeicPdfPageClient />
    </>
  );
}
