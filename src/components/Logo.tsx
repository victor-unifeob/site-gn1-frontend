// src/components/Logo.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from '@/i18n/navigation'

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({
  width = 140,
  height = 32,
  className = "transition-opacity duration-200",
  priority = false
}: LogoProps) {
  const [mounted, setMounted] = useState(false);

  // Evita hidratação incorreta
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/" className="flex items-center" aria-label="Home">
      {!mounted ? (
        // Placeholder durante o carregamento
        <div className="h-8 w-[120px] animate-pulse bg-muted rounded" />
      ) : (
        <Image
          src="/logos/gn1-logo.webp"
          alt="GN1 World Logo"
          width={0}
          height={0}
          priority={priority}
          className={className}
          style={{
            width: width,
            height: 'auto'
          }}
        />
      )}
    </Link>
  );
}