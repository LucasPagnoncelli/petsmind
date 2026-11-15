/* ==========================================================================
   Pet's Mind Adestramento — Cabeçalho e menu
   1. O cabeçalho fica compacto ao rolar a página.
   2. Menu hambúrguer em tela cheia no celular/tablet (< 1024px):
      abre e fecha por toque/clique e pela tecla Esc, fecha ao escolher um
      item, atualiza aria-expanded, trava a rolagem do fundo e mantém o foco
      dentro do cabeçalho enquanto está aberto.
   Sem JS, o menu continua visível como uma linha com rolagem horizontal.
   ========================================================================== */
(() => {
  "use strict";

  const cabecalho = document.querySelector("[data-cabecalho]");
  if (!cabecalho) return;

  /* ---------- 1. Cabeçalho compacto ao rolar ---------- */
  const LIMITE = 24; // px rolados antes de compactar
  let agendado = false;

  const atualizarCompacto = () => {
    cabecalho.classList.toggle("cabecalho--compacto", window.scrollY > LIMITE);
    agendado = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(atualizarCompacto);
    },
    { passive: true }
  );

  atualizarCompacto();

  /* ---------- 2. Menu hambúrguer ---------- */
  const botao = cabecalho.querySelector("[data-menu-botao]");
  const menu = cabecalho.querySelector("[data-menu]");
  if (!botao || !menu) return;

  const rotulo = botao.querySelector("[data-menu-rotulo]");
  const raiz = document.documentElement;
  const desktop = window.matchMedia("(min-width: 1024px)");

  botao.hidden = false;

  const estaAberto = () => botao.getAttribute("aria-expanded") === "true";

  const focaveis = () =>
    [...cabecalho.querySelectorAll("a[href], button:not([disabled])")].filter(
      (el) => el.offsetParent !== null || el === botao
    );

  const abrir = () => {
    botao.setAttribute("aria-expanded", "true");
    if (rotulo) rotulo.textContent = "Fechar menu";
    raiz.classList.add("menu-aberto");
    // Espera o painel deixar de estar escondido antes de mover o foco
    const primeiro = menu.querySelector("a[href]");
    if (primeiro) window.requestAnimationFrame(() => window.requestAnimationFrame(() => primeiro.focus()));
  };

  const fechar = ({ devolverFoco = false } = {}) => {
    if (!estaAberto()) return;
    botao.setAttribute("aria-expanded", "false");
    if (rotulo) rotulo.textContent = "Abrir menu";
    raiz.classList.remove("menu-aberto");
    if (devolverFoco) botao.focus();
  };

  botao.addEventListener("click", () => {
    if (estaAberto()) fechar({ devolverFoco: true });
    else abrir();
  });

  // Fecha ao escolher um item (a navegação até a âncora segue normalmente)
  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a[href]")) fechar();
  });

  document.addEventListener("keydown", (evento) => {
    if (!estaAberto()) return;

    if (evento.key === "Escape") {
      fechar({ devolverFoco: true });
      return;
    }

    // Mantém o foco dentro do cabeçalho enquanto o menu está aberto
    if (evento.key === "Tab") {
      const lista = focaveis();
      if (!lista.length) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      } else if (!cabecalho.contains(document.activeElement)) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
  });

  // Ao passar para a largura de desktop, o menu volta a ser a barra normal
  desktop.addEventListener("change", (evento) => {
    if (evento.matches) fechar();
  });
})();
