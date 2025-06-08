// src/app/[locale]/about/privacy/PrivacyPageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import { useTranslations } from 'next-intl';

export function PrivacyPageContent() {
  const t = useTranslations('AboutPages.privacy');

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

              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('introduction.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('introduction.description1')}</p>
                  <p>{t('introduction.description2')}</p>
                  <p>{t('introduction.description3')}</p>
                  <p>{t('introduction.description4')}</p>
                </div>
              </div>

              {/* Personal Data Collected */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('dataCollected.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('dataCollected.description1')}</p>
                  <p>{t('dataCollected.description2')}</p>
                  <p>{t('dataCollected.description3')}</p>
                </div>
              </div>

              {/* Data Processing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('dataProcessing.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('dataProcessing.description1')}</p>
                  <p>{t('dataProcessing.description2')}</p>
                  <p>{t('dataProcessing.description3')}</p>
                </div>
              </div>

              {/* Data Sharing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('dataSharing.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('dataSharing.description1')}</p>
                  <p>{t('dataSharing.description2')}</p>
                </div>
              </div>

              {/* Security */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('security.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('security.description1')}</p>
                  <p>{t('security.description2')}</p>
                  <p>{t('security.description3')}</p>
                </div>
              </div>

              {/* User Rights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('userRights.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('userRights.description1')}</p>

                  <div className="space-y-3">
                    <p><strong>{t('userRights.confirmation.title')}:</strong> {t('userRights.confirmation.description')}</p>
                    <p><strong>{t('userRights.alteration.title')}:</strong> {t('userRights.alteration.description')}</p>
                    <p><strong>{t('userRights.deletion.title')}:</strong> {t('userRights.deletion.description')}</p>
                    <p><strong>{t('userRights.portability.title')}:</strong> {t('userRights.portability.description')}</p>
                    <p><strong>{t('userRights.consent.title')}:</strong> {t('userRights.consent.description')}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-blue-600 pl-6">
                  {t('contact.title')}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                  <p>{t('contact.description1')}</p>
                  <p>{t('contact.description2')}</p>
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