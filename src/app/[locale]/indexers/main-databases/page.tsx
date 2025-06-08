// src/app/[locale]/indexers/main-databases/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { MainDatabasesPageContent } from './MainDatabasesPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'indexers.mainDatabases',
    locale,
    pathname: '/indexers/main-databases',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function MainDatabasesPage() {
  return <MainDatabasesPageContent />;
}