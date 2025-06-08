// src/components/MissionVisionValuesGrid.tsx

"use client"

import { Card, CardContent } from "./ui/card"
import { Award, Eye, Target, Clock, Heart, Users, Focus, BarChart3 } from "lucide-react"
import { useTranslations } from 'next-intl'

interface MissionVisionValuesGridProps {
  /** Número de valores a serem exibidos. Se não informado, exibe todos os 8 valores */
  maxValues?: number;
  /** Se deve exibir o cabeçalho da seção (título e subtítulo). Default: true */
  showHeader?: boolean;
  /** Classes CSS customizadas para a seção */
  className?: string;
}

export function MissionVisionValuesGrid({ maxValues, showHeader = true, className }: MissionVisionValuesGridProps) {
  const t = useTranslations('AboutPages.missionVisionValues');

  const allValues = [
    {
      id: 1,
      icon: Award,
      title: t('values.items.excellence.title'),
      description: t('values.items.excellence.description'),
      gradient: "from-blue-400 to-blue-500"
    },
    {
      id: 2,
      icon: Eye,
      title: t('values.items.transparency.title'),
      description: t('values.items.transparency.description'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      icon: Target,
      title: t('values.items.commitment.title'),
      description: t('values.items.commitment.description'),
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: 4,
      icon: Clock,
      title: t('values.items.punctuality.title'),
      description: t('values.items.punctuality.description'),
      gradient: "from-blue-700 to-blue-800"
    },
    {
      id: 5,
      icon: Heart,
      title: t('values.items.humanized.title'),
      description: t('values.items.humanized.description'),
      gradient: "from-blue-400 to-blue-500"
    },
    {
      id: 6,
      icon: Users,
      title: t('values.items.membership.title'),
      description: t('values.items.membership.description'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 7,
      icon: Focus,
      title: t('values.items.consistency.title'),
      description: t('values.items.consistency.description'),
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: 8,
      icon: BarChart3,
      title: t('values.items.analytical.title'),
      description: t('values.items.analytical.description'),
      gradient: "from-blue-700 to-blue-800"
    }
  ];

  // Filtra os valores baseado no maxValues prop
  const values = maxValues ? allValues.slice(0, maxValues) : allValues;

  // Determina o número de colunas baseado na quantidade de valores
  const getGridCols = () => {
    const count = values.length;
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count <= 4) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <section className={`py-12 ${showHeader ? 'bg-secondary' : ''} ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título seção - Condicional */}
          {showHeader && (
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
                {t('home.subtitle')}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
                {t('home.title')}{" "}
                <span className="text-blue-700 dark:text-blue-400">
                  {t('home.highlightText')}
                </span>
              </h2>
            </div>
          )}

          {/* Grid */}
          <div className={`grid ${getGridCols()} gap-6`}>
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={value.id}
                  className="group hover:shadow-lg transition-all duration-500 border-0 shadow hover:-translate-y-1 bg-card backdrop-blur-sm relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300 mb-4 xl:mb-0`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {value.description}
                        </p>
                      </div>
                    </div>

                    {/* Elemento decorativo */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg`}></div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}