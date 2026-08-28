import { ModuleItem, DailyHabit } from '../types';

export const APP_MODULES: ModuleItem[] = [
  {
    id: 'dieta-amalfitana',
    title: 'Dieta Amalfitana',
    iconName: 'Sparkles',
    color: 'burgundy',
    status: 'Disponível',
    isLocked: false,
    tagline: 'O Segredo das Mulheres Mais Lindas e Longevas do Mundo',
    details: 'Playbook visual definitivo com 112 páginas em carrossel editorial, exercícios em casa para iniciantes 35+, diagnóstico hormonal, plano alimentar de 4 semanas e manifesto de longevidade.',
    pagesCount: 112,
    estTime: '28 min de leitura'
  },
  {
    id: 'reduzindo-cortisol',
    title: 'Reduzindo seu Cortisol',
    iconName: 'HeartHandshake',
    color: 'burgundy',
    status: 'Disponível',
    isLocked: false,
    tagline: 'Desarme o Hormônio do Estresse e Destrave a Queima',
    details: 'Playbook científico com 55 páginas, protocolo do eixo HPA, respiração adrenal 4-7-8 e sinergia com os 30 Chás.',
    pagesCount: 55,
    estTime: '15 min de leitura'
  },
  {
    id: 'consistencia-dieta',
    title: 'Consistência na Dieta',
    iconName: 'Camera',
    color: 'burgundy',
    status: 'Disponível',
    isLocked: false,
    tagline: 'Fotos das Refeições, Peso Diário e Super Bônus',
    details: 'Tire fotos de TODAS as refeições, pese-se diariamente, documente resultados semanais e ganhe o Super Bônus em 30 dias.',
    pagesCount: 30,
    estTime: 'Uso Diário'
  },
  {
    id: '30-chas',
    title: '30 Chás Emagrecedores',
    iconName: 'Coffee',
    color: 'burgundy',
    status: 'Disponível',
    isLocked: false,
    tagline: '30 Dias, 30 Chás Botânicos, 30 Transformações',
    details: '30 dias de detox guiado, termogênicos, diuréticos, reguladores de cortisol e calmantes com receitas completas.',
    pagesCount: 30,
    estTime: 'Ritual Diário'
  },
  {
    id: 'treino',
    title: 'Treino',
    iconName: 'Dumbbell',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Tonificação e Postura Feminina Elegante',
    details: 'Programas de 15-30 min para tonificar e transformar sem hipertrofia excessiva.'
  },
  {
    id: 'consultoria',
    title: 'Consultoria Personalizada',
    iconName: 'CalendarHeart',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Acompanhamento Individual 1-on-1',
    details: 'Acompanhamento individual com especialistas 4womans e diagnóstico metabólico.'
  },
  {
    id: 'disciplina',
    title: 'Disciplina',
    iconName: 'Flame',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Mentalidade Inabalável e Constância',
    details: 'Desafios diários e tracker de hábitos gamificado para exterminar a procrastinação.'
  },
  {
    id: 'rotina-sono',
    title: 'Rotina de Sono',
    iconName: 'Moon',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Sono Reparador e Regeneração Celular',
    details: 'Protocolos biológicos para dormir como uma rainha e acordar desinchada.'
  },
  {
    id: 'receitas',
    title: 'Receitas',
    iconName: 'UtensilsCrossed',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Culinária Mediterrânea Prática',
    details: '100+ receitas deliciosas, rápidas e saudáveis com baixo índice glicêmico.'
  },
  {
    id: 'mulher-magnetica',
    title: '12 Passos para se Tornar uma Mulher Magnética',
    iconName: 'Crown',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Presença, Elegância e Postura de Alto Valor',
    details: '12 semanas para desenvolver magnetismo pessoal, postura, elegância e autoridade feminina.'
  },
  {
    id: 'combate-envelhecimento',
    title: 'Combate ao Envelhecimento',
    iconName: 'Hourglass',
    color: 'gray',
    status: '4womans Plus',
    isLocked: true,
    tagline: 'Longevidade Ativa e Rejuvenescimento Biológico',
    details: 'Estratégias científicas e antioxidantes naturais comprovados para retardar o envelhecimento.'
  }
];

export const DAILY_HABITS: DailyHabit[] = [
  {
    id: 'agua',
    label: 'Água (2–3L)',
    description: 'Começando com 1 copo grande com limão ao acordar',
    iconName: 'Droplet'
  },
  {
    id: 'caminhada',
    label: 'Caminhada (30 min)',
    description: 'Ao ar livre com postura ereta ou escadas',
    iconName: 'Footprints'
  },
  {
    id: 'vegetais',
    label: 'Vegetais (50% do prato)',
    description: 'Metade do prato com folhas e legumes no almoço e jantar',
    iconName: 'Salad'
  },
  {
    id: 'jantar_cedo',
    label: 'Jantar até 20h',
    description: 'Jejum noturno fisiológico reparador de 12 horas',
    iconName: 'Clock'
  },
  {
    id: 'sono',
    label: 'Sono (7–9h)',
    description: 'Quarto escuro e fresco, sem telas 1h antes',
    iconName: 'Moon'
  },
  {
    id: 'sem_acucar',
    label: 'Sem açúcar refinado',
    description: 'Substituição por frutas frescas, cacau 100% ou mel',
    iconName: 'ShieldCheck'
  }
];
