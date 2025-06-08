// src/app/[locale]/about/mission-vision-values/MissionVisionValuesPageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import { useTranslations } from 'next-intl';
import { MissionVisionValuesGrid } from "@/components/MissionVisionValuesGrid";

export function MissionVisionValuesPageContent() {
  const t = useTranslations('AboutPages.missionVisionValues');

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-18">
        {/* Banner Section */}
        <Banner
          title={t('hero.title')}
          variant="color"
          backgroundColor="bg-blue-900"
          overlayImage="/patterns/map-3.webp"
        />

        {/* Content Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">

              {/* Mission */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('mission.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('mission.description')}</p>
                </div>
              </div>

              {/* Vision */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('vision.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('vision.description')}</p>
                </div>
              </div>

              {/* Values */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 border-l-4 border-blue-600 pl-6">
                  {t('values.title')}
                </h2>
                <div>
                  <MissionVisionValuesGrid showHeader={false} className="" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div id="contact-section">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}