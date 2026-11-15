/* ==========================================================================
   Pet's Mind Adestramento — Cookies e Google Analytics (GA4)
   - Com ga4Id vazio no config.js (padrão): não faz nada. Nenhum banner e
     nenhum script do Google é carregado.
   - Com ga4Id preenchido: mostra um aviso (Aceitar / Recusar). O script do
     GA4 só é carregado depois de "Aceitar". A escolha fica salva no
     navegador (localStorage).
   - Evento enviado: clique_whatsapp (com o serviço, quando houver).
   IMPORTANTE: antes de preencher o ga4Id, crie a política de privacidade e
   coloque o link no rodapé (ver CLAUDE.md, Parte 3).
   ========================================================================== */
(() => {
  "use strict";

  const ga4Id = String((window.PETSMIND_CONFIG || {}).ga4Id || "").trim();
  if (!ga4Id) return;

  const CHAVE = "petsmind-cookies";
  let analyticsAtivo = false;

  const lerEscolha = () => {
    try {
      return window.localStorage.getItem(CHAVE);
    } catch (erro) {
      return null;
    }
  };

  const salvarEscolha = (valor) => {
    try {
      window.localStorage.setItem(CHAVE, valor);
    } catch (erro) {
      /* navegador sem armazenamento: a escolha vale só para esta visita */
    }
  };

  const carregarAnalytics = () => {
    if (analyticsAtivo) return;
    analyticsAtivo = true;

    // dataLayer e gtag são globais exigidas pelo próprio GA4 (exceção à regra de globais)
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(script);
  };

  // Evento de clique nos botões de WhatsApp (só envia se o visitante aceitou)
  document.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-whatsapp]");
    if (!botao || !analyticsAtivo) return;
    window.gtag("event", "clique_whatsapp", {
      servico: (botao.dataset.servico || "").trim() || "geral",
    });
  });

  const escolha = lerEscolha();
  if (escolha === "aceito") {
    carregarAnalytics();
    return;
  }
  if (escolha === "recusado") return;

  // Aviso de cookies
  const aviso = document.createElement("div");
  aviso.className = "cookies";
  aviso.setAttribute("role", "region");
  aviso.setAttribute("aria-label", "Aviso de cookies");
  aviso.innerHTML = `
    <div class="container cookies__interno">
      <p class="cookies__texto">Usamos cookies do Google Analytics para entender como o site é usado e melhorar a sua experiência. Você aceita?</p>
      <div class="cookies__botoes">
        <button class="btn btn--primario btn--pequeno" type="button" data-cookies="aceito">Aceitar</button>
        <button class="btn btn--secundario btn--pequeno" type="button" data-cookies="recusado">Recusar</button>
      </div>
    </div>`;

  aviso.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-cookies]");
    if (!botao) return;
    const valor = botao.dataset.cookies;
    salvarEscolha(valor);
    if (valor === "aceito") carregarAnalytics();
    aviso.remove();
    document.documentElement.classList.remove("com-aviso-cookies");
  });

  document.body.appendChild(aviso);
  document.documentElement.classList.add("com-aviso-cookies");
})();
