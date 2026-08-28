import React, { useState } from 'react';
import { Coffee, Utensils, Apple, MoonStar } from 'lucide-react';

interface MealPlanProps {
  phase?: 'week1_early' | 'week1_late';
}

export const MealPlanSwitcher: React.FC<MealPlanProps> = ({ phase = 'week1_early' }) => {
  const isEarly = phase === 'week1_early';
  const days = isEarly ? [1, 2, 3] : [4, 5, 6, 7];
  const [selectedDay, setSelectedDay] = useState(days[0]);

  const mealData: Record<number, { cafe: string; almoco: string; lanche: string; jantar: string }> = {
    1: {
      cafe: 'Pão de fermentação lenta tostado + 1 colh. sopa de azeite extravirgem + tomate ralado + chá verde',
      almoco: 'Salada generosa de folhas e pepino + filé de peixe branco grelhado + 3 colh. de quinoa com ervas',
      lanche: '1 maçã média fatiada com 4 nozes chilenas',
      jantar: 'Sopa cremosa de abóbora cabotiá com gengibre + 1 ovo pochê + folhas de espinafre frescas'
    },
    2: {
      cafe: 'Iogurte natural integral (sem açúcar) + 1 colh. chá mel puro + morangos picados + sementes de chia',
      almoco: 'Abobrinha salteada no azeite + filé de peito de frango grelhado + batata-doce assada em rodelas',
      lanche: 'Xícara de chá de hibisco gelado + 1 fatia média de queijo minas frescal',
      jantar: 'Salada mediterrânea com grão-de-bico, tomates cereja, pepino e fio generoso de azeite'
    },
    3: {
      cafe: '2 ovos mexidos no azeite com folhas de espinafre frescas + 1 fatia de pão de centeio',
      almoco: 'Feijão simples cozido + arroz integral + couve refogada no alho + peixe assado com limão',
      lanche: '1 pera suculenta + 6 amêndoas cruas',
      jantar: 'Berinjela ao forno com queijo branco gratinado e brócolis ao alho'
    },
    4: {
      cafe: 'Smoothie de banana congelada + 200ml leite de amêndoas + 1 colh. sopa chia + 1 colh. cacau 100%',
      almoco: 'Salada multicolorida com folhas e tomate + lentilha cozida + 2 ovos cozidos com azeite e orégano',
      lanche: 'Mix de castanhas-do-pará e nozes (30g)',
      jantar: 'Sopa reconfortante de legumes variados + iscas de frango desfiado'
    },
    5: {
      cafe: 'Pão integral tostado + azeite extravirgem + fatias de tomate com orégano fresco + chá de hortelã',
      almoco: 'Quinoa com legumes salteados + filé de peixe assado ao forno com alecrim',
      lanche: 'Iogurte natural integral com canela em pó polvilhada',
      jantar: 'Salada morna de folhas escuras com ricota temperada no azeite e sementes de girassol'
    },
    6: {
      cafe: 'Mingau morno de aveia em flocos com banana amassada, canela e gotas de baunilha',
      almoco: 'Grão-de-bico com abobrinha grelhada e cubos de peito de frango temperado com páprica',
      lanche: 'Maçã assada no forno com canela e nozes picadas',
      jantar: 'Creme leve de abobrinha e alho-poró com 1 ovo pochê e fio de azeite'
    },
    7: {
      cafe: '2 ovos mexidos + 1 fatia de pão 100% integral + xícara de chá de camomila morno',
      almoco: 'Peixe assado na crosta de ervas aromáticas + purê rústico de batata-doce + salada de rúcula',
      lanche: 'Queijo branco em cubos com 2 torradas integrais',
      jantar: 'Legumes coloridos assados na assadeira com filé de peixe grelhado e limão siciliano'
    }
  };

  const current = mealData[selectedDay];

  return (
    <div className="w-full my-4 bg-[#2C2C2C] p-4 border border-[#3D3D3D] shadow-md text-left">
      {/* Day Selector Pills */}
      <div className="flex items-center justify-between gap-1 mb-4 bg-[#1E1E1E] p-1 border border-[#383838]">
        {days.map((day) => (
          <button
            key={day}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDay(day);
            }}
            className={`flex-1 py-1.5 px-2 text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedDay === day
                ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-sm font-black'
                : 'text-[#F9F9F9]/70 hover:text-[#F9F9F9] border-transparent'
            }`}
          >
            Dia {day}
          </button>
        ))}
      </div>

      {/* Meals Grid Breakdown */}
      <div className="space-y-2.5 text-xs text-[#F9F9F9]">
        {/* Café da manhã */}
        <div className="p-2.5 bg-[#1E1E1E] border border-[#383838] flex items-start gap-2.5">
          <div className="p-1.5 bg-[#2C2C2C] text-[#D4AF37] border border-[#3D3D3D] shrink-0">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#C29B91] block">
              Café da Manhã (Até 08:30)
            </span>
            <p className="text-[#F9F9F9]/90 mt-0.5 leading-relaxed">{current.cafe}</p>
          </div>
        </div>

        {/* Almoço */}
        <div className="p-2.5 bg-[#1E1E1E] border border-[#383838] flex items-start gap-2.5">
          <div className="p-1.5 bg-[#2C2C2C] text-[#D4AF37] border border-[#3D3D3D] shrink-0">
            <Utensils className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#C29B91] block">
              Almoço 50/25/25 (12:00 às 13:30)
            </span>
            <p className="text-[#F9F9F9]/90 mt-0.5 leading-relaxed">{current.almoco}</p>
          </div>
        </div>

        {/* Lanche da Tarde */}
        <div className="p-2.5 bg-[#1E1E1E] border border-[#383838] flex items-start gap-2.5">
          <div className="p-1.5 bg-[#2C2C2C] text-[#D4AF37] border border-[#3D3D3D] shrink-0">
            <Apple className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#C29B91] block">
              Lanche da Tarde (16:30 às 17:30)
            </span>
            <p className="text-[#F9F9F9]/90 mt-0.5 leading-relaxed">{current.lanche}</p>
          </div>
        </div>

        {/* Jantar */}
        <div className="p-2.5 bg-[#1E1E1E] border border-[#383838] flex items-start gap-2.5">
          <div className="p-1.5 bg-[#2C2C2C] text-[#D4AF37] border border-[#3D3D3D] shrink-0">
            <MoonStar className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-[10px] uppercase tracking-wider text-[#C29B91] block">
              Jantar Leve (Até às 20:00)
            </span>
            <p className="text-[#F9F9F9]/90 mt-0.5 leading-relaxed">{current.jantar}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
