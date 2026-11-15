# Pet's Mind Adestramento — Site institucional

Site da **Pet's Mind Adestramento**, serviço de adestramento de cães com reforço positivo do adestrador **Jhonatan D.**, em Rio do Sul e região (Alto Vale do Itajaí, SC).

- Landing page de página única, com seções (Início, Sobre, Serviços, Como funciona, Depoimentos, Atendimento, Dúvidas e Contato).
- Objetivo: gerar contatos pelo WhatsApp.
- HTML, CSS e JavaScript puros — **sem build step, sem frameworks, sem `npm`**.
- Hospedado no **GitHub Pages** (site estático).

As regras completas de construção estão em [`CLAUDE.md`](CLAUDE.md).

## Estrutura

```
index.html                 página inicial
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
    cookies.js             aviso de cookies e Google Analytics (desligado sem ga4Id)
  img/
    logo/                  logo.svg (vetorial), logo-512.png, favicon.ico,
                           apple-touch-icon.png e logo-original.jpg (arquivo enviado)
    hero/ sobre/           fotos do Jhonatan e capa do vídeo da história
    depoimentos/           fotos dos cães (somente com autorização)
  fonts/                   Montserrat e Open Sans (.woff2, licença OFL)
```

## Dados de contato

Todos os dados de contato ficam em **`assets/js/config.js`**. Para trocar o número do WhatsApp, a mensagem padrão ou os links das redes sociais, edite somente esse arquivo.

- Botões de WhatsApp usam o atributo `data-whatsapp` (e, opcionalmente, `data-servico="Nome do serviço"` para personalizar a mensagem).
- Se `whatsappNumero` ficar vazio, os botões passam a usar o link do WhatsApp Business (`whatsappLink`), sem parâmetros extras.

## Como rodar localmente

Basta abrir o `index.html` no navegador. Para simular o servidor (recomendado), na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000>.

## Como publicar (GitHub Pages)

1. Faça commit e push das alterações para a branch `main`.
2. No GitHub: **Settings → Pages → Source: "Deploy from a branch"** → branch `main`, pasta `/ (root)`.
3. Ative **"Enforce HTTPS"**.
4. Em cerca de 1 minuto o site fica disponível em `https://<usuario>.github.io/<repositorio>/`.

Para atualizar: editar → commit → push → publicado em ~1 min.

> Todos os caminhos do site são **relativos** (`assets/css/base.css`), para funcionar também em `usuario.github.io/nome-do-repo/`.

O passo a passo completo (domínio próprio, DNS e checklist de lançamento) será documentado na Parte 4.

## Pendências

Conteúdos ainda não confirmados aparecem no site com o marcador `[A CONFIRMAR: ...]`. Para listá-los:

```bash
grep -rn "A CONFIRMAR" --exclude=CLAUDE.md .
```
