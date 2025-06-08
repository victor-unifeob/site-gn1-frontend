// src/app/features/blog/lib/blog.ts

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { BLOG_CONFIG, SupportedLocale, getBlogContentPath, getFallbackHierarchy } from './blog-config';
import {
  sortPostsByDate,
  filterPostsByCategory,
  filterPostsByAuthor,
  filterPostsByLocale,
  filterPostsByDateRange,
  filterPostsByTags,
  getUniqueCategories as extractUniqueCategories,
  getUniqueAuthors as extractUniqueAuthors,
  getUniqueTags as extractUniqueTags,
  getRelatedPosts,
  paginatePosts,
  generateBlogStats,
  validatePost,
  isValidDate,
  getPostWithFallback,
  getPostsWithFallback,
  findTranslation,
  getAvailableTranslations
} from './blog-utils';
import type {
  PostMeta,
  PostWithContent,
  BlogSearchParams,
  SearchResult,
  PaginationOptions,
  BlogStats,
  RawPostData,
  PostValidationResult,
  MultilingualContentOptions,
  TranslationStats,
  CrossLanguageSearchResult
} from './blog-types';

/**
 * Operações principais de dados do blog multi-língue
 */

const basePostsDirectory = path.join(process.cwd(), BLOG_CONFIG.CONTENT_DIR);

// === FUNÇÕES AUXILIARES PRIVADAS ===

function ensurePostsDirectory(locale?: SupportedLocale): boolean {
  if (locale) {
    const localeDir = path.join(basePostsDirectory, locale);
    return fs.existsSync(localeDir);
  }
  return fs.existsSync(basePostsDirectory);
}

function getMarkdownFiles(locale: SupportedLocale): string[] {
  const postsDirectory = path.join(basePostsDirectory, locale);

  if (!ensurePostsDirectory(locale)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.filter(name =>
      BLOG_CONFIG.FILE_STRUCTURE.EXTENSIONS.some(ext => name.endsWith(ext))
    );
  } catch (error) {
    return [];
  }
}

function getAllMarkdownFiles(): Array<{ locale: SupportedLocale; fileName: string }> {
  const allFiles: Array<{ locale: SupportedLocale; fileName: string }> = [];

  BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
    const files = getMarkdownFiles(locale);
    files.forEach(fileName => {
      allFiles.push({ locale, fileName });
    });
  });

  return allFiles;
}

function processPostFile(fileName: string, locale: SupportedLocale): PostMeta | null {
  try {
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(basePostsDirectory, locale, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const postMeta: PostMeta = {
      slug,
      locale, // Importante: definir o locale do post
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      category: data.category || '',
      coverImage: data.coverImage || '',
      translations: data.translations || undefined,
      tags: data.tags || undefined,
      featured: data.featured || false,
      published: data.published !== false // Por padrão é true, a menos que explicitamente false
    };

    // Validação opcional (pode ser removida em produção para performance)
    const validation = validatePost(postMeta);
    if (!validation.isValid) {
      // Silencioso em produção
    }

    // Filtrar posts não publicados em produção
    if (process.env.NODE_ENV === 'production' && !postMeta.published) {
      return null;
    }

    return postMeta;
  } catch (error) {
    return null;
  }
}

function findPostFile(slug: string, locale: SupportedLocale): string | null {
  const postsDirectory = path.join(basePostsDirectory, locale);

  for (const ext of BLOG_CONFIG.FILE_STRUCTURE.EXTENSIONS) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

// === FUNÇÕES PRINCIPAIS PÚBLICAS ===

/**
 * Retorna todos os posts de todos os idiomas ordenados por data (mais recentes primeiro)
 */
export function getAllPosts(locale?: SupportedLocale): PostMeta[] {
  try {
    if (locale) {
      // Buscar posts de um idioma específico
      const markdownFiles = getMarkdownFiles(locale);

      if (markdownFiles.length === 0) {
        return [];
      }

      const posts = markdownFiles
        .map(fileName => processPostFile(fileName, locale))
        .filter(Boolean) as PostMeta[];

      return sortPostsByDate(posts);
    } else {
      // Buscar posts de todos os idiomas
      const allFiles = getAllMarkdownFiles();

      if (allFiles.length === 0) {
        return [];
      }

      const posts = allFiles
        .map(({ fileName, locale }) => processPostFile(fileName, locale))
        .filter(Boolean) as PostMeta[];

      return sortPostsByDate(posts);
    }
  } catch (error) {
    return [];
  }
}

/**
 * Retorna um post específico pelo slug e locale com conteúdo processado
 */
export async function getPostBySlug(
  slug: string,
  locale: SupportedLocale,
  enableFallback: boolean = true
): Promise<PostWithContent> {
  try {
    let targetLocale = locale;
    let fullPath = findPostFile(slug, locale);

    // Se não encontrou e fallback está habilitado, tenta outros idiomas
    if (!fullPath && enableFallback && BLOG_CONFIG.MULTILINGUAL.ENABLE_FALLBACK) {
      const fallbackHierarchy = getFallbackHierarchy(locale);

      for (let i = 1; i < fallbackHierarchy.length; i++) {
        const fallbackLocale = fallbackHierarchy[i];
        fullPath = findPostFile(slug, fallbackLocale);
        if (fullPath) {
          targetLocale = fallbackLocale;
          break;
        }
      }
    }

    if (!fullPath) {
      throw new Error(`Arquivo do post não encontrado para o slug: ${slug} em locale: ${locale}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Processa o conteúdo Markdown para HTML
    const processedContent = await remark()
      .use(html, BLOG_CONFIG.MARKDOWN_OPTIONS)
      .process(content);

    const postMeta: PostMeta = {
      slug,
      locale: targetLocale,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      category: data.category || '',
      coverImage: data.coverImage || '',
      translations: data.translations || undefined,
      tags: data.tags || undefined,
      featured: data.featured || false,
      published: data.published !== false
    };

    // Buscar traduções disponíveis
    const allPosts = getAllPosts();
    const availableTranslations = Object.keys(getAvailableTranslations(allPosts, slug, targetLocale));

    return {
      slug,
      locale: targetLocale,
      meta: postMeta,
      contentHtml: processedContent.toString(),
      availableTranslations: availableTranslations as SupportedLocale[]
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Retorna posts filtrados por categoria e locale
 */
export function getPostsByCategory(
  category: string,
  locale?: SupportedLocale,
  includeCrossLanguage: boolean = false
): PostMeta[] {
  try {
    let posts = getAllPosts(locale);

    if (!locale && includeCrossLanguage) {
      // Se não especificou locale, busca em todos
      posts = getAllPosts();
    } else if (locale && includeCrossLanguage) {
      // Se especificou locale mas quer incluir outros idiomas como fallback
      posts = getPostsWithFallback(getAllPosts(), locale, true);
    }

    return filterPostsByCategory(posts, category);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna posts filtrados por autor e locale
 */
export function getPostsByAuthor(
  author: string,
  locale?: SupportedLocale
): PostMeta[] {
  try {
    const posts = getAllPosts(locale);
    return filterPostsByAuthor(posts, author);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna posts filtrados por tags e locale
 */
export function getPostsByTags(
  tags: string[],
  locale?: SupportedLocale
): PostMeta[] {
  try {
    const posts = getAllPosts(locale);
    return filterPostsByTags(posts, tags);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna todas as categorias únicas para um locale específico
 */
export function getAllCategories(locale?: SupportedLocale): string[] {
  try {
    const posts = getAllPosts(locale);
    return extractUniqueCategories(posts, locale);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna todos os autores únicos para um locale específico
 */
export function getAllAuthors(locale?: SupportedLocale): string[] {
  try {
    const posts = getAllPosts(locale);
    return extractUniqueAuthors(posts, locale);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna todas as tags únicas para um locale específico
 */
export function getAllTags(locale?: SupportedLocale): string[] {
  try {
    const posts = getAllPosts(locale);
    return extractUniqueTags(posts, locale);
  } catch (error) {
    return [];
  }
}

/**
 * Busca avançada de posts com filtros múltiplos e suporte multi-língue
 */
export function searchPosts(params: BlogSearchParams): PostMeta[] {
  try {
    let posts = getAllPosts(params.locale);

    // Se cross-language está habilitado e não há posts no locale preferido
    if (params.crossLanguage && posts.length === 0 && params.locale) {
      posts = getPostsWithFallback(getAllPosts(), params.locale, true);
    }

    // Filtro por categoria
    if (params.category) {
      posts = filterPostsByCategory(posts, params.category);
    }

    // Filtro por autor
    if (params.author) {
      posts = filterPostsByAuthor(posts, params.author);
    }

    // Filtro por tags
    if (params.tags && params.tags.length > 0) {
      posts = filterPostsByTags(posts, params.tags);
    }

    // Filtro por intervalo de datas
    if (params.dateFrom || params.dateTo) {
      posts = filterPostsByDateRange(posts, params.dateFrom, params.dateTo);
    }

    // Filtrar posts não publicados se necessário
    if (!params.includeUnpublished) {
      posts = posts.filter(post => post.published !== false);
    }

    // Aplicar offset
    if (params.offset && params.offset > 0) {
      posts = posts.slice(params.offset);
    }

    // Aplicar limite
    if (params.limit && params.limit > 0) {
      posts = posts.slice(0, params.limit);
    }

    return posts;
  } catch (error) {
    return [];
  }
}

/**
 * Busca com paginação e suporte multi-língue
 */
export function searchPostsWithPagination(
  params: BlogSearchParams,
  paginationOptions: PaginationOptions = {}
): SearchResult {
  try {
    // Primeiro aplica os filtros sem limite/offset
    const filteredParams = { ...params };
    delete filteredParams.limit;
    delete filteredParams.offset;

    const filteredPosts = searchPosts(filteredParams);

    // Depois aplica a paginação
    return paginatePosts(filteredPosts, paginationOptions, params.locale);
  } catch (error) {
    return {
      posts: [],
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: 1,
      totalPages: 0,
      locale: params.locale || BLOG_CONFIG.DEFAULT_LOCALE,
      availableInOtherLanguages: 0
    };
  }
}

/**
 * Busca cross-language (posts em vários idiomas)
 */
export function searchPostsCrossLanguage(params: Omit<BlogSearchParams, 'locale'>): CrossLanguageSearchResult {
  try {
    const allPosts = getAllPosts();
    const groupedByLanguage: Record<SupportedLocale, PostMeta[]> = {} as Record<SupportedLocale, PostMeta[]>;
    const totalByLanguage: Record<SupportedLocale, number> = {} as Record<SupportedLocale, number>;

    // Inicializar estruturas
    BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
      groupedByLanguage[locale] = [];
      totalByLanguage[locale] = 0;
    });

    // Buscar em cada idioma
    BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
      const localeParams = { ...params, locale };
      const localePosts = searchPosts(localeParams);
      groupedByLanguage[locale] = localePosts;
      totalByLanguage[locale] = localePosts.length;
    });

    // Combinar todos os resultados
    const allResults = Object.values(groupedByLanguage).flat();

    // Sugerir traduções (posts com mesmo slug em idiomas diferentes)
    const suggestedTranslations: PostMeta[] = [];
    const seenSlugs = new Set<string>();

    allResults.forEach(post => {
      if (!seenSlugs.has(post.slug)) {
        seenSlugs.add(post.slug);
        const translations = allResults.filter(p =>
          p.slug === post.slug && p.locale !== post.locale
        );
        if (translations.length > 0) {
          suggestedTranslations.push(post, ...translations);
        }
      }
    });

    return {
      posts: sortPostsByDate(allResults),
      groupedByLanguage,
      totalByLanguage,
      suggestedTranslations: sortPostsByDate(suggestedTranslations)
    };
  } catch (error) {
    return {
      posts: [],
      groupedByLanguage: {} as Record<SupportedLocale, PostMeta[]>,
      totalByLanguage: {} as Record<SupportedLocale, number>,
      suggestedTranslations: []
    };
  }
}

/**
 * Retorna posts recentes para um locale específico
 */
export function getRecentPosts(
  locale?: SupportedLocale,
  limit: number = BLOG_CONFIG.RECENT_POSTS_COUNT,
  enableFallback: boolean = true
): PostMeta[] {
  try {
    let posts = getAllPosts(locale);

    // Se não há posts no locale e fallback está habilitado
    if (posts.length === 0 && enableFallback && locale) {
      posts = getPostsWithFallback(getAllPosts(), locale, true);
    }

    return posts.slice(0, limit);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna posts relacionados a um post específico (prioriza mesmo idioma)
 */
export function getRelatedPostsForSlug(
  slug: string,
  locale: SupportedLocale,
  maxResults: number = BLOG_CONFIG.RELATED_POSTS_COUNT,
  preferSameLanguage: boolean = true
): PostMeta[] {
  try {
    const allPosts = getAllPosts();
    const currentPost = allPosts.find(post => post.slug === slug && post.locale === locale);

    if (!currentPost) {
      // Tentar encontrar com fallback
      const fallbackPost = getPostWithFallback(allPosts, slug, locale);
      if (!fallbackPost) {
        return [];
      }
      return getRelatedPosts(fallbackPost, allPosts, maxResults, preferSameLanguage);
    }

    return getRelatedPosts(currentPost, allPosts, maxResults, preferSameLanguage);
  } catch (error) {
    return [];
  }
}

/**
 * Retorna estatísticas do blog (considerando todos os idiomas)
 */
export function getBlogStatistics(): BlogStats {
  try {
    const posts = getAllPosts();
    return generateBlogStats(posts);
  } catch (error) {
    return {
      totalPosts: 0,
      totalCategories: 0,
      totalAuthors: 0,
      lastUpdated: '',
      postsPerCategory: {},
      postsPerAuthor: {},
      postsPerLocale: {} as Record<SupportedLocale, number>,
      categoriesPerLocale: {} as Record<SupportedLocale, string[]>,
      authorsPerLocale: {} as Record<SupportedLocale, string[]>,
      translationCoverage: {}
    };
  }
}

/**
 * Retorna contagem total de posts por locale
 */
export function getPostsCount(locale?: SupportedLocale): number {
  try {
    return getAllPosts(locale).length;
  } catch (error) {
    return 0;
  }
}

/**
 * Verifica se um post existe em um locale específico
 */
export function postExists(slug: string, locale: SupportedLocale): boolean {
  try {
    return findPostFile(slug, locale) !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Retorna metadados de um post sem processar o conteúdo
 */
export function getPostMetaBySlug(slug: string, locale: SupportedLocale): PostMeta | null {
  try {
    const posts = getAllPosts(locale);
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

/**
 * Valida um post específico
 */
export function validatePostBySlug(slug: string, locale: SupportedLocale): PostValidationResult {
  try {
    const postMeta = getPostMetaBySlug(slug, locale);
    if (!postMeta) {
      return {
        isValid: false,
        errors: ['Post não encontrado'],
        warnings: [],
        locale
      };
    }
    return validatePost(postMeta);
  } catch (error) {
    return {
      isValid: false,
      errors: ['Erro interno na validação'],
      warnings: [],
      locale
    };
  }
}

/**
 * Retorna traduções disponíveis para um post
 */
export function getPostTranslations(slug: string, currentLocale: SupportedLocale): Partial<Record<SupportedLocale, PostMeta>> {
  try {
    const allPosts = getAllPosts();
    return getAvailableTranslations(allPosts, slug, currentLocale);
  } catch (error) {
    return {};
  }
}

/**
 * Verifica se um post tem traduções disponíveis
 */
export function hasTranslations(slug: string, locale: SupportedLocale): boolean {
  try {
    const translations = getPostTranslations(slug, locale);
    return Object.keys(translations).length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Retorna posts em destaque para um locale específico
 */
export function getFeaturedPosts(
  locale?: SupportedLocale,
  limit: number = 3
): PostMeta[] {
  try {
    const posts = getAllPosts(locale);
    const featuredPosts = posts.filter(post => post.featured === true);
    return sortPostsByDate(featuredPosts).slice(0, limit);
  } catch (error) {
    return [];
  }
}

/**
 * Gera parâmetros estáticos para todas as combinações de locale e slug
 */
export function generateStaticParams(): Array<{ locale: SupportedLocale; slug: string }> {
  try {
    const params: Array<{ locale: SupportedLocale; slug: string }> = [];
    const allPosts = getAllPosts();

    // Agrupa posts por slug para evitar duplicatas
    const slugGroups: Record<string, SupportedLocale[]> = {};

    allPosts.forEach(post => {
      if (!slugGroups[post.slug]) {
        slugGroups[post.slug] = [];
      }
      slugGroups[post.slug].push(post.locale);
    });

    // Gera parâmetros para cada combinação
    Object.entries(slugGroups).forEach(([slug, availableLocales]) => {
      BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
        params.push({ locale, slug });
      });
    });

    return params;
  } catch (error) {
    // Fallback em caso de erro
    return BLOG_CONFIG.SUPPORTED_LOCALES.map(locale => ({
      locale,
      slug: BLOG_CONFIG.FALLBACK_SLUG
    }));
  }
}

/**
 * Gera parâmetros estáticos para categorias
 */
export function generateCategoryStaticParams(): Array<{ locale: SupportedLocale; category: string }> {
  try {
    const params: Array<{ locale: SupportedLocale; category: string }> = [];

    BLOG_CONFIG.SUPPORTED_LOCALES.forEach(locale => {
      const categories = getAllCategories(locale);
      categories.forEach(category => {
        params.push({
          locale,
          category: encodeURIComponent(category)
        });
      });
    });

    return params;
  } catch (error) {
    return [];
  }
}