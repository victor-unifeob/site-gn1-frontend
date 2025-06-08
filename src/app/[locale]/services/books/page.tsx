// src/app/[locale]/services/books/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { BooksPageContent } from './BooksPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'services.books',
    locale,
    pathname: '/services/books',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function BooksPage() {
  return <BooksPageContent />;
}