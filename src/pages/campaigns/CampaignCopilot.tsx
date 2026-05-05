import React, { useMemo, useState, useEffect, useRef, FormEvent } from 'react';
import {
  Utensils,
  Lightbulb,
  TrendingDown,
  MoreVertical,
  Group,
  ArrowRight,
  AlertTriangle,
  X,
  BellRing,
  MessageCircle,
  Mail,
  Rocket,
  Sparkles,
  Send,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { formatMnt } from '@/src/lib/formatMnt';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_SEGMENTS } from '@/src/data/segmentMocks';

const DEFAULT_VOUCHER_BUDGET_MNT = 1_800_000;
const ESTIMATED_SEND_COST_MNT = 1_190_000;

// ── Chat types ──────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'user',
    content: 'Одоогийн өгөгдөлд үндэслэн ямар кампанит ажил явуулах хэрэгтэй вэ?',
  },
  {
    role: 'assistant',
    content:
      'Сүүлийн 30 хоногийн хэрэглэгчдийн зан төлвийн өгөгдлийг шинжилсэний үндсэн дээр дараах 2 яаралтай кампанит ажлыг санал болгож байна:\n\n**1. Оройн хоолны түлхэх мэдэгдэл** — 4,200 үнэнч хэрэглэгч зорилго болгож, 16:30 цагт илгээхэд хамгийн тохиромжтой. Оройн хоол захиалга 45%-иар буурдаг бөгөөд хүлээгдэж буй хөрвүүлэлт **+12%**.\n\n**2. Дахин татах ваучер кампанит ажил** — 1,850 хэрэглэгч сүүлийн 3+ хоногт орхисон байна. 15%-ийн хөнгөлөлтийн ваучер илгээхэд түүхэн дахин татах түвшин **28%** байдаг.',
  },
];

const RESPONSE_MAP: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ['ваучер', 'хөнгөлөлт', 'хэмжээ', 'хувь'],
    response:
      'Өгөгдөлд үндэслэн **15-20%-ийн хөнгөлөлтийн ваучер** хамгийн өндөр ROI өгч байна.\n\n- 10%-иас доош → хэрэглэгчдийн сонирхлыг татахгүй (хөрвүүлэлт +3%)\n- **15-20%** → хамгийн оновчтой, дахин татах түвшин ~28%\n- 25%+ → захиалга нэмэгдэнэ ч ашгийн маржин 8% буурна\n\n**18% хөнгөлөлт** санал болгож байна.',
  },
  {
    keywords: ['цаг', 'хэзээ', 'илгээх', 'хугацаа', 'timing'],
    response:
      'Хэрэглэгчдийн зан төлвийг шинжилж үзэхэд хамгийн өндөр нээлтийн цагууд:\n\n- 07:30–09:00 (өглөөний захиалга)\n- **16:30–17:30** (оройн хоол — нээлтийн түвшин дунджаас +34%)\n- 19:00–20:00 (оройн ерөнхий идэвхжил)\n\nОройн хоолны кампанит ажлын хувьд **16:30 цаг** хамгийн тохиромжтой.',
  },
  {
    keywords: ['сегмент', 'хэрэглэгч', 'хэн', 'бүлэг'],
    response:
      'Өгөгдлийн дагуу **3 тэргүүлэх сегмент**:\n\n1. **Өдрийн хоолны үнэнч хэрэглэгчид** (4,200 хүн) — CLV дундаж ₮128,000/сар, нэмэлт боломж: оройн хоол\n2. **3+ хоног орхисон хэрэглэгчид** (1,850 хүн) — яаралтай анхаарал, ваучераар 28% сэргээлт\n3. **Шинэ хэрэглэгчид** (2,100 хүн) — анхны захиалга хийлгэх онбординг кампанит ажил шаардлагатай',
  },
  {
    keywords: ['roi', 'ашиг', 'орлого', 'үр дүн', 'хэмжилт'],
    response:
      'Санал болгосон 2 кампанит ажлын хүлээгдэж буй үр дүн:\n\n| Кампанит ажил | Хамрах хүрээ | Хөрвүүлэлт | Нэмэлт орлого |\n|---|---|---|---|\n| Оройн Push | 4,200 | +12% | ~₮2.4M |\n| Дахин татах ваучер | 1,850 | 28% | ~₮1.8M |\n\nНийт таамаглал: **₮4.2M** нэмэлт орлого, ваучерын зардал ₮1.19M-ийг хасахад ROI **~253%**.',
  },
];

function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  for (const { keywords, response } of RESPONSE_MAP) {
    if (keywords.some((kw) => q.includes(kw))) return response;
  }
  return `Таны кампанит ажлын нийт хамрах хүрээ **6,050 хэрэглэгч** бөгөөд хүлээгдэж буй ROI **340%** байна. Ваучерын зардлыг оновчтой тохируулбал **420%** хүртэл нэмэгдүүлэх боломжтой.\n\nИлүү нарийвчилсан шинжилгээ хийхийн тулд ваучерын хэмжээ, илгээх цаг, эсвэл тодорхой сегментийн талаар асуугаарай.`;
}

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

// ── Component ────────────────────────────────────────────────────────────────

type CopilotDraft = {
  name: string;
  segment: string;
  objective: string;
};

export default function CampaignCopilot({
  onCreateDraft,
}: {
  onCreateDraft?: (draft: CopilotDraft, opts?: { openFlow?: boolean }) => void;
}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [streamingFull, setStreamingFull] = useState('');
  const [streamedCount, setStreamedCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<'dinner-push' | 'winback-voucher'>(
    'dinner-push'
  );
  const [draft, setDraft] = useState<CopilotDraft>({
    name: 'Оройн хоолны түлхэх мэдэгдэл',
    segment: 'Найзаар_бүртгүүлсэн_180_хоногийн_дотор',
    objective: 'Оройн хоолны хөрвүүлэлтийг нэмэгдүүлэх',
  });

  const isStreaming = streamedCount < streamingFull.length;

  const suggestions = useMemo(
    () =>
      [
        {
          id: 'dinner-push' as const,
          badge: 'САНАЛ БОЛГОЖ БУЙ',
          title: 'Өдрийн хоолонд үнэнч хэрэглэгчдэд оройн түлхэх мэдэгдэл',
          segment: 'Найзаар_бүртгүүлсэн_180_хоногийн_дотор',
          objective: 'Оройн хоолны хөрвүүлэлтийг нэмэгдүүлэх',
          reachLabel: 'Тооцоолсон хүртээмж: 4,200',
          icon: Utensils,
          accent: 'from-primary-container to-secondary',
          insightIcon: Lightbulb,
          insightTone: 'bg-surface-container-low border-outline-variant/20 shadow-inner',
          insightLabelCls: 'text-on-background border-primary-container/40',
          insight:
            'Энэ сегмент нь өдрийн цагаар хамгийн сайн ажилладаг боловч оройн хоолны захиалга 45%-иар буурдаг. 16:30 цагт чиглэсэн түлхэлт нь оройн хөрвүүлэлтийг ойролцоогоор 12%-иар нэмэгдүүлэх боломжтой.',
        },
        {
          id: 'winback-voucher' as const,
          badge: 'ӨНДӨР АЧ ХОЛБОГДОЛТОЙ',
          title: '3+ хоног орхисон хэрэглэгчдийг дахин татах ваучер',
          segment: 'Унтсан_хэрэглэгч',
          objective: 'Дахин худалдан авалт өдөөх',
          reachLabel: 'Тооцоолсон хүртээмж: 1,850',
          icon: AlertTriangle,
          accent: 'from-tertiary-container to-error',
          insightIcon: TrendingDown,
          insightTone: 'bg-error/5 border-error/10',
          insightLabelCls: 'text-error border-error/20',
          insight:
            'Гарах магадлал өндөр байна. Одоо мессежээр 15%-ийн хөнгөлөлтийн ваучер илгээх нь энэ бүлгийн хувьд түүхэн сэргээх түвшин 28% байдаг.',
        },
      ] as const,
    []
  );

  const canCreateDraft = draft.name.trim().length > 2 && draft.segment.trim().length > 0 && draft.objective.trim().length > 3;

  // Character-by-character streaming effect
  useEffect(() => {
    if (!streamingFull || !isStreaming) return;
    const t = setTimeout(() => setStreamedCount((c) => c + 1), 14);
    return () => clearTimeout(t);
  }, [streamedCount, streamingFull, isStreaming]);

  // Commit streamed message to history when done
  useEffect(() => {
    if (streamingFull && !isStreaming) {
      setMessages((prev) => [...prev, { role: 'assistant', content: streamingFull }]);
      setStreamingFull('');
      setStreamedCount(0);
    }
  }, [isStreaming, streamingFull]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, streamedCount]);

  const handleSend = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isThinking || isStreaming) return;
    const q = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');
    setIsThinking(true);

    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setIsThinking(false);
      setStreamingFull(getAIResponse(q));
      setStreamedCount(0);
    }, delay);
  };

  const openDrawerFor = (id: 'dinner-push' | 'winback-voucher') => {
    const s = suggestions.find((x) => x.id === id);
    if (!s) return;
    setSelectedSuggestionId(id);
    setDraft({
      name: s.title,
      segment: s.segment,
      objective: s.objective,
    });
    setDrawerOpen(true);
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden animate-in slide-in-from-right duration-500">
      {/* Main */}
      <div className="flex-1 min-w-0 overflow-y-auto pr-0 custom-scrollbar">
        <header className="mb-6 sticky top-0 bg-background/80 backdrop-blur-sm pt-2 pb-4 z-10 border-b border-outline-variant/30">
          <div className="px-6">
            <h1 className="text-3xl font-black text-on-background tracking-tighter mb-1">AI туслах</h1>
            <p className="text-sm font-bold text-on-surface-variant/70">
              Өгөгдөлд суурилсан санал болгосон кампанит ажлууд болон асуулт-хариулт.
            </p>
          </div>
        </header>

        <div className="px-6 grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
          {suggestions.map((s) => {
            const Icon = s.icon;
            const InsightIcon = s.insightIcon;
            return (
              <motion.div
                key={s.id}
                whileHover={{ y: -6 }}
                className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-outline-variant/30 flex flex-col h-full relative overflow-hidden group border-b-[6px]"
              >
                <div className={cn('absolute top-0 left-0 w-full h-2 bg-linear-to-r', s.accent)} />

                <div className="flex justify-between items-start mb-5 gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container shadow-inner shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block mb-1">
                        {s.badge}
                      </span>
                      <h2 className="text-lg font-black text-on-background leading-snug tracking-tight">
                        {s.title}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase border border-outline-variant/30 bg-surface-container truncate max-w-full">
                          {s.segment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <MoreVertical className="w-5 h-5 text-outline cursor-pointer hover:text-primary-container transition-colors shrink-0" />
                </div>

                <div className="mb-6 flex-1">
                  <div className={cn('p-5 rounded-2xl flex items-start gap-4 border', s.insightTone)}>
                    <InsightIcon className="w-7 h-7 text-primary-container shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-on-surface-variant leading-relaxed">
                        <strong className={cn('border-b-2', s.insightLabelCls)}>Тайлбар:</strong>{' '}
                        {s.insight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-dashed border-outline-variant/40">
                  <div className="flex items-center gap-2 text-on-surface-variant/60">
                    <Group className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">{s.reachLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openDrawerFor(s.id)}
                    className="text-xs font-black text-primary-container hover:text-primary transition-all flex items-center gap-2 group/btn"
                  >
                    Ноорог үүсгэх
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chat */}
        <div className="mx-6 bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/30 overflow-hidden mb-10 border-b-[6px]">
          {/* Chat header */}
          <div className="p-5 border-b border-outline-variant/20 bg-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary-container to-secondary flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-lg font-black text-on-background tracking-tight">AI Зөвлөгчтэй ярилцах</h3>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Мэдээлэлд суурилсан хариулт</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Gemini Flash</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-surface-container-low/30">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
              >
                {/* Avatar */}
                <div className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                  msg.role === 'assistant'
                    ? 'bg-linear-to-br from-primary-container to-secondary'
                    : 'bg-surface-container border-2 border-outline-variant/40'
                )}>
                  {msg.role === 'assistant'
                    ? <Sparkles className="w-4 h-4 text-on-primary-container" />
                    : <span className="text-[10px] font-black text-on-surface-variant">Та</span>
                  }
                </div>

                {/* Bubble */}
                <div className={cn(
                  'max-w-[80%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed border',
                  msg.role === 'assistant'
                    ? 'bg-surface-container-lowest border-outline-variant/30 text-on-surface rounded-tl-sm shadow-sm'
                    : 'bg-primary-container/10 border-primary-container/20 text-on-background rounded-tr-sm'
                )}>
                  {renderMarkdown(msg.content)}
                </div>
              </motion.div>
            ))}

            {/* Streaming message */}
            <AnimatePresence>
              {isStreaming && (
                <motion.div
                  key="streaming"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-linear-to-br from-primary-container to-secondary">
                    <Sparkles className="w-4 h-4 text-on-primary-container" />
                  </div>
                  <div className="max-w-[80%] px-5 py-3.5 rounded-2xl rounded-tl-sm text-sm font-medium leading-relaxed bg-surface-container-lowest border border-outline-variant/30 text-on-surface shadow-sm">
                    {renderMarkdown(streamingFull.slice(0, streamedCount))}
                    <span className="inline-block w-0.5 h-4 bg-primary-container ml-0.5 animate-pulse align-middle" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thinking indicator */}
            <AnimatePresence>
              {isThinking && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-linear-to-br from-primary-container to-secondary">
                    <Sparkles className="w-4 h-4 text-on-primary-container" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary-container/60"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Suggested prompts */}
          {!isThinking && !isStreaming && (
            <div className="px-5 py-3 flex gap-2 overflow-x-auto border-t border-outline-variant/20 bg-surface custom-scrollbar">
              {[
                'Ваучерын хэмжээ хэд байвал зүгээр вэ?',
                'Хамгийн сайн илгээх цаг хэзээ вэ?',
                'Аль сегментэд анхаарах хэрэгтэй вэ?',
                'ROI хэр байна?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 text-[11px] font-black text-primary-container bg-primary-container/8 border border-primary-container/20 px-3 py-1.5 rounded-full hover:bg-primary-container/15 transition-colors whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-outline-variant/20 bg-surface flex gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isThinking || isStreaming}
              placeholder="Кампанит ажлын талаар асуугаарай..."
              className="flex-1 bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl px-5 py-3 text-sm font-medium text-on-background placeholder:text-on-surface-variant/40 focus:border-primary-container outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking || isStreaming}
              className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md hover:bg-primary-container/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Draft drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-120"
            aria-hidden
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
            <motion.aside
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="absolute right-0 top-0 h-full w-full max-w-[420px] border-l border-outline-variant bg-surface-container-lowest flex flex-col shadow-2xl"
              role="dialog"
              aria-label="Кампанит ноорог"
            >
              <div className="p-6 border-b border-outline-variant/50 flex justify-between items-center bg-surface">
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Ноорог үүсгэх</div>
                  <h2 className="text-xl font-black text-on-background tracking-tight truncate">
                    {selectedSuggestionId === 'dinner-push' ? 'Оройн түлхэлт' : 'Дахин таталт (ваучер)'}
                  </h2>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-xl hover:bg-surface-container text-outline"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Хаах"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <label className="block">
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider">Кампанит ажлын нэр</span>
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
                    placeholder="Ж: VIP дахин захиалах сануулга"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider">Сегмент</span>
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
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider">Зорилго</span>
                  <textarea
                    value={draft.objective}
                    onChange={(e) => setDraft((d) => ({ ...d, objective: e.target.value }))}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4 resize-none"
                    placeholder="Ж: Дахин худалдан авалт өдөөх"
                  />
                </label>

                <div className="rounded-2xl border border-outline-variant/25 bg-surface p-5 space-y-4">
                  <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Суваг (демо)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'push', label: 'Push', icon: BellRing },
                      { id: 'sms', label: 'SMS', icon: MessageCircle },
                      { id: 'email', label: 'Email', icon: Mail },
                    ].map((ch) => (
                      <div
                        key={ch.id}
                        className="rounded-2xl border border-outline-variant/25 bg-surface-container-lowest px-3 py-3 flex items-center gap-2"
                      >
                        <ch.icon className="w-4 h-4 text-outline" />
                        <span className="text-[10px] font-black text-on-surface uppercase tracking-wider">{ch.label}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-2">Ваучерын төсөв (демо)</div>
                    <div className="flex items-center justify-between rounded-2xl border border-outline-variant/25 bg-surface-container-lowest px-4 py-3">
                      <span className="text-xs font-black text-on-surface">₮{formatMnt(DEFAULT_VOUCHER_BUDGET_MNT)}</span>
                      <span className="text-[10px] font-black text-on-surface-variant/50">
                        Тооц. зардал: {formatMnt(ESTIMATED_SEND_COST_MNT)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-outline-variant/40 bg-surface">
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    disabled={!canCreateDraft || !onCreateDraft}
                    onClick={() => {
                      if (!onCreateDraft || !canCreateDraft) return;
                      onCreateDraft(
                        { name: draft.name.trim(), segment: draft.segment, objective: draft.objective.trim() },
                        { openFlow: true }
                      );
                      setDrawerOpen(false);
                    }}
                    className={cn(
                      'w-full bg-primary-container text-on-primary-container font-black text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all border-2 border-b-4',
                      canCreateDraft && onCreateDraft
                        ? 'border-outline-variant shadow-[6px_6px_0px_#6b4c00] hover:bg-primary-container/90'
                        : 'border-outline-variant/25 opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Rocket className="w-5 h-5 fill-current" />
                    <span>Ноорог үүсгээд Flow maker руу орох</span>
                  </button>
                  <button
                    type="button"
                    disabled={!canCreateDraft || !onCreateDraft}
                    onClick={() => {
                      if (!onCreateDraft || !canCreateDraft) return;
                      onCreateDraft(
                        { name: draft.name.trim(), segment: draft.segment, objective: draft.objective.trim() },
                        { openFlow: false }
                      );
                      setDrawerOpen(false);
                    }}
                    className={cn(
                      'w-full rounded-2xl border-2 border-outline-variant/35 bg-surface-container-lowest text-on-surface font-black text-[11px] uppercase py-3 transition-all border-b-4',
                      canCreateDraft && onCreateDraft ? 'hover:bg-surface-container-low' : 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    Зөвхөн ноорог үүсгэх
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
