// src/components/BannerCarousel.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export function Carousel() {
  const t = useTranslations('BannerCarousel');

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      imageUrl: "/banners/banner-1-home.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleItems = carouselItems.length > 1;

  const startTimer = useCallback(() => {
    // Só inicia o timer se houver múltiplos itens
    if (!hasMultipleItems) return null;

    return setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // 20 segundos
  }, [hasMultipleItems]);

  useEffect(() => {
    const timer = startTimer();
    if (timer) {
      return () => clearInterval(timer);
    }
  }, [currentIndex, startTimer]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="min-w-full h-[700px] relative"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6 px-4 lg:px-8">{item.title}</h2>
              <p className="text-md lg:text-xl text-center px-8 lg:px-52">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação - só aparecem se houver múltiplos itens */}
      {hasMultipleItems && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicadores de posição - só aparecem se houver múltiplos itens */}
      {hasMultipleItems && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}