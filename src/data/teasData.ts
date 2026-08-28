export interface TeaItem {
  day: number;
  week: number;
  weekTitle: string;
  name: string;
  subtitle: string;
  category: 'detox' | 'termogenico' | 'diuretico' | 'calmante' | 'digestivo' | 'hormonal';
  bestTime: string;
  timingBadge: string;
  benefits: [string, string, string];
  ingredients: string[];
  preparation: string[];
  infusionTime: string;
  image: string;
  quote: string;
}

export const THIRTY_TEAS_DATA: TeaItem[] = [
  // SEMANA 1 — DETOX INICIAL (DIAS 1-7)
  {
    day: 1,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Chá Verde + Limão',
    subtitle: 'Metabolismo Acelerado & Detox Hepático',
    category: 'detox',
    bestTime: '1 xícara em jejum pela manhã e 1 xícara no meio da tarde',
    timingBadge: 'Em Jejum & Tarde',
    benefits: [
      'Rico em EGCG (epigalocatequina galato), que acelera a queima de gordura em repouso',
      'Desintoxicação expressa dos hepatócitos com o ácido cítrico do limão',
      'Aumento imediato de foco mental e disposição sem causar ansiedade'
    ],
    ingredients: [
      '1 colher de sopa de folhas de chá verde nobre (Camellia sinensis)',
      'Suco de 1/2 limão siciliano ou taiti espremido na hora',
      '300ml de água mineral a 80°C (antes de ferver)',
      'Opcional: 1 rodela de gengibre fresco'
    ],
    preparation: [
      'Aqueça a água até começar a formar pequenas bolhas no fundo (não deixe ferver).',
      'Despeje sobre as folhas de chá verde e abafe por 3 a 5 minutos.',
      'Coe a infusão e só então adicione o suco de limão para preservar a vitamina C.',
      'Beba ainda morno em pequenos goles conscientes.'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
    quote: 'O primeiro gole do seu novo ciclo: limpando o terreno para queimar gordura.'
  },
  {
    day: 2,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Hibisco + Canela em Pau',
    subtitle: 'Diurético Potente & Termogênico Ativo',
    category: 'diuretico',
    bestTime: 'Pela manhã e após o almoço (evitar após as 18h)',
    timingBadge: 'Manhã & Pós-Almoço',
    benefits: [
      'Eliminação rápida de retenção hídrica nas pernas e abdômen',
      'A canela estabiliza a glicose no sangue, bloqueando picos de insulina',
      'Ação antocianina que combate a celulite e melhora o tônus da pele'
    ],
    ingredients: [
      '1 colher de sopa de flores secas de hibisco',
      '1 canela em pau do Ceilão',
      '350ml de água filtrada fervente'
    ],
    preparation: [
      'Ferva a água com a canela em pau por 3 minutos para extrair os óleos essenciais.',
      'Desligue o fogo, adicione as flores de hibisco e tampe por 5 a 7 minutos.',
      'Coe e beba morno ou gelado com pedras de gelo e rodelas de laranja.'
    ],
    infusionTime: '6 minutos',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    quote: 'Drenagem linfática em uma xícara: desinchaço visível em 24 horas.'
  },
  {
    day: 3,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Cavalinha + Hortelã Fresca',
    subtitle: 'Detox Renal Profundo & Digestão Suave',
    category: 'detox',
    bestTime: 'Entre as refeições (10h e 15h)',
    timingBadge: 'Entre Refeições',
    benefits: [
      'Riquíssimo em silício orgânico, fortalecendo cabelo, unhas e colágeno',
      'Estimula a filtração glomerular nos rins, eliminando toxinas retidas',
      'A hortelã acalma as paredes estomacais e reduz gases e estufamento'
    ],
    ingredients: [
      '1 colher de sopa de cavalinha desidratada',
      '6 a 8 folhas de hortelã fresca levemente amassadas',
      '300ml de água fervente'
    ],
    preparation: [
      'Adicione a cavalinha e a hortelã em infusor ou bule.',
      'Despeje a água fervente e abafe por 7 minutos.',
      'Beba morno, apreciando o aroma refrescante da hortelã.'
    ],
    infusionTime: '7 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'Pele firme e rins purificados através do silício vegetal da cavalinha.'
  },
  {
    day: 4,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Gengibre Fresco + Limão',
    subtitle: 'Termogênico Celular & Imunidade Blindada',
    category: 'termogenico',
    bestTime: 'Pela manhã em jejum ou 20 minutos antes do treino',
    timingBadge: 'Jejum ou Pré-Treino',
    benefits: [
      'O gingerol eleva a temperatura corporal basal e queima calorias extras',
      'Poderosa ação anti-inflamatória em articulações e tecidos',
      'Fortalece o sistema imune e acelera a digestão gástrica'
    ],
    ingredients: [
      '3 a 4 rodelas finas de gengibre fresco descascado',
      'Suco de 1/2 limão siciliano',
      '300ml de água'
    ],
    preparation: [
      'Ferva a água com o gengibre por 5 minutos em fogo brando (decocção).',
      'Desligue o fogo, coe e espere amornar 2 minutos.',
      'Adicione o suco de limão fresco e tome em seguida.'
    ],
    infusionTime: '5 minutos (fervura)',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    quote: 'O calor metabólico que acorda suas mitocôndrias e expulsa o cansaço.'
  },
  {
    day: 5,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Dente-de-Leão + Limão',
    subtitle: 'Detox Hepático & Regeneração da Bile',
    category: 'detox',
    bestTime: 'Em jejum pela manhã ou 30 minutos antes do almoço',
    timingBadge: 'Jejum Matinal',
    benefits: [
      'Estimula a produção biliar, facilitando a digestão de gorduras saudáveis',
      'Purifica os hepatócitos de substâncias químicas e resíduos acumulados',
      'Diurético natural que não depele o potássio corporal'
    ],
    ingredients: [
      '1 colher de sobremesa de folhas ou raízes de dente-de-leão',
      'Gotas de limão fresco',
      '250ml de água fervente'
    ],
    preparation: [
      'Coloque o dente-de-leão na água quente e deixe em infusão por 8 minutos.',
      'Coe, pingue 10 gotas de limão e beba ainda aquecido.'
    ],
    infusionTime: '8 minutos',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    quote: 'Um fígado limpo é o maior queimador de gordura natural do corpo humano.'
  },
  {
    day: 6,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Chá Branco + Gengibre',
    subtitle: 'Antioxidante Nobre & Acelera Metabolismo',
    category: 'termogenico',
    bestTime: 'Pela manhã ou início da tarde',
    timingBadge: 'Manhã',
    benefits: [
      'O chá menos processado do mundo: concentração máxima de catequinas puras',
      'Previne a quebra precoce de elastina e colágeno dérmico',
      'Acelera suavemente o metabolismo sem gerar irritação gástrica'
    ],
    ingredients: [
      '1 colher de sopa de brotos de chá branco',
      '2 rodelas finas de gengibre',
      '300ml de água a 75°C'
    ],
    preparation: [
      'Infusione o chá branco e o gengibre na água morna por 4 a 5 minutos.',
      'Beba sem adoçar para apreciar as notas florais delicadas.'
    ],
    infusionTime: '5 minutos',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
    quote: 'A elegância imperial do chá branco devolvendo o viço à sua pele.'
  },
  {
    day: 7,
    week: 1,
    weekTitle: 'Semana 1 — Detox Inicial',
    name: 'Camomila + Lavanda Francesa',
    subtitle: 'Descanso Reparador & Queda Imediata do Cortisol',
    category: 'calmante',
    bestTime: '45 minutos antes de dormir',
    timingBadge: 'Noite (Pré-Sono)',
    benefits: [
      'Contém apigenina, flavonoide que se liga aos receptores GABA no cérebro',
      'Desativa o sistema nervoso simpático e baixa a pressão arterial noturna',
      'Prepara o corpo para o sono REM profundo, onde o GH é liberado'
    ],
    ingredients: [
      '1 colher de sopa de flores de camomila inteiras',
      '1/2 colher de chá de flores de lavanda culinária',
      '250ml de água fervente'
    ],
    preparation: [
      'Despeje água fervente sobre as flores secas e tampe por 8 a 10 minutos.',
      'Inale o vapor aromático antes de tomar para absorver o linalol pelas vias olfativas.'
    ],
    infusionTime: '9 minutos',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    quote: 'Semana 1 concluída com maestria: suas células estão prontas para acelerar.'
  },

  // SEMANA 2 — ACELERAÇÃO (DIAS 8-14)
  {
    day: 8,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Mate Tostado + Limão',
    subtitle: 'Energia Limpa & Termogênico Sustentado',
    category: 'termogenico',
    bestTime: 'Pela manhã (substituto nobre do café)',
    timingBadge: 'Manhã',
    benefits: [
      'Rico em teobromina e cafeína de liberação suave sem taquicardia',
      'Aumenta a saciedade e reduz o apetite compulsivo matinal',
      'Excelente oxidante lipídico durante atividades do dia a dia'
    ],
    ingredients: [
      '1 colher de sopa de erva-mate tostada orgânica',
      'Suco de 1/2 limão taiti',
      '300ml de água quente (85°C)'
    ],
    preparation: [
      'Faça a infusão do mate por 5 minutos, coe e misture o suco de limão.'
    ],
    infusionTime: '5 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'Energia inabalável e queima constante ao longo de toda a manhã.'
  },
  {
    day: 9,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Alcachofra + Gengibre',
    subtitle: 'Detox Fígado & Ativação Enzimática',
    category: 'detox',
    bestTime: '20 minutos antes do almoço',
    timingBadge: 'Pré-Almoço',
    benefits: [
      'A cinarina da alcachofra acelera a quebra de lipídios no duodeno',
      'Combate a sensação de estufamento e digestão pesada',
      'Ajuda a regular os níveis de colesterol sérico'
    ],
    ingredients: [
      '1 colher de folhas secas de alcachofra',
      '2 fatias de gengibre fresco',
      '250ml de água fervente'
    ],
    preparation: [
      'Infusione por 7 minutos, coe e tome 20 minutos antes da refeição principal.'
    ],
    infusionTime: '7 minutos',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    quote: 'Digestão leve como uma pluma, mesmo após pratos ricos em azeite.'
  },
  {
    day: 10,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Cúrcuma + Pimenta Preta + Limão',
    subtitle: 'O Anti-Inflamatório Mais Potente da Terra',
    category: 'detox',
    bestTime: 'Em jejum pela manhã ou meio da tarde',
    timingBadge: 'Manhã / Tarde',
    benefits: [
      'A piperina da pimenta preta aumenta a absorção da curcumina em 2000%',
      'Desinflamação profunda de articulações, intestino e tecido adiposo',
      'Combate radicais livres responsáveis pelo envelhecimento celular'
    ],
    ingredients: [
      '1 colher de chá de cúrcuma pura em pó (ou ralada fresca)',
      '1 pitada pequena de pimenta preta moída na hora',
      'Suco de 1/2 limão',
      '300ml de água morna'
    ],
    preparation: [
      'Misture a cúrcuma e a pimenta na água quente, deixe repousar 4 minutos e adicione o limão.'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    quote: 'O elixir dourado: desinflamação celular comprovada pela ciência.'
  },
  {
    day: 11,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Hortelã + Erva-Doce',
    subtitle: 'Digestão Perfeita & Zero Inchaço Abdominal',
    category: 'digestivo',
    bestTime: 'Imediatamente após almoço ou jantar',
    timingBadge: 'Pós-Refeição',
    benefits: [
      'Ação carminativa imediata: alívio de cólicas, gases e distensão',
      'Relaxa a musculatura lisa do trato gastrointestinal',
      'Sabor adocicado natural que elimina a vontade de sobremesas'
    ],
    ingredients: [
      '1 colher de sementes de erva-doce levemente maceradas',
      '1 punhado de folhas de hortelã',
      '300ml de água fervente'
    ],
    preparation: [
      'Despeje água fervente, abafe por 6 minutos, coe e aprecie quente.'
    ],
    infusionTime: '6 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'Abdômen plano e sensação de leveza instantânea após as refeições.'
  },
  {
    day: 12,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Rooibos Vermelho + Canela',
    subtitle: 'Antioxidante Raro & Controle de Açúcar',
    category: 'hormonal',
    bestTime: 'Às 16h (horário crítico de compulsão)',
    timingBadge: 'Tarde (16h)',
    benefits: [
      'Zero cafeína com polifenóis raros (aspalatina e notofagina)',
      'Equilibra a curva glicêmica da tarde, evitando quedas de energia',
      'Rico em minerais que nutrem a pele e o sistema cardiovascular'
    ],
    ingredients: [
      '1 colher de chá de folhas de Rooibos',
      '1 pedaço de canela em pau',
      '250ml de água fervente'
    ],
    preparation: [
      'Infusione por 6 a 8 minutos. Pode adicionar umas gotas de leite vegetal se desejar.'
    ],
    infusionTime: '7 minutos',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    quote: 'O escudo vespertino contra a compulsão por doces e pães.'
  },
  {
    day: 13,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Sálvia + Limão Siciliano',
    subtitle: 'Equilíbrio Hormonal Feminino & Detox',
    category: 'hormonal',
    bestTime: 'Pela manhã ou início da tarde',
    timingBadge: 'Manhã',
    benefits: [
      'Fitoestrógenos naturais que equilibram as flutuações do ciclo feminino',
      'Reduz sudorese excessiva, calorões e retenção pré-menstrual',
      'Tonifica o sistema digestivo e clareia a mente'
    ],
    ingredients: [
      '4 a 5 folhas de sálvia fresca ou 1 colher de seca',
      'Rodelas de limão siciliano',
      '250ml de água fervente'
    ],
    preparation: [
      'Abafe as folhas de sálvia por 5 minutos, coe e junte o limão.'
    ],
    infusionTime: '5 minutos',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    quote: 'A planta sagrada das mulheres mediterrâneas para harmonia hormonal.'
  },
  {
    day: 14,
    week: 2,
    weekTitle: 'Semana 2 — Aceleração',
    name: 'Valeriana + Polpa de Maracujá',
    subtitle: 'Sono REM Profundo & Redução de Cortisol Noturno',
    category: 'calmante',
    bestTime: '30 minutos antes de se deitar',
    timingBadge: 'Noite (Pré-Sono)',
    benefits: [
      'O ácido valerênico induz relaxamento neuromuscular completo',
      'Passiflora do maracujá atua sinergicamente silenciando pensamentos acelerados',
      'Garante que você acorde sem inchaço no rosto e com a mente clara'
    ],
    ingredients: [
      '1 colher de chá de raiz de valeriana',
      'Polpa fresca de 1/2 maracujá',
      '250ml de água fervente'
    ],
    preparation: [
      'Ferva a raiz de valeriana por 3 minutos, desligue, junte a polpa de maracujá e tampe 5 minutos.'
    ],
    infusionTime: '8 minutos',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    quote: 'Metade do desafio concluída: 14 dias de consistência gerando uma nova mulher.'
  },

  // SEMANA 3 — QUEIMA DE GORDURA (DIAS 15-21)
  {
    day: 15,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Chá Preto + Gengibre',
    subtitle: 'Termogênico Estimulante & Foco Afiado',
    category: 'termogenico',
    bestTime: 'Pela manhã ao acordar',
    timingBadge: 'Manhã',
    benefits: [
      'Theaflavinas exclusivas do chá preto que bloqueiam a absorção de gorduras no intestino',
      'Combinação com gengibre gera pico controlado de energia limpa',
      'Aumenta o gasto calórico espontâneo (NEAT)'
    ],
    ingredients: [
      '1 colher de chá de folhas de chá preto (English Breakfast ou Ceilão)',
      '3 fatias de gengibre fresco',
      '300ml de água fervente'
    ],
    preparation: [
      'Infusione o chá preto com o gengibre por 4 minutos. Não deixe passar para não amargar.'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    quote: 'O motor metabólico da Semana 3 operando na velocidade máxima.'
  },
  {
    day: 16,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Cardamomo + Limão',
    subtitle: 'Aceleração Gástrica & Desintoxicação Intestinal',
    category: 'digestivo',
    bestTime: 'Após o almoço ou às 15h',
    timingBadge: 'Tarde',
    benefits: [
      'Sementes de cardamomo alcalinizam e melhoram a circulação periférica',
      'Reduz inflamação da mucosa intestinal e combate o mau hálito',
      'Auxilia na queima de gordura visceral do baixo ventre'
    ],
    ingredients: [
      '4 bagas de cardamomo levemente amassadas',
      'Suco de 1/2 limão',
      '250ml de água fervente'
    ],
    preparation: [
      'Ferva as sementes de cardamomo por 3 minutos, tampe por 5, coe e junte o limão.'
    ],
    infusionTime: '6 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'A especiaria sagrada do oriente estimulando a queima celular profunda.'
  },
  {
    day: 17,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Alecrim + Limão',
    subtitle: 'Foco Mental & Drenagem Vascular',
    category: 'detox',
    bestTime: 'Pela manhã ou antes de reuniões de trabalho',
    timingBadge: 'Manhã',
    benefits: [
      'Ácido rosmarínico melhora a oxigenação cerebral e a memória',
      'Estimula a microcirculação periférica, reduzindo vasinhos e celulite',
      'Ação tônica nas glândulas suprarrenais'
    ],
    ingredients: [
      '1 ramo de alecrim fresco (ou 1 colher de seco)',
      'Gotas de limão siciliano',
      '300ml de água fervente'
    ],
    preparation: [
      'Infusione o alecrim por 6 minutos, coe e beba perfumado com limão.'
    ],
    infusionTime: '6 minutos',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    quote: 'Mente nítida, circulação ativada e queima constante.'
  },
  {
    day: 18,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Funcho + Anis-Estrelado',
    subtitle: 'Eliminação de Gases & Cintura Fina',
    category: 'digestivo',
    bestTime: 'Após o jantar',
    timingBadge: 'Pós-Jantar',
    benefits: [
      'Desincha o intestino delgado em minutos, afinando a linha da cintura',
      'Anis-estrelado possui propriedades antiespasmódicas e antivirais',
      'Sabor naturalmente doce que conforta o estômago'
    ],
    ingredients: [
      '1 colher de sementes de funcho',
      '1 estrela de anis-estrelado',
      '250ml de água fervente'
    ],
    preparation: [
      'Ferva a estrela de anis por 2 minutos, adicione o funcho, tampe 6 minutos e coe.'
    ],
    infusionTime: '8 minutos',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    quote: 'O segredo da silhueta desinchada antes de ir para a cama.'
  },
  {
    day: 19,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Guaraná Puro em Pó + Limão',
    subtitle: 'Energia Pura & Queima Rápida',
    category: 'termogenico',
    bestTime: 'Em jejum ou 30 min antes da caminhada',
    timingBadge: 'Manhã / Pré-Treino',
    benefits: [
      'Liberação lenta de cafeína vegetal associada a taninos benéficos',
      'Aumenta o limiar de resistência física e foco',
      'Maximiza a lipólise durante o movimento'
    ],
    ingredients: [
      '1 colher de café rasa de pó de guaraná 100% puro da Amazônia',
      'Suco de 1/2 limão',
      '250ml de água morna'
    ],
    preparation: [
      'Misture bem o pó na água com limão até dissolver completamente e tome imediatamente.'
    ],
    infusionTime: 'Preparo instantâneo',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    quote: 'Disposição renovada para vencer o dia sem cansaço.'
  },
  {
    day: 20,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Boldo do Chile + Hortelã',
    subtitle: 'Regeneração Hepática Expressa',
    category: 'detox',
    bestTime: 'Em jejum pela manhã',
    timingBadge: 'Jejum Matinal',
    benefits: [
      'A boldina estimula a secreção da bile e alivia a sobrecarga do fígado',
      'Hortelã ameniza o amargor e potencializa o efeito digestivo',
      'Acelera a eliminação de toxinas e resíduos acumulados'
    ],
    ingredients: [
      '2 folhas secas de boldo do chile legítimo',
      '4 folhas de hortelã',
      '200ml de água fervente'
    ],
    preparation: [
      'Infusione por apenas 3 a 4 minutos (não deixe mais para não ficar excessivamente amargo).'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'O reset do fígado para destravamento metabólico.'
  },
  {
    day: 21,
    week: 3,
    weekTitle: 'Semana 3 — Queima de Gordura',
    name: 'Mulungu + Camomila',
    subtitle: 'Bloqueio da Ansiedade Noturna & Sono Pesado',
    category: 'calmante',
    bestTime: '40 minutos antes de dormir',
    timingBadge: 'Noite (Pré-Sono)',
    benefits: [
      'Alcaloides do mulungu atuam no sistema nervoso central como ansiolítico natural',
      'Elimina o hábito de assaltar a geladeira à meia-noite',
      'Permite acordar com sensação de renovação celular real'
    ],
    ingredients: [
      '1 colher de chá de casca de mulungu',
      '1 colher de flores de camomila',
      '250ml de água'
    ],
    preparation: [
      'Ferva o mulungu por 5 minutos, desligue, junte a camomila, tampe 5 minutos e coe.'
    ],
    infusionTime: '10 minutos',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    quote: '21 dias de vitória! O hábito está consolidado na sua mente e no seu corpo.'
  },

  // SEMANA 4 — MANUTENÇÃO E EQUILÍBRIO (DIAS 22-30)
  {
    day: 22,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Chá de Arroz Tostado + Canela',
    subtitle: 'Genmaicha Adaptado: Conforto Gástrico & Saciedade',
    category: 'digestivo',
    bestTime: 'No meio da tarde (15h–16h)',
    timingBadge: 'Tarde',
    benefits: [
      'Arroz integral tostado libera amido resistente que nutre a microbiota boa',
      'Gera profunda sensação de saciedade e calma emocional',
      'Canela estabiliza os níveis de insulina pós-lanche'
    ],
    ingredients: [
      '1 colher de arroz integral tostado na frigideira',
      '1/2 canela em pau',
      '300ml de água fervente'
    ],
    preparation: [
      'Toste o arroz na frigideira seca até dourar, junte na água fervente com a canela por 8 minutos.'
    ],
    infusionTime: '8 minutos',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
    quote: 'O conforto oriental que nutre suas bactérias boas e corta a fome ansiosa.'
  },
  {
    day: 23,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Capim-Limão + Gengibre',
    subtitle: 'Digestão Serena & Ação Termogênica Suave',
    category: 'termogenico',
    bestTime: 'Após o almoço ou no final de tarde',
    timingBadge: 'Tarde',
    benefits: [
      'O citral do capim-limão acalma os nervos enquanto o gengibre acelera a queima',
      'Alivia espasmos digestivos e sensação de peso estomacal',
      'Aroma revigorante que combate a fadiga mental vespertina'
    ],
    ingredients: [
      '1 colher de folhas picadas de capim-limão (capim-santo)',
      '2 rodelas de gengibre',
      '250ml de água fervente'
    ],
    preparation: [
      'Infusione por 7 minutos com a xícara abafada e beba ainda quente.'
    ],
    infusionTime: '7 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'A harmonia perfeita entre serenidade e queima metabólica.'
  },
  {
    day: 24,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Amora Miúra + Hibisco',
    subtitle: 'Antioxidante Feminino Nobre & Drenagem',
    category: 'hormonal',
    bestTime: 'Pela manhã ou entre as refeições',
    timingBadge: 'Manhã',
    benefits: [
      'Rico em fitoquímicos reguladores dos hormônios ovarianos e tireoidianos',
      'Drenagem linfática contínua sem desidratação tecidual',
      'Combate a flacidez e estimula a produção de colágeno natural'
    ],
    ingredients: [
      '1 colher de folhas secas de amora miúra',
      '1 colher de sobremesa de flores de hibisco',
      '300ml de água fervente'
    ],
    preparation: [
      'Abafe por 6 minutos, coe e tome ao longo da manhã.'
    ],
    infusionTime: '6 minutos',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    quote: 'O protetor hormonal feminino que devolve a firmeza à sua pele.'
  },
  {
    day: 25,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Espinheira-Santa + Limão',
    subtitle: 'Proteção da Mucosa Gástrica & Detox',
    category: 'digestivo',
    bestTime: '30 minutos antes das refeições principais',
    timingBadge: 'Pré-Refeição',
    benefits: [
      'Neutraliza a hiperacidez gástrica e cura gastrites ou desconfortos',
      'Cria uma película protetora nas paredes do estômago',
      'Facilita a digestão de proteínas e nutrientes densos'
    ],
    ingredients: [
      '1 colher de sopa de folhas de espinheira-santa',
      'Gotas de limão fresco',
      '250ml de água fervente'
    ],
    preparation: [
      'Faça infusão de 8 minutos, coe e beba morno antes de comer.'
    ],
    infusionTime: '8 minutos',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    quote: 'Um estômago protegido absorve 100% dos nutrientes que rejuvenescem.'
  },
  {
    day: 26,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Carqueja Amarga + Alcachofra',
    subtitle: 'Detox Fígado Terminal & Emagrecimento',
    category: 'detox',
    bestTime: 'Em jejum pela manhã (para as guerreiras da consistência)',
    timingBadge: 'Jejum Matinal',
    benefits: [
      'Estimula a liberação de bile e a quebra acelerada de adipócitos antigos',
      'Ajuda a regular os níveis de glicemia em jejum',
      'Elimina resíduos inflamatórios profundos'
    ],
    ingredients: [
      '1 colher de chá de carqueja doce ou amarga',
      '1 colher de folhas de alcachofra',
      '250ml de água fervente'
    ],
    preparation: [
      'Infusione por 4 minutos. Beba de uma vez só com postura vitoriosa.'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    quote: 'O amargo que cura e purifica o corpo por dentro.'
  },
  {
    day: 27,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Flor de Jasmim + Chá Verde',
    subtitle: 'Calma Serena & Metabolismo Ativo',
    category: 'termogenico',
    bestTime: 'Pela manhã ou às 14h',
    timingBadge: 'Manhã / Tarde',
    benefits: [
      'O aroma das flores de jasmim atua como sedativo suave do sistema límbico',
      'O chá verde mantém o metabolismo acelerado em harmonia',
      'Rico em polifenóis anti-envelhecimento'
    ],
    ingredients: [
      '1 colher de sopa de pérolas de chá verde com jasmim',
      '300ml de água a 80°C'
    ],
    preparation: [
      'Infusione por 3 a 4 minutos e aprecie a fragrância floral sofisticada.'
    ],
    infusionTime: '4 minutos',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80',
    quote: 'A sofisticação dos chás nobres desenhando o seu novo estilo de vida.'
  },
  {
    day: 28,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Maca Peruana + Canela + Água Morna',
    subtitle: 'Vitalidade Hormonal & Disposição Feminina',
    category: 'hormonal',
    bestTime: 'Em jejum pela manhã',
    timingBadge: 'Jejum Matinal',
    benefits: [
      'Adaptógeno andino que aumenta a energia física, foco e libido',
      'Auxilia na regulação hormonal e na preservação da massa magra',
      'Canela acelera o metabolismo e dá sabor encorpado'
    ],
    ingredients: [
      '1 colher de café de maca peruana em pó pura',
      '1/2 colher de café de canela em pó',
      '200ml de água morna ou leite de amêndoas'
    ],
    preparation: [
      'Dissolva bem os pós na água morna usando um garfo ou mixer pequeno.'
    ],
    infusionTime: 'Preparo instantâneo',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    quote: 'Energia vital restaurada: a força da mulher 4womans no seu ápice.'
  },
  {
    day: 29,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Ashwagandha + Leite Vegetal (Moon Milk)',
    subtitle: 'O Adaptógeno Definitivo Anti-Cortisol',
    category: 'calmante',
    bestTime: '1 hora antes de dormir',
    timingBadge: 'Noite (Pré-Sono)',
    benefits: [
      'Redução de até 28% no cortisol sérico comprovada cientificamente',
      'Melhora extraordinária na qualidade do sono profundo',
      'Ajuda a queimar a gordura visceral enquanto você descansa'
    ],
    ingredients: [
      '1/2 colher de café de pó de Ashwagandha (KSM-66)',
      '1 pitada de noz-moscada ralada na hora',
      '200ml de leite de coco ou amêndoas aquecido'
    ],
    preparation: [
      'Aqueça o leite vegetal, misture a ashwagandha e a noz-moscada, mexa bem e tome quentinho.'
    ],
    infusionTime: 'Preparo 3 min',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    quote: 'O abraço hormonal noturno: descanso profundo e rejuvenescimento biológico.'
  },
  {
    day: 30,
    week: 4,
    weekTitle: 'Semana 4 — Manutenção e Equilíbrio',
    name: 'Chá da Celebração (Seu Chá Favorito + Gratidão)',
    subtitle: '30 Dias de Transformação Concluídos!',
    category: 'hormonal',
    bestTime: 'No momento mais sagrado e tranquilo do seu dia',
    timingBadge: 'Celebração 🏆',
    benefits: [
      'Seu organismo completou 30 dias de desinflamação botânica contínua',
      'Metabolismo reprogramado, retenção hídrica eliminada e pele radiante',
      'Consistência inquebrável construída e validada'
    ],
    ingredients: [
      'Sua infusão favorita dos últimos 29 dias',
      '1 rodela de limão e 1 ramo de alecrim para decorar',
      '300ml de água fervente'
    ],
    preparation: [
      'Prepare com toda a calma e amor-próprio. Faça uma respiração 4-7-8 antes do primeiro gole e celebre sua conquista!'
    ],
    infusionTime: '5 minutos',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    quote: 'PARABÉNS! 30 dias de detox completados com honra e consistência. Seu corpo está transformado!'
  }
];
