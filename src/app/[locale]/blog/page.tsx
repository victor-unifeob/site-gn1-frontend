// src/app/[locale]/blog/page.tsx

import { getAllCategories, getAllPosts, getFeaturedPosts } from '@/app/features/blog/lib/blog';
import { generatePageMetadata } from '@/components/SEO';
import type { Metadata } from 'next';
import { SupportedLocale } from '@/app/features/blog/lib/blog-config';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/app/features/blog/lib/blog-utils';
import { BlogPageContent } from './blogPageContent';

export const dynamic = 'force-static';

interface BlogHomePageProps {
  params: Promise<{ locale: string }>;
}

// Metadados SEO integrados ao sistema existente
export async function generateMetadata({
  params
}: BlogHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: 'Blog não encontrado',
      description: 'A página solicitada não foi encontrada.'
    };
  }

  return generatePageMetadata({
    page: 'blog',
    locale,
    pathname: '/blog',
    customData: {
      ogType: 'website',
    }
  });
}

export default async function BlogHomePage({
  params
}: BlogHomePageProps) {
  const { locale } = await params;

  // Validação do locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SupportedLocale;

  try {
    // Busca posts e categorias para o locale específico
    const posts = getAllPosts(typedLocale);
    const categories = getAllCategories(typedLocale);
    const featuredPosts = getFeaturedPosts(typedLocale, 1);

    return (
      <BlogPageContent
        posts={posts}
        categories={categories}
        featuredPosts={featuredPosts}
        locale={typedLocale}
      />
    );
  } catch (error) {
    return (
      <BlogPageContent
        posts={[]}
        categories={[]}
        featuredPosts={[]}
        locale={typedLocale}
      />
    );
  }
}