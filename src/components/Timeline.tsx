// src/components/Timeline.tsx

import React from 'react';
import { useTranslations } from 'next-intl';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default function Timeline() {
  const t = useTranslations('AboutPages.ourHistory');

  const timelineItems: TimelineItem[] = [
    {
      year: '2025',
      title: t('timeline.2025.title'),
      description: t('timeline.2025.description')
    },
    {
      year: '2024',
      title: t('timeline.2024.title'),
      description: t('timeline.2024.description')
    },
    {
      year: '2017',
      title: t('timeline.2017.title'),
      description: t('timeline.2017.description')
    },
    {
      year: '2014',
      title: t('timeline.2014.title'),
      description: t('timeline.2014.description')
    },
    {
      year: '2012',
      title: t('timeline.2012.title'),
      description: t('timeline.2012.description')
    },
    {
      year: '2011',
      title: t('timeline.2011.title'),
      description: t('timeline.2011.description')
    },
    {
      year: '2009',
      title: t('timeline.2009.title'),
      description: t('timeline.2009.description')
    },
    {
      year: '2007',
      title: t('timeline.2007.title'),
      description: t('timeline.2007.description')
    },
    {
      year: '2003',
      title: t('timeline.2003.title'),
      description: t('timeline.2003.description')
    },
    {
      year: '2001',
      title: t('timeline.2001.title'),
      description: t('timeline.2001.description')
    },
    {
      year: '1999',
      title: t('timeline.1999.title'),
      description: t('timeline.1999.description')
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Linha vertical principal */}
      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700"></div>

      {timelineItems.map((item, index) => (
        <div
          key={item.year}
          className={`relative flex items-center mb-12 md:mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
          {/* Círculo indicador */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 border-4 border-white rounded-full shadow z-10"></div>

          {/* Conteúdo */}
          <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              {/* Ano */}
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                {item.year}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>

              {/* Descrição */}
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description.split('\n').map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Seta conectora (apenas em desktop) */}
          <div className={`hidden md:block absolute ${index % 2 === 0 ? 'left-1/2 ml-2' : 'right-1/2 mr-2'
            } w-0 h-0 border-t-8 border-b-8 border-transparent ${index % 2 === 0 ? 'border-r-8 border-r-gray-200 dark:border-r-gray-700' : 'border-l-8 border-l-gray-200 dark:border-l-gray-700'
            }`}></div>
        </div>
      ))}

      {/* Mensagem final */}
      <div className="relative mt-16 text-center">
        <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        <div className="ml-20 md:ml-0">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              {t('timeline.conclusion.title')}
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-lg leading-relaxed">
              {t('timeline.conclusion.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}