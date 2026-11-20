/* ==========================================================================
   Pet's Mind Adestramento — Quiz "Qual serviço é ideal para o seu cão?"
   Uma pergunta por vez; no fim, mostra o serviço indicado (descrição e
   preço lidos dos cartões da seção Serviços) e um botão de WhatsApp com as
   respostas já escritas na mensagem. Nada é salvo nem enviado pelo site.
   Sem JS, a seção mostra apenas um convite para falar no WhatsApp.
   ========================================================================== */
(() => {
  "use strict";

  const quiz = document.querySelector("[data-quiz]");
  if (!quiz) return;

  const form = quiz.querySelector("form");
  const etapas = [...quiz.querySelectorAll("[data-quiz-etapa]")];
  const progresso = quiz.querySelector("[data-quiz-progresso]");
  const barra = quiz.querySelector("[data-quiz-barra]");
  const aviso = quiz.querySelector("[data-quiz-aviso]");
  const voltar = quiz.querySelector("[data-quiz-voltar]");
  const avancar = quiz.querySelector("[data-quiz-avancar]");
  const resultado = quiz.querySelector("[data-quiz-resultado]");
  if (!form || !etapas.length || !resultado) return;

  let atual = 0;

  // Dados do serviço lidos do cartão correspondente (fonte única: o HTML)
  const dadosDoServico = (nome) => {
    const botao = document.querySelector(`.servico-card [data-servico="${nome}"]`);
    const cartao = botao && botao.closest(".servico-card");
    if (!cartao) return { nome, paraQuem: "", resolve: "", preco: "" };
    const descricoes = cartao.querySelectorAll("dd");
    return {
      nome,
      paraQuem: descricoes[0] ? descricoes[0].textContent.trim() : "",
      resolve: descricoes[1] ? descricoes[1].textContent.trim() : "",
      preco: (cartao.querySelector(".servico-card__preco") || {}).textContent || "",
    };
  };

  const valor = (nome) => {
    const campo = form.elements[nome];
    return campo ? String(campo.value || "").trim() : "";
  };

  const rotulo = (nome) => {
    const marcado = form.querySelector(`input[name="${nome}"]:checked`);
    return marcado ? marcado.dataset.rotulo || marcado.value : "";
  };

  // Regras de indicação (todas a partir da tabela de serviços do site)
  const indicar = (idade, desafio) => {
    const filhote = idade === "filhote";
    switch (desafio) {
      case "basico":
        return filhote ? "Educação de filhotes" : "Obediência básica";
      case "filhote":
        return filhote ? "Educação de filhotes" : "Correção de comportamento";
      case "passeio":
        return "Passeio sem puxões";
      case "comportamento":
        return "Correção de comportamento";
      case "reativo":
        return "Cães reativos";
      default:
        return "Avaliação comportamental";
    }
  };

  const mostrarEtapa = (indice, focar = true) => {
    atual = indice;
    etapas.forEach((etapa, i) => {
      etapa.hidden = i !== indice;
    });
    resultado.hidden = true;
    aviso.textContent = "";
    voltar.hidden = indice === 0;
    avancar.textContent = indice === etapas.length - 1 ? "Ver resultado" : "Próxima";
    progresso.textContent = `Pergunta ${indice + 1} de ${etapas.length}`;
    barra.style.width = `${((indice + 1) / etapas.length) * 100}%`;
    if (focar) {
      const titulo = etapas[indice].querySelector("legend, label");
      if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus();
      }
    }
  };

  const etapaRespondida = (indice) => {
    const obrigatorio = etapas[indice].querySelector("input[type=radio]");
    if (!obrigatorio) return true; // etapa opcional (nome do cão)
    return Boolean(form.querySelector(`input[name="${obrigatorio.name}"]:checked`));
  };

  const mostrarResultado = () => {
    const idade = valor("idade");
    const desafio = valor("desafio");
    const nomeCao = valor("nome");
    const servico = dadosDoServico(indicar(idade, desafio));
    const chamada = nomeCao ? `o ${nomeCao}` : "o seu cão";

    resultado.querySelector("[data-resultado-titulo]").textContent = `Indicação para ${chamada}: ${servico.nome}`;
    resultado.querySelector("[data-resultado-para-quem]").textContent = servico.paraQuem;
    resultado.querySelector("[data-resultado-resolve]").textContent = servico.resolve;
    resultado.querySelector("[data-resultado-preco]").textContent = servico.preco;

    const notas = [];
    if (servico.nome !== "Avaliação comportamental") {
      notas.push("Todo novo cliente começa pela avaliação comportamental: o Jhonatan conhece o cão, entende a rotina e monta o plano de treino.");
    }
    if (idade === "idoso") {
      notas.push("Cães idosos também aprendem: o treino só respeita o ritmo de cada fase da vida.");
    }
    resultado.querySelector("[data-resultado-notas]").textContent = notas.join(" ");

    const linhas = [
      "Olá, Jhonatan! Fiz o teste no site.",
      `Cão: ${nomeCao || "(sem nome informado)"} (${rotulo("idade")}, porte ${rotulo("porte").toLowerCase()})`,
      `Principal desafio: ${rotulo("desafio").toLowerCase()}`,
      `Serviço indicado: ${servico.nome}`,
      "Quero saber mais!",
    ];
    resultado.querySelector("[data-whatsapp]").dataset.mensagem = linhas.join("\n");

    etapas.forEach((etapa) => {
      etapa.hidden = true;
    });
    quiz.querySelector("[data-quiz-navegacao]").hidden = true;
    progresso.textContent = "Resultado";
    barra.style.width = "100%";
    resultado.hidden = false;
    const titulo = resultado.querySelector("[data-resultado-titulo]");
    titulo.setAttribute("tabindex", "-1");
    titulo.focus();
  };

  avancar.addEventListener("click", () => {
    if (!etapaRespondida(atual)) {
      aviso.textContent = "Escolha uma das opções para continuar.";
      return;
    }
    if (atual < etapas.length - 1) mostrarEtapa(atual + 1);
    else mostrarResultado();
  });

  voltar.addEventListener("click", () => {
    if (atual > 0) mostrarEtapa(atual - 1);
  });

  // Enter no campo de nome = ver resultado (sem enviar formulário)
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    avancar.click();
  });

  // Ao marcar uma opção, some o aviso
  form.addEventListener("change", () => {
    aviso.textContent = "";
  });

  quiz.querySelector("[data-quiz-refazer]").addEventListener("click", () => {
    form.reset();
    quiz.querySelector("[data-quiz-navegacao]").hidden = false;
    mostrarEtapa(0);
  });

  mostrarEtapa(0, false);
})();
