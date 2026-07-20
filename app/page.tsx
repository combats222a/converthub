import { ConvertProvider } from "@/components/home/convert-context";
import { Hero } from "@/components/home/hero";
import { UploadCard } from "@/components/home/upload-card";
import { PopularFormats } from "@/components/home/popular-formats";
import { WhyConvertHub } from "@/components/home/why-convert-hub";
import { RecentConversions } from "@/components/home/recent-conversions";
import { Toast } from "@/components/home/toast";
import { Footer } from "@/components/layout/footer";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] text-muted-foreground uppercase">
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="my-11 border-t border-border/60" />;
}

export default function Home() {
  return (
    <ConvertProvider>
      <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
        <Hero />
        <UploadCard />

        <Divider />
        <SectionTitle>★ Популярные форматы</SectionTitle>
        <PopularFormats />

        <Divider />
        <SectionTitle>Почему ConvertHub</SectionTitle>
        <WhyConvertHub />

        <Divider />
        <RecentConversions />
      </div>

      <Footer />
      <Toast />
    </ConvertProvider>
  );
}
