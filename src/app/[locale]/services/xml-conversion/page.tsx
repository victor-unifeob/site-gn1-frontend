// src/app/[locale]/services/xml-conversion/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { XmlConversionPageContent } from './XmlConversionPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.xmlConversion',
    locale,
    pathname: '/services/xml-conversion',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function XmlConversionPage() {
  return <XmlConversionPageContent />;
}