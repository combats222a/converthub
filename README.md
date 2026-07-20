# ConvertHub v2

Полностью переписанный ConvertHub — со статического многостраничного
HTML-сайта (см. `index.html` / `ru/*` в старой версии) на современную
Next.js-архитектуру. Миграция выполнена в 6 шагов; этот README описывает
итоговое состояние после последнего шага.

## Стек

- Next.js 15.5.20 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (стиль new-york, тема neutral, Radix-based)
- React 19.2.4

## Запуск

```bash
npm install
npm run dev
```

Продакшн-сборка и линт:

```bash
npm run build
npm run lint
```

## Структура

```
app/
  page.tsx              # главная — конвертер + популярные форматы
  heic/                  # HEIC → любой формат
  heic-to/               # любой формат → HEIC
  heic-jpg/              # узкий SEO-лендинг: HEIC → JPG/PNG
  ebook/                 # конвертер электронных книг
  apps/, favorites/, history/,
  pricing/, privacy/, settings/,
  support/, api/          # разделы в разработке (общий шаблон ComingSoon)
  layout.tsx             # корневой layout, подключает AppShell
  sitemap.ts, robots.ts  # генерируются из lib/site-config.ts (STATIC_ROUTES)
  opengraph-image.tsx, twitter-image.tsx

components/
  layout/                # AppShell, Header, Sidebar, Footer, nav-config
  converter/             # Converter — единый компонент конвертации файлов
  home/                  # Hero, UploadCard, FormatSelector, ConvertContext и т.д.
  coming-soon/           # ComingSoon — общий шаблон для ещё не готовых разделов
  seo/                   # JsonLd
  ui/                    # примитивы shadcn/ui (Button, Input, GlowCard)

lib/
  formats.ts             # справочник форматов по категориям
  site-config.ts          # домен, локаль, STATIC_ROUTES (источник для sitemap)
  seo.ts                  # buildMetadata/buildWebApplicationJsonLd/buildWebPageJsonLd
  utils.ts                # cn()

middleware.ts             # 301-редиректы со старых /ru/* адресов на новые пути
api/                       # серверлесс-функции (Vercel), не часть Next.js роутинга
components.json            # конфиг shadcn/ui
```

## Ключевые архитектурные решения

**Sidebar** работает как оверлей поверх контента (как в Linear/GitHub/Notion):
`position: fixed`, открытие/закрытие через `transform: translateX(...)`,
затемнённый backdrop с блюром. Основной контент никогда не двигается и не
меняет ширину — состояние sidebar на него не влияет.

**Converter** (`components/converter/converter.tsx`) — единый компонент
конвертации файлов, используется на всех страницах-конвертерах (главная,
`/heic`, `/heic-to`, `/heic-jpg`, `/ebook`). Инкапсулирует выбор форматов,
drag&drop/загрузку, тосты и переключение источник↔цель, так что логика не
дублируется между страницами.

**GlowCard** (`components/ui/glow-card.tsx`) — общая "мягкая" карточка
(тонкая рамка, лёгкое размытие фона, диффузное свечение), переиспользуется
и в `UploadCard`, и в `ComingSoon`.

**ComingSoon** (`components/coming-soon/coming-soon.tsx`) — общий шаблон для
8 ещё не реализованных разделов (`apps`, `favorites`, `history`, `pricing`,
`privacy`, `settings`, `support`, `api`). В оригинале это был один и тот же
HTML-шаблон, продублированный на 8 страниц; теперь это один компонент,
параметризованный текстом/иконками/фичами каждой страницы.

**Старые адреса.** До миграции все страницы (кроме главной) жили под
префиксом `/ru/...`. Новая архитектура от префикса отказалась, поэтому
`middleware.ts` делает постоянный (301) редирект со старых `/ru/*` адресов
на новые пути — это сохраняет накопленный SEO-вес и внешние ссылки.

**SEO.** У каждой страницы — `title`/`description`/canonical/Open Graph/
Twitter Card/JSON-LD, собранные через `lib/seo.ts` (`buildMetadata`,
`buildWebApplicationJsonLd` для реальных конвертеров, `buildWebPageJsonLd`
для информационных страниц). `app/sitemap.ts` и `app/robots.ts` берут
список маршрутов из `lib/site-config.ts` (`STATIC_ROUTES`) — при добавлении
новой страницы её достаточно добавить в этот список.

## Добавление новых shadcn/ui компонентов

`npx shadcn add <component>` может не работать в некоторых окружениях с
ограниченным доступом в сеть (нужен доступ к ui.shadcn.com). Если команда не
проходит — компонент можно добавить вручную, взяв исходник из репозитория
shadcn-ui на GitHub и адаптировав пути импортов (`@/lib/utils`,
`@/components/ui/...`) под `components.json` этого проекта.
