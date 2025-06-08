// src/app/[locale]/blog/category/[category]/page.tsx

import BlogCategories from '@/app/features/blog/components/Categories';
import PaginatedPosts from '@/app/features/blog/components/PaginatedPosts';
import { getAllCategories, getAllPosts } from '@/app/features/blog/lib/blog';
import { generatePageMetadata } from '@/components/SEO';
import type { Metadata } from 'next';
import { BLOG_CONFIG, SupportedLocale } from '@/app/features/blog/lib/blog-config';
import {
  getCategoryDisplayName,
  normalizeCategorySlug,
  mapPostCategoriesToSlugs
} from '@/app/features/blog/lib/category-display-names';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Contact from '@/components/Contact';
import { notFound } from 'next/navigation';

// Função: Busca posts por categoria normalizada
function getPostsByNormalizedCategory(categorySlug: string, locale: SupportedLocale) {
  const allPosts = getAllPosts(locale);

  return allPosts.filter(post => {
    if (!post.category) return false;

    // Normaliza a categoria do post e compara com o slug da URL
    const normalizedPostCategory = normalizeCategorySlug(post.category);
    return normalizedPostCategory === categorySlug;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; locale: SupportedLocale }>;
}): Promise<Metadata> {
  try {
    const { category, locale } = await params;
    const categoryDisplayName = getCategoryDisplayName(category, locale);

    const t = await getTranslations({ locale, namespace: 'Meta' });

    return generatePageMetadata({
      page: 'blog',
      locale,
      pathname: `/blog/category/${category}`,
      customData: {
        title: t('blog.category.title', { category: categoryDisplayName }),
        description: t('blog.category.description', { category: categoryDisplayName }),
        keywords: t('blog.category.keywords', { category: categoryDisplayName }),
        ogType: 'website',
      }
    });
  } catch (error) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Meta' });

    return generatePageMetadata({
      page: 'blog',
      locale,
      pathname: '/blog',
      customData: {
        title: t('blog.title'),
        description: t('blog.description'),
        ogType: 'website',
      }
    });
  }
}

// Generate static params: Apenas categorias normalizadas
export function generateStaticParams() {
  try {
    const params = [];
    const uniqueNormalizedSlugs = new Set<string>();

    // Busca todos os posts
    const allPosts = getAllPosts();

    // Estratégia: Normaliza todas as categorias para hífens
    allPosts.forEach((post, index) => {
      if (post.category && post.category.trim() !== '') {
        const originalCategory = post.category.trim();
        const normalizedSlug = normalizeCategorySlug(originalCategory);

        uniqueNormalizedSlugs.add(normalizedSlug);
      }
    });

    // Adiciona categorias conhecidas normalizadas
    const knownCategories = [
      'books', 'indexers', 'systems', 'review-and-standardization',
      'technology', 'business', 'design', 'editorial'
    ];

    knownCategories.forEach(slug => uniqueNormalizedSlugs.add(slug));

    // Gera parâmetros apenas com slugs normalizados
    for (const locale of BLOG_CONFIG.SUPPORTED_LOCALES) {
      uniqueNormalizedSlugs.forEach(categorySlug => {
        params.push({
          locale,
          category: categorySlug
        });
      });

      // Adiciona fallback
      params.push({
        locale,
        category: BLOG_CONFIG.FALLBACK_CATEGORY
      });
    }

    return params;

  } catch (error) {
    // Fallback minimalista
    const essentialCategories = [
      'books', 'indexers', 'systems', 'review-and-standardization'
    ];

    const fallbackParams = [];
    for (const locale of BLOG_CONFIG.SUPPORTED_LOCALES) {
      for (const category of essentialCategories) {
        fallbackParams.push({ locale, category });
      }
      fallbackParams.push({ locale, category: BLOG_CONFIG.FALLBACK_CATEGORY });
    }

    return fallbackParams;
  }
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; locale: SupportedLocale }>
}) {
  try {
    const { category, locale } = await params;

    // O parâmetro category já deve estar normalizado (com hífens)
    const categorySlug = category;

    const t = await getTranslations({ locale, namespace: 'BlogCategory' });
    const tBlog = await getTranslations({ locale, namespace: 'Blog' });

    // Busca posts usando a categoria normalizada
    const posts = getPostsByNormalizedCategory(categorySlug, locale);
    const categories = getAllCategories(locale);

    // Nome para exibição (traduzido)
    const categoryDisplayName = getCategoryDisplayName(categorySlug, locale);

    return (
      <>
        <div className="container mx-auto px-4 space-y-8 pt-5">
          {/* Título da página */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('title', { category: categoryDisplayName })}
            </h2>
          </div>

          {/* Lista de posts */}
          <div className="overflow-hidden">
            {posts && posts.length > 0 ? (
              <PaginatedPosts posts={posts} locale={locale} />
            ) : (
              <div className="text-center py-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('noPosts.title')}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t('noPosts.description')}
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {tBlog('buttons.viewAll')}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-4"></div>

          {/* Seção de categorias */}
          <BlogCategories
            categories={categories}
            locale={locale}
            title={tBlog('categories.title')}
          />
        </div>

        {/* Seção de contato */}
        <div className="pt-24">
          <Contact />
        </div>
      </>
    );

  } catch (error) {
    notFound();
  }
}