// src/app/[locale]/HomePageContent.tsx

'use client'

import { Header } from "@/components/Header";
import { Carousel } from "@/components/BannerCarousel";
import { Footer } from "@/components/Footer";
import BlogCarousel from '@/app/features/blog/components/BlogCarousel';
import { Highlights } from "@/components/Highlights";
import { MissionVisionValuesGrid } from "@/components/MissionVisionValuesGrid";
import { StatsHighlight } from "@/components/StatsHighlight";
import CustomersCarousel from "@/components/CustomersCarousel";
import Contact from "@/components/Contact";
import { Testimonials } from "@/components/Testimonials";
import { SupportedLocale } from "@/app/features/blog/lib/blog-config";

// Tipo para os posts
type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  locale: SupportedLocale;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
};

interface HomePageContentProps {
  blogPosts: PostMeta[];
  locale: SupportedLocale;
}

export function HomePageContent({ blogPosts, locale }: HomePageContentProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative">
        {/* Carousel Section */}
        <div className="relative">
          <Carousel />

          {/* Highlights Section - Desktop (Overlapping) */}
          <div className="hidden lg:block absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <Highlights />
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section - Mobile/Tablet */}
        <div className="lg:hidden bg-secondary py-14">
          <div className="container mx-auto px-4">
            <Highlights />
          </div>
        </div>

        {/* About Section */}
        <div>
          <StatsHighlight />
        </div>

        {/* Missão, Visão e Valores */}
        <div className="pt-10">
          <MissionVisionValuesGrid maxValues={4} />
        </div>

        {/* Blog Section */}
        <div>
          <BlogCarousel
            posts={blogPosts}
            locale={locale}
            maxPosts={3}
            showViewAllButton={false}
            showHeader={true}
          />
        </div>

        {/* Testimonials Section */}
        <div>
          <Testimonials />
        </div>

        {/* Contact Section */}
        <Contact />

        {/* Customers Section */}
        <div className="pt-16 lg:pt-20">
          <CustomersCarousel />
        </div>
      </main>

      <Footer />
    </div>
  );
}