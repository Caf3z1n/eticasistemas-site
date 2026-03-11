import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eticasistemas.com.br"),
  title: {
    default: "Ética Sistemas | Soluções para Redes de Postos",
    template: "%s | Ética Sistemas",
  },
  description:
    "A Ética Sistemas desenvolve soluções para redes de postos. Conheça o Posto Ágil e ganhe controle de carga, estoque e operação multiunidade.",
  keywords: [
    "Ética Sistemas",
    "Posto Ágil",
    "sistema para rede de postos",
    "gestão de carga e estoque",
    "software para postos de combustível",
  ],
  openGraph: {
    title: "Ética Sistemas | Soluções para Redes de Postos",
    description:
      "Tecnologia especializada para redes de postos com foco em carga, estoque e inteligência operacional.",
    locale: "pt_BR",
    type: "website",
    siteName: "Ética Sistemas",
    images: [
      {
        url: "/og/etica-og.png",
        width: 1200,
        height: 630,
        alt: "Ética Sistemas - Posto Ágil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ética Sistemas | Soluções para Redes de Postos",
    description:
      "Conheça o Posto Ágil e eleve o controle da sua rede de postos.",
    images: ["/og/etica-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
