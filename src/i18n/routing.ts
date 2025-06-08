// src/i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de todos os locales suportados
  locales: ['pt', 'en', 'es'],

  // Usado quando nenhum locale corresponde
  defaultLocale: 'pt'

  // SEM pathnames = URLs sempre em inglês com apenas o locale no início
  // Exemplos de URLs:
  // /pt/services/books
  // /en/services/books  
  // /es/services/books
});