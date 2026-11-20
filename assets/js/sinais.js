/* ==========================================================================
   Pet's Mind Adestramento — "Sinais de que seu cão precisa de ajuda"
   Cada comportamento marcado aponta para um serviço. O resultado mostra o
   treino indicado e um botão de WhatsApp com a lista do que foi marcado.
   Nada é salvo nem enviado pelo site. Sem JS, a lista funciona como texto
   informativo e o botão de WhatsApp leva a mensagem padrão.
   ========================================================================== */
(() => {
  "use strict";

  const caixa = document.querySelector("[data-sinais]");
  if (!caixa) return;

  const opcoes = [...caixa.querySelectorAll("input[type=checkbox][data-servico-indicado]")];
  const resultado = caixa.querySelector("[data-sinais-resultado]");
  const vazio = caixa.querySelector("[data-sinais-vazio]");
  const titulo = caixa.querySelector("[data-sinais-titulo]");
  const extra = caixa.querySelector("[data-sinais-extra]");
  const botao = caixa.querySelector("[data-sinais-whatsapp]");
  const limpar = caixa.querySelector("[data-sinais-limpar]");
  if (!opcoes.length || !resultado || !botao) return;

  // Em caso de empate, vale esta ordem (reatividade e medo primeiro, por segurança)
  const PRIORIDADE = [
    "Cães reativos",
    "Correção de comportamento",
    "Passeio sem puxões",
    "Obediência básica",
    "Educação de filhotes",
  ];

  const atualizar = () => {
    const marcados = opcoes.filter((opcao) => opcao.checked);
    const algum = marcados.length > 0;
    resultado.hidden = !algum;
    if (vazio) vazio.hidden = algum;
    limpar.hidden = !algum;
    if (!algum) return;

    const contagem = new Map();
    marcados.forEach((opcao) => {
      const servico = opcao.dataset.servicoIndicado;
      contagem.set(servico, (contagem.get(servico) || 0) + 1);
    });
    const ordenados = [...contagem.keys()].sort(
      (a, b) => contagem.get(b) - contagem.get(a) || PRIORIDADE.indexOf(a) - PRIORIDADE.indexOf(b)
    );
    const principal = ordenados[0];
    const outros = ordenados.slice(1);

    titulo.textContent = `Treino indicado: ${principal}`;
    extra.textContent = outros.length
      ? `Também pode ajudar: ${outros.join(", ")}. Na avaliação, o Jhonatan define o melhor caminho.`
      : "Na avaliação, o Jhonatan confirma o melhor caminho para o seu cão.";

    const lista = marcados.map((opcao) => opcao.dataset.rotulo || opcao.value).join("; ");
    botao.dataset.mensagem = [
      "Olá, Jhonatan! Vi a lista de sinais no site.",
      `Meu cão: ${lista}.`,
      `O site indicou: ${principal}.`,
      "Pode me ajudar?",
    ].join("\n");
  };

  caixa.addEventListener("change", atualizar);
  limpar.addEventListener("click", () => {
    opcoes.forEach((opcao) => {
      opcao.checked = false;
    });
    atualizar();
    opcoes[0].focus();
  });

  atualizar();
})();
