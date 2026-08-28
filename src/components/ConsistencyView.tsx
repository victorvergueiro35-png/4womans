import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Scale,
  Calendar,
  Gift,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingDown,
  Download,
  Flame,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Eye,
  Trash2,
  Sparkles,
  Award,
  Bell,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MealPhoto {
  id: string;
  slot: 'cafe' | 'almoco' | 'lanche' | 'jantar';
  imageUrl: string;
  timestamp: string;
  timeHour: string;
}

interface WeightLog {
  date: string;
  dayIndex: number;
  weight: number;
  scalePhoto?: string;
}

interface WeeklyResult {
  week: number;
  frontPhoto?: string;
  sidePhoto?: string;
  backPhoto?: string;
  date: string;
}

interface ConsistencyViewProps {
  onBack: () => void;
  onOpenPlaybookPage?: (pageId: number) => void;
}

export const ConsistencyView: React.FC<ConsistencyViewProps> = ({
  onBack,
  onOpenPlaybookPage
}) => {
  const [activeTab, setActiveTab] = useState<'refeicoes' | 'peso' | 'resultado' | 'calendario' | 'bonus'>('refeicoes');

  // Days streak state
  const [currentDay, setCurrentDay] = useState<number>(() => {
    const saved = localStorage.getItem('4womans_consistency_streak');
    return saved ? parseInt(saved, 10) : 7;
  });

  const [initialWeight, setInitialWeight] = useState<number>(() => {
    const saved = localStorage.getItem('4womans_initial_weight');
    return saved ? parseFloat(saved) : 68.5;
  });

  // Meal Photos State
  const [meals, setMeals] = useState<Record<string, MealPhoto>>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`4womans_meals_${today}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default example to show working state
    return {
      cafe: {
        id: '1',
        slot: 'cafe',
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
        timestamp: 'Hoje às 08:14',
        timeHour: '08:14'
      },
      almoco: {
        id: '2',
        slot: 'almoco',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        timestamp: 'Hoje às 12:45',
        timeHour: '12:45'
      }
    };
  });

  // Weight Logs State
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => {
    const saved = localStorage.getItem('4womans_weight_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { date: 'Dia 1', dayIndex: 1, weight: 68.5 },
      { date: 'Dia 2', dayIndex: 2, weight: 68.1 },
      { date: 'Dia 3', dayIndex: 3, weight: 67.8 },
      { date: 'Dia 4', dayIndex: 4, weight: 67.9 },
      { date: 'Dia 5', dayIndex: 5, weight: 67.4 },
      { date: 'Dia 6', dayIndex: 6, weight: 67.0 },
      { date: 'Dia 7', dayIndex: 7, weight: 66.7 }
    ];
  });

  const [inputWeight, setInputWeight] = useState<string>('');
  const [scalePhotoInput, setScalePhotoInput] = useState<string | null>(null);

  // Weekly Results State
  const [weeklyResults, setWeeklyResults] = useState<Record<number, WeeklyResult>>(() => {
    const saved = localStorage.getItem('4womans_weekly_results');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      1: {
        week: 1,
        frontPhoto: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80',
        sidePhoto: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80',
        backPhoto: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=500&q=80',
        date: 'Semana 1 (Concluída)'
      }
    };
  });

  // Push notifications enabled
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadSlot, setActiveUploadSlot] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUploadPhoto = (slot: 'cafe' | 'almoco' | 'lanche' | 'jantar') => {
    setActiveUploadSlot(slot);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadSlot) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const now = new Date();
        const timeHour = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newMeal: MealPhoto = {
          id: Date.now().toString(),
          slot: activeUploadSlot as any,
          imageUrl,
          timestamp: `Hoje às ${timeHour}`,
          timeHour
        };

        const today = new Date().toISOString().split('T')[0];
        const updated = { ...meals, [activeUploadSlot]: newMeal };
        setMeals(updated);
        localStorage.setItem(`4womans_meals_${today}`, JSON.stringify(updated));
        showToast(`✅ Foto do ${getSlotLabel(activeUploadSlot)} registrada com sucesso!`);
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (e.target) e.target.value = '';
  };

  const handleSimulatePhoto = (slot: 'cafe' | 'almoco' | 'lanche' | 'jantar') => {
    const sampleImages: Record<string, string> = {
      cafe: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      almoco: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      lanche: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      jantar: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
    };
    const now = new Date();
    const timeHour = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMeal: MealPhoto = {
      id: Date.now().toString(),
      slot,
      imageUrl: sampleImages[slot],
      timestamp: `Hoje às ${timeHour}`,
      timeHour
    };
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...meals, [slot]: newMeal };
    setMeals(updated);
    localStorage.setItem(`4womans_meals_${today}`, JSON.stringify(updated));
    showToast(`✅ Foto do ${getSlotLabel(slot)} tirada na hora com carimbo de tempo!`);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
  };

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputWeight);
    if (!val || val < 30 || val > 250) {
      showToast('⚠️ Digite um peso válido (ex: 66.4)');
      return;
    }
    const newDayIndex = weightLogs.length + 1;
    const newLog: WeightLog = {
      date: `Dia ${newDayIndex}`,
      dayIndex: newDayIndex,
      weight: val,
      scalePhoto: scalePhotoInput || undefined
    };
    const updated = [...weightLogs, newLog];
    setWeightLogs(updated);
    localStorage.setItem('4womans_weight_logs', JSON.stringify(updated));
    setInputWeight('');
    setScalePhotoInput(null);
    showToast(`✅ Peso do Dia ${newDayIndex} registrado: ${val} kg!`);
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
  };

  const handleClaimBonus = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    showToast('🎉 PARABÉNS! Seu Super Bônus 4womans foi liberado com sucesso!');
  };

  const getSlotLabel = (s: string) => {
    switch (s) {
      case 'cafe': return 'Café da Manhã';
      case 'almoco': return 'Almoço';
      case 'lanche': return 'Lanche da Tarde';
      case 'jantar': return 'Jantar';
      default: return s;
    }
  };

  const getSlotTimeLimit = (s: string) => {
    switch (s) {
      case 'cafe': return 'Até 9h00';
      case 'almoco': return 'Até 14h00';
      case 'lanche': return 'Até 17h00';
      case 'jantar': return 'Até 21h00';
      default: return '';
    }
  };

  const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : initialWeight;
  const weightLost = (initialWeight - latestWeight).toFixed(1);

  // Missing meals check
  const missingMeals = ['cafe', 'almoco', 'lanche', 'jantar'].filter(s => !meals[s]);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F9F9F9] pb-24">
      {/* Hidden file input for real photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#D4AF37] text-[#121212] font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-[#E5C358] animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C358] transition-colors"
          >
            ← Voltar ao Início
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#8B3A5A] text-[#FFFFFF] text-[10px] font-black uppercase tracking-wider border border-[#A2486C]">
              Plano Basic ✅ Aberto
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Card */}
        <div className="p-6 bg-gradient-to-br from-[#1E1E1E] via-[#241B20] to-[#161616] border border-[#8B3A5A]/50 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#8B3A5A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#D4AF37] text-[#121212] text-[9px] font-black uppercase tracking-widest">
                  Módulo de Prestação de Contas
                </span>
                <span className="text-[10px] text-[#D4AF37] font-bold">
                  Streak: Dia {currentDay} de 30
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F9F9]">
                Consistência na Dieta
              </h1>
              <p className="text-xs sm:text-sm text-[#F9F9F9]/80 max-w-xl mt-1">
                O segredo não é a perfeição. É a consistência inegociável. Tire fotos de todas as refeições, pese-se em jejum e desbloqueie o Super Bônus em 30 dias.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-[#121212]/80 p-3 border border-[#3D3D3D] shrink-0">
              <div className="p-2.5 bg-[#8B3A5A] text-white">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#D4AF37]">Progresso</div>
                <div className="text-base font-black text-[#F9F9F9]">{currentDay}/30 Dias</div>
                <div className="text-[9px] text-[#F9F9F9]/60">Faltam {30 - currentDay} dias pro bônus</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-3 border-t border-[#3D3D3D]/60 flex items-center gap-3">
            <div className="flex-1 bg-[#121212] h-2.5 border border-[#3D3D3D] overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8B3A5A] to-[#D4AF37] h-full transition-all duration-500"
                style={{ width: `${(currentDay / 30) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37]">
              {Math.round((currentDay / 30) * 100)}% Concluído
            </span>
          </div>
        </div>

        {/* Missing meal alert if any */}
        {missingMeals.length > 0 && (
          <div className="p-3.5 bg-[#2C1F1F] border border-[#8B3A3A] text-xs flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-2 text-[#FFA07A]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Atenção:</strong> Você ainda não enviou a foto do <strong>{getSlotLabel(missingMeals[0])}</strong> hoje!
              </span>
            </div>
            <button
              onClick={() => setActiveTab('refeicoes')}
              className="px-3 py-1 bg-[#8B3A3A] hover:bg-[#A24848] text-white font-bold text-[10px] uppercase shrink-0"
            >
              Enviar Agora
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="grid grid-cols-5 gap-1 bg-[#1E1E1E] p-1 border border-[#3D3D3D]">
          <button
            onClick={() => setActiveTab('refeicoes')}
            className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'refeicoes'
                ? 'bg-[#8B3A5A] text-white shadow-md'
                : 'text-[#F9F9F9]/60 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Refeições</span>
          </button>

          <button
            onClick={() => setActiveTab('peso')}
            className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'peso'
                ? 'bg-[#8B3A5A] text-white shadow-md'
                : 'text-[#F9F9F9]/60 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Meu Peso</span>
          </button>

          <button
            onClick={() => setActiveTab('resultado')}
            className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'resultado'
                ? 'bg-[#8B3A5A] text-white shadow-md'
                : 'text-[#F9F9F9]/60 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Resultados</span>
          </button>

          <button
            onClick={() => setActiveTab('calendario')}
            className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'calendario'
                ? 'bg-[#8B3A5A] text-white shadow-md'
                : 'text-[#F9F9F9]/60 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30 Dias</span>
          </button>

          <button
            onClick={() => setActiveTab('bonus')}
            className={`py-2 px-1 text-center font-bold text-[10px] sm:text-xs uppercase transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'bonus'
                ? 'bg-[#D4AF37] text-[#121212] shadow-md font-black'
                : 'text-[#D4AF37]/70 hover:text-[#D4AF37]'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Super Bônus</span>
          </button>
        </div>

        {/* TAB 1: REFEIÇÕES (4 SLOTS) */}
        {activeTab === 'refeicoes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F9F9F9]">
                  4 Slots de Refeições de Hoje
                </h3>
                <p className="text-xs text-[#F9F9F9]/70">
                  Tire a foto antes da primeira garfada com prato inteiro enquadrado.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Horários Ativos</span>
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['cafe', 'almoco', 'lanche', 'jantar'] as const).map((slotKey) => {
                const meal = meals[slotKey];
                const isSent = !!meal;

                return (
                  <div
                    key={slotKey}
                    className={`p-4 bg-[#1E1E1E] border transition-all ${
                      isSent ? 'border-[#D4AF37]/50 shadow-md' : 'border-[#3D3D3D] hover:border-[#8B3A5A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-serif text-base font-bold text-[#F9F9F9]">
                            {getSlotLabel(slotKey)}
                          </h4>
                          {isSent ? (
                            <span className="px-1.5 py-0.5 bg-[#2E4A2E] text-[#90EE90] text-[9px] font-black uppercase flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Enviado
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-[#3D2C2C] text-[#FFA07A] text-[9px] font-bold uppercase">
                              Pendente
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#F9F9F9]/60 block">
                          Limite: {getSlotTimeLimit(slotKey)}
                        </span>
                      </div>

                      {isSent && (
                        <span className="text-[10px] text-[#D4AF37] font-mono font-bold">
                          {meal.timeHour}
                        </span>
                      )}
                    </div>

                    {/* Photo Container */}
                    {isSent ? (
                      <div className="relative aspect-video bg-[#121212] overflow-hidden border border-[#3D3D3D] group">
                        <img
                          src={meal.imageUrl}
                          alt={getSlotLabel(slotKey)}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-transparent to-transparent flex items-end p-2.5 justify-between">
                          <span className="text-[10px] font-mono text-[#D4AF37] bg-[#121212]/80 px-2 py-0.5">
                            {meal.timestamp}
                          </span>
                          <button
                            onClick={() => handleUploadPhoto(slotKey)}
                            title="Substituir foto"
                            className="p-1.5 bg-[#121212]/80 hover:bg-[#8B3A5A] text-white text-[10px] transition-colors"
                          >
                            <Camera className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-[#161616] border border-dashed border-[#444] flex flex-col items-center justify-center p-4 text-center">
                        <Camera className="w-8 h-8 text-[#8B3A5A] mb-2" />
                        <span className="text-xs font-bold text-[#F9F9F9]">
                          Nenhuma foto enviada ainda
                        </span>
                        <span className="text-[10px] text-[#F9F9F9]/50 mt-0.5">
                          Tire foto da sua refeição antes de comer
                        </span>
                        <div className="flex items-center gap-2 mt-3 w-full">
                          <button
                            onClick={() => handleUploadPhoto(slotKey)}
                            className="flex-1 py-1.5 px-2 bg-[#8B3A5A] hover:bg-[#A2486C] text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all active:scale-95"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Tirar Foto</span>
                          </button>
                          <button
                            onClick={() => handleSimulatePhoto(slotKey)}
                            title="Simular foto instantânea"
                            className="py-1.5 px-2 bg-[#2C2C2C] hover:bg-[#383838] text-[#D4AF37] font-bold text-[10px] uppercase border border-[#3D3D3D]"
                          >
                            Foto Teste
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Daily Notification Schedule Card */}
            <div className="p-4 bg-[#1A1A1A] border border-[#333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#F9F9F9] block">
                    Lembretes Automáticos de Envio de Fotos
                  </span>
                  <span className="text-[11px] text-[#F9F9F9]/60">
                    Notificações diárias às 8h (Café), 13h (Almoço), 16h (Lanche) e 20h (Jantar)
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setPushEnabled(!pushEnabled);
                  showToast(pushEnabled ? 'Notificações pausadas.' : 'Notificações diárias ativadas!');
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  pushEnabled
                    ? 'bg-[#2E4A2E] text-[#90EE90] border border-[#4E7A4E]'
                    : 'bg-[#2C2C2C] text-[#F9F9F9]/60 border border-[#3D3D3D]'
                }`}
              >
                {pushEnabled ? '✓ Ativadas' : 'Desativadas'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TRACKER DE PESO */}
        {activeTab === 'peso' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F9F9F9]">
                  Tracker de Peso Matinal em Jejum
                </h3>
                <p className="text-xs text-[#F9F9F9]/70">
                  Pese-se todos os dias logo ao acordar após ir ao banheiro.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold block">Peso Perdido</span>
                <span className="text-lg font-black text-[#90EE90] flex items-center justify-end gap-1">
                  <TrendingDown className="w-4 h-4" /> -{weightLost} kg
                </span>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleAddWeight} className="p-5 bg-[#1E1E1E] border border-[#3D3D3D] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                Registrar Peso de Hoje
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#F9F9F9]/70 font-semibold block mb-1">
                    Peso na Balança (kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 66.5"
                    value={inputWeight}
                    onChange={(e) => setInputWeight(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#121212] border border-[#3D3D3D] focus:border-[#D4AF37] text-white text-base font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#F9F9F9]/70 font-semibold block mb-1">
                    Foto do Mostrador da Balança (Opcional):
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setScalePhotoInput('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80');
                      showToast('Foto da balança anexada!');
                    }}
                    className={`w-full py-2.5 px-3 border text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${
                      scalePhotoInput
                        ? 'bg-[#2E4A2E] text-[#90EE90] border-[#4E7A4E]'
                        : 'bg-[#2C2C2C] text-[#F9F9F9] border-[#3D3D3D] hover:border-[#D4AF37]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{scalePhotoInput ? '✓ Foto Anexada' : 'Tirar Foto da Balança'}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
              >
                Salvar Registro de Peso
              </button>
            </form>

            {/* Evolution Table / Chart */}
            <div className="p-5 bg-[#1E1E1E] border border-[#3D3D3D] space-y-4">
              <h4 className="font-serif text-base font-bold text-[#F9F9F9] flex items-center justify-between">
                <span>Evolução Semanal Registrada</span>
                <span className="text-xs text-[#D4AF37] font-sans font-bold">
                  Média: {(weightLogs.reduce((acc, l) => acc + l.weight, 0) / (weightLogs.length || 1)).toFixed(1)} kg
                </span>
              </h4>

              {/* Visual Bars */}
              <div className="space-y-2 pt-2">
                {weightLogs.map((log, idx) => {
                  const diffFromStart = (initialWeight - log.weight).toFixed(1);
                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-14 font-bold text-[#F9F9F9]/80 font-mono">{log.date}</span>
                      <div className="flex-1 bg-[#121212] h-6 border border-[#333] flex items-center px-2 relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-[#8B3A5A]/50"
                          style={{ width: `${Math.min(100, Math.max(20, ((log.weight - 50) / 30) * 100))}%` }}
                        />
                        <span className="relative z-10 font-black text-white">{log.weight} kg</span>
                      </div>
                      <span className={`w-16 text-right font-bold ${parseFloat(diffFromStart) > 0 ? 'text-[#90EE90]' : 'text-[#FFA07A]'}`}>
                        {parseFloat(diffFromStart) > 0 ? `-${diffFromStart} kg` : `${diffFromStart} kg`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESULTADOS SEMANAIS (FOTOS DE DOMINGO) */}
        {activeTab === 'resultado' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F9F9F9]">
                  Fotos do Resultado Semanal (Domingos)
                </h3>
                <p className="text-xs text-[#F9F9F9]/70">
                  Comparação lado a lado em ambiente privado e criptografado.
                </p>
              </div>
              <span className="px-2 py-1 bg-[#D4AF37] text-[#121212] font-black text-[10px] uppercase">
                Semana 1 Concluída
              </span>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1E1E1E] p-3 border border-[#3D3D3D] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Foto 1: Frente
                </span>
                <div className="aspect-[3/4] bg-[#121212] border border-[#333] overflow-hidden">
                  <img
                    src={weeklyResults[1]?.frontPhoto}
                    alt="Resultado Frente"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-[#F9F9F9]/60 block text-center">
                  Semana 1 • Frente
                </span>
              </div>

              <div className="bg-[#1E1E1E] p-3 border border-[#3D3D3D] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Foto 2: Perfil
                </span>
                <div className="aspect-[3/4] bg-[#121212] border border-[#333] overflow-hidden">
                  <img
                    src={weeklyResults[1]?.sidePhoto}
                    alt="Resultado Perfil"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-[#F9F9F9]/60 block text-center">
                  Semana 1 • Perfil
                </span>
              </div>

              <div className="bg-[#1E1E1E] p-3 border border-[#3D3D3D] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Foto 3: Costas
                </span>
                <div className="aspect-[3/4] bg-[#121212] border border-[#333] overflow-hidden">
                  <img
                    src={weeklyResults[1]?.backPhoto}
                    alt="Resultado Costas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-[#F9F9F9]/60 block text-center">
                  Semana 1 • Costas
                </span>
              </div>
            </div>

            {/* Next Sunday Banner */}
            <div className="p-5 bg-gradient-to-r from-[#241B20] to-[#1E1E1E] border border-[#8B3A5A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block">
                  Próxima Pesagem e Fotos de Resultado
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-0.5">
                  Domingo • Fotos da Semana 2
                </h4>
                <p className="text-xs text-[#F9F9F9]/70 mt-0.5">
                  O aplicativo abrirá automaticamente os 3 slots de fotos no próximo domingo pela manhã.
                </p>
              </div>
              <button
                onClick={() => showToast('Slots de domingo liberados para envio antecipado!')}
                className="px-4 py-2 bg-[#8B3A5A] hover:bg-[#A2486C] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all"
              >
                Enviar Fotos Agora
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CALENDÁRIO 30 DIAS */}
        {activeTab === 'calendario' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F9F9F9]">
                  Calendário dos 30 Dias de Consistência
                </h3>
                <p className="text-xs text-[#F9F9F9]/70">
                  Cada dia completado é um passo mais perto do seu Super Bônus.
                </p>
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">
                Dia {currentDay} de 30
              </span>
            </div>

            {/* 30 Days Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
              {Array.from({ length: 30 }, (_, i) => {
                const dayNum = i + 1;
                const isCompleted = dayNum <= currentDay;
                const isToday = dayNum === currentDay;

                return (
                  <div
                    key={dayNum}
                    className={`aspect-square p-2 border flex flex-col items-center justify-center transition-all relative ${
                      isCompleted
                        ? 'bg-[#241B20] border-[#8B3A5A] text-[#D4AF37]'
                        : 'bg-[#181818] border-[#333] text-[#F9F9F9]/40'
                    } ${isToday ? 'ring-2 ring-[#D4AF37]' : ''}`}
                  >
                    <span className="text-[9px] uppercase font-mono font-bold">D{dayNum}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-1" />
                    ) : (
                      <span className="text-xs font-bold mt-1">○</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Motivation Quote */}
            <div className="p-4 bg-[#1E1E1E] border border-[#3D3D3D] flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#F9F9F9] block">
                  Regra de Ouro da Mulher 4womans:
                </span>
                <span className="text-xs text-[#F9F9F9]/75">
                  "Falhou 1 dia = perdeu a sequência e o bônus. É tudo ou nada. Mantenha seu compromisso diário."
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SUPER BÔNUS 30 DIAS */}
        {activeTab === 'bonus' && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-[#241B20] via-[#1E1E1E] to-[#121212] border border-[#D4AF37] shadow-2xl text-center space-y-4 relative overflow-hidden">
              <div className="w-16 h-16 bg-[#D4AF37] text-[#121212] mx-auto flex items-center justify-center shadow-lg border border-[#E5C358]">
                <Gift className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 bg-[#8B3A5A] text-white text-[10px] font-black uppercase tracking-widest">
                  Recompensa por Consistência Comprovada
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F9F9] mt-2">
                  O Super Bônus dos 30 Dias
                </h3>
                <p className="text-xs sm:text-sm text-[#F9F9F9]/80 max-w-lg mx-auto mt-1">
                  Complete os 30 dias de fotos das refeições e pesagens diárias para destravar automaticamente:
                </p>
              </div>

              {/* Rewards List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto pt-2">
                <div className="p-3 bg-[#121212] border border-[#3D3D3D] flex items-start gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="font-bold text-xs text-white block">Consultoria Personalizada GRÁTIS</span>
                    <span className="text-[11px] text-[#F9F9F9]/60">1 sessão individual exclusiva com especialista</span>
                  </div>
                </div>

                <div className="p-3 bg-[#121212] border border-[#3D3D3D] flex items-start gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="font-bold text-xs text-white block">Acesso Antecipado ao Módulo Treino</span>
                    <span className="text-[11px] text-[#F9F9F9]/60">Treinos de tonificação feminina em primeira mão</span>
                  </div>
                </div>

                <div className="p-3 bg-[#121212] border border-[#3D3D3D] flex items-start gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="font-bold text-xs text-white block">E-book "Receitas Secretas de Amalfi"</span>
                    <span className="text-[11px] text-[#F9F9F9]/60">Guia VIP de pratos mediterrâneos raros</span>
                  </div>
                </div>

                <div className="p-3 bg-[#121212] border border-[#3D3D3D] flex items-start gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="font-bold text-xs text-white block">Certificado Oficial 4womans</span>
                    <span className="text-[11px] text-[#F9F9F9]/60">Documento de consagração e consistência</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#3D3D3D] max-w-md mx-auto">
                {currentDay >= 30 ? (
                  <button
                    onClick={handleClaimBonus}
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-sm uppercase tracking-wider transition-all shadow-xl active:scale-95 animate-pulse"
                  >
                    🎉 Resgatar Meu Super Bônus Agora
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setCurrentDay(30);
                        handleClaimBonus();
                      }}
                      className="w-full py-3 bg-[#8B3A5A] hover:bg-[#A2486C] text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Simular Conclusão de 30 Dias (Testar Resgate)
                    </button>
                    <span className="text-[10px] text-[#F9F9F9]/50 block">
                      Faltam {30 - currentDay} dias de consistência para desbloquear o resgate oficial.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
