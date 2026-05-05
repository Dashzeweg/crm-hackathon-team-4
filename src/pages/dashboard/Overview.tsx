import React from 'react';
import { ArrowRight, Split, Send, Sparkles, Workflow, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import type { AppRouteId } from '@/src/navigation/routes';
import { NAV_SECTIONS } from '@/src/navigation/routes';

const quickSteps: {
  title: string;
  body: string;
  icon: typeof Split;
  route: AppRouteId;
  cta: string;
}[] = [
  {
    title: '1. Хэнд зориулах вэ?',
    body: 'Сегмент үүсгэж, хэрэглэгчдийг нөхцлөөр бүлэглэнэ.',
    icon: Split,
    route: 'segments',
    cta: 'Сегментүүд рүү',
  },
  {
    title: '2. Мессеж хэзээ очих вэ?',
    body: 'Сегмент сонгож, нэг удаагийн эсвэл хуваарьт тарилт үүсгэнэ.',
    icon: Send,
    route: 'segment-deliveries',
    cta: 'Тарилт руу',
  },
  {
    title: '3. Юу илгээх, яаж автоматжуулах вэ?',
    body: 'Эхлээд зөвлөмж авна, дараа нь урсгалын бүтээгчээр алхам алхмаар тохируулна.',
    icon: Sparkles,
    route: 'campaign-copilot',
    cta: 'Туслах руу',
  },
  {
    title: '4. Үр дүн',
    body: 'Нээлт, CTR, хөрвүүлэлт зэргийг харьцуулж үзнэ.',
    icon: TrendingUp,
    route: 'analytics',
    cta: 'Аналитик руу',
  },
];

export default function Overview({ onNavigate }: { onNavigate: (id: AppRouteId) => void }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pb-12 custom-scrollbar max-w-5xl w-full mx-auto">
      <header className="mb-10">
        <p className="text-xs font-extrabold text-primary mb-2 uppercase tracking-[0.2em]">Эхлэх</p>
        <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-3">Тойм</h1>
        <p className="text-sm font-bold text-on-surface-variant/80 max-w-2xl leading-relaxed">
          Энэ хөтөч нь <strong className="text-on-surface">хүртээмж → компанит ажил → үр дүн</strong> гэсэн дарааллыг
          дагадаг. Доорх алхмууд нь цэсний бодит урсгалыг тодорхойлно.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {quickSteps.map((step, i) => (
          <motion.button
            key={step.route}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onNavigate(step.route)}
            className="text-left rounded-[1.5rem] border-2 border-outline-variant/30 bg-surface-container-lowest p-6 shadow-lg border-b-[5px] hover:border-primary-container/35 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-black text-on-surface tracking-tight mb-2">{step.title}</h2>
                <p className="text-xs font-bold text-on-surface-variant/80 leading-relaxed mb-4">{step.body}</p>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-wide group-hover:gap-3 transition-all">
                  {step.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-sm font-black text-on-surface uppercase tracking-[0.15em]">Цэсний бүтэц</h2>
            <p className="text-xs font-bold text-on-surface-variant/75 mt-1">
              Цэсийг урсгалын дагуу бүлэглэсэн тул хаанаас эхлэхээ амархан олно.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('campaign-builder')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-xs uppercase shadow-[3px_3px_0px_#6b4c00]"
          >
            <Workflow className="w-4 h-4" />
            Шууд урсгалын бүтээгч нээх
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NAV_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.5rem] border-2 border-outline-variant/25 bg-surface-container-lowest p-6 shadow-lg border-b-[5px]"
            >
              <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">{section.title}</p>
              <p className="text-xs font-bold text-on-surface-variant/80 mb-4 leading-relaxed">{section.hint}</p>
              <ul className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/25 text-xs font-extrabold text-on-surface hover:border-primary-container/40 hover:bg-primary-container/5 transition-all"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
