/* ==========================================================================
   Pet's Mind Adestramento — Vídeo do YouTube sob demanda
   A capa é uma imagem local com link para o YouTube (funciona sem JS).
   Com JS, o clique troca a capa pelo player youtube-nocookie.com: nenhum
   recurso do YouTube é carregado antes disso.
   ========================================================================== */
(() => {
  "use strict";

  document.querySelectorAll("[data-youtube-id]").forEach((video) => {
    const id = (video.dataset.youtubeId || "").trim();
    const capa = video.querySelector(".video__capa");
    if (!id || !capa || !/^[\w-]{6,20}$/.test(id)) return;

    capa.addEventListener("click", (evento) => {
      // Ctrl/Cmd + clique ou botão do meio: deixa abrir o YouTube em outra aba
      if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) return;
      evento.preventDefault();

      const titulo = video.closest("section")?.querySelector(".sobre__video-titulo")?.textContent.trim();
      const iframe = document.createElement("iframe");
      iframe.className = "video__player";
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      iframe.title = titulo ? `Vídeo: ${titulo}` : "Vídeo do YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      capa.replaceWith(iframe);
      iframe.focus();
    });
  });
})();
