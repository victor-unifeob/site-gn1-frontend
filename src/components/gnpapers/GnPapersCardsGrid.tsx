"use client"

import { Card, CardContent } from "../ui/card"
import { useTranslations } from 'next-intl'
import { FileText, Users, FileCheck, BarChart3, UserPlus, Globe } from 'lucide-react'

interface GnPapersCardsGridProps {
  /** Classes CSS customizadas para a seção */
  className?: string;
}

export function GnPapersCardsGrid({ className }: GnPapersCardsGridProps) {
  const t = useTranslations('Systems.gnpapers');

  const features = [
    {
      id: 1,
      icon: FileText,
      title: t('features.items.documentProcess.title'),
      description: t('features.items.documentProcess.description'),
      gradient: "from-blue-400 to-blue-500"
    },
    {
      id: 2,
      icon: Users,
      title: t('features.items.doubleBlind.title'),
      description: t('features.items.doubleBlind.description'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      icon: FileCheck,
      title: t('features.items.wordFiles.title'),
      description: t('features.items.wordFiles.description'),
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: 4,
      icon: BarChart3,
      title: t('features.items.realTimeStats.title'),
      description: t('features.items.realTimeStats.description'),
      gradient: "from-blue-400 to-blue-500"
    },
    {
      id: 5,
      icon: UserPlus,
      title: t('features.items.adHocReviewers.title'),
      description: t('features.items.adHocReviewers.description'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 6,
      icon: Globe,
      title: t('features.items.multiLanguage.title'),
      description: t('features.items.multiLanguage.description'),
      gradient: "from-blue-600 to-blue-700"
    }
  ];

  return (
    <section className={`py-16 bg-secondary ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título seção */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
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
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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