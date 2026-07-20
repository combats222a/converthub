import { Filter, LayoutGrid, Search, TrendingUp } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Все инструменты — ConvertHub";
const DESCRIPTION =
  "Здесь появится каталог всех конвертеров ConvertHub — с поиском и фильтрами по типу файла. Пока доступны конвертер HEIC и книг — ссылки на них есть в разделе «Конвертация» слева.";
const PATH = "/apps";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AppsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Все инструменты"
        description={DESCRIPTION}
        icon={<LayoutGrid className="size-7" strokeWidth={1.8} />}
        stubTitle="Каталог инструментов"
        stubDescription="Здесь появится полный каталог всех конвертеров ConvertHub"
        features={[
          {
            icon: <Search className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Поиск по каталогу",
            text: "Быстро находите нужный конвертер по названию формата.",
          },
          {
            icon: <Filter className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Фильтры по типу",
            text: "Изображения, документы, книги и другие форматы — всё в одном месте.",
          },
          {
            icon: <TrendingUp className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Популярные инструменты",
            text: "Самые востребованные конвертеры — сразу на первом экране.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
