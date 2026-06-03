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

export const metadata: Metadata = {
  title: "FlowStack - Stack Tecnológico de Automatización",
  description:
    "Transforma tus procesos administrativos con automatización inteligente. Flujos de aprobación multi-paso, dashboard en tiempo real y más. Stack Tecnológico de Automatización.",
  metadataBase: new URL("https://stacktecnologicodeautomatizacion.com"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
