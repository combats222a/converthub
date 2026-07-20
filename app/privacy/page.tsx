import { EyeOff, FileText, Lock } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Конфиденциальность — ConvertContext";
const DESCRIPTION =
  "Мы заканчиваем оформление политики конфиденциальности. Уже сейчас все конвертации происходят локально в вашем браузере — файлы не загружаются на сервер ConvertContext.";
const PATH = "/privacy";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Конфиденциальность"
        description={DESCRIPTION}
        icon={<Lock className="size-7" strokeWidth={1.8} />}
        stubTitle="Конфиденциальность"
        stubDescription="Мы заканчиваем оформление подробной политики конфиденциальности"
        features={[
          {
            icon: <Lock className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Обработка в браузере",
            text: "Все конвертации уже сейчас происходят локально — файлы не покидают ваше устройство.",
          },
          {
            icon: <EyeOff className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Без слежки",
            text: "Мы не собираем и не анализируем содержимое ваших файлов.",
          },
          {
            icon: <FileText className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Полная политика",
            text: "Развёрнутый документ о конфиденциальности появится в ближайшее время.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
