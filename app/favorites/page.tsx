import { Pin, RefreshCw, Star, Zap } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Избранное — ConvertHub";
const DESCRIPTION =
  "Скоро вы сможете закреплять часто используемые форматы и конвертеры здесь, чтобы быстро находить их снова.";
const PATH = "/favorites";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function FavoritesPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Избранное"
        description={DESCRIPTION}
        icon={<Star className="size-7" strokeWidth={1.8} />}
        stubTitle="Избранное"
        stubDescription="Скоро вы сможете закреплять часто используемые форматы и конвертеры"
        features={[
          {
            icon: <Pin className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Закреплённые форматы",
            text: "Сохраняйте часто используемые пары форматов для конвертации.",
          },
          {
            icon: <Zap className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Быстрый доступ",
            text: "Избранное всегда будет под рукой в боковом меню.",
          },
          {
            icon: <RefreshCw className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Синхронизация",
            text: "Список избранного сохранится в вашем аккаунте на всех устройствах.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
