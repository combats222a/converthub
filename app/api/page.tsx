import { Code, Code2, FileText, KeyRound } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "API для разработчиков — ConvertContext";
const DESCRIPTION =
  "Мы разрабатываем публичный API для конвертации файлов из ваших приложений и скриптов — с документацией, ключами доступа и лимитами по тарифу.";
const PATH = "/api";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ApiPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="API для разработчиков"
        description={DESCRIPTION}
        icon={<Code2 className="size-7" strokeWidth={1.8} />}
        stubTitle="Публичный API"
        stubDescription="Мы разрабатываем API для интеграции конвертации в ваши приложения"
        features={[
          {
            icon: <Code className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "REST API",
            text: "Отправляйте файлы и получайте результат через простые HTTP-запросы.",
          },
          {
            icon: <KeyRound className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "API-ключи",
            text: "Управляйте доступом и лимитами прямо из личного кабинета.",
          },
          {
            icon: <FileText className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Документация",
            text: "Понятные примеры кода на популярных языках программирования.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
