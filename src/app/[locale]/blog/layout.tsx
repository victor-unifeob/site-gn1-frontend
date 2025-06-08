// src/app/[locale]/blog/layout.tsx

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import React from 'react';
import { SupportedLocale } from '@/app/features/blog/lib/blog-config';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/app/features/blog/lib/blog-utils';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Layout que envolve todas as páginas do blog.
 * Integrado ao design da GN1 com Header/Footer e considerando o header fixo.
 * Agora com suporte completo a multi-língue.
 */
export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  const { locale } = await params;

  // Validação do locale
  if (!isValidLocale(locale)) {
    console.error(`Locale inválido recebido no layout do blog: ${locale}`);
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* 
          pt-24: Considera o header fixo (h-18 = 72px + margem extra)
          Container com max-width consistente com o resto do site
        */}
        <div className="pt-24">
          {/* Adiciona contexto de locale para componentes filhos */}
          <div data-locale={locale} className="blog-content">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}