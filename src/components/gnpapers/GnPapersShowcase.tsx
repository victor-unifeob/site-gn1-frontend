'use client'

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileStack, BarChart, Clock, Settings, Bell, Shield, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function GnPapersImagesShowcase() {
  const t = useTranslations('Systems.gnpapers.showcase');
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: t('features.versions.title'),
      description: t('features.versions.description'),
      image: '/screenshots/gnpapers-versions.jpg',
      imageAlt: 'Sistema de versões do GnPapers',
      icon: FileStack
    },
    {
      title: t('features.reports.title'),
      description: t('features.reports.description'),
      image: '/screenshots/gnpapers-reports.jpg',
      imageAlt: 'Relatórios do GnPapers',
      icon: BarChart
    },
    {
      title: t('features.deadlines.title'),
      description: t('features.deadlines.description'),
      image: '/screenshots/gnpapers-deadlines.jpg',
      imageAlt: 'Controle de prazos do GnPapers',
      icon: Clock
    },
    {
      title: t('features.customization.title'),
      description: t('features.customization.description'),
      image: '/screenshots/gnpapers-customization.jpg',
      imageAlt: 'Personalização do GnPapers',
      icon: Settings
    },
    {
      title: t('features.notifications.title'),
      description: t('features.notifications.description'),
      image: '/screenshots/gnpapers-notifications.jpg',
      imageAlt: 'Sistema de notificações do GnPapers',
      icon: Bell
    },
    {
      title: t('features.accessLevels.title'),
      description: t('features.accessLevels.description'),
      image: '/screenshots/gnpapers-access-levels.jpg',
      imageAlt: 'Níveis de acesso do GnPapers',
      icon: Shield
    },
    {
      title: t('features.suggestions.title'),
      description: t('features.suggestions.description'),
      image: '/screenshots/gnpapers-suggestions.jpg',
      imageAlt: 'Sistema de sugestões e correções do GnPapers',
      icon: MessageSquare
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentFeature = features[currentSlide];
  const IconComponent = currentFeature.icon;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-4">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
              {t('title')}
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
              {/* Content Side */}
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      {t('featureLabel') || 'Recurso em destaque'}
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {currentFeature.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentFeature.description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 hover:bg-white cursor-pointer transition-all duration-200"
                      onClick={prevSlide}
                      disabled={false}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 hover:bg-white cursor-pointer transition-all duration-200"
                      onClick={nextSlide}
                      disabled={false}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Counter */}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="order-1 lg:order-2">
                <div className="relative group">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>

                  {/* Main image container */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={currentFeature.image}
                        alt={currentFeature.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Loading overlay - remover quando imagem carregar */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-blue-400 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-5">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  aria-label={`Ir para item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}