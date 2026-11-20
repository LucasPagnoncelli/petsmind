/* ==========================================================================
   Pet's Mind Adestramento — Links do WhatsApp
   - [data-whatsapp]            → recebe o href do WhatsApp (nova aba).
   - [data-servico="Nome"]      → (opcional) mensagem com o nome do serviço.
   - [data-mensagem="Texto"]    → (opcional) mensagem completa, usada pelo
                                  quiz e pela lista de sinais (tem prioridade).
   - [data-whatsapp-exibicao]   → recebe o número formatado para exibição.
   O link é montado ao carregar a página e de novo no clique, para pegar
   mensagens que mudaram depois (ex.: resultado do quiz).
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
  const montarLink = (elemento) => {
    const numero = String(config.whatsappNumero || "").replace(/\D/g, "");
    if (!numero) return config.whatsappLink || "";

    const personalizada = (elemento.dataset.mensagem || "").trim();
    const servico = (elemento.dataset.servico || "").trim();
    const mensagem =
      personalizada ||
      (servico ? `${config.mensagemServico || ""}${servico}` : config.mensagemPadrao || "");

    const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
    return `https://wa.me/${numero}${texto}`;
  };

  const aplicar = (elemento) => {
    const link = montarLink(elemento);
    // Sem número nem link configurado: mantém o href original (ex.: #contato).
    if (!link) return;
    elemento.setAttribute("href", link);
    elemento.setAttribute("target", "_blank");
    elemento.setAttribute("rel", "noopener");
  };

  document.querySelectorAll("[data-whatsapp]").forEach(aplicar);

  // Atualiza no momento do clique (antes de o navegador seguir o link)
  document.addEventListener(
    "click",
    (evento) => {
      const elemento = evento.target.closest("[data-whatsapp]");
      if (elemento) aplicar(elemento);
    },
    true
  );

  if (config.whatsappExibicao) {
    document.querySelectorAll("[data-whatsapp-exibicao]").forEach((elemento) => {
      elemento.textContent = config.whatsappExibicao;
    });
  }
})();
