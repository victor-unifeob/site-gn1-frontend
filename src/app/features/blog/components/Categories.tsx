// src/app/features/blog/components/Categories.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SupportedLocale } from '../lib/blog-config';
import { getCategoryDisplayName, normalizeCategorySlug } from '../lib/category-display-names';

interface BlogCategoriesProps {
  categories: string[];
  title?: string;
  locale?: SupportedLocale;
}

export default function BlogCategories({
  categories,
  title,
  locale,
}: BlogCategoriesProps) {
  const t = useTranslations('Blog.categories');

  // Processamento: Normaliza todas as categorias e remove duplicatas
  const processedCategories = categories
    ? [...new Set(categories.map(cat => normalizeCategorySlug(cat)))]
      .sort()
      .filter(cat => cat && cat.trim() !== '')
    : [];

  // Função: Link sempre com slug normalizado
  const getCategoryLink = (categorySlug: string) => {
    return `/blog/category/${categorySlug}`;
  };

  // Função: Display name traduzido
  const getCategoryDisplay = (categorySlug: string) => {
    return locale ? getCategoryDisplayName(categorySlug, locale) : categorySlug;
  };

  return (
    <section className="">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          {title || t('title')}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {processedCategories.map((categorySlug) => {
            const categoryLink = getCategoryLink(categorySlug);
            const categoryDisplay = getCategoryDisplay(categorySlug);

            return (
              <Button
                key={`${locale || 'default'}-${categorySlug}`}
                asChild
                variant="outline"
                size="lg"
                className="px-6 py-3 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 dark:hover:text-blue-300 transition-colors"
              >
                <Link href={categoryLink}>
                  {categoryDisplay}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}