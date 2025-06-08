// src/app/[locale]/products-services/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { ProductsServicesPageContent } from './ProductsServicesPageContent';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'productsServices',
    locale,
    pathname: '/products-services',
    customData: {
      ogType: 'website',
    }
  });
}

// Server Component - Renderização da página
export default function ProductsServicesPage() {
  return <ProductsServicesPageContent />;
}