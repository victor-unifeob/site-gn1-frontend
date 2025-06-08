// src/components/Steps.tsx

"use client"

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { CarouselApi } from '@/components/ui/carousel';

interface StepsProps {
  serviceKey: string; // Key do serviço para buscar os steps específicos
}

export function Steps({ serviceKey }: StepsProps) {
  // Buscar traduções do Header Steps e das páginas específicas dos serviços
  const tSteps = useTranslations('Steps');
  const tServiceSteps = useTranslations(`ServicesPages.${serviceKey}.steps`);

  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Verificar se o serviço tem steps definidos
  const hasSteps = () => {
    try {
      tServiceSteps('items.step1.title');
      return true;
    } catch (error) {
      return false;
    }
  };

  // Buscar todos os steps disponíveis de forma segura
  const getSteps = () => {
    if (!hasSteps()) return [];

    const steps = [];

    // Lista dos steps possíveis baseado no que sabemos que existe
    const stepCounts: Record<string, number> = {
      'Books': 8,
      'layout': 8,
      'digitizationBooksJournals': 5,
      'doiAttribution': 5,
      'ebookEpubMobiConversion': 3,
      'htmlConversion': 5,
      'plagiarismCheck': 4,
      'reviewTranslationStandardization': 4,
      'xmlConversion': 4
    };

    const maxStepsForService = stepCounts[serviceKey] || 0;

    for (let stepIndex = 1; stepIndex <= maxStepsForService; stepIndex++) {
      const stepKey = `step${stepIndex}`;

      try {
        const title = tServiceSteps(`items.${stepKey}.title`);
        const description = tServiceSteps(`items.${stepKey}.description`);

        steps.push({
          id: stepIndex,
          title,
          description
        });
      } catch (error) {
        // Se der erro, parar o loop
        break;
      }
    }

    return steps;
  };

  const steps = getSteps();

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

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  // Se não houver steps, não renderizar o componente
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary flex flex-col items-center pb-20 pt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
            {tSteps('subtitle')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
            {tSteps('title')}
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 px-2 pb-6">
              {steps.map((step) => (
                <CarouselItem key={step.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all duration-300 flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Step Number */}
                      <div className="mb-4">
                        <div className="w-10 h-10 bg-blue-600 dark:bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.id}
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        {step.title}
                      </h3>

                      {/* Content */}
                      <div className="flex-grow">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
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