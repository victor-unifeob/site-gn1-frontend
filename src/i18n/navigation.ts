// src/i18n/navigation.ts

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers leves em torno das APIs de navegação do Next.js
// que consideram a configuração de roteamento
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);