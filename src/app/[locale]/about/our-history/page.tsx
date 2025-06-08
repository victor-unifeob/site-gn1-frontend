// src/app/[locale]/about/our-history/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { OurHistoryPageContent } from './OurHistoryPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.ourHistory',
    locale,
    pathname: '/about/our-history',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function OurHistoryPage() {
  return <OurHistoryPageContent />;
}