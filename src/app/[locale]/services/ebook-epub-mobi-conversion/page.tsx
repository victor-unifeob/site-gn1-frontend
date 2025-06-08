// src/app/[locale]/services/ebook-epub-mobi-conversion/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { EbookEpubMobiConversionPageContent } from './EbookEpubMobiConversionPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.ebookConversion',
    locale,
    pathname: '/services/ebook-epub-mobi-conversion',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function EbookEpubMobiConversionPage() {
  return <EbookEpubMobiConversionPageContent />;
}