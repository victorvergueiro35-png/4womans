import React from 'react';
import { AMALFI_PAGES } from '../data/amalfiPages';
import { BookOpen, ArrowRight, Bookmark, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface PlaybookIndexProps {
  onSelectPage: (pageId: number) => void;
  bookmarkedPages: number[];
  onDownloadPdf: () => void;
}

export const PlaybookIndexView: React.FC<PlaybookIndexProps> = ({
  onSelectPage,
  bookmarkedPages,
  onDownloadPdf
}) => {
  // Group pages by chapter
  const chapters = [
    {
      number: '01',
      title: 'Capítulo 01: O Choque de Realidade & Consciência',
      desc: 'Compreenda a causa raiz da inflamação celular e a psicologia da transformação.',
      range: [1, 25]
    },
    {
      number: '02',
      title: 'Capítulo 02: As Rotinas Sagradas Diárias',
      desc: 'Horários matinais, almoço 50/25/25 e jantar leve das italianas.',
      range: [26, 33]
    },
    {
      number: '03',
      title: 'Capítulo 03: Pirâmide & Lista de Compras',
      desc: 'A pirâmide original e listas completas por seções de mercado.',
      range: [34, 39]
    },
    {
      number: '04',
      title: 'Capítulo 04: Plano Alimentar de 4 Semanas',
      desc: 'Cardápios estruturados dia a dia para acelerar a queima lipídica.',
      range: [40, 43]
    },
    {
      number: '05',
      title: 'Capítulo 05: Corpo, Sono, Mente & Skincare',
      desc: 'Respiração 4-4-6, rejuvenescimento celular e cosmética botânica.',
      range: [44, 48]
    },
    {
      number: '06',
      title: 'Capítulo 06: Solução de Problemas & Tracker',
      desc: 'Como superar deslizes e o mapa de hábitos para a vida toda.',
      range: [49, 52]
    },
    {
      number: '07',
      title: 'Capítulo 07: Consistência & Desafio 30 Dias',
      desc: 'Envio de fotos das 4 refeições, pesagem diária e o Super Bônus de 30 dias.',
      range: [53, 58]
    },
    {
      number: '08',
      title: 'Capítulo 08: O Poder dos 30 Chás Botânicos',
      desc: 'Protocolo de 30 dias de chás para acelerar a queima e regular o cortisol.',
      range: [59, 63]
    },
    {
      number: '09',
      title: 'Capítulo 09: Treinos em Casa para Mulheres 35+',
      desc: 'Exercícios em casa para iniciantes sedentárias com impacto gigante em acelerar o metabolismo.',
      range: [64, 73]
    },
    {
      number: '10',
      title: 'Capítulo 10: Consultoria & Diagnóstico Metabólico',
      desc: 'Assinatura hormonal 35+, resistência insulínica oculta, exames essenciais e biotipos.',
      range: [74, 80]
    },
    {
      number: '11',
      title: 'Capítulo 11: Disciplina & Quebra da Autossabotagem',
      desc: 'Carga mental feminina, regra dos 2 minutos, blindagem social e ambiente antigordura.',
      range: [81, 87]
    },
    {
      number: '12',
      title: 'Capítulo 12: Sono Restaurador & Hormônios',
      desc: 'Ciclo circadiano, ritual das luzes quentes, banho térmico e técnica 4-7-8 para apagar.',
      range: [88, 94]
    },
    {
      number: '13',
      title: 'Capítulo 13: Culinária Mediterrânea Express',
      desc: 'Pratos nobres em 15 minutos: Salmão ao alecrim, Frango ao limone e Shakshuka.',
      range: [95, 101]
    },
    {
      number: '14',
      title: 'Capítulo 14: Mulher Magnética & Postura',
      desc: 'Linguagem corporal da autoridade feminina 35+, voz calma, olhar sereno e estilo atemporal.',
      range: [102, 106]
    },
    {
      number: '15',
      title: 'Capítulo 15: Combate ao Envelhecimento 35+',
      desc: 'Telômeros, autofagia, trio do colágeno bioativo e polifenóis protetores celulares.',
      range: [107, 110]
    },
    {
      number: '16',
      title: 'Capítulo 16: O Despertar da Sua Nova Vida',
      desc: 'Mapa consolidado dos 90 dias e o Grande Manifesto Final da mulher 4womans.',
      range: [111, 112]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 text-[#F9F9F9]">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#1E1E1E] to-[#161616] border border-[#3D3D3D] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-[#D4AF37] text-[#121212] text-[10px] font-black uppercase tracking-[0.2em]">
            Sumário Geral • 4WOMAN'S
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#F9F9F9] mt-2.5 mb-1">
            Dieta Amalfitana — 112 Páginas
          </h1>
          <p className="text-xs sm:text-sm text-[#F9F9F9]/75 max-w-xl">
            Navegue pelos 16 capítulos estruturados ou abra a experiência completa no carrossel.
          </p>
        </div>

        <button
          onClick={() => onSelectPage(1)}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 active:scale-95 transition-all shrink-0 border border-[#D4AF37]"
        >
          <BookOpen className="w-4 h-4" />
          <span>Modo Carrossel</span>
        </button>
      </div>

      {/* Chapters Breakdown */}
      <div className="space-y-6">
        {chapters.map((ch, chIdx) => {
          const chapterPages = AMALFI_PAGES.filter(
            (p) => p.id >= ch.range[0] && p.id <= ch.range[1]
          );

          return (
            <div
              key={chIdx}
              className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md space-y-4"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#3D3D3D] pb-3">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#C29B91] block mb-0.5">
                    Seção {ch.number}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#F9F9F9]">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-[#F9F9F9]/65 mt-0.5">{ch.desc}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E1E1E] text-[#D4AF37] px-2.5 py-1 shrink-0 border border-[#3D3D3D]">
                  Pp. {ch.range[0]}–{ch.range[1]}
                </span>
              </div>

              {/* Grid of Page Items in this chapter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {chapterPages.map((page) => (
                  <motion.div
                    key={page.id}
                    whileHover={{ x: 2 }}
                    onClick={() => onSelectPage(page.id)}
                    className="p-3 bg-[#1E1E1E] hover:bg-[#252525] border border-[#383838] hover:border-[#D4AF37]/50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 bg-[#121212] text-[#D4AF37] flex items-center justify-center font-sans text-xs font-bold shrink-0 border border-[#D4AF37]/40">
                        {page.id}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#F9F9F9] truncate">
                          {page.title}
                        </h4>
                        <p className="text-[10px] text-[#F9F9F9]/60 truncate font-serif italic">
                          {page.subtitle || page.chapter}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {bookmarkedPages.includes(page.id) && (
                        <Bookmark className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-[#F9F9F9]/40" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
