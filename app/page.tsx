import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">ConvertHub v2</h1>
      <p className="text-muted-foreground max-w-md">
        Архитектура настроена: Next.js 15 (App Router) + TypeScript + Tailwind
        CSS v4 + shadcn/ui. Это временная заглушка — реальные страницы и
        компоненты появятся на следующих шагах.
      </p>
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </main>
  );
}
