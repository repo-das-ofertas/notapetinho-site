// Texto da página, literal do pagina.md (versão 2, enxuta, 2026-11-03). Não reescrever aqui: mudança de copy volta ao agente copy.
// Marcadores: {R} nome da raça · {C} cão de exemplo · {oC} "o Thor" / "a Mel" · {OC} "O Thor" / "A Mel".
// **negrito** vira <strong>.

export const racas = {
  lulu: {
    R: 'Lulu', C: 'Thor', f: false,
    chapeu: 'Para quem tem Lulu da Pomerânia',
    dor: 'Tapetinho novo, atrativo, jornal. E o Lulu continua fazendo xixi do lado.',
    corpo: 'o corpo e o jeito',
    lista5: [
      'Mais idas ao tapetinho, com intervalos curtos.',
      'Guia no peitoral, não na coleira.',
      'Descer do sofá pela rampa ou pelo colo.',
      'Latido de aviso: parar quando você agradece, não latido zero.'
    ],
    // depoimentos reais recebidos pelo Vini (2026-11-09), literais: nome e texto como chegaram, sem editar.
    // [nome, texto, 'f' ou 'm'] para o descritor Tutora/Tutor de {R}
    depoimentos: [
      ['Camila', 'Gente meu lulu latia pra absolutamente tudo kkkk comecei a fazer os treininhos e já tô conseguindo controlar melhor isso. Ainda tem seus momentos de escândalo mas melhorou bastante 😂', 'f'],
      ['Rafael de Souza Martins', 'Eu achava que ele era teimoso mesmo e não tinha jeito. O que mais gostei foi que explica tudo bem simples, sem precisar ficar horas treinando. Faço um pouquinho todo dia.', 'm'],
      ['Juliana Ribeiro', 'Comprei meio desconfiada, mas gostei bastante. Aqui em casa o maior problema era ele não obedecer quando chamava. Não tá 100% ainda, mas já vem muito mais vezes.', 'f']
    ]
  },
  'shih-tzu': {
    R: 'Shih Tzu', C: 'Mel', f: true,
    chapeu: 'Para quem tem Shih Tzu',
    dor: 'Tapetinho novo, atrativo, jornal. E o Shih Tzu continua fazendo xixi no tapete da sala.',
    corpo: 'o corpo e o jeito',
    lista5: [
      'Treino nas horas frescas, num cômodo ventilado.',
      'Brinquedo comprido, nada de cabo de guerra perto do rosto.',
      'Guia no peitoral, não na coleira.',
      'Ficar sozinho treinado cedo, a partir do dia 8.'
    ],
    // depoimentos reais recebidos pelo Vini (2026-11-09), literais: nome e texto como chegaram, sem editar.
    // [nome, texto, 'f' ou 'm'] para o descritor Tutora/Tutor de {R}
    depoimentos: [
      ['Fernanda Oliveira da Silva', 'O meu fazia xixi pela casa inteira, era um estresse todo dia. Comecei a seguir as orientações do app e finalmente estamos criando uma rotina. Ainda acontece um acidente ou outro, mas nem se compara.', 'f'],
      ['Lucas Almeida', 'Achei bem prático, principalmente pra quem nunca adestrou cachorro. As explicações são fáceis e dá pra ir fazendo no tempo livre mesmo.', 'm'],
      ['Patrícia', 'Minha shih tzu tem 2 aninhos e eu jurava que já era tarde pra ensinar certas coisas kkk. Fiquei surpresa com o quanto ela consegue aprender com um pouco de paciência.', 'f']
    ]
  },
  salsicha: {
    R: 'Salsicha', C: 'Bidu', f: false,
    chapeu: 'Para quem tem Salsicha (Dachshund)',
    dor: 'Tapetinho novo, atrativo, jornal. E o Salsicha continua fazendo xixi atrás do sofá.',
    corpo: 'o corpo comprido e o jeito',
    lista5: [
      'O treino não ensina a pular nem a ficar em pé nas patas de trás.',
      'Senta normal, sem o "senta bonito".',
      'Ração da própria refeição como petisco do treino.',
      'Faro de caçador: trabalho para o nariz gasta energia sem pulo.'
    ],
    // depoimentos reais recebidos pelo Vini (2026-11-09), literais: nome e texto como chegaram, sem editar.
    // [nome, texto, 'f' ou 'm'] para o descritor Tutora/Tutor de {R}
    depoimentos: [
      ['Mariana Costa', 'Quem tem salsicha sabe o quanto esses bichinhos são teimosos 😂 O meu fazia o que queria. Gostei que os exercícios são curtinhos, aí consigo fazer com ele todos os dias.', 'f'],
      ['Bruno Henrique de Almeida Santos', 'Aqui o problema era passeio, ele puxava a guia sem parar. Ainda estamos treinando, mas já consigo sair com ele bem mais tranquilo. Pra mim já valeu.', 'm'],
      ['Aline R.', 'Nunca tinha conseguido ensinar nem o básico pra minha cachorrinha. Com as orientações consegui fazer ela aprender o senta e agora estamos tentando o fica. Tô toda boba kkkkk', 'f']
    ]
  },
  yorkshire: {
    R: 'Yorkshire', C: 'Nina', f: true,
    chapeu: 'Para quem tem Yorkshire',
    dor: 'Tapetinho novo, atrativo, jornal. E o Yorkshire acerta à noite e erra o dia inteiro.',
    corpo: 'o corpo e o jeito',
    lista5: [
      'Mais idas ao tapetinho, com intervalos curtos.',
      'Descer do sofá pela rampa ou pelo colo.',
      'Latido de aviso: parar quando você agradece, não latido zero.',
      'Nos passeios, distância de outros cães até o treino estar firme.'
    ],
    // depoimentos reais recebidos pelo Vini (2026-11-09), literais: nome e texto como chegaram, sem editar.
    // [nome, texto, 'f' ou 'm'] para o descritor Tutora/Tutor de {R}
    depoimentos: [
      ['Beatriz Santos de Oliveira', 'Meu yorkshire era o dono da casa kkkkk latia quando chegava visita, quando tocava campainha, por qualquer coisa. Tô seguindo os exercícios e já percebi uma diferença boa.', 'f'],
      ['Gustavo Pereira', 'Gostei porque não é aquela coisa complicada que a gente vê na internet. É bem direto, mostra o que fazer e vou praticando com ela aos poucos.', 'm'],
      ['Renata', 'Tenho dois yorks e cada um tem uma personalidade completamente diferente. Comecei treinando o mais agitado e já tô vendo progresso. O segredo aqui tá sendo ter paciência e repetir todo dia.', 'f']
    ]
  }
};

export const texto = {
  marca: 'No Tapetinho',
  hero: {
    // headline nova (2026-11-09, Vini: a promessa só de xixi era fraca): obediência em casa contra o adestrador pago; o xixi entra no sub
    h1: 'Ensine seu {R} a te obedecer em casa, sem pagar adestrador.',
    sub: 'Senta, fica, vem e xixi no tapetinho: 3 minutos por dia, com o passo a passo no celular.',
    micro: 'R$ 37 uma vez só · Pix ou cartão · no seu celular'
  },
  botao: 'Quero o No Tapetinho',
  dor: {
    p: 'Faz do lado, rasga o tapetinho, acerta de noite e erra de dia.',
    legenda: 'Cada caso tem o que fazer no app.'
  },
  // trilho "Por dentro do app" (2026-11-09): as telas inteiras, uma por vez, no celular (estilo da Lucro na Mão).
  // [tela, título, linha]; a ordem é o caminho de quem usa: hoje, o treino, o plano, o xixi, o Agora, os comandos, a raça, os bônus
  // o celular do hero em partes, estilo Stories, como o da Lucro na Mão (2026-11-09, Vini): [tipo, tela, legenda, descrição].
  // Vídeo: gravação muda do app (video/<raça>/); print: tela inteira com o realce medido no midia.mjs. Legenda curta: cabe numa linha
  story: [
    ['video', 'dia', 'O treino de hoje, 3 min', 'Gravação do app: o dia 5 começa, o relógio conta 3 minutos, os passos aparecem e Feito'],
    ['img', 'diario', 'O xixi anotado em 2 toques', 'Diário do xixi: os botões No tapetinho e Fora do lugar e o gráfico por horário dos últimos 7 dias'],
    ['img', 'xixi', 'Xixi fora? O que fazer', 'Tela Xixi e cocô fora do lugar: o que fazer agora, em passos numerados'],
    ['img', 'comandos', '7 comandos com o {R}', 'Tela Comandos: os cartões desenhados com um {R}, com os já aprendidos marcados'],
    ['img', 'senta', 'Passo a passo de cada um', 'Comando Senta: a ilustração e o passo a passo'],
    ['video', 'agora', 'Latiu? Um toque e pronto', 'Gravação do app: tela Agora, toque em Late demais e o que fazer aparece'],
    ['img', 'kit', 'Bônus: kit para imprimir', 'Kit para imprimir: o calendário dos 21 dias com o nome e a foto do cão']
  ],
  telas: {
    h2: 'Por dentro do app do {R}',
    p: 'Arraste para o lado e veja cada tela, do jeito que fica no seu celular.',
    itens: [
      ['hoje', 'O treino de hoje', 'Abre no dia certo, com o nome e a foto do seu cachorro.'],
      ['sessao', '3 minutos, com o relógio na tela', 'Passos curtos. Terminou, toque em Feito.'],
      ['plano', 'O plano de 21 dias', 'Um passo por dia, cada um com uma tarefa da casa.'],
      ['diario', 'O diário do xixi', 'Dois toques: acertou ou errou. Mostra o horário em que ele mais erra.'],
      ['xixi', 'Xixi fora do lugar', 'O que fazer na hora e o que treinar, caso a caso.'],
      ['agora', 'Aconteceu agora?', 'Latido, choro sozinho, guia, mordida, visitas: um toque.'],
      ['comandos', 'Os 7 comandos', 'Desenhados com um {R}. Marque os que ele já faz.'],
      ['senta', 'Cada comando, passo a passo', 'Do senta ao vem, escrito para quem nunca adestrou.'],
      ['raca', 'Meu {R}', 'O que muda no treino por causa do corpo e do jeito da raça.'],
      ['kit', 'Bônus: o kit para imprimir', 'O calendário dos 21 dias e os cartões, com o nome dele.'],
      ['familia', 'O combinado da família', 'As mesmas palavras para todo mundo da casa, para mandar no grupo.']
    ]
  },
  dia: {
    h2: 'Ele não faz xixi fora por pirraça',
    itens: [
      'Cachorro repete o que deu certo. Bronca depois do xixi só ensina a esconder.',
      'Por isso o app premia o acerto na hora e arruma a casa para ele não errar.'
    ],
    legenda: 'Abra, toque em Começar e siga os passos por 3 minutos. Escrito para quem nunca adestrou.',
    plano: 'São 21 dias, um passo por dia. Roteiro de treino, não promessa: não deu certo, repita o dia.'
  },
  xixi: {
    h2: 'O xixi começa no dia 1',
    itens: [
      'A tela de hoje lembra quando levar ao tapetinho. Fez lá: "isso!" e petisco.',
      'Fez fora: dois toques no diário. Ele mostra o horário em que {oC} mais erra.'
    ],
    menor: 'Xixi toda hora e pouco de cada vez? O app manda primeiro ao veterinário.',
    micro: 'R$ 37 uma vez só'
  },
  raca: {
    h2: 'Feito para o {R}, não para cachorro em geral',
    p: 'O treino leva em conta {corpo} do {R}. Os 7 comandos vêm desenhados com ele.',
    menor: 'Orientação geral da raça, não avaliação de saúde.'
  },
  agora: {
    h2: 'Aconteceu agora? Um toque e você vê o que fazer',
    p: 'Latido, choro sozinho, mordida, guia, visitas: o que fazer já e quando buscar ajuda.'
  },
  vem: {
    h2: 'O que vem no app do {R}',
    itens: [
      'O treino de hoje, de 3 minutos',
      'O plano de 21 dias',
      '7 comandos desenhados com o {R}',
      'Agora: 8 problemas do dia a dia',
      'O diário do xixi',
      'Meu {R}: o que muda na raça',
      'O combinado da família, para mandar no WhatsApp',
      'De bônus, o kit para imprimir, com o nome dele'
    ],
    legenda: 'O calendário dos 21 dias e os cartões dos comandos, prontos para a geladeira.'
  },
  // depoimentos (2026-11-09, Vini): entre o que vem e a oferta, a prova logo antes do preço. Estilo de depoimento de blog
  // (cartão com aspas, texto, inicial, nome e Tutora/Tutor da raça); sem foto, curtidas, data, estrelas ou selo
  prova: {
    h2: 'O que tutores de {R} estão dizendo',
    p: 'Mensagens que recebemos de quem já usa o app.',
    tutor: { f: 'Tutora de {R}', m: 'Tutor de {R}' }
  },
  oferta: {
    h2: 'No Tapetinho por R$ 37, uma vez só',
    itens: [
      'Sem mensalidade. Pix ou cartão.',
      'O acesso chega no e-mail quando o pagamento confirma.'
    ],
    // preço de lançamento (2026-11-03): R$ 37 é o lançamento, o preço cheio é R$ 69,90
    lancamento: 'Preço de lançamento',
    de: 'R$ 69,90',
    por: 'por R$ 37',
    legenda: 'Depois da compra, você põe o nome e a foto dele.',
    micro: 'Não serviu? Você tem 7 dias para pedir o reembolso pela Cakto.'
  },
  faq: [
    ['Serve para filhote e para adulto?', 'Sim, o plano começa do zero. Para os 90 primeiros dias, há um adicional opcional no pagamento.'],
    ['Moro em apartamento. Serve?', 'Sim. O treino é na sala, com o tapetinho. A rua só entra na semana 3.'],
    ['Em 21 dias ele vai estar educado?', 'Os 21 dias são o roteiro do treino, não prazo de resultado. Cada cão tem o seu ritmo.'],
    ['Tem mensalidade?', 'Não, R$ 37 uma vez só. No pagamento aparecem adicionais opcionais; só entram se você marcar.'],
    ['Preciso baixar na loja de aplicativos?', 'Não. O app abre pelo link do e-mail, no navegador do celular.'],
    ['Meu cão morde ou avança em pessoas. Serve?', 'Para mordida de brincadeira, sim. Se morde pessoas ou pode machucar, procure um profissional de comportamento.'],
    ['Substitui o veterinário?', 'Não. É material educativo, e o app avisa quando é caso de veterinário.']
  ],
  fecho: {
    linha: 'Comece hoje pelo dia 1: o "isso!" e o lugar do tapetinho.',
    micro: 'R$ 37 uma vez só',
    aviso: 'Material educativo. Não substitui o veterinário.'
  },
  rodape: { marca: 'No Tapetinho', email: 'contato@notapetinho.com' }
};

// a raiz notapetinho.com, destino da bio do Instagram e do Facebook: texto literal do marca.md (2026-11-03; h1 trocado em 2026-11-09), sem foco em raça e sem preço
export const raiz = {
  titulo: 'No Tapetinho: adestramento em casa, pelo celular',
  descricao: 'App de adestramento para fazer em casa, feito para a raça do seu cachorro: treino de 3 minutos por dia, plano de 21 dias, sem gritar e sem castigo.',
  chapeu: 'Adestramento em casa, pelo celular',
  h1: 'Ensine seu cachorro a te obedecer em casa, sem pagar adestrador.',
  sub: 'Um app de adestramento feito para a raça do seu cachorro. Você abre, faz o treino do dia e marca feito. Sem gritar e sem castigo.',
  // ícones da própria interface do app, na ordem do marca.md: relógio, calendário, gota
  linhas: [['relogio', '**3 minutos por dia**, com o relógio na tela'], ['plano', '**Plano de 21 dias**, com o xixi treinado desde o dia 1'], ['gota', '**Paga uma vez**, sem mensalidade']],
  h2: 'Escolha a raça do seu cachorro',
  linhaRaca: 'Cada app tem o treino, os comandos e os cuidados da raça.',
  // ordem de lançamento; cartões iguais
  cartoes: [['lulu', 'Lulu da Pomerânia', 'Ver o app do Lulu'], ['shih-tzu', 'Shih Tzu', 'Ver o app do Shih Tzu'], ['salsicha', 'Salsicha', 'Ver o app do Salsicha'], ['yorkshire', 'Yorkshire', 'Ver o app do Yorkshire']],
  h3: 'Minha raça não está aqui',
  outra: 'Por enquanto, o app existe para estas quatro raças. Quer o da sua? Mande o nome da raça para contato@notapetinho.com. Os pedidos ajudam a escolher as próximas.',
  aviso: 'Material educativo. Não substitui o veterinário.'
};
