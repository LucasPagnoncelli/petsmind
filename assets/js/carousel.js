/* ==========================================================================
   Pet's Mind Adestramento — Carrossel de depoimentos
   A trilha já rola na horizontal com encaixe (CSS scroll-snap), o que
   garante o arraste com o dedo mesmo sem JS. Este script acrescenta os
   botões anterior/próximo e os indicadores, que só aparecem quando os
   cartões não cabem todos na tela. Sem avanço automático.
   ========================================================================== */
(() => {
  "use strict";

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
    const trilha = carrossel.querySelector(".carrossel__trilha");
    const controles = carrossel.querySelector(".carrossel__controles");
    const anterior = carrossel.querySelector("[data-carrossel-anterior]");
    const proximo = carrossel.querySelector("[data-carrossel-proximo]");
    const indicadores = carrossel.querySelector("[data-carrossel-indicadores]");
    if (!trilha || !controles || !anterior || !proximo || !indicadores) return;

    const cartoes = [...trilha.children];
    if (cartoes.length < 2) return;

    // Semântica de carrossel para leitores de tela
    carrossel.setAttribute("role", "region");
    carrossel.setAttribute("aria-roledescription", "carrossel");
    carrossel.setAttribute("aria-label", "Depoimentos de clientes");
    cartoes.forEach((cartao, i) => {
      cartao.setAttribute("aria-roledescription", "depoimento");
      cartao.setAttribute("aria-label", `${i + 1} de ${cartoes.length}`);
    });

    // Um indicador por cartão
    const pontos = cartoes.map((_, i) => {
      const ponto = document.createElement("button");
      ponto.type = "button";
      ponto.className = "carrossel__indicador";
      ponto.setAttribute("aria-label", `Mostrar depoimento ${i + 1}`);
      ponto.addEventListener("click", () => irPara(i));
      indicadores.appendChild(ponto);
      return ponto;
    });

    const recuoInicial = () => parseFloat(getComputedStyle(trilha).paddingLeft) || 0;

    const indiceAtual = () => {
      const posicao = trilha.scrollLeft + recuoInicial();
      let melhor = 0;
      cartoes.forEach((cartao, i) => {
        if (Math.abs(cartao.offsetLeft - posicao) < Math.abs(cartoes[melhor].offsetLeft - posicao)) melhor = i;
      });
      // No fim da trilha, o último cartão é o atual
      if (trilha.scrollLeft + trilha.clientWidth >= trilha.scrollWidth - 2) melhor = cartoes.length - 1;
      return melhor;
    };

    const irPara = (i) => {
      const alvo = cartoes[Math.max(0, Math.min(i, cartoes.length - 1))];
      trilha.scrollTo({
        left: alvo.offsetLeft - recuoInicial(),
        behavior: reduzirMovimento.matches ? "auto" : "smooth",
      });
    };

    const atualizar = () => {
      const atual = indiceAtual();
      pontos.forEach((ponto, i) => {
        if (i === atual) ponto.setAttribute("aria-current", "true");
        else ponto.removeAttribute("aria-current");
      });
      anterior.disabled = trilha.scrollLeft <= 2;
      proximo.disabled = trilha.scrollLeft + trilha.clientWidth >= trilha.scrollWidth - 2;
    };

    // Controles só quando há conteúdo escondido para os lados
    const verificarEspaco = () => {
      controles.hidden = trilha.scrollWidth <= trilha.clientWidth + 2;
      atualizar();
    };

    anterior.addEventListener("click", () => irPara(indiceAtual() - 1));
    proximo.addEventListener("click", () => irPara(indiceAtual() + 1));

    let agendado = false;
    trilha.addEventListener(
      "scroll",
      () => {
        if (agendado) return;
        agendado = true;
        window.requestAnimationFrame(() => {
          atualizar();
          agendado = false;
        });
      },
      { passive: true }
    );

    if ("ResizeObserver" in window) new ResizeObserver(verificarEspaco).observe(trilha);
    else window.addEventListener("resize", verificarEspaco);
    verificarEspaco();
  });
})();
