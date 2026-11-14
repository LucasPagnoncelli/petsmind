/* ==========================================================================
   Pet's Mind Adestramento — Links de redes sociais
   [data-link="instagram"] e [data-link="youtube"] recebem o endereço do
   config.js. O href escrito no HTML serve apenas de alternativa sem JS.
   ========================================================================== */
(() => {
  "use strict";

  const config = window.PETSMIND_CONFIG || {};

  document.querySelectorAll("[data-link]").forEach((elemento) => {
    const url = config[elemento.dataset.link];

    // Só aplica endereços válidos (ignora vazios e marcadores [A CONFIRMAR]).
    if (typeof url !== "string" || !/^https:\/\//.test(url)) return;

    elemento.setAttribute("href", url);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener");
  });
})();
