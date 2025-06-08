// src/app/features/blog/components/PaginatedPosts.tsx

'use client';

import type { PostMeta } from '../lib/blog-types';
import { SupportedLocale } from '../lib/blog-config';
import { formatDate as utilFormatDate } from '../lib/blog-utils';
import { getCategoryDisplayName } from '../lib/category-display-names';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User, Tag } from 'lucide-react';

interface PaginatedPostsProps {
  posts: PostMeta[];
  locale?: SupportedLocale;
}

export default function PaginatedPosts({
  posts,
  locale
}: PaginatedPostsProps) {
  const t = useTranslations('Blog');
  const tPost = useTranslations('BlogPost');
  const currentLocale = useLocale() as SupportedLocale;
  const targetLocale = locale || currentLocale;

  const POSTS_PER_PAGE = 10;
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Função para verificar se a data é válida
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  // Função para formatar a data usando a utilidade do blog
  const formatDate = (dateString: string) => {
    if (!dateString || !isValidDate(dateString)) return '';
    return utilFormatDate(dateString, targetLocale);
  };

  const handleShowMore = () => {
    setIsLoading(true);
    // Simula um delay para carregar os posts adicionais
    setTimeout(() => {
      setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
      setIsLoading(false);
    }, 500);
  };

  // Memoriza os posts exibidos para evitar recálculos desnecessários
  const displayedPosts = useMemo(() => posts.slice(0, visiblePosts), [posts, visiblePosts]);

  return (
    <div className="space-y-8">
      {/* Lista de posts */}
      {displayedPosts.map((post) => (
        <article
          key={`${post.locale}-${post.slug}`}
          className="group border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="flex flex-col md:flex-row gap-6 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg">
              {/* Imagem de capa à esquerda */}
              {post.coverImage && (
                <div className="relative w-full md:w-80 h-48 overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge de idioma se diferente do atual */}
                  {post.locale !== targetLocale && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full">
                        {post.locale.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Badge de destaque */}
                  {post.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-400 rounded-full">
                        ⭐ {tPost('featured.badge')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Detalhes do post à direita */}
              <div className="flex flex-col justify-between space-y-3 flex-grow">
                <div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap gap-2">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span className="font-medium">{post.author}</span>
                    </div>

                    {post.date && isValidDate(post.date) && (
                      <>
                        <span>•</span>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <time dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                        </div>
                      </>
                    )}

                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                          {getCategoryDisplayName(post.category, targetLocale)}
                        </span>
                      </>
                    )}

                    {/* Indicador de idioma se diferente */}
                    {post.locale !== targetLocale && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                          {post.locale.toUpperCase()}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <Tag size={14} className="text-gray-400 mr-1 mt-0.5" />
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-500">
                          +{post.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}

      {/* Botão "Exibir mais" exibido apenas se houver mais posts */}
      {visiblePosts < posts.length && (
        <div className="flex justify-center pt-8">
          <Button
            disabled={isLoading}
            onClick={handleShowMore}
            size="lg"
            variant="outline"
            className="px-8 py-3"
          >
            {isLoading ? t('buttons.loading') : t('buttons.loadMore')}
          </Button>
        </div>
      )}

      {/* Informações sobre posts restantes */}
      {posts.length > displayedPosts.length && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {t('pagination.showing', {
            displayed: displayedPosts.length,
            total: posts.length
          })}
        </div>
      )}
    </div>
  );
}