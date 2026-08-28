// Audio Book Narrator Engine for 4WOMAN'S
// Calibrated for natural Brazilian Portuguese cadence, expressive intonation, and high-fidelity speech synthesis.

import { PageContent } from '../types';

export interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  gender: 'female' | 'male' | 'neutral';
  isPremium: boolean;
  voice: SpeechSynthesisVoice;
}

export interface NarratorSettings {
  speed: number; // 0.85, 1.0, 1.2
  pitch: number; // 0.95 - 1.05
  voiceId: string | null;
  continuousPlay: boolean; // Auto advance to next folio
}

export const DEFAULT_NARRATOR_SETTINGS: NarratorSettings = {
  speed: 0.92, // Slightly calmer, premium audiobook cadence
  pitch: 0.98, // Warmer, fuller timbre
  voiceId: null,
  continuousPlay: true
};

// Clean and prepare the slide content for natural, pleasant speech
export function prepareAudioScript(page: PageContent): string {
  const parts: string[] = [];

  // 1. Announce title with a natural pause
  if (page.title) {
    parts.push(`${page.title}.`);
  }

  // 2. Subtitle or context
  if (page.subtitle && page.subtitle.toLowerCase() !== page.title.toLowerCase()) {
    parts.push(`${page.subtitle}.`);
  }

  // 3. Memorable quote or principle
  if (page.quote && page.quote !== page.title && page.quote !== page.subtitle) {
    parts.push(`Princípio: "${page.quote}".`);
  }

  // 4. Body paragraphs
  if (page.body && page.body.length > 0) {
    page.body.forEach((paragraph) => {
      let cleanP = paragraph
        .replace(/[•–—]/g, ' ')
        .replace(/\b(\d+)\s*kcal\b/gi, '$1 quilocalorias')
        .replace(/\b(\d+)\s*mg\b/gi, '$1 miligramas')
        .replace(/\b(\d+)\s*g\b/gi, '$1 gramas')
        .replace(/\b(\d+)\s*ml\b/gi, '$1 mililitros')
        .replace(/\b(\d+)\s*min\b/gi, '$1 minutos')
        .replace(/\b(\d+)h\b/gi, '$1 horas')
        .replace(/\b1ª\b/gi, 'primeira')
        .replace(/\b2ª\b/gi, 'segunda')
        .replace(/\b3ª\b/gi, 'terceira')
        .replace(/\b4ª\b/gi, 'quarta')
        .replace(/\s{2,}/g, ' ')
        .trim();

      if (!cleanP.endsWith('.') && !cleanP.endsWith('!') && !cleanP.endsWith('?')) {
        cleanP += '.';
      }
      parts.push(cleanP);
    });
  }

  // 5. Bullets or key practices
  if (page.bullets && page.bullets.length > 0) {
    parts.push('Pontos essenciais:');
    page.bullets.forEach((bullet) => {
      let cleanBullet = bullet
        .replace(/^[•\-\*]\s*/, '')
        .replace(/[•–—]/g, ' ')
        .replace(/\b(\d+)\s*kcal\b/gi, '$1 quilocalorias')
        .replace(/\b(\d+)\s*mg\b/gi, '$1 miligramas')
        .replace(/\b(\d+)\s*g\b/gi, '$1 gramas')
        .replace(/\b(\d+)\s*ml\b/gi, '$1 mililitros')
        .replace(/\b(\d+)\s*min\b/gi, '$1 minutos')
        .trim();
      if (!cleanBullet.endsWith('.') && !cleanBullet.endsWith('!') && !cleanBullet.endsWith('?')) {
        cleanBullet += '.';
      }
      parts.push(cleanBullet);
    });
  }

  // 6. Highlight or key takeaway
  if (page.highlight) {
    parts.push(`Destaque importante: ${page.highlight}.`);
  }

  // 7. Actionable next step or reflection
  if (page.actionText && !page.actionText.includes('Deslize') && !page.actionText.includes('→')) {
    parts.push(`Aplicação prática: ${page.actionText}.`);
  }

  return parts.join(' ');
}

// Splits long text into natural sentences to prevent Web Speech API buffer timeout
export function splitIntoSentences(text: string): string[] {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // If sentences are too long (>180 chars), split by commas/semicolons
  const refined: string[] = [];
  for (const s of sentences) {
    if (s.length > 200) {
      const subParts = s.split(/(?<=[,;])\s+/);
      let current = '';
      for (const part of subParts) {
        if ((current + ' ' + part).length > 180) {
          if (current) refined.push(current.trim());
          current = part;
        } else {
          current = current ? current + ' ' + part : part;
        }
      }
      if (current) refined.push(current.trim());
    } else {
      refined.push(s);
    }
  }

  return refined.length > 0 ? refined : [text];
}

// Detect and rank best available voices
export function getAvailablePortugueseVoices(): VoiceOption[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }

  const allVoices = window.speechSynthesis.getVoices();
  const ptVoices = allVoices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith('pt') ||
      v.lang.toLowerCase().includes('brazil') ||
      v.lang.toLowerCase().includes('portuguese')
  );

  const voiceList: VoiceOption[] = [];

  ptVoices.forEach((v) => {
    const nameLower = v.name.toLowerCase();
    const isPremium =
      nameLower.includes('natural') ||
      nameLower.includes('online') ||
      nameLower.includes('enhanced') ||
      nameLower.includes('google') ||
      nameLower.includes('neural') ||
      nameLower.includes('premium');

    let gender: 'female' | 'male' | 'neutral' = 'neutral';
    if (
      nameLower.includes('francisca') ||
      nameLower.includes('maria') ||
      nameLower.includes('luciana') ||
      nameLower.includes('leticia') ||
      nameLower.includes('joana') ||
      nameLower.includes('vitória') ||
      nameLower.includes('heloisa') ||
      nameLower.includes('female') ||
      nameLower.includes('feminina')
    ) {
      gender = 'female';
    } else if (
      nameLower.includes('antonio') ||
      nameLower.includes('felipe') ||
      nameLower.includes('daniel') ||
      nameLower.includes('ricardo') ||
      nameLower.includes('male') ||
      nameLower.includes('masculina')
    ) {
      gender = 'male';
    } else if (v.lang.toLowerCase().includes('br') || v.lang.toLowerCase().includes('pt-br')) {
      // Chrome Google português do Brasil defaults nicely to female natural
      if (nameLower.includes('google')) {
        gender = 'female';
      }
    }

    // Friendly display name
    let friendlyName = v.name.replace(/Microsoft |Google |Apple /i, '').replace(/\(.*\)/, '').trim();
    if (!friendlyName) friendlyName = v.name;

    voiceList.push({
      id: v.name,
      name: `${friendlyName} (${v.lang})`,
      lang: v.lang,
      gender,
      isPremium,
      voice: v
    });
  });

  // Sort by quality: Premium/Natural pt-BR first, then other pt-BR, then others
  voiceList.sort((a, b) => {
    const isPtBrA = a.lang.toLowerCase().includes('br') ? 1 : 0;
    const isPtBrB = b.lang.toLowerCase().includes('br') ? 1 : 0;
    if (isPtBrA !== isPtBrB) return isPtBrB - isPtBrA;

    if (a.isPremium !== b.isPremium) return b.isPremium ? 1 : -1;
    return 0;
  });

  return voiceList;
}
