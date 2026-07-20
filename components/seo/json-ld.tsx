/**
 * Рендерит переданный объект как <script type="application/ld+json">.
 * JSON.stringify + замена "<" исключает XSS через закрытие тега скриптом.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
