import React, { useState } from 'react';
import { DAILY_HABITS } from '../data/modules';
import {
  CheckCircle2,
  Droplet,
  Footprints,
  Salad,
  Clock,
  Moon,
  ShieldCheck,
  Trophy,
  Flame,
  Calendar,
  Plus,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface HabitTrackerProps {
  habitsState: Record<string, boolean>;
  onToggleHabit: (habitId: string) => void;
  waterIntake: number;
  onUpdateWater: (amount: number) => void;
}

export const HabitTrackerView: React.FC<HabitTrackerProps> = ({
  habitsState,
  onToggleHabit,
  waterIntake,
  onUpdateWater
}) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const totalHabits = DAILY_HABITS.length;
  const completedCount = DAILY_HABITS.filter((h) => habitsState[h.id]).length;
  const progressPercent = Math.round((completedCount / totalHabits) * 100);
  const goalAchieved = completedCount >= 5;

  const getHabitIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-[#D4AF37]' };
    switch (iconName) {
      case 'Droplet': return <Droplet {...props} />;
      case 'Footprints': return <Footprints {...props} />;
      case 'Salad': return <Salad {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'Moon': return <Moon {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  const handleToggle = (id: string) => {
    const wasCompleted = habitsState[id];
    onToggleHabit(id);
    if (!wasCompleted) {
      if (completedCount + 1 >= 5) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 space-y-6 text-[#F9F9F9]">
      {/* Top Banner Card: Daily Status & Progress Ring */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#1E1E1E] to-[#161616] border border-[#3D3D3D] shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-[#D4AF37] text-[#121212] text-[10px] font-black uppercase tracking-[0.2em]">
                Protocolo 30 Dias
              </span>
              <span className="flex items-center gap-1 text-xs text-[#C29B91] font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                Dia {selectedDay} de 30
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#F9F9F9] mb-2">
              Hábitos de Longevidade
            </h1>
            <p className="text-xs sm:text-sm text-[#F9F9F9]/75 max-w-md leading-relaxed">
              A regra de ouro de Amalfi: cumpra no mínimo <strong className="text-[#D4AF37] font-bold">5 de 6 hábitos</strong> diários para desinflamar o metabolismo celular.
            </p>
          </div>

          {/* Progress Circular Dial */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#2C2C2C]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#D4AF37] transition-all duration-500 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3"
                  strokeLinecap="square"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-sans font-black text-[#F9F9F9]">{progressPercent}%</span>
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold">
                  {completedCount}/{totalHabits}
                </span>
              </div>
            </div>

            {goalAchieved && (
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1 bg-[#2C2C2C] px-2.5 py-0.5 border border-[#D4AF37]/40">
                <Trophy className="w-3 h-3 text-[#D4AF37]" />
                Meta Diária Atingida
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 30-Day Grid Scrubber */}
      <div className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md">
        <div className="flex items-center justify-between mb-3 border-b border-[#3D3D3D] pb-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C29B91] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            Seletor de Dia do Desafio:
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F9F9F9]/60">30 Folios</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`py-2 flex flex-col items-center justify-center text-xs font-bold transition-all border ${
                selectedDay === day
                  ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-sm font-black'
                  : 'bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9]/80 border-[#383838]'
              }`}
            >
              <span>{day}</span>
              <span className="text-[7px] uppercase tracking-wider opacity-60">D</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Habits Checklist */}
      <div className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-[#3D3D3D] pb-2">
          <h3 className="font-serif text-lg font-bold text-[#F9F9F9]">
            Checklist Diário — Dia {selectedDay}
          </h3>
          <span className="text-xs text-[#C29B91] font-bold uppercase tracking-wider">
            {completedCount} de {totalHabits} cumpridos
          </span>
        </div>

        <div className="space-y-2.5">
          {DAILY_HABITS.map((habit) => {
            const isDone = !!habitsState[habit.id];
            return (
              <motion.div
                key={habit.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleToggle(habit.id)}
                className={`p-3.5 sm:p-4 border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-[#1E1E1E] text-[#F9F9F9] border-[#D4AF37] shadow-xs'
                    : 'bg-[#1E1E1E] hover:bg-[#242424] text-[#F9F9F9]/80 border-[#383838]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 flex items-center justify-center shrink-0 border ${
                      isDone
                        ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                        : 'bg-[#2C2C2C] text-[#D4AF37] border-[#3D3D3D]'
                    }`}
                  >
                    {getHabitIcon(habit.iconName)}
                  </div>
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        isDone ? 'line-through text-[#F9F9F9]/70' : 'text-[#F9F9F9]'
                      }`}
                    >
                      {habit.label}
                    </h4>
                    <p className="text-[11px] text-[#F9F9F9]/55 font-sans">
                      {habit.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 flex items-center justify-center shrink-0 border transition-all ${
                    isDone
                      ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                      : 'border-[#3D3D3D] bg-[#2C2C2C]'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4 text-[#121212]" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Water Intake Tracker Box */}
      <div className="bg-[#2C2C2C] p-5 sm:p-6 border border-[#3D3D3D] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-[#1E1E1E] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40 shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#F9F9F9]">
              Consumo de Água: {waterIntake} ml / 2500 ml
            </h4>
            <p className="text-xs text-[#F9F9F9]/60">
              Fundamental para a eliminação celular de toxinas matinais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateWater(Math.max(0, waterIntake - 250))}
            className="px-3 py-1.5 bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9] text-xs font-bold border border-[#383838]"
          >
            -250 ml
          </button>
          <button
            onClick={() => onUpdateWater(Math.min(4000, waterIntake + 250))}
            className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-[#D4AF37]"
          >
            <Plus className="w-3.5 h-3.5" />
            +250 ml
          </button>
          <button
            onClick={() => onUpdateWater(0)}
            title="Zerar água do dia"
            className="p-2 bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9]/50 border border-[#383838]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
