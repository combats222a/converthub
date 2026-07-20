import { Converter } from "@/components/converter/converter";
import { PopularFormats } from "@/components/home/popular-formats";
import { WhyConvertContext } from "@/components/home/why-convert-hub";
import { RecentConversions } from "@/components/home/recent-conversions";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (веб-браузер)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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
    <>
      <JsonLd data={webApplicationJsonLd} />
      <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
        <Converter>
          <Divider />
          <SectionTitle>★ Популярные форматы</SectionTitle>
          <PopularFormats />

          <Divider />
          <SectionTitle>Почему ConvertContext</SectionTitle>
          <WhyConvertContext />

          <Divider />
          <RecentConversions />
        </Converter>
      </div>

      <Footer />
    </>
  );
}
