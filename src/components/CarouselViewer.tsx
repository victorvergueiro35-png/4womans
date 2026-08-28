import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AMALFI_PAGES } from '../data/amalfiPages';
import { CORTISOL_PAGES } from '../data/cortisolPages';
import { PageContent, UserPreferences } from '../types';
import {
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Type,
  Eye,
  Grid,
  Check,
  CheckCircle2,
  RefreshCw,
  Clock,
  Heart,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MealPlanSwitcher } from './MealPlanSwitcher';
import { BreathingTimer } from './BreathingTimer';
import { SubstitutionsFinder } from './SubstitutionsFinder';
import { AudioBookPlayerBar } from './AudioBookPlayerBar';
import { generateAmalfiPDF } from '../utils/pdfGenerator';
import {
  VoiceOption,
  NarratorSettings,
  DEFAULT_NARRATOR_SETTINGS,
  prepareAudioScript,
  splitIntoSentences,
  getAvailablePortugueseVoices
} from '../utils/audioBookNarrator';
import confetti from 'canvas-confetti';

interface CarouselViewerProps {
  initialPage?: number;
  onBack: () => void;
  onNavigatePage?: (pageId: number) => void;
  userPrefs: UserPreferences;
  onUpdatePrefs: (prefs: Partial<UserPreferences>) => void;
  bookmarkedPages: number[];
  onToggleBookmark: (pageId: number) => void;
  habitsState: Record<string, boolean>;
  onToggleHabit: (habitId: string) => void;
  pages?: PageContent[];
  playbookTitle?: string;
}

export const CarouselViewer: React.FC<CarouselViewerProps> = ({
  initialPage = 1,
  onBack,
  userPrefs,
  onUpdatePrefs,
  bookmarkedPages,
  onToggleBookmark,
  habitsState,
  onToggleHabit,
  pages = AMALFI_PAGES,
  playbookTitle = 'Dieta Amalfitana'
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialPage - 1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showIndexDrawer, setShowIndexDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [narratorSettings, setNarratorSettings] = useState<NarratorSettings>(DEFAULT_NARRATOR_SETTINGS);

  const containerRef = useRef<HTMLDivElement>(null);
  const activePagesList = pages && pages.length > 0 ? pages : AMALFI_PAGES;
  const totalPages = activePagesList.length;
  const currentPage = activePagesList[currentIndex] || activePagesList[0];
  const isBookmarked = bookmarkedPages.includes(currentPage.id);
  const speechRunIdRef = useRef(0);


  // Load natural voices
  useEffect(() => {
    const updateVoices = () => {
      const voices = getAvailablePortugueseVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !narratorSettings.voiceId) {
        setNarratorSettings((prev) => ({ ...prev, voiceId: voices[0].id }));
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Stop speech synthesis helper
  const stopSpeech = useCallback(() => {
    speechRunIdRef.current++;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Core Speech Narration Engine with Natural Cadence & Chunking
  const startNarration = useCallback(
    (indexToRead: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      stopSpeech();
      const runId = ++speechRunIdRef.current;

      const targetPage = activePagesList[indexToRead];
      if (!targetPage) return;

      const script = prepareAudioScript(targetPage);
      const sentences = splitIntoSentences(script);

      if (sentences.length === 0) return;

      setIsSpeaking(true);
      setShowAudioPlayer(true);

      const voices = availableVoices.length > 0 ? availableVoices : getAvailablePortugueseVoices();
      const selectedVoice =
        voices.find((v) => v.id === narratorSettings.voiceId)?.voice ||
        voices[0]?.voice ||
        null;

      let sentenceIdx = 0;

      const speakSentence = () => {
        if (speechRunIdRef.current !== runId) return;

        if (sentenceIdx >= sentences.length) {
          // Finished reading current page
          if (narratorSettings.continuousPlay && indexToRead < totalPages - 1) {
            // Calm natural pause between folios (1.3s)
            setTimeout(() => {
              if (speechRunIdRef.current === runId) {
                setCurrentIndex((prev) => {
                  const nextIdx = prev + 1;
                  startNarration(nextIdx);
                  return nextIdx;
                });
              }
            }, 1300);
          } else {
            setIsSpeaking(false);
          }
          return;
        }

        const text = sentences[sentenceIdx];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedVoice?.lang || 'pt-BR';
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        utterance.rate = narratorSettings.speed;
        utterance.pitch = narratorSettings.pitch;

        utterance.onend = () => {
          if (speechRunIdRef.current === runId) {
            sentenceIdx++;
            speakSentence();
          }
        };

        utterance.onerror = (e) => {
          console.warn('Utterance interrupted or completed:', e);
          if (speechRunIdRef.current === runId) {
            setIsSpeaking(false);
          }
        };

        window.speechSynthesis.speak(utterance);
      };

      speakSentence();
    },
    [availableVoices, narratorSettings, totalPages, stopSpeech]
  );

  // Toggle narration button
  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      setShowAudioPlayer(true);
      startNarration(currentIndex);
    }
  };

  // Sync initialPage if it changes externally
  useEffect(() => {
    if (initialPage >= 1 && initialPage <= totalPages) {
      setCurrentIndex(initialPage - 1);
    }
  }, [initialPage, totalPages]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalPages]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const jumpToSlide = (index: number) => {
    setCurrentIndex(index);
    setShowIndexDrawer(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, onBack]);

  // Touch swipe handling
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: "4WOMAN'S — Dieta Amalfitana",
      text: `Página ${currentPage.id}: ${currentPage.title} — O Segredo das Mulheres Mais Lindas e Longevas do Mundo.`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      try {
        generateAmalfiPDF();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Failed to generate PDF:', err);
      } finally {
        setIsDownloadingPdf(false);
      }
    }, 300);
  };

  // Stop or update speech on slide change
  useEffect(() => {
    if (isSpeaking) {
      startNarration(currentIndex);
    }
  }, [currentIndex]);

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  // Typography font size mapping
  const bodyTextClass = {
    small: 'text-[13px] leading-relaxed',
    medium: 'text-[15px] leading-relaxed',
    large: 'text-[17px] leading-relaxed'
  }[userPrefs.fontSize || 'medium'];

  const headingTextClass = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  }[userPrefs.fontSize || 'medium'];

  return (
    <div
      id="amalfi-carousel-viewer"
      className="fixed inset-0 z-40 flex flex-col justify-between select-none overflow-hidden bg-[#121212] text-[#F9F9F9]"
    >
      {/* 1. TOP STATUS & PROGRESS BAR */}
      <div className="w-full bg-[#121212]/95 backdrop-blur-md border-b border-[#2C2C2C] z-50 safe-top">
        {/* Progress Bar Line */}
        <div className="w-full h-[2px] bg-[#2C2C2C]">
          <div
            className="h-full bg-gradient-to-r from-[#AA7C11] via-[#D4AF37] to-[#F9EBB2] transition-all duration-300 shadow-sm"
            style={{ width: `${((currentIndex + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Carousel Header Controls */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-2.5 max-w-5xl mx-auto gap-1 sm:gap-2">
          {/* Back Button */}
          <button
            id="carousel-back-btn"
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-[#2C2C2C] hover:bg-[#383838] active:scale-95 transition-all text-xs font-bold uppercase tracking-wider text-[#F9F9F9] hover:text-[#D4AF37] border border-[#3D3D3D] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          {/* Center: Chapter Promoted to Top + Horizontal Page & Folio Bar */}
          <button
            onClick={() => setShowIndexDrawer(true)}
            className="flex-1 min-w-0 flex flex-col items-center justify-center px-1.5 text-center group cursor-pointer overflow-hidden"
            title="Abrir Índice de Capítulos"
          >
            {/* 1. Chapter Title where 'Dieta Amalfitana' was */}
            <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-serif font-black uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#D4AF37] group-hover:text-[#F9EBB2] transition-colors truncate max-w-full leading-tight block">
              {currentPage.chapter}
            </span>

            {/* 2. Horizontal Page & Folio Navigation info */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-0.5 text-[8px] xs:text-[9px] sm:text-[10px] font-sans font-bold text-[#F9F9F9]/80 whitespace-nowrap">
              <span>Pág. {currentIndex + 1} de {totalPages}</span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-[#C29B91] uppercase tracking-wider font-semibold">Folio {currentPage.id}</span>
            </div>
          </button>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Quick Index Button */}
            <button
              onClick={() => setShowIndexDrawer(true)}
              title="Índice de Páginas"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] hover:text-[#D4AF37] active:scale-95 transition-transform border border-[#3D3D3D]"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => onToggleBookmark(currentPage.id)}
              title={isBookmarked ? 'Remover favorito' : 'Salvar favorito'}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center active:scale-95 transition-all border ${
                isBookmarked
                  ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                  : 'bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9]/80 border-[#3D3D3D]'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-[#121212]" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Text to Speech */}
            {'speechSynthesis' in window && (
              <button
                onClick={toggleSpeech}
                title={isSpeaking ? 'Pausar leitura' : 'Ouvir página'}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center active:scale-95 transition-all border ${
                  isSpeaking
                    ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                    : 'bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9]/80 border-[#3D3D3D]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick Settings (Font size / Contrast) */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              title="Ajustar Tipografia"
              className="w-7 h-7 sm:w-8 sm:h-8 hidden xs:flex items-center justify-center bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] hover:text-[#D4AF37] active:scale-95 border border-[#3D3D3D]"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            {/* Save PDF */}
            <button
              id="save-pdf-header-btn"
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf}
              title="Baixar Playbook em PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] text-xs font-black uppercase tracking-wider shadow-sm active:scale-95 transition-all border border-[#D4AF37]"
            >
              {isDownloadingPdf ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Settings Dropdown */}
        <AnimatePresence>
          {showSettingsDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#1E1E1E] px-4 py-3 border-t border-[#3D3D3D] flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider text-[10px]">Tipografia:</span>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onUpdatePrefs({ fontSize: size })}
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border ${
                      userPrefs.fontSize === size
                        ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37]'
                        : 'bg-[#2C2C2C] text-[#F9F9F9]/80 hover:bg-[#383838] border-[#3D3D3D]'
                    }`}
                  >
                    {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. MAIN HORIZONTAL SWIPE CAROUSEL */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative flex-1 flex items-center justify-center overflow-hidden w-full px-2 sm:px-6 py-2"
      >
        {/* Desktop Left / Right Navigation Buttons */}
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`hidden md:flex absolute left-4 z-30 w-10 h-10 items-center justify-center bg-[#1E1E1E]/90 hover:bg-[#D4AF37] text-[#F9F9F9] hover:text-[#121212] backdrop-blur-md border border-[#3D3D3D] shadow-md transition-all ${
            currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-90 hover:opacity-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex === totalPages - 1}
          className={`hidden md:flex absolute right-4 z-30 w-10 h-10 items-center justify-center bg-[#1E1E1E]/90 hover:bg-[#D4AF37] text-[#F9F9F9] hover:text-[#121212] backdrop-blur-md border border-[#3D3D3D] shadow-md transition-all ${
            currentIndex === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-90 hover:opacity-100'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* The Card Viewport Container */}
        <div className="relative w-full max-w-md md:max-w-4xl h-[78vh] sm:h-[82vh] flex items-center justify-center">
          {/* Peeking Next Slide */}
          {currentIndex < totalPages - 1 && (
            <div
              onClick={goToNext}
              className="absolute right-0 top-0 bottom-0 w-8 md:w-16 translate-x-4 md:translate-x-12 opacity-30 blur-[1px] hover:opacity-50 transition-opacity cursor-pointer hidden sm:block overflow-hidden pointer-events-auto border border-[#3D3D3D]"
            >
              <img
                src={AMALFI_PAGES[currentIndex + 1].image}
                alt="Próxima página"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Current Active Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage.id}
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full h-full overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#3D3D3D] relative bg-[#222222] text-[#F9F9F9]"
            >
              {/* Top Cover / Left Half: Editorial Image */}
              <div className="relative w-full md:w-5/12 h-44 sm:h-56 md:h-full shrink-0 overflow-hidden bg-black border-b md:border-b-0 md:border-r border-[#3D3D3D]">
                <img
                  src={currentPage.image}
                  alt={currentPage.imageAlt}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                  loading={currentIndex < 5 ? 'eager' : 'lazy'}
                />

                {/* Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#222222]/40" />

                {/* Page Number Badge & Category on image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#121212] text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] shadow-md border border-[#D4AF37]/50">
                    FOLIO {currentPage.id}
                  </span>
                  {currentPage.badge && (
                    <span className="px-2 py-1 bg-[#D4AF37] text-[#121212] text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">
                      {currentPage.badge}
                    </span>
                  )}
                </div>

                {/* Image caption */}
                {currentPage.imageCaption && (
                  <div className="absolute bottom-2 left-3 right-3 text-[#F9F9F9] text-[11px] font-serif italic drop-shadow-md line-clamp-1 opacity-90">
                    {currentPage.imageCaption}
                  </div>
                )}
              </div>

              {/* Right Half: Editorial Text Content */}
              <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#1E1E1E]">
                <div>
                  {/* Chapter Subtitle */}
                  <div className="flex items-center justify-between gap-2 mb-2 border-b border-[#3D3D3D] pb-1.5">
                    <span className="text-[10px] font-sans tracking-[0.25em] uppercase font-bold text-[#C29B91]">
                      {currentPage.chapter}
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                      Pág. {currentPage.id} — 52
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1
                    className={`font-serif font-black tracking-tight leading-tight text-[#F9F9F9] mb-1.5 ${headingTextClass}`}
                  >
                    {currentPage.title}
                  </h1>

                  {/* Subtitle */}
                  {currentPage.subtitle && (
                    <h2 className="text-xs sm:text-sm font-sans font-medium text-[#C29B91] italic mb-4">
                      {currentPage.subtitle}
                    </h2>
                  )}

                  {/* Quote Block (if exists) */}
                  {currentPage.quote && (
                    <div className="my-3.5 p-3.5 sm:p-4 bg-[#2C2C2C] border-l-2 border-[#D4AF37] text-[#F9F9F9] font-serif italic text-xs sm:text-sm leading-relaxed shadow-xs">
                      "{currentPage.quote}"
                    </div>
                  )}

                  {/* Body Paragraphs */}
                  <div className={`space-y-2.5 text-[#F9F9F9]/90 font-sans ${bodyTextClass}`}>
                    {currentPage.body.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Bullets (if exists) */}
                  {currentPage.bullets && currentPage.bullets.length > 0 && (
                    <div className="my-3.5 space-y-1.5 bg-[#2C2C2C] p-3.5 border border-[#3D3D3D]">
                      {currentPage.bullets.map((bullet, idx) => (
                        <div key={idx} className={`text-[#F9F9F9] flex items-start gap-2 ${bodyTextClass}`}>
                          <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                          <span>{bullet.replace(/^•\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Widgets according to page type */}
                  {currentPage.interactiveType === 'meal_plan_week1' && (
                    <MealPlanSwitcher phase="week1_early" />
                  )}
                  {currentPage.interactiveType === 'meal_plan_week2' && (
                    <MealPlanSwitcher phase="week1_late" />
                  )}
                  {currentPage.interactiveType === 'breathing_box' && (
                    <BreathingTimer />
                  )}
                  {currentPage.interactiveType === 'substitutions_table' && (
                    <SubstitutionsFinder />
                  )}
                  {currentPage.interactiveType === 'habit_tracker' && (
                    <div className="my-3 bg-[#2C2C2C] p-4 border border-[#3D3D3D] shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#F9F9F9] flex items-center gap-1.5 uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          Checklist Diário Editorial
                        </span>
                        <span className="text-[10px] text-[#C29B91] font-semibold uppercase tracking-wider">
                          Sincronização Ativa
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { id: 'agua', label: 'Água (2–3L) com limão siciliano matinal' },
                          { id: 'caminhada', label: 'Caminhada (30 min) ao ar livre' },
                          { id: 'vegetais', label: 'Vegetais (50% do prato raso)' },
                          { id: 'jantar_cedo', label: 'Jantar leve até às 20h' },
                          { id: 'sono', label: 'Sono regenerador (7–9 horas)' },
                          { id: 'sem_acucar', label: 'Zero açúcar refinado / industrial' }
                        ].map((habit) => (
                          <label
                            key={habit.id}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center gap-2.5 p-2 text-xs cursor-pointer transition-colors border ${
                              habitsState[habit.id]
                                ? 'bg-[#121212] text-[#D4AF37] border-[#D4AF37] font-semibold'
                                : 'bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9]/80 border-[#383838]'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!habitsState[habit.id]}
                              onChange={() => {
                                onToggleHabit(habit.id);
                                if (!habitsState[habit.id]) {
                                  confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                                }
                              }}
                              className="w-4 h-4 accent-[#D4AF37]"
                            />
                            <span>{habit.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentPage.interactiveType === 'download_pdf' && (
                    <div className="my-4 space-y-2 text-center">
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloadingPdf}
                        className="w-full py-3.5 px-5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] text-xs font-black uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all border border-[#D4AF37]"
                      >
                        {isDownloadingPdf ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-[#121212]" />
                            Gerando Playbook em PDF...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 text-[#121212]" />
                            Baixar Playbook Completo em PDF (52 Lições)
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2 justify-center pt-2">
                        <button
                          onClick={handleShare}
                          className="py-2 px-4 bg-[#2C2C2C] hover:bg-[#383838] text-[#F9F9F9] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 border border-[#3D3D3D]"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {shareSuccess ? 'Link Copiado!' : 'Compartilhar'}
                        </button>
                        <button
                          onClick={() => jumpToSlide(0)}
                          className="py-2 px-4 bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9] border border-[#383838] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95"
                        >
                          Início (Folio 1)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Golden Rule Highlight (if exists) */}
                  {currentPage.highlight && (
                    <div className="mt-4 p-3 bg-[#2C2C2C] border border-[#D4AF37]/50 text-xs text-[#D4AF37] font-bold flex items-start gap-2 shadow-xs">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{currentPage.highlight}</span>
                    </div>
                  )}
                </div>

                {/* Card Action / Next Hint */}
                <div className="mt-6 pt-3 border-t border-[#3D3D3D] flex items-center justify-between text-xs">
                  <button
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    className={`text-[#F9F9F9]/50 hover:text-[#F9F9F9] flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] transition-colors ${
                      currentIndex === 0 ? 'invisible' : ''
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={currentIndex === totalPages - 1}
                    className={`font-serif italic font-bold text-[#D4AF37] hover:text-[#F9EBB2] flex items-center gap-1 transition-transform hover:translate-x-1 ${
                      currentIndex === totalPages - 1 ? 'invisible' : ''
                    }`}
                  >
                    <span>{currentPage.actionText || 'Próximo →'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. AUDIOBOOK NARRATOR FLOATING PLAYER BAR */}
      <AnimatePresence>
        {showAudioPlayer && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-full z-50 shrink-0"
          >
            <AudioBookPlayerBar
              isPlaying={isSpeaking}
              onPlayPause={() => {
                if (isSpeaking) {
                  stopSpeech();
                } else {
                  startNarration(currentIndex);
                }
              }}
              onPrev={() => {
                if (currentIndex > 0) {
                  const prevIdx = currentIndex - 1;
                  setCurrentIndex(prevIdx);
                  if (isSpeaking) startNarration(prevIdx);
                }
              }}
              onNext={() => {
                if (currentIndex < totalPages - 1) {
                  const nextIdx = currentIndex + 1;
                  setCurrentIndex(nextIdx);
                  if (isSpeaking) startNarration(nextIdx);
                }
              }}
              onClose={() => {
                stopSpeech();
                setShowAudioPlayer(false);
              }}
              currentPageTitle={currentPage.title}
              currentFolio={currentIndex + 1}
              totalFolios={totalPages}
              settings={narratorSettings}
              onUpdateSettings={(newSettings) => {
                setNarratorSettings((prev) => ({ ...prev, ...newSettings }));
                if (isSpeaking && (newSettings.speed !== undefined || newSettings.voiceId !== undefined)) {
                  setTimeout(() => startNarration(currentIndex), 100);
                }
              }}
              availableVoices={availableVoices}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < totalPages - 1}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. BOTTOM CAROUSEL CONTROLLER BAR */}
      <div className="w-full bg-[#121212]/95 backdrop-blur-md border-t border-[#2C2C2C] px-4 py-2.5 safe-bottom z-50 shrink-0">
        <div className="max-w-md mx-auto flex items-center justify-between text-[#F9F9F9] text-xs">
          {/* Quick Prev Button */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`p-2 bg-[#2C2C2C] hover:bg-[#383838] active:scale-95 transition-all border border-[#3D3D3D] ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Scrubber / Counter Button with Horizontal Folio & Chapter */}
          <button
            onClick={() => setShowIndexDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C2C2C] hover:bg-[#383838] text-xs font-bold active:scale-95 transition-all border border-[#3D3D3D] max-w-[190px] xs:max-w-xs truncate cursor-pointer"
            title="Abrir Índice de Páginas e Capítulos"
          >
            <span className="font-serif text-[#D4AF37] shrink-0">Folio {currentIndex + 1}</span>
            <span className="text-[#F9F9F9]/40 shrink-0">•</span>
            <span className="text-[#F9F9F9]/85 truncate text-[11px] font-sans font-medium">
              {currentPage.chapter}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Compartilhar página"
            className="p-2 bg-[#2C2C2C] hover:bg-[#383838] active:scale-95 transition-all text-[#D4AF37] border border-[#3D3D3D]"
          >
            {shareSuccess ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Quick Next Button */}
          <button
            onClick={goToNext}
            disabled={currentIndex === totalPages - 1}
            className={`p-2 bg-[#D4AF37] hover:bg-[#E5C358] text-[#121212] active:scale-95 transition-all border border-[#D4AF37] ${
              currentIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. CHAPTER & PAGE JUMPER MODAL DRAWER */}
      <AnimatePresence>
        {showIndexDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowIndexDrawer(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#2C2C2C] text-[#F9F9F9] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#3D3D3D]"
            >
              {/* Header */}
              <div className="p-4 bg-[#1E1E1E] text-[#F9F9F9] flex items-center justify-between border-b border-[#3D3D3D]">
                <div>
                  <h3 className="font-serif text-lg font-bold">Sumário Editorial</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">{totalPages} Folios • {playbookTitle}</p>
                </div>
                <button
                  onClick={() => setShowIndexDrawer(false)}
                  className="px-3 py-1 bg-[#2C2C2C] hover:bg-[#383838] text-xs font-bold uppercase tracking-wider border border-[#3D3D3D]"
                >
                  Fechar
                </button>
              </div>

              {/* Pages Grid */}
              <div className="p-4 overflow-y-auto space-y-3">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {activePagesList.map((pg, idx) => (
                    <button
                      key={pg.id}
                      onClick={() => jumpToSlide(idx)}
                      className={`p-2 flex flex-col items-center justify-center text-xs font-bold transition-all border ${
                        currentIndex === idx
                          ? 'bg-[#D4AF37] text-[#121212] border-[#D4AF37] shadow-xs font-black'
                          : bookmarkedPages.includes(pg.id)
                          ? 'bg-[#1E1E1E] text-[#D4AF37] border-[#D4AF37]'
                          : 'bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9] border-[#383838]'
                      }`}
                    >
                      <span className="text-sm font-serif">{pg.id}</span>
                      <span className="text-[8px] uppercase tracking-wider font-normal truncate max-w-[55px]">
                        {pg.category}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Chapter Shortcuts */}
                <div className="pt-3 border-t border-[#3D3D3D] space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-[#C29B91] uppercase tracking-widest block">
                    Navegação por Capítulo:
                  </span>
                  {[
                    { label: 'Cap. 01: O Choque de Realidade (Pág. 01)', index: 0 },
                    { label: 'Cap. 02: As Rotinas Sagradas (Pág. 26)', index: 25 },
                    { label: 'Cap. 03: Pirâmide & Lista de Compras (Pág. 34)', index: 33 },
                    { label: 'Cap. 04: Plano Alimentar 4 Semanas (Pág. 40)', index: 39 },
                    { label: 'Cap. 05: Corpo, Mente & Skincare (Pág. 44)', index: 43 },
                    { label: 'Cap. 06: Tracker & Chamada Final (Pág. 50)', index: 49 }
                  ].map((ch) => (
                    <button
                      key={ch.index}
                      onClick={() => jumpToSlide(ch.index)}
                      className="w-full text-left p-2.5 bg-[#1E1E1E] hover:bg-[#252525] text-[#F9F9F9] font-medium flex items-center justify-between border border-[#383838] transition-colors group"
                    >
                      <span className="text-xs font-serif">{ch.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
