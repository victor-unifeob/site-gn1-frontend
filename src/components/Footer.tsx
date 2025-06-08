// src/components/Footer.tsx

"use client"

import { MoveUpRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/gn1.oficial/", icon: FaInstagram },
  { name: "Facebook", href: "https://www.facebook.com/GN1Sistemas/", icon: FaFacebook },
  { name: "Twitter", href: "https://x.com/GN1Oficial", icon: FaTwitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/genesis-network-gn1/", icon: FaLinkedin },
  { name: "YouTube", href: "https://www.youtube.com/@gn1.oficial", icon: FaYoutube },
];

// Definindo tipos para os links de navegação
type NavigationItem = {
  name: string;
  href: string;
  external: boolean;
};

export function Footer() {
  const t = useTranslations('Footer');

  // Definindo as rotas - SEMPRE EM INGLÊS
  const navigation = {
    services: [
      { name: t('navigation.services.books'), href: "/services/books", external: false },
      { name: t('navigation.services.diagramming'), href: "/services/layout", external: false },
      { name: t('navigation.services.xmlConversion'), href: "/services/xml-conversion", external: false },
      { name: t('navigation.services.htmlConversion'), href: "/services/html-conversion", external: false },
      { name: t('navigation.services.ebookConversion'), href: "/services/ebook-epub-mobi-conversion", external: false },
      { name: t('navigation.services.revision'), href: "/services/review-translation-standardization", external: false },
      { name: t('navigation.services.doiAttribution'), href: "/services/doi-attribution", external: false },
      { name: t('navigation.services.plagiarismCheck'), href: "/services/plagiarism-check", external: false },
      { name: t('navigation.services.digitization'), href: "/services/digitization-books-journals", external: false },
    ] satisfies NavigationItem[],
    softwares: [
      { name: "GnPapers", href: "/systems/gnpapers", external: false },
      { name: "GnPublish", href: "/systems/gnpublish", external: false },
    ] satisfies NavigationItem[],
    institutional: [
      { name: t('navigation.institutional.history'), href: "/about/our-history", external: false },
      { name: t('navigation.institutional.clients'), href: "/about/our-clients", external: false },
      { name: t('navigation.institutional.team'), href: "/about/team", external: false },
      { name: t('navigation.institutional.mission'), href: "/about/mission-vision-values", external: false },
      { name: t('navigation.institutional.privacy'), href: "/about/privacy", external: false },
    ] satisfies NavigationItem[],
    contact: [
      { name: t('navigation.contact.contact'), href: "/about/contact", external: false },
      { name: t('navigation.contact.support'), href: "https://suporte.gn1.com.br", external: false },
      { name: t('navigation.contact.ombudsman'), href: "/about/contact", external: false },
      { name: t('navigation.contact.hr'), href: "/about/contact", external: false },
    ] satisfies NavigationItem[],
  };

  // Componente para renderizar links com verificação de tipo
  const NavigationLink = ({ item }: { item: NavigationItem }) => {
    // Para links externos ou âncoras, use um link normal
    if (item.external || item.href === "#") {
      return (
        <a
          className="flex rounded-md text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-700 dark:hover:text-blue-400"
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
        >
          <span>{item.name}</span>
          {item.external && (
            <MoveUpRight
              aria-hidden="true"
              className="ml-1 aspect-square size-3 rounded-full bg-gray-100 p-px text-gray-900 dark:bg-gray-500/20 dark:text-gray-300 shrink-0"
            />
          )}
        </a>
      );
    }

    // Para links internos, use o Link internacionalizado
    return (
      <Link
        className="flex rounded-md text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-700 dark:hover:text-blue-400"
        href={item.href as any} // Type assertion para contornar problemas de tipagem
      >
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <footer id="footer">
      <div className="container mx-auto px-4 pb-8 pt-16 md:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-20">
          <div className="space-y-5 lg:pr-10">
            <Logo />
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              {t('description')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-14 sm:gap-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
            {/* Serviços */}
            <div className="grid grid-cols-2 gap-8">
              <section aria-labelledby="footer-services">
                <h2
                  id="footer-services"
                  className="text-sm font-semibold leading-6 text-accent-foreground"
                >
                  {t('sections.services')}
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Links serviços"
                >
                  {navigation.services.map((item) => (
                    <li key={item.name} className="w-fit">
                      <NavigationLink item={item} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sistemas */}
              <section aria-labelledby="footer-social-media">
                <h2
                  id="footer-social-media"
                  className="text-sm font-semibold leading-6 text-accent-foreground"
                >
                  {t('sections.systems')}
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Links sistemas"
                >
                  {navigation.softwares.map((item) => (
                    <li key={item.name} className="w-fit">
                      <NavigationLink item={item} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Institucional */}
              <section aria-labelledby="footer-institutional">
                <h2
                  id="footer-institutional"
                  className="text-sm font-semibold leading-6 text-accent-foreground"
                >
                  {t('sections.institutional')}
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Links institucional"
                >
                  {navigation.institutional.map((item) => (
                    <li key={item.name} className="w-fit">
                      <NavigationLink item={item} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Fale conosco */}
              <section aria-labelledby="footer-contact">
                <h2
                  id="footer-contact"
                  className="text-sm font-semibold leading-6 text-accent-foreground"
                >
                  {t('sections.contact')}
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Links fale conosco"
                >
                  {navigation.contact.map((item) => (
                    <li key={item.name} className="w-fit">
                      <NavigationLink item={item} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:mt-20 sm:flex-row lg:mt-24 dark:border-gray-800">
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}