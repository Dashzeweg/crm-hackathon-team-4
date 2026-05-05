import React, { useMemo, useState } from "react";
import {
  LayoutGrid,
  GitMerge,
  Filter,
  Search,
  Plus,
  MoreVertical,
  GripVertical,
  X,
  Users,
  FileBarChart,
  Check,
  FileCode2,
  PenLine,
  Upload,
  ChevronRight,
  Info,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import type { SegmentSummary } from "@/src/data/segmentMocks";
import { MOCK_SEGMENTS, MOCK_FILTER_PALETTE } from "@/src/data/segmentMocks";

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={cn(
            "min-w-9 h-9 rounded-xl text-[10px] font-black transition-all border-2 border-b-[3px]",
            n === 1
              ? "bg-primary-container text-on-primary-container border-outline-variant shadow-sm"
              : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container-low",
          )}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

type CreateMode = "builder" | "expr";

function SegmentUsersModal({
  open,
  onClose,
  segment,
}: {
  open: boolean;
  onClose: () => void;
  segment: SegmentSummary | null;
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 12;

  const total = segment?.count ?? 0;
  const seed = (segment?.name ?? "").length || 1;

  const users = useMemo(() => {
    const MN_NAMES = [
      "Бат-Эрдэнэ",
      "Сарангэрэл",
      "Болормаа",
      "Энхбат",
      "Очирхүү",
      "Цэцэгмаа",
      "Дорждэрэм",
      "Мөнхбаяр",
      "Алтанзул",
      "Ганболд",
      "Оюунчимэг",
      "Түвшинбаяр",
      "Нямсүрэн",
      "Хулан",
      "Жавхлан",
      "Ариунаа",
      "Цолмон",
      "Энхтуяа",
      "Бямбасүрэн",
      "Лхагвасүрэн",
      "Цогзолмаа",
      "Нарангэрэл",
      "Эрдэнэбат",
      "Соёл-Эрдэнэ",
      "Уламбаяр",
      "Дэлгэрмаа",
      "Энхжаргал",
      "Бүрэнтөгс",
      "Сувд",
      "Чинбат",
    ];
    const MN_LAST = [
      "Б.",
      "Г.",
      "Д.",
      "Ж.",
      "М.",
      "Н.",
      "О.",
      "П.",
      "С.",
      "Т.",
      "Ц.",
      "Ч.",
      "Э.",
      "Ө.",
      "Ү.",
      "Х.",
      "Я.",
      "Ш.",
    ];
    const r = (i: number, n: number) =>
      ((seed * 9301 + 49297 + i * (n + 1)) % 233280) / 233280;
    const mk = (i: number) => {
      const first = MN_NAMES[Math.floor(r(i, 1) * MN_NAMES.length)];
      const last = MN_LAST[Math.floor(r(i, 2) * MN_LAST.length)];
      const uid = `U${(Math.floor(r(i, 3) * 9e9) + 1e9).toString(16)}`;
      const days = Math.floor(r(i, 4) * 180);
      const platform = ["iOS", "Android", "Web"][Math.floor(r(i, 5) * 3)];
      const tags: string[] = [];
      if (r(i, 6) > 0.55) tags.push("VIP");
      if (r(i, 7) > 0.7) tags.push("Active");
      if (r(i, 8) > 0.85) tags.push("Trial");
      const blocked = r(i, 9) > 0.92;
      return {
        id: uid,
        name: `${last} ${first}`,
        days,
        platform,
        tags,
        blocked,
      };
    };
    return Array.from({ length: total }, (_, i) => mk(i));
  }, [seed, total]);

  const filtered = useMemo(() => {
    if (!search) return users;
    const s = search.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(s) || u.id.toLowerCase().includes(s),
    );
  }, [search, users]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageUsers = filtered.slice((page - 1) * perPage, page * perPage);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">
              Сегментийн хэрэглэгчид
            </span>
            <span className="text-xl font-black text-on-surface">
              {segment?.name ?? "—"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container"
            aria-label="Хаах"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex-1 min-w-[220px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Нэр эсвэл UID-ээр хайх..."
                className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
              />
            </div>
            <span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">
              Нийт{" "}
              <span className="font-mono font-black text-on-surface">
                {filtered.length.toLocaleString()}
              </span>{" "}
              хэрэглэгч
            </span>
          </div>

          <div className="bg-surface-container-lowest rounded-[1.5rem] border border-outline-variant/25 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-surface/50 border-b border-outline-variant/20">
                    <th className="py-4 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                      Нэр
                    </th>
                    <th className="py-4 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-52">
                      Хэрэглэгчийн UID
                    </th>
                    <th className="py-4 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-28">
                      Платформ
                    </th>
                    <th className="py-4 px-6 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-28">
                      Бүртгэгдсэн
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-on-surface">
                  {pageUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center font-black text-xs">
                            {(
                              u.name.split(" ").slice(-1)[0]?.[0] ?? "?"
                            ).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold truncate flex items-center gap-2">
                              {u.name}
                              {u.blocked && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black border border-error/35 bg-error/10 text-error">
                                  Блоклогдсон
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">
                        {u.id}
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-on-surface-variant">
                        {u.platform}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">
                        {u.days} хоног
                      </td>
                    </tr>
                  ))}
                  {pageUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-sm font-bold text-on-surface-variant"
                      >
                        Хэрэглэгч олдсонгүй
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                className="min-w-9 h-9 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black border-b-[3px]"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              <span className="text-xs font-bold text-on-surface-variant">
                <span className="font-mono font-black text-on-surface">
                  {page}
                </span>{" "}
                /{" "}
                <span className="font-mono font-black text-on-surface">
                  {totalPages}
                </span>
              </span>
              <button
                type="button"
                className="min-w-9 h-9 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-black border-b-[3px]"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function SegmentMethodPickerModal({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (m: "filter" | "csv" | "query") => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20">
          <span className="text-lg font-black text-on-surface tracking-tight">
            Сегмент үүсгэх арга
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
            aria-label="Хаах"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid gap-3">
          {[
            {
              key: "filter" as const,
              icon: GitMerge,
              title: "Шүүлтүүрээр үүсгэх",
              desc: "Олон шүүлтүүр нэгтгэн нэг сегмент болгож үүсгэх",
            },
            {
              key: "csv" as const,
              icon: LayoutGrid,
              title: "CSV хэлбэрээр",
              desc: "Хэрэглэгчийн UID-уудыг агуулсан CSV файл байршуулж үүсгэх",
            },
            {
              key: "query" as const,
              icon: FileCode2,
              title: "Query-ээр үүсгэх",
              desc: "SQL query шууд бичиж сегмент үүсгэх",
            },
          ].map(({ key, icon: Icon, title, desc }) => (
            <button
              key={key}
              type="button"
              onClick={() => onPick(key)}
              className="text-left rounded-2xl border-2 border-outline-variant/25 bg-surface p-5 hover:border-primary-container/40 hover:bg-primary-container/5 transition-all border-b-[4px]"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-on-surface text-sm mb-1">
                    {title}
                  </div>
                  <div className="text-xs font-bold text-on-surface-variant/70 leading-snug">
                    {desc}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-outline-variant font-black text-xs text-on-surface hover:bg-surface-container-low transition-all border-b-[3px]"
          >
            Хаах
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CreateSegmentCsvModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (next: SegmentSummary) => void;
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<number | null>(null);
  const [reading, setReading] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setName("");
    setNote("");
    setFile(null);
    setRows(null);
    setReading(false);
  }, [open]);

  if (!open) return null;

  const updated = new Date().toISOString().slice(0, 10);

  const readRows = (f: File) => {
    setReading(true);
    setRows(null);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      // naive: assume first row might be header; keep at least 0
      const computed = Math.max(0, lines.length - 1);
      setRows(computed);
      setReading(false);
    };
    reader.onerror = () => {
      setReading(false);
      setRows(null);
    };
    reader.readAsText(f);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">
              Сегмент · CSV
            </span>
            <span className="text-lg font-black text-on-surface tracking-tight">
              CSV файл байршуулж үүсгэх
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
            aria-label="Хаах"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                Сегментийн нэр <span className="text-error">*</span>
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ж: Найзын бүртгэл (CSV)"
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                CSV файл <span className="text-error">*</span>
              </span>
              <div className="mt-2 rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-4 border-b-[4px]">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div className="min-w-[220px]">
                    <div className="text-xs font-extrabold text-on-surface">
                      {file ? file.name : "Файл сонгоогүй"}
                    </div>
                    <div className="text-[11px] font-bold text-on-surface-variant/70">
                      UID жагсаалттай CSV (1 багана эсвэл header-тэй байж болно)
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-[10px] font-black uppercase cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Файл сонгох
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setFile(f);
                        if (f) readRows(f);
                        else setRows(null);
                      }}
                    />
                  </label>
                </div>

                <div className="mt-3 text-[11px] font-bold text-on-surface-variant">
                  {reading ? (
                    <span className="font-mono">Reading…</span>
                  ) : rows != null ? (
                    <>
                      Ойролцоогоор{" "}
                      <span className="font-mono font-black text-on-surface">
                        {rows.toLocaleString()}
                      </span>{" "}
                      мөр
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                 тэмдэглэл
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Тэмдэглэл…"
                rows={3}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px] resize-none"
              />
            </label>
          </div>
        </div>

        <div className="px-8 pb-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
          >
            Болих
          </button>
          <button
            type="button"
            disabled={!name.trim() || !file}
            onClick={() => {
              if (!file) return;
              const next: SegmentSummary = {
                name: name.trim(),
                type: "CSV",
                updated,
                note,
                count: rows ?? undefined,
                file: {
                  name: file.name,
                  size: file.size,
                  rows: rows ?? 0,
                },
              };
              onCreate(next);
              onClose();
            }}
            className={cn(
              "px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_#6b4c00]",
              !name.trim() || !file
                ? "bg-outline-variant/30 text-on-surface-variant cursor-not-allowed shadow-none"
                : "bg-primary-container text-on-primary-container",
            )}
          >
            <Check className="w-4 h-4" />
            Үүсгэх
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CreateSegmentQueryModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (next: SegmentSummary) => void;
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sql, setSql] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ count: number; ms: number } | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setName("");
    setNote("");
    setSql("SELECT line_user_id AS line_user_key_id\nFROM `project.dataset.table`\nWHERE 1=1");
    setTesting(false);
    setTestResult(null);
  }, [open]);

  if (!open) return null;

  const updated = new Date().toISOString().slice(0, 10);

  const runTest = () => {
    setTesting(true);
    setTestResult(null);
    window.setTimeout(() => {
      setTesting(false);
      setTestResult({
        count: 120 + Math.floor(Math.random() * 900),
        ms: 180 + Math.floor(Math.random() * 380),
      });
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">
              Сегмент · Query
            </span>
            <span className="text-lg font-black text-on-surface tracking-tight">
              Query бичиж үүсгэх
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={runTest}
              disabled={testing || !sql.trim()}
              className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low disabled:opacity-50"
            >
              <FileBarChart className="w-4 h-4" />
              {testing ? "Тест…" : "Тест"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-surface-container ml-2"
              aria-label="Хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {testResult && (
            <div className="rounded-2xl border border-primary-container/30 bg-primary-container/10 p-4 text-xs font-bold text-on-surface flex items-center gap-3">
              <Users className="w-4 h-4 text-primary" />
              Ойролцоогоор хэрэглэгч:{" "}
              <span className="font-mono font-black text-on-surface text-sm">
                {testResult.count.toLocaleString()}
              </span>
              <span className="ml-auto font-mono text-[10px] text-on-surface-variant">
                {testResult.ms} ms
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                Сегментийн нэр <span className="text-error">*</span>
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ж: Битүүмжлэгдээгүй (Query)"
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                SQL Query <span className="text-error">*</span>
              </span>
              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                rows={10}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-[12px] font-mono text-on-surface outline-none focus:border-primary-container border-b-[4px] resize-none"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                 тэмдэглэл
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Тэмдэглэл…"
                rows={3}
                className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px] resize-none"
              />
            </label>
          </div>
        </div>

        <div className="px-8 pb-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
          >
            Болих
          </button>
          <button
            type="button"
            disabled={!name.trim() || !sql.trim()}
            onClick={() => {
              const next: SegmentSummary = {
                name: name.trim(),
                type: "Query",
                updated,
                note,
                sql,
                count: testResult?.count,
              };
              onCreate(next);
              onClose();
            }}
            className={cn(
              "px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_#6b4c00]",
              !name.trim() || !sql.trim()
                ? "bg-outline-variant/30 text-on-surface-variant cursor-not-allowed shadow-none"
                : "bg-primary-container text-on-primary-container",
            )}
          >
            <Check className="w-4 h-4" />
            Үүсгэх
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SegmentFilterDetailModal({
  open,
  onClose,
  segment,
  onSave,
  onOpenUsers,
}: {
  open: boolean;
  onClose: () => void;
  segment: SegmentSummary | null;
  onSave: (next: SegmentSummary) => void;
  onOpenUsers: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    count: number;
    ms: number;
  } | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setEditing(false);
    setName(segment?.name ?? "");
    setNote(segment?.note ?? "");
    setTestResult(segment?.count ? { count: segment.count, ms: 200 } : null);
    setTesting(false);
  }, [open, segment]);

  if (!open) return null;

  const runTest = () => {
    setTesting(true);
    setTestResult(null);
    const base = segment?.count ?? 100;
    window.setTimeout(() => {
      setTesting(false);
      setTestResult({
        count: Math.max(1, base + Math.floor(Math.random() * 40 - 20)),
        ms: 180 + Math.floor(Math.random() * 240),
      });
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-2xl border-b-[6px] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div>
            <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em] block">
              Сегмент
            </span>
            <span className="text-xl font-black text-on-surface">
              {editing ? "Засах" : "Дэлгэрэнгүй"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={runTest}
              disabled={testing}
              className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low"
            >
              <FileBarChart className="w-4 h-4" />
              {testing ? "Тест…" : "Тест"}
            </button>
            <button
              type="button"
              onClick={onOpenUsers}
              className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low"
            >
              <Users className="w-4 h-4" />
              Хэрэглэгчид
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-surface-container ml-2"
              aria-label="Хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-8 space-y-5">
          {testResult && (
            <div className="rounded-2xl border border-primary-container/30 bg-primary-container/10 p-4 text-xs font-bold text-on-surface flex items-center gap-3">
              <Users className="w-4 h-4 text-primary" />
              Одоогийн хэрэглэгчийн тоо:{" "}
              <span className="font-mono font-black text-on-surface text-sm">
                {testResult.count.toLocaleString()}
              </span>
              <span className="ml-auto font-mono text-[10px] text-on-surface-variant">
                {testResult.ms} ms
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-8 gap-y-4 text-sm">
            <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
              Сегментийн нэр
            </span>
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px]"
              />
            ) : (
              <span className="font-extrabold text-on-surface break-words">
                {segment?.name ?? "—"}
              </span>
            )}

            <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
              Төрөл
            </span>
            <span className="font-extrabold text-on-surface">
              {segment?.type ?? "—"}
            </span>

            <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
              Шинэчилсэн
            </span>
            <span className="font-mono text-xs font-bold text-on-surface-variant">
              {segment?.updated ?? "—"}
            </span>

            <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
               тэмдэглэл
            </span>
            {editing ? (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold outline-none focus:border-primary-container border-b-[4px] resize-none"
              />
            ) : (
              <span className="text-on-surface-variant font-bold italic text-xs">
                {segment?.note?.trim() ? segment.note : "— хоосон —"}
              </span>
            )}

            {segment?.type === "Query" && (
              <>
                <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
                  Query
                </span>
                <pre className="rounded-2xl bg-inverse-surface/5 border border-outline-variant/25 p-4 text-[11px] font-mono text-on-surface overflow-x-auto">
                  {segment.sql ?? "—"}
                </pre>
              </>
            )}

            {segment?.type === "CSV" && (
              <>
                <span className="font-black text-outline text-[10px] uppercase tracking-wider pt-1">
                  CSV
                </span>
                <div className="text-xs font-bold text-on-surface-variant">
                  {segment.file ? (
                    <>
                      <span className="font-extrabold text-on-surface">
                        {segment.file.name}
                      </span>{" "}
                      ·{" "}
                      <span className="font-mono">
                        {segment.file.rows.toLocaleString()}
                      </span>{" "}
                      мөр
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="px-8 pb-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
          >
            Хаах
          </button>
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setName(segment?.name ?? "");
                  setNote(segment?.note ?? "");
                }}
                className="px-6 py-3 rounded-xl border-2 border-outline-variant font-black text-xs"
              >
                Болих
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!segment) return;
                  onSave({
                    ...segment,
                    name: name.trim() || segment.name,
                    note,
                  });
                  setEditing(false);
                }}
                className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_#6b4c00]"
              >
                <Check className="w-4 h-4" />
                Хадгалах
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_#6b4c00]"
            >
              <PenLine className="w-4 h-4" />
              Засах
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CreateSegmentOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<CreateMode>("builder");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-background flex flex-col animate-in fade-in duration-200">
      <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-inverse-surface text-inverse-on-surface">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/10"
          aria-label="Буцах"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-black opacity-90">
          <span>Сегмент</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-container">Шинэ үүсгэх</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="hidden sm:flex px-4 py-2 rounded-xl bg-white/10 text-[10px] font-black uppercase items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Хэрэглэгчид
          </button>
          <button
            type="button"
            className="hidden sm:flex px-4 py-2 rounded-xl bg-white/10 text-[10px] font-black uppercase items-center gap-2"
          >
            <FileBarChart className="w-4 h-4" />
            Тоо тооцоолох
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-[10px] font-black uppercase flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Хадгалах
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-72 shrink-0 border-r border-outline-variant bg-surface-container-low flex flex-col p-4 gap-3">
          <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] px-1">
            Сегмент шүүлтүүр
          </p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
            <Search className="w-4 h-4 text-on-surface-variant" />
            <input
              placeholder="Шүүлтүүр хайх..."
              className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
            />
            <Filter className="w-4 h-4 text-on-surface-variant" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
            {MOCK_FILTER_PALETTE.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-surface-container-lowest cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4 text-outline shrink-0" />
                <span className="text-xs font-bold text-on-surface truncate">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl space-y-8">
            <div className="rounded-[1.75rem] border-2 border-outline-variant/25 bg-surface-container-lowest overflow-hidden border-b-[6px] shadow-sm">
              <div className="px-6 py-5 border-b border-outline-variant/15 bg-surface-container-low">
                <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                  Үндсэн мэдээлэл
                </div>
                <div className="mt-1 text-lg font-black text-on-surface tracking-tight">
                  Сегмент үүсгэх
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block sm:col-span-2">
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                    Сегментийн нэр <span className="text-error">*</span>
                  </span>
                  <input
                    placeholder="Сегментийн нэрээ оруулна уу"
                    className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold text-on-surface outline-none focus:border-primary-container border-b-[4px]"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider inline-flex items-center gap-2">
                    Авах дээд хязгаар <Info className="w-3.5 h-3.5" />
                  </span>
                  <input
                    placeholder="Тоог оруулах..."
                    className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold border-b-[4px] outline-none focus:border-primary-container"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                     тэмдэглэл
                  </span>
                  <textarea
                    placeholder="Тэмдэглэл оруулах..."
                    rows={3}
                    className="mt-2 w-full rounded-2xl border-2 border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm font-bold border-b-[4px] outline-none focus:border-primary-container resize-none"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[1.75rem] border-2 border-outline-variant/25 bg-surface-container-lowest overflow-hidden border-b-[6px] shadow-sm">
              <div className="px-6 py-5 border-b border-outline-variant/15 bg-surface-container-low flex flex-wrap items-center gap-4 justify-between">
                <div className="min-w-[220px]">
                  <div className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                    Нөхцөл <span className="text-error">*</span>
                  </div>
                  <div className="mt-1 text-sm font-black text-on-surface">
                    Сегментийн дүрэм / шүүлтүүр
                  </div>
                </div>

                <div className="flex rounded-2xl border-2 border-outline-variant/25 p-1 bg-surface-container-lowest">
                  <button
                    type="button"
                    onClick={() => setMode("builder")}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all border-2",
                      mode === "builder"
                        ? "bg-primary-container text-on-primary-container shadow-sm border-outline-variant/30"
                        : "text-on-surface-variant border-transparent hover:bg-surface-container-low",
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("expr")}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all border-2",
                      mode === "expr"
                        ? "bg-primary-container text-on-primary-container shadow-sm border-outline-variant/30"
                        : "text-on-surface-variant border-transparent hover:bg-surface-container-low",
                    )}
                  >
                    <FileCode2 className="w-4 h-4" />
                    Илэрхийлэл
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-outline uppercase tracking-wider">
                      Operator
                    </span>
                    <div className="flex rounded-xl border-2 border-outline-variant/25 overflow-hidden text-[10px] font-black bg-surface-container-lowest">
                      {(["AND", "OR", "EXCEPT"] as const).map((op, i) => (
                        <button
                          key={op}
                          type="button"
                          className={cn(
                            "px-3 py-2",
                            i === 0
                              ? "bg-primary-container text-on-primary-container"
                              : "bg-transparent text-on-surface-variant hover:bg-surface-container-low",
                          )}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl border-2 border-outline-variant/25 bg-surface-container-lowest text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Шүүлт нэмэх
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl border-2 border-outline-variant/25 bg-surface-container-lowest text-[10px] font-black uppercase flex items-center gap-2 hover:bg-surface-container-low transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Групп нэмэх
                    </button>
                  </div>
                </div>

                {mode === "builder" ? (
                  <div className="rounded-2xl border-2 border-dashed border-outline-variant/30 bg-surface-container-lowest p-8">
                    <div className="text-center">
                      <div className="text-sm font-black text-on-surface">
                        Зүүн талаас шүүлтүүр чирж эндээ оруулна уу
                      </div>
                      <div className="mt-2 text-xs font-bold text-on-surface-variant/70 italic">
                        (Builder нь mock UI — одоогоор дүрэм хадгалах логик
                        холбогдоогүй)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-outline-variant/25 bg-inverse-surface/5 overflow-hidden">
                    <div className="px-4 py-3 border-b border-outline-variant/15 bg-surface-container-low flex items-center justify-between gap-3">
                      <span className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                        Query / Expression
                      </span>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-xl border-2 border-outline-variant/25 bg-surface-container-lowest text-[10px] font-black uppercase hover:bg-surface-container-low transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="p-5 text-[12px] font-mono text-on-surface overflow-x-auto custom-scrollbar">
                      filters.
                      <span className="text-primary font-bold">include</span>(
                      <span className="text-secondary">
                        &quot;Сэдэлжүүлэлт_Class2&quot;
                      </span>
                      ) <span className="text-error font-bold">AND</span>{" "}
                      filters.
                      <span className="text-primary font-bold">exclude</span>(
                      <span className="text-secondary">
                        &quot;Унтсан_хэрэглэгч&quot;
                      </span>
                      )
                    </pre>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold text-on-surface-variant/75">
                  <span className="inline-flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Preview UI only · Backend rules not wired
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    Updated just now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Segments() {
  const [methodOpen, setMethodOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [queryOpen, setQueryOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [selected, setSelected] = useState<SegmentSummary | null>(null);
  const [segments, setSegments] = useState<SegmentSummary[]>(
    () => MOCK_SEGMENTS,
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-y-auto pb-12 custom-scrollbar">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">
            Сегмент
          </h2>
          <p className="text-sm font-bold text-on-surface-variant/70 max-w-xl">
            Хэрэглэгчдийг шүүж бүлэглэн түгээлт хийх сегментүүд
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-[4px] hover:bg-surface-container-high"
          >
            <LayoutGrid className="w-4 h-4" />
            Загвар
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-surface-container-lowest border-2 border-outline-variant/30 text-on-surface font-black text-[10px] uppercase rounded-xl flex items-center gap-2 border-b-[4px] hover:bg-surface-container-high"
          >
            <GitMerge className="w-4 h-4" />
            Шүүлтүүр Удирдлага
          </button>
          <button
            type="button"
            onClick={() => setMethodOpen(true)}
            className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#6b4c00]"
          >
            <Plus className="w-4 h-4" />
            Шинэ үүсгэх
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 p-2 rounded-2xl bg-surface-container-low border border-outline-variant/20 border-b-[3px]">
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[10px] font-black uppercase flex items-center gap-2 shadow-sm"
        >
          <Filter className="w-4 h-4" />
          Шүүлт
        </button>
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/25">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            placeholder="Сегментийн нэрээр хайх..."
            className="flex-1 bg-transparent text-xs font-bold outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[10px] font-black uppercase flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Хайх
        </button>
        <span className="text-[10px] font-black text-outline uppercase whitespace-nowrap ml-auto pr-2">
          Мөр{" "}
          <select
            defaultValue={25}
            className="ml-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1 font-black text-on-surface text-[10px]"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </span>
      </div>

      <div className="bg-surface-container-lowest rounded-[2rem] shadow-xl border border-outline-variant/30 overflow-hidden border-b-[6px]">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-surface/50 border-b border-outline-variant/20">
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em]">
                  Сегментийн нэр
                </th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-40">
                  Төрөл
                </th>
                <th className="py-5 px-8 text-[10px] font-black text-outline uppercase tracking-[0.2em] w-44">
                  Шинэчилсэн
                </th>
                <th className="w-16" />
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-on-surface">
              {segments.map((row) => (
                <tr
                  key={row.name}
                  onClick={() => {
                    setSelected(row);
                    setFilterOpen(true);
                  }}
                  className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer h-[64px]"
                >
                  <td className="py-4 px-8 font-extrabold tracking-tight">
                    {row.name}
                  </td>
                  <td className="py-4 px-8">
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase border border-outline-variant/30 bg-surface-container">
                      {row.type}
                    </span>
                  </td>
                  <td className="py-4 px-8 font-mono text-xs text-on-surface-variant">
                    {row.updated}
                  </td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-surface-container text-outline"
                      aria-label="Цэс"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination />

      <SegmentMethodPickerModal
        open={methodOpen}
        onClose={() => setMethodOpen(false)}
        onPick={(m) => {
          setMethodOpen(false);
          if (m === "filter") setCreateOpen(true);
          if (m === "csv") setCsvOpen(true);
          if (m === "query") setQueryOpen(true);
        }}
      />
      <CreateSegmentCsvModal
        open={csvOpen}
        onClose={() => setCsvOpen(false)}
        onCreate={(next) => setSegments((prev) => [next, ...prev])}
      />
      <CreateSegmentQueryModal
        open={queryOpen}
        onClose={() => setQueryOpen(false)}
        onCreate={(next) => setSegments((prev) => [next, ...prev])}
      />
      <SegmentFilterDetailModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        segment={selected}
        onOpenUsers={() => setUsersOpen(true)}
        onSave={(next) => {
          setSegments((prev) =>
            prev.map((s) => (s.name === selected?.name ? next : s)),
          );
          setSelected(next);
        }}
      />
      <SegmentUsersModal
        open={usersOpen}
        onClose={() => setUsersOpen(false)}
        segment={selected}
      />
      <CreateSegmentOverlay
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
}
