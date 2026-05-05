import React, { useState, useEffect, useRef, FormEvent } from 'react';
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

export default function CampaignCopilot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [streamingFull, setStreamingFull] = useState('');
  const [streamedCount, setStreamedCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isStreaming = streamedCount < streamingFull.length;

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

  return (
    <div className="flex h-screen overflow-hidden animate-in slide-in-from-right duration-500">
      {/* Main Column */}
      <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
        <header className="mb-10 sticky top-0 bg-background/80 backdrop-blur-sm pt-8 pb-4 z-10 border-b border-outline-variant/30">
          <h1 className="text-4xl font-black text-on-background tracking-tighter mb-2">AI туслах</h1>
          <p className="text-lg font-bold text-on-surface-variant/70">Хамгийн их тогтоон барих нөлөө үзүүлэх хиймэл оюун ухаанд суурилсан зөвлөмжүүд.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/40 flex flex-col h-full relative overflow-hidden group border-b-[6px]"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-container to-secondary"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container shadow-inner">
                  <Utensils className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-primary-container uppercase tracking-[0.2em] block mb-1">САНАЛ БОЛГОЖ БУЙ</span>
                  <h2 className="text-2xl font-black text-on-background leading-tight font-display tracking-tight">Өдрийн Хоолонд Үнэнч Хэрэглэгчдэд Зорилгоор Оройн Түлхэх Мэдэгдэл</h2>
                </div>
              </div>
              <MoreVertical className="w-6 h-6 text-outline cursor-pointer hover:text-primary-container transition-colors" />
            </div>

            <div className="mb-10 flex-1">
              <div className="bg-surface-container-low p-6 rounded-2xl flex items-start gap-4 border border-outline-variant/20 shadow-inner">
                <Lightbulb className="w-8 h-8 text-primary-container shrink-0 fill-primary-container/20" />
                <div>
                  <p className="text-sm font-bold text-on-surface-variant leading-relaxed">
                    <strong className="text-on-background border-b-2 border-primary-container/40">Ойлголт:</strong> Энэ сегмент нь өдрийн цагаар хамгийн сайн ажилладаг боловч оройн хоолны захиалга 45%-иар буурдаг. 16:30 цагт чиглэсэн түлхэлт нь оройн хөрвүүлэлтийг ойролцоогоор 12%-иар нэмэгдүүлэх боломжтой.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t-2 border-dashed border-outline-variant/40">
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <Group className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-tighter">Тооцоолсон Хүртээмж: 4,200</span>
              </div>
              <button className="text-sm font-black text-primary-container hover:text-primary transition-all flex items-center gap-2 group/btn">
                Компанит ажил тохируулах
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/40 flex flex-col h-full relative overflow-hidden group border-b-[6px]"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tertiary-container to-error"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-error-container/20 flex items-center justify-center text-error shadow-inner">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-tertiary-container uppercase tracking-[0.2em] block mb-1">ӨНДӨР АЧ ХОЛБОГДОЛТОЙ</span>
                  <h2 className="text-2xl font-black text-on-background leading-tight font-display tracking-tight">3 Хоног Орхисон Хэрэглэгчдийг Дахин Татах Ваучер</h2>
                </div>
              </div>
              <MoreVertical className="w-6 h-6 text-outline cursor-pointer" />
            </div>

            <div className="mb-10 flex-1">
              <div className="bg-error/5 p-6 rounded-2xl flex items-start gap-4 border border-error/10">
                <TrendingDown className="w-8 h-8 text-error shrink-0" />
                <div>
                  <p className="text-sm font-bold text-on-surface-variant leading-relaxed">
                    <strong className="text-error border-b-2 border-error/20">Эрсдэл:</strong> Гарах магадлал өндөр байна. Одоо мессежээр 15%-ийн хөнгөлөлтийн ваучер илгээх нь энэ тодорхой бүлгийн хувьд түүхэн сэргээх түвшин 28% байдаг.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t-2 border-dashed border-outline-variant/40">
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <Group className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-tighter">Тооцоолсон Хүртээмж: 1,850</span>
              </div>
              <button className="text-sm font-black text-primary-container hover:text-primary transition-all flex items-center gap-2 group/btn">
                Компанит ажил тохируулах
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* AI Chat Section */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/40 overflow-hidden mb-12 border-b-[6px]">
          {/* Chat header */}
          <div className="p-6 border-b border-outline-variant/20 bg-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center shadow-inner">
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
          <div className="h-80 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-surface-container-low/30">
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
                    ? 'bg-gradient-to-br from-primary-container to-secondary'
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
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br from-primary-container to-secondary">
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
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-primary-container to-secondary">
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
            <div className="px-6 py-3 flex gap-2 overflow-x-auto border-t border-outline-variant/20 bg-surface custom-scrollbar">
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

      {/* Right Sidebar: Campaign Setup */}
      <aside className="w-96 border-l-2 border-outline-variant bg-surface-container-lowest flex flex-col shadow-2xl z-30 animate-in slide-in-from-right duration-700">
        <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
          <h2 className="text-3xl font-black text-on-background tracking-tighter">Компанит ажлын тохиргоо</h2>
          <button className="text-outline hover:text-on-background transition-all hover:rotate-90">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Selected Campaign Focus */}
          <div className="bg-primary-container/10 rounded-2xl p-6 border-2 border-primary-container/30 shadow-inner">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Идэвхтэй Ноорог</span>
            <h3 className="text-sm font-bold leading-relaxed text-on-background">Өдрийн Хоолонд Үнэнч Хэрэглэгчдэд Зориулсан Оройн Түлхэх Мэдэгдэл</h3>
          </div>

          {/* Channel Selection */}
          <div>
            <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-6 px-1">Суваг Сонгох</label>
            <div className="space-y-4">
              {[
                { id: 'push', label: 'Түлхэх Мэдэгдэл', icon: BellRing, checked: true },
                { id: 'sms', label: 'Мессеж', icon: MessageCircle, checked: false },
                { id: 'email', label: 'Имэйл', icon: Mail, checked: false },
              ].map(channel => (
                <label key={channel.id} className={cn(
                  "flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all border-b-[4px]",
                  channel.checked
                    ? "border-primary-container bg-primary-container/5 shadow-inner"
                    : "border-outline-variant/30 hover:border-outline-variant bg-surface-container-lowest"
                )}>
                  <input type="checkbox" defaultChecked={channel.checked} className="hidden" />
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mr-4 shadow-sm",
                    channel.checked ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-outline"
                  )}>
                    <channel.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-on-background">{channel.label}</span>
                  {channel.checked && <div className="ml-auto w-5 h-5 rounded-full bg-primary-container flex items-center justify-center"><div className="w-2 h-2 bg-on-primary-container rounded-full" /></div>}
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-6 px-1">Ваучерын төсвийн хязгаар (₮)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-primary" aria-hidden>
                ₮
              </span>
              <input
                type="number"
                defaultValue={DEFAULT_VOUCHER_BUDGET_MNT}
                className="w-full pl-11 pr-6 py-4 bg-surface-container-low border-2 border-outline-variant/30 rounded-2xl font-black text-on-background focus:border-primary-container focus:ring-0 outline-none transition-all shadow-inner"
              />
            </div>
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase">
                Тооц. зардал: {formatMnt(ESTIMATED_SEND_COST_MNT)}
              </span>
              <span className="text-[10px] font-black text-primary-container uppercase bg-primary-container/10 px-2 rounded">Аюулгүй хязгаар</span>
            </div>
          </div>

          {/* Timing */}
          <div>
            <label className="text-xs font-black text-on-background uppercase tracking-widest block mb-6 px-1">Илгээх Цаг</label>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 border-2 border-primary-container bg-primary-container/5 text-primary-container font-black text-xs rounded-2xl shadow-inner border-b-[4px]">Ухаалаг Цаг</button>
              <button className="py-3 border-2 border-outline-variant/30 bg-surface-container text-on-surface-variant/60 font-black text-xs rounded-2xl border-b-[4px] hover:border-outline-variant transition-all">Тогтмол Цаг</button>
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant/40 mt-4 leading-relaxed italic">Хиймэл оюун ухаан хэрэглэгч бүрт 16:00 - 17:30 цагийн хооронд хүргэлтийг оновчтой болгоно.</p>
          </div>
        </div>

        <div className="p-8 border-t-2 border-outline-variant bg-surface-bright">
          <button className="w-full bg-primary-container text-on-primary-container font-black text-lg py-5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-container/90 transition-all shadow-[8px_8px_0px_#6b4c00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#6b4c00]">
            <Rocket className="w-6 h-6 fill-current" />
            <span>Ухаалаг компанит ажил эхлүүлэх</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
