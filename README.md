# ConvertHub v2

Переписывание проекта на современную архитектуру.

## Стек

- Next.js 15.5.20 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (стиль new-york, тема neutral, Radix-based)

## Запуск

```bash
npm install
npm run dev
```

Продакшн-сборка:

```bash
npm run build
```

## Структура

```
app/            # роуты (App Router)
components/
  ui/           # примитивы shadcn/ui (Button и т.д.)
lib/
  utils.ts      # хелпер cn()
hooks/          # кастомные хуки
components.json # конфиг shadcn/ui
```

`components/`, `hooks/` пока пустые (кроме `components/ui`) — Sidebar, Header,
Footer, UploadCard и остальные общие компоненты добавляются на следующих шагах
миграции.

## Добавление новых shadcn/ui компонентов

`npx shadcn add <component>` может не работать в некоторых окружениях с
ограниченным доступом в сеть (нужен доступ к ui.shadcn.com). Если команда не
проходит — компонент можно добавить вручную, взяв исходник из репозитория
shadcn-ui на GitHub и адаптировав пути импортов (`@/lib/utils`,
`@/components/ui/...`) под `components.json` этого проекта.
