/* ==========================================================================
   Pet's Mind Adestramento — Configuração
   Fonte única dos dados de contato. Todos os outros scripts leem daqui.
   ========================================================================== */
window.PETSMIND_CONFIG = {
  // WhatsApp: número só com dígitos (DDI 55 + DDD 47 + número). Usado para links wa.me com mensagem.
  whatsappNumero: "554788550632",
  whatsappExibicao: "(47) 8855-0632",
  mensagemPadrao: "Olá, Jhonatan! Vim pelo site e quero saber sobre adestramento.",
  mensagemServico: "Olá, Jhonatan! Vim pelo site e tenho interesse em: ",
  // Alternativa: link de mensagem do WhatsApp Business (a mensagem é definida no app; não aceita texto extra).
  // Usado somente se whatsappNumero estiver vazio.
  whatsappLink: "https://api.whatsapp.com/message/PCRETT4YYIHWI1?autoload=1&app_absent=0",
  email: "",                             // a empresa não possui e-mail
  instagram: "https://www.instagram.com/petsmind.adestramento/",
  youtube: "https://www.youtube.com/@petsmind.adestramento",
  ga4Id: ""                              // vazio = analytics desativado
};
