// src/app/[locale]/systems/gnpublish/GnPublishPageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { GnPublishFeaturesGrid } from "@/components/gnpublish/GnPublishFeaturesGrid";
import { GnPublishShowcase } from "@/components/gnpublish/GnPublishShowcase";
import { GnPublishTechSpecs } from "@/components/gnpublish/GnPublishTechSpecs";
import { GnPublishTemplates } from "@/components/gnpublish/GnPublishTemplates";

export function GnPublishPageContent() {
  const t = useTranslations('Systems.gnpublish');
  const tCommon = useTranslations('Common');

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-18">
        {/* Banner Section */}
        <Banner
          title={t('hero.title')}
          variant="color"
          backgroundColor="bg-green-900"
          overlayImage="/patterns/map-3.webp"
        />

        {/* Content Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-start">

              {/* Left Column - Title */}
              <div className="space-y-8 max-w-[550px]">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 border-l-4 border-green-600 pl-6">
                    {t('title')}
                  </h2>
                </div>
              </div>

              {/* Right Column - Content and Buttons */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('about.description1')}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('about.description2')}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold"
                    onClick={() => {
                      const contactSection = document.querySelector('#contact-section');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {tCommon('cta.quote')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 px-8 py-3 text-base font-semibold"
                    onClick={() => {
                      window.open('https://api.whatsapp.com/send?phone=5519999005929', '_blank');
                    }}
                  >
                    {tCommon('cta.whatsapp')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GnPublishFeaturesGrid />

        <GnPublishTechSpecs />

        <GnPublishShowcase />

        <GnPublishTemplates />

        {/* Contact Section */}
        <div id="contact-section">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}