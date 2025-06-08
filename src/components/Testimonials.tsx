// src/components/Testimonials.tsx

"use client"

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Quote, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import type { CarouselApi } from '@/components/ui/carousel';

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const testimonials = [
    {
      name: t('testimonials.clemax.name'),
      role: t('testimonials.clemax.role'),
      content: t('testimonials.clemax.content'),
      image: '/testimonial/dr-clemax-couto-santanna.webp',
    },
    {
      name: t('testimonials.antonio.name'),
      role: t('testimonials.antonio.role'),
      content: t('testimonials.antonio.content'),
      image: '/testimonial/dr-antonio-jose-de-almeida-filho.webp',
    },
    {
      name: t('testimonials.jose.name'),
      role: t('testimonials.jose.role'),
      content: t('testimonials.jose.content'),
      image: '/testimonial/dr-jose-eduardo-lutaif-dolci.webp',
    },
    {
      name: t('testimonials.domingo.name'),
      role: t('testimonials.domingo.role'),
      content: t('testimonials.domingo.content'),
      image: '/testimonial/dr-domingo-braile.webp',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateButtonStates = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateButtonStates();
    api.on("select", updateButtonStates);

    return () => {
      api.off("select", updateButtonStates);
    };
  }, [api]);

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Componente interno para acessar o contexto do carousel
  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="bg-secondary flex flex-col items-center pb-20 pt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            {t('title')}
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 px-2 pb-6">
              {testimonials.map((testimonial, index) => {
                const isExpanded = expandedCards.has(index);
                const shouldTruncate = testimonial.content.length > 200;
                const hasImageError = imageErrors.has(index);
                const shouldShowImage = testimonial.image && !hasImageError;

                return (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className={`${isExpanded ? 'h-auto min-h-[400px]' : 'h-[400px]'} bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all duration-300 flex flex-col`}>
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Quote Icon */}
                        <div className="mb-4">
                          <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>

                        {/* Content */}
                        <div className="flex-grow mb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            {isExpanded || !shouldTruncate
                              ? testimonial.content
                              : truncateText(testimonial.content)
                            }
                          </p>

                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpanded(index)}
                              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {isExpanded ? t('readLess') : t('readMore')}
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Author Info */}
                        <div className={`${isExpanded ? 'mt-6' : 'mt-auto'}`}>
                          <div className="h-px bg-gradient-to-r from-blue-600 to-transparent mb-4 dark:from-blue-400"></div>
                          <div className="flex items-center gap-3">
                            {/* Avatar com imagem ou iniciais como fallback */}
                            <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                              {shouldShowImage ? (
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(index)}
                                />
                              ) : (
                                testimonial.name.split(' ').map(n => n[0]).slice(0, 2).join('')
                              )}
                            </div>
                            {/* Container do texto com quebra de linha natural */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm break-words leading-tight">
                                {testimonial.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 break-words leading-tight">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation Buttons - Mesmo estilo do BlogSection */}
            <div className="flex justify-end gap-2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 hover:bg-white cursor-pointer transition-all duration-200"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 hover:bg-white cursor-pointer transition-all duration-200"
                onClick={scrollNext}
                disabled={!canScrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}