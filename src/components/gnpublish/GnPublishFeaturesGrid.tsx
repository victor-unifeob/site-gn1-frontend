"use client"

import { Card, CardContent } from "../ui/card"
import { useTranslations } from 'next-intl'
import { Globe, FileText, Share2, Search, BarChart3, Users } from 'lucide-react'

interface GnPublishFeaturesGridProps {
  /** Classes CSS customizadas para a seção */
  className?: string;
}

export function GnPublishFeaturesGrid({ className }: GnPublishFeaturesGridProps) {
  const t = useTranslations('Systems.gnpublish');

  const features = [
    {
      id: 1,
      icon: Globe,
      title: t('features.items.multilingualSite.title'),
      description: t('features.items.multilingualSite.description'),
      gradient: "from-green-400 to-green-500"
    },
    {
      id: 2,
      icon: FileText,
      title: t('features.items.pdfDownload.title'),
      description: t('features.items.pdfDownload.description'),
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: Share2,
      title: t('features.items.socialSharing.title'),
      description: t('features.items.socialSharing.description'),
      gradient: "from-green-600 to-green-700"
    },
    {
      id: 4,
      icon: Search,
      title: t('features.items.advancedSearch.title'),
      description: t('features.items.advancedSearch.description'),
      gradient: "from-green-400 to-green-500"
    },
    {
      id: 5,
      icon: BarChart3,
      title: t('features.items.analytics.title'),
      description: t('features.items.analytics.description'),
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 6,
      icon: Users,
      title: t('features.items.openPeerReview.title'),
      description: t('features.items.openPeerReview.description'),
      gradient: "from-green-600 to-green-700"
    }
  ];

  return (
    <section className={`py-16 bg-secondary ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título seção */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4">
              {t('features.subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
              {t('features.title')}
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className="group hover:shadow-lg transition-all duration-500 border-0 shadow hover:-translate-y-1 bg-card backdrop-blur-sm relative overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Elemento decorativo */}
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}