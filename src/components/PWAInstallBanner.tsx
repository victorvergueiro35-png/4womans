import React from 'react';
import { Smartphone, Share, PlusSquare, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PWAInstallBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#2C2C2C] text-[#F9F9F9] border-2 border-[#3D3D3D] p-6 shadow-2xl relative"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#121212] text-[#F9F9F9] border border-[#383838] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#121212] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C29B91] block">
                Aplicativo Editorial
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F9F9F9]">
                Instalar no Celular
              </h3>
            </div>
          </div>

          <p className="text-xs text-[#F9F9F9]/80 leading-relaxed mb-4">
            Transforme o <strong className="text-[#D4AF37]">4WOMAN'S</strong> em um app nativo no seu iPhone ou Android para ter tela cheia e leitura offline.
          </p>

          <div className="space-y-3 mb-6">
            {/* iOS Instructions */}
            <div className="p-3.5 bg-[#1E1E1E] border border-[#383838] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <Share className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>No iPhone (Safari):</span>
              </div>
              <ol className="text-xs text-[#F9F9F9]/75 space-y-1 list-decimal list-inside pl-1">
                <li>Toque no botão de <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima).</li>
                <li>Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
                <li>Toque em <strong>"Adicionar"</strong> no canto superior direito.</li>
              </ol>
            </div>

            {/* Android Instructions */}
            <div className="p-3.5 bg-[#1E1E1E] border border-[#383838] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C29B91]">
                <PlusSquare className="w-3.5 h-3.5 text-[#C29B91]" />
                <span>No Android (Chrome):</span>
              </div>
              <ol className="text-xs text-[#F9F9F9]/75 space-y-1 list-decimal list-inside pl-1">
                <li>Toque nos <strong>três pontinhos</strong> (menu) no canto superior.</li>
                <li>Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</li>
              </ol>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-widest active:scale-95 transition-all border border-[#D4AF37]"
          >
            Entendido, Continuar Lendo
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
