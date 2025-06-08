// src/app/[locale]/about/privacy/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { PrivacyPageContent } from './PrivacyPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.privacyPolicy',
    locale,
    pathname: '/about/privacy-policy',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function PrivacyPage() {
  return <PrivacyPageContent />;
}