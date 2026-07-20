import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">ConvertHub v2</h1>
      <p className="max-w-md text-muted-foreground">
        Layout готов: фиксированный Header и оверлейный Sidebar (как в
        Linear/GitHub/Notion) — открытие/закрытие двигает только сам Sidebar,
        контент никогда не сдвигается. Реальные страницы и виджет конвертации
        появятся на следующих шагах.
      </p>
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </div>
  );
}
