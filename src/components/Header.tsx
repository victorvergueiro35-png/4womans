import React from 'react';
import { Logo } from './Logo';
import { Download, Smartphone, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenPlaybook: () => void;
  bookmarkedCount: number;
  onDownloadPdf: () => void;
  onShowPwaModal: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProfile,
  onOpenPlaybook,
  bookmarkedCount,
  onDownloadPdf,
  onShowPwaModal,
  theme = 'dark',
  onToggleTheme
}) => {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#121212]/95 backdrop-blur-md border-b border-[#2C2C2C] safe-top">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: 4WOMAN'S Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <div className="hidden md:flex flex-col border-l border-[#3D3D3D] pl-3">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
              Coleção de Alta Performance
            </span>
            <span className="text-[10px] text-[#C29B91] font-sans">
              Protocolo Dieta Amalfitana
            </span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark / Light Theme Mode Button */}
          {onToggleTheme && (
            <button
              id="header-theme-toggle-btn"
              onClick={onToggleTheme}
              className={`p-2 border transition-all active:scale-95 flex items-center justify-center ${
                isDark
                  ? 'bg-[#2C2C2C] hover:bg-[#383838] text-[#D4AF37] border-[#3D3D3D]'
                  : 'bg-[#B8860B] hover:bg-[#996515] text-[#FFFFFF] border-[#B8860B]'
              }`}
              title={isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Noturno'}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 fill-[#D4AF37]/20" />
              ) : (
                <Sun className="w-3.5 h-3.5 fill-[#FFFFFF]/30 animate-[spin_12s_linear_infinite]" />
              )}
            </button>
          )}

          {/* PWA Install Button */}
          <button
            id="install-pwa-header-btn"
            onClick={onShowPwaModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] hover:text-[#D4AF37] border border-[#3D3D3D] hover:border-[#D4AF37]/50 text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs"
            title="Instalar App no Celular"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Instalar App</span>
          </button>

          {/* Download PDF Quick Action */}
          <button
            onClick={onDownloadPdf}
            className="p-2 bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] hover:text-[#D4AF37] border border-[#3D3D3D] transition-colors"
            title="Baixar Playbook em PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Profile / Settings Button with Gold Monograph */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 bg-[#2C2C2C] hover:bg-[#D4AF37] text-[#F9F9F9] hover:text-[#121212] border border-[#D4AF37]/40 flex items-center justify-center transition-all shadow-xs active:scale-95 group"
            title="Meu Perfil"
          >
            <span className="font-sans text-xs font-black text-[#D4AF37] group-hover:text-[#121212] transition-colors">
              4W
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
