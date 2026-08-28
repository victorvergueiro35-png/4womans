import React, { useState, useEffect } from 'react';
import {
  Coffee,
  CheckCircle2,
  Clock,
  Flame,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Share2,
  Bell,
  Heart,
  Droplets,
  Zap,
  Moon,
  Leaf,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THIRTY_TEAS_DATA, TeaItem } from '../data/teasData';

interface ThirtyTeasViewProps {
  onBack: () => void;
}

export const ThirtyTeasView: React.FC<ThirtyTeasViewProps> = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Completed teas tracking in localStorage
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('4womans_completed_teas');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [1, 2, 3]; // Default initial progress
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentTea = THIRTY_TEAS_DATA.find((t) => t.day === selectedDay) || THIRTY_TEAS_DATA[0];
  const isTeaCompleted = completedDays.includes(selectedDay);

  const toggleCompleteDay = (day: number) => {
    let updated: number[];
    if (completedDays.includes(day)) {
      updated = completedDays.filter((d) => d !== day);
      showToast(`Chá do Dia ${day} desmarcado.`);
    } else {
      updated = [...completedDays, day];
      showToast(`🌿 Chá do Dia ${day} concluído com sucesso!`);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
    setCompletedDays(updated);
    localStorage.setItem('4womans_completed_teas', JSON.stringify(updated));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Chá do Dia ${currentTea.day}: ${currentTea.name}`,
        text: `Estou fazendo o protocolo de 30 Chás da 4womans! O chá de hoje é ${currentTea.name} (${currentTea.subtitle}).`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Chá do Dia ${currentTea.day}: ${currentTea.name} - ${currentTea.subtitle}\nIngredientes:\n${currentTea.ingredients.join('\n')}`
      );
      showToast('📋 Receita copiada para a área de transferência!');
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'detox':
        return { label: 'Detox Celular', color: 'bg-[#2E4A2E] text-[#90EE90]', icon: Droplets };
      case 'termogenico':
        return { label: 'Termogênico', color: 'bg-[#4A2E2E] text-[#FFA07A]', icon: Zap };
      case 'diuretico':
        return { label: 'Diurético Potente', color: 'bg-[#2E3D4A] text-[#87CEFA]', icon: Droplets };
      case 'calmante':
        return { label: 'Calmante & Anti-Cortisol', color: 'bg-[#3D2E4A] text-[#DDA0DD]', icon: Moon };
      case 'digestivo':
        return { label: 'Digestivo Nobre', color: 'bg-[#4A432E] text-[#F0E68C]', icon: Leaf };
      case 'hormonal':
        return { label: 'Equilíbrio Hormonal', color: 'bg-[#8B3A5A] text-white', icon: Heart };
      default:
        return { label: 'Fitoterapia', color: 'bg-[#333] text-white', icon: Leaf };
    }
  };

  const badgeInfo = getCategoryBadge(currentTea.category);
  const BadgeIcon = badgeInfo.icon;
  const progressPercent = Math.round((completedDays.length / 30) * 100);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F9F9F9] pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#D4AF37] text-[#121212] font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-[#E5C358] animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C358] transition-colors"
          >
            ← Voltar ao Início
          </button>
          <span className="px-2.5 py-1 bg-[#8B3A5A] text-[#FFFFFF] text-[10px] font-black uppercase tracking-wider border border-[#A2486C]">
            Plano Basic ✅ Aberto
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header Hero */}
        <div className="p-6 bg-gradient-to-br from-[#1E1E1E] via-[#241B20] to-[#161616] border border-[#8B3A5A]/50 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#D4AF37] text-[#121212] text-[9px] font-black uppercase tracking-widest">
                  Protocolo Botânico 30 Dias
                </span>
                <span className="text-[10px] text-[#D4AF37] font-bold">
                  {completedDays.length} de 30 Chás Concluídos
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F9F9]">
                30 Chás Emagrecedores
              </h1>
              <p className="text-xs sm:text-sm text-[#F9F9F9]/80 max-w-xl mt-1">
                30 dias. 30 chás botânicos diferentes. 30 dias de transformação profunda celular, drenagem linfática e controle do cortisol.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-[#121212]/80 p-3 border border-[#3D3D3D] shrink-0">
              <div className="p-2.5 bg-[#D4AF37] text-[#121212]">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#D4AF37]">Progresso</div>
                <div className="text-base font-black text-[#F9F9F9]">{progressPercent}% Concluído</div>
                <div className="text-[9px] text-[#F9F9F9]/60">{completedDays.length}/30 Dias tomados</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-3 border-t border-[#3D3D3D]/60 flex items-center gap-3">
            <div className="flex-1 bg-[#121212] h-2.5 border border-[#3D3D3D] overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8B3A5A] to-[#D4AF37] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37]">
              {completedDays.length}/30
            </span>
          </div>
        </div>

        {/* Weeks Selector Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-[#1E1E1E] p-1 border border-[#3D3D3D]">
          {[1, 2, 3, 4].map((w) => {
            const weekTitles = [
              'Semana 1: Detox',
              'Semana 2: Aceleração',
              'Semana 3: Queima',
              'Semana 4: Equilíbrio'
            ];
            const isCurWeek = activeWeekTab === w;
            return (
              <button
                key={w}
                onClick={() => {
                  setActiveWeekTab(w);
                  setSelectedDay((w - 1) * 7 + 1);
                }}
                className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all ${
                  isCurWeek
                    ? 'bg-[#8B3A5A] text-white shadow-md'
                    : 'text-[#F9F9F9]/60 hover:text-white'
                }`}
              >
                <span>{weekTitles[w - 1]}</span>
              </button>
            );
          })}
        </div>

        {/* Days Horizontal Carousel / List */}
        <div className="bg-[#1E1E1E] p-3 border border-[#3D3D3D] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">
              {activeWeekTab === 1 && 'Semana 1: Dias 1 a 7'}
              {activeWeekTab === 2 && 'Semana 2: Dias 8 a 14'}
              {activeWeekTab === 3 && 'Semana 3: Dias 15 a 21'}
              {activeWeekTab === 4 && 'Semana 4: Dias 22 a 30'}
            </span>
            <span className="text-[10px] text-[#F9F9F9]/60">Selecione o dia para ver a receita</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {THIRTY_TEAS_DATA.filter((t) => t.week === activeWeekTab).map((tea) => {
              const isSel = tea.day === selectedDay;
              const isDone = completedDays.includes(tea.day);

              return (
                <button
                  key={tea.day}
                  onClick={() => setSelectedDay(tea.day)}
                  className={`flex-1 min-w-[70px] sm:min-w-[90px] p-2.5 border text-center transition-all ${
                    isSel
                      ? 'bg-[#D4AF37] text-[#121212] border-[#E5C358] shadow-lg font-black'
                      : isDone
                      ? 'bg-[#241B20] text-[#D4AF37] border-[#8B3A5A]'
                      : 'bg-[#141414] text-[#F9F9F9]/70 border-[#333] hover:border-[#666]'
                  }`}
                >
                  <div className="text-[9px] uppercase font-mono">Dia</div>
                  <div className="text-base font-black">{tea.day}</div>
                  <div className="text-[9px] truncate mt-0.5">{tea.name.split('+')[0]}</div>
                  {isDone && (
                    <div className="text-[9px] mt-1 font-bold flex items-center justify-center gap-0.5">
                      ✓ Tomado
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tea Detail Card */}
        <div className="bg-[#1E1E1E] border border-[#3D3D3D] shadow-2xl overflow-hidden">
          {/* Tea Header Image & Title */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#121212] overflow-hidden">
            <img
              src={currentTea.image}
              alt={currentTea.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#D4AF37] text-[#121212] font-mono font-black text-[10px] uppercase">
                  Dia {currentTea.day} de 30
                </span>
                <span className={`px-2 py-0.5 font-bold text-[10px] uppercase flex items-center gap-1 ${badgeInfo.color}`}>
                  <BadgeIcon className="w-3 h-3" />
                  {badgeInfo.label}
                </span>
                <span className="px-2 py-0.5 bg-[#121212]/80 text-[#F9F9F9] font-mono text-[10px] border border-[#333]">
                  ⏱ {currentTea.infusionTime}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentTea.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-semibold mt-0.5">
                {currentTea.subtitle}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Action Bar (Complete + Share) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#141414] border border-[#333]">
              <button
                onClick={() => toggleCompleteDay(currentTea.day)}
                className={`py-3 px-5 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  isTeaCompleted
                    ? 'bg-[#2E4A2E] text-[#90EE90] border border-[#4E7A4E]'
                    : 'bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isTeaCompleted ? '✓ Chá de Hoje Já Tomado' : 'Marcar Chá Como Tomado'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex-1 sm:flex-none py-2.5 px-3 bg-[#241B20] hover:bg-[#33222A] text-[#D4AF37] border border-[#8B3A5A] text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Quote / Principle */}
            <div className="p-3.5 bg-[#241B20]/60 border-l-2 border-[#D4AF37] text-xs italic text-[#F9F9F9]/90">
              "{currentTea.quote}"
            </div>

            {/* 3 Main Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3 Principais Benefícios Biológicos:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentTea.benefits.map((b, idx) => (
                  <div key={idx} className="p-3 bg-[#161616] border border-[#333] text-xs text-[#F9F9F9]/85 flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold font-mono">0{idx + 1}.</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients & Preparation Two-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Ingredients */}
              <div className="p-4 bg-[#161616] border border-[#333] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Ingredientes Exatos:</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#F9F9F9]/85">
                  {currentTea.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8B3A5A] font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation */}
              <div className="p-4 bg-[#161616] border border-[#333] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Modo de Preparo Passo a Passo:</span>
                </h4>
                <ol className="space-y-2 text-xs text-[#F9F9F9]/85">
                  {currentTea.preparation.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[#D4AF37]">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Best Time To Drink */}
            <div className="p-4 bg-[#1A1A1A] border border-[#3D3D3D] flex items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#8B3A5A] text-white">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#F9F9F9] block">
                    Melhor Horário para Consumo:
                  </span>
                  <span className="text-[11px] text-[#D4AF37]">
                    {currentTea.bestTime}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#121212] text-[#F9F9F9]/80 border border-[#333] text-[10px] font-mono shrink-0">
                {currentTea.timingBadge}
              </span>
            </div>

            {/* Navigation between days */}
            <div className="flex items-center justify-between pt-4 border-t border-[#333]">
              <button
                disabled={selectedDay <= 1}
                onClick={() => setSelectedDay(selectedDay - 1)}
                className={`py-2 px-3 text-xs font-bold uppercase flex items-center gap-1 transition-all ${
                  selectedDay <= 1
                    ? 'opacity-40 cursor-not-allowed text-[#666]'
                    : 'text-[#D4AF37] hover:text-[#E5C358]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Dia Anterior</span>
              </button>

              <span className="font-mono text-xs text-[#F9F9F9]/60">
                {selectedDay} / 30
              </span>

              <button
                disabled={selectedDay >= 30}
                onClick={() => setSelectedDay(selectedDay + 1)}
                className={`py-2 px-3 text-xs font-bold uppercase flex items-center gap-1 transition-all ${
                  selectedDay >= 30
                    ? 'opacity-40 cursor-not-allowed text-[#666]'
                    : 'text-[#D4AF37] hover:text-[#E5C358]'
                }`}
              >
                <span>Próximo Dia</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
