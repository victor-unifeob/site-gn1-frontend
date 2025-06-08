'use client'

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, FileText, Settings, BarChart, Bell, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function GnPublishShowcase() {
  const t = useTranslations('Systems.gnpublish.showcase');
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: t('features.postsManagement.title'),
      description: t('features.postsManagement.description'),
      image: '/screenshots/gnpublish-articles.jpg',
      imageAlt: 'Gestão de artigos no GnPublish',
      icon: FileText
    },
    {
      title: t('features.bannerManagement.title'),
      description: t('features.bannerManagement.description'),
      image: '/screenshots/gnpublish-banners.jpg',
      imageAlt: 'Gestão de banners no GnPublish',
      icon: Settings
    },
    {
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      image: '/screenshots/gnpublish-analytics.jpg',
      imageAlt: 'Estatísticas e analytics do GnPublish',
      icon: BarChart
    },
    {
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description'),
      image: '/screenshots/gnpublish-multilingual.jpg',
      imageAlt: 'Interface multilíngue do GnPublish',
      icon: Globe
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
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-4">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4">
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
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">
                      {t('featureLabel')}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>

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
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-green-400 opacity-50" />
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
                    ? 'bg-green-600 w-8'
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