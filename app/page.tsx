import { About } from "@/components/landing/about";
import { BrandIntegrations } from "@/components/landing/brand-integrations";
import { Benefits } from "@/components/landing/benefits";
import { Cases } from "@/components/landing/cases";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { Product } from "@/components/landing/product";
import { landingContent } from "@/lib/landing-content";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: landingContent.brand.companyName,
    description: landingContent.brand.tagline,
    email: landingContent.brand.emailContact,
    address: {
      "@type": "PostalAddress",
      addressLocality: landingContent.brand.cityState,
      addressCountry: "BR",
    },
    sameAs: [landingContent.links.whatsappLink],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: landingContent.brand.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Sistema para redes de postos com foco em gestão de carga, estoque inteligente e controle operacional multiunidade.",
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "0",
      description: "Demonstração comercial mediante contato via WhatsApp.",
    },
    provider: {
      "@type": "Organization",
      name: landingContent.brand.companyName,
    },
  };

  return (
    <>
      <Header
        brandName={landingContent.brand.companyName}
        navItems={landingContent.navigation}
        ctaLabel={landingContent.hero.primaryCtaLabel}
        whatsappLink={landingContent.links.whatsappLink}
      />

      <main className="relative z-10 overflow-x-clip">
        <Hero
          hero={landingContent.hero}
          productName={landingContent.brand.productName}
          whatsappLink={landingContent.links.whatsappLink}
        />
        <BrandIntegrations integrations={landingContent.integrations} />
        <About about={landingContent.about} />
        <Product product={landingContent.product} />
        <Benefits benefits={landingContent.benefits} />
        <Process process={landingContent.process} />
        <Cases casesSection={landingContent.cases} />
        <Faq faq={landingContent.faq} />
        <FinalCta
          cta={landingContent.finalCta}
          whatsappLink={landingContent.links.whatsappLink}
        />
      </main>

      <Footer brand={landingContent.brand} footer={landingContent.footer} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, softwareSchema]),
        }}
      />
    </>
  );
}
