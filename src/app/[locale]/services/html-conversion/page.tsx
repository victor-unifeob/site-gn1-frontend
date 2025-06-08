// src/app/[locale]/services/html-conversion/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { HtmlConversionPageContent } from './HtmlConversionPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.htmlConversion',
    locale,
    pathname: '/services/html-conversion',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function HtmlConversionPage() {
  return <HtmlConversionPageContent />;
}