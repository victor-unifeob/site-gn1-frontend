// src/components/ProductServicesGrid.tsx

'use client'

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProductService {
  id: string;
  name: string;
  image: string;
  category: 'services' | 'systems' | 'indexers';
  url?: string;
}

const productServices: ProductService[] = [
  // Serviços
  {
    id: 'books',
    name: 'Livros',
    image: '/thumbnails/services/books.webp',
    category: 'services',
    url: '/services/books'
  },
  {
    id: 'diagramming',
    name: 'Diagramação',
    image: '/thumbnails/services/layout.webp',
    category: 'services',
    url: '/services/layout'
  },
  {
    id: 'xmlConversion',
    name: 'Conversão XML',
    image: '/thumbnails/services/xml-conversion.webp',
    category: 'services',
    url: '/services/xml-conversion'
  },
  {
    id: 'htmlConversion',
    name: 'Conversão HTML',
    image: '/thumbnails/services/html-conversion.webp',
    category: 'services',
    url: '/services/html-conversion'
  },
  {
    id: 'ebookConversion',
    name: 'Conversão eBook, ePub e MOBI',
    image: '/thumbnails/services/ebook-epub-mobi-conversion.webp',
    category: 'services',
    url: '/services/ebook-epub-mobi-conversion'
  },
  {
    id: 'revision',
    name: 'Revisão, tradução e normalização',
    image: '/thumbnails/services/review-translation-standardization.webp',
    category: 'services',
    url: '/services/review-translation-standardization'
  },
  {
    id: 'doiAttribution',
    name: 'Atribuição de DOI',
    image: '/thumbnails/services/doi-attribution.webp',
    category: 'services',
    url: '/services/doi-attribution'
  },
  {
    id: 'plagiarismCheck',
    name: 'Verificação de plágio',
    image: '/thumbnails/services/plagiarism-check.webp',
    category: 'services',
    url: '/services/plagiarism-check'
  },
  {
    id: 'digitization',
    name: 'Digitalização de livros e revistas',
    image: '/thumbnails/services/digitization-books-journals.webp',
    category: 'services',
    url: '/services/digitization-books-journals'
  },
  // Sistemas
  {
    id: 'gnpapers',
    name: 'GnPapers',
    image: '/thumbnails/systems/gnpapers.webp',
    category: 'systems',
    url: '/systems/gnpapers'
  },
  {
    id: 'gnpublish',
    name: 'GnPublish',
    image: '/thumbnails/systems/gnpublish.webp',
    category: 'systems',
    url: '/systems/gnpublish'
  },
  // Indexadores
  {
    id: 'ebooksGuides',
    name: 'eBooks - Guias de Indexação',
    image: '/thumbnails/ebooks/ebook-pacote.webp',
    category: 'indexers',
    url: '/indexers/indexing-guides'
  },
  {
    id: 'mainDatabases',
    name: 'Principais Bases',
    image: '/thumbnails/indexers/indexers.webp',
    category: 'indexers',
    url: '/indexers/main-databases'
  }
];

type FilterCategory = 'all' | 'services' | 'systems' | 'indexers';

export default function ProductServicesGrid() {
  const t = useTranslations('productsServices');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Verificar parâmetro de filtro na URL
  useEffect(() => {
    const filterParam = searchParams.get('filter') as FilterCategory;
    if (filterParam && ['all', 'services', 'systems', 'indexers'].includes(filterParam)) {
      setActiveFilter(filterParam);
    }
  }, [searchParams]);

  const filteredProducts = productServices.filter(product =>
    activeFilter === 'all' || product.category === activeFilter
  );

  const filterButtons: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t('menuItems.all') },
    { key: 'services', label: t('menuItems.services') },
    { key: 'systems', label: t('menuItems.systems') },
    { key: 'indexers', label: t('menuItems.indexers') }
  ];

  // Função para construir URL com locale
  const buildLocalizedUrl = (url: string) => {
    // Se a URL já começa com http, é externa
    if (url.startsWith('http')) {
      return url;
    }
    // Construir URL com locale
    return `/${locale}${url}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filterButtons.map((filter) => (
          <Button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            variant={activeFilter === filter.key ? "default" : "outline"}
            className={`transition-all duration-300 ${activeFilter === filter.key
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
              }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Grid de produtos/serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden p-0">
            {/* Imagem no topo */}
            <div className="w-full h-48 relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
              <Image
                src={product.image}
                alt={`${t(`items.${product.id}.name`) || product.name} thumbnail`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback para quando a imagem não existe
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    target.style.display = 'none';
                    parent.innerHTML = `<div class="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl">${(t(`items.${product.id}.name`) || product.name).charAt(0)}</div>`;
                  }
                }}
              />
            </div>

            <div className="flex flex-col flex-grow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center leading-tight">
                  {t(`items.${product.id}.name`) || product.name}
                </CardTitle>
              </CardHeader>

              <CardFooter className="py-6">
                {product.url && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-600 dark:group-hover:text-blue-300 transition-colors"
                  >
                    <a
                      href={buildLocalizedUrl(product.url)}
                      target={product.url.startsWith('http') ? "_blank" : "_self"}
                      rel={product.url.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-center gap-2"
                    >
                      {t('accessButton')}
                      {product.url.startsWith('http') && <ExternalLink className="w-4 h-4" />}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}