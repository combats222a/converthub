import { Activity, CreditCard, Heart, Zap } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Тарифы и подписка — ConvertContext";
const DESCRIPTION =
  "Мы готовим тарифные планы с увеличенным лимитом размера файла, пакетной конвертацией и приоритетной обработкой. Базовая конвертация останется бесплатной и без регистрации.";
const PATH = "/pricing";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function PricingPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Тарифы и подписка"
        description={DESCRIPTION}
        icon={<CreditCard className="size-7" strokeWidth={1.8} />}
        stubTitle="Тарифы и подписка"
        stubDescription="Мы готовим тарифные планы с расширенными возможностями"
        features={[
          {
            icon: <Heart className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Бесплатный тариф",
            text: "Базовая конвертация останется бесплатной и без регистрации — всегда.",
          },
          {
            icon: <Zap className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Pro-тариф",
            text: "Больший лимит размера файла и пакетная обработка.",
          },
          {
            icon: <Activity className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Приоритетная обработка",
            text: "Быстрая конвертация даже в часы пиковой нагрузки.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
