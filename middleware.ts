// src/middleware.ts

import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware({
  ...routing,
  // Detecção automática do idioma do navegador
  localeDetection: true,
  // Redirecionar para locale padrão quando não especificado
  localePrefix: 'always' // ou 'as-needed' se quiser omitir o locale padrão
});

export const config = {
  matcher: [
    // Corresponde a todas as rotas exceto API, arquivos estáticos, etc.
    '/',
    '/(pt|en|es)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};