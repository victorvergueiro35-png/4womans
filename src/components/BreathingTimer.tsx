import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

export const BreathingTimer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inspire' | 'retencao' | 'expire'>('inspire');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCount, setCyclesCount] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (phase === 'inspire') {
              setPhase('retencao');
              return 4; // 4s retention
            } else if (phase === 'retencao') {
              setPhase('expire');
              return 6; // 6s expiration
            } else {
              setPhase('inspire');
              setCyclesCount((c) => c + 1);
              return 4; // 4s inspiration
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const resetTimer = () => {
    setIsActive(false);
    setPhase('inspire');
    setCountdown(4);
    setCyclesCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inspire': return 'Inspire pelo nariz (4s)';
      case 'retencao': return 'Segure o ar suavemente (4s)';
      case 'expire': return 'Solte devagar pela boca (6s)';
    }
  };

  const circleScale = phase === 'inspire' ? 1.2 : phase === 'retencao' ? 1.2 : 0.85;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full my-4 bg-[#2C2C2C] p-5 border border-[#3D3D3D] shadow-md text-center"
    >
      <div className="flex items-center justify-between mb-3 text-xs border-b border-[#3D3D3D] pb-2">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#C29B91]">
          <HeartPulse className="w-3.5 h-3.5 text-[#D4AF37]" />
          Protocolo Vagal Parassimpático
        </span>
        <span className="text-[10px] uppercase font-bold text-[#F9F9F9]/60">
          Ciclos: {cyclesCount}
        </span>
      </div>

      {/* Visual Pulsing Breathing Sphere */}
      <div className="py-6 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: isActive ? circleScale : 1 }}
          transition={{ duration: phase === 'expire' ? 6 : 4, ease: 'easeInOut' }}
          className="w-28 h-28 bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] text-[#121212] flex flex-col items-center justify-center shadow-lg border-2 border-[#D4AF37]"
        >
          <span className="text-3xl font-black font-sans leading-none">{countdown}s</span>
          <span className="text-[9px] uppercase tracking-widest font-black mt-1">
            {phase}
          </span>
        </motion.div>

        <p className="font-serif italic text-sm text-[#F9F9F9] font-bold mt-4">
          {getPhaseText()}
        </p>
        <p className="text-[11px] text-[#F9F9F9]/60 max-w-xs mt-0.5">
          Execute antes do almoço e antes de dormir para baixar o cortisol sérico.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all border border-[#D4AF37]"
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-[#121212]" />
              Iniciar Respiração
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className="p-2 bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9]/70 hover:text-[#F9F9F9] border border-[#383838] transition-colors"
          title="Reiniciar"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
