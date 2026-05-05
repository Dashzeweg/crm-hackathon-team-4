import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Plus, Search, Filter, MoreVertical, PenLine, Trash2, Copy, Workflow, ArrowRight, X, Check, Pause, Play, FileText, GitBranch } from 'lucide-react';
import type { CampaignStatus, CampaignSummary } from '@/src/data/campaignMocks';
import { MOCK_SEGMENTS } from '@/src/data/segmentMocks';

type Draft = {
  name: string;
  status: CampaignStatus;
  segment: string;
  objective: string;
};

function StatusBadge({ status }: { status: CampaignStatus }) {
  const cfg =
    status === 'active'
      ? { label: 'Идэвхтэй', cls: 'bg-primary-container/15 text-primary border-primary-container/35' }
      : status === 'paused'
        ? { label: 'Түр зогссон', cls: 'bg-surface-container text-on-surface-variant border-outline-variant/40' }
        : status === 'archived'
          ? { label: 'Архив', cls: 'bg-surface-container text-outline border-outline-variant/35' }
          : { label: 'Ноорог', cls: 'bg-secondary-container/20 text-secondary border-secondary/35' };
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border', cfg.cls)}>
      <span className={cn('w-2 h-2 rounded-full mr-2', status === 'active' ? 'bg-primary' : status === 'draft' ? 'bg-secondary' : 'bg-outline')} />
      {cfg.label}
    </span>
  );
}

function CreateEditCampaignModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  initial: Draft;
  onClose: () => void;
  onSubmit: (draft: Draft) => void;
}) {
  const [draft, setDraft] = useState<Draft>(initial);

  React.useEffect(() => {
    if (!open) return;
    setDraft(initial);
  }, [open, initial]);

  if (!open) return null;

  const canSave = draft.name.trim().length > 2 && draft.segment.trim().length > 0 && draft.objective.trim().length > 3;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">Кампанит ажил</span>
            <span className="text-xl font-black text-on-surface">{mode === 'create' ? 'Шинэ үүсгэх' : 'Засах'}</span>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container" aria-label="Хаах">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">
              Нэр <span className="text-error">*</span>
            </span>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="Ж: Шинэ хэрэглэгчийн компанит ажил"
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
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
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
              >
                {MOCK_SEGMENTS.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">Төлөв</span>
              <select
                value={draft.status}
                onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as CampaignStatus }))}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
              >
                <option value="draft">Ноорог</option>
                <option value="active">Идэвхтэй</option>
                <option value="paused">Түр зогссон</option>
                <option value="archived">Архив</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">
              Зорилго <span className="text-error">*</span>
            </span>
            <textarea
              value={draft.objective}
              onChange={(e) => setDraft((d) => ({ ...d, objective: e.target.value }))}
              placeholder="Ж: Анхны 7 хоногийн идэвхийг өсгөх"
              rows={3}
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4 resize-none"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 px-8 py-5 border-t border-outline-variant/20">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs">
            Болих
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!canSave) return;
              onSubmit({
                name: draft.name.trim(),
                status: draft.status,
                segment: draft.segment,
                objective: draft.objective.trim(),
              });
              onClose();
            }}
            className={cn(
              'px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-b-4',
              canSave
                ? 'bg-primary-container text-on-primary-container border-outline-variant shadow-[4px_4px_0px_#6b4c00]'
                : 'bg-surface-container text-on-surface-variant border-outline-variant/30 opacity-60 cursor-not-allowed'
            )}
          >
            <Check className="w-4 h-4" />
            Хадгалах
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function RowActions({
  onStop,
  onEdit,
  onDuplicate,
  onDelete,
  onOpenBuilder,
}: {
  onStop: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onOpenBuilder: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1" onClick={onStop}>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-outline" aria-label="Flow maker" onClick={onOpenBuilder}>
        <Workflow className="w-4 h-4" />
      </button>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-outline" aria-label="Засах" onClick={onEdit}>
        <PenLine className="w-4 h-4" />
      </button>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-outline" aria-label="Хувилах" onClick={onDuplicate}>
        <Copy className="w-4 h-4" />
      </button>
      <button type="button" className="p-2 rounded-lg hover:bg-surface-container text-error" aria-label="Устгах" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function CreateCampaignMethodPickerModal({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (m: 'text' | 'flow') => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20">
          <span className="text-lg font-black text-on-surface tracking-tight">Кампанит ажил үүсгэх арга</span>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant" aria-label="Хаах">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid gap-3">
          {[
            {
              key: 'text' as const,
              icon: FileText,
              title: 'Text / Filter-ээр эхлүүлэх',
              desc: 'Нэр, сегмент, зорилгоо түрүүлж тохируулж үүсгэнэ.',
            },
            {
              key: 'flow' as const,
              icon: GitBranch,
              title: 'Flowchart-оор эхлүүлэх',
              desc: 'Шууд Flow maker руу орж урсгалаа зураад дараа нь мэдээллээ бөглөнө.',
            },
          ].map(({ key, icon: Icon, title, desc }) => (
            <button
              key={key}
              type="button"
              onClick={() => onPick(key)}
              className="text-left rounded-2xl border-2 border-outline-variant/25 bg-surface p-5 hover:border-primary-container/40 hover:bg-primary-container/5 transition-all border-b-4"
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

export default function Campaigns({
  campaigns,
  setCampaigns,
  onOpenCampaign,
  onOpenCampaignFlow,
}: {
  campaigns: CampaignSummary[];
  setCampaigns: React.Dispatch<React.SetStateAction<CampaignSummary[]>>;
  onOpenCampaign: (campaignId: string) => void;
  onOpenCampaignFlow: (campaignId: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);
  const [editFor, setEditFor] = useState<CampaignSummary | null>(null);
  const rows = campaigns;
  const setRows = setCampaigns;

  const statusCounts = useMemo(
    () => ({
      draft: rows.filter((r) => r.status === 'draft').length,
      active: rows.filter((r) => r.status === 'active').length,
      paused: rows.filter((r) => r.status === 'paused').length,
    }),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => (r.name + ' ' + r.segment + ' ' + r.objective).toLowerCase().includes(q));
  }, [query, rows]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const nextId = () => `cmp_${(Math.random() * 1e9).toFixed(0)}`;
  const today = () => new Date().toISOString().slice(0, 10);

  const defaultDraft: Draft = {
    name: '',
    status: 'draft',
    segment: MOCK_SEGMENTS[0]?.name ?? '',
    objective: '',
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pb-12 custom-scrollbar">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Кампанит ажил</h2>
          <p className="text-sm font-bold text-on-surface-variant/70 max-w-xl">
            Үүсгэсэн компанит ажлуудаа жагсааж, Flow maker (урсгал) руу орж засварлана.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-4 hover:bg-surface-container-high"
          >
            <Filter className="w-4 h-4" />
            Шүүлтүүр
          </button>
          <button
            type="button"
            onClick={() => setMethodOpen(true)}
            className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]"
          >
            <Plus className="w-4 h-4" />
            Шинэ үүсгэх
          </button>
          <button type="button" className="p-2.5 rounded-xl border-2 border-outline-variant bg-surface-container-lowest border-b-4">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 p-2 rounded-2xl bg-surface-container-low border border-outline-variant/20 border-b-[3px]">
        <div className="flex-1 min-w-[220px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Нэр, сегмент, зорилгоор хайх..."
            className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
        <span className="text-[10px] font-black text-outline uppercase whitespace-nowrap ml-auto pr-2">
          Нийт <span className="font-mono font-black text-on-surface">{filtered.length}</span>
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-4xl shadow-xl border border-outline-variant/30 overflow-hidden border-b-[6px]">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-outline-variant/20 bg-surface/40">
          {[
            { label: 'Ноорог', icon: FileMini('draft'), value: statusCounts.draft },
            { label: 'Идэвхтэй', icon: FileMini('active'), value: statusCounts.active },
            { label: 'Түр зогссон', icon: FileMini('paused'), value: statusCounts.paused },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-3 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest px-4 py-3 border-b-4"
            >
              <div className="w-9 h-9 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                {kpi.icon}
              </div>
              <div className="min-w-[110px]">
                <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">{kpi.label}</div>
                <div className="text-2xl font-black text-on-surface">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[980px] table-fixed">
            <thead>
              <tr className="bg-surface/50 border-b border-outline-variant/20">
                <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-36">Төлөв</th>
                <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-[320px]">Кампанит ажлын нэр</th>
                <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-[260px]">Сегмент</th>
                <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em]">Зорилго</th>
                <th className="py-5 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-40">Шинэчилсэн</th>
                <th className="w-32" />
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-on-surface">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => onOpenCampaign(r.id)}
                  className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 align-top">
                    <div className="space-y-2">
                      <StatusBadge status={r.status} />
                      <div className="text-[10px] font-black text-on-surface-variant/70 uppercase tracking-wider">
                        Алхам: <span className="font-mono text-on-surface">{r.steps}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top font-extrabold tracking-tight overflow-hidden">
                    <div className="break-all leading-snug">{r.name}</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-wide">
                      Flow maker руу орох <ArrowRight className="w-4 h-4" />
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top overflow-hidden">
                    <span className="inline-flex max-w-full px-3 py-1 rounded-full text-[10px] font-black uppercase border border-outline-variant/30 bg-surface-container truncate">
                      {r.segment}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-top overflow-hidden">
                    <span className="block break-all text-xs font-bold text-on-surface-variant/80 leading-relaxed">
                      {r.objective}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-top font-mono text-xs text-on-surface-variant">{r.updatedAt}</td>
                  <td className="py-4 px-4 align-top">
                    <RowActions
                      onStop={stop}
                      onOpenBuilder={() => onOpenCampaign(r.id)}
                      onEdit={() => setEditFor(r)}
                      onDuplicate={() => {
                        setRows((prev) => [
                          {
                            ...r,
                            id: nextId(),
                            name: `${r.name} (хуулбар)`,
                            status: 'draft',
                            updatedAt: today(),
                          },
                          ...prev,
                        ]);
                      }}
                      onDelete={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-sm font-bold text-on-surface-variant">
                    Кампанит ажил олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateEditCampaignModal
        open={createOpen}
        mode="create"
        initial={defaultDraft}
        onClose={() => setCreateOpen(false)}
        onSubmit={(draft) => {
          const row: CampaignSummary = {
            id: nextId(),
            name: draft.name,
            status: draft.status,
            segment: draft.segment,
            objective: draft.objective,
            updatedAt: today(),
            owner: 'Munkhuush',
            steps: 3,
          };
          setRows((prev) => [row, ...prev]);
        }}
      />

      <CreateEditCampaignModal
        open={!!editFor}
        mode="edit"
        initial={{
          name: editFor?.name ?? '',
          status: editFor?.status ?? 'draft',
          segment: editFor?.segment ?? (MOCK_SEGMENTS[0]?.name ?? ''),
          objective: editFor?.objective ?? '',
        }}
        onClose={() => setEditFor(null)}
        onSubmit={(draft) => {
          if (!editFor) return;
          setRows((prev) => prev.map((r) => (r.id === editFor.id ? { ...r, ...draft, updatedAt: today() } : r)));
        }}
      />

      <CreateCampaignMethodPickerModal
        open={methodOpen}
        onClose={() => setMethodOpen(false)}
        onPick={(m) => {
          setMethodOpen(false);
          if (m === 'text') {
            setCreateOpen(true);
            return;
          }
          // flow
          const id = nextId();
          const row: CampaignSummary = {
            id,
            name: 'Шинэ компанит ажил (ноорог)',
            status: 'draft',
            segment: defaultDraft.segment,
            objective: '— зорилго бөглөнө —',
            updatedAt: today(),
            owner: 'Munkhuush',
            steps: 1,
          };
          setRows((prev) => [row, ...prev]);
          onOpenCampaignFlow(id);
        }}
      />
    </div>
  );
}

function FileMini(kind: 'draft' | 'active' | 'paused') {
  if (kind === 'active') return <Play className="w-5 h-5" />;
  if (kind === 'paused') return <Pause className="w-5 h-5" />;
  return <PenLine className="w-5 h-5" />;
}

