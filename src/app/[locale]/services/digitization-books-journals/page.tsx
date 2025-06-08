// src/app/[locale]/services/digitization-books-journals/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { DigitizationBooksJournalsPageContent } from './DigitizationBooksJournalsPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.digitization',
    locale,
    pathname: '/services/digitization-books-journals',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function DigitizationBooksJournalsPage() {
  return <DigitizationBooksJournalsPageContent />;
}