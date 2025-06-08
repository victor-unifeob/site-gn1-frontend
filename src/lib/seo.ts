// src/lib/seo.ts

import { getTranslations } from 'next-intl/server';

// Tipos específicos para Open Graph
type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: OpenGraphType;
  noindex?: boolean;
}

export async function getSEOData(
  page: string,
  locale: string,
  baseUrl: string = 'https://gn1world.com'
): Promise<SEOData> {
  const t = await getTranslations({ locale, namespace: 'Meta' });

  // Construir o caminho da tradução baseado na estrutura hierárquica
  const getTranslationPath = (page: string) => {
    if (page === 'home') {
      return 'home';
    }

    // Para páginas aninhadas como services.books
    if (page.includes('.')) {
      return page; // Ex: "services.books"
    }

    // Para páginas de primeiro nível
    return page; // Ex: "services", "systems", "indexers"
  };

  const translationPath = getTranslationPath(page);

  try {
    const seoData: SEOData = {
      title: t(`${translationPath}.title`),
      description: t(`${translationPath}.description`),
      keywords: t(`${translationPath}.keywords` as any, { defaultValue: '' }),
      canonical: `${baseUrl}/${locale}${page === 'home' ? '' : `/${page.replace('.', '/')}`}`,
      ogImage: `${baseUrl}/og-image-${locale}.jpg`,
      ogType: 'website'
    };

    return seoData;
  } catch (error) {
    // Fallback caso a tradução não exista
    console.warn(`SEO translation not found for: ${translationPath}`);
    return {
      title: 'GN1',
      description: 'Somos reconhecidos internacionalmente por oferecer soluções inovadoras para a evolução do conhecimento e progresso da produção editorial científica.',
      canonical: `${baseUrl}/${locale}${page === 'home' ? '' : `/${page.replace('.', '/')}`}`,
      ogImage: `${baseUrl}/og-image-${locale}.jpg`,
      ogType: 'website'
    };
  }
}

export function generateAlternateLanguages(
  pathname: string,
  baseUrl: string = 'https://gn1world.com'
) {
  const locales = ['pt', 'en', 'es'];
  const alternates: Record<string, string> = {};

  locales.forEach(locale => {
    alternates[locale] = `${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`;
  });

  return alternates;
}

export function generateStructuredData(
  seoData: SEOData,
  locale: string,
  organizationData?: any
) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GN1",
    "url": seoData.canonical,
    "logo": "https://gn1world.com/logo.png",
    "description": seoData.description,
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "6136 Frisco Square Boulevard, Suite 400",
        "addressLocality": "Frisco",
        "addressRegion": "TX",
        "postalCode": "75034",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "R. Flórida, 1703, Cj. 62 Edifício Gávea",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "04561-001",
        "addressCountry": "BR"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English", "Spanish"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/genesis-network-gn1/",
      "https://x.com/GN1Oficial"
    ],
    "foundingDate": "1999",
    "numberOfEmployees": "50-100",
    "industry": "Publishing",
    ...organizationData
  };

  return structuredData;
}