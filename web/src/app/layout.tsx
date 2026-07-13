import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stacktecnologicodeautomatizacion.com";

export const metadata: Metadata = {
  title: {
    default: "FlowStack - Stack Tecnológico de Automatización",
    template: "%s | FlowStack",
  },
  description:
    "Transforma tus procesos administrativos e industriales con automatización inteligente. Flujos de aprobación multi-paso, dashboard en tiempo real, CRM con WhatsApp, RPA e IA para empresas en Latinoamérica.",
  keywords: [
    "automatización de procesos",
    "Power Automate",
    "RPA",
    "aprobaciones multi-paso",
    "dashboard inteligente",
    "Power BI",
    "transformación digital",
    "flowstack",
    "Stack Tecnológico de Automatización",
    "Bogotá",
    "Colombia",
    "LATAM",
    "automatización de procesos Bogotá",
    "RPA Colombia",
    "aprobaciones automáticas Colombia",
    "transformación digital Colombia",
    "Power Automate Colombia",
    "FlowStack Bogotá",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
    languages: {
      "es-CO": siteUrl,
    },
  },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "FlowStack - Stack Tecnológico de Automatización",
    description:
      "Automatización inteligente para empresas. Aprobaciones en horas, visibilidad en tiempo real, control total sin esfuerzo.",
    url: siteUrl,
    siteName: "FlowStack",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowStack - Stack Tecnológico de Automatización",
    description:
      "Automatización inteligente para empresas. Aprobaciones en horas, visibilidad en tiempo real.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* JSON-LD Organization + LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "FlowStack",
                  url: siteUrl,
                  logo: `${siteUrl}/images/flowstack-logo.svg`,
                  description:
                    "Stack Tecnológico de Automatización. Soluciones de automatización inteligente para empresas en Latinoamérica.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bogotá",
                    addressCountry: "CO",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+57-311-466-3373",
                    contactType: "sales",
                    availableLanguage: ["Spanish"],
                  },
                  sameAs: [
                    "https://stacktecnologicodeautomatizacion.com",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  name: "FlowStack",
                  url: siteUrl,
                  image: `${siteUrl}/og-image.png`,
                  description:
                    "Stack Tecnológico de Automatización. Soluciones de automatización inteligente para empresas en Bogotá y toda Colombia.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bogotá",
                    addressRegion: "Bogotá D.C.",
                    addressCountry: "CO",
                  },
                  telephone: "+57-311-466-3373",
                  email: "contacto@stacktecnologicodeautomatizacion.com",
                  priceRange: "$0 - $29/mes",
                  areaServed: ["Bogotá", "Colombia", "Latinoamérica"],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Planes FlowStack",
                    itemListElement: [
                      { "@type": "Offer", name: "Starter", price: "0", priceCurrency: "USD" },
                      { "@type": "Offer", name: "Team", price: "15", priceCurrency: "USD" },
                      { "@type": "Offer", name: "Professional", price: "29", priceCurrency: "USD" },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
