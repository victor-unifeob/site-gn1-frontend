// src/app/features/blog/components/RelatedPosts.tsx

'use client';

import type { PostMeta } from '../lib/blog-types';
import { SupportedLocale } from '../lib/blog-config';
import { formatDate as utilFormatDate, calculateRelevanceScore } from '../lib/blog-utils';
import { getCategoryDisplayName } from '../lib/category-display-names';
import Image from 'next/image';
import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, User } from 'lucide-react';

interface RelatedPostsProps {
  currentPostSlug: string;
  currentPost?: PostMeta;
  posts: PostMeta[];
  title?: string;
  maxPosts?: number;
  showAllPostsButton?: boolean;
  locale?: SupportedLocale;
  preferSameLanguage?: boolean;
  showCrossLanguagePosts?: boolean;
}

export default function RelatedPosts({
  currentPostSlug,
  currentPost,
  posts,
  title,
  maxPosts = 2,
  showAllPostsButton = true,
  locale,
  preferSameLanguage = true,
  showCrossLanguagePosts = true
}: RelatedPostsProps) {
  const t = useTranslations('BlogPost');
  const tBlog = useTranslations('Blog');
  const currentLocale = useLocale() as SupportedLocale;
  const targetLocale = locale || currentLocale;

  // Encontrando o post atual nos posts, caso não tenha sido fornecido diretamente
  const currentPostData = useMemo(() => {
    if (currentPost) return currentPost;
    return posts.find(post => post.slug === currentPostSlug);
  }, [currentPost, currentPostSlug, posts]);

  // Filtra e prioriza posts por idioma
  const relatedPosts = useMemo(() => {
    if (!currentPostData) return [];

    // 1. Separa posts por idioma
    const postsInCurrentLanguage = posts.filter(post =>
      post.slug !== currentPostSlug && post.locale === targetLocale
    );

    const postsInOtherLanguages = posts.filter(post =>
      post.slug !== currentPostSlug && post.locale !== targetLocale
    );

    // 2. Calcula relevância para posts no idioma atual
    const scoredCurrentLanguagePosts = postsInCurrentLanguage.map(post => ({
      post,
      relevanceScore: calculateRelevanceScore(currentPostData, post, 3) // Bônus alto para mesmo idioma
    }));

    // 3. Calcula relevância para posts em outros idiomas (se permitido)
    const scoredOtherLanguagePosts = showCrossLanguagePosts
      ? postsInOtherLanguages.map(post => ({
        post,
        relevanceScore: calculateRelevanceScore(currentPostData, post, 0) // Sem bônus de idioma
      }))
      : [];

    // 4. Estratégia de seleção baseada em preferência
    let finalPosts: PostMeta[] = [];

    if (preferSameLanguage) {
      // ESTRATÉGIA A: Prioriza mesmo idioma

      // Ordena posts do idioma atual por relevância
      const sortedCurrentLanguage = scoredCurrentLanguagePosts
        .sort((a, b) => {
          if (b.relevanceScore !== a.relevanceScore) {
            return b.relevanceScore - a.relevanceScore;
          }
          // Em empate, ordena por data
          if (a.post.date && b.post.date) {
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
          }
          return 0;
        })
        .map(item => item.post);

      // Tenta preencher com posts do idioma atual primeiro
      finalPosts = sortedCurrentLanguage.slice(0, maxPosts);

      // Se não tem posts suficientes no idioma atual, complementa com outros idiomas
      if (finalPosts.length < maxPosts && showCrossLanguagePosts) {
        const remainingSlots = maxPosts - finalPosts.length;

        const sortedOtherLanguages = scoredOtherLanguagePosts
          .sort((a, b) => {
            if (b.relevanceScore !== a.relevanceScore) {
              return b.relevanceScore - a.relevanceScore;
            }
            if (a.post.date && b.post.date) {
              return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
            }
            return 0;
          })
          .map(item => item.post)
          .slice(0, remainingSlots);

        finalPosts = [...finalPosts, ...sortedOtherLanguages];
      }

    } else {
      // ESTRATÉGIA B: Mistura todos os idiomas igualmente

      const allScoredPosts = [...scoredCurrentLanguagePosts, ...scoredOtherLanguagePosts];

      finalPosts = allScoredPosts
        .sort((a, b) => {
          if (b.relevanceScore !== a.relevanceScore) {
            return b.relevanceScore - a.relevanceScore;
          }
          if (a.post.date && b.post.date) {
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
          }
          return 0;
        })
        .map(item => item.post)
        .slice(0, maxPosts);
    }

    return finalPosts;
  }, [posts, currentPostSlug, currentPostData, maxPosts, preferSameLanguage, showCrossLanguagePosts, targetLocale]);

  // Verifica se há posts relacionados para exibir
  if (!relatedPosts.length) {
    return (
      <section className="space-y-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {title || t('related.title')}
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('related.noPosts.title')}
            </h3>
            <p className="mb-4">{t('related.noPosts.description')}</p>
            {showAllPostsButton && (
              <Link
                href="/blog"
                className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {tBlog('buttons.viewAll')}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

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

  // Função para obter nome traduzido da categoria
  const getCategoryDisplay = (category: string, postLocale: SupportedLocale) => {
    return getCategoryDisplayName(category, targetLocale);
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {title || t('related.title')}
        </h2>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => {
          const isCurrentLanguage = post.locale === targetLocale;

          return (
            <article
              key={`${post.locale}-${post.slug}`}
              className={`group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${!isCurrentLanguage ? 'ring-1 ring-yellow-200 dark:ring-yellow-800' : ''
                }`}
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
                          {getCategoryDisplay(post.category, post.locale)}
                        </span>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">{tBlog('fallback.title')}</div>
                      <div className="text-sm font-medium">{post.category ? getCategoryDisplay(post.category, post.locale) : tBlog('fallback.subtitle')}</div>
                    </div>

                    {/* Language Badge para posts sem imagem */}
                    {!isCurrentLanguage && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-2 py-1 text-xs font-bold text-gray-900 bg-yellow-400 rounded-full shadow-sm border border-yellow-300">
                          {post.locale.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 flex-wrap gap-2">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{post.author}</span>
                    </div>

                    {post.date && isValidDate(post.date) && (
                      <>
                        <span>•</span>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
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
                    <div className="flex flex-wrap gap-1">
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
                          +{post.tags.length - 3} {tBlog('tags.more')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </div>

    </section>
  );
}