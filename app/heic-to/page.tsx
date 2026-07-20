import { Converter } from "@/components/converter/converter";
import { Footer } from "@/components/layout/footer";

export default function HeicToPage() {
  return (
    <>
      <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
        <Converter
          heading="Любой формат → HEIC"
          description="Сконвертируйте изображение любого формата в HEIC прямо в браузере."
          category="image"
          initialTargetCode="HEIC"
          targetFormatOptions={["HEIC"]}
          reversed
          mode="process"
        />
      </div>
      <Footer />
    </>
  );
}
