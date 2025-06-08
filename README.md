# GN1 - Site Institucional

Um site institucional moderno e multilíngue para a GN1, especializada em soluções editoriais científicas. O projeto oferece suporte completo para português, inglês e espanhol, incluindo um sistema de blog integrado.

## Contribuições
- Victor Argachof (RA: 24001231)

## Características Principais

- **Multilíngue**: Suporte completo para 3 idiomas (PT, EN, ES)
- **Blog Integrado**: Sistema de blog com posts em markdown
- **SEO Otimizado**: Meta tags, dados estruturados e URLs multilíngues
- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **Performance**: Otimizado para velocidade e acessibilidade

## Stack

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS + Shadcn/ui
- **Internacionalização**: next-intl
- **Gerenciamento de Conteúdo**: Markdown para blog posts
- **Deploy**: Configurado para export estático

## Estrutura do Projeto

```
gn1-website/
├── src/
│   ├── app/
│   │   ├── [locale]/                 # Rotas multilíngues
│   │   │   ├── blog/                 # Sistema de blog
│   │   │   │   ├── [slug]/           # Posts individuais
│   │   │   │   ├── archive/          # Arquivo de posts
│   │   │   │   └── category/[category]/ # Posts por categoria
│   │   │   ├── page.tsx              # Página inicial
│   │   │   └── layout.tsx            # Layout principal
│   │   └── features/
│   │       └── blog/                 # Funcionalidades do blog
│   ├── components/                   # Componentes reutilizáveis
│   ├── i18n/                        # Configuração de internacionalização
│   ├── lib/                         # Utilitários e helpers
│   └── styles/                      # Estilos globais
├── content/
│   └── blog/                        # Posts do blog
│       ├── pt/                      # Posts em português
│       ├── en/                      # Posts em inglês
│       └── es/                      # Posts em espanhol
├── messages/                        # Traduções
│   ├── pt.json                      # Traduções em português
│   ├── en.json                      # Traduções em inglês
│   └── es.json                      # Traduções em espanhol
└── public/                          # Arquivos estáticos
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/victor-unifeob/site-gn1-frontend.git
   cd site-gn1-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o site**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Gerenciamento de Conteúdo

### Traduções

As traduções estão organizadas em arquivos JSON na pasta `/messages`:

- `pt.json` - Português (idioma padrão)
- `en.json` - Inglês
- `es.json` - Espanhol

**Exemplo de estrutura:**
```json
{
  "Header": {
    "menus": {
      "editorialSolutions": "Soluções Editoriais"
    }
  },
  "Services": {
    "editorial": {
      "title": "Produção editorial",
      "description": "Produção de alta qualidade..."
    }
  }
}
```

### Posts do Blog

Os posts estão organizados por idioma na pasta `/content/blog`:

```
content/blog/
├── pt/exemplo-post.md
├── en/example-post.md
└── es/post-ejemplo.md
```

**Estrutura do frontmatter:**
```markdown
---
title: "Título do Post"
description: "Descrição breve do post"
date: "2025-06-05"
author: "Nome do Autor"
category: "Categoria"
coverImage: "/blog/imagem.jpg"
tags: ["tag1", "tag2"]
featured: false
published: true
translations:
  en: "example-post"
  es: "post-ejemplo"
---

Conteúdo do post em markdown...
```

## Multilíngue

### Configuração de Idiomas

O sistema suporta 3 idiomas configurados em `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt'
});
```

### URLs Multilíngues

- Português: `gn1world.com/pt/`
- Inglês: `gn1world.com/en/`
- Espanhol: `gn1world.com/es/`

### Adicionando Novas Traduções

1. **Adicione a chave no arquivo de tradução:**
   ```json
   {
     "novaSessao": {
       "titulo": "Novo Título",
       "descricao": "Nova descrição"
     }
   }
   ```

2. **Use no componente:**
   ```tsx
   import { useTranslations } from 'next-intl';
   
   function Componente() {
     const t = useTranslations('novaSessao');
     
     return (
       <h1>{t('titulo')}</h1>
       <p>{t('descricao')}</p>
     );
   }
   ```

## Sistema de Blog

### Funcionalidades

- **Posts multilíngues** com traduções cruzadas
- **Categorização** automática de posts
- **Tags** para organização
- **Posts em destaque** na página inicial
- **Busca e filtros** por categoria
- **SEO otimizado** para cada post
- **Compartilhamento** em redes sociais

### Adicionando um Novo Post

1. **Crie o arquivo markdown:**
   ```bash
   # Para português
   content/blog/pt/meu-novo-post.md
   
   # Para inglês
   content/blog/en/my-new-post.md
   
   # Para espanhol
   content/blog/es/mi-nuevo-post.md
   ```

2. **Adicione o frontmatter:**
   ```markdown
   ---
   title: "Meu Novo Post"
   description: "Descrição do post"
   date: "2025-06-08"
   author: "Seu Nome"
   category: "Categoria"
   coverImage: "/blog/nova-imagem.jpg"
   tags: ["tag1", "tag2"]
   featured: false
   published: true
   translations:
     en: "my-new-post"
     es: "mi-nuevo-post"
   ---
   ```

3. **Escreva o conteúdo** em markdown

### Categorias do Blog

As categorias são automaticamente geradas e traduzidas. Para adicionar uma nova categoria, edite `src/app/features/blog/lib/category-display-names.ts`.

## Personalização

### Temas e Cores

O projeto usa TailwindCSS com Shadcn/ui. Para personalizar:

1. **Componentes**: Modifique os componentes em `src/components/ui/`
2. **Estilos globais**: Edite `src/styles/globals.css`

### Componentes

Todos os componentes seguem o padrão Shadcn/ui e estão em `src/components/ui`. Para criar um novo componente:

```bash
npx shadcn@latest add button
```

## Deploy

### Build de Produção

```bash
npm run build
```

### Exportação Estática

```bash
npm run export
```

Os arquivos gerados estarão na pasta `out/` e podem ser servidos por qualquer CDN.

## Testes e Qualidade

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Exportação estática
npm run export

# Lint
npm run lint

# Type checking
```

### Validação

- **TypeScript** para type safety
- **ESLint** para qualidade de código
- **Prettier** para formatação
- **next-intl** validação de traduções

## Documentação Adicional

### Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

### Estrutura de Dados

#### Post do Blog
```typescript
interface PostMeta {
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
}
```

#### Configuração de Idioma
```typescript
type SupportedLocale = 'pt' | 'en' | 'es';
```