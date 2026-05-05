import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import {
  NAV_SECTIONS,
  SECONDARY_NAV,
  type AppRouteId,
} from '@/src/navigation/routes';
import logoUrl from '@/src/assets/logo.jpg';

interface SidebarProps {
  activePage: AppRouteId;
  setActivePage: (page: AppRouteId) => void;
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <nav className="w-64 fixed left-0 top-0 h-full border-r border-inverse-surface bg-inverse-surface text-inverse-on-surface z-50 flex flex-col py-6">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-container-lowest overflow-hidden border border-outline-variant/30 shadow-[0_0_15px_rgba(255,184,0,0.18)] grid place-items-center p-1">
          <img src={logoUrl} alt="TokTok OR logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-primary-container leading-none">TokTok OR</h1>
          <p className="text-[10px] text-inverse-on-surface/50 font-medium mt-1 uppercase tracking-wider">Хэрэглэгчид Идэвхжүүлэх Хөтөч</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-6 custom-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-4 mb-2 text-[9px] font-black text-inverse-on-surface/40 uppercase tracking-[0.12em]">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePage(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 group text-left',
                      isActive
                        ? 'bg-primary-container/10 text-primary-container'
                        : 'text-inverse-on-surface/60 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5 shrink-0', isActive && 'fill-current')} />
                    <span className="leading-snug text-[13px]">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSide"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(255,184,0,0.6)] shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-2 mt-auto pt-4 border-t border-white/10 space-y-1">
        {SECONDARY_NAV.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-left',
                isActive
                  ? 'bg-primary-container/10 text-primary-container'
                  : 'text-inverse-on-surface/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
