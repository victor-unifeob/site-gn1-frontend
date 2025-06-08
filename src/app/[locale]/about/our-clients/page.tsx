// src/app/[locale]/about/our-clients/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { OurClientsPageContent } from './OurClientsPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.ourClients',
    locale,
    pathname: '/about/our-clients',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function OurClientsPage() {
  return <OurClientsPageContent />;
}