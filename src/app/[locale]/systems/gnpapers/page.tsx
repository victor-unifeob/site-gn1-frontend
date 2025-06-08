// src/app/[locale]/systems/gnpapers/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { GnPapersPageContent } from './GnPapersPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'systems.gnpapers',
    locale,
    pathname: '/systems/gnpapers',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function GnPapersPage() {
  return <GnPapersPageContent />;
}