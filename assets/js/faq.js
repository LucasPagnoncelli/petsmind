/* ==========================================================================
   Pet's Mind Adestramento — Dúvidas frequentes
   Melhoria progressiva sobre <details>/<summary>: anima a abertura e o
   fechamento das respostas. Sem JS (ou com "reduzir movimento" ativado no
   sistema), o <details> abre e fecha normalmente, sem animação.
   ========================================================================== */
(() => {
  "use strict";

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DURACAO = 260; // ms

  document.querySelectorAll(".faq__item").forEach((item) => {
    const pergunta = item.querySelector("summary");
    const resposta = item.querySelector(".faq__resposta");
    if (!pergunta || !resposta || typeof resposta.animate !== "function") return;

    let animacao = null;

    const animar = (abrindo) => {
      const alturaFinal = abrindo ? resposta.scrollHeight : 0;
      const alturaInicial = abrindo ? 0 : resposta.offsetHeight;

      resposta.style.overflow = "hidden";
      animacao = resposta.animate(
        [
          { height: `${alturaInicial}px`, opacity: abrindo ? 0 : 1 },
          { height: `${alturaFinal}px`, opacity: abrindo ? 1 : 0 },
        ],
        { duration: DURACAO, easing: "ease-out" }
      );

      animacao.onfinish = () => {
        if (!abrindo) item.open = false;
        resposta.style.overflow = "";
        animacao = null;
      };
      animacao.oncancel = () => {
        resposta.style.overflow = "";
        animacao = null;
      };
    };

    pergunta.addEventListener("click", (evento) => {
      if (reduzirMovimento.matches) return; // comportamento nativo

      evento.preventDefault();
      if (animacao) animacao.cancel();

      if (item.open) {
        animar(false);
      } else {
        item.open = true;
        animar(true);
      }
    });
  });
})();
