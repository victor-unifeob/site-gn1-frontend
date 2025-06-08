// src/components/ContactGrid.tsx

import { Card, CardContent } from "./ui/card"
import { Headset, Mail, Users, ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'

export function ContactGrid() {
  const t = useTranslations('AboutPages.supportChannels')

  const items = [
    {
      id: 1,
      icon: Headset,
      title: t('support.title'),
      description: t('support.description'),
      button: t('support.button'),
      url: t('support.url'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Mail,
      title: t('ombudsman.title'),
      description: t('ombudsman.description'),
      button: t('ombudsman.button'),
      email: t('ombudsman.email'),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      icon: Users,
      title: t('humanResources.title'),
      description: t('humanResources.description'),
      button: t('humanResources.button'),
      email: t('humanResources.email'),
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                  {/* Condição corrigida para exibir botão ou e-mail */}
                  {item.url ? (
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                    >
                      {item.button}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  ) : (
                    <a
                      href={`mailto:${item.email}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                    >
                      {item.button}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}