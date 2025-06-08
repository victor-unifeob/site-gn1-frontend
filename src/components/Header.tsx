// src/components/Header.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { X, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

// Hook useScroll otimizado
function useScroll(threshold: number = 15) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrolled;
}

// Tipos para melhor organização
interface MenuItem {
  name: string;
  href: string;
  description?: string;
  external: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// ListItem otimizado com melhor acessibilidade
const ListItem = ({
  className,
  title,
  href = "#",
  description,
  children,
  external = false,
  ...props
}: {
  className?: string;
  title: string;
  href?: string;
  description?: string;
  children?: React.ReactNode;
  external?: boolean;
}) => {
  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? {
    href,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {
    href: href as any
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <LinkComponent
          {...linkProps}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover:text-accent-foreground">
            {title}
          </div>
          {(description || children) && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/70">
              {description || children}
            </p>
          )}
        </LinkComponent>
      </NavigationMenuLink>
    </li>
  );
};

// HoverItem para menus hover
const HoverItem = ({
  title,
  href = "#",
  description,
  className,
  external = false,
  ...props
}: {
  title: string;
  href?: string;
  description?: string;
  className?: string;
  external?: boolean;
}) => {
  const LinkComponent = external ? 'a' : Link;
  const linkProps = external ? {
    href,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {
    href: href as any
  };

  return (
    <LinkComponent
      {...linkProps}
      className={cn("flex flex-col items-start space-y-1 p-3 rounded-md hover:bg-accent transition-colors", className)}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      {description && (
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {description}
        </p>
      )}
    </LinkComponent>
  );
};

// HoverMegaMenu para estruturas mais complexas
const HoverMegaMenu = ({
  sections,
  className,
  showSectionTitles = true
}: {
  sections: MenuSection[];
  className?: string;
  showSectionTitles?: boolean;
}) => {
  const columnsClass = sections.length === 1 ? "grid-cols-1" :
    sections.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={cn(`grid gap-6 p-6 ${columnsClass}`, className)}>
      {sections.map((section) => (
        <div key={section.title}>
          {showSectionTitles && (
            <h3 className="mb-3 text-sm font-semibold text-foreground border-b border-border pb-1">
              {section.title}
            </h3>
          )}
          <div className={cn("space-y-1", showSectionTitles ? "" : "pt-0")}>
            {section.items.map((item) => (
              <HoverItem
                key={item.name}
                title={item.name}
                href={item.href}
                description={item.description}
                external={item.external}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente ClickMenu que funciona apenas com clique
const ClickMenu = ({
  trigger,
  children,
  align = "start",
  className,
  menuId,
  openMenuId,
  setOpenMenuId,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  menuId: string;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}) => {
  // Menu está aberto apenas se foi clicado
  const isOpen = openMenuId === menuId;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Se este menu já está aberto, fecha. Senão, abre este e fecha outros
    setOpenMenuId(isOpen ? null : menuId);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('[data-menu-container]')) {
      setOpenMenuId(null);
    }
  }, [setOpenMenuId]);

  useEffect(() => {
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId, handleClickOutside]);

  return (
    <div
      data-menu-container
      className="relative"
    >
      <button
        onClick={handleClick}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none cursor-pointer",
          isOpen && "bg-accent text-accent-foreground"
        )}
        aria-expanded={isOpen}
      >
        {trigger}
        <ChevronDown className={cn(
          "relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-1 z-50 bg-popover text-popover-foreground rounded-md border shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
            align === "start" && "left-0",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "end" && "right-0",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export function Header() {
  const t = useTranslations('Header');
  const [mounted, setMounted] = useState(false);
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaQueryChange = () => setOpen(false);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange();
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  // Configuração customizável da altura do header
  const HEADER_HEIGHT = "h-18";

  // Configuração dos menus estruturada
  const menuConfig = {
    editorialSolutions: {
      sections: [
        {
          title: t('subsections.services'),
          items: [
            { name: t('items.books'), href: "/services/books", description: t('descriptions.books'), external: false },
            { name: t('items.diagramming'), href: "/services/layout", description: t('descriptions.diagramming'), external: false },
            { name: t('items.xmlConversion'), href: "/services/xml-conversion", description: t('descriptions.xmlConversion'), external: false },
            { name: t('items.htmlConversion'), href: "/services/html-conversion", description: t('descriptions.htmlConversion'), external: false },
            { name: t('items.ebookConversion'), href: "/services/ebook-epub-mobi-conversion", description: t('descriptions.ebookConversion'), external: false },
            { name: t('items.revision'), href: "/services/review-translation-standardization", description: t('descriptions.revision'), external: false },
            { name: t('items.doiAttribution'), href: "/services/doi-attribution", description: t('descriptions.doiAttribution'), external: false },
            { name: t('items.plagiarismCheck'), href: "/services/plagiarism-check", description: t('descriptions.plagiarismCheck'), external: false },
            { name: t('items.digitization'), href: "/services/digitization-books-journals", description: t('descriptions.digitization'), external: false },
          ]
        },
        {
          title: t('subsections.systems'),
          items: [
            { name: t('items.GnPapers'), href: "/systems/gnpapers", description: t('descriptions.GnPapers'), external: false },
            { name: t('items.GnPublish'), href: "/systems/gnpublish", description: t('descriptions.GnPublish'), external: false },
          ]
        }
      ]
    },
    indexers: {
      items: [
        { name: t('subsections.ebooksGuides'), href: "/indexers/indexing-guides", description: t('descriptions.ebooksGuides'), external: false },
        { name: t('subsections.mainBases'), href: "/indexers/main-databases", description: t('descriptions.mainBases'), external: false },
      ]
    },
    company: {
      items: [
        { name: t('items.history'), href: "/about/our-history", description: t('descriptions.history'), external: false },
        { name: t('items.mission'), href: "/about/mission-vision-values", description: t('descriptions.mission'), external: false },
        { name: t('items.team'), href: "/about/team", description: t('descriptions.team'), external: false },
        { name: t('items.clients'), href: "/about/our-clients", description: t('descriptions.clients'), external: false },
        { name: t('items.privacy'), href: "/about/privacy", description: t('descriptions.privacy'), external: false },
        { name: t('items.contact'), href: "/about/contact", description: t('descriptions.contact'), external: false },
      ]
    }
  };

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed w-screen inset-x-0 top-0 z-50 transition-all duration-300",
        "bg-background items-center",
        scrolled || open ? "shadow-md" : "shadow-xs",
        open ? "h-auto" : HEADER_HEIGHT,
        "overflow-hidden lg:overflow-visible"
      )}
    >
      <div className="container mx-auto px-4 w-full h-full">

        <div className={cn(
          "flex items-center justify-between w-full",
          HEADER_HEIGHT
        )}>
          <Logo priority />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Soluções Editoriais - ClickMenu */}
            <ClickMenu
              menuId="editorial-solutions"
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              trigger={t('menus.editorialSolutions')}
              className="w-[580px] p-0"
            >
              <HoverMegaMenu sections={menuConfig.editorialSolutions.sections} />
            </ClickMenu>

            {/* Indexadores - ClickMenu */}
            <ClickMenu
              menuId="indexers"
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              trigger={t('menus.indexers')}
              className="w-80 p-2"
            >
              {menuConfig.indexers.items.map((item) => (
                <HoverItem
                  key={item.name}
                  title={item.name}
                  href={item.href}
                  description={item.description}
                  external={item.external}
                />
              ))}
            </ClickMenu>

            {/* A Empresa - ClickMenu */}
            <ClickMenu
              menuId="company"
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              trigger={t('menus.company')}
              className="w-80 p-2"
            >
              {menuConfig.company.items.map((item) => (
                <HoverItem
                  key={item.name}
                  title={item.name}
                  href={item.href}
                  description={item.description}
                  external={item.external}
                />
              ))}
            </ClickMenu>

            {/* Blog - Link simples */}
            <Link
              href="/blog"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
            >
              Blog
            </Link>
          </div>

          {/* Desktop Auth & Utility Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-1 lg:hidden">
            <LanguageToggle />
            <Button
              onClick={() => setOpen(!open)}
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer"
              aria-label={t('mobile.menu')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Otimizado */}
        <nav
          className={cn(
            "pb-4 text-base transition-all duration-300 ease-in-out lg:hidden",
            open ? "block opacity-100" : "hidden opacity-0"
          )}
        >
          <div className="space-y-1 font-medium mr-3 mt-3">

            {/* Soluções Editoriais Mobile */}
            <Collapsible
              open={expandedSections.editorialSolutions}
              onOpenChange={() => toggleSection('editorialSolutions')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-foreground hover:bg-accent/50 rounded-lg transition-colors text-left">
                <span className="font-medium">{t('menus.editorialSolutions')}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.editorialSolutions && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-2 pl-4">
                {menuConfig.editorialSolutions.sections.map((section) => (
                  <div key={section.title}>
                    <h4 className="py-1 mb-2 text-sm font-semibold">
                      {section.title}
                    </h4>
                    <div className="space-y-1 pl-2">
                      {section.items.map(item => (
                        <Link
                          key={item.name}
                          href={item.href as any}
                          onClick={() => setOpen(false)}
                          className="block text-sm px-3 py-2 text-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Indexadores Mobile */}
            <Collapsible
              open={expandedSections.indexers}
              onOpenChange={() => toggleSection('indexers')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-foreground hover:bg-accent/50 rounded-lg transition-colors text-left">
                <span className="font-medium">{t('menus.indexers')}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.indexers && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-1 pl-6">
                {menuConfig.indexers.items.map(item => (
                  <Link
                    key={item.name}
                    href={item.href as any}
                    onClick={() => setOpen(false)}
                    className="block text-sm px-3 py-2 text-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* A Empresa Mobile */}
            <Collapsible
              open={expandedSections.company}
              onOpenChange={() => toggleSection('company')}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-foreground hover:bg-accent/50 rounded-lg transition-colors text-left">
                <span className="font-medium">{t('menus.company')}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expandedSections.company && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-1 pl-6">
                {menuConfig.company.items.map(item => (
                  <Link
                    key={item.name}
                    href={item.href as any}
                    onClick={() => setOpen(false)}
                    className="block text-sm px-3 py-2 text-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Links diretos */}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="block px-3 py-3 text-foreground hover:bg-accent/50 rounded-lg transition-colors font-medium"
            >
              Blog
            </Link>

            <div className="pt-4 space-y-3 mt-4 border-t border-border">
              <Button
                asChild
                variant="outline"
                className="w-full justify-center font-medium h-11"
                onClick={() => setOpen(false)}
              >
                <Link href="/auth/login">{t('auth.logInButton')}</Link>
              </Button>
              <Button
                asChild
                className="w-full justify-center font-medium h-11"
                onClick={() => setOpen(false)}
              >
                <Link href="/auth/signup">{t('auth.signUpButton')}</Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}