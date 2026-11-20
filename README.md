# Pet's Mind Adestramento — Site institucional

Site da **Pet's Mind Adestramento**, serviço de adestramento de cães com reforço positivo do adestrador **Jhonatan D.**, em Rio do Sul e região (Alto Vale do Itajaí, SC).

- Landing page de página única, com seções (Início, Sobre, Sinais, Serviços, Qual serviço?, Como funciona, Depoimentos, Atendimento, Dúvidas e Contato).
- Objetivo: gerar contatos pelo WhatsApp.
- HTML, CSS e JavaScript puros — **sem build step, sem frameworks, sem `npm`**.
- Hospedado no **GitHub Pages** (site estático): <https://lucaspagnoncelli.github.io/petsmind/>

As regras completas de construção estão em [`CLAUDE.md`](CLAUDE.md).

## Estrutura

```
index.html                 página inicial (com meta tags e dados estruturados para o Google)
404.html                   página de "não encontrado" (servida pelo GitHub Pages)
.nojekyll                  desativa o Jekyll no GitHub Pages
assets/
  css/
    variables.css          cores, fontes, espaçamentos (única fonte de cores)
    base.css               reset, tipografia, utilitários e botões
    sections.css           estilo de cada seção (cabeçalho, hero, rodapé...)
  js/
    config.js              dados de contato (WhatsApp, redes sociais...)
    whatsapp.js            monta os links do WhatsApp a partir do config.js
    links.js               aplica os links de Instagram/YouTube do config.js
    menu.js                cabeçalho compacto ao rolar e menu hambúrguer no celular
    faq.js                 animação das dúvidas frequentes
    carousel.js            botões e indicadores do carrossel de depoimentos
    video.js               vídeo do YouTube só carrega ao clicar
    mapa.js                mapa só carrega quando a seção aparece
    sinais.js              lista "Seu cão precisa de ajuda?" → treino indicado
    quiz.js                teste "Qual serviço é ideal?" → indicação + WhatsApp
    compartilhar.js        botão "Indique para um amigo"
  img/
    logo/                  logo.svg (vetorial), logo-512.png, favicon.ico,
                           apple-touch-icon.png e logo-original.jpg (arquivo enviado)
    hero/ sobre/           fotos do Jhonatan e capa do vídeo da história
    depoimentos/           fotos dos cães (somente com autorização)
    og-image.jpg           imagem da prévia ao compartilhar o link (1200×630)
  fonts/                   Montserrat e Open Sans (.woff2, licença OFL)
```

## Dados de contato

Todos os dados de contato ficam em **`assets/js/config.js`**. Para trocar o número do WhatsApp, a mensagem padrão ou os links das redes sociais, edite somente esse arquivo.

- Botões de WhatsApp usam o atributo `data-whatsapp` (e, opcionalmente, `data-servico="Nome do serviço"` ou `data-mensagem="texto completo"` para personalizar a mensagem; o quiz e a lista de sinais usam `data-mensagem`).
- O texto do botão "Indique para um amigo" fica em `mensagemIndicacao`.
- Se `whatsappNumero` ficar vazio, os botões passam a usar o link do WhatsApp Business (`whatsappLink`), sem parâmetros extras.

## Como rodar localmente

Basta abrir o `index.html` no navegador. Para simular o servidor (recomendado), na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000>.

## Como publicar (GitHub Pages) — já feito

O GitHub Pages já está ativo neste repositório (cada push na `main` é publicado automaticamente). Os passos abaixo ficam como referência, caso seja preciso reativar:

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **"Deploy from a branch"**.
3. Em **Branch**, escolha **`main`** e a pasta **`/ (root)`**. Clique em **Save**.
4. Aguarde 1 a 2 minutos e recarregue a página de Settings → Pages: aparece o aviso "Your site is live at https://lucaspagnoncelli.github.io/petsmind/".
5. Na mesma página, marque **"Enforce HTTPS"** (se a opção estiver cinza, espere alguns minutos e tente de novo).

> Todos os caminhos do site são **relativos** (`assets/css/base.css`), para funcionar dentro da subpasta `/petsmind/`. A página `404.html` usa `<base href="/petsmind/">`: se o repositório mudar de nome, troque esse trecho pelo novo nome.

O site fica sempre no GitHub Pages (sem domínio próprio) e não coleta dados dos visitantes: não há analytics, aviso de cookies nem formulário.

## Como atualizar o site

1. Edite os arquivos (no computador ou direto no GitHub, pelo ícone de lápis).
2. Faça **commit** e **push** para a branch `main`.
3. Em cerca de 1 minuto, a nova versão está no ar (acompanhe na aba **Actions** do repositório).

Ao mudar **um serviço ou preço**, atualize três lugares no `index.html`: o cartão do serviço, a tabela "Comparar todos os serviços" e os dados estruturados no `<head>` (blocos `application/ld+json`). O quiz lê os dados direto dos cartões e se atualiza sozinho; mantenha o nome do serviço igual no `data-servico` do cartão. Ao mudar **contatos ou perguntas frequentes**, atualize também os dados estruturados.

## Depois de publicar (conferências)

- **Prévia no WhatsApp:** mande o link <https://lucaspagnoncelli.github.io/petsmind/> para você mesmo e confira título, descrição e imagem. O WhatsApp guarda a prévia em cache; se ela vier antiga, teste com `?v=2` no fim do link.
- **Dados estruturados:** cole o link no [Teste de Resultados Avançados do Google](https://search.google.com/test/rich-results) e confira se os blocos *Empresa local* e *Perguntas frequentes* são reconhecidos. Como a Pet's Mind não tem endereço físico (atende na casa do tutor), o teste pode avisar que falta o campo "endereço" na empresa local: é esperado e correto.
- **Desempenho:** rode o link no [PageSpeed Insights](https://pagespeed.web.dev/) (versão para celular).
- **Google Search Console (recomendado):** em <https://search.google.com/search-console>, adicione a propriedade do tipo **Prefixo do URL** com `https://lucaspagnoncelli.github.io/petsmind/`, faça a verificação (o método "Tag HTML" gera uma linha `<meta>` para colar no `<head>` do `index.html`) e use **Inspeção de URL → Solicitar indexação** para o Google encontrar a página mais rápido.

## Pendências

Não há conteúdo a confirmar no site (nenhum marcador `[A CONFIRMAR]`). Para conferir no futuro:

```bash
grep -rn "A CONFIRMAR" --exclude=CLAUDE.md --exclude=README.md .
```

Passos que dependem de você, fora do código:

- [x] GitHub Pages ativo (publicação automática a cada push na `main`).
- [ ] Conferir se "Enforce HTTPS" está marcado em Settings → Pages.
- [ ] Fazer as conferências da seção "Depois de publicar".
- [ ] (Opcional) Cadastrar o site no Google Search Console e solicitar a indexação.
- [ ] (Opcional) Trocar as fotos por versões em resolução maior, se houver.
