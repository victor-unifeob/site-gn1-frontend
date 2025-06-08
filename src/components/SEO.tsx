// src/components/SEO.tsx

import { Metadata } from 'next';
import { getSEOData, generateAlternateLanguages, generateStructuredData, SEOData } from '@/lib/seo';

interface SEOProps {
  page: string;
  locale: string;
  pathname?: string;
  customData?: Partial<SEOData>;
}

export async function generatePageMetadata({
  page,
  locale,
  pathname = '',
  customData
}: SEOProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gn1world.com';
  const seoData = await getSEOData(page, locale, baseUrl);

  // Merge com dados customizados se fornecidos
  const finalSEOData = { ...seoData, ...customData };

  const alternates = generateAlternateLanguages(pathname, baseUrl);

  return {
    title: finalSEOData.title,
    description: finalSEOData.description,
    keywords: finalSEOData.keywords,

    openGraph: {
      title: finalSEOData.title,
      description: finalSEOData.description,
      url: finalSEOData.canonical,
      siteName: 'GN1',
      images: [
        {
          url: finalSEOData.ogImage || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: finalSEOData.title,
        }
      ],
      locale: locale === 'pt' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
      type: finalSEOData.ogType || 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: finalSEOData.title,
      description: finalSEOData.description,
      images: [finalSEOData.ogImage || `${baseUrl}/og-image.jpg`],
    },

    alternates: {
      canonical: finalSEOData.canonical,
      languages: alternates,
    },

  };
}

// Componente para injetar dados estruturados
export function SEOStructuredData({
  page,
  locale,
  customStructuredData
}: {
  page: string;
  locale: string;
  customStructuredData?: any;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gn1world.com';

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(customStructuredData || {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": `${baseUrl}/${locale}/${page}`,
          "name": `GN1 - ${page}`,
          "isPartOf": {
            "@type": "WebSite",
            "url": baseUrl,
            "name": "GN1"
          }
        })
      }}
    />
  );
}