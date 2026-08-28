import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { AMALFI_PAGES } from '../data/amalfiPages';
import {
  Smartphone,
  Bookmark,
  Sparkles,
  Type,
  Check,
  ChevronRight,
  Download,
  Moon,
  Sun
} from 'lucide-react';
import { Logo } from './Logo';

interface ProfileViewProps {
  userPrefs: UserPreferences;
  onUpdatePrefs: (prefs: Partial<UserPreferences>) => void;
  bookmarkedPages: number[];
  onSelectPage: (pageId: number) => void;
  onShowPwaModal: () => void;
  onDownloadPdf: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userPrefs,
  onUpdatePrefs,
  bookmarkedPages,
  onSelectPage,
  onShowPwaModal,
  onDownloadPdf,
  theme = 'dark',
  onToggleTheme
}) => {
  const [nameInput, setNameInput] = useState(userPrefs.userName || '');
  const [isSaved, setIsSaved] = useState(false);

  const isDark = theme === 'dark';

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrefs({ userName: nameInput });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const bookmarkedList = AMALFI_PAGES.filter((p) => bookmarkedPages.includes(p.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 text-[#F9F9F9]">
      {/* Profile Header */}
      <div className="bg-[#2C2C2C] p-5 sm:p-7 border border-[#3D3D3D] shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* Rectangular Gold-accented Frame for Logo */}
        <div className="px-5 py-3.5 bg-[#121212] flex items-center justify-center border border-[#3D3D3D] shadow-inner shrink-0 w-full sm:w-auto max-w-[220px]">
          <Logo size="sm" />
        </div>

        <div className="flex-1 min-w-0 space-y-2.5 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3D3D3D] pb-2">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#C29B91] block">
                Folio de Membro Exclusivo
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F9F9F9] break-words">
                {userPrefs.userName || 'Membro 4WOMAN\'S'}
              </h2>
            </div>
            <span className="inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#1E1E1E] text-[#D4AF37] px-2.5 py-1 border border-[#3D3D3D] self-center sm:self-auto">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Edição Vitalícia
            </span>
          </div>

          {/* Edit Name Form */}
          <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full max-w-sm pt-1 mx-auto sm:mx-0">
            <input
              type="text"
              placeholder="Seu nome ou assinatura"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 min-w-0 px-3 py-1.5 bg-[#1E1E1E] border border-[#383838] text-xs text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37] placeholder:text-[#F9F9F9]/40 font-serif italic"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] text-xs font-black uppercase tracking-wider active:scale-95 transition-all shrink-0 flex items-center gap-1 border border-[#D4AF37]"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-[#121212]" /> : 'Salvar'}
            </button>
          </form>
        </div>
      </div>

      {/* PWA Mobile Installation Quick Banner */}
      <div className="bg-gradient-to-br from-[#1E1E1E] to-[#161616] p-6 border border-[#3D3D3D] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-[#2C2C2C] text-[#D4AF37] border border-[#3D3D3D]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#F9F9F9]">
              Instale o 4WOMAN'S no seu dispositivo
            </h3>
            <p className="text-xs text-[#F9F9F9]/75">
              Acesse o aplicativo diretamente da tela inicial do seu celular, com suporte offline.
            </p>
          </div>
        </div>

        <button
          onClick={onShowPwaModal}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-wider shadow-xs active:scale-95 transition-all shrink-0 border border-[#D4AF37]"
        >
          Instruções PWA
        </button>
      </div>

      {/* Preferences & Typography */}
      <div className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md space-y-4">
        <div className="border-b border-[#3D3D3D] pb-2">
          <h3 className="font-serif text-base font-bold text-[#F9F9F9] flex items-center gap-2">
            <Type className="w-4 h-4 text-[#D4AF37]" />
            Ajustes de Leitura & Tipografia
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Theme Mode Toggle (Noturno vs Claro) */}
          <div className="p-3 bg-[#1E1E1E] border border-[#383838] flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#F9F9F9]">Tema Visual:</span>
            {onToggleTheme ? (
              <button
                onClick={onToggleTheme}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all flex items-center gap-1.5 border active:scale-95 ${
                  isDark
                    ? 'bg-[#2C2C2C] text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-[#B8860B] text-[#FFFFFF] border-[#B8860B]'
                }`}
              >
                {isDark ? (
                  <>
                    <Moon className="w-3.5 h-3.5 fill-[#D4AF37]/20" />
                    <span>Modo Noturno</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 fill-[#FFFFFF]/30" />
                    <span>Modo Claro</span>
                  </>
                )}
              </button>
            ) : null}
          </div>

          {/* Font Size */}
          <div className="p-3 bg-[#1E1E1E] border border-[#383838] flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#F9F9F9]">Tamanho da Fonte:</span>
            <div className="flex gap-1">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdatePrefs({ fontSize: size })}
                  className={`px-2.5 py-1 text-xs font-bold uppercase transition-all border ${
                    userPrefs.fontSize === size
                      ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                      : 'bg-[#2C2C2C] text-[#F9F9F9]/70 hover:bg-[#383838] border-[#3D3D3D]'
                  }`}
                >
                  {size === 'small' ? 'P' : size === 'medium' ? 'M' : 'G'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick PDF Action */}
          <div className="p-3 bg-[#1E1E1E] border border-[#383838] flex items-center justify-between sm:col-span-2">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#F9F9F9]">Playbook Completo em PDF:</span>
            <button
              onClick={onDownloadPdf}
              className="px-3.5 py-1.5 bg-[#2C2C2C] hover:bg-[#383838] text-[#D4AF37] border border-[#3D3D3D] text-xs font-bold uppercase flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar Playbook
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarked Pages List */}
      <div className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-[#3D3D3D] pb-2">
          <h3 className="font-serif text-base font-bold text-[#F9F9F9] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#D4AF37]" />
            Lições Favoritas ({bookmarkedList.length})
          </h3>
          <span className="text-[10px] text-[#C29B91] font-bold uppercase tracking-wider">
            Acesso Rápido
          </span>
        </div>

        {bookmarkedList.length === 0 ? (
          <p className="text-xs text-[#F9F9F9]/50 py-3 text-center italic">
            Nenhuma lição salva como favorita ainda. Toque no ícone de marcador durante a leitura para salvar.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {bookmarkedList.map((pg) => (
              <div
                key={pg.id}
                onClick={() => onSelectPage(pg.id)}
                className="p-3 bg-[#1E1E1E] hover:bg-[#252525] border border-[#383838] hover:border-[#D4AF37]/40 cursor-pointer flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 bg-[#121212] text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                    {pg.id}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#F9F9F9] truncate">{pg.title}</h4>
                    <span className="text-[10px] text-[#F9F9F9]/50 truncate block">{pg.chapter}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
