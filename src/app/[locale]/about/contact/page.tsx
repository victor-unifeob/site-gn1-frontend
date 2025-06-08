// src/app/[locale]/about/contact/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { ContactPageContent } from './ContactPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'about.contact',
    locale,
    pathname: '/about/contact',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function ContactPage() {
  return <ContactPageContent />;
}