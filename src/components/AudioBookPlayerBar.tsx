import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Sparkles, ChevronUp, ChevronDown, Gauge, Repeat } from 'lucide-react';
import { VoiceOption, NarratorSettings } from '../utils/audioBookNarrator';

interface AudioBookPlayerBarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  currentPageTitle: string;
  currentFolio: number;
  totalFolios: number;
  settings: NarratorSettings;
  onUpdateSettings: (newSettings: Partial<NarratorSettings>) => void;
  availableVoices: VoiceOption[];
  hasPrev: boolean;
  hasNext: boolean;
}

export const AudioBookPlayerBar: React.FC<AudioBookPlayerBarProps> = ({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onClose,
  currentPageTitle,
  currentFolio,
  totalFolios,
  settings,
  onUpdateSettings,
  availableVoices,
  hasPrev,
  hasNext
}) => {
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const speedOptions = [
    { label: '0.85x', value: 0.85, tag: 'Calmo' },
    { label: '1.0x', value: 1.0, tag: 'Natural' },
    { label: '1.2x', value: 1.2, tag: 'Dinâmico' }
  ];

  const cycleSpeed = () => {
    const currentIndex = speedOptions.findIndex((s) => Math.abs(s.value - settings.speed) < 0.05);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    onUpdateSettings({ speed: speedOptions[nextIndex].value });
  };

  const selectedVoice = availableVoices.find((v) => v.id === settings.voiceId) || availableVoices[0];

  return (
    <div className="w-full bg-[#181818] border-t border-[#D4AF37]/40 shadow-2xl z-40 transition-all">
      {/* Voice Selection Drawer (collapsible) */}
      {showVoicePicker && (
        <div className="p-3 bg-[#1F1F1F] border-b border-[#3D3D3D] text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Escolha a Voz do Locutor:
            </span>
            <button
              onClick={() => setShowVoicePicker(false)}
              className="text-[#F9F9F9]/60 hover:text-[#F9F9F9] text-[10px] uppercase tracking-wider"
            >
              Fechar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
            {availableVoices.length > 0 ? (
              availableVoices.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    onUpdateSettings({ voiceId: v.id });
                    setShowVoicePicker(false);
                  }}
                  className={`px-2.5 py-1.5 text-left flex items-center justify-between border transition-all ${
                    settings.voiceId === v.id || (!settings.voiceId && v === availableVoices[0])
                      ? 'bg-[#2C2C2C] text-[#D4AF37] border-[#D4AF37] font-bold'
                      : 'bg-[#181818] text-[#F9F9F9]/80 hover:bg-[#252525] border-[#383838]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="block text-[11px] font-sans truncate">{v.name}</span>
                    <span className="text-[8.5px] uppercase tracking-wider text-[#F9F9F9]/50 block">
                      {v.gender === 'female' ? 'Voz Feminina' : v.gender === 'male' ? 'Voz Masculina' : 'Voz Padrão'}
                      {v.isPremium ? ' • Alta Qualidade' : ''}
                    </span>
                  </div>
                  {v.isPremium && (
                    <span className="text-[8px] bg-[#D4AF37]/20 text-[#D4AF37] px-1 py-0.5 border border-[#D4AF37]/40 shrink-0 uppercase font-bold">
                      HD
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="text-[11px] text-[#F9F9F9]/60 p-2 italic">
                Usando síntese de voz nativa em Português do dispositivo.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Control Bar */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Animated Audio Equalizer + Track Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          {/* Animated Golden Equalizer Bars */}
          <div className="flex items-end gap-[2px] h-5 shrink-0 px-1 bg-[#121212] py-0.5 border border-[#3D3D3D]">
            <span
              className={`w-[2.5px] bg-[#D4AF37] rounded-xs transition-all duration-200 ${
                isPlaying ? 'animate-[bounce_0.7s_infinite_ease-in-out_100ms] h-3.5' : 'h-1'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#FFF2B2] rounded-xs transition-all duration-200 ${
                isPlaying ? 'animate-[bounce_0.5s_infinite_ease-in-out_200ms] h-4.5' : 'h-2'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#D4AF37] rounded-xs transition-all duration-200 ${
                isPlaying ? 'animate-[bounce_0.6s_infinite_ease-in-out_300ms] h-3' : 'h-1.5'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#A87913] rounded-xs transition-all duration-200 ${
                isPlaying ? 'animate-[bounce_0.8s_infinite_ease-in-out_400ms] h-4' : 'h-1'
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-widest font-black text-[#D4AF37] shrink-0">
                AUDIOLIVRO • FOLIO {currentFolio}/{totalFolios}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#F9F9F9] font-serif font-bold truncate max-w-[160px] sm:max-w-xs md:max-w-md">
              {currentPageTitle}
            </p>
          </div>
        </div>

        {/* Center: Playback Navigation Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            title="Folio Anterior"
            className="p-1.5 text-[#F9F9F9]/80 hover:text-[#D4AF37] disabled:opacity-30 active:scale-95 transition-all"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={onPlayPause}
            title={isPlaying ? 'Pausar Narrador' : 'Reproduzir Narrador'}
            className="p-2 sm:p-2.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] rounded-full active:scale-95 shadow-md transition-all flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            title="Próximo Folio"
            className="p-1.5 text-[#F9F9F9]/80 hover:text-[#D4AF37] disabled:opacity-30 active:scale-95 transition-all"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Settings & Options (Speed, Continuous, Voice, Close) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Speed Button */}
          <button
            onClick={cycleSpeed}
            title="Alterar Velocidade da Leitura"
            className="px-2 py-1 bg-[#252525] hover:bg-[#303030] text-[10px] font-mono font-bold text-[#D4AF37] border border-[#3D3D3D] flex items-center gap-1 transition-all active:scale-95"
          >
            <Gauge className="w-3 h-3 text-[#D4AF37]" />
            <span>{settings.speed.toFixed(2).replace('.00', '')}x</span>
          </button>

          {/* Continuous Auto-Advance Toggle */}
          <button
            onClick={() => onUpdateSettings({ continuousPlay: !settings.continuousPlay })}
            title={
              settings.continuousPlay
                ? 'Modo Contínuo Ativo: Avança automaticamente para a próxima página'
                : 'Modo Contínuo Desativado'
            }
            className={`p-1.5 border transition-all active:scale-95 hidden xs:flex items-center justify-center ${
              settings.continuousPlay
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/50 font-bold'
                : 'bg-[#252525] text-[#F9F9F9]/50 border-[#3D3D3D]'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>

          {/* Voice Selector Toggle */}
          {availableVoices.length > 0 && (
            <button
              onClick={() => setShowVoicePicker(!showVoicePicker)}
              title="Mudar Voz do Locutor"
              className="px-2 py-1 bg-[#252525] hover:bg-[#303030] text-[#F9F9F9]/90 border border-[#3D3D3D] text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
            >
              <Volume2 className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden md:inline truncate max-w-[70px]">
                {selectedVoice?.gender === 'female' ? 'Feminina' : 'Masculina'}
              </span>
              {showVoicePicker ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
          )}

          {/* Close Bar */}
          <button
            onClick={onClose}
            title="Fechar Locutor"
            className="p-1.5 text-[#F9F9F9]/60 hover:text-[#F9F9F9] hover:bg-[#252525] transition-all ml-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
