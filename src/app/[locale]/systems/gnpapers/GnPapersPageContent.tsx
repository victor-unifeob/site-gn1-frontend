// src/app/[locale]/systems/gnpapers/GnPapersPageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { GnPapersCardsGrid } from "@/components/gnpapers/GnPapersCardsGrid";
import { Check } from "lucide-react";
import { GnPapersImagesShowcase } from "@/components/gnpapers/GnPapersShowcase";

export function GnPapersPageContent() {
  const t = useTranslations('Systems.gnpapers');
  const tCommon = useTranslations('Common');

  const authorFeatures = [
    {
      title: t('authorFeatures.items.suggestions.title'),
      description: t('authorFeatures.items.suggestions.description')
    },
    {
      title: t('authorFeatures.items.completeRecord.title'),
      description: t('authorFeatures.items.completeRecord.description')
    },
    {
      title: t('authorFeatures.items.compliance.title'),
      description: t('authorFeatures.items.compliance.description')
    },
    {
      title: t('authorFeatures.items.orcid.title'),
      description: t('authorFeatures.items.orcid.description')
    },
    {
      title: t('authorFeatures.items.decs.title'),
      description: t('authorFeatures.items.decs.description')
    },
    {
      title: t('authorFeatures.items.qualityStandard.title'),
      description: t('authorFeatures.items.qualityStandard.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-18"> {/* Offset para o header fixo */}
        {/* Banner Section */}
        <Banner
          title={t('hero.title')}
          variant="color"
          backgroundColor="bg-blue-900"
          overlayImage="/patterns/map-3.webp"
        />

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-start">

              {/* Left Column - Title */}
              <div className="space-y-8 max-w-[550px]">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 border-l-4 border-blue-600 pl-6">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold"
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
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 px-8 py-3 text-base font-semibold"
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

        <GnPapersCardsGrid />

        <GnPapersImagesShowcase />

        {/* Author Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
                  {t('authorFeatures.subtitle')}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  {t('authorFeatures.title')}
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {authorFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    {/* Check Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
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