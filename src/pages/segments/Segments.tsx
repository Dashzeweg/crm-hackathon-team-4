import React, { useState } from 'react';
import {
  LayoutGrid,
  GitMerge,
  Filter,
  Search,
  Plus,
  MoreVertical,
  GripVertical,
  X,
  Users,
  FileBarChart,
  Check,
  FileCode2,
  PenLine,
  ChevronRight,
  Info,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { MOCK_SEGMENTS, MOCK_FILTER_PALETTE } from '@/src/data/segmentMocks';

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
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
    </div>
  );
}

type CreateMode = 'builder' | 'expr';

function SegmentMethodPickerModal({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (m: 'filter' | 'csv' | 'query') => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20">
          <span className="text-lg font-black text-on-surface tracking-tight">Сегмент үүсгэх арга</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
            aria-label="Хаах"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid gap-3">
          {[
            {
              key: 'filter' as const,
              icon: GitMerge,
              title: 'Шүүлтүүрээр үүсгэх',
              desc: 'Олон шүүлтүүр нэгтгэн нэг сегмент болгож үүсгэх',
            },
            {
              key: 'csv' as const,
              icon: LayoutGrid,
              title: 'CSV хэлбэрээр',
              desc: 'Хэрэглэгчийн UID-уудыг агуулсан CSV файл байршуулж үүсгэх',
            },
            {
              key: 'query' as const,
              icon: FileCode2,
              title: 'Query-ээр үүсгэх',
              desc: 'SQL query шууд бичиж сегмент үүсгэх',
            },
          ].map(({ key, icon: Icon, title, desc }) => (
            <button
              key={key}
              type="button"
              onClick={() => onPick(key)}
              className="text-left rounded-2xl border-2 border-outline-variant/25 bg-surface p-5 hover:border-primary-container/40 hover:bg-primary-container/5 transition-all border-b-[4px]"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-on-surface text-sm mb-1">{title}</div>
                  <div className="text-xs font-bold text-on-surface-variant/70 leading-snug">{desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-outline-variant font-black text-xs text-on-surface hover:bg-surface-container-low transition-all border-b-[3px]"
          >
            Хаах
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SegmentFilterDetailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">Сегмент шүүлтүүр</span>
            <span className="text-xl font-black text-on-surface">Дэлгэрэнгүй</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low"
            >
              <Users className="w-4 h-4" />
              Хэрэглэгчид
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low"
            >
              <FileBarChart className="w-4 h-4" />
              Хэрэглэгчийн тоо
            </button>
            <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container ml-2" aria-label="Хаах">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-8 grid grid-cols-[140px_1fr] gap-x-8 gap-y-5 text-sm">
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Шүүлтүүрийн нэр</span>
          <span className="font-extrabold text-on-surface">Шинэ-Дамба_UID</span>
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Төрөл</span>
          <span className="font-extrabold text-on-surface">Нөхцөл</span>
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Агуулга</span>
          <div className="space-y-3">
            <p className="font-bold text-on-surface">Хэрэглэгчийн үндсэн мэдээлэл</p>
            <p className="text-on-surface-variant text-xs font-bold">Хэрэглэгчийн ID нь 14-тэй тэнцүү</p>
            <p className="text-[10px] font-black text-outline uppercase tracking-wider">Шүүлтүүрийн query</p>
            <pre className="rounded-2xl bg-inverse-surface/5 border border-outline-variant/25 p-4 text-[11px] font-mono text-on-surface overflow-x-auto">
              <span className="text-secondary font-bold">SELECT</span>
              {'\n  '}<span className="text-secondary font-bold">DISTINCT</span> id <span className="text-secondary font-bold">AS</span> line_user_key_id
              {'\n'}
              <span className="text-secondary font-bold">FROM</span>
              {'\n  '}
              <span className="text-primary">&apos;Хэрэглэгчийн_cs_staging.line_users&apos;</span>
              {'\n'}
              <span className="text-secondary font-bold">WHERE</span>
              {'\n  '}id = <span className="text-primary font-bold">14</span>
            </pre>
          </div>
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Үүсгэсэн огноо</span>
          <span className="font-mono text-xs font-bold text-on-surface-variant">2025-10-09</span>
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Захиргааны тэмдэглэл</span>
          <span className="text-on-surface-variant font-bold italic text-xs">— хоосон —</span>
          <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">Энэ шүүлтүүр хэрэглэдэг сегмент</span>
          <button type="button" className="text-left font-extrabold text-primary underline-offset-4 hover:underline">
            Шинэ-Дамба_тэст
          </button>
        </div>
        <div className="px-8 pb-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
          >
            Хаах
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_#6b4c00]"
          >
            <PenLine className="w-4 h-4" />
            Засах
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CreateSegmentOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<CreateMode>('builder');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-background flex flex-col animate-in fade-in duration-200">
      <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-inverse-surface text-inverse-on-surface">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/10"
          aria-label="Буцах"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-black opacity-90">
          <span>Сегмент</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-container">Шинэ үүсгэх</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="hidden sm:flex px-4 py-2 rounded-xl bg-white/10 text-[10px] font-black uppercase items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Хэрэглэгчид
          </button>
          <button
            type="button"
            className="hidden sm:flex px-4 py-2 rounded-xl bg-white/10 text-[10px] font-black uppercase items-center gap-2"
          >
            <FileBarChart className="w-4 h-4" />
            Тоо тооцоолох
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-[10px] font-black uppercase flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Хадгалах
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-72 shrink-0 border-r border-outline-variant bg-surface-container-low flex flex-col p-4 gap-3">
          <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] px-1">Сегмент шүүлтүүр</p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
            <Search className="w-4 h-4 text-on-surface-variant" />
            <input
              placeholder="Шүүлтүүр хайх..."
              className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
            />
            <Filter className="w-4 h-4 text-on-surface-variant" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
            {MOCK_FILTER_PALETTE.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-surface-container-lowest cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4 text-outline shrink-0" />
                <span className="text-xs font-bold text-on-surface truncate">{f}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-3xl space-y-8">
            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                Сегментийн нэр <span className="text-error">*</span>
              </span>
              <input
                placeholder="Сегментийн нэрээ оруулна уу"
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold text-on-surface outline-none focus:border-primary-container border-b-[4px]"
              />
            </label>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
                <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                  Сегментийн нөхцөл <span className="text-error">*</span>
                </span>
                <div className="flex rounded-xl border-2 border-outline-variant/30 p-1 bg-surface-container-low">
                  <button
                    type="button"
                    onClick={() => setMode('builder')}
                    className={cn(
                      'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 transition-all',
                      mode === 'builder' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant'
                    )}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('expr')}
                    className={cn(
                      'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 transition-all',
                      mode === 'expr' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant'
                    )}
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    Илэрхийлэл
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest border-b-[4px] overflow-hidden">
                <div className="flex flex-wrap gap-2 items-center justify-between px-4 py-3 border-b border-outline-variant/15 bg-surface-container-low">
                  <div className="flex rounded-lg border border-outline-variant/25 overflow-hidden text-[10px] font-black">
                    {(['AND', 'OR', 'EXCEPT'] as const).map((op, i) => (
                      <button
                        key={op}
                        type="button"
                        className={cn(
                          'px-3 py-1.5',
                          i === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-transparent text-on-surface-variant'
                        )}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-outline-variant text-[10px] font-black uppercase flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Шүүлт нэмэх
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-outline-variant text-[10px] font-black uppercase flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Групп нэмэх
                    </button>
                  </div>
                </div>
                {mode === 'builder' ? (
                  <div className="min-h-[180px] flex items-center justify-center text-sm font-bold text-on-surface-variant/60 italic px-6 text-center">
                    Зүүн талаас шүүлтүүр чирж эндээ оруулна уу
                  </div>
                ) : (
                  <pre className="p-6 text-[12px] font-mono bg-inverse-surface/5 text-on-surface overflow-x-auto">
                    filters.<span className="text-primary font-bold">include</span>(
                    <span className="text-secondary">&quot;OJIMA_iOS&quot;</span>) <span className="text-error font-bold">AND</span>{' '}
                    filters.<span className="text-primary font-bold">exclude</span>(<span className="text-secondary">&quot;Унтсан_хэрэглэгч&quot;</span>)
                  </pre>
                )}
              </div>
            </div>

            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider inline-flex items-center gap-2">
                Авах дээд хязгаар <Info className="w-3.5 h-3.5" />
              </span>
              <input
                placeholder="Тоог оруулах..."
                className="mt-2 w-full max-w-xs rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold border-b-[4px] outline-none focus:border-primary-container"
              />
            </label>

            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">Захиргааны тэмдэглэл</span>
              <textarea
                placeholder="Тэмдэглэл оруулах..."
                rows={4}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold border-b-[4px] outline-none focus:border-primary-container resize-none"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Segments() {
  const [methodOpen, setMethodOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pb-12 custom-scrollbar">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Сегмент</h2>
          <p className="text-sm font-bold text-on-surface-variant/70 max-w-xl">
            Хэрэглэгчдийг шүүж бүлэглэн тарилт хийх сегментүүд
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-[4px] hover:bg-surface-container-high"
          >
            <LayoutGrid className="w-4 h-4" />
            Загвар
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-[4px] hover:bg-surface-container-high"
          >
            <GitMerge className="w-4 h-4" />
            Шүүлтүүр Удирдлага
          </button>
          <button
            type="button"
            onClick={() => setMethodOpen(true)}
            className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]"
          >
            <Plus className="w-4 h-4" />
            Шинэ үүсгэх
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 p-2 rounded-2xl bg-surface-container-low border border-outline-variant/20 border-b-[3px]">
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[10px] font-black uppercase flex items-center gap-2 shadow-sm"
        >
          <Filter className="w-4 h-4" />
          Шүүлт
        </button>
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            placeholder="Сегментийн нэрээр хайх..."
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
        <span className="text-[10px] font-black text-outline uppercase whitespace-nowrap ml-auto pr-2">
          Мөр{' '}
          <select defaultValue={25} className="ml-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1 font-black text-on-surface text-[10px]">
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-[2rem] shadow-xl border border-outline-variant/30 overflow-hidden border-b-[6px]">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-surface/50 border-b border-outline-variant/20">
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em]">Сегментийн нэр</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-40">Төрөл</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-44">Шинэчилсэн</th>
                <th className="w-16" />
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-on-surface">
              {MOCK_SEGMENTS.map((row) => (
                <tr
                  key={row.name}
                  onClick={() => setFilterOpen(true)}
                  className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer h-[64px]"
                >
                  <td className="py-4 px-8 font-extrabold tracking-tight">{row.name}</td>
                  <td className="py-4 px-8">
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase border border-outline-variant/30 bg-surface-container">
                      {row.type}
                    </span>
                  </td>
                  <td className="py-4 px-8 font-mono text-xs text-on-surface-variant">{row.updated}</td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-surface-container text-outline"
                      aria-label="Цэс"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination />

      <SegmentMethodPickerModal
        open={methodOpen}
        onClose={() => setMethodOpen(false)}
        onPick={(m) => {
          setMethodOpen(false);
          if (m === 'filter') setCreateOpen(true);
        }}
      />
      <SegmentFilterDetailModal open={filterOpen} onClose={() => setFilterOpen(false)} />
      <CreateSegmentOverlay open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
