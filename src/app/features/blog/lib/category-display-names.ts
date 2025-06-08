// src/app/features/blog/lib/category-display-names.ts

import type { SupportedLocale } from './blog-config';

// 🎯 SOLUÇÃO LIMPA: Apenas slugs com hífens como chaves
export const CATEGORY_DISPLAY_NAMES: Record<string, Record<SupportedLocale, string>> = {
  'books': {
    pt: 'Livros',
    en: 'Books',
    es: 'Libros'
  },
  'indexers': {
    pt: 'Indexadores',
    en: 'Indexers',
    es: 'Indexadores'
  },
  'systems': {
    pt: 'Sistemas',
    en: 'Systems',
    es: 'Sistemas'
  },
  'review-and-standardization': {
    pt: 'Revisão e normalização',
    en: 'Review and Standardization',
    es: 'Revisión y normalización'
  }
};

// 🎯 FUNÇÃO PRINCIPAL: Normaliza qualquer categoria para slug com hífens
export function normalizeCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .normalize('NFD') // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens no início/fim
}

// 🎯 FUNÇÃO MELHORADA: Obtém display name sempre usando slug normalizado
export function getCategoryDisplayName(
  categoryInput: string,
  locale: SupportedLocale
): string {
  // Sempre normaliza primeiro
  const normalizedSlug = normalizeCategorySlug(categoryInput);

  // Busca a tradução usando o slug normalizado
  const displayNames = CATEGORY_DISPLAY_NAMES[normalizedSlug];

  if (displayNames && displayNames[locale]) {
    return displayNames[locale];
  }

  // Fallback: title case da versão original
  return categoryInput
    .split(/[-\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Função para obter todos os slugs de categoria (sempre normalizados)
export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORY_DISPLAY_NAMES);
}

// 🎯 NOVA FUNÇÃO: Converte categoria do frontmatter para slug de URL
export function categoryToUrlSlug(category: string): string {
  return normalizeCategorySlug(category);
}

// 🎯 NOVA FUNÇÃO: Mapeia categorias do frontmatter para slugs normalizados
export function mapPostCategoriesToSlugs(posts: any[]): Record<string, string> {
  const mapping: Record<string, string> = {};

  posts.forEach(post => {
    if (post.category && post.category.trim() !== '') {
      const originalCategory = post.category.trim();
      const normalizedSlug = normalizeCategorySlug(originalCategory);
      mapping[originalCategory] = normalizedSlug;
    }
  });

  return mapping;
}