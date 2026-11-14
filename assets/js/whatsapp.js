/* ==========================================================================
   Pet's Mind Adestramento — Links do WhatsApp
   - [data-whatsapp]            → recebe o href do WhatsApp (nova aba).
   - [data-servico="Nome"]      → (opcional) personaliza a mensagem.
   - [data-whatsapp-exibicao]   → recebe o número formatado para exibição.
   Dados lidos de window.PETSMIND_CONFIG (config.js).
   ========================================================================== */
(() => {
  "use strict";

  const config = window.PETSMIND_CONFIG || {};

  /**
   * Monta o link do WhatsApp.
   * Com número: https://wa.me/<numero>?text=<mensagem>.
   * Sem número: link do WhatsApp Business exatamente como está (sem parâmetros).
   */
  const montarLink = (servico) => {
    const numero = String(config.whatsappNumero || "").replace(/\D/g, "");

    if (numero) {
      const mensagem = servico
        ? `${config.mensagemServico || ""}${servico}`
        : config.mensagemPadrao || "";
      const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
      return `https://wa.me/${numero}${texto}`;
    }

    return config.whatsappLink || "";
  };

  document.querySelectorAll("[data-whatsapp]").forEach((elemento) => {
    const servico = (elemento.dataset.servico || "").trim();
    const link = montarLink(servico);

    // Sem número nem link configurado: mantém o href original (ex.: #contato).
    if (!link) return;

    elemento.setAttribute("href", link);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener");
  });

  if (config.whatsappExibicao) {
    document.querySelectorAll("[data-whatsapp-exibicao]").forEach((elemento) => {
      elemento.textContent = config.whatsappExibicao;
    });
  }
})();
