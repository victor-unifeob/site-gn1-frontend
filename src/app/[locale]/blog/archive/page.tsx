// src/app/[locale]/blog/archive/page.tsx

import PaginatedPosts from '@/app/features/blog/components/PaginatedPosts';
import { getAllCategories, getAllPosts } from '@/app/features/blog/lib/blog';
import { generatePageMetadata } from '@/components/SEO';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Contact from '@/components/Contact';
import BlogCategories from '@/app/features/blog/components/Categories';
import { SupportedLocale } from '@/app/features/blog/lib/blog-config';

export const dynamic = 'force-static';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: SupportedLocale }>
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Meta' });

  return generatePageMetadata({
    page: 'blog',
    locale,
    pathname: '/blog/archive',
    customData: {
      title: t('blog.archive.title'),
      description: t('blog.archive.description'),
      keywords: t('blog.archive.keywords'),
      ogType: 'website',
    }
  });
}

export default async function BlogArchivePage({
  params
}: {
  params: Promise<{ locale: SupportedLocale }>
}) {
  const { locale } = await params;
  const t = await getTranslations('Blog');

  try {
    const posts = getAllPosts(locale);
    const categories = getAllCategories(locale);

    return (
      <>
        <div className="container mx-auto px-4 space-y-8 pt-5">

          {/* Título da página */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('archive.title')}
            </h2>
          </div>

          {/* Lista de posts */}
          <div className="overflow-hidden">
            <PaginatedPosts posts={posts} locale={locale} />
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-4"></div>

          {/* Seção de categorias */}
          <BlogCategories
            categories={categories}
            title={t('categories.title')}
            locale={locale}
          />
        </div>

        {/* Seção de contato */}
        <div className="pt-24">
          <Contact />
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="text-center pt-28">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {t('archive.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t('messages.errorLoading')}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('breadcrumb.blog')}
        </Link>
      </div>
    );
  }
}