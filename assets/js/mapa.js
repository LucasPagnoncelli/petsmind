/* ==========================================================================
   Pet's Mind Adestramento — Mapa sob demanda
   O iframe do Google Maps (centrado em Rio do Sul) só é inserido quando a
   seção "Onde eu atendo" se aproxima da tela, para não pesar no carregamento
   inicial da página.
   ========================================================================== */
(() => {
  "use strict";

  const MAPA_URL = "https://www.google.com/maps?q=Rio%20do%20Sul%2C%20SC&z=11&output=embed";

  document.querySelectorAll("[data-mapa]").forEach((caixa) => {
    let carregado = false;

    const carregar = () => {
      if (carregado) return;
      carregado = true;

      const iframe = document.createElement("iframe");
      iframe.src = MAPA_URL;
      iframe.title = "Mapa de Rio do Sul e região";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";

      caixa.textContent = "";
      caixa.appendChild(iframe);
      caixa.classList.add("mapa--carregado");
    };

    if (!("IntersectionObserver" in window)) {
      carregar();
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          observador.disconnect();
          carregar();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observador.observe(caixa);
  });
})();
