// src/app/features/blog/lib/blog-config.ts

// Configuração centralizada do blog com suporte multi-língue
export const BLOG_CONFIG = {
  // Locales suportados (deve corresponder ao routing.ts)
  SUPPORTED_LOCALES: ['pt', 'en', 'es'] as const,

  // Configurações de paginação
  POSTS_PER_PAGE: 10,
  RELATED_POSTS_COUNT: 2,
  RECENT_POSTS_COUNT: 3,

  // URLs e caminhos - ESTRUTURA MULTI-LÍNGUE
  CONTENT_DIR: 'content/blog', // Pasta base
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://gn1world.com',

  // Configurações de fallback
  FALLBACK_SLUG: 'sem-conteudo',
  FALLBACK_CATEGORY: 'sem-categoria',
  DEFAULT_LOCALE: 'pt' as const,

  // Configurações de processamento de markdown
  MARKDOWN_OPTIONS: {
    sanitize: false, // Para preservar formatação HTML
  },

  // Configurações de validação
  VALIDATION: {
    SLUG_PATTERN: /^[a-z0-9-]+$/,
    MIN_CATEGORY_LENGTH: 1,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_TITLE_LENGTH: 100,
  },

  // Configurações de SEO
  SEO: {
    DEFAULT_TITLE_SUFFIX: ' | Blog GN1',
    DEFAULT_DESCRIPTION: 'Descubra insights sobre tecnologia editorial e soluções de publicação no blog da GN1.',
    DEFAULT_IMAGE: '/images/blog-default.jpg',
  },

  // Configurações de cache (para futuras implementações)
  CACHE: {
    TTL_POSTS: 3600, // 1 hora em segundos
    TTL_CATEGORIES: 7200, // 2 horas em segundos
  },

  // NOVOS: Configurações específicas para multi-língue
  MULTILINGUAL: {
    // Estratégia de fallback: se um post não existir em um idioma, usar outro
    ENABLE_FALLBACK: true,
    FALLBACK_HIERARCHY: ['pt', 'en', 'es'] as const,

    // Configuração para tradução automática de slugs
    TRANSLATE_SLUGS: false, // Se true, permite slugs diferentes por idioma

    // Configuração para mostrar posts de outros idiomas quando não há conteúdo
    SHOW_CROSS_LANGUAGE_POSTS: true,

    // Prefixos para imagens por idioma (opcional)
    IMAGE_PREFIXES: {
      pt: '/images/blog/pt/',
      en: '/images/blog/en/',
      es: '/images/blog/es/',
    },
  },

  // Configurações de estrutura de arquivos
  FILE_STRUCTURE: {
    // Padrão de nomeação: {locale}/{slug}.md
    PATTERN: '{locale}/{slug}.md',

    // Extensões suportadas
    EXTENSIONS: ['.md', '.mdx'],

    // Campos obrigatórios no frontmatter
    REQUIRED_FIELDS: ['title', 'description', 'date', 'author'],

    // Campos opcionais
    OPTIONAL_FIELDS: ['category', 'coverImage', 'tags', 'featured', 'published'],
  }
} as const;

// Tipos para locales suportados
export type SupportedLocale = typeof BLOG_CONFIG.SUPPORTED_LOCALES[number];

// Tipo para verificação de locale válido
export type LocaleParam = {
  locale: SupportedLocale;
};

// Tipos auxiliares para configuração
export type BlogValidationConfig = typeof BLOG_CONFIG.VALIDATION;
export type BlogSEOConfig = typeof BLOG_CONFIG.SEO;
export type BlogMultilingualConfig = typeof BLOG_CONFIG.MULTILINGUAL;

// Funções utilitárias para caminhos
export const getBlogContentPath = (locale: SupportedLocale): string => {
  return `${BLOG_CONFIG.CONTENT_DIR}/${locale}`;
};

export const getPostFilePath = (locale: SupportedLocale, slug: string): string => {
  return `${getBlogContentPath(locale)}/${slug}`;
};

// Função para obter hierarquia de fallback para um locale específico
export const getFallbackHierarchy = (preferredLocale: SupportedLocale): SupportedLocale[] => {
  if (!BLOG_CONFIG.MULTILINGUAL.ENABLE_FALLBACK) {
    return [preferredLocale];
  }

  const hierarchy = [...BLOG_CONFIG.MULTILINGUAL.FALLBACK_HIERARCHY];

  // Move o locale preferido para o início
  const index = hierarchy.indexOf(preferredLocale);
  if (index > 0) {
    hierarchy.splice(index, 1);
    hierarchy.unshift(preferredLocale);
  }

  return hierarchy;
};