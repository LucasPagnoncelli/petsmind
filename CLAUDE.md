# CLAUDE.md — Site Pet's Mind Adestramento

Este arquivo orienta o Claude Code na construção do site institucional da **Pet's Mind Adestramento**. Leia tudo antes de começar. A documentação completa do projeto (personas, textos, requisitos) está no documento "Documentação do Site — Pet's Mind Adestramento"; este arquivo resume o que é necessário para programar.

---

## 1. Contexto do projeto

| Item | Definição |
| --- | --- |
| Empresa | Pet's Mind Adestramento |
| Adestrador | Jhonatan D. |
| Área de atendimento | Rio do Sul e região (Alto Vale do Itajaí, SC) |
| Tipo de site | Landing page institucional (página única com seções) + página 404 |
| Objetivo principal | Gerar contatos pelo WhatsApp (o site não tem formulário) |
| Idioma | Português (Brasil) — `<html lang="pt-BR">` |
| Repositório | GitHub |
| Hospedagem | GitHub Pages, sempre (site estático, sem back-end, sem domínio próprio): https://lucaspagnoncelli.github.io/petsmind/ |

### 1.1 Dados de contato confirmados

| Canal | Valor |
| --- | --- |
| WhatsApp | +55 47 8855-0632 · exibir como (47) 8855-0632 · para links: `554788550632` |
| WhatsApp Business (alternativa) | https://api.whatsapp.com/message/PCRETT4YYIHWI1?autoload=1&app_absent=0 |
| Instagram | https://www.instagram.com/petsmind.adestramento/ (@petsmind.adestramento) |
| YouTube | https://www.youtube.com/@petsmind.adestramento |
| E-mail | Não possui |

Todos esses valores ficam em `assets/js/config.js` (seção 5) e são lidos de lá.

### 1.2 Conteúdo confirmado pelo cliente

| Item | Definição |
| --- | --- |
| Cães atendidos | 25+ |
| Experiência | Adestrador desde o fim de 2017 (usar "Desde 2017", não "X anos") |
| Formações | Não possui; destacar a experiência prática |
| História | Começou treinando cães resgatados pela ONG PAD (não citar a cidade da ONG); reportagem na TV da região; método próprio desenvolvido na prática |
| Método | Reforço positivo |
| Atendimento | Na casa do tutor, em Rio do Sul e região (sem lista de cidades e sem endereço físico — não usar endereço no JSON-LD) |
| Horário | A combinar com o adestrador |
| Preços | Avaliação R$ 120 · Filhotes a partir de R$ 600 · Obediência a partir de R$ 800 · Passeio a partir de R$ 500 · Correção a partir de R$ 900 · Reativos a partir de R$ 1.200 (valores de referência) |
| Vídeo do canal | "Conheça um pouco da minha história como adestrador" — ID `eS8RAt--nu4` |
| Não usar no site | Formulário, e-mail, avaliações/nota do Google, seção de resultados (antes/depois), cookies, analytics ou qualquer coleta de dados |

---

## 2. Regras de trabalho (obrigatórias)

1. **Execute uma parte por vez.** O projeto está dividido em 4 partes (seção 7). Ao terminar uma parte, pare, resuma o que foi feito, liste os critérios de aceite atendidos e **aguarde confirmação** antes de iniciar a próxima.
2. **Nunca invente conteúdo do cliente.** Use os dados confirmados das seções 1.1 e 1.2. Preços, e-mail, cidades atendidas, formações, número de cães atendidos, anos de experiência e depoimentos devem usar o marcador:
   `[A CONFIRMAR: descrição]` — ex.: `[A CONFIRMAR: preço da avaliação]`.
   Depoimentos de exemplo devem ser claramente marcados como exemplo e nunca parecer reais.
3. **Sem build step.** O GitHub Pages serve os arquivos como estão. Nada de frameworks, bundlers ou `npm` para gerar o site. HTML, CSS e JavaScript puros (ES6+).
4. **Caminhos sempre relativos** (`assets/css/base.css`, nunca `/assets/css/base.css`). O site pode ser publicado em `usuario.github.io/nome-do-repo/`, onde caminhos absolutos quebram.
5. **Mobile-first.** Escreva o CSS para 360 px e use `min-width` nas media queries.
6. **Sem dependências externas de JS.** Fontes e ícones ficam hospedados no próprio repositório (desempenho e LGPD).
7. **Commits pequenos e descritivos**, em português, no formato: `feat: adiciona seção de serviços`, `fix: corrige contraste do botão`, `docs: atualiza README`.
8. Antes de encerrar cada parte, valide o HTML (sem tags abertas, um único `<h1>` por página) e confira se não há erros no console.

---

## 3. Identidade visual

### 3.1 Cores (definir em `assets/css/variables.css`)

```css
:root {
  --cor-preto: #111111;          /* cabeçalho, rodapé, seções de destaque, texto principal */
  --cor-amarelo: #F7DE42;        /* botões de ação, destaques, ícones */
  --cor-amarelo-escuro: #D9BE1F; /* hover/foco dos botões amarelos */
  --cor-branco: #FFFFFF;         /* fundo principal */
  --cor-cinza-claro: #F4F4F2;    /* fundo alternado de seções e cartões */
  --cor-cinza-texto: #555555;    /* texto secundário */
  --cor-whatsapp: #25D366;       /* somente botão flutuante do WhatsApp */
}
```

**Contraste:** texto preto sobre amarelo ✅ · amarelo sobre preto ✅ (títulos) · **amarelo sobre branco ❌ nunca usar**.

### 3.2 Tipografia

| Uso | Fonte | Peso | Desktop / Mobile |
| --- | --- | --- | --- |
| H1 | Montserrat | 800 | 48 px / 32 px |
| H2 | Montserrat | 700 | 36 px / 26 px |
| H3 | Montserrat | 600 | 22 px / 20 px |
| Texto | Open Sans | 400 / 600 | 18 px / 16 px |
| Botões | Montserrat | 700, maiúsculas | 16 px |

Fontes em `assets/fonts/` (formato `.woff2`), carregadas com `@font-face` e `font-display: swap`. Se os arquivos `.woff2` ainda não existirem no repositório, declare o `@font-face` apontando para eles e use `system-ui, sans-serif` como fallback — **não** baixe nada da internet sem pedir.

### 3.3 Componentes visuais

- Cantos arredondados: `12px` em cartões; botões em formato pílula (`border-radius: 999px`).
- Ícones de linha (estilo Lucide), em SVG inline, nas cores preto ou amarelo.
- Pegadas pequenas como marcador de lista e divisor de seções, com baixa opacidade.
- Logo: pegada preta com "PET'S" nos dedos e "MIND" na almofada, em amarelo com contorno preto. Arquivos em `assets/img/logo/`. Altura no cabeçalho: 56 px (desktop) / 44 px (mobile). Sobre fundo preto, aplicar dentro de um círculo branco. Não distorcer, não recolorir, não aplicar sombra.

### 3.4 Tom de voz

Próximo, confiante e respeitoso com o animal. Fala com o tutor como "você". Promete resultado realista, nunca milagre. Evitar termos como "dominar" ou "corrigir na força".

---

## 4. Estrutura de pastas

```
pets-mind-site/
├── index.html
├── 404.html
├── .nojekyll                 (arquivo vazio: desativa o Jekyll no GitHub Pages)
├── assets/
│   ├── css/
│   │   ├── variables.css     (cores, fontes, espaçamentos)
│   │   ├── base.css          (reset, tipografia, utilitários, botões)
│   │   └── sections.css      (estilo de cada seção)
│   ├── js/
│   │   ├── config.js         (WhatsApp e links — fonte única dos dados de contato)
│   │   ├── whatsapp.js       (monta os links wa.me)
│   │   ├── links.js          (aplica os links de Instagram/YouTube do config.js)
│   │   ├── menu.js
│   │   ├── faq.js
│   │   ├── carousel.js
│   │   ├── video.js          (vídeo do YouTube sob demanda — Parte 3)
│   │   └── mapa.js           (mapa sob demanda — Parte 3)
│   ├── img/
│   │   ├── logo/             (logo.svg, logo-512.png, favicon.ico, apple-touch-icon.png)
│   │   ├── hero/             (jhonatan-com-cao.webp)
│   │   ├── sobre/            (jhonatan-treinando-filhote.webp, capa-video-historia.webp)
│   │   ├── depoimentos/      (fotos dos cães, somente com autorização)
│   │   └── og-image.jpg      (1200×630)
│   └── fonts/                (Montserrat 600/700/800 e Open Sans 400/600, .woff2, licença OFL)
└── README.md
```

---

## 5. Padrões de código

- **HTML semântico:** `header`, `nav`, `main`, `section` (com `id` para âncoras e `aria-labelledby`), `footer`. Um único `<h1>` por página.
- **CSS:** classes no padrão BEM (`.servico-card`, `.servico-card__titulo`, `.btn--primario`). Cores e fontes **somente** via variáveis CSS. Nada de `!important` salvo exceção justificada.
- **JS:** módulos pequenos, um arquivo por funcionalidade, carregados com `defer`. Sem variáveis globais além de `window.PETSMIND_CONFIG` (definido em `config.js`).
- **Dados de contato em um único lugar:**

```js
// assets/js/config.js
window.PETSMIND_CONFIG = {
  // WhatsApp: número só com dígitos (DDI 55 + DDD 47 + número). Usado para links wa.me com mensagem.
  whatsappNumero: "554788550632",
  whatsappExibicao: "(47) 8855-0632",
  mensagemPadrao: "Olá, Jhonatan! Vim pelo site e quero saber sobre adestramento.",
  mensagemServico: "Olá, Jhonatan! Vim pelo site e tenho interesse em: ",
  // Alternativa: link de mensagem do WhatsApp Business (a mensagem é definida no app; não aceita texto extra).
  // Usado somente se whatsappNumero estiver vazio.
  whatsappLink: "https://api.whatsapp.com/message/PCRETT4YYIHWI1?autoload=1&app_absent=0",
  email: "",                             // a empresa não possui e-mail
  instagram: "https://www.instagram.com/petsmind.adestramento/",
  youtube: "https://www.youtube.com/@petsmind.adestramento"
};
```

  Todo botão de WhatsApp usa o atributo `data-whatsapp` (e opcionalmente `data-servico="Nome do serviço"`). O `whatsapp.js` preenche o `href` e adiciona `target="_blank"` e `rel="noopener"`:
  - **Com `whatsappNumero` preenchido (padrão):** `https://wa.me/<whatsappNumero>?text=<mensagem codificada com encodeURIComponent>`. Sem `data-servico`, usa `mensagemPadrao`; com `data-servico`, usa `mensagemServico + nome do serviço`.
  - **Com `whatsappNumero` vazio:** usa `whatsappLink` exatamente como está, **sem** acrescentar parâmetros (o link do WhatsApp Business não aceita texto extra).
  - Nenhum link ou número de WhatsApp escrito direto no HTML: o número visível (ex.: no rodapé e no contato) é preenchido pelo JS a partir de `whatsappExibicao`, com o texto `(47) 8855-0632` no HTML como alternativa caso o JS não carregue.
- **Imagens:** WebP, com `width`/`height` definidos, `srcset` quando houver mais de um tamanho, `loading="lazy"` fora da primeira dobra e `alt` descritivo com contexto local (ex.: "Jhonatan D. treinando um border collie em Rio do Sul"). Enquanto não houver fotos reais, use placeholders neutros (bloco cinza com o texto do que deve entrar) — não use fotos de terceiros.
- **Acessibilidade (WCAG 2.1 AA):** contraste ≥ 4,5:1, foco visível (`:focus-visible` com contorno amarelo/preto), tudo operável por teclado, `prefers-reduced-motion` respeitado em animações e rolagem suave.

---

## 6. Limitações do GitHub Pages (considerar sempre)

- **Sem back-end:** o contato é feito somente pelo WhatsApp; o site não tem formulário.
- **Sem redirecionamentos de servidor:** o `404.html` na raiz é usado automaticamente pelo GitHub Pages.
- **HTTPS:** ativado em Settings → Pages → "Enforce HTTPS".
- **Sem domínio próprio:** o site fica sempre em `lucaspagnoncelli.github.io/petsmind/` (por isso o `404.html` usa `<base href="/petsmind/">`).
- **`.nojekyll`** na raiz para o GitHub Pages servir os arquivos sem processamento.

---

## 7. Plano de construção em 4 partes

### PARTE 1 — Fundação e estrutura ✅ concluída

**Objetivo:** repositório organizado, design system em CSS e o "esqueleto" do site navegável, com cabeçalho, rodapé e WhatsApp funcionando.

Tarefas:
1. Criar a estrutura de pastas da seção 4, `.nojekyll`, `README.md` (o que é o projeto, como rodar localmente, como publicar) e `.gitignore` (`.DS_Store`, `Thumbs.db`, `.vscode/`).
2. Criar `variables.css` (cores, fontes, escala de espaçamento em múltiplos de 8 px, larguras de container: 1200 px máx.), `base.css` (reset moderno, tipografia, `.container`, botões `.btn--primario` amarelo/preto, `.btn--secundario` contorno, `.btn--whatsapp`) e `sections.css` (vazio, com comentários por seção).
3. Criar `index.html` com `<head>` completo (charset, viewport, title e description provisórios, favicon, CSS) e o esqueleto de todas as seções com `id`s: `inicio`, `sobre`, `servicos`, `como-funciona`, `depoimentos`, `atendimento`, `duvidas`, `contato`.
4. **Cabeçalho fixo:** logo (link para `#inicio`), menu com âncoras (Início · Sobre · Serviços · Como funciona · Depoimentos · Dúvidas · Contato), botão "Agendar avaliação" (WhatsApp). O cabeçalho encolhe ao rolar.
5. **Rodapé:** logo, frase curta, links do menu, ícones com link para Instagram e YouTube (de `config.js`, com `aria-label`), WhatsApp (47) 8855-0632, "Rio do Sul e região — SC", "© 2026 Pet's Mind Adestramento".
6. **Botão flutuante de WhatsApp** (canto inferior direito, verde `--cor-whatsapp`, com `aria-label`).
7. Criar `config.js` e `whatsapp.js` (seção 5).
8. Rolagem suave com compensação da altura do cabeçalho (`scroll-margin-top` nas seções).

Critérios de aceite:
- [x] Abrindo `index.html` direto no navegador (ou via `python -m http.server`), não há erros no console nem arquivos 404.
- [x] Todos os links do menu levam à seção certa sem o cabeçalho cobrir o título.
- [x] Todos os botões de WhatsApp abrem `wa.me/554788550632` com a mensagem certa, em nova aba, usando os dados do `config.js`.
- [x] Apagando `whatsappNumero` do `config.js`, os botões passam a abrir o link do WhatsApp Business sem parâmetros extras.
- [x] Layout correto em 360 px, 768 px e 1280 px.
- [x] Nenhuma cor escrita fora de `variables.css`.

Commit sugerido ao final: `feat: estrutura base, design system, cabeçalho, rodapé e WhatsApp`.

---

### PARTE 2 — Seções de conteúdo ✅ concluída

**Objetivo:** preencher todas as seções da página inicial com layout final e conteúdo confirmado (seção 1.2).

Como ficou (estilos em `sections.css`, um bloco comentado por seção):

1. **Hero** (`#inicio`) — fundo preto com detalhe amarelo.
   - H1: "Adestramento de cães em Rio do Sul e região"
   - Subtítulo: "Educação com reforço positivo para filhotes e adultos, no conforto da sua casa. Com Jhonatan D., da Pet's Mind."
   - Botões: "Falar no WhatsApp" (primário) e "Ver serviços" (secundário, âncora `#servicos`).
   - Foto: `assets/img/hero/jhonatan-com-cao.webp` (com `fetchpriority="high"`).
   - Faixa de confiança: "25+ cães atendidos" · "Desde 2017 adestrando cães" · "Na sua casa — atendimento em Rio do Sul e região".
2. **Sobre o adestrador** (`#sobre`) — foto `jhonatan-treinando-filhote.webp`, história (até 120 palavras, baseada no vídeo do canal), lista "Experiência" (sem formações), frase de destaque "Cada cão aprende de um jeito. Meu trabalho é descobrir o dele.", vídeo "Conheça um pouco da minha história como adestrador" (capa local `capa-video-historia.webp`, link para o YouTube; o player sob demanda entra na Parte 3) e botão "Ver o canal no YouTube".
3. **Serviços** (`#servicos`) — grade de cartões (1 coluna mobile, 2 tablet, 3 desktop). Cada cartão: ícone SVG, nome, para quem é, o que resolve, preço (seção 1.2) e botão "Quero saber mais" com `data-whatsapp data-servico="<nome>"`. Abaixo da grade: "Valores de referência. O valor final é combinado depois da avaliação…".

   | Serviço | Para quem | O que resolve |
   | --- | --- | --- |
   | Avaliação comportamental | Todo novo cliente | Diagnóstico e plano de treino |
   | Educação de filhotes | Cães até 6 meses | Xixi no lugar, mordidas, socialização |
   | Obediência básica | Filhotes e adultos | Senta, deita, fica, vem, junto |
   | Passeio sem puxões | Cães que puxam na guia | Caminhar ao lado, foco no tutor |
   | Correção de comportamento | Cães com problemas específicos | Latidos, pulos, destruição, ansiedade de separação |
   | Cães reativos | Cães medrosos ou agressivos | Reação a outros cães, pessoas ou veículos |

4. **Como funciona** (`#como-funciona`) — 5 passos numerados com ícone em círculo amarelo: Contato → Avaliação → Plano de treino → Aulas → Acompanhamento (textos aprovados pelo cliente). Abaixo, quadro "O método" com o texto sobre reforço positivo.
5. **Depoimentos** (`#depoimentos`) — 2 depoimentos reais ("Tutor da Diana" e "Tutor do Maximus"), com frase de destaque, "Ler depoimento completo" (`<details>`), origem ("Vídeo no Instagram · mês/ano") e a inicial do cão no lugar da foto. Marcação pronta para o carrossel da Parte 3 (controles com `hidden`). Sem nota nem link do Google.
6. **Área de atendimento** (`#atendimento`) — título "Onde eu atendo", destaque "Rio do Sul e região — Alto Vale do Itajaí, SC", convite para cidades vizinhas com botão de WhatsApp e contêiner reservado para o mapa (`data-mapa`; o iframe entra na Parte 3).
7. **Dúvidas frequentes** (`#duvidas`) — 12 perguntas em 6 temas, com respostas do adestrador vindas do Instagram, usando `<details>`/`<summary>` (funciona sem JS). Foram retiradas as perguntas sobre dominância/hierarquia, pitbulls e tapete higiênico.
8. **Contato** (`#contato`) — botão grande de WhatsApp com o número (47) 8855-0632 visível, links para Instagram e YouTube e horário de atendimento (a combinar com o adestrador). Sem formulário.

Critérios de aceite:
- [x] Todas as 8 seções com layout final em 360, 768 e 1280 px.
- [x] Fundos alternando entre branco, cinza claro e preto para separar as seções.
- [x] Cada botão "Quero saber mais" abre o WhatsApp com o nome do serviço na mensagem.
- [x] Nenhum dado do cliente inventado; nenhum `[A CONFIRMAR]` restante no site.
- [x] Todo `<img>` tem `alt`, `width` e `height`.

---

### PARTE 3 — Interatividade e página 404 ✅ concluída

**Objetivo:** deixar tudo funcional: menu mobile, carrossel, vídeo e mapa sob demanda e página 404.

Tarefas:
1. **`menu.js`** — menu hambúrguer em tela cheia no mobile; abre/fecha por toque e Esc; fecha ao escolher um item; `aria-expanded` atualizado; trava a rolagem do fundo com o menu aberto.
2. **`faq.js`** — melhoria progressiva sobre `<details>`: animação suave de abrir/fechar (respeitando `prefers-reduced-motion`).
3. **`carousel.js`** — depoimentos com botões anterior/próximo, swipe no celular e indicadores (ativar os controles que estão com `hidden`); sem avanço automático. Com 2 depoimentos, os controles só aparecem quando os cartões não cabem lado a lado.
4. **`video.js`** — vídeo do YouTube sob demanda em `#sobre`: a capa local (`capa-video-historia.webp`) com botão de play continua como link para o YouTube sem JS; com JS, o clique troca a capa pelo iframe `youtube-nocookie.com/embed/<data-youtube-id>`. Nenhum recurso do YouTube carrega antes do clique.
5. **`mapa.js`** — iframe do Google Maps centrado em Rio do Sul, inserido no contêiner `data-mapa` via `IntersectionObserver` só quando `#atendimento` aparece na tela.
6. **`404.html`** — pegada, mensagem "Esse caminho o faro não encontrou", botão para o início. Como o GitHub Pages serve o 404 em qualquer URL, a página usa `<base href="/petsmind/">` para os caminhos funcionarem de qualquer nível (em teste local, um script troca para `/`), com os ícones SVG escritos direto no HTML.

Critérios de aceite:
- [x] Menu, FAQ e carrossel funcionam com mouse, toque e teclado.
- [x] O mapa não carrega até a seção aparecer, e nenhum recurso do YouTube carrega antes do clique no vídeo (verificar na aba Network).
- [x] A página 404 segue a identidade visual e tem cabeçalho/rodapé consistentes com a página inicial.

Commit sugerido: `feat: interatividade e página 404`.

---

### PARTE 4 — SEO, desempenho, acessibilidade e publicação no GitHub Pages ✅ concluída (conferências no site publicado pendentes)

**Objetivo:** site otimizado, encontrável no Google e publicado.

Tarefas:
1. **Meta tags finais** no `index.html`:
   - Title: `Adestrador em Rio do Sul e Região | Pet's Mind Adestramento`
   - Description: `Adestramento de cães com reforço positivo em Rio do Sul e região. Filhotes, obediência e comportamento, na sua casa. Fale com Jhonatan D. no WhatsApp.`
   - `canonical`, Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:locale` = `pt_BR`) e Twitter Card.
   - `theme-color` = `#111111`, favicon e `apple-touch-icon`.
2. **Dados estruturados (JSON-LD)** no `index.html`:
   - `ProfessionalService` (ou `LocalBusiness`) com nome, telefone `+55-47-8855-0632`, `areaServed` (Rio do Sul e região, SC), logo, `priceRange` e `sameAs` (Instagram e YouTube do `config.js`). Sem horário fixo (atendimento a combinar).
   - `FAQPage` com as 12 perguntas da seção Dúvidas.
3. **Sem `sitemap.xml` e sem `robots.txt`:** o site tem uma página só e fica numa subpasta do GitHub Pages, então eles não são necessários. A URL oficial (`canonical` e `og:url`) é `https://lucaspagnoncelli.github.io/petsmind/`.
4. **Desempenho:** minimizar CSS/JS crítico, `preload` da fonte do H1 e da imagem do hero, `fetchpriority="high"` na imagem do hero, scripts com `defer`, imagens em WebP com tamanhos adequados. Meta: PageSpeed mobile ≥ 90, LCP < 2,5 s, página inicial < 1,5 MB.
5. **Revisão de acessibilidade:** rodar Lighthouse; corrigir contraste, ordem de headings, `alt` e foco. Meta: Acessibilidade ≥ 95.
6. **Publicação no GitHub Pages:**
   - Garantir que `index.html` está na raiz da branch `main`.
   - Settings → Pages → Source: "Deploy from a branch" → Branch `main` / pasta `/ (root)`.
   - Ativar "Enforce HTTPS".
   - Documentar no `README.md` o passo a passo de publicação e de atualização (editar → commit → push → publicado em ~1 min).
7. **Checklist final no README:** listar todos os `[A CONFIRMAR]` restantes no projeto (pode gerar com `grep -rn "A CONFIRMAR" .`).

Critérios de aceite:
- [ ] Site acessível pela URL do GitHub Pages, com HTTPS, sem arquivos quebrados. (Pages ativo e publicando; conferir no navegador)
- [x] Lighthouse mobile: Desempenho ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 90, SEO ≥ 95.
- [ ] JSON-LD válido no Teste de Resultados Avançados do Google. (conferir depois de publicar)
- [ ] Prévia correta ao compartilhar o link no WhatsApp (título, descrição e imagem). (conferir depois de publicar)
- [x] README com instruções de publicação, atualização e lista de pendências.

Commit sugerido: `feat: SEO, desempenho e publicação no GitHub Pages`.

---

## 8. Fora do escopo (não implementar agora)

Blog, páginas individuais por serviço/cidade, agendamento online, pagamento online (Pix/link), área do cliente com login, painel administrativo, formulário de contato, seção de resultados (antes/depois), lightbox de fotos, avaliações do Google, cookies e analytics (o site não coleta dados), política de privacidade, domínio próprio.

---

## 9. Como pedir cada parte

O usuário vai pedir, por exemplo: **"Execute a Parte 1 do CLAUDE.md"**. Faça somente aquela parte, rode as verificações dos critérios de aceite e termine com:

1. Resumo do que foi criado/alterado (lista de arquivos).
2. Critérios de aceite marcados (✅ / ⚠️ com explicação).
3. Pendências `[A CONFIRMAR]` introduzidas nesta parte.
4. Sugestão de mensagem de commit.
