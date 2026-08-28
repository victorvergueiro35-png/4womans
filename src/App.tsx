import React, { useState, useEffect } from 'react';
import { APP_MODULES } from './data/modules';
import { AMALFI_PAGES } from './data/amalfiPages';
import { CORTISOL_PAGES } from './data/cortisolPages';
import { ModuleItem, UserPreferences } from './types';
import { Splash } from './components/Splash';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { ModuleCard } from './components/ModuleCard';
import { CarouselViewer } from './components/CarouselViewer';
import { HabitTrackerView } from './components/HabitTrackerView';
import { PlaybookIndexView } from './components/PlaybookIndexView';
import { ProfileView } from './components/ProfileView';
import { LockedModuleModal } from './components/LockedModuleModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { ConsistencyView } from './components/ConsistencyView';
import { ThirtyTeasView } from './components/ThirtyTeasView';
import { generateAmalfiPDF } from './utils/pdfGenerator';
import { Sparkles, BookOpen, ArrowRight, Moon, Sun } from 'lucide-react';

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Active Tab State
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Active Custom View (Consistency / Teas)
  const [activeCustomModule, setActiveCustomModule] = useState<'consistency' | 'teas' | null>(null);

  // Active Playbook Data for Carousel
  const [activePlaybookType, setActivePlaybookType] = useState<'amalfi' | 'cortisol'>('amalfi');

  // Carousel Open State
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselStartPage, setCarouselStartPage] = useState(1);

  // Locked Module Modal
  const [selectedLockedModule, setSelectedLockedModule] = useState<ModuleItem | null>(null);

  // PWA Modal
  const [showPwaModal, setShowPwaModal] = useState(false);

  // Theme State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('4womans_theme') as 'dark' | 'light' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    const savedPrefs = localStorage.getItem('4womans_prefs');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.theme) return parsed.theme;
      } catch (e) {}
    }
    return 'dark';
  });

  // Apply theme to document body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('4womans_theme', theme);
  }, [theme]);

  // Toggle Theme handler
  const handleToggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      handleUpdatePrefs({ theme: nextTheme });
      return nextTheme;
    });
  };

  // User Preferences
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('4womans_prefs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      fontSize: 'medium',
      highContrast: false,
      theme: 'dark',
      userName: '',
      hasSeenSplash: false
    };
  });

  // Bookmarks
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>(() => {
    const saved = localStorage.getItem('4womans_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [1, 26, 31, 40, 50]; // default useful bookmarks
  });

  // Daily Habits State (Key: habitId -> boolean)
  const [habitsState, setHabitsState] = useState<Record<string, boolean>>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`4womans_habits_${today}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {};
  });

  // Water Intake
  const [waterIntake, setWaterIntake] = useState<number>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`4womans_water_${today}`);
    return saved ? parseInt(saved, 10) : 750;
  });

  // Save prefs to localStorage
  const handleUpdatePrefs = (newPrefs: Partial<UserPreferences>) => {
    setUserPrefs((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('4womans_prefs', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle bookmark
  const handleToggleBookmark = (pageId: number) => {
    setBookmarkedPages((prev) => {
      let updated: number[];
      if (prev.includes(pageId)) {
        updated = prev.filter((id) => id !== pageId);
      } else {
        updated = [...prev, pageId];
      }
      localStorage.setItem('4womans_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle habit for today
  const handleToggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabitsState((prev) => {
      const updated = { ...prev, [habitId]: !prev[habitId] };
      localStorage.setItem(`4womans_habits_${today}`, JSON.stringify(updated));
      return updated;
    });
  };

  // Update water intake
  const handleUpdateWater = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    setWaterIntake(amount);
    localStorage.setItem(`4womans_water_${today}`, amount.toString());
  };

  // Open Carousel at specific page
  const handleOpenPlaybookPage = (pageId: number = 1, type: 'amalfi' | 'cortisol' = 'amalfi') => {
    setActivePlaybookType(type);
    setCarouselStartPage(pageId);
    setIsCarouselOpen(true);
  };

  // Open module handler
  const handleOpenModule = (moduleId: string) => {
    if (moduleId === 'dieta-amalfitana') {
      handleOpenPlaybookPage(1, 'amalfi');
    } else if (moduleId === 'reduzindo-cortisol') {
      handleOpenPlaybookPage(1, 'cortisol');
    } else if (moduleId === 'consistencia-dieta') {
      setActiveCustomModule('consistency');
    } else if (moduleId === '30-chas') {
      setActiveCustomModule('teas');
    }
  };

  const handleDownloadPdf = () => {
    generateAmalfiPDF();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#121212] text-[#F9F9F9]">
      {/* 1. Splash Screen on first load */}
      {showSplash && <Splash onComplete={() => setShowSplash(false)} />}

      {/* 2. Full-Screen Infinite Carousel (when user is reading playbook) */}
      {isCarouselOpen ? (
        <CarouselViewer
          initialPage={carouselStartPage}
          pages={activePlaybookType === 'amalfi' ? AMALFI_PAGES : CORTISOL_PAGES}
          playbookTitle={activePlaybookType === 'amalfi' ? 'Dieta Amalfitana' : 'Reduzindo Cortisol'}
          onBack={() => setIsCarouselOpen(false)}
          userPrefs={userPrefs}
          onUpdatePrefs={handleUpdatePrefs}
          bookmarkedPages={bookmarkedPages}
          onToggleBookmark={handleToggleBookmark}
          habitsState={habitsState}
          onToggleHabit={handleToggleHabit}
        />
      ) : activeCustomModule === 'consistency' ? (
        <ConsistencyView onBack={() => setActiveCustomModule(null)} />
      ) : activeCustomModule === 'teas' ? (
        <ThirtyTeasView onBack={() => setActiveCustomModule(null)} />
      ) : (
        <>
          {/* 3. Global Top Header */}
          <Header
            onOpenProfile={() => setCurrentTab('profile')}
            onOpenPlaybook={() => handleOpenPlaybookPage(1, 'amalfi')}
            bookmarkedCount={bookmarkedPages.length}
            onDownloadPdf={handleDownloadPdf}
            onShowPwaModal={() => setShowPwaModal(true)}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          {/* 4. Main Body Content Based on Active Tab */}
          <main className="flex-1">
            {currentTab === 'home' && (
              <div className="max-w-6xl mx-auto px-4 py-6 pb-24 space-y-6">
                {/* Hero Exclusive Banner */}
                <div
                  onClick={() => handleOpenPlaybookPage(1)}
                  className="p-6 sm:p-8 bg-gradient-to-br from-[#1E1E1E] to-[#161616] text-[#F9F9F9] cursor-pointer relative overflow-hidden group border border-[#3D3D3D] hover:border-[#D4AF37]/50 shadow-xl transition-all"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-2xl space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 bg-[#D4AF37] text-[#121212] text-[10px] font-black uppercase tracking-[0.2em] shadow-xs">
                        Dossiê Principal • 01
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C29B91] flex items-center gap-1 font-bold">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        52 Lições de Alta Performance
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F9F9F9] leading-tight sm:leading-none">
                      Dieta Amalfitana
                    </h2>

                    <p className="text-xs sm:text-sm text-[#F9F9F9]/80 leading-relaxed font-sans max-w-xl">
                      O segredo das mulheres mais elegantes e longevas do Mediterrâneo. Desinchaço celular, autoridade estética e harmonia metabólica com foco em longevidade ativa.
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all active:scale-95 border border-[#D4AF37]">
                        <span>Abrir Carrossel Infinito</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPdf();
                        }}
                        className="px-4 py-2.5 bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] font-bold text-xs uppercase tracking-wider border border-[#3D3D3D] flex items-center gap-1.5 transition-all"
                      >
                        <span>Salvar PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* THEME MODE SWITCHER BANNER ON HOME PAGE (Moon / Sun) */}
                <div
                  id="home-theme-toggle-banner"
                  onClick={handleToggleTheme}
                  className="p-4 sm:p-5 bg-[#2C2C2C] hover:bg-[#333333] border border-[#3D3D3D] hover:border-[#D4AF37]/50 shadow-md flex items-center justify-between gap-4 cursor-pointer transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-3 border shrink-0 transition-all ${
                        theme === 'dark'
                          ? 'bg-[#121212] text-[#D4AF37] border-[#3D3D3D] group-hover:border-[#D4AF37]'
                          : 'bg-[#B8860B] text-[#FFFFFF] border-[#B8860B] shadow-sm'
                      }`}
                    >
                      {theme === 'dark' ? (
                        <Moon className="w-5 h-5 fill-[#D4AF37]/20" />
                      ) : (
                        <Sun className="w-5 h-5 fill-[#FFFFFF]/30 animate-[spin_10s_linear_infinite]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif text-sm sm:text-base font-bold text-[#F9F9F9]">
                          {theme === 'dark' ? 'Modo Noturno (Tema Escuro)' : 'Modo Claro (Tema Diurno)'}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                            theme === 'dark'
                              ? 'bg-[#121212] text-[#D4AF37] border border-[#3D3D3D]'
                              : 'bg-[#EDE8DE] text-[#1C1F22] border border-[#DDD6CB]'
                          }`}
                        >
                          {theme === 'dark' ? 'Lua Ativa' : 'Sol Ativo'}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#F9F9F9]/70 font-sans mt-0.5 truncate sm:whitespace-normal">
                        {theme === 'dark'
                          ? 'Clique para alternar para o Modo Claro (fundo claro com letras em cinza chumbo).'
                          : 'Clique para alternar para o Modo Noturno (fundo escuro com letras claras).'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTheme();
                    }}
                    className={`px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border active:scale-95 shrink-0 ${
                      theme === 'dark'
                        ? 'bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] border-[#D4AF37]'
                        : 'bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] border-[#3D3D3D]'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mudar para Claro</span>
                        <span className="sm:hidden">Claro</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mudar para Noturno</span>
                        <span className="sm:hidden">Noturno</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dashboard Section Title */}
                <div className="flex items-center justify-between pt-2 border-b border-[#2C2C2C] pb-2">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F9F9F9]">
                      Coleção Exclusiva 4WOMAN'S
                    </h2>
                    <p className="text-xs text-[#F9F9F9]/60">
                      Módulos de longevidade celular, nutrição e alta performance
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 bg-[#1E1E1E]">
                    11 Módulos • 4 Abertos
                  </span>
                </div>

                {/* 2-Column (Mobile) / 4-Column (Tablet/Desktop) Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
                  {APP_MODULES.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onOpen={handleOpenModule}
                      onLockedClick={(mod) => setSelectedLockedModule(mod)}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'playbook' && (
              <PlaybookIndexView
                onSelectPage={(pageId) => handleOpenPlaybookPage(pageId)}
                bookmarkedPages={bookmarkedPages}
                onDownloadPdf={handleDownloadPdf}
              />
            )}

            {currentTab === 'progress' && (
              <HabitTrackerView
                habitsState={habitsState}
                onToggleHabit={handleToggleHabit}
                waterIntake={waterIntake}
                onUpdateWater={handleUpdateWater}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                userPrefs={userPrefs}
                onUpdatePrefs={handleUpdatePrefs}
                bookmarkedPages={bookmarkedPages}
                onSelectPage={(pageId) => handleOpenPlaybookPage(pageId)}
                onShowPwaModal={() => setShowPwaModal(true)}
                onDownloadPdf={handleDownloadPdf}
                theme={theme}
                onToggleTheme={handleToggleTheme}
              />
            )}
          </main>

          {/* 5. Mobile Bottom Tab Bar with Moon/Sun Theme Toggle */}
          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          {/* 6. Locked Module Waitlist Modal */}
          <LockedModuleModal
            module={selectedLockedModule}
            onClose={() => setSelectedLockedModule(null)}
          />

          {/* 7. PWA Installation Instructions Modal */}
          <PWAInstallBanner
            isOpen={showPwaModal}
            onClose={() => setShowPwaModal(false)}
          />
        </>
      )}
    </div>
  );
}
