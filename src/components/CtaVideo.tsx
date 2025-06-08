// src/components/CtaVideo.tsx

import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useTranslations } from 'next-intl';

export function CtaVideo() {
  const t = useTranslations('productsServices.ctaVideo');

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-secondary flex flex-col items-center pb-20 pt-16">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
          {t('subtitle')}
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
          {t('title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto px-4">
        {/* Coluna 1 - Vídeo */}
        <div className="aspect-video w-full max-w-3xl mx-auto">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/VeUaUfZJIiY"
            title="Como a GN1 pode te ajudar? Conheça nossos serviços! | Publicação de ponta a ponta"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Coluna 2 - Conteúdo */}
        <div className="flex flex-col gap-6 justify-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('description')}
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{t('features.specializedTeam')}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{t('features.highQualityStandard')}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{t('features.yearsExperience')}</span>
            </li>
          </ul>

          <Button
            onClick={scrollToContact}
            className="w-full md:w-fit"
            variant="default"
            size="lg"
          >
            {t('contactButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}