import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/components/performance/web-vitals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "TechCorp - Soluções Tecnológicas Inovadoras",
    template: "%s | TechCorp"
  },
  description: "Empresa líder em desenvolvimento de software, consultoria tecnológica e transformação digital. Criamos soluções sob medida para impulsionar seu negócio com React, Next.js e tecnologias modernas.",
  keywords: [
    "desenvolvimento de software",
    "consultoria tecnológica", 
    "transformação digital",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "desenvolvimento web",
    "aplicativos móveis",
    "e-commerce",
    "São Paulo",
    "Brasil"
  ],
  authors: [{ name: "TechCorp Team", url: "https://techcorp.com" }],
  creator: "TechCorp",
  publisher: "TechCorp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techcorp.com"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://techcorp.com",
    title: "TechCorp - Soluções Tecnológicas Inovadoras",
    description: "Transformamos ideias em soluções tecnológicas inovadoras. Empresa líder em desenvolvimento de software e consultoria tecnológica.",
    siteName: "TechCorp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechCorp - Soluções Tecnológicas Inovadoras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechCorp - Soluções Tecnológicas Inovadoras",
    description: "Transformamos ideias em soluções tecnológicas inovadoras.",
    images: ["/og-image.jpg"],
    creator: "@techcorp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <WebVitals />
        </ThemeProvider>
      </body>
    </html>
  );
}
