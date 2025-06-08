// src/app/[locale]/indexers/indexing-guides/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { IndexingGuidesPageContent } from './IndexingGuidesPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'indexers.ebooks',
    locale,
    pathname: '/indexers/ebooks-indexing-guides',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function IndexingGuidesPage() {
  return <IndexingGuidesPageContent />;
}