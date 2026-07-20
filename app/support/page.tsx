import { Activity, BookOpen, LifeBuoy, MessageSquare } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Поддержка — ConvertContext";
const DESCRIPTION =
  "Форма обращения в поддержку и база знаний появятся здесь совсем скоро. А пока, если конвертер работает не так, как ожидалось, — просто попробуйте другой формат или обновите страницу.";
const PATH = "/support";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function SupportPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Поддержка"
        description={DESCRIPTION}
        icon={<LifeBuoy className="size-7" strokeWidth={1.8} />}
        stubTitle="Поддержка"
        stubDescription="Форма обращения и база знаний появятся здесь совсем скоро"
        features={[
          {
            icon: <MessageSquare className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Форма обращения",
            text: "Быстрая связь с командой поддержки в пару кликов.",
          },
          {
            icon: <BookOpen className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "База знаний",
            text: "Ответы на частые вопросы о конвертации файлов.",
          },
          {
            icon: <Activity className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Статус сервиса",
            text: "Актуальная информация о работоспособности ConvertContext.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
