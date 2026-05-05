import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  History, 
  ArrowLeft,
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
  FileEdit,
  Maximize2,
  Minimize2,
  GripVertical,
  Trash2,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

type PaletteItemType = 'trigger' | 'condition' | 'action';

type JourneyNode = {
  id: string;
  type: PaletteItemType;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
};

type JourneyEdge = {
  id: string;
  from: string;
  to: string;
};

function NodeEditModal({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: { title: string; subtitle?: string; type: PaletteItemType } | null;
  onClose: () => void;
  onSave: (next: { title: string; subtitle?: string; type: PaletteItemType }) => void;
}) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<PaletteItemType>('trigger');

  useEffect(() => {
    if (!open || !initial) return;
    setTitle(initial.title ?? '');
    setSubtitle(initial.subtitle ?? '');
    setType(initial.type);
  }, [open, initial]);

  if (!open || !initial) return null;

  const canSave = title.trim().length > 0;

  return (
    <div className="fixed inset-0 z-210 flex items-center justify-center bg-black/45 p-4" role="presentation" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-primary-container/15 text-primary-container flex items-center justify-center">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Node</div>
              <div className="text-lg font-black text-on-surface">Засварлах</div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container" aria-label="Хаах">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-7 space-y-5">
          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">Төрөл</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PaletteItemType)}
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
            >
              <option value="trigger">Өдөөгч</option>
              <option value="condition">Нөхцөл</option>
              <option value="action">Үйлдэл</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">
              Гарчиг <span className="text-error">*</span>
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4"
              placeholder="Ж: Шинэ бүртгэл үүсгэсэн"
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-black text-outline uppercase tracking-wider">Тайлбар</span>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-4 resize-none"
              placeholder="Ж: Мэндчилгээний и-мэйл илгээх"
            />
          </label>

          <div className="flex items-start gap-2 rounded-2xl border border-outline-variant/25 bg-surface p-4">
            <AlertTriangle className="w-5 h-5 text-outline shrink-0 mt-0.5" />
            <div className="text-xs font-bold text-on-surface-variant/80 leading-snug">
              Одоогоор энэ нь UI mock. Дараа нь бодит workflow validation / channel settings нэмэх боломжтой.
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-7 py-5 border-t border-outline-variant/20">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs">
            Болих
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!canSave) return;
              onSave({ title: title.trim(), subtitle: subtitle.trim() || undefined, type });
            }}
            className={
              canSave
                ? 'px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-b-4 bg-primary-container text-on-primary-container border-outline-variant shadow-[4px_4px_0px_#6b4c00]'
                : 'px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 border-2 border-b-4 bg-surface-container text-on-surface-variant border-outline-variant/30 opacity-60 cursor-not-allowed'
            }
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function nodeWidth(n: JourneyNode) {
  return n.type === 'condition' ? 420 : 320;
}

function paletteMeta(t: PaletteItemType) {
  if (t === 'trigger')
    return {
      label: 'Өдөөгч',
      Icon: Zap,
      chipCls: 'text-tertiary',
      barCls: 'bg-tertiary',
      bubbleCls: 'bg-tertiary/10',
    } as const;
  if (t === 'condition')
    return {
      label: 'Нөхцөл',
      Icon: GitBranch,
      chipCls: 'text-secondary',
      barCls: 'bg-secondary',
      bubbleCls: 'bg-secondary/10',
    } as const;
  return {
    label: 'Үйлдэл',
    Icon: CirclePlay,
    chipCls: 'text-primary',
    barCls: 'bg-primary-container',
    bubbleCls: 'bg-primary-container/20',
  } as const;
}

export default function JourneyBuilder({
  campaignName = 'Шинэ хэрэглэгчийн компанит ажил',
  onBack,
  variant = 'standalone',
}: {
  campaignName?: string;
  onBack?: () => void;
  variant?: 'standalone' | 'embedded';
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const initialNodes = useMemo<JourneyNode[]>(
    () => [
      {
        id: 'n_day0',
        type: 'trigger',
        title: 'Шинэ Бүртгэл Үүсгэсэн',
        subtitle: 'Мэндчилгээний И-мэйл (Илгээсэн)',
        x: 520,
        y: 120,
      },
      {
        id: 'n_day1',
        type: 'action',
        title: 'Push Мэдэгдэл',
        subtitle: '"Өчигдрийн анхны захиалга" сануулга.',
        x: 520,
        y: 360,
      },
      {
        id: 'n_day3',
        type: 'condition',
        title: 'Дахин захиалга хийсэн үү?',
        subtitle: 'Тийм / Үгүй салаалах',
        x: 460,
        y: 620,
      },
    ],
    []
  );

  const [nodes, setNodes] = useState<JourneyNode[]>(initialNodes);
  const [edges, setEdges] = useState<JourneyEdge[]>(() => [
    { id: 'e_day0_day1', from: 'n_day0', to: 'n_day1' },
    { id: 'e_day1_day3', from: 'n_day1', to: 'n_day3' },
  ]);
  const [editNodeId, setEditNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

  const onPaletteDragStart = useCallback((e: React.DragEvent, t: PaletteItemType) => {
    e.dataTransfer.setData('application/x-journey-node', t);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const onCanvasDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('application/x-journey-node')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const onCanvasDrop = useCallback(
    (e: React.DragEvent) => {
      const t = e.dataTransfer.getData('application/x-journey-node') as PaletteItemType;
      if (!t) return;
      e.preventDefault();
      const viewport = viewportRef.current;
      if (!viewport) return;

      const rect = viewport.getBoundingClientRect();
      const localX = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
      const localY = (e.clientY - rect.top + viewport.scrollTop) / zoom;

      const meta = paletteMeta(t);
      const next: JourneyNode = {
        id: randomId('node'),
        type: t,
        title: `${meta.label} (шинэ)`,
        subtitle: 'Drag to reposition',
        x: localX - 160,
        y: localY - 40,
      };
      setNodes((prev) => [...prev, next]);
    },
    [zoom]
  );

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.from !== nodeId && e.to !== nodeId));
  }, []);

  const deleteEdge = useCallback((edgeId: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId));
  }, []);

  const editInitial = useMemo(() => {
    if (!editNodeId) return null;
    const n = nodes.find((x) => x.id === editNodeId);
    if (!n) return null;
    return { title: n.title, subtitle: n.subtitle, type: n.type } as const;
  }, [editNodeId, nodes]);

  const saveEdit = useCallback(
    (next: { title: string; subtitle?: string; type: PaletteItemType }) => {
      const id = editNodeId;
      if (!id) return;
      setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, ...next } : n)));
      setEditNodeId(null);
    },
    [editNodeId]
  );

  const dragStateRef = useRef<{
    nodeId: string;
    offsetX: number;
    offsetY: number;
    pointerId: number;
  } | null>(null);

  const connectStateRef = useRef<{
    fromId: string;
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);

  const onStartConnect = useCallback((e: React.PointerEvent, fromId: string) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const rect = viewport.getBoundingClientRect();
    const px = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
    const py = (e.clientY - rect.top + viewport.scrollTop) / zoom;

    connectStateRef.current = { fromId, pointerId: e.pointerId, x: px, y: py };
  }, [zoom]);

  const onConnectMove = useCallback((e: React.PointerEvent) => {
    const state = connectStateRef.current;
    if (!state) return;
    if (state.pointerId !== e.pointerId) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const px = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
    const py = (e.clientY - rect.top + viewport.scrollTop) / zoom;
    connectStateRef.current = { ...state, x: px, y: py };
  }, [zoom]);

  const onConnectEnd = useCallback(
    (e: React.PointerEvent) => {
      const state = connectStateRef.current;
      if (!state) return;
      if (state.pointerId !== e.pointerId) return;
      const fromId = state.fromId;
      connectStateRef.current = null;

      const viewport = viewportRef.current;
      if (!viewport) return;

      const rect = viewport.getBoundingClientRect();
      const px = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
      const py = (e.clientY - rect.top + viewport.scrollTop) / zoom;

      // Hit test: find a node body under pointer.
      const hit = nodes.find((n) => {
        const w = nodeWidth(n);
        const h = 210; // approximate card height
        return px >= n.x && px <= n.x + w && py >= n.y && py <= n.y + h;
      });
      if (!hit) return;
      if (hit.id === fromId) return;

      setEdges((prev) => {
        const exists = prev.some((ed) => ed.from === fromId && ed.to === hit.id);
        if (exists) return prev;
        return [...prev, { id: randomId('edge'), from: fromId, to: hit.id }];
      });
    },
    [nodes, zoom]
  );

  const onNodePointerDown = useCallback((e: React.PointerEvent, nodeId: string) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const rect = viewport.getBoundingClientRect();
    const px = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
    const py = (e.clientY - rect.top + viewport.scrollTop) / zoom;

    dragStateRef.current = {
      nodeId,
      offsetX: px - node.x,
      offsetY: py - node.y,
      pointerId: e.pointerId,
    };
  }, [nodes, zoom]);

  const onNodePointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    if (!drag) return;
    if (drag.pointerId !== e.pointerId) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const px = (e.clientX - rect.left + viewport.scrollLeft) / zoom;
    const py = (e.clientY - rect.top + viewport.scrollTop) / zoom;

    // Keep nodes in a generous bounding box to avoid losing them.
    const nextX = clamp(px - drag.offsetX, 0, 2400);
    const nextY = clamp(py - drag.offsetY, 0, 2400);

    setNodes((prev) => prev.map((n) => (n.id === drag.nodeId ? { ...n, x: nextX, y: nextY } : n)));
  }, [zoom]);

  const onNodePointerUp = useCallback((e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    if (!drag) return;
    if (drag.pointerId !== e.pointerId) return;
    dragStateRef.current = null;
  }, []);

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-200 flex flex-col bg-background text-on-background'
          : variant === 'embedded'
            ? 'flex flex-col h-full min-h-0'
            : 'flex flex-col h-full animate-in fade-in duration-500'
      }
    >
      <NodeEditModal open={!!editNodeId} initial={editInitial} onClose={() => setEditNodeId(null)} onSave={saveEdit} />

      {/* Header Section (standalone only; embedded mode avoids duplicate page header) */}
      {variant === 'standalone' || isFullscreen ? (
        <div
          className={
            isFullscreen
              ? 'shrink-0 flex justify-between items-end p-6 border-b border-outline-variant/25'
              : 'flex justify-between items-end mb-5'
          }
        >
          <div className="min-w-0 flex items-baseline gap-3 flex-wrap">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight truncate">{campaignName}</h2>
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em] whitespace-nowrap">
              Урсгалын бүтээгч · 7 хоногийн жишээ
            </span>
          </div>
          <div className="flex gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface font-bold text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 shadow-[2px_2px_0px_#d5c4ab]"
              >
                <ArrowLeft className="w-4 h-4" />
                Жагсаалт руу
              </button>
            )}
            <button className="px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface font-bold text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 shadow-[2px_2px_0px_#d5c4ab]">
              <History className="w-4 h-4" />
              Хувилбарын Түүх
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen((v) => !v)}
              className="px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface font-bold text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 shadow-[2px_2px_0px_#d5c4ab]"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              {isFullscreen ? 'Гарах' : 'Fullscreen'}
            </button>
            <button className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-extrabold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]">
              <Play className="w-4 h-4 fill-current" />
              Компанит ажилыг нийтлэх
            </button>
          </div>
        </div>
      ) : null}

      {/* Canvas Toolbar */}
      <div
        className={
          isFullscreen
            ? 'shrink-0 px-6 py-4 border-b border-outline-variant/25'
            : variant === 'embedded'
              ? 'shrink-0 mb-3'
              : 'mb-4'
        }
      >
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-2 flex flex-wrap gap-2 shadow-lg max-w-fit border-b-4">
        <div className="flex items-center gap-1 pr-4 border-r border-outline-variant">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-grab">
            <Hand className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-container bg-primary-container/20 transition-colors shadow-inner">
            <MousePointer2 className="w-5 h-5 fill-current" />
          </button>
        </div>
        <div className="flex items-center gap-2 px-4 border-r border-outline-variant">
          <div
            draggable
            onDragStart={(e) => onPaletteDragStart(e, 'trigger')}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60 active:cursor-grabbing"
            title="Canvas руу чирж тавина уу"
          >
            <Zap className="w-4 h-4 text-tertiary" />
            <span className="text-sm font-bold text-on-surface">Өдөөгч</span>
          </div>
          <div
            draggable
            onDragStart={(e) => onPaletteDragStart(e, 'condition')}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60 active:cursor-grabbing"
            title="Canvas руу чирж тавина уу"
          >
            <GitBranch className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-on-surface">Нөхцөл</span>
          </div>
          <div
            draggable
            onDragStart={(e) => onPaletteDragStart(e, 'action')}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl cursor-grab hover:bg-surface-container-high transition-all border border-dashed border-outline-variant/60 active:cursor-grabbing"
            title="Canvas руу чирж тавина уу"
          >
            <CirclePlay className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-on-surface">Үйлдэл</span>
          </div>
        </div>
        <div className="flex items-center gap-1 pl-4">
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(Number((z - 0.1).toFixed(2)), 0.5, 1.6))}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-sm font-black w-14 text-center text-on-surface-variant">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => clamp(Number((z + 0.1).toFixed(2)), 0.5, 1.6))}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className={isFullscreen ? 'flex-1 min-h-0 overflow-hidden p-6' : 'flex-1 min-h-0'}
      >
        <div
          ref={viewportRef}
          className={
            isFullscreen
              ? 'h-full w-full bg-surface-bright overflow-auto relative rounded-3xl border border-outline-variant border-b-[6px]'
              : 'h-full bg-surface-bright border border-outline-variant rounded-3xl overflow-hidden relative border-b-[6px]'
          }
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #D5C4AB 1.5px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          onDragOver={onCanvasDragOver}
          onDrop={onCanvasDrop}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-5 left-5 px-4 py-2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Drag palette items onto canvas · Drag nodes to move
            </div>
          </div>

          {/* Large logical canvas */}
          <div className="relative" style={{ width: 2800 * zoom, height: 2200 * zoom }}>
            <div className="relative origin-top-left" style={{ width: 2800, height: 2200, transform: `scale(${zoom})` }}>
              {/* Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 2800 2200" aria-hidden="true">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b4c00" opacity="0.9" />
                  </marker>
                </defs>

                {edges.map((ed) => {
                  const from = nodes.find((n) => n.id === ed.from);
                  const to = nodes.find((n) => n.id === ed.to);
                  if (!from || !to) return null;

                  const fromW = nodeWidth(from);
                  const toW = nodeWidth(to);
                  const sx = from.x + fromW;
                  const sy = from.y + 64;
                  const tx = to.x;
                  const ty = to.y + 64;
                  const dx = Math.max(80, Math.min(220, Math.abs(tx - sx) * 0.35));
                  const path = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
                  const mx = (sx + tx) / 2;
                  const my = (sy + ty) / 2;

                  return (
                    <g key={ed.id}>
                      <path d={path} stroke="#6b4c00" strokeWidth="3" fill="none" opacity="0.55" markerEnd="url(#arrow)" />
                      {/* clickable delete at midpoint (enable pointer-events locally) */}
                      <g style={{ pointerEvents: 'auto' }}>
                        <circle
                          cx={mx}
                          cy={my}
                          r={10}
                          fill="#fff7ed"
                          stroke="#d5c4ab"
                          strokeWidth="2"
                          onClick={() => deleteEdge(ed.id)}
                        />
                        <text
                          x={mx}
                          y={my + 4}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="900"
                          fill="#6b4c00"
                          style={{ userSelect: 'none', cursor: 'pointer' }}
                          onClick={() => deleteEdge(ed.id)}
                        >
                          ×
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* connecting preview */}
                {(() => {
                  const c = connectStateRef.current;
                  if (!c) return null;
                  const from = nodes.find((n) => n.id === c.fromId);
                  if (!from) return null;
                  const fromW = nodeWidth(from);
                  const sx = from.x + fromW;
                  const sy = from.y + 64;
                  const tx = c.x;
                  const ty = c.y;
                  const dx = Math.max(80, Math.min(220, Math.abs(tx - sx) * 0.35));
                  const path = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
                  return <path d={path} stroke="#6b4c00" strokeWidth="2.5" fill="none" opacity="0.35" strokeDasharray="6 6" />;
                })()}
              </svg>

              {nodes.map((n) => {
                const meta = paletteMeta(n.type);
                const Icon = meta.Icon;
                const w = nodeWidth(n);
                return (
                  <motion.div
                    key={n.id}
                    layout={false}
                    className="absolute z-10"
                    style={{ left: n.x, top: n.y, width: w }}
                  >
                    <div
                      className="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden group hover:border-primary-container transition-all border-b-4"
                      onDoubleClick={() => setEditNodeId(n.id)}
                      role="presentation"
                    >
                      <div className={meta.barCls + ' h-2 w-full'} />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={'w-7 h-7 rounded-full flex items-center justify-center shrink-0 ' + meta.bubbleCls}>
                              <Icon className={'w-4 h-4 ' + meta.chipCls} />
                            </div>
                            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest truncate">
                              {meta.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditNodeId(n.id)}
                              className="w-9 h-9 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center"
                              title="Edit"
                            >
                              <FileEdit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteNode(n.id)}
                              className="w-9 h-9 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant flex items-center justify-center"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onPointerDown={(e) => onNodePointerDown(e, n.id)}
                              onPointerMove={onNodePointerMove}
                              onPointerUp={onNodePointerUp}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low text-on-surface-variant cursor-grab active:cursor-grabbing"
                              title="Drag to move"
                            >
                              <GripVertical className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-tight">Move</span>
                            </button>
                          </div>
                        </div>

                        <h3 className="font-extrabold text-lg leading-tight text-on-surface mb-3">{n.title}</h3>

                        {n.type === 'trigger' ? (
                          <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/40 shadow-sm">
                            <Mail className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold text-on-surface leading-tight">{n.subtitle ?? '—'}</span>
                            <CheckCircle2 className="ml-auto w-5 h-5 text-primary fill-primary/10" />
                          </div>
                        ) : n.type === 'action' ? (
                          <div className="space-y-3">
                            {n.subtitle ? <p className="text-sm font-semibold text-on-surface-variant/70 italic">{n.subtitle}</p> : null}
                            <div className="w-full h-28 rounded-xl overflow-hidden relative border border-outline-variant/30">
                              <img
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400"
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-3">
                                <span className="text-[10px] font-black text-white bg-white/20 px-2 py-1 rounded backdrop-blur-md border border-white/30 uppercase tracking-tighter">
                                  Урьдчилан харах
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {n.subtitle ? <div className="text-xs font-bold text-on-surface-variant/70">{n.subtitle}</div> : null}
                            <div className="flex gap-3">
                              <div className="flex-1 bg-surface p-4 rounded-2xl border border-outline-variant/40 text-center border-b-2 shadow-sm">
                                <span className="text-sm font-black text-on-surface block mb-1">Тийм</span>
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">Дуусгах</span>
                              </div>
                              <div className="flex-1 bg-primary-container/10 p-4 rounded-2xl border-2 border-primary-container/30 text-center shadow-sm">
                                <span className="text-sm font-black text-primary block mb-1">Үгүй</span>
                                <span className="text-[10px] font-bold text-primary/70 uppercase">Үргэлжлүүлэх</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connectors */}
                    <div className="absolute left-[-10px] top-[62px] w-5 h-5 rounded-full bg-surface border-2 border-outline-variant shadow-sm flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-outline/60" />
                    </div>
                    <button
                      type="button"
                      onPointerDown={(e) => onStartConnect(e, n.id)}
                      onPointerMove={onConnectMove}
                      onPointerUp={onConnectEnd}
                      className="absolute right-[-10px] top-[62px] w-5 h-5 rounded-full bg-primary-container text-on-primary-container border-2 border-outline-variant shadow-sm flex items-center justify-center hover:opacity-90"
                      title="Connect"
                      aria-label="Connect"
                    >
                      <X className="w-3 h-3 rotate-45" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
