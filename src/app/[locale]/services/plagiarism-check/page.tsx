// src/app/[locale]/services/plagiarism-check/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { PlagiarismCheckPageContent } from './PlagiarismCheckPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.plagiarismCheck',
    locale,
    pathname: '/services/plagiarism-check',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function PlagiarismCheckPage() {
  return <PlagiarismCheckPageContent />;
}