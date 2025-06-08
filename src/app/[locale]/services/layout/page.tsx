// src/app/[locale]/services/layout/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { LayoutPageContent } from './LayoutPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.layout',
    locale,
    pathname: '/services/layout',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function LayoutPage() {
  return <LayoutPageContent />;
}