// src/app/[locale]/page.tsx

import { generatePageMetadata } from '@/components/SEO';
import { HomePageContent } from './HomePageContent';
import { getAllPosts } from '@/app/features/blog/lib/blog';
import { SupportedLocale } from '@/app/features/blog/lib/blog-config';
import { isValidLocale } from '@/app/features/blog/lib/blog-utils';
import { notFound } from 'next/navigation';

// Server Component - Metadados SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  return generatePageMetadata({
    page: 'home',
    locale,
    pathname: '/',
    customData: {
      ogType: 'website',
    }
  });
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Server Component - Renderização da página
export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  // Validação do locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SupportedLocale;

  try {
    // Busca posts para o locale específico
    const localePosts = getAllPosts(typedLocale);

    // Se não há posts neste idioma, tenta buscar de outros idiomas como fallback
    const blogPosts = localePosts.length > 0
      ? localePosts.slice(0, 3)
      : getAllPosts().slice(0, 3); // Fallback para qualquer idioma

    return (
      <HomePageContent
        blogPosts={blogPosts}
        locale={typedLocale}
      />
    );
  } catch (error) {
    // Em caso de erro, renderiza com array vazio
    return (
      <HomePageContent
        blogPosts={[]}
        locale={typedLocale}
      />
    );
  }
}