// src/components/EbooksGrid.tsx

'use client'

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Gift } from "lucide-react";
import Image from "next/image";

interface Ebook {
  id: string;
  name: string;
  image: string;
  isPackage?: boolean;
  url?: string;
}

const ebooks: Ebook[] = [
  {
    id: 'ebook1',
    name: 'eBook 1',
    image: '/thumbnails/ebooks/ebook-1-orientacoes-indexacao.webp',
    url: 'https://pay.kiwify.com.br/Ykr6P9Y'
  },
  {
    id: 'ebook2',
    name: 'eBook 2',
    image: '/thumbnails/ebooks/ebook-2-orientacoes-para-aplicacao.webp',
    url: 'https://pay.kiwify.com.br/2T0nKCo'
  },
  {
    id: 'package',
    name: 'Pacote Completo',
    image: '/thumbnails/ebooks/ebook-pacote.webp',
    isPackage: true,
    url: 'https://pay.kiwify.com.br/Ph4oc0m'
  }
];

export default function EbooksGrid() {
  const t = useTranslations('Indexers.indexingGuides');

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* Grid de eBooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {ebooks.map((ebook) => (
          <Card key={ebook.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden p-0 relative">
            {/* Badge para pacote */}
            {ebook.isPackage && (
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Gift className="w-3 h-3" />
                MELHOR OFERTA
              </div>
            )}

            {/* Imagem no topo */}
            <div className="w-full h-56 relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 overflow-hidden">
              <Image
                src={ebook.image}
                alt={`${ebook.name} cover`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback para quando a imagem não existe
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-800 dark:to-indigo-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-4xl">📚</div>`;
                }}
              />
            </div>

            <div className="flex flex-col flex-grow p-6">
              <CardHeader className="pb-4 px-0 pt-0">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">
                  {t(`ebooks.${ebook.id}.title`)}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-6 flex-grow px-0">
                <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {t(`ebooks.${ebook.id}.fullContent`)}
                </div>
              </CardContent>

              <CardFooter className="pt-0 mt-auto px-0">
                {ebook.url && (
                  <Button
                    asChild
                    variant={ebook.isPackage ? "default" : "outline"}
                    size="sm"
                    className={`w-full transition-all duration-300 ${ebook.isPackage
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow hover:shadow-lg"
                      : "group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 dark:group-hover:bg-blue-950/30 dark:group-hover:border-blue-600 dark:group-hover:text-blue-300"
                      }`}
                  >
                    <a href={ebook.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      {t('buyButton')}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA final */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
          {t('cta.title')}
        </div>
      </div>
    </div>
  );
}