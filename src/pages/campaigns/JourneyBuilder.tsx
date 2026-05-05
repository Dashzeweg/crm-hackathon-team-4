import React from 'react';
import { 
  History, 
  Play, 
  Hand, 
  MousePointer2, 
  Zap, 
  GitBranch, 
  CirclePlay,
  Minus,
  Plus,
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileEdit
} from 'lucide-react';
import { motion } from 'motion/react';

export default function JourneyBuilder() {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs font-extrabold text-primary mb-1 uppercase tracking-[0.2em]">Урсгалын бүтээгч · 7 хоногийн жишээ</p>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Шинэ хэрэглэгчийн компанит ажил</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface font-bold text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 shadow-[2px_2px_0px_#d5c4ab]">
            <History className="w-4 h-4" />
            Хувилбарын Түүх
          </button>
          <button className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-extrabold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]">
            <Play className="w-4 h-4 fill-current" />
            Компанит ажилыг нийтлэх
          </button>
        </div>
      </div>

      {/* Canvas Toolbar */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-2 mb-6 flex gap-2 shadow-lg max-w-fit border-b-[4px]">
        <div className="flex items-center gap-1 pr-4 border-r border-outline-variant">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-grab">
            <Hand className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-container bg-primary-container/20 transition-colors shadow-inner">
            <MousePointer2 className="w-5 h-5 fill-current" />
          </button>
        </div>
        <div className="flex items-center gap-2 px-4 border-r border-outline-variant">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60">
            <Zap className="w-4 h-4 text-tertiary" />
            <span className="text-sm font-bold text-on-surface">Өдөөгч</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60">
            <GitBranch className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-on-surface">Нөхцөл</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60">
            <CirclePlay className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-on-surface">Үйлдэл</span>
          </div>
        </div>
        <div className="flex items-center gap-1 pl-4">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-sm font-black w-14 text-center text-on-surface-variant">100%</span>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-surface-bright border border-outline-variant rounded-3xl overflow-hidden relative border-b-[6px]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D5C4AB 1.5px, transparent 0)', backgroundSize: '32px 32px' }}>
        <div className="absolute inset-0 p-12 overflow-auto flex justify-center items-start pt-16">
          <div className="flex flex-col items-center w-full max-w-3xl relative">
            
            {/* Day 0 Node */}
            <div className="relative z-10 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden group hover:border-primary-container transition-all cursor-pointer border-b-[4px]">
              <div className="h-2 bg-tertiary w-full"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-tertiary/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-tertiary fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">ӨДӨӨГЧ • ӨДӨР 0</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-lg leading-tight text-on-surface mb-4">Шинэ Бүртгэл Үүсгэсэн</h3>
                <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/40 shadow-sm">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold text-on-surface leading-tight">Мэндчилгээний И-мэйл (Илгээсэн)</span>
                  <CheckCircle2 className="ml-auto w-5 h-5 text-primary fill-primary/10" />
                </div>
              </div>
            </div>

            {/* Connection Line */}
            <div className="h-16 w-1 bg-outline-variant relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-outline-variant"></div>
            </div>

            {/* Day 1 Node */}
            <div className="relative z-10 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden group hover:border-primary-container transition-all cursor-pointer border-b-[4px]">
              <div className="h-2 bg-primary-container w-full"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary-container/20 flex items-center justify-center">
                      <CirclePlay className="w-4 h-4 text-primary fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">ҮҮЛДЭЛ • ӨДӨР 1</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-lg leading-tight text-on-surface mb-1">Push Мэдэгдэл</h3>
                <p className="text-sm font-semibold text-on-surface-variant/70 mb-4 italic">"Өчигдрийн анхны захиалга" сануулга.</p>
                <div className="w-full h-28 rounded-xl overflow-hidden relative mb-2 border border-outline-variant/30">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400" 
                    alt="Push Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-[10px] font-black text-white bg-white/20 px-2 py-1 rounded backdrop-blur-md border border-white/30 uppercase tracking-tighter">Урьдчилан харах</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Line with Time Label */}
            <div className="h-20 w-1 bg-outline-variant relative flex items-center justify-center">
              <div className="absolute top-1/2 -translate-y-1/2 bg-surface-container-lowest border-2 border-outline-variant px-3 py-1.5 rounded-xl text-[10px] font-black text-on-surface-variant z-20 text-center uppercase tracking-tighter shadow-sm">
                2 Өдөр<br/>Хүлээх
              </div>
            </div>

            {/* Day 3 Split Condition */}
            <div className="relative z-10 w-[420px] bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden group hover:border-secondary transition-all cursor-pointer border-b-[4px]">
              <div className="h-2 bg-secondary w-full"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">НӨХЦӨЛ • ӨДӨР 3</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-xl font-display leading-tight text-on-surface mb-6 text-center">Дахин захиалга хийсэн үү?</h3>
                <div className="flex gap-4">
                  <div className="flex-1 bg-surface p-4 rounded-2xl border border-outline-variant/40 text-center relative border-b-2 shadow-sm">
                    <span className="text-sm font-black text-on-surface block mb-1">Тийм</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">Компанит ажилыг дуусгах</span>
                  </div>
                  <div className="flex-1 bg-primary-container/10 p-4 rounded-2xl border-2 border-primary-container/30 text-center relative shadow-sm">
                    <span className="text-sm font-black text-primary block mb-1">Үгүй</span>
                    <span className="text-[10px] font-bold text-primary/70 uppercase">Үргэлжлүүлэх</span>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-white"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Split path visualization */}
            <div className="flex flex-col items-end w-full max-w-3xl pr-[6.5rem]">
              <div className="h-12 w-1 bg-primary relative mr-12"></div>
              
              {/* Day 3 Secondary Action */}
              <div className="relative z-10 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden group hover:border-primary-container transition-all cursor-pointer border-b-[4px]">
                <div className="h-2 bg-primary-container w-full"></div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">ҮЙЛДЭЛ • ӨДӨР 3</span>
                  </div>
                  <h3 className="font-extrabold text-lg leading-tight text-on-surface mb-2">Дахин Захиалах Санал Илгээх</h3>
                  <p className="text-xs font-semibold text-on-surface-variant/60 leading-relaxed italic">"3 өдрийн дараа дахин захиалаагүй" 10% хөнгөлөлтийн кодтой SMS санал.</p>
                </div>
              </div>
              
              {/* FINAL NODE - Alert */}
              <div className="h-16 w-1 bg-outline-variant relative mr-40">
                <div className="absolute top-1/2 -translate-y-1/2 bg-surface-container-lowest border border-outline-variant px-3 py-1 rounded-xl text-[10px] font-black text-on-surface-variant z-20 whitespace-nowrap uppercase tracking-tighter">4 Өдөр Хүлээх</div>
              </div>

              <div className="relative z-10 w-80 bg-error/5 rounded-2xl shadow-2xl border-2 border-error/20 overflow-hidden group hover:border-error transition-all cursor-pointer border-b-[6px] ring-4 ring-error/5">
                <div className="h-2 bg-error w-full"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-error/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-error fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-error uppercase tracking-[0.2em]">ШИЙДВЭРЛЭХ ҮЙЛДЭЛ • ӨДӨР 7</span>
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight text-on-surface mb-3">Сүүлийн Алдагдлаас Сэргийлэх</h3>
                  <p className="text-sm font-bold text-on-surface-variant mb-6 leading-relaxed">Хэрэглэгчийг алдахаас сэргийлж өндөр үнийн дүнтэй ваучер И-мэйлээр илгээх.</p>
                  <button className="w-full py-3 bg-white border-2 border-error/20 rounded-xl text-error font-black text-xs flex items-center justify-center gap-2 hover:bg-error/5 transition-all shadow-sm active:scale-95">
                    <FileEdit className="w-4 h-4" />
                    Загвар Засварлах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
