import React from 'react';
import { Home, BookOpen, CheckCircle2, User, Moon, Sun } from 'lucide-react';

export type NavTab = 'home' | 'playbook' | 'progress' | 'profile';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  theme = 'dark',
  onToggleTheme
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Início', icon: Home, indexNumber: '01' },
    { id: 'playbook' as NavTab, label: 'Playbook', icon: BookOpen, indexNumber: '02' },
    { id: 'progress' as NavTab, label: 'Progresso', icon: CheckCircle2, indexNumber: '03' },
    { id: 'profile' as NavTab, label: 'Dossiê', icon: User, indexNumber: '04' }
  ];

  const isDark = theme === 'dark';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-md border-t border-[#2C2C2C] safe-bottom">
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all relative ${
                isActive
                  ? 'text-[#D4AF37] font-bold'
                  : 'text-[#F9F9F9]/50 hover:text-[#F9F9F9] font-medium'
              }`}
            >
              <div
                className={`p-1.5 transition-all border ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-sm'
                    : 'bg-[#2C2C2C] text-[#F9F9F9]/70 border-[#3D3D3D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[8.5px] uppercase tracking-[0.16em] font-semibold mt-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-[2px] bg-[#D4AF37]" />
              )}
            </button>
          );
        })}

        {/* Bottom Theme Mode Switcher (Moon / Sun) */}
        {onToggleTheme && (
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            title={isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Noturno'}
            className="flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all group"
          >
            <div
              className={`p-1.5 transition-all border ${
                isDark
                  ? 'bg-[#2C2C2C] text-[#D4AF37] border-[#3D3D3D] group-hover:border-[#D4AF37]'
                  : 'bg-[#B8860B] text-[#FFFFFF] border-[#B8860B] shadow-sm'
              }`}
            >
              {isDark ? (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#D4AF37]/20" />
              ) : (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FFFFFF]/30 animate-[spin_10s_linear_infinite]" />
              )}
            </div>
            <span
              className={`text-[8.5px] uppercase tracking-[0.16em] font-semibold mt-0.5 ${
                isDark ? 'text-[#D4AF37]' : 'text-[#B8860B]'
              }`}
            >
              {isDark ? 'Noturno' : 'Claro'}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

