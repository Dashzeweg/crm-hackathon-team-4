import React from 'react';
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
  Rocket
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { formatMnt } from '@/src/lib/formatMnt';
import { motion } from 'motion/react';

/** Voucher pool & estimated send cost (order of magnitude for MN market). */
const DEFAULT_VOUCHER_BUDGET_MNT = 1_800_000;
const ESTIMATED_SEND_COST_MNT = 1_190_000;

export default function CampaignCopilot() {
  return (
    <div className="flex h-screen overflow-hidden animate-in slide-in-from-right duration-500">
      {/* Main Column */}
      <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
        <header className="mb-10 sticky top-0 bg-background/80 backdrop-blur-sm pt-8 pb-4 z-10 border-b border-outline-variant/30">
          <h1 className="text-4xl font-black text-on-background tracking-tighter mb-2">Зөвлөмжийн туслах</h1>
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

        {/* Visual Data Section */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/40 overflow-hidden mb-12 border-b-[6px]">
          <div className="p-8 border-b border-outline-variant/20 bg-surface">
            <h3 className="text-2xl font-black text-on-background tracking-tight">Үзэгчдийн Давхцлын Шинжилгээ</h3>
          </div>
          <div className="h-72 bg-surface-container-low w-full relative group">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" 
              alt="Data Chart" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-primary-container text-on-primary-container font-black px-6 py-2 rounded-full shadow-2xl border-b-4 border-primary/50">Дэлгэрэнгүй Шинжилгээ</span>
            </div>
          </div>
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
