// src/app/[locale]/blog/[slug]/page.tsx

import { Button } from '@/components/ui/button';
import RelatedPosts from '@/app/features/blog/components/RelatedPosts';
import {
  getAllPosts,
  getPostBySlug,
  generateStaticParams as generateBlogStaticParams,
  getRelatedPostsForSlug,
  getPostTranslations
} from '@/app/features/blog/lib/blog';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { BLOG_CONFIG, SupportedLocale } from '../../../features/blog/lib/blog-config';
import { Link } from '@/i18n/navigation';
import Contact from '@/components/Contact';
import { notFound } from 'next/navigation';
import { isValidLocale, formatDate, generateMultilingualSEOData } from '@/app/features/blog/lib/blog-utils';
import { getCategoryDisplayName } from '@/app/features/blog/lib/category-display-names';

// Definição de tipos para os parâmetros
interface BlogPostParams {
  slug: string;
  locale: string;
}

interface BlogPostPageProps {
  params: Promise<BlogPostParams>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug, locale } = await params;

    if (!isValidLocale(locale)) {
      return {
        title: 'Post não encontrado',
        description: 'O post solicitado não foi encontrado.'
      };
    }

    const typedLocale = locale as SupportedLocale;
    const post = await getPostBySlug(slug, typedLocale);

    // Buscar traduções disponíveis
    const translations = getPostTranslations(slug, typedLocale);
    const seoData = generateMultilingualSEOData(post.meta, translations);

    return {
      title: `GN1 - ${post.meta.title}`,
      description: post.meta.description,
      keywords: post.meta.tags?.join(', '),
      openGraph: {
        title: post.meta.title,
        description: post.meta.description,
        url: seoData.canonicalUrl,
        type: 'article',
        images: post.meta.coverImage ? [{
          url: post.meta.coverImage,
          width: 1200,
          height: 630,
          alt: post.meta.title
        }] : [],
        publishedTime: post.meta.date,
        authors: [post.meta.author],
        section: post.meta.category,
        tags: post.meta.tags,
        locale: seoData.ogLocale,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta.title,
        description: post.meta.description,
        images: post.meta.coverImage ? [post.meta.coverImage] : [],
      },
      alternates: {
        canonical: seoData.canonicalUrl,
        languages: seoData.hreflang,
      },
      other: {
        'article:author': post.meta.author,
        'article:published_time': post.meta.date,
        'article:section': post.meta.category,
        'article:tag': post.meta.tags?.join(',') || '',
      }
    };
  } catch (error) {
    const { locale } = await params;
    const typedLocale = isValidLocale(locale) ? locale as SupportedLocale : 'pt';

    return {
      title: 'GN1 - Post não encontrado',
      description: 'O post solicitado não foi encontrado.',
      alternates: {
        canonical: `${BLOG_CONFIG.BASE_URL}/${typedLocale}/blog`,
      },
    };
  }
}

export async function generateStaticParams(): Promise<BlogPostParams[]> {
  try {
    const blogParams = generateBlogStaticParams();

    // Converter para o formato esperado pela página
    const params: BlogPostParams[] = blogParams.map(param => ({
      locale: param.locale,
      slug: param.slug
    }));

    return params;
  } catch (error) {
    // Fallback em caso de erro
    return BLOG_CONFIG.SUPPORTED_LOCALES.map((locale: SupportedLocale) => ({
      locale,
      slug: BLOG_CONFIG.FALLBACK_SLUG
    }));
  }
}

// Mantenha como estático, mas com parâmetros gerados corretamente
export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  try {
    const { slug, locale } = await params;

    // Validação do locale
    if (!isValidLocale(locale)) {
      notFound();
    }

    const typedLocale = locale as SupportedLocale;
    const t = await getTranslations({ locale: typedLocale, namespace: 'BlogPost' });

    // Buscar o post com fallback habilitado
    const post = await getPostBySlug(slug, typedLocale, true);

    // Buscar posts relacionados
    const relatedPosts = getRelatedPostsForSlug(slug, typedLocale, 2, true);

    // Buscar traduções disponíveis
    const availableTranslations = getPostTranslations(slug, typedLocale);

    // URL completa do post para compartilhamento
    const postUrl = `${BLOG_CONFIG.BASE_URL}/${typedLocale}/blog/${post.slug}`;

    // Função para verificar se a data é válida
    const isValidDate = (dateString: string): boolean => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    };

    return (
      <>
        <div className="container mx-auto px-4 space-y-8 pt-5">

          {/* Conteúdo do post */}
          <div className="max-w-4xl mx-auto">
            <article className="overflow-hidden">
              {/* Imagem de capa */}
              {post.meta.coverImage && (
                <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.meta.coverImage}
                    alt={post.meta.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Badge de post em destaque */}
                  {post.meta.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-400 rounded-full">
                        ⭐ {t('featured.badge')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-8">
                {/* Detalhes do post */}
                <header className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{post.meta.author}</span>
                    {post.meta.date && isValidDate(post.meta.date) && (
                      <>
                        <span>•</span>
                        <time dateTime={post.meta.date}>
                          {formatDate(post.meta.date, typedLocale)}
                        </time>
                      </>
                    )}
                    {post.meta.category && (
                      <>
                        <span>•</span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                          {getCategoryDisplayName(post.meta.category, typedLocale)}
                        </span>
                      </>
                    )}
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {post.meta.title}
                  </h1>

                  {post.meta.description && (
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {post.meta.description}
                    </p>
                  )}

                  {/* Tags do post */}
                  {post.meta.tags && post.meta.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                {/* Linha divisória */}
                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Conteúdo do post renderizado como HTML */}
                <div
                  className="prose dark:prose-invert max-w-none w-full prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

                {/* Seção de Compartilhar */}
                <section className="bg-secondary rounded-lg p-8 mt-16">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {t('share.title')}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('share.facebook')}
                      >
                        <FaFacebook size={16} />
                        <span>Facebook</span>
                      </a>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.meta.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('share.twitter')}
                      >
                        <FaTwitter size={16} />
                        <span>Twitter</span>
                      </a>
                    </Button>

                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('share.linkedin')}
                      >
                        <FaLinkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    </Button>

                  </div>
                </section>


              </div>
            </article>

            {/* Seção de Posts Relacionados */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <RelatedPosts
                  currentPostSlug={post.slug}
                  currentPost={post.meta}
                  posts={relatedPosts}
                  title={t('related.title')}
                  maxPosts={2}
                  locale={typedLocale}
                />
              </div>
            )}
          </div>
        </div>

        {/* Seção de contato */}
        <div className="pt-24">
          <Contact />
        </div>
      </>
    );
  } catch (error) {
    const { locale } = await params;
    const typedLocale = isValidLocale(locale) ? locale as SupportedLocale : 'pt';
    const t = await getTranslations({ locale: typedLocale, namespace: 'BlogPost' });

    // Página de fallback para post não encontrado
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t('notFound.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              {t('notFound.description')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {t('notFound.backToBlog')}
              </Link>

              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {t('notFound.backToHome')}
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}