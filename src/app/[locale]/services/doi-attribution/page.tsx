// src/app/[locale]/services/doi-attribution/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { DoiAttributionPageContent } from './DoiAttributionPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.doiAttribution',
    locale,
    pathname: '/services/doi-attribution',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function DoiAttributionPage() {
  return <DoiAttributionPageContent />;
}