// src/app/[locale]/products-services/ProductsServicesPageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";
import Contact from "@/components/Contact";
import ProductServicesGrid from "@/components/ProductServicesGrid";
import { useTranslations } from 'next-intl';
import { CtaVideo } from "@/components/CtaVideo";

export function ProductsServicesPageContent() {
  const t = useTranslations('productsServices');

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
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-5">
              {/* Título da seção */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-4xl mx-auto">
                  {t('title')}
                </h2>
              </div>

              <ProductServicesGrid />
            </div>
          </div>
        </section>

        <CtaVideo />

        {/* Contact Section */}
        <div id="contact-section">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}