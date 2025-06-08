// src/app/features/blog/components/BlogCarousel.tsx

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SupportedLocale } from '../lib/blog-config';
import { formatDate as utilFormatDate } from '../lib/blog-utils';
import { getCategoryDisplayName } from '../lib/category-display-names';

// Tipo PostMeta
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

interface BlogCarouselProps {
  posts: PostMeta[];
  locale: SupportedLocale;
  maxPosts?: number;
  showViewAllButton?: boolean;
  showHeader?: boolean;
  customTitle?: string;
  className?: string;
}

export default function BlogCarousel({
  posts = [],
  locale,
  maxPosts = 3,
  showViewAllButton = true,
  showHeader = true,
  customTitle,
  className = ""
}: BlogCarouselProps) {
  const t = useTranslations('Blog');

  // REGRA: Sempre filtra posts pelo locale especificado
  const filteredPosts = posts.filter(post => post.locale === locale);

  // Limita ao número máximo especificado
  const displayedPosts = filteredPosts.slice(0, maxPosts);

  // Função para verificar se a data é válida
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    if (!dateString || !isValidDate(dateString)) return '';
    return utilFormatDate(dateString, locale);
  };

  // Função para obter nome traduzido da categoria
  const getCategoryDisplay = (category: string) => {
    return getCategoryDisplayName(category, locale);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header Section - Condicional */}
        {showHeader && (
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
              {t('recent.subtitle')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {customTitle || t('recent.title')}
            </h2>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPosts.map((post) => (
            <article
              key={`${post.locale}-${post.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Post Image */}
                {post.coverImage ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                          {getCategoryDisplay(post.category)}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{t('fallback.title')}</div>
                      <div className="text-sm font-medium">{getCategoryDisplay(post.category) || t('fallback.subtitle')}</div>
                    </div>
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <User size={14} className="mr-2" />
                    <span>{post.author}</span>
                    {post.date && isValidDate(post.date) && (
                      <>
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-2" />
                        <span>{formatDate(post.date)}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                          +{post.tags.length - 3} {t('tags.more')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Link href="/blog/archive">
                {t('buttons.viewAll')}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}