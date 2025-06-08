'use client'

import { useTranslations } from 'next-intl';
import { Shield, Smartphone, Zap, Database, Code, RefreshCw, Mic } from 'lucide-react';

export function GnPublishTechSpecs() {
  const t = useTranslations('Systems.gnpublish.techSpecs');

  const techFeatures = [
    {
      icon: Shield,
      title: t('features.modernStructure.title'),
      description: t('features.modernStructure.description'),
      details: [
        t('features.modernStructure.details.php'),
        t('features.modernStructure.details.laravel'),
        t('features.modernStructure.details.mysql')
      ]
    },
    {
      icon: Smartphone,
      title: t('features.responsiveDesign.title'),
      description: t('features.responsiveDesign.description'),
      details: [
        t('features.responsiveDesign.details.mobile'),
        t('features.responsiveDesign.details.tablet'),
        t('features.responsiveDesign.details.desktop')
      ]
    },
    {
      icon: Mic,
      title: t('features.newsPodcasts.title'),
      description: t('features.newsPodcasts.description'),
      details: [
        t('features.newsPodcasts.details.events'),
        t('features.newsPodcasts.details.interviews'),
        t('features.newsPodcasts.details.marketing')
      ]
    },
    {
      icon: Database,
      title: t('features.citationFiles.title'),
      description: t('features.citationFiles.description'),
      details: [
        t('features.citationFiles.details.referenceManager'),
        t('features.citationFiles.details.bibtex'),
        t('features.citationFiles.details.endnote')
      ]
    },
    {
      icon: Code,
      title: t('features.seoOptimized.title'),
      description: t('features.seoOptimized.description'),
      details: [
        t('features.seoOptimized.details.google'),
        t('features.seoOptimized.details.bing'),
        t('features.seoOptimized.details.metaTags')
      ]
    },
    {
      icon: RefreshCw,
      title: t('features.contentUpdates.title'),
      description: t('features.contentUpdates.description'),
      details: [
        t('features.contentUpdates.details.dedicatedTeam'),
        t('features.contentUpdates.details.specialists')
      ]
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4">
              {t('subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Tech Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Technical Details */}
                <div className="flex flex-wrap gap-2">
                  {feature.details.map((detail, detailIndex) => (
                    <span
                      key={detailIndex}
                      className="px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                {t('bottomCta')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}