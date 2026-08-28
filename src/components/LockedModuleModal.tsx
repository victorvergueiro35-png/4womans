import React, { useState } from 'react';
import { ModuleItem } from '../types';
import { Lock, Sparkles, X, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface LockedModuleModalProps {
  module: ModuleItem | null;
  onClose: () => void;
}

export const LockedModuleModal: React.FC<LockedModuleModalProps> = ({ module, onClose }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!module) return null;

  const handleUnlock = () => {
    setIsSubscribed(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#1C1C1C] text-[#F9F9F9] border-2 border-[#8B3A5A] p-6 shadow-2xl overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#121212] hover:bg-[#D4AF37] hover:text-[#121212] text-[#F9F9F9] border border-[#383838] active:scale-95 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#8B3A5A] text-white flex items-center justify-center border border-[#A2486C]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37] block">
                Módulo Exclusivo Plus
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F9F9F9] leading-snug">
                {module.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-[#F9F9F9]/85 leading-relaxed mb-4 font-sans">
            {module.details || 'Esse módulo contém a ciência avançada e o protocolo prático definitivo para acelerar seus resultados biológicos.'}
          </p>

          <div className="bg-[#141414] p-4 border border-[#333] space-y-2.5 mb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>O que você vai dominar neste módulo:</span>
            </div>
            <ul className="text-xs text-[#F9F9F9]/80 space-y-1.5 list-disc list-inside">
              <li>Protocolo completo passo a passo sem enrolação</li>
              <li>Técnicas hormonais e metabólicas aplicadas na prática</li>
              <li>Acesso ilimitado dentro do ecossistema 4womans</li>
            </ul>
          </div>

          {isSubscribed ? (
            <div className="p-4 bg-[#241B20] border border-[#D4AF37] text-xs text-[#F9F9F9] space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solicitação de Acesso Registrada!</span>
              </div>
              <p className="text-[11px] text-[#F9F9F9]/80">
                Seu perfil está qualificado para liberação prioritária do 4womans Plus.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleUnlock}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8B3A5A] via-[#A2486C] to-[#D4AF37] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all border border-[#E5C358]/50"
              >
                <span>Assine 4womans Plus para desbloquear</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-[#F9F9F9]/60 font-sans">
                Acesso imediato a todos os 7 módulos bloqueados e atualizações contínuas.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

