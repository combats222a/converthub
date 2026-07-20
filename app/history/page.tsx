import { Download, History, ListOrdered, Search } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "История конвертаций — ConvertContext";
const DESCRIPTION =
  "Полная история ваших конвертаций с возможностью повторного скачивания появится здесь после того, как заработают аккаунты. Сейчас последние конвертации показаны на главной странице.";
const PATH = "/history";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function HistoryPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="История конвертаций"
        description={DESCRIPTION}
        icon={<History className="size-7" strokeWidth={1.8} />}
        stubTitle="История конвертаций"
        stubDescription="Полная история ваших конвертаций появится здесь после запуска аккаунтов"
        features={[
          {
            icon: <ListOrdered className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Полный журнал",
            text: "Все ваши конвертации — в одном хронологическом списке.",
          },
          {
            icon: <Download className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Повторное скачивание",
            text: "Скачивайте результат ещё раз в любой момент, без повторной конвертации.",
          },
          {
            icon: <Search className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Поиск и фильтры",
            text: "Находите нужный файл по имени, формату или дате.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
