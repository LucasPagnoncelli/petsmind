/* ==========================================================================
   Pet's Mind Adestramento — Botão "Indique para um amigo"
   No celular, abre o menu de compartilhar do aparelho (Web Share API).
   Onde não houver esse menu, abre o WhatsApp para escolher o contato.
   O endereço compartilhado é o oficial da página (<link rel="canonical">).
   Sem JS, o botão (e o texto ao lado) ficam escondidos.
   ========================================================================== */
(() => {
  "use strict";

  const config = window.PETSMIND_CONFIG || {};
  const botoes = document.querySelectorAll("[data-compartilhar]");
  if (!botoes.length) return;

  const canonico = document.querySelector('link[rel="canonical"]');
  const endereco = canonico ? canonico.href : window.location.href.split("#")[0];
  const texto = config.mensagemIndicacao || "Conheça a Pet's Mind Adestramento.";

  botoes.forEach((botao) => {
    const caixa = botao.closest("[data-compartilhar-caixa]");
    if (caixa) caixa.hidden = false;
    botao.hidden = false;
    botao.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Pet's Mind Adestramento", text: texto, url: endereco });
          return;
        } catch (erro) {
          if (erro && erro.name === "AbortError") return; // a pessoa fechou o menu
        }
      }
      const link = `https://wa.me/?text=${encodeURIComponent(`${texto} ${endereco}`)}`;
      window.open(link, "_blank", "noopener");
    });
  });
})();
