export type PageCategory =
  | 'capa'
  | 'choque'
  | 'relacionamento'
  | 'carreira_futuro'
  | 'velhice'
  | 'liberdade'
  | 'rotina'
  | 'refeicoes'
  | 'piramide'
  | 'compras'
  | 'plano'
  | 'porcoes'
  | 'lifestyle'
  | 'skincare'
  | 'substituicoes'
  | 'faq'
  | 'tracker'
  | 'final'
  | 'transition'
  | 'consistency'
  | 'bonus'
  | 'teas'
  | 'upsell'
  | 'fisiologia'
  | 'diagnostico'
  | 'metabolismo'
  | 'neurociencia'
  | 'respiracao'
  | 'nutricao'
  | 'botanica'
  | 'sono'
  | 'mindset'
  | string;

export interface PageContent {
  id: number;
  title: string;
  subtitle?: string;
  category: PageCategory;
  chapter: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  quote?: string;
  body: string[];
  bullets?: string[];
  highlight?: string;
  actionText?: string;
  badge?: string;
  interactiveType?: 'meal_plan_week1' | 'meal_plan_week2' | 'substitutions_table' | 'habit_tracker' | 'breathing_box' | 'download_pdf';
}

export interface ModuleItem {
  id: string;
  title: string;
  iconName: string;
  color: 'burgundy' | 'gray';
  status: string;
  isLocked: boolean;
  tagline: string;
  details: string;
  pagesCount?: number;
  estTime?: string;
}

export interface DailyHabit {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  theme?: 'dark' | 'light';
  userName: string;
  savedPdfDate?: string;
  hasSeenSplash: boolean;
}
