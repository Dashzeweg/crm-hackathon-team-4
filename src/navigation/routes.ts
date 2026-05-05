import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Split,
  Send,
  Sparkles,
  Megaphone,
  TrendingUp,
  Settings,
  HelpCircle,
} from 'lucide-react';

/**
 * Single source of truth for in-app “routes” (SPA view ids).
 * Mirrors the intended retention workflow: audience → execution → measurement.
 */
export type AppRouteId =
  | 'overview'
  | 'segments'
  | 'segment-deliveries'
  | 'campaigns'
  | 'campaign-detail'
  | 'campaign-copilot'
  | 'analytics'
  | 'settings'
  | 'help';

export const DEFAULT_ROUTE: AppRouteId = 'overview';

export interface NavSection {
  /** Short Mongolian section title shown above items (information scent). */
  title: string;
  /** One-line hint for tooltips / overview cards. */
  hint: string;
  items: readonly {
    id: AppRouteId;
    label: string;
    icon: LucideIcon;
  }[];
}

/** Primary workflow groups (order = recommended mental model). */
export const NAV_SECTIONS: readonly NavSection[] = [
  {
    title: 'Ерөнхий',
    hint: 'Яг одоо юу болж байгааг харах, түүхэн үр дүн.',
    items: [
      { id: 'overview', label: 'Тойм', icon: LayoutDashboard },
      { id: 'analytics', label: 'Үр дүн ба аналитик', icon: TrendingUp },
    ],
  },
  {
    title: 'Хүртээмж (хэнд)',
    hint: 'Хэрэглэгчдийн бүлэг, тэдэнд хэн, хэзээ мессеж очих вэ.',
    items: [
      { id: 'segments', label: 'Сегментүүд', icon: Split },
      { id: 'segment-deliveries', label: 'Сегментийн түгээлт', icon: Send },
    ],
  },
  {
    title: 'Компанит ажил (юу хийх вэ)',
    hint: 'Зөвлөмж аваад урсгал бүтээх - олон алхамт автоматжуулалт.',
    items: [
      { id: 'campaigns', label: 'Кампанит ажлууд', icon: Megaphone },
      { id: 'campaign-copilot', label: 'AI туслах', icon: Sparkles },
    ],
  },
] as const;

export const SECONDARY_NAV: readonly {
  id: AppRouteId;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: 'settings', label: 'Тохиргоо', icon: Settings },
  { id: 'help', label: 'Тусламж', icon: HelpCircle },
];

const ROUTE_LABELS: Record<AppRouteId, string> = {
  overview: 'Тойм',
  analytics: 'Үр дүн ба аналитик',
  segments: 'Сегментүүд',
  'segment-deliveries': 'Сегментийн түгээлт',
  campaigns: 'Кампанит ажлууд',
  'campaign-detail': 'Кампанит ажил',
  'campaign-copilot': 'AI туслах',
  settings: 'Тохиргоо',
  help: 'Тусламж',
};

export function routeLabel(id: string): string {
  return ROUTE_LABELS[id as AppRouteId] ?? 'Хуудас';
}

/** Shown under the breadcrumb / location strip (per screen, clearer than section-only hints). */
const ROUTE_CONTEXT: Partial<Record<AppRouteId, string>> = {
  overview: 'Ерөнхий урсгал: хүн → түгээлт → компанит ажил → үр дүн.',
  analytics: 'Кампанит ажлуудын KPI, чарт, хяналтын хүснэгт.',
  segments: 'Шүүлтүүр, CSV, query-ээр хэрэглэгчийн бүлэг үүсгэнэ.',
  'segment-deliveries': 'Сегментийн мессежийн ноорог болон захиалсан түгээлтийн жагсаалт.',
  campaigns: 'Үүсгэсэн компанит ажлуудын жагсаалт. Урсгалын бүтээгч рүү орох, засах, шинэ үүсгэх.',
  'campaign-detail': 'Сонгосон компанит ажлын дэлгэрэнгүй ба урсгалын тохиргоо.',
  'campaign-copilot': 'Хиймэл оюун ухааны санал болгож буй компанит ажлууд.',
  settings: 'Системийн тохиргоо удахгүй энд байршина.',
  help: 'Гарын авлага болон дэмжлэг.',
};

export function routeContextLine(id: string): string {
  const direct = ROUTE_CONTEXT[id as AppRouteId];
  if (direct) return direct;
  const section = NAV_SECTIONS.find((s) => s.items.some((i) => i.id === id));
  return section?.hint ?? '';
}
