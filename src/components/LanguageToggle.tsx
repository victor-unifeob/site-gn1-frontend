// src/components/LanguageToggle.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function LanguageToggle() {
  const t = useTranslations("Header.languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    // Simplified pathname update, assumes locale is always the first segment
    const currentPathSegments = pathname.split('/');
    if (currentPathSegments.length > 1 && (newLocale === 'en' || newLocale === 'es' || newLocale === 'pt')) {
      // If the first segment is a known locale, replace it
      if (['en', 'es', 'pt'].includes(currentPathSegments[1])) {
        currentPathSegments[1] = newLocale;
      } else {
        // If no locale prefix, add it (might need adjustment based on your routing)
        currentPathSegments.splice(1, 0, newLocale);
      }
      router.replace(currentPathSegments.join('/') || '/');
    } else {
      // Fallback or if path is just "/"
      router.replace(`/${newLocale}${pathname === '/' ? '' : pathname}`);
    }
  };

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch for the icon button
    return <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10" disabled><Globe className="h-5 w-5" /></Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 hover:bg-accent data-[state=open]:bg-accent cursor-pointer">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] space-y-1">
        <DropdownMenuItem
          onClick={() => handleLocaleChange("pt")}
          className={cn(
            "cursor-pointer",
            locale === "pt" && "bg-accent font-semibold"
          )}
        >
          {locale === "pt" && <Check className="h-4 w-4 mr-2" />}
          {t("pt")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          className={cn(
            "cursor-pointer",
            locale === "en" && "bg-accent font-semibold"
          )}
        >
          {locale === "en" && <Check className="h-4 w-4 mr-2" />}
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("es")}
          className={cn(
            "cursor-pointer",
            locale === "es" && "bg-accent font-semibold"
          )}
        >
          {locale === "es" && <Check className="h-4 w-4 mr-2" />}
          {t("es")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}