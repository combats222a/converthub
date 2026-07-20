import { Bell, Globe, Settings, User } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon/coming-soon";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, buildWebPageJsonLd } from "@/lib/seo";

const TITLE = "Настройки — ConvertHub";
const DESCRIPTION = "Раздел настроек аккаунта, языка интерфейса и уведомлений появится после запуска регистрации.";
const PATH = "/settings";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
const jsonLd = buildWebPageJsonLd({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function SettingsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ComingSoon
        heading="Настройки"
        description={DESCRIPTION}
        icon={<Settings className="size-7" strokeWidth={1.8} />}
        stubTitle="Настройки"
        stubDescription="Раздел настроек аккаунта появится после запуска регистрации"
        features={[
          {
            icon: <Globe className="size-4.5" />,
            bg: "rgba(31,86,220,0.14)",
            color: "var(--primary)",
            title: "Язык интерфейса",
            text: "Выбор языка отображения для всего сервиса.",
          },
          {
            icon: <Bell className="size-4.5" />,
            bg: "rgba(62,207,142,0.14)",
            color: "#3ecf8e",
            title: "Уведомления",
            text: "Гибкая настройка оповещений о готовности файлов.",
          },
          {
            icon: <User className="size-4.5" />,
            bg: "rgba(168,107,255,0.14)",
            color: "#c39bff",
            title: "Аккаунт",
            text: "Управление профилем, паролем и подпиской.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
