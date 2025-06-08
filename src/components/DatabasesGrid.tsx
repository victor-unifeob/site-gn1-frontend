// src/components/DatabasesGrid.tsx

'use client'

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface Database {
  id: string;
  name: string;
  image: string;
  url?: string;
}

const databases: Database[] = [
  {
    id: 'scielo',
    name: 'SciELO',
    image: '/thumbnails/indexers/scielo.webp',
    url: 'https://scielo.org'
  },
  {
    id: 'pmc',
    name: 'PMC',
    image: '/thumbnails/indexers/pmc.webp',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/'
  },
  {
    id: 'pubmed',
    name: 'PubMed/MEDLINE',
    image: '/thumbnails/indexers/medline.webp',
    url: 'https://pubmed.ncbi.nlm.nih.gov/'
  },
  {
    id: 'redalyc',
    name: 'Redalyc',
    image: '/thumbnails/indexers/redalyc.webp',
    url: 'https://www.redalyc.org'
  },
  {
    id: 'doaj',
    name: 'DOAJ',
    image: '/thumbnails/indexers/doaj.webp',
    url: 'https://doaj.org'
  },
  {
    id: 'ebsco',
    name: 'EBSCO',
    image: '/thumbnails/indexers/ebsco.webp',
    url: 'https://www.ebsco.com'
  },
  {
    id: 'pepsic',
    name: 'PePsic',
    image: '/thumbnails/indexers/pepsic.webp',
    url: 'http://pepsic.bvsalud.org'
  },
  {
    id: 'educ',
    name: 'Educ@',
    image: '/thumbnails/indexers/educa.webp',
    url: 'https://www.fcc.org.br/fcc/educ/'
  },
  {
    id: 'lilacs',
    name: 'LILACS',
    image: '/thumbnails/indexers/lilacs.webp',
    url: 'https://lilacs.bvsalud.org'
  },
  {
    id: 'scopus',
    name: 'Scopus',
    image: '/thumbnails/indexers/scopus.webp',
    url: 'https://www.scopus.com'
  },
  {
    id: 'wos',
    name: 'Web of Science',
    image: '/thumbnails/indexers/web-of-science.webp',
    url: 'https://www.webofscience.com'
  }
];

export default function DatabasesGrid() {
  const t = useTranslations('Indexers.mainDatabases.databases');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
      {databases.map((database) => (
        <Card key={database.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden p-0">
          {/* Imagem no topo - sem bordas e cobrindo todo o espaço */}
          <div className="w-full h-48 relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <Image
              src={database.image}
              alt={`${database.name} logo`}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback para quando a imagem não existe
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl">${database.name.charAt(0)}</div>`;
              }}
            />
          </div>

          <div className="flex flex-col flex-grow p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">
                {database.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-4 flex-grow px-0">
              <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {t(`${database.id}.fullContent`)}
              </div>
            </CardContent>

            <CardFooter className="pt-0 mt-auto px-0">
              {database.url && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-600 dark:group-hover:text-blue-300 transition-colors"
                >
                  <a href={database.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    {t('accessButton')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}