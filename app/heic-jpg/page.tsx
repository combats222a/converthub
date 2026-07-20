import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebApplicationJsonLd } from "@/lib/seo";
import { HeicJpgPageClient } from "./heic-jpg-page-client";

const TITLE = "HEIC в JPG и PNG онлайн — ConvertHub";
const DESCRIPTION =
  "Конвертируйте HEIC-фото с iPhone в JPG или PNG прямо в браузере. Быстро и без загрузки на сервер.";
const PATH = "/heic-jpg";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebApplicationJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function HeicJpgPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HeicJpgPageClient />
    </>
  );
}
