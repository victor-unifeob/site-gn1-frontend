// src/app/[locale]/systems/gnpublish/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { GnPublishPageContent } from './GnPublishPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'systems.gnpublish',
    locale,
    pathname: '/systems/gnpublish',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function GnPublishPage() {
  return <GnPublishPageContent />;
}