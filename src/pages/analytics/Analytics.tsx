import React from 'react';
import { 
  Info, 
  Calendar, 
  Download, 
  Coins, 
  Rocket, 
  Star, 
  TrendingUp, 
  ArrowUp,
  Mail,
  BellRing,
  MessageCircle,
  Filter,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { formatMntSay } from '@/src/lib/formatMnt';

/** Демо KPI: зах зээлийн дунд төвшний давтагдсан орлогын захиалга. */
const KPI_RECURRING_REVENUE_MNT = 857_000_000;

const chartData = [
  { name: 'Дав', treatment: 45, control: 30 },
  { name: 'Мяг', treatment: 50, control: 35 },
  { name: 'Лха', treatment: 65, control: 40 },
  { name: 'Пүр', treatment: 80, control: 45 },
  { name: 'Баа', treatment: 70, control: 35 },
  { name: 'Бям', treatment: 95, control: 50 },
  { name: 'Ням', treatment: 85, control: 55 },
];

export default function Analytics() {
  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 overflow-y-auto pb-12 custom-scrollbar">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Гүйцэтгэл хянах самбар</h2>
          <p className="text-sm font-bold text-on-surface-variant/60 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Хүлээгдэж буй өсөлт: Идэвхтэй бүлгийн хувьд дахин худалдан авалт +2.8%.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-xs py-3 px-6 rounded-xl flex items-center gap-3 hover:bg-surface-container-high transition-all shadow-sm border-b-[4px]">
            <Calendar className="w-4 h-4" />
            Сүүлийн 30 хоног
          </button>
          <button className="bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-xs py-3 px-6 rounded-xl flex items-center gap-3 hover:bg-surface-container-high transition-all shadow-sm border-b-[4px]">
            <Download className="w-4 h-4" />
            Экспортлох
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/30 relative overflow-hidden group border-b-[6px]">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Нийт давтагдсан орлого</span>
            <div className="w-10 h-10 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-on-surface tracking-tighter">{formatMntSay(KPI_RECURRING_REVENUE_MNT)}</span>
            <span className="flex items-center text-primary font-black text-[10px] bg-primary-container/20 px-3 py-1 rounded-full uppercase tracking-tighter">
              <ArrowUp className="w-3 h-3 mr-1" />
              +12.4%
            </span>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-container opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/30 relative overflow-hidden group border-b-[6px]">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Хөрвүүлэлтийн өсөлт</span>
            <div className="w-10 h-10 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary">
              <Rocket className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-on-surface tracking-tighter">+15%</span>
            <span className="flex items-center text-primary font-black text-[10px] bg-primary-container/20 px-3 py-1 rounded-full uppercase tracking-tighter">
              <ArrowUp className="w-3 h-3 mr-1" />
              +2.1%
            </span>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        {/* KPI 3 */}
        <div className="bg-inverse-surface rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white group border-b-[6px] border-black">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black text-outline-variant uppercase tracking-[0.2em]">Компанит ажлын ROI</span>
              <div className="w-10 h-10 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-white tracking-tighter">4.2x</span>
              <span className="flex items-center text-on-primary-container font-black text-[10px] bg-primary-container px-3 py-1 rounded-full uppercase tracking-tighter">
                Зорилтот: 3.5x
              </span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-container opacity-20 rounded-full blur-[64px] group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-xl border border-outline-variant/30 mb-10 border-b-[6px]">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black text-on-surface tracking-tight">Хяналтын бүлгээс давсан нэмэлт өсөлт</h3>
            <p className="text-sm font-bold text-on-surface-variant/50">Эмчилгээнд хамрагдсан болон үлдсэн хэрэглэгчдийн өдөр тутмын харьцуулалт.</p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-3 font-black text-[10px] text-on-surface-variant uppercase tracking-widest">
              <div className="w-3 h-3 rounded bg-primary-container shadow-sm"></div> Эмчилгээ
            </div>
            <div className="flex items-center gap-3 font-black text-[10px] text-on-surface-variant uppercase tracking-widest">
              <div className="w-3 h-3 rounded bg-surface-dim shadow-sm"></div> Хяналт
            </div>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#E2DFDE" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#837560', fontSize: 10, fontWeight: 900 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#837560', fontSize: 10, fontWeight: 900 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,184,0,0.05)' }}
                contentStyle={{ borderRadius: '16px', border: '2px solid #D5C4AB', boxShadow: '12px 12px 0px rgba(0,0,0,0.05)', fontFamily: 'Manrope', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="control" 
                fill="#DADADA" 
                radius={[4, 4, 0, 0]} 
                barSize={24}
              />
              <Bar 
                dataKey="treatment" 
                fill="#FFB800" 
                radius={[4, 4, 0, 0]} 
                barSize={24}
              >
                {chartData.map((entry, index) => (
                   <Cell key={`cell-${index}`} className="hover:filter hover:brightness-110 transition-all cursor-pointer" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-surface-container-lowest rounded-[2rem] shadow-xl border border-outline-variant/30 overflow-hidden border-b-[6px]">
        <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <h3 className="text-2xl font-black text-on-surface tracking-tight">Идэвхтэй компанит ажлын гүйцэтгэл</h3>
          <div className="flex gap-4">
            <button className="p-2 text-outline hover:text-primary transition-all"><Filter className="w-5 h-5" /></button>
            <button className="p-2 text-outline hover:text-primary transition-all"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface/50 border-b border-outline-variant/20">
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em]">Компанит ажлын нэр</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em]">Төлөв</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] text-right">Нээх хувь</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] text-right">CTR</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] text-right">Хөрвүүлэлт</th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] text-right">Өсөлт</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-on-surface">
              {[
                { name: 'Эргүүлэн татах: Алдагдах эрсдэл 3-р улирал', icon: Mail, type: 'mail', status: 'Идэвхтэй', open: '42.8%', ctr: '12.4%', conv: '3.2%', lift: '+1.8%', active: true },
                { name: 'VIP Дахин захиалах сануулга', icon: BellRing, type: 'push', status: 'Идэвхтэй', open: '65.2%', ctr: '24.1%', conv: '8.5%', lift: '+4.2%', active: true },
                { name: 'Амралтын өдрийн онцгой урамшуулал', icon: MessageCircle, type: 'sms', status: 'Ноорог', open: '-', ctr: '-', conv: '-', lift: '-', active: false },
                { name: 'Худалдан авалтын дараах санал асуулга', icon: Mail, type: 'mail', status: 'Идэвхтэй', open: '51.0%', ctr: '18.5%', conv: 'N/A', lift: '-', active: true }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-all h-[72px]">
                  <td className="py-4 px-8 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-outline shadow-sm">
                      <row.icon className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold tracking-tight">{row.name}</span>
                  </td>
                  <td className="py-4 px-8">
                    <span className={cn(
                      "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border",
                      row.active 
                        ? "bg-primary-container/10 text-primary border-primary-container/30 shadow-sm" 
                        : "bg-surface-container text-outline border-outline-variant/30"
                    )}>
                      <div className={cn("w-2 h-2 rounded-full mr-2", row.active ? "bg-primary animate-pulse" : "bg-outline")} />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-right font-black">{row.open}</td>
                  <td className="py-4 px-8 text-right font-black">{row.ctr}</td>
                  <td className="py-4 px-8 text-right font-black">{row.conv}</td>
                  <td className="py-4 px-8 text-right">
                    {row.lift !== '-' ? (
                      <span className="text-primary font-black flex justify-end items-center gap-1">
                        <ArrowUp className="w-4 h-4" />
                        {row.lift}
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
