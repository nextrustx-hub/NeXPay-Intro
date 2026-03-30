import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  // Título
  title: {
    default: "NeXPay - Ecossistema Financeiro Internacional",
    template: "%s | NeXPay",
  },
  
  // Descrição
  description: "NeXPay é um ecossistema financeiro internacional para gestão de fluxos multimoedas. Carteira digital com Crypto, BRL e EUR. Conta BLACK anónima sem KYC.",
  
  // Keywords
  keywords: [
    "NeXPay",
    "NexTrustX",
    "criptomoeda",
    "carteira digital",
    "pagamentos internacionais",
    "DeFi",
    "finance",
    "privacidade",
    "blockchain",
    "crypto",
    "carteira crypto",
    "multimoedas",
    "BRL",
    "EUR",
    "conta anónima",
    "sem KYC",
    "IGaming",
    "casino online",
    "fluxos internacionais",
  ],
  
  // Autores e criador
  authors: [{ name: "NeXPay Team", url: "https://nexpay.nextrustx.com" }],
  creator: "NeXPay",
  publisher: "NeXPay",
  owner: "NeXPay",
  
  // URL base
  metadataBase: new URL("https://nexpay.nextrustx.com"),
  
  // Robots e indexação
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    url: "https://nexpay.nextrustx.com",
    siteName: "NeXPay",
    title: "NeXPay - Ecossistema Financeiro Internacional",
    description: "Carteira digital internacional para gestão de Crypto, BRL e EUR. Conta BLACK anónima sem KYC para fluxos internacionais.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "NeXPay Logo",
        type: "image/png",
      },
    ],
  },
  
  // Twitter / X
  twitter: {
    card: "summary_large_image",
    site: "@nexpay",
    creator: "@nexpay",
    title: "NeXPay - Ecossistema Financeiro Internacional",
    description: "Carteira digital internacional para gestão de Crypto, BRL e EUR. Conta BLACK anónima sem KYC.",
    images: ["/logo.png"],
  },
  
  // Favicons
  icons: {
    icon: [
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
  
  // Manifest para PWA
  manifest: "/manifest.json",
  
  // App info
  applicationName: "NeXPay",
  appleWebApp: {
    capable: true,
    title: "NeXPay",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/logo.png",
        sizes: "512x512",
      },
    ],
  },
  
  // Formato e categoria
  formatDetection: {
    telephone: false,
    date: true,
    address: false,
    email: false,
  },
  category: "finance",
  classification: "Financial Technology",
  
  // Alternates
  alternates: {
    canonical: "https://nexpay.nextrustx.com",
  },
  
  // Outros
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Mobile App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NeXPay" />
        
        {/* iOS Splash Screens */}
        <link rel="apple-touch-startup-image" href="/logo.png" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#00d2ff" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
