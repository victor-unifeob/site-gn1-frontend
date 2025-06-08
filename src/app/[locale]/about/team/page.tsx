// src/app/[locale]/about/team/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { TeamPageContent } from './TeamPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.team',
    locale,
    pathname: '/about/team',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function TeamPage() {
  return <TeamPageContent />;
}