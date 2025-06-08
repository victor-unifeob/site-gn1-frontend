// src/app/[locale]/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSEOData, generateAlternateLanguages, generateStructuredData } from '@/lib/seo';
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Função para gerar metadados dinâmicos
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gn1world.com';

  // Obter dados SEO para a página home
  const seoData = await getSEOData('home', locale, baseUrl);
  const alternates = generateAlternateLanguages('/', baseUrl);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: 'GN1' }],
    creator: 'GN1',
    publisher: 'GN1',

    // Open Graph
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.canonical,
      siteName: 'GN1',
      images: [
        {
          url: seoData.ogImage || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: seoData.title,
        }
      ],
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage || `${baseUrl}/og-image.jpg`],
      creator: '@gn1world',
    },

    // Canonical e alternates
    alternates: {
      canonical: seoData.canonical,
      languages: alternates,
    },

  };
}

// Necessário para renderização estática
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Gerar dados estruturados
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gn1world.com';
  const seoData = await getSEOData('home', locale, baseUrl);
  const structuredData = generateStructuredData(seoData, locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Dados estruturados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="pt" href={`${baseUrl}/pt`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="es" href={`${baseUrl}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/pt`} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}