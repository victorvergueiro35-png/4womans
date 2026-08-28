import React from 'react';
import { ModuleItem } from '../types';
import {
  Lock,
  ArrowRight,
  Dumbbell,
  CalendarHeart,
  Flame,
  Moon,
  UtensilsCrossed,
  Crown,
  Hourglass,
  Sparkles,
  BookOpen,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleCardProps {
  module: ModuleItem;
  onOpen: (moduleId: string) => void;
  onLockedClick?: (module: ModuleItem) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onOpen,
  onLockedClick
}) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'CalendarHeart': return <CalendarHeart {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Moon': return <Moon {...props} />;
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Hourglass': return <Hourglass {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const isUnlocked = !module.isLocked;

  // Numerical section index
  const sectionIndex = {
    'dieta-amalfitana': '01 / Protocolo',
    'treino': '02 / Movimento',
    'consultoria': '03 / Mentoria',
    'disciplina': '04 / Mindset',
    'rotina-sono': '05 / Regeneração',
    'receitas': '06 / Culinária',
    'mulher-magnetica': '07 / Postura',
    'combate-envelhecimento': '08 / Celular'
  }[module.id] || '01 / Estudo';

  return (
    <motion.div
      id={`module-card-${module.id}`}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        if (!module.isLocked) {
          onOpen(module.id);
        } else if (onLockedClick) {
          onLockedClick(module);
        }
      }}
      className={`relative group p-3.5 sm:p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
        isUnlocked
          ? 'bg-gradient-to-b from-[#222222] to-[#1A1A1A] text-[#F9F9F9] border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5'
          : 'bg-[#2C2C2C] text-[#F9F9F9] border-[#3D3D3D] hover:border-[#C29B91]/40 hover:bg-[#323232]'
      }`}
    >
      {/* Top Bar: Section Index + Status Pill */}
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <span
            className={`text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] font-bold ${
              isUnlocked ? 'text-[#D4AF37]' : 'text-[#C29B91]'
            }`}
          >
            {sectionIndex}
          </span>

          <div
            className={`px-1.5 sm:px-2 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1 border shrink-0 ${
              isUnlocked
                ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                : 'bg-[#1E1E1E] text-[#F9F9F9]/80 border-[#3D3D3D]'
            }`}
          >
            {module.isLocked ? (
              <div className="flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-[#C29B91] shrink-0" />
                <div className="flex flex-col text-[7px] sm:text-[7.5px] font-black leading-none tracking-wider text-center">
                  <span>4WOMANS</span>
                  <span className="text-[#C29B91] mt-0.5">PLUS</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#121212] shrink-0" />
                <span className="text-[8px] sm:text-[8.5px] font-black tracking-wider">Disponível</span>
              </div>
            )}
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-2 sm:gap-2.5 mb-2">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 border ${
              isUnlocked
                ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                : 'bg-[#1E1E1E] text-[#C29B91] border-[#3D3D3D] group-hover:border-[#C29B91]/40'
            }`}
          >
            {getIcon(module.iconName)}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className={`font-serif font-bold leading-tight ${
                module.title.length > 20
                  ? 'text-[11px] xs:text-xs sm:text-sm md:text-[15px]'
                  : 'text-xs sm:text-sm md:text-base'
              } ${isUnlocked ? 'text-[#F9F9F9]' : 'text-[#F9F9F9]/90'}`}
            >
              {module.title}
            </h3>
          </div>
        </div>

        {/* Tagline / Subtitle */}
        <p className="text-[11px] sm:text-xs text-[#F9F9F9]/70 line-clamp-2 mb-3 font-sans leading-relaxed">
          {module.tagline}
        </p>
      </div>

      {/* Footer Info: Page Count or Read Time */}
      <div className="pt-3 border-t border-[#3D3D3D] flex items-center justify-between text-[11px]">
        {module.pagesCount ? (
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <BookOpen className="w-3 h-3 text-[#D4AF37]" />
            {module.pagesCount} Lições
          </span>
        ) : (
          <span className="text-[#C29B91] flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3 text-[#C29B91]" />
            4womans Plus
          </span>
        )}

        <div className="flex items-center gap-1 font-bold text-xs">
          {isUnlocked ? (
            <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Acessar <ArrowRight className="w-3 h-3" />
            </span>
          ) : (
            <span className="text-[#F9F9F9]/40 group-hover:text-[#C29B91] transition-colors flex items-center gap-0.5">
              Detalhes <ArrowRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
