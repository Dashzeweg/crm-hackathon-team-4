import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import type { CampaignSummary } from '@/src/data/campaignMocks';
import { ArrowLeft, PenLine, Workflow, Play, Pause, Archive, Calendar, Users, Target } from 'lucide-react';
import JourneyBuilder from '@/src/pages/campaigns/JourneyBuilder';

type TabKey = 'overview' | 'flow';

function StatusPill({ status }: { status: CampaignSummary['status'] }) {
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

export default function CampaignDetail({
  campaign,
  onBack,
  onEditMeta,
  initialTab = 'overview',
}: {
  campaign: CampaignSummary;
  onBack: () => void;
  onEditMeta: () => void;
  initialTab?: TabKey;
}) {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const flowRef = useRef<HTMLDivElement | null>(null);

  const statusIcon = useMemo(() => {
    if (campaign.status === 'active') return <Play className="w-4 h-4" />;
    if (campaign.status === 'paused') return <Pause className="w-4 h-4" />;
    if (campaign.status === 'archived') return <Archive className="w-4 h-4" />;
    return <PenLine className="w-4 h-4" />;
  }, [campaign.status]);

  const scrollTo = (key: TabKey) => {
    const el = key === 'flow' ? flowRef.current : overviewRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (initialTab === 'flow') {
      // Delay one tick so JourneyBuilder/layout can mount first
      const t = window.setTimeout(() => scrollTo('flow'), 0);
      return () => window.clearTimeout(t);
    }
  }, [initialTab]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-hidden">
      <div className="shrink-0 flex flex-wrap items-end justify-between gap-6 mb-6">
        <div className="min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-black text-[10px] uppercase hover:bg-surface-container-low transition-all mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Кампанит ажлууд
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={campaign.status} />
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">#{campaign.id}</span>
          </div>
          <div className="mt-2 mb-2 flex items-baseline gap-3 min-w-0 overflow-hidden flex-nowrap">
            <h2 className="text-4xl font-black text-on-surface tracking-tighter truncate min-w-0 flex-[0_1_auto]">
              {campaign.name}
            </h2>
            <span className="text-on-surface-variant/40 font-black select-none shrink-0">—</span>
            <p className="text-sm font-bold text-on-surface-variant/75 truncate min-w-0 flex-1">
              {campaign.objective}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollTo('flow')}
            className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]"
          >
            <Workflow className="w-4 h-4" />
            Flow maker
          </button>
          <button
            type="button"
            onClick={onEditMeta}
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-4 hover:bg-surface-container-high"
          >
            <PenLine className="w-4 h-4" />
            Тохиргоо засах
          </button>
        </div>
      </div>

      <div ref={scrollRootRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-12 custom-scrollbar">
        <div ref={overviewRef} className="scroll-mt-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-surface-container-lowest border border-outline-variant/25 flex items-center justify-center text-outline">
                {statusIcon}
              </div>
              <div className="text-sm font-black text-on-surface">Дэлгэрэнгүй</div>
            </div>
            <button
              type="button"
              onClick={() => scrollTo('flow')}
              className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black text-[10px] uppercase flex items-center gap-2 hover:bg-surface-container-low transition-all"
            >
              <Workflow className="w-4 h-4" />
              Урсгал руу
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { label: 'Сегмент', value: campaign.segment, icon: <Users className="w-5 h-5" /> },
              { label: 'Шинэчилсэн', value: campaign.updatedAt, icon: <Calendar className="w-5 h-5" /> },
              { label: 'Алхам', value: String(campaign.steps), icon: <Target className="w-5 h-5" /> },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-outline-variant/25 bg-surface-container-lowest p-5 border-b-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">{card.label}</div>
                    <div className="text-sm font-black text-on-surface truncate">{card.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-outline-variant/25 bg-surface-container-lowest overflow-hidden border-b-[6px]">
            <div className="px-6 py-5 border-b border-outline-variant/15 bg-surface-container-low flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-surface-container text-outline flex items-center justify-center">{statusIcon}</div>
              <div className="min-w-0">
                <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Зорилго</div>
                <div className="text-lg font-black text-on-surface truncate">{campaign.objective}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10" />

        <div ref={flowRef} className="scroll-mt-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container">
                <Workflow className="w-4 h-4" />
              </div>
              <div className="text-sm font-black text-on-surface">Урсгал (Flow)</div>
            </div>
            <button
              type="button"
              onClick={() => scrollTo('overview')}
              className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black text-[10px] uppercase flex items-center gap-2 hover:bg-surface-container-low transition-all"
            >
              Дэлгэрэнгүй рүү
            </button>
          </div>

          <div className="rounded-3xl border border-outline-variant/25 bg-surface-container-lowest overflow-hidden border-b-[6px] h-[78vh] min-h-[640px] w-full max-w-full min-w-0">
            <JourneyBuilder campaignName={campaign.name} onBack={() => scrollTo('overview')} variant="embedded" />
          </div>
        </div>
      </div>
    </div>
  );
}

