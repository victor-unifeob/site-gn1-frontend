// src/app/[locale]/services/review-translation-standardization/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { ReviewTranslationStandardizationPageContent } from './ReviewTranslationStandardizationPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.reviewTranslationStandardization',
    locale,
    pathname: '/services/review-translation-standardization',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function ReviewTranslationStandardizationPage() {
  return <ReviewTranslationStandardizationPageContent />;
}