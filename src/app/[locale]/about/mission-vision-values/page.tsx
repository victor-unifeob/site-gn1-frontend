// src/app/[locale]/about/mission-vision-values/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { MissionVisionValuesPageContent } from './MissionVisionValuesPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.missionVisionValues',
    locale,
    pathname: '/about/mission-vision-values',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function MissionVisionValuesPage() {
  return <MissionVisionValuesPageContent />;
}