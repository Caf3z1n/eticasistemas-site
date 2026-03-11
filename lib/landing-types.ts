export type SectionId =
  | "inicio"
  | "integracoes"
  | "sobre"
  | "produto"
  | "beneficios"
  | "processo"
  | "cases"
  | "faq"
  | "contato";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface MetricItem {
  label: string;
  value: string;
  estimated: boolean;
  note?: string;
}

export interface HeroCarouselImageSlide {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon:
    | "Gauge"
    | "ShieldCheck"
    | "WalletCards"
    | "BarChart3"
    | "Workflow"
    | "Headset"
    | "CloudCog"
    | "LineChart";
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  network: string;
  role: string;
  quote: string;
  impact: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BrandInfo {
  companyName: string;
  productName: string;
  tagline: string;
  cityState: string;
  supportHours: string;
  emailContact: string;
}

export interface ContactLinks {
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  whatsappLink: string;
}

export interface HeroSection {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  carouselSlides: HeroCarouselImageSlide[];
}

export interface AboutPillar {
  title: string;
  description: string;
}

export interface AboutSection {
  eyebrow: string;
  title: string;
  description: string;
  narrative: string[];
  stats: MetricItem[];
  pillars: AboutPillar[];
  commitments: string[];
}

export type ProductModuleIcon = "Truck" | "Boxes" | "Fuel" | "LineChart";

export interface ProductModule {
  id: string;
  title: string;
  description: string;
  icon: ProductModuleIcon;
  imageSrc: string;
  imageAlt: string;
  kpis: string[];
}

export interface ProductSection {
  eyebrow: string;
  title: string;
  description: string;
  modules: ProductModule[];
}

export interface BenefitsSection {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

export interface BrandLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
}

export interface IntegrationsSection {
  eyebrow: string;
  title: string;
  description: string;
  logos: BrandLogo[];
  programBadges: string[];
}

export interface ProcessSection {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface CasesSection {
  eyebrow: string;
  title: string;
  description: string;
  items: TestimonialItem[];
}

export interface FaqSection {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface FinalCtaSection {
  title: string;
  description: string;
  buttonLabel: string;
}

export interface FooterSection {
  legalNote: string;
}

export interface LandingContent {
  brand: BrandInfo;
  links: ContactLinks;
  navigation: NavItem[];
  hero: HeroSection;
  integrations: IntegrationsSection;
  about: AboutSection;
  product: ProductSection;
  benefits: BenefitsSection;
  process: ProcessSection;
  cases: CasesSection;
  faq: FaqSection;
  finalCta: FinalCtaSection;
  footer: FooterSection;
}

