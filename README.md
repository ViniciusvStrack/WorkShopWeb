# Imersão Presencial — landing page

Landing page estática para o workshop presencial de 19 a 21 de janeiro de 2027. O projeto usa React, TypeScript e Vite e está preparado para publicação na Netlify.

## Desenvolvimento local

Use uma versão atual do Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Verificações disponíveis:

```bash
npm run test:run
npm run lint
npm run build
```

O build de produção é gerado em `dist/`.

## Onde alterar as informações

Todo o conteúdo variável do evento está em `src/content/workshop.ts`. Esse é o único lugar em que devem ser atualizados:

- nome final do workshop;
- tema e descrição;
- nome e apresentação do anfitrião;
- cidade e endereço;
- quantidade de vagas;
- programação detalhada dos três dias;
- preço, datas, telefone e mensagem do WhatsApp.

Neste primeiro estado, local, capacidade e programação aparecem explicitamente como informações ainda em definição. Não publique informações inventadas para substituir esses textos.

## Como adicionar as fotografias

Coloque os arquivos finais em `public/images/`. Para cada fotografia:

1. Exporte versões AVIF e WebP em dimensões adequadas para celular e desktop.
2. Informe `width` e `height` no elemento de imagem para evitar deslocamentos de layout.
3. Use `<picture>` com AVIF primeiro, WebP como alternativa e uma imagem final compatível.
4. Adicione `loading="lazy"` às imagens fora da primeira dobra.
5. Escreva texto alternativo em português que descreva o conteúdo real da fotografia. Imagens puramente decorativas devem usar `alt=""`.

Os blocos atuais da galeria são decorativos e não fazem requisições a arquivos inexistentes. Substitua-os apenas quando as fotos estiverem aprovadas.

## Endereço público e SEO

Antes da publicação definitiva, substitua `https://workshop-imersao.netlify.app/` pelo domínio real nestes arquivos:

- `index.html` — canonical, Open Graph URL e Open Graph image;
- `public/robots.txt` — endereço do sitemap;
- `public/sitemap.xml` — URL principal.

Atualize também `public/og-image.svg` quando nome e identidade finais forem fornecidos.

## Publicação na Netlify

1. Envie o repositório ao GitHub.
2. Na Netlify, escolha **Add new project → Import an existing project**.
3. Conecte o GitHub e selecione este repositório.
4. A Netlify lerá automaticamente o `netlify.toml`: comando `npm run build` e diretório publicado `dist`.
5. Revise o deploy preview, confirme os links do WhatsApp e só então publique o domínio definitivo.

Este projeto não exige funções serverless, banco de dados, pagamento, formulários, variáveis de ambiente ou segredos.

## Informações confirmadas

- Datas: 19 a 21 de janeiro de 2027.
- Investimento: R$ 1.800.
- WhatsApp: +55 81 9185-3191.
