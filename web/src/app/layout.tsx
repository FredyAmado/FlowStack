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
    "Transforma tus procesos administrativos con automatización inteligente. Flujos de aprobación multi-paso, dashboard en tiempo real, Power BI, RPA e IA para empresas en Latinoamérica.",
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
  ],
  metadataBase: new URL(siteUrl),
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
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
