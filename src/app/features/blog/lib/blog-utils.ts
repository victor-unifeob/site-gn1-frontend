// src/app/features/blog/lib/blog-utils.ts

import { BLOG_CONFIG, SupportedLocale, getFallbackHierarchy } from './blog-config';
import type {
  PostMeta,
  PostValidationResult,
  BlogStats,
  DateFormatOptions,
  SearchResult,
  PaginationOptions,
  MultilingualSEOData,
  PostTranslationInfo,
  TranslationStats
} from './blog-types';

/**
 * Utilitários para validação e formatação do blog multi-língue
 */

// === VALIDAÇÕES ===

export function isValidLocale(locale: string): locale is SupportedLocale {
  return BLOG_CONFIG.SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function isValidSlug(slug: string): boolean {
  return BLOG_CONFIG.VALIDATION.SLUG_PATTERN.test(slug) &&
    slug !== BLOG_CONFIG.FALLBACK_SLUG;
}

export function isValidCategory(category: string): boolean {
  return category.length >= BLOG_CONFIG.VALIDATION.MIN_CATEGORY_LENGTH &&
    category !== BLOG_CONFIG.FALLBACK_CATEGORY;
}

export function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.getTime() > 0;
}

export function validatePost(post: Partial<PostMeta>): PostValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const locale = (post.locale || BLOG_CONFIG.DEFAULT_LOCALE) as SupportedLocale;

  // Validações obrigatórias
  if (!post.title) {
    errors.push('Título é obrigatório');
  } else if (post.title.length > BLOG_CONFIG.VALIDATION.MAX_TITLE_LENGTH) {
    warnings.push(`Título muito longo (máx: ${BLOG_CONFIG.VALIDATION.MAX_TITLE_LENGTH} caracteres)`);
  }

  if (!post.slug || !isValidSlug(post.slug)) {
    errors.push('Slug inválido ou não fornecido');
  }

  if (!post.description) {
    warnings.push('Descrição não fornecida');
  } else if (post.description.length > BLOG_CONFIG.VALIDATION.MAX_DESCRIPTION_LENGTH) {
    warnings.push(`Descrição muito longa (máx: ${BLOG_CONFIG.VALIDATION.MAX_DESCRIPTION_LENGTH} caracteres)`);
  }

  if (!post.date || !isValidDate(post.date)) {
    errors.push('Data inválida ou não fornecida');
  }

  if (!post.author) {
    warnings.push('Autor não especificado');
  }

  if (!post.category || !isValidCategory(post.category)) {
    warnings.push('Categoria inválida ou não especificada');
  }

  // Validação para locale
  if (!post.locale || !isValidLocale(post.locale)) {
    warnings.push('Locale inválido ou não especificado, usando padrão');
  }

  // Verificar se há traduções disponíveis
  const missingTranslations: SupportedLocale[] = [];
  if (BLOG_CONFIG.MULTILINGUAL.ENABLE_FALLBACK) {
    BLOG_CONFIG.SUPPORTED_LOCALES.forEach(supportedLocale => {
      if (supportedLocale !== locale &&
        (!post.translations || !post.translations[supportedLocale])) {
        missingTranslations.push(supportedLocale);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    locale,
    missingTranslations: missingTranslations.length > 0 ? missingTranslations : undefined
  };
}

// === FORMATAÇÃO E TRANSFORMAÇÃO ===

export function getDefaultLocale(): SupportedLocale {
  return BLOG_CONFIG.DEFAULT_LOCALE;
}

export function generateCanonicalUrl(locale: SupportedLocale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BLOG_CONFIG.BASE_URL}/${locale}${cleanPath}`;
}

export function sanitizeForUrl(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens no início/fim
}

export function formatDate(
  dateString: string,
  locale: SupportedLocale,
  options: DateFormatOptions = {}
): string {
  if (!dateString || !isValidDate(dateString)) return '';

  const date = new Date(dateString);
  const localeMap: Record<SupportedLocale, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES'
  };

  const targetLocale = options.locale || localeMap[locale] || 'en-US';
  const format = options.format || 'long';

  // Se é para usar tempo relativo
  if (options.useRelativeTime) {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    year: 'numeric',
  };

  if (options.includeTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }

  return date.toLocaleDateString(targetLocale, formatOptions);
}

export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

export function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove HTML tags se houver
  const cleanText = content.replace(/<[^>]*>/g, '');
  return truncateText(cleanText, maxLength);
}

// === OPERAÇÕES COM POSTS MULTI-LÍNGUE ===

export function sortPostsByDate(posts: PostMeta[], ascending: boolean = false): PostMeta[] {
  return [...posts].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function filterPostsByCategory(posts: PostMeta[], category: string): PostMeta[] {
  return posts.filter(post =>
    post.category?.toLowerCase() === category.toLowerCase()
  );
}

export function filterPostsByAuthor(posts: PostMeta[], author: string): PostMeta[] {
  return posts.filter(post =>
    post.author?.toLowerCase().includes(author.toLowerCase())
  );
}

export function filterPostsByLocale(posts: PostMeta[], locale: SupportedLocale): PostMeta[] {
  return posts.filter(post => post.locale === locale);
}

export function filterPostsByTags(posts: PostMeta[], tags: string[]): PostMeta[] {
  return posts.filter(post =>
    post.tags && tags.some(tag =>
      post.tags!.some(postTag =>
        postTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

export function filterPostsByDateRange(
  posts: PostMeta[],
  startDate?: string,
  endDate?: string
): PostMeta[] {
  return posts.filter(post => {
    if (!post.date || !isValidDate(post.date)) return false;

    const postDate = new Date(post.date);

    if (startDate && isValidDate(startDate)) {
      if (postDate < new Date(startDate)) return false;
    }

    if (endDate && isValidDate(endDate)) {
      if (postDate > new Date(endDate)) return false;
    }

    return true;
  });
}

export function getUniqueCategories(posts: PostMeta[], locale?: SupportedLocale): string[] {
  let filteredPosts = posts;

  if (locale) {
    filteredPosts = filterPostsByLocale(posts, locale);
  }

  const categories = filteredPosts
    .map(post => post.category)
    .filter(Boolean)
    .filter(category => category.trim() !== '');

  return Array.from(new Set(categories)).sort();
}

export function getUniqueAuthors(posts: PostMeta[], locale?: SupportedLocale): string[] {
  let filteredPosts = posts;

  if (locale) {
    filteredPosts = filterPostsByLocale(posts, locale);
  }

  const authors = filteredPosts
    .map(post => post.author)
    .filter(Boolean)
    .filter(author => author.trim() !== '');

  return Array.from(new Set(authors)).sort();
}

export function getUniqueTags(posts: PostMeta[], locale?: SupportedLocale): string[] {
  let filteredPosts = posts;

  if (locale) {
    filteredPosts = filterPostsByLocale(posts, locale);
  }

  const allTags = filteredPosts
    .flatMap(post => post.tags || [])
    .filter(Boolean)
    .filter(tag => tag.trim() !== '');

  return Array.from(new Set(allTags)).sort();
}

export function calculateRelevanceScore(
  currentPost: PostMeta,
  targetPost: PostMeta,
  sameLanguageBonus: number = 2
): number {
  let score = 0;

  // Categoria igual (peso 3)
  if (currentPost.category && targetPost.category &&
    currentPost.category === targetPost.category) {
    score += 3;
  }

  // Proximidade temporal (peso 1)
  if (currentPost.date && targetPost.date &&
    isValidDate(currentPost.date) && isValidDate(targetPost.date)) {
    const currentDate = new Date(currentPost.date);
    const targetDate = new Date(targetPost.date);
    const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      score += 1 - (diffDays / 30);
    }
  }

  // Autor igual (peso 1)
  if (currentPost.author && targetPost.author &&
    currentPost.author === targetPost.author) {
    score += 1;
  }

  // Tags similares (peso 0.5 por tag)
  if (currentPost.tags && targetPost.tags) {
    const commonTags = currentPost.tags.filter(tag =>
      targetPost.tags!.includes(tag)
    );
    score += commonTags.length * 0.5;
  }

  // Bônus por ser do mesmo idioma
  if (currentPost.locale === targetPost.locale) {
    score += sameLanguageBonus;
  }

  return score;
}

export function getRelatedPosts(
  currentPost: PostMeta,
  allPosts: PostMeta[],
  maxResults: number = BLOG_CONFIG.RELATED_POSTS_COUNT,
  preferSameLanguage: boolean = true
): PostMeta[] {
  const sameLanguageBonus = preferSameLanguage ? 2 : 0;

  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      post,
      relevanceScore: calculateRelevanceScore(currentPost, post, sameLanguageBonus)
    }))
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      // Em caso de empate, ordenar por data
      if (a.post.date && b.post.date) {
        return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
      }
      return 0;
    })
    .slice(0, maxResults)
    .map(item => item.post);
}

// === FUNCIONALIDADES MULTI-LÍNGUE ===

export function getPostTranslationInfo(post: PostMeta): PostTranslationInfo {
  return {
    slug: post.slug,
    locale: post.locale,
    availableTranslations: post.translations || {},
    isOriginal: !post.translations || Object.keys(post.translations).length === 0,
    originalLocale: post.locale
  };
}

export function findTranslation(
  posts: PostMeta[],
  slug: string,
  targetLocale: SupportedLocale
): PostMeta | null {
  // Primeiro tenta encontrar diretamente no locale desejado
  const directMatch = posts.find(post =>
    post.slug === slug && post.locale === targetLocale
  );

  if (directMatch) return directMatch;

  // Se não encontrou, procura por traduções
  const anyPost = posts.find(post => post.slug === slug);
  if (anyPost?.translations?.[targetLocale]) {
    const translationSlug = anyPost.translations[targetLocale];
    return posts.find(post =>
      post.slug === translationSlug && post.locale === targetLocale
    ) || null;
  }

  return null;
}

export function getAvailableTranslations(
  posts: PostMeta[],
  slug: string,
  currentLocale: SupportedLocale
): Partial<Record<SupportedLocale, PostMeta>> {
  const translations: Partial<Record<SupportedLocale, PostMeta>> = {};

  BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
    if (locale !== currentLocale) {
      const translation = findTranslation(posts, slug, locale);
      if (translation) {
        translations[locale] = translation;
      }
    }
  });

  return translations;
}

// === PAGINAÇÃO ===

export function paginatePosts(
  posts: PostMeta[],
  options: PaginationOptions = {},
  locale?: SupportedLocale
): SearchResult {
  const page = options.page || 1;
  const limit = options.limit || BLOG_CONFIG.POSTS_PER_PAGE;
  const offset = options.offset || (page - 1) * limit;

  const totalCount = posts.length;
  const totalPages = Math.ceil(totalCount / limit);
  const paginatedPosts = posts.slice(offset, offset + limit);

  // Contar posts disponíveis em outros idiomas (se locale especificado)
  let availableInOtherLanguages = 0;
  if (locale) {
    const otherLocales = BLOG_CONFIG.SUPPORTED_LOCALES.filter(l => l !== locale);
    availableInOtherLanguages = posts.filter(post =>
      otherLocales.includes(post.locale)
    ).length;
  }

  return {
    posts: paginatedPosts,
    totalCount,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    currentPage: page,
    totalPages,
    locale: locale || getDefaultLocale(),
    availableInOtherLanguages
  };
}

// === ESTATÍSTICAS MULTI-LÍNGUE ===

export function generateBlogStats(posts: PostMeta[]): BlogStats {
  const categories = getUniqueCategories(posts);
  const authors = getUniqueAuthors(posts);

  const postsPerCategory: Record<string, number> = {};
  const postsPerAuthor: Record<string, number> = {};
  const postsPerLocale: Record<SupportedLocale, number> = {} as Record<SupportedLocale, number>;
  const categoriesPerLocale: Record<SupportedLocale, string[]> = {} as Record<SupportedLocale, string[]>;
  const authorsPerLocale: Record<SupportedLocale, string[]> = {} as Record<SupportedLocale, string[]>;

  // Inicializar contadores por locale
  BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
    postsPerLocale[locale] = 0;
    categoriesPerLocale[locale] = [];
    authorsPerLocale[locale] = [];
  });

  posts.forEach(post => {
    // Contadores gerais
    if (post.category) {
      postsPerCategory[post.category] = (postsPerCategory[post.category] || 0) + 1;
    }
    if (post.author) {
      postsPerAuthor[post.author] = (postsPerAuthor[post.author] || 0) + 1;
    }

    // Contadores por locale
    postsPerLocale[post.locale]++;

    if (post.category && !categoriesPerLocale[post.locale].includes(post.category)) {
      categoriesPerLocale[post.locale].push(post.category);
    }

    if (post.author && !authorsPerLocale[post.locale].includes(post.author)) {
      authorsPerLocale[post.locale].push(post.author);
    }
  });

  // Calcular cobertura de tradução
  const translationCoverage: Record<string, Partial<Record<SupportedLocale, boolean>>> = {};

  posts.forEach(post => {
    if (!translationCoverage[post.slug]) {
      translationCoverage[post.slug] = {};
    }
    translationCoverage[post.slug][post.locale] = true;
  });

  // Encontra a data mais recente
  const sortedPosts = sortPostsByDate(posts);
  const lastUpdated = sortedPosts.length > 0 ? sortedPosts[0].date : '';

  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    totalAuthors: authors.length,
    lastUpdated,
    postsPerCategory,
    postsPerAuthor,
    postsPerLocale,
    categoriesPerLocale,
    authorsPerLocale,
    translationCoverage
  };
}

export function generateTranslationStats(posts: PostMeta[]): TranslationStats {
  const slugGroups: Record<string, PostMeta[]> = {};

  // Agrupa posts por slug
  posts.forEach(post => {
    if (!slugGroups[post.slug]) {
      slugGroups[post.slug] = [];
    }
    slugGroups[post.slug].push(post);
  });

  let fullyTranslatedPosts = 0;
  let partiallyTranslatedPosts = 0;
  let untranslatedPosts = 0;
  const missingTranslations: Array<{
    slug: string;
    originalLocale: SupportedLocale;
    missingLocales: SupportedLocale[];
  }> = [];

  const translationCompleteness: Record<SupportedLocale, number> = {} as Record<SupportedLocale, number>;

  // Inicializar contadores
  BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
    translationCompleteness[locale] = 0;
  });

  Object.entries(slugGroups).forEach(([slug, groupPosts]) => {
    const availableLocales = groupPosts.map(p => p.locale);
    const missingLocales = BLOG_CONFIG.SUPPORTED_LOCALES.filter(
      locale => !availableLocales.includes(locale)
    );

    if (missingLocales.length === 0) {
      fullyTranslatedPosts++;
    } else if (availableLocales.length > 1) {
      partiallyTranslatedPosts++;
    } else {
      untranslatedPosts++;
    }

    if (missingLocales.length > 0) {
      const originalPost = groupPosts[0]; // Assume o primeiro como original
      missingTranslations.push({
        slug,
        originalLocale: originalPost.locale,
        missingLocales
      });
    }

    // Contar completude por locale
    availableLocales.forEach(locale => {
      translationCompleteness[locale]++;
    });
  });

  // Calcular percentuais
  const totalUniqueSlugs = Object.keys(slugGroups).length;
  BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
    translationCompleteness[locale] = totalUniqueSlugs > 0
      ? (translationCompleteness[locale] / totalUniqueSlugs) * 100
      : 0;
  });

  return {
    totalPostsNeedingTranslation: totalUniqueSlugs,
    fullyTranslatedPosts,
    partiallyTranslatedPosts,
    untranslatedPosts,
    translationCompleteness,
    missingTranslations
  };
}

// === SEO MULTI-LÍNGUE ===

export function generateMultilingualSEOData(
  post: PostMeta,
  availableTranslations: Partial<Record<SupportedLocale, PostMeta>>,
  basePath: string = '/blog'
): MultilingualSEOData {
  const baseUrl = BLOG_CONFIG.BASE_URL;
  const canonicalUrl = generateCanonicalUrl(post.locale, `${basePath}/${post.slug}`);

  const alternateLanguages: Record<SupportedLocale, string> = {} as Record<SupportedLocale, string>;
  const hreflang: Record<SupportedLocale, string> = {} as Record<SupportedLocale, string>;

  // URL do post atual
  alternateLanguages[post.locale] = canonicalUrl;
  hreflang[post.locale] = canonicalUrl;

  // URLs das traduções
  Object.entries(availableTranslations).forEach(([locale, translatedPost]) => {
    if (translatedPost) {
      const url = generateCanonicalUrl(locale as SupportedLocale, `${basePath}/${translatedPost.slug}`);
      alternateLanguages[locale as SupportedLocale] = url;
      hreflang[locale as SupportedLocale] = url;
    }
  });

  // Mapear locale para og:locale
  const ogLocaleMap: Record<SupportedLocale, string> = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES'
  };

  return {
    title: post.title,
    description: post.description,
    locale: post.locale,
    alternateLanguages,
    canonicalUrl,
    hreflang,
    ogLocale: ogLocaleMap[post.locale]
  };
}

// === UTILITÁRIOS DE FALLBACK ===

export function getPostWithFallback(
  posts: PostMeta[],
  slug: string,
  preferredLocale: SupportedLocale
): PostMeta | null {
  const fallbackHierarchy = getFallbackHierarchy(preferredLocale);

  for (const locale of fallbackHierarchy) {
    const post = findTranslation(posts, slug, locale);
    if (post) {
      return post;
    }
  }

  return null;
}

export function getPostsWithFallback(
  posts: PostMeta[],
  preferredLocale: SupportedLocale,
  includeCrossLanguage: boolean = BLOG_CONFIG.MULTILINGUAL.SHOW_CROSS_LANGUAGE_POSTS
): PostMeta[] {
  const preferredLocalePosts = filterPostsByLocale(posts, preferredLocale);

  if (!includeCrossLanguage || preferredLocalePosts.length > 0) {
    return preferredLocalePosts;
  }

  // Se não há posts no idioma preferido e cross-language está habilitado
  const fallbackHierarchy = getFallbackHierarchy(preferredLocale);

  for (let i = 1; i < fallbackHierarchy.length; i++) {
    const fallbackPosts = filterPostsByLocale(posts, fallbackHierarchy[i]);
    if (fallbackPosts.length > 0) {
      return fallbackPosts;
    }
  }

  return [];
}