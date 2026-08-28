import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400); // allow fade-out animation
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onComplete, 300);
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#121212] px-6 py-12 cursor-pointer select-none border-4 border-[#2C2C2C]"
        >
          {/* Top subtle ornament */}
          <div className="flex items-center gap-3 pt-6 opacity-90">
            <div className="w-12 h-px bg-[#D4AF37]/40" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Coleção Oficial
            </span>
            <div className="w-12 h-px bg-[#D4AF37]/40" />
          </div>

          {/* Center Brand Logo */}
          <motion.div
            initial={{ scale: 0.92, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-sm w-full px-2"
          >
            {/* Rectangular Luxury Frame */}
            <div className="w-full px-6 py-7 sm:px-8 sm:py-8 bg-[#1E1E1E] border border-[#3D3D3D] shadow-2xl relative mb-6 flex flex-col items-center justify-center">
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]" />
              <Logo size="lg" showTagline={true} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-serif italic text-xs sm:text-sm md:text-base text-[#F9F9F9]/85 max-w-xs mt-1 leading-relaxed"
            >
              "O Segredo das Mulheres Mais Lindas e Longevas do Mundo."
            </motion.p>
          </motion.div>

          {/* Bottom Loading / Enter trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-3 pb-4"
          >
            <div className="w-40 h-[2px] bg-[#2C2C2C] overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C29B91] font-bold">
              Toque em qualquer lugar para entrar
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
