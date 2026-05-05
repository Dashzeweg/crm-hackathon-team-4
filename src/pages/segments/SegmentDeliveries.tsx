import React, { useMemo, useState } from 'react';
import {
  History,
  Plus,
  MoreVertical,
  Filter,
  Search,
  Calendar,
  MessageSquare,
  Image,
  LayoutGrid,
  Settings,
  GitMerge,
  Clock,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  FlaskConical,
  PenLine,
  Copy,
  Trash2,
  Smartphone,
  Table2,
  Columns2,
  Bell,
  PanelTop,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import type { DeliverySurface, MessageType, SegmentDelivery } from '@/src/data/segmentMocks';
import { MOCK_DELIVERIES, MOCK_SEGMENTS } from '@/src/data/segmentMocks';
import previewBanner from '@/src/assets/banner1.png';
import previewNotif from '@/src/assets/notif1.png';
import previewSms from '@/src/assets/sms2.png';

const SURFACE_PREVIEW_IMG: Record<DeliverySurface, string> = {
  sms: previewSms,
  notification: previewNotif,
  banner: previewBanner,
};

const SURFACE_PREVIEW_ALT: Record<DeliverySurface, string> = {
  sms: 'SMS мессежийн жишээ (TokTok)',
  notification: 'Push мэдэгдлийн жишээ (TokTok)',
  banner: 'Апп доторх баннерын жишээ (TokTok)',
};

type TabKey = 'all' | 'scheduled' | 'draft';
type LayoutVariant = 'default' | 'cards' | 'split';

function StatusBadge({ status }: { status: SegmentDelivery['status'] }) {
  const reserved = status === 'reserved';
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border',
        reserved
          ? 'bg-primary-container/15 text-primary border-primary-container/35'
          : 'bg-surface-container text-outline border-outline-variant/40'
      )}
    >
      <span className={cn('w-2 h-2 rounded-full mr-2', reserved ? 'bg-primary' : 'bg-outline')} />
      {reserved ? 'Захиалсан' : 'Ноорог'}
    </span>
  );
}

function MessageTypeIcon({ type }: { type: MessageType }) {
  const cls = 'w-4 h-4 text-on-surface-variant shrink-0';
  if (type === 'flex') return <LayoutGrid className={cls} />;
  if (type === 'image') return <Image className={cls} />;
  if (type === 'empty') return <Settings className={cls} />;
  return <MessageSquare className={cls} />;
}

function SurfaceBadge({ surface }: { surface: DeliverySurface }) {
  const styles =
    surface === 'sms'
      ? 'border-sky-600/35 bg-sky-500/12 text-sky-950'
      : surface === 'notification'
        ? 'border-violet-600/35 bg-violet-500/12 text-violet-950'
        : 'border-amber-700/40 bg-amber-500/15 text-amber-950';
  const Icon = surface === 'sms' ? Smartphone : surface === 'notification' ? Bell : PanelTop;
  const label = surface === 'sms' ? 'SMS' : surface === 'notification' ? 'Мэдэгдэл' : 'Баннер';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight border',
        styles
      )}
    >
      <Icon className="w-3 h-3 shrink-0" aria-hidden />
      {label}
    </span>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        type="button"
        className="min-w-9 h-9 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black border-b-[3px]"
      >
        <ChevronLeft className="w-4 h-4 mx-auto" />
      </button>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={cn(
            'min-w-9 h-9 rounded-xl text-[10px] font-black transition-all border-2 border-b-[3px]',
            n === 1
              ? 'bg-primary-container text-on-primary-container border-outline-variant shadow-sm'
              : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container-low'
          )}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        className="min-w-9 h-9 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black border-b-[3px]"
      >
        <ChevronRight className="w-4 h-4 mx-auto" />
      </button>
    </div>
  );
}

function DeliveryPreview({ surface }: { surface: DeliverySurface; variant: MessageType }) {
  const bezel =
    'w-[min(240px,85vw)] max-w-[260px] shrink-0 rounded-[2rem] border-4 border-outline-variant bg-on-surface p-2  shadow-inner';
  const inner =
    'rounded-[1.5rem] bg-surface-container-lowest overflow-hidden border border-outline-variant/30 flex items-start justify-center min-h-[280px] max-h-[min(520px,70vh)]';

  return (
    <div className={bezel}>
      <div className={inner}>
        <img
          src={SURFACE_PREVIEW_IMG[surface]}
          alt={SURFACE_PREVIEW_ALT[surface]}
          className="w-full h-auto max-h-[min(500px,68vh)] object-cover object-top select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

function ChartMock() {
  const points = [10, 22, 18, 45, 38, 60, 52, 70, 65, 80, 72, 88];
  const w = 760;
  const h = 180;
  const pad = 24;
  const max = 100;
  const path = points
    .map((p, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2);
      const y = h - pad - (p / max) * (h - pad * 2);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const area = `${path} L${(w - pad).toFixed(1)},${h - pad} L${pad},${h - pad}Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" className="block max-h-48">
      {[0, 25, 50, 75, 100].map((g) => {
        const y = h - pad - (g / max) * (h - pad * 2);
        return (
          <line key={g} x1={pad} x2={w - pad} y1={y} y2={y} stroke="var(--color-outline-variant)" strokeWidth="1" opacity={0.5} />
        );
      })}
      <path d={area} fill="var(--color-primary-container)" opacity={0.2} />
      <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
      {points.map((p, i) => {
        const x = pad + (i / (points.length - 1)) * (w - pad * 2);
        const y = h - pad - (p / max) * (h - pad * 2);
        return <circle key={i} cx={x} cy={y} r="3" fill="var(--color-primary)" />;
      })}
    </svg>
  );
}

function DeliveryDetailModal({
  delivery,
  onClose,
  onOpenReports,
}: {
  delivery: SegmentDelivery | null;
  onClose: () => void;
  onOpenReports: (d: SegmentDelivery) => void;
}) {
  if (!delivery) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[960px] max-h-[92vh] overflow-hidden flex rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 min-w-0 flex flex-col max-h-[92vh]">
          <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-5 border-b border-outline-variant/20 shrink-0">
            <div>
              <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Сегментийн түгээлт</span>
              <h3 className="text-xl font-black text-on-surface tracking-tight">Дэлгэрэнгүй</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenReports(delivery)}
                className="px-3 py-2 rounded-xl border-2 border-outline-variant text-[10px] font-black uppercase flex items-center gap-2"
              >
                <FileBarChart className="w-4 h-4" />
                Тайлан
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-xl border-2 border-outline-variant text-[10px] font-black uppercase flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4" />
                Тест түгээлт
              </button>
              <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container" aria-label="Хаах">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-[minmax(0,140px)_1fr] gap-x-6 gap-y-4 text-sm">
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Төлөв</span>
              <StatusBadge status={delivery.status} />
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Түгээлтийн нэр</span>
              <span className="font-extrabold text-on-surface break-words">{delivery.name}</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Сегмент</span>
              <button type="button" className="text-left font-extrabold text-primary hover:underline">
                {delivery.segment}
              </button>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Урсгал</span>
              <span className="font-extrabold text-on-surface break-words">{delivery.flow ?? '—'}</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Хуваарь</span>
              <span className="font-mono text-xs font-bold text-on-surface-variant">{delivery.schedule}</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Түгээлтийн мессеж 1</span>
              <span className="font-extrabold text-primary break-words">{delivery.message}</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Нэмэлт параметр</span>
              <span className="text-on-surface-variant font-bold italic text-xs">— тохируулаагүй —</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Хүлээгдэж буй тоо</span>
              <span className="font-mono text-xs font-bold">≈ 1,248 хэрэглэгч</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Илгээгч</span>
              <span className="font-bold text-on-surface">TokTok CS Аккаунт</span>
              <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Захиргааны тэмдэглэл</span>
              <span className="text-on-surface-variant font-bold italic text-xs">— хоосон —</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-outline-variant/20 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
            >
              Хаах
            </button>
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-xs flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" />
              Засах
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-[270px] shrink-0 border-l border-outline-variant/20 bg-surface-container-low flex-col">
          <div className="px-4 py-3 border-b border-outline-variant/15 flex flex-col gap-2 text-[10px] font-black uppercase text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 shrink-0" />
              Урьдчилсан харагдац
            </div>
            <SurfaceBadge surface={delivery.surface} />
          </div>
          <div className="flex-1 flex items-center justify-center py-4 px-2 overflow-hidden">
            <DeliveryPreview surface={delivery.surface} variant={delivery.messageType} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ReportsModal({ delivery, onClose }: { delivery: SegmentDelivery | null; onClose: () => void }) {
  const [range, setRange] = useState('Энэ сар');
  const ranges = ['Сүүлийн 7 хоног', 'Сүүлийн 14 хоног', '1 сар', '3 сар', '6 сар', '1 жил', 'Энэ сар', 'Өнгөрсөн сар'];
  if (!delivery) return null;
  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Сегментийн түгээлт</span>
            <h3 className="text-xl font-black text-on-surface">Тайлан</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container" aria-label="Хаах">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <p className="text-xs font-bold text-on-surface-variant mb-1">Түгээлтийн нэр</p>
            <p className="text-lg font-black text-on-surface">{delivery.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-3">Түгээлтийн үр дүн</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Илгээсэн', value: '1,248' },
                { label: 'Нээсэн', value: '1,089' },
                { label: 'Нээсэн %', value: '87.2%' },
                { label: 'Дарсан', value: '412' },
                { label: 'CTR', value: '33.0%' },
                { label: 'CV тоо', value: '38' },
                { label: 'CVR', value: '3.05%' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-outline-variant/25 bg-surface-container-low p-4">
                  <div className="text-[9px] font-black text-outline uppercase mb-1">{s.label}</div>
                  <div className="text-xl font-black text-on-surface">{s.value}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant mt-3 italic">
              * Ижил нэртэй өмнөх түгээлтүүдийн бүх үр дүн өчигдрийн өдөр хүртэл нэгтгэгдсэн.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-2">Аналитик</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {ranges.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-[10px] font-black border-2 transition-all',
                    range === r
                      ? 'border-primary-container bg-primary-container/15 text-primary'
                      : 'border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold">
              <span className="px-3 py-2 rounded-xl border border-outline-variant flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                2026-04-28
              </span>
              <span className="text-on-surface-variant">—</span>
              <span className="px-3 py-2 rounded-xl border border-outline-variant flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                2026-05-04
              </span>
              <button type="button" className="p-2 rounded-xl border border-outline-variant">
                <Search className="w-4 h-4" />
              </button>
              <button type="button" className="px-3 py-2 rounded-xl border border-outline-variant flex items-center gap-2 uppercase text-[10px] font-black">
                Татах
              </button>
            </div>
            <div className="rounded-2xl border border-outline-variant/25 p-4 bg-surface-container-low">
              <ChartMock />
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
          >
            Хаах
          </button>
        </div>
      </motion.div>
    </div>
  );
}

type CreateDeliveryDraft = {
  name: string;
  segment: string;
  flow: string;
  scheduleType: 'now' | 'scheduled';
  scheduledAt: string; // datetime-local
  messageType: MessageType;
  message: string;
};

const FLOW_OPTIONS = [
  'Шинэ хэрэглэгчийн компанит ажил',
  'Унтсан хэрэглэгч сэргээх',
  'Дахин худалдан авалт өдөөх',
  'Одоо байгаа урсгал (custom)',
] as const;

function CreateDeliveryModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (draft: CreateDeliveryDraft) => void;
}) {
  const [draft, setDraft] = useState<CreateDeliveryDraft>(() => ({
    name: '',
    segment: MOCK_SEGMENTS[0]?.name ?? '',
    flow: FLOW_OPTIONS[0],
    scheduleType: 'scheduled',
    scheduledAt: '',
    messageType: 'message',
    message: '',
  }));

  if (!open) return null;

  const canCreate =
    draft.name.trim().length > 0 &&
    draft.segment.trim().length > 0 &&
    draft.flow.trim().length > 0 &&
    (draft.scheduleType === 'now' || draft.scheduledAt.trim().length > 0);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Сегментийн түгээлт</span>
            <h3 className="text-xl font-black text-on-surface">Шинэ үүсгэх</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container" aria-label="Хаах">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">
              Түгээлтийн нэр <span className="text-error">*</span>
            </span>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="Ж: Шинэ хэрэглэгч · 7 хоног"
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                Сегмент <span className="text-error">*</span>
              </span>
              <select
                value={draft.segment}
                onChange={(e) => setDraft((d) => ({ ...d, segment: e.target.value }))}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              >
                {MOCK_SEGMENTS.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                Action flow <span className="text-error">*</span>
              </span>
              <select
                value={draft.flow}
                onChange={(e) => setDraft((d) => ({ ...d, flow: e.target.value }))}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              >
                {FLOW_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">Хуваарь</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  { key: 'scheduled' as const, label: 'Хуваарьт' },
                  { key: 'now' as const, label: 'Одоо' },
                ] as const
              ).map((o) => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, scheduleType: o.key }))}
                  className={cn(
                    'px-4 py-2 rounded-xl text-[10px] font-black uppercase border-2 border-b-[3px]',
                    draft.scheduleType === o.key
                      ? 'bg-primary-container text-on-primary-container border-outline-variant'
                      : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container-low'
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {draft.scheduleType === 'scheduled' && (
              <label className="block mt-3">
                <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                  Огноо, цаг <span className="text-error">*</span>
                </span>
                <input
                  type="datetime-local"
                  value={draft.scheduledAt}
                  onChange={(e) => setDraft((d) => ({ ...d, scheduledAt: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <label className="block sm:col-span-1">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">Мессежийн төрөл</span>
              <select
                value={draft.messageType}
                onChange={(e) => setDraft((d) => ({ ...d, messageType: e.target.value as MessageType }))}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              >
                <option value="message">Text</option>
                <option value="flex">Flex</option>
                <option value="image">Image</option>
                <option value="empty">Empty</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">Мессеж</span>
              <textarea
                value={draft.message}
                onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                placeholder="Товч мессеж эсвэл тэмдэглэл…"
                rows={3}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px] resize-none"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-8 py-5 border-t border-outline-variant/20">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs">
            Болих
          </button>
          <button
            type="button"
            disabled={!canCreate}
            onClick={() => {
              onCreate(draft);
              onClose();
              setDraft((d) => ({ ...d, name: '', message: '', scheduledAt: '' }));
            }}
            className={cn(
              'px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-b-[4px]',
              canCreate
                ? 'bg-primary-container text-on-primary-container border-outline-variant shadow-[4px_4px_0px_#6b4c00]'
                : 'bg-surface-container text-on-surface-variant border-outline-variant/30 opacity-60 cursor-not-allowed'
            )}
          >
            <Plus className="w-4 h-4" />
            Үүсгэх
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function RowActions({ onStop }: { onStop: (e: React.MouseEvent) => void }) {
  return (
    <div className="flex items-center justify-end gap-1" onClick={onStop}>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-outline" aria-label="Засах">
        <PenLine className="w-4 h-4" />
      </button>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-outline" aria-label="Хувилах">
        <Copy className="w-4 h-4" />
      </button>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-error" aria-label="Устгах">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function SegmentDeliveries() {
  const [tab, setTab] = useState<TabKey>('all');
  const [layout, setLayout] = useState<LayoutVariant>('default');
  const [selected, setSelected] = useState<SegmentDelivery | null>(null);
  const [reportsFor, setReportsFor] = useState<SegmentDelivery | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [deliveries, setDeliveries] = useState<SegmentDelivery[]>(() => MOCK_DELIVERIES);

  const filtered = useMemo(() => {
    return deliveries.filter((d) => {
      if (tab === 'scheduled') return d.status === 'reserved';
      if (tab === 'draft') return d.status === 'draft';
      return true;
    });
  }, [deliveries, tab]);

  const counts = useMemo(() => {
    const reserved = deliveries.filter((d) => d.status === 'reserved').length;
    const draft = deliveries.filter((d) => d.status === 'draft').length;
    return { all: deliveries.length, scheduled: reserved, draft };
  }, [deliveries]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pb-12 custom-scrollbar">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-6">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Сегментийн түгээлт</h2>
          <p className="text-sm font-bold text-on-surface-variant/70">
            Хэрэглэгчдийн сегментэд хуваарилсан мессежийн түгээлт
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-[4px]"
          >
            <History className="w-4 h-4" />
            Түгээлтийн түүх
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00] opacity-90 hover:opacity-100"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Шинэ үүсгэх
          </button>
          <button type="button" className="p-2.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest border-b-[4px]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            { key: 'scheduled' as const, label: 'Хуваарьт түгээлт', icon: Calendar, count: counts.scheduled },
            { key: 'draft' as const, label: 'Ноорог', icon: MessageSquare, count: counts.draft },
            { key: 'all' as const, label: 'Бүгд', icon: LayoutGrid, count: counts.all },
          ] as const
        ).map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase border-2 transition-all border-b-[3px]',
              tab === key
                ? 'bg-primary-container text-on-primary-container border-outline-variant shadow-sm'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/25 hover:bg-surface-container-low'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span
              className={cn(
                'ml-1 min-w-[1.5rem] h-6 inline-flex items-center justify-center rounded-full text-[10px] font-black',
                tab === key ? 'bg-on-primary-container/15' : 'bg-surface-container'
              )}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 p-2 rounded-2xl bg-surface-container-low border border-outline-variant/20 border-b-[3px]">
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[10px] font-black uppercase flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Шүүлт
        </button>
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            placeholder="Түгээлтийн нэрээр хайх..."
            className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[10px] font-black uppercase flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Хайх
        </button>
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:ml-auto sm:items-end">
          <span className="text-[10px] font-black text-outline uppercase tracking-wide">
            Харагдах{' '}
            <span className="text-on-surface-variant font-bold opacity-80 normal-case tracking-normal">· 3 төрөл</span>
          </span>
          <div
            role="tablist"
            aria-label="Тарилтын харагдах — гурван төрөл"
            className="flex w-full min-w-0 rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest p-1 gap-0.5 sm:inline-flex sm:w-auto"
          >
            {(
              [
                { key: 'default' as const, label: 'Хүснэгт', Icon: Table2 },
                { key: 'cards' as const, label: 'Карт', Icon: LayoutGrid },
                { key: 'split' as const, label: 'Хуваалт', Icon: Columns2 },
              ] as const
            ).map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={layout === key}
                onClick={() => setLayout(key)}
                className={cn(
                  'flex flex-1 sm:flex-initial items-center justify-center gap-1.5 min-w-0 px-2 sm:px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all',
                  layout === key
                    ? 'bg-primary-container text-on-primary-container shadow-sm border-2 border-outline-variant/20'
                    : 'text-on-surface-variant hover:bg-surface-container-low border-2 border-transparent'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="text-[10px] font-black text-outline uppercase whitespace-nowrap">
          Мөр{' '}
          <select
            defaultValue={25}
            className="ml-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1 font-black text-on-surface text-[10px]"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </span>
      </div>

      {layout === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelected(d)}
              className="text-left rounded-2xl border-2 border-outline-variant/25 bg-surface-container-lowest p-5 hover:border-primary-container/35 transition-all border-b-[4px] shadow-sm"
            >
              <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={d.status} />
                  <SurfaceBadge surface={d.surface} />
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">#{d.id.toString().padStart(4, '0')}</span>
              </div>
              <p className="font-extrabold text-on-surface text-sm mb-3 leading-snug">{d.name}</p>
              <div className="space-y-1.5 text-xs font-bold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <GitMerge className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{d.segment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono truncate">{d.schedule}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 mt-2 border-t border-dashed border-outline-variant/40">
                  <MessageTypeIcon type={d.messageType} />
                  <span className="truncate">{d.message}</span>
                  {d.warn && <AlertTriangle className="w-4 h-4 text-error shrink-0" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : layout === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(
            [
              { key: 'reserved' as const, label: 'Захиалсан' },
              { key: 'draft' as const, label: 'Ноорог' },
            ] as const
          ).map((col) => {
            const rows = filtered.filter((d) => d.status === col.key);
            return (
              <div
                key={col.key}
                className="rounded-2xl border-2 border-outline-variant/25 bg-surface-container-lowest overflow-hidden border-b-[4px]"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/15 bg-surface-container-low">
                  <span className="font-black text-on-surface text-sm">{col.label}</span>
                  <span className="min-w-[1.75rem] h-7 inline-flex items-center justify-center rounded-full bg-surface-container text-[10px] font-black">
                    {rows.length}
                  </span>
                </div>
                <div className="divide-y divide-outline-variant/10 max-h-[520px] overflow-y-auto custom-scrollbar">
                  {rows.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelected(d)}
                      className="w-full text-left px-4 py-3 hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="font-extrabold text-sm text-on-surface truncate">{d.name}</span>
                        <span className="font-mono text-[10px] text-on-surface-variant shrink-0">{d.schedule}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold text-on-surface-variant">
                        <SurfaceBadge surface={d.surface} />
                        <GitMerge className="w-3.5 h-3.5" />
                        <span className="truncate">{d.segment}</span>
                        <span className="text-outline">·</span>
                        <MessageTypeIcon type={d.messageType} />
                        <span className="truncate">{d.message}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-xl border border-outline-variant/30 overflow-hidden border-b-[6px]">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
              <thead>
                <tr className="bg-surface/50 border-b border-outline-variant/20">
                  <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-32">Төлөв</th>
                  <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-[260px]">
                    Түгээлтийн нэр
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-[260px]">
                    Сегмент / Хуваарь
                  </th>
                  <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                    Түгээлтийн мессеж
                  </th>
                  <th className="w-28" />
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-on-surface">
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(d)}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 align-top">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="py-4 px-6 align-top font-extrabold tracking-tight">
                      <div className="break-all leading-snug">{d.name}</div>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <div className="space-y-1 text-xs font-bold text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <GitMerge className="w-3.5 h-3.5 shrink-0 text-on-surface" />
                          <span className="truncate">{d.segment}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono">{d.schedule}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-2 flex-wrap">
                        <MessageTypeIcon type={d.messageType} />
                        <span className="break-all">{d.message}</span>
                        {d.warn && <AlertTriangle className="w-4 h-4 text-error shrink-0" />}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <RowActions onStop={stop} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination />

      <DeliveryDetailModal
        delivery={selected}
        onClose={() => setSelected(null)}
        onOpenReports={(d) => {
          setSelected(null);
          setReportsFor(d);
        }}
      />
      <ReportsModal delivery={reportsFor} onClose={() => setReportsFor(null)} />
      <CreateDeliveryModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(draft) => {
          setDeliveries((prev) => {
            const nextId = prev.reduce((m, d) => Math.max(m, d.id), 0) + 1;
            const schedule =
              draft.scheduleType === 'now'
                ? new Date().toISOString().slice(0, 16).replace('T', ' ')
                : draft.scheduledAt.replace('T', ' ');
            const status = draft.scheduleType === 'scheduled' ? 'reserved' : 'draft';
            const message = draft.messageType === 'empty' ? '—' : (draft.message.trim() || '—');
            return [
              {
                id: nextId,
                status,
                name: draft.name.trim(),
                segment: draft.segment,
                schedule,
                message,
                messageType: draft.messageType,
                flow: draft.flow,
              },
              ...prev,
            ];
          });
        }}
      />
    </div>
  );
}
