// src/app/features/blog/lib/blog-types.ts

import type { SupportedLocale } from './blog-config';

/**
 * Tipos centralizados para o sistema de blog multi-língue
 */

// Tipo principal para metadados do post com suporte a idiomas
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  locale: SupportedLocale; // NOVO: idioma do post
  translations?: Partial<Record<SupportedLocale, string>>; // NOVO: slugs de traduções
  tags?: string[]; // NOVO: tags do post
  featured?: boolean; // NOVO: post em destaque
  published?: boolean; // NOVO: status de publicação
}

// Post com conteúdo processado (inclui locale)
export interface PostWithContent {
  slug: string;
  locale: SupportedLocale; // NOVO
  meta: PostMeta;
  contentHtml: string;
  availableTranslations?: SupportedLocale[]; // NOVO: idiomas disponíveis
}

// Para cálculo de relevância entre posts (considerando idioma)
export interface PostRelevanceScore {
  post: PostMeta;
  relevanceScore: number;
  languageBonus: number; // NOVO: bônus por ser do mesmo idioma
}

// Opções de paginação (inalterada)
export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

// Parâmetros de busca no blog (com suporte a idioma)
export interface BlogSearchParams {
  locale?: SupportedLocale; // NOVO
  category?: string;
  author?: string;
  limit?: number;
  offset?: number;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[]; // NOVO
  includeUnpublished?: boolean; // NOVO
  crossLanguage?: boolean; // NOVO: incluir posts de outros idiomas
}

// Dados brutos do frontmatter (antes da validação) - expandido
export interface RawPostData {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  category?: string;
  coverImage?: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
  locale?: string; // NOVO
  translations?: Record<string, string>; // NOVO
  alternativeTitle?: string; // NOVO: título alternativo
}

// Resultado de validação de post (expandido)
export interface PostValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  locale: SupportedLocale; // NOVO
  missingTranslations?: SupportedLocale[]; // NOVO
}

// Estatísticas do blog (com dados por idioma)
export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalAuthors: number;
  lastUpdated: string;
  postsPerCategory: Record<string, number>;
  postsPerAuthor: Record<string, number>;
  // NOVOS: estatísticas por idioma
  postsPerLocale: Record<SupportedLocale, number>;
  categoriesPerLocale: Record<SupportedLocale, string[]>;
  authorsPerLocale: Record<SupportedLocale, string[]>;
  translationCoverage: Record<string, Partial<Record<SupportedLocale, boolean>>>;
}

// Opções para geração de static params (expandido)
export interface StaticParamsOptions {
  includeArchive?: boolean;
  includeCategories?: boolean;
  maxPages?: number;
  locales?: SupportedLocale[]; // NOVO
  includeDrafts?: boolean; // NOVO
}

// Resultado de busca com metadados (inclui idioma)
export interface SearchResult {
  posts: PostMeta[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
  locale: SupportedLocale; // NOVO
  availableInOtherLanguages: number; // NOVO: posts disponíveis em outros idiomas
}

// Configuração de formatação de data (expandido)
export interface DateFormatOptions {
  includeTime?: boolean;
  format?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
  useRelativeTime?: boolean; // NOVO
}

// NOVOS TIPOS para funcionalidades multi-língue

// Informações de tradução de um post
export interface PostTranslationInfo {
  slug: string;
  locale: SupportedLocale;
  availableTranslations: Partial<Record<SupportedLocale, string>>;
  isOriginal: boolean;
  originalLocale?: SupportedLocale;
}

// Resultado de busca cross-language
export interface CrossLanguageSearchResult {
  posts: PostMeta[];
  groupedByLanguage: Record<SupportedLocale, PostMeta[]>;
  totalByLanguage: Record<SupportedLocale, number>;
  suggestedTranslations: PostMeta[];
}

// Configuração para geração de conteúdo multi-língue
export interface MultilingualContentOptions {
  preferredLocale: SupportedLocale;
  fallbackLocales: SupportedLocale[];
  includeCrossLanguage: boolean;
  translateCategories: boolean;
  translateTags: boolean;
}

// Metadados estendidos para SEO multi-língue
export interface MultilingualSEOData {
  title: string;
  description: string;
  locale: SupportedLocale;
  alternateLanguages: Record<SupportedLocale, string>;
  canonicalUrl: string;
  hreflang: Record<SupportedLocale, string>;
  ogLocale: string;
}

// Interface para mapeamento de categorias/tags entre idiomas
export interface LanguageMappings {
  categories: Record<string, Partial<Record<SupportedLocale, string>>>;
  tags: Record<string, Partial<Record<SupportedLocale, string>>>;
  authors: Record<string, Partial<Record<SupportedLocale, string>>>;
}

// Interface para estatísticas de tradução
export interface TranslationStats {
  totalPostsNeedingTranslation: number;
  fullyTranslatedPosts: number;
  partiallyTranslatedPosts: number;
  untranslatedPosts: number;
  translationCompleteness: Record<SupportedLocale, number>; // percentual
  missingTranslations: Array<{
    slug: string;
    originalLocale: SupportedLocale;
    missingLocales: SupportedLocale[];
  }>;
}

// Configuração para exportação/importação de traduções
export interface TranslationExportConfig {
  format: 'json' | 'csv' | 'xlsx';
  includeContent: boolean;
  includeMetadata: boolean;
  filterByStatus: 'all' | 'translated' | 'untranslated' | 'partial';
  targetLocales: SupportedLocale[];
}