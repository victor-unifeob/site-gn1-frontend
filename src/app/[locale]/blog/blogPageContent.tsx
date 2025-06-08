// src/app/[locale]/blog/BlogPageContent.tsx

'use client';

import BlogCategories from '@/app/features/blog/components/Categories';
import BlogCarousel from '@/app/features/blog/components/BlogCarousel';
import { SupportedLocale } from '@/app/features/blog/lib/blog-config';
import { formatDate } from '@/app/features/blog/lib/blog-utils';
import { getCategoryDisplayName } from '@/app/features/blog/lib/category-display-names';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Contact from '@/components/Contact';

// Tipo para os posts
type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  locale: SupportedLocale;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
};

interface BlogPageContentProps {
  posts: PostMeta[];
  categories: string[];
  featuredPosts: PostMeta[];
  locale: SupportedLocale;
}

export function BlogPageContent({
  posts,
  categories,
  featuredPosts,
  locale
}: BlogPageContentProps) {
  const t = useTranslations('Blog');

  // Post em destaque (primeiro featured post ou primeiro post geral)
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : (posts.length > 0 ? posts[0] : null);

  // Função para verificar se a data é válida
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <>
      <div className="container mx-auto px-4 space-y-16">
        {/* Seção de post em destaque */}
        {featuredPost && isValidDate(featuredPost.date) && (
          <section>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow transition-shadow duration-300">
                {featuredPost.coverImage && (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                )}

                {/* Overlay para melhorar a leitura do texto */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

                {/* Badge de categoria no canto superior */}
                {featuredPost.category && (
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full">
                      {getCategoryDisplayName(featuredPost.category, locale)}
                    </span>
                  </div>
                )}

                {/* Badge de post em destaque */}
                {featuredPost.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-400 rounded-full">
                      ⭐ {t('featured.title')}
                    </span>
                  </div>
                )}

                {/* Informações do post em destaque */}
                <div className="flex flex-col gap-y-2 absolute bottom-10 px-10 text-white">
                  <div className="flex items-center gap-x-2 text-sm uppercase font-medium">
                    <span>{featuredPost.author}</span>
                    {featuredPost.date && (
                      <>
                        <span>•</span>
                        <span>{formatDate(featuredPost.date, locale)}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-2 text-gray-200 line-clamp-2">
                    {featuredPost.description}
                  </p>

                  {/* Tags se existirem */}
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Seção de posts recentes */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {t('recent.title')}
          </h2>

          <BlogCarousel
            posts={posts}
            locale={locale}
            maxPosts={3}
            showViewAllButton={true}
            showHeader={false}
            className="-my-14 py-0"
          />
        </section>

        {/* Linha divisória */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

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
}