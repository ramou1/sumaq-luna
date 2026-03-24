# Sumaq Luna — site institucional

Landing page de página única para a marca de pisco premium **Sumaq Luna**. Conteúdo em espanhol, identidade visual escura com dourados e vinho, tipografia clássica (Cinzel, Cormorant Garamond, Great Vibes) e secções com âncoras no cabeçalho.

## Funcionalidades

- Menu fixo com links âncora, logo em `/public/images/logo-sumaq.png` e CTA “Quiero ser embajador”
- Modais de registro (nome, telefone, e-mail, país) e início de sessão (placeholder até existir backend)
- Layout responsivo com painéis em vidro (“glass”), moldura dupla fina e paleta definida pela marca
- Imagens de contexto via Unsplash (configuradas em `next.config.ts`)

## Stack

| Tecnologia   | Versão   |
|-------------|----------|
| Next.js     | 16.x     |
| React       | 19.x     |
| TypeScript  | 5.x      |
| Tailwind CSS| 4.x      |

## Requisitos

- Node.js 20+ (recomendado)
- npm ou pnpm

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
# Build de produção
npm run build

# Servidor de produção (após o build)
npm start

# Lint
npm run lint
```

## Estrutura útil

```
app/
  components/sumaq-luna-home.tsx   # Landing, cabeçalho, modais e secções
  globals.css                     # Variáveis de cor, tema Tailwind, utilitários
  layout.tsx                      # Fontes Google, metadata, lang="es"
  page.tsx                        # Entrada da página
public/
  images/logo-sumaq.png           # Logotipo
```

## Notas

- **Previews (Open Graph / redes sociais):** define `NEXT_PUBLIC_SITE_URL` com a URL pública do site (ex.: `https://teu-dominio.com`) para os metadados gerarem links absolutos corretos ao partilhar o link.
- Os formulários apenas simulam envio no cliente; ligue a uma API ou serviço quando tiver autenticação e persistência.
- Para usar apenas imagens locais, substitua as URLs do `next/image` e, se não precisar de domínios externos, pode simplificar `images.remotePatterns` em `next.config.ts`.

## Licença

Uso privado do projeto **Sumaq Luna**, salvo indicação em contrário pelo titular dos direitos.
