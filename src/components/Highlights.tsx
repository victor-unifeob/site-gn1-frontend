// src/components/Highlights.tsx

"use client"

import { Card, CardContent } from "./ui/card"
import { BookOpen, Settings, Database, ArrowRight } from "lucide-react"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export function Highlights() {
  const t = useTranslations('Services')
  const common = useTranslations('Common')
  const locale = useLocale()
  const router = useRouter()

  const handleNavigation = (path: string, filter?: string) => {
    const url = `/${locale}${path}${filter ? `?filter=${filter}` : ''}`
    router.push(url)
  }

  const items = [
    {
      id: 1,
      icon: BookOpen,
      title: t('editorial.title'),
      description: t('editorial.description'),
      path: "/products-services",
      filter: "services", // Adicionar filtro correspondente
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Settings,
      title: t('systems.title'),
      description: t('systems.description'),
      path: "/products-services",
      filter: "systems", // Adicionar filtro correspondente
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      icon: Database,
      title: t('indexers.title'),
      description: t('indexers.description'),
      path: "/products-services",
      filter: "indexers", // Adicionar filtro correspondente
      gradient: "from-red-700 to-red-800"
    }
  ]

  return (
    <div className="w-full">
      {/* Mobile/Tablet Layout */}
      <div className="flex flex-col gap-6 md:hidden">
        {items.map((item) => {
          const IconComponent = item.icon
          return (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <button
                      onClick={() => handleNavigation(item.path, item.filter)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link cursor-pointer"
                    >
                      {common('readMore')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const IconComponent = item.icon
          return (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white dark:bg-gray-800">
              <CardContent className="px-8 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1 text-sm">
                    {item.description}
                  </p>

                  {/* CTA Link */}
                  <button
                    onClick={() => handleNavigation(item.path, item.filter)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link cursor-pointer"
                  >
                    {common('readMore')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}