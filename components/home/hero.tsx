export interface HeroProps {
  heading?: string;
  description?: string;
}

export function Hero({
  heading = "Конвертер файлов",
  description = "Сконвертируйте ваши файлы в любой формат прямо в браузере — без загрузки на сервер.",
}: HeroProps) {
  return (
    <>
      <h1 className="mb-2.5 text-[clamp(1.7rem,3.2vw,2.15rem)] font-bold tracking-[-0.01em]">
        {heading}
      </h1>
      <p className="mb-8.5 max-w-[560px] text-[14.5px] leading-[1.55] text-muted-foreground">
        {description}
      </p>
    </>
  );
}
