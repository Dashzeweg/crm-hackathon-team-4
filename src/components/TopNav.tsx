import React from 'react';
import { ChevronRight, Search, Bell, MessageSquare } from 'lucide-react';
import { routeContextLine, routeLabel } from '@/src/navigation/routes';

export default function TopNav({ activeRouteId }: { activeRouteId: string }) {
  const title = routeLabel(activeRouteId);
  const context = routeContextLine(activeRouteId);

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-auto min-h-16 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-md shadow-sm z-40 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 py-3 lg:py-0 lg:h-16 px-8">
      <div className="hidden sm:flex items-start gap-2 min-w-0 max-w-xs shrink-0 pr-4 lg:border-r lg:border-outline-variant/30">
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[9px] font-black text-outline uppercase tracking-wider mb-0.5">
            <span>Хөтөч</span>
            <ChevronRight className="w-3 h-3 shrink-0 opacity-60" />
            <span className="truncate text-on-surface-variant">{title}</span>
          </div>
          {context ? (
            <p className="text-[10px] font-bold text-on-surface-variant/70 leading-snug line-clamp-2">{context}</p>
          ) : (
            <p className="text-sm font-black text-on-surface truncate">{title}</p>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center min-w-0">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Компанит ажил, сегмент хайх..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container border-none rounded-full text-sm focus:ring-2 focus:ring-primary-container outline-none transition-shadow text-on-surface placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 justify-end">
        <button
          type="button"
          className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-full relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
        </button>
        <button
          type="button"
          className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-outline-variant">
          <div className="text-right">
            <p className="text-sm font-bold text-on-surface leading-none">Munkhuush</p>
            <p className="text-[10px] font-medium text-on-surface-variant/60">Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container overflow-hidden border-2 border-outline-variant shadow-sm cursor-pointer hover:border-primary-container transition-all">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
