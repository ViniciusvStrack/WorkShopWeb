# Landing Page do Workshop — Design

## Objetivo

Criar uma landing page de página única para divulgar um workshop presencial e converter visitantes em contatos pelo WhatsApp. A página deve transmitir confiança, cuidado visual e sensação de experiência exclusiva, usando como referência editorial — sem copiar textos, imagens ou identidade — a página do Workshop da Aproximar.

O primeiro lançamento deve funcionar mesmo antes de o organizador fornecer as fotografias e as informações finais sobre nome, tema, anfitrião, cidade e programação detalhada.

## Informações confirmadas

- Data: 19 a 21 de janeiro de 2027.
- Investimento: R$ 1.800.
- Canal de inscrição: WhatsApp, no número +55 81 9185-3191.
- O material fotográfico definitivo será fornecido posteriormente.
- Hospedagem prevista: Netlify.
- Idioma: português do Brasil.

## Premissas editáveis

Até que as informações finais sejam recebidas, a interface utilizará textos neutros e identificará claramente os conteúdos ainda pendentes. Nome do workshop, anfitrião, cidade, tema, biografia, programação e imagens serão mantidos em uma configuração centralizada para que a substituição não exija mudanças estruturais.

O WhatsApp será tratado como o único fluxo de conversão. A página não terá conta, pagamento, banco de dados ou formulário próprio nesta primeira versão.

## Direção visual

A direção será editorial e fotográfica, com grandes áreas de imagem, tipografia expressiva, bastante espaço em branco e paleta neutra e quente. O resultado deve lembrar uma publicação premium e artesanal, não um template genérico de evento.

Serão usados:

- contraste entre uma fonte serifada de destaque e uma sans-serif de leitura;
- tons de marfim, carvão e um acento terroso;
- composição assimétrica controlada em telas grandes;
- transições discretas de entrada, respeitando `prefers-reduced-motion`;
- placeholders fotográficos elegantes, com proporções já definidas para evitar alterações de layout quando as fotos reais chegarem.

A referência servirá apenas para linguagem de categoria e ritmo de navegação. Nenhum texto, imagem, logotipo ou composição distintiva será reproduzido literalmente.

## Estrutura da página

1. **Cabeçalho discreto:** marca provisória e link de inscrição.
2. **Hero:** nome provisório, chamada principal, data e cidade pendente, com fotografia de destaque substituível.
3. **Manifesto:** texto breve sobre a proposta da imersão.
4. **Para quem é:** benefícios e perfil do participante em blocos curtos.
5. **Experiência em três dias:** cartões para 19, 20 e 21 de janeiro, com descrições provisórias claramente editáveis.
6. **Galeria:** mosaico responsivo de placeholders preparado para receber as fotos finais.
7. **Informações práticas:** datas, local pendente, número de vagas pendente e investimento de R$ 1.800.
8. **Chamada final:** botão de inscrição pelo WhatsApp.
9. **Rodapé:** contato e aviso básico de direitos.

Em dispositivos móveis, um CTA fixo e compacto poderá aparecer após o visitante sair da seção inicial, sem cobrir conteúdo importante.

## Arquitetura

O projeto será uma aplicação estática em React com Vite e TypeScript. A estrutura prevista é:

- `src/content/workshop.ts`: conteúdo e dados editáveis;
- `src/components/`: seções e elementos reutilizáveis;
- `src/styles/`: tokens visuais, estilos globais e componentes;
- `public/images/`: fotografias finais e placeholders locais;
- `netlify.toml`: configuração de build, cabeçalhos e cache;
- testes unitários para formatação e link de WhatsApp;
- teste de fluxo principal para garantir que o CTA é acessível e aponta para o número correto.

Não haverá backend. O site gerado será composto por HTML, CSS, JavaScript e imagens estáticas, adequado à CDN da Netlify.

## Fluxo de conversão

Todos os CTAs utilizarão `https://wa.me/558191853191` com uma mensagem predefinida e codificada na URL, por exemplo: “Olá! Tenho interesse no workshop de 19 a 21 de janeiro de 2027 e gostaria de saber mais.”

O link abrirá em uma nova aba e terá rótulo acessível. Não serão coletados dados pessoais diretamente pelo site.

## Responsividade e acessibilidade

- Layout pensado primeiro para celular e expandido para desktop.
- Hierarquia semântica correta de títulos e regiões.
- Contraste compatível com WCAG AA.
- Navegação e CTAs acessíveis por teclado.
- Texto alternativo real quando as fotos finais forem adicionadas; placeholders serão decorativos.
- Foco visível e áreas de toque confortáveis.
- Movimento reduzido ou removido conforme preferência do sistema.

## Desempenho e SEO

- Metadados de título, descrição, Open Graph e tema.
- HTML em português e conteúdo principal indexável.
- Imagens finais convertidas para WebP/AVIF, com dimensões explícitas, carregamento tardio fora do hero e versões responsivas.
- Fontes limitadas e carregadas de modo eficiente.
- Meta de Lighthouse: pelo menos 90 em desempenho, acessibilidade, boas práticas e SEO em uma execução de produção representativa.
- Sitemap e `robots.txt` simples.

## Netlify

O build usará `npm run build`, publicando a pasta `dist`. Como a página é estática e não possui funções ou banco de dados, picos de acesso serão absorvidos pela CDN e o consumo relevante será principalmente requisições e banda das fotografias.

Cabeçalhos de cache longo serão aplicados a assets versionados. O HTML usará cache curto para permitir atualizações rápidas. A configuração não fará deploy automaticamente nesta etapa; apenas deixará o repositório pronto para ser conectado à conta Netlify do proprietário.

## Estados e tratamento de erros

- Sem JavaScript, o conteúdo essencial continuará legível e o link do WhatsApp permanecerá presente no HTML gerado.
- Se uma fotografia ainda não existir, o layout exibirá o placeholder previsto sem imagem quebrada.
- Links externos terão atributos de segurança apropriados.
- Conteúdos pendentes não serão inventados como fatos; serão marcados na configuração para substituição posterior.

## Verificação

Antes da entrega serão executados:

- lint e verificação de tipos;
- testes automatizados;
- build de produção;
- inspeção visual em larguras de celular e desktop;
- validação manual de todos os CTAs do WhatsApp;
- revisão para garantir que nenhuma informação provisória pareça confirmada.

## Fora de escopo nesta versão

- Pagamento online ou reserva automática de vaga.
- Painel administrativo ou CMS.
- Formulário de contato e armazenamento de leads.
- Analytics, pixels de anúncios e cookies.
- Publicação efetiva na Netlify e configuração de domínio.
- Criação das fotografias, logotipo ou identidade completa do organizador.

Esses itens poderão ser adicionados posteriormente, caso sejam necessários.
