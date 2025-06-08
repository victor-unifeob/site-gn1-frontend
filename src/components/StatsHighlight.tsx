// src/components/StatsHighlight.tsx

"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOutCubic))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString('pt-BR')}</span>
}

export function StatsHighlight() {
  const t = useTranslations('StatsHighlight')

  const stats = [
    {
      id: 1,
      value: 176,
      label: t('stats.activeClients'),
      suffix: "+"
    },
    {
      id: 2,
      value: 12000,
      label: t('stats.xmlsProduced'),
      suffix: "+"
    },
    {
      id: 3,
      value: 50,
      label: t('stats.journalSites'),
      suffix: "+"
    },
    {
      id: 4,
      value: 72000,
      label: t('stats.doisAssigned'),
      suffix: "+"
    }
  ]

  return (
    <section className="py-20 lg:pt-72">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left Side - Main Content */}
            <div className="flex flex-col items-center lg:items-baseline">
              <div className="flex items-end">
                <div className="text-8xl lg:text-9xl font-extrabold">
                  24
                </div>
                <div className="text-sm font-bold leading-tight uppercase text-gray-500 dark:text-gray-400 ml-4 mb-3">
                  {t('yearsExperience')}
                </div>
              </div>

              <div className="mb-10 mt-4 text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {t('mainTitle')}{" "}
                  <span className="text-blue-700 dark:text-blue-400">
                    {t('highlightText')}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Side - Stats Grid */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="text-center group"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Value */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="mb-3">
                      <span className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 leading-none block">
                        {stat.suffix}
                        <AnimatedCounter value={stat.value} />
                      </span>
                    </div>

                    {/* Label */}
                    <div className="text-sm font-semibold tracking-wide leading-tight uppercase text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}