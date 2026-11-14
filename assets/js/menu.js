/* ==========================================================================
   Pet's Mind Adestramento — Cabeçalho e menu
   Parte 1: o cabeçalho fica compacto ao rolar a página.
   (O menu hambúrguer do mobile entra na Parte 3.)
   ========================================================================== */
(() => {
  "use strict";

  const cabecalho = document.querySelector("[data-cabecalho]");
  if (!cabecalho) return;

  const LIMITE = 24; // px rolados antes de compactar
  let agendado = false;

  const atualizar = () => {
    cabecalho.classList.toggle("cabecalho--compacto", window.scrollY > LIMITE);
    agendado = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(atualizar);
    },
    { passive: true }
  );

  atualizar();
})();
