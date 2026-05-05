/* Modals: DeliveryDetail, Reports, SegmentFilterDetail, SegmentMethodPicker */

const DeliveryDetailModal = ({ delivery, onClose, onOpenReports }) => {
  if (!delivery) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 880 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">Сегмент Тарилт</span>
              <span className="modal-title-sub">Дэлгэрэнгүй</span>
            </div>
            <div className="modal-header-actions">
              <button className="btn btn-sm" onClick={() => onOpenReports(delivery)}>
                <Icon name="report" className="icon-sm" /> Тайлан
              </button>
              <button className="btn btn-sm">
                <Icon name="flask" className="icon-sm" /> Тэст тарилт
              </button>
              <button className="modal-close" onClick={onClose}>
                <Icon name="close" />
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="field-grid">
              <div className="field-label">Төлөв</div>
              <div className="field-value">
                <span className={"badge " + (delivery.status === 'reserved' ? 'badge-reserved' : 'badge-draft')}>
                  {delivery.status === 'reserved' ? 'Захиалсан' : 'Ноорог'}
                </span>
              </div>

              <div className="field-label">Тарилтын нэр</div>
              <div className="field-value">{delivery.name}</div>

              <div className="field-label">Сегмент</div>
              <div className="field-value">
                <a>{delivery.segment}</a>
              </div>

              <div className="field-label">Хуваарь</div>
              <div className="field-value mono">{delivery.schedule}</div>

              <div className="field-label">Тарилтын мессеж 1</div>
              <div className="field-value"><a>{delivery.message}</a></div>

              <div className="field-label">Нэмэлт параметр</div>
              <div className="field-value"><span className="empty">— тохируулаагүй —</span></div>

              <div className="field-label">Хүлээгдэж буй тоо</div>
              <div className="field-value mono">≈ 1,248 хэрэглэгч</div>

              <div className="field-label">Илгээгч</div>
              <div className="field-value">TokTok CS Аккаунт</div>

              <div className="field-label"> тэмдэглэл</div>
              <div className="field-value"><span className="empty">— хоосон —</span></div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
            <button className="btn btn-primary">
              <Icon name="edit" className="icon-sm" /> Засах
            </button>
          </div>
        </div>
        <PreviewPane variant={delivery.messageType || 'flex'} />
      </div>
    </div>
  );
};

const PreviewPane = ({ variant = 'flex' }) => (
  <div className="preview-pane">
    <div className="preview-head">
      <Icon name="phone" className="icon-sm" /> Урьдчилсан харагдац
    </div>
    <div className="preview-body">
      <div className="phone">
        <div className="phone-screen">
          <div className="phone-statusbar">
            <span>9:41</span>
            <span>●  ▴  ▮</span>
          </div>
          <div className="phone-chathead">
            <div className="phone-avatar">T</div>
            <div>
              <div className="phone-chathead-name">TokTok Хөтөч</div>
              <div style={{fontSize: 9, color: '#71717A'}}>албан ёсны акаунт</div>
            </div>
          </div>
          <div className="phone-conv">
            {variant === 'flex' && (
              <div className="phone-msg flex">
                <div className="flex-hero">
                  Хаврын <span style={{color: '#FFE76A'}}>50 хүний</span><br/>
                  <span style={{fontSize: 14}}>тусгай тэмдэглэл</span>
                </div>
                <div className="flex-body">
                  Зөв хариулсан <strong>50 хүнд</strong> манай шинэ бүтээгдэхүүний бэлэг!
                </div>
                <div className="flex-prod">
                  <div className="flex-prod-cell">No.1 шорт</div>
                  <div className="flex-prod-cell">comfort</div>
                  <div className="flex-prod-cell">light run</div>
                  <div className="flex-prod-cell">recovery</div>
                </div>
              </div>
            )}
            {variant === 'image' && (
              <div className="phone-msg" style={{padding: 0, width: '88%'}}>
                <div style={{height: 120, background: 'repeating-linear-gradient(45deg, oklch(0.92 0.02 195) 0 6px, oklch(0.88 0.03 195) 6px 7px)', borderRadius: '10px 10px 0 0', display: 'grid', placeItems: 'center', color: 'var(--ink-3)', fontSize: 9}}>
                  ЗУРАГ ОРНО
                </div>
                <div style={{padding: 8, fontSize: 10}}>Шинэ бүтээгдэхүүний урьдчилсан санал</div>
              </div>
            )}
            {variant === 'message' && (
              <div className="phone-msg">
                <div style={{fontWeight: 600, marginBottom: 4}}>Сайн байна уу!</div>
                Энэ долоо хоногт онцгой санал бэлдлээ. Дэлгэрэнгүй мэдээлэл доорх линк дээр.
              </div>
            )}
            {variant === 'empty' && (
              <div className="phone-msg" style={{color: 'var(--ink-4)', fontStyle: 'italic'}}>
                Мессеж сонгогдоогүй байна
              </div>
            )}
            <div className="phone-msg" style={{alignSelf: 'flex-end', background: 'oklch(0.85 0.10 145)', color: 'var(--ink)'}}>
              Сонирхолтой!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------- Reports ---------------- */
const ReportsModal = ({ delivery, onClose }) => {
  const [range, setRange] = React.useState('Энэ сар');
  if (!delivery) return null;
  const ranges = ['Сүүлийн 7 хоног', 'Сүүлийн 14 хоног', '1 сар', '3 сар', '6 сар', '1 жил', 'Энэ сар', 'Өнгөрсөн сар'];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 880 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">Сегмент Тарилт</span>
              <span className="modal-title-sub">Тайлан</span>
            </div>
            <div className="modal-header-actions">
              <button className="modal-close" onClick={onClose}>
                <Icon name="close" />
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div style={{ marginBottom: 6, fontSize: 12, color: 'var(--ink-3)' }}>Тарилтын нэр</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>{delivery.name}</div>

            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Тарилтын үр дүн
            </div>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-label">Илгээсэн</div>
                <div className="stat-value">1,248</div>
              </div>
              <div className="stat">
                <div className="stat-label">Нээсэн <Icon name="info" className="icon-sm" /></div>
                <div className="stat-value">1,089</div>
              </div>
              <div className="stat">
                <div className="stat-label">Нээсэн % <Icon name="info" className="icon-sm" /></div>
                <div className="stat-value">87.2<span className="unit">%</span></div>
              </div>
              <div className="stat">
                <div className="stat-label">Дарсан</div>
                <div className="stat-value">412</div>
              </div>
              <div className="stat">
                <div className="stat-label">CTR</div>
                <div className="stat-value">33.0<span className="unit">%</span></div>
              </div>
              <div className="stat">
                <div className="stat-label">CV тоо</div>
                <div className="stat-value">38</div>
              </div>
              <div className="stat">
                <div className="stat-label">CVR</div>
                <div className="stat-value">3.05<span className="unit">%</span></div>
              </div>
            </div>
            <div className="note" style={{ marginTop: 8 }}>
              * Ижил нэртэй өмнөх тарилтуудын бүх үр дүн өчигдрийн өдөр хүртэл нэгтгэгдсэн.
            </div>

            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 22, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              Аналитик
            </div>
            <div className="range-chips">
              {ranges.map(r => (
                <button key={r} className={"range-chip" + (range === r ? " active" : "")} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
            <div className="date-row">
              <div className="date-input"><Icon name="calendar" className="icon-sm" /> 2026-04-28</div>
              <span style={{ color: 'var(--ink-4)' }}>—</span>
              <div className="date-input"><Icon name="calendar" className="icon-sm" /> 2026-05-04</div>
              <button className="btn btn-sm"><Icon name="search" className="icon-sm" /></button>
              <button className="btn btn-sm"><Icon name="download" className="icon-sm" /> Татах</button>
            </div>
            <div className="chart">
              <ChartMock />
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartMock = () => {
  // Simple SVG line chart placeholder
  const points = [10, 22, 18, 45, 38, 60, 52, 70, 65, 80, 72, 88];
  const w = 760, h = 180, pad = 24;
  const max = 100;
  const path = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - (p / max) * (h - pad * 2);
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  const area = path + ` L${(w - pad).toFixed(1)},${h - pad} L${pad},${h - pad}Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" style={{ display: 'block' }}>
      {[0, 25, 50, 75, 100].map(g => {
        const y = h - pad - (g / max) * (h - pad * 2);
        return <line key={g} x1={pad} x2={w - pad} y1={y} y2={y} stroke="oklch(0.93 0.005 90)" strokeWidth="1" />;
      })}
      <path d={area} fill="oklch(0.95 0.03 195)" opacity="0.5" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" />
      {points.map((p, i) => {
        const x = pad + (i / (points.length - 1)) * (w - pad * 2);
        const y = h - pad - (p / max) * (h - pad * 2);
        return <circle key={i} cx={x} cy={y} r="3" fill="var(--accent)" />;
      })}
    </svg>
  );
};

/* ---------------- Segment Filter Detail (read + edit) ---------------- */
const SegmentFilterModal = ({ open, onClose, segment, onSave, onShowUsers }) => {
  const seg = segment || { name: 'Шинэ-Дамба_UID', type: 'Filter', count: 1, updated: '2025-10-09', sql: "SELECT\n  DISTINCT id AS line_user_key_id\nFROM\n  'AutoLine_cs_staging.line_users'\nWHERE\n  id = 14", note: '' };
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(seg.name);
  const [note, setNote] = React.useState(seg.note || '');
  const [testing, setTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      setEditing(false);
      setName(seg.name);
      setNote(seg.note || '');
      setTestResult({ count: seg.count || 0, ms: 200 });
    }
  }, [open, segment]);

  if (!open) return null;

  const runTest = () => {
    setTesting(true); setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      const base = seg.count || 100;
      setTestResult({ count: base + Math.floor(Math.random()*40 - 20), ms: 180 + Math.floor(Math.random()*240) });
    }, 700);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 720 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">Сегмент шүүлтүүр</span>
              <span className="modal-title-sub">{editing ? 'Засах' : 'Дэлгэрэнгүй'}</span>
            </div>
            <div className="modal-header-actions">
              <button className="btn btn-sm" onClick={runTest} disabled={testing}>
                {testing ? <span className="spinner"></span> : <Icon name="flask" className="icon-sm" />}
                Тест
              </button>
              <button className="btn btn-sm" onClick={onShowUsers}><Icon name="users" className="icon-sm" /> Хэрэглэгчид</button>
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body">
            {testResult && (
              <div style={{
                marginBottom: 14,
                background: 'var(--accent-soft)',
                border: '1px solid oklch(0.85 0.05 195)',
                color: 'var(--accent-ink)',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12.5,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Icon name="users" className="icon-sm" />
                Одоогийн хэрэглэгчийн тоо: <strong className="mono" style={{fontSize: 14}}>{testResult.count.toLocaleString()}</strong>
                <span className="right mono muted" style={{ fontSize: 11 }}>{testResult.ms} ms</span>
              </div>
            )}
            <div className="field-grid">
              <div className="field-label">Шүүлтүүрийн нэр</div>
              <div className="field-value">
                {editing ? (
                  <input className="form-input" value={name} onChange={(e)=>setName(e.target.value)} style={{maxWidth: 360}} />
                ) : seg.name}
              </div>

              <div className="field-label">Төрөл</div>
              <div className="field-value">
                <span className="badge" style={{background:'var(--surface-2)', color:'var(--ink-2)', borderColor:'var(--border)'}}>{seg.type}</span>
              </div>

              <div className="field-label">Агуулга</div>
              <div className="field-value">
                <div style={{ marginBottom: 6 }}>Шүүлтүүрийн query</div>
                <pre className="sql">{seg.sql || "SELECT\n  DISTINCT id AS line_user_key_id\nFROM\n  'AutoLine_cs_staging.line_users'"}</pre>
              </div>

              <div className="field-label">Шинэчилсэн</div>
              <div className="field-value mono">{seg.updated}</div>

              <div className="field-label"> тэмдэглэл</div>
              <div className="field-value">
                {editing ? (
                  <textarea className="form-input form-textarea" value={note} onChange={(e)=>setNote(e.target.value)} />
                ) : (note ? note : <span className="empty">— хоосон —</span>)}
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
            {editing ? (
              <>
                <button className="btn" onClick={()=>{ setEditing(false); setName(seg.name); setNote(seg.note||''); }}>Болих</button>
                <button className="btn btn-accent" onClick={()=>{ onSave && onSave({ ...seg, name, note }); setEditing(false); }}>
                  <Icon name="check" className="icon-sm" /> Хадгалах
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={()=>setEditing(true)}><Icon name="edit" className="icon-sm" /> Засах</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Method Picker ---------------- */
const SegmentMethodPicker = ({ open, onClose, onPick }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div>
              <span className="modal-title">Сегмент үүсгэх арга</span>
            </div>
            <div className="modal-header-actions">
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body">
            <div className="method-grid">
              <div className="method-card" onClick={() => onPick('filter')}>
                <div className="method-icon"><Icon name="venn" className="icon-lg" /></div>
                <div className="method-title">Шүүлтүүрээр үүсгэх</div>
                <div className="method-desc">Олон шүүлтүүр нэгтгэн нэг сегмент болгож үүсгэх</div>
              </div>
              <div className="method-card" onClick={() => onPick('csv')}>
                <div className="method-icon"><Icon name="csv" className="icon-lg" /></div>
                <div className="method-title">CSV хэлбэрээр</div>
                <div className="method-desc">Хэрэглэгчийн UID-уудыг агуулсан CSV файл байршуулж үүсгэх</div>
              </div>
              <div className="method-card" onClick={() => onPick('query')}>
                <div className="method-icon"><Icon name="pencil-doc" className="icon-lg" /></div>
                <div className="method-title">Query-ээр үүсгэх</div>
                <div className="method-desc">SQL query шууд бичиж сегмент үүсгэх</div>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- CSV Upload Modal ---------------- */
const SegmentCSVModal = ({ open, onClose, onSave, initial, onShowUsers }) => {
  const isEdit = !!initial;
  const [name, setName] = React.useState('');
  const [note, setNote] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setName(initial?.name || '');
      setNote(initial?.note || '');
      setFile(initial?.file || null);
      setTestResult(initial ? { count: initial.count, ms: 180 } : null);
      setTesting(false);
    }
  }, [open, initial]);

  if (!open) return null;

  const pickFile = (f) => {
    if (!f) return;
    setFile({ name: f.name, size: f.size, rows: Math.max(1, Math.round(f.size / 38)) });
    setTestResult(null);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const runTest = () => {
    setTesting(true); setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult({ count: file?.rows || Math.floor(500 + Math.random() * 4000), ms: 180 + Math.floor(Math.random() * 240) });
    }, 700);
  };

  const fmt = (b) => b > 1024*1024 ? (b/1024/1024).toFixed(2)+' MB' : (b/1024).toFixed(1)+' KB';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 680 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">{isEdit ? 'Сегмент засах' : 'Сегмент үүсгэх'}</span>
              <span className="modal-title-sub">CSV хэлбэрээр</span>
            </div>
            <div className="modal-header-actions">
              {isEdit && <button className="btn btn-sm" onClick={onShowUsers}><Icon name="users" className="icon-sm" /> Хэрэглэгчид</button>}
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <label className="form-label">Сегментийн нэр <span className="req">*</span></label>
              <input className="form-input" placeholder="Сегментийн нэрээ оруулна уу"
                value={name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div className="form-row">
              <label className="form-label">CSV файл <span className="req">*</span></label>
              <input ref={inputRef} type="file" accept=".csv" hidden
                onChange={(e)=>pickFile(e.target.files?.[0])} />

              {!file ? (
                <div
                  onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
                  onDragLeave={()=>setDragOver(false)}
                  onDrop={onDrop}
                  onClick={()=>inputRef.current?.click()}
                  style={{
                    border: '1.5px dashed ' + (dragOver ? 'var(--accent)' : 'var(--border-strong)'),
                    background: dragOver ? 'var(--accent-soft)' : 'var(--surface-2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 120ms ease',
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', margin: '0 auto 10px', color: 'var(--accent-2)' }}>
                    <Icon name="upload" className="icon-lg" />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>
                    CSV файл чирэх эсвэл дарж сонгоно уу
                  </div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    Хэрэглэгчийн UID-уудыг агуулсан UTF-8 CSV · хамгийн ихдээ 50MB
                  </div>
                </div>
              ) : (
                <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 12, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center' }}>
                    <Icon name="csv" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {fmt(file.size)} · ≈ {file.rows.toLocaleString()} мөр
                    </div>
                  </div>
                  <button className="btn btn-sm" onClick={()=>inputRef.current?.click()}>
                    <Icon name="upload" className="icon-sm" /> Солих
                  </button>
                  <button className="btn btn-icon" onClick={()=>setFile(null)} title="Устгах">
                    <Icon name="trash" className="icon-sm" />
                  </button>
                </div>
              )}

              <div className="note" style={{ marginTop: 8 }}>
                <Icon name="info" className="icon-sm" /> Эхний мөр толгой (header) байх ёстой. <a>Загвар татах</a>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">UID багана</label>
              <select className="form-input" defaultValue="line_user_id" style={{ maxWidth: 280 }}>
                <option value="line_user_id">line_user_id</option>
                <option value="uid">uid</option>
                <option value="user_id">user_id</option>
              </select>
            </div>

            <div className="form-row">
              <label className="form-label"> тэмдэглэл</label>
              <textarea className="form-input form-textarea"
                placeholder="Тэмдэглэл оруулах..."
                value={note} onChange={(e)=>setNote(e.target.value)}></textarea>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" style={{marginRight: 'auto'}} onClick={runTest} disabled={!file || testing}>
              {testing ? <span className="spinner"></span> : <Icon name="flask" className="icon-sm" />}
              Тест: тоо
            </button>
            {testResult && !testing && (
              <span className="muted" style={{ fontSize: 12, marginRight: 8 }}>
                <Icon name="users" className="icon-sm" /> ≈ <strong className="mono" style={{color:'var(--ink)'}}>{testResult.count.toLocaleString()}</strong> хэрэглэгч · <span className="mono">{testResult.ms} ms</span>
              </span>
            )}
            <button className="btn" onClick={onClose}>Цуцлах</button>
            <button className="btn btn-accent" disabled={!name || !file}
              style={{ opacity: (!name || !file) ? 0.5 : 1, cursor: (!name || !file) ? 'not-allowed' : 'pointer' }}
              onClick={()=>onSave && onSave({ name, file, note })}>
              <Icon name="check" className="icon-sm" /> {isEdit ? 'Хадгалах' : 'Үүсгэх'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- SQL Query Modal ---------------- */
const SQL_TEMPLATE = `SELECT
  DISTINCT line_user_id AS line_user_key_id
FROM
  \`AutoLine_cs_staging.line_users\`
WHERE
  created_at >= '2026-01-01'
  AND status = 'active'`;

const highlightSQL = (sql) => {
  // Render token spans using simple regex tokenization
  const KW = /\b(SELECT|FROM|WHERE|DISTINCT|AS|AND|OR|NOT|JOIN|INNER|LEFT|RIGHT|ON|GROUP BY|ORDER BY|LIMIT|HAVING|IN|IS|NULL|BETWEEN|LIKE|UNION|WITH|CASE|WHEN|THEN|ELSE|END)\b/g;
  const STR = /'[^']*'|`[^`]*`/g;
  const NUM = /\b\d+(\.\d+)?\b/g;
  const tokens = [];
  let i = 0;
  const matches = [];
  let m;
  const all = [];
  const push = (re, cls) => { re.lastIndex = 0; while ((m = re.exec(sql))) all.push({ start: m.index, end: m.index + m[0].length, cls, text: m[0] }); };
  push(STR, 'str'); push(KW, 'kw'); push(NUM, 'num');
  all.sort((a,b)=>a.start-b.start);
  // Filter overlapping (strings win, then keywords)
  const filtered = [];
  let cursor = 0;
  for (const t of all) {
    if (t.start < cursor) continue;
    filtered.push(t); cursor = t.end;
  }
  const out = [];
  let pos = 0;
  filtered.forEach((t, idx) => {
    if (t.start > pos) out.push(<React.Fragment key={'p'+idx}>{sql.slice(pos, t.start)}</React.Fragment>);
    out.push(<span key={'t'+idx} className={t.cls}>{t.text}</span>);
    pos = t.end;
  });
  if (pos < sql.length) out.push(<React.Fragment key="end">{sql.slice(pos)}</React.Fragment>);
  return out;
};

const SegmentQueryModal = ({ open, onClose, onSave, initial, onShowUsers }) => {
  const isEdit = !!initial;
  const [name, setName] = React.useState('');
  const [sql, setSql] = React.useState(SQL_TEMPLATE);
  const [note, setNote] = React.useState('');
  const [validation, setValidation] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      setName(initial?.name || '');
      setSql(initial?.sql || SQL_TEMPLATE);
      setNote(initial?.note || '');
      setValidation(initial ? { ok: true, count: initial.count, ms: 240 } : null);
    }
  }, [open, initial]);

  if (!open) return null;

  const validate = () => {
    setValidation('checking');
    setTimeout(() => {
      if (!/SELECT/i.test(sql) || !/line_user/i.test(sql)) {
        setValidation({ error: 'Query-д line_user_id багана байх шаардлагатай' });
      } else {
        setValidation({ ok: true, count: Math.floor(800 + Math.random() * 4200), ms: 240 + Math.floor(Math.random() * 380) });
      }
    }, 700);
  };

  const lines = sql.split('\n');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 820 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">{isEdit ? 'Сегмент засах' : 'Сегмент үүсгэх'}</span>
              <span className="modal-title-sub">Query-ээр</span>
            </div>
            <div className="modal-header-actions">
              {isEdit && <button className="btn btn-sm" onClick={onShowUsers}><Icon name="users" className="icon-sm" /> Хэрэглэгчид</button>}
              <button className="btn btn-sm"><Icon name="help" className="icon-sm" /> Схем</button>
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body">
            <div className="form-row">
              <label className="form-label">Сегментийн нэр <span className="req">*</span></label>
              <input className="form-input" placeholder="Сегментийн нэрээ оруулна уу"
                value={name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div className="form-row">
              <div className="row" style={{ marginBottom: 6 }}>
                <label className="form-label" style={{ margin: 0 }}>SQL Query <span className="req">*</span></label>
                <div className="right row" style={{ gap: 6 }}>
                  <button className="btn btn-sm" onClick={()=>setSql(SQL_TEMPLATE)}>
                    <Icon name="sparkle" className="icon-sm" /> Загвар
                  </button>
                  <button className="btn btn-sm" onClick={validate}>
                    {validation === 'checking' ? <span className="spinner"></span> : <Icon name="check" className="icon-sm" />}
                    Шалгах
                  </button>
                </div>
              </div>

              {/* Editor with line numbers + syntax-highlighted overlay */}
              <div style={{
                position: 'relative',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                background: 'oklch(0.98 0.005 90)',
                overflow: 'hidden',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12.5,
                lineHeight: 1.6,
              }}>
                <div style={{ display: 'flex', minHeight: 200 }}>
                  <div style={{
                    padding: '12px 10px 12px 12px',
                    color: 'var(--ink-4)',
                    background: 'oklch(0.96 0.005 90)',
                    borderRight: '1px solid var(--border)',
                    userSelect: 'none',
                    textAlign: 'right',
                    minWidth: 32,
                  }}>
                    {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <div style={{ position: 'relative', flex: 1 }}>
                    {/* highlighted overlay */}
                    <pre style={{
                      position: 'absolute', inset: 0,
                      margin: 0, padding: '12px 14px',
                      whiteSpace: 'pre-wrap',
                      pointerEvents: 'none',
                      color: 'var(--ink)',
                    }}>
                      {highlightSQL(sql)}
                    </pre>
                    <textarea
                      value={sql}
                      onChange={(e)=>{ setSql(e.target.value); setValidation(null); }}
                      spellCheck={false}
                      style={{
                        position: 'relative',
                        width: '100%',
                        minHeight: 200,
                        padding: '12px 14px',
                        background: 'transparent',
                        color: 'transparent',
                        caretColor: 'var(--ink)',
                        border: 0, outline: 0, resize: 'vertical',
                        fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit',
                        whiteSpace: 'pre-wrap',
                      }}
                    />
                  </div>
                </div>
              </div>

              {validation && validation !== 'checking' && (
                validation.ok ? (
                  <div style={{
                    marginTop: 8,
                    background: 'oklch(0.96 0.04 145)',
                    border: '1px solid oklch(0.85 0.06 145)',
                    color: 'oklch(0.40 0.10 145)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12.5,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Icon name="check" className="icon-sm" />
                    Query амжилттай. Үр дүн: <strong className="mono">{validation.count.toLocaleString()}</strong> хэрэглэгч
                    <span className="muted right">{validation.ms} ms</span>
                  </div>
                ) : (
                  <div style={{
                    marginTop: 8,
                    background: 'oklch(0.96 0.05 25)',
                    border: '1px solid oklch(0.85 0.10 25)',
                    color: 'oklch(0.45 0.16 25)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 12.5,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Icon name="alert" className="icon-sm" /> {validation.error}
                  </div>
                )
              )}

              <div className="note" style={{ marginTop: 8 }}>
                <Icon name="info" className="icon-sm" /> Query нь <code className="mono">line_user_id</code>-г <code className="mono">line_user_key_id</code> нэрээр буцаах ёстой.
              </div>
            </div>

            <div className="form-row">
              <label className="form-label"> тэмдэглэл</label>
              <textarea className="form-input form-textarea"
                placeholder="Тэмдэглэл оруулах..."
                value={note} onChange={(e)=>setNote(e.target.value)}></textarea>
            </div>
          </div>
          <div className="modal-foot">
            <span className="muted" style={{ fontSize: 12, marginRight: 'auto' }}>
              {validation?.ok ? <span style={{color:'oklch(0.45 0.13 145)'}}><Icon name="check" className="icon-sm"/> Шалгасан</span> : 'Хадгалахаас өмнө шалгана уу'}
            </span>
            <button className="btn" onClick={onClose}>Цуцлах</button>
            <button className="btn btn-accent"
              disabled={!name || !validation?.ok}
              style={{ opacity: (!name || !validation?.ok) ? 0.5 : 1, cursor: (!name || !validation?.ok) ? 'not-allowed' : 'pointer' }}
              onClick={()=>onSave && onSave({ name, sql, note })}>
              <Icon name="check" className="icon-sm" /> {isEdit ? 'Хадгалах' : 'Үүсгэх'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Users (members) Modal ---------------- */
const MN_NAMES = ['Бат-Эрдэнэ','Сарангэрэл','Болормаа','Энхбат','Очирхүү','Цэцэгмаа','Дорждэрэм','Мөнхбаяр','Алтанзул','Ганболд','Оюунчимэг','Түвшинбаяр','Нямсүрэн','Хулан','Жавхлан','Ариунаа','Цолмон','Энхтуяа','Бямбасүрэн','Лхагвасүрэн','Цогзолмаа','Нарангэрэл','Эрдэнэбат','Соёл-Эрдэнэ','Уламбаяр','Дэлгэрмаа','Энхжаргал','Бүрэнтөгс','Сувд','Чинбат'];
const MN_LAST = ['Б.','Г.','Д.','Ж.','М.','Н.','О.','П.','С.','Т.','Ц.','Ч.','Э.','Ө.','Ү.','Х.','Я.','Ш.'];

const fakeUser = (i, seed) => {
  const r = (n) => ((seed * 9301 + 49297 + i * (n+1)) % 233280) / 233280;
  const first = MN_NAMES[Math.floor(r(1) * MN_NAMES.length)];
  const last = MN_LAST[Math.floor(r(2) * MN_LAST.length)];
  const uid = 'U' + (Math.floor(r(3) * 9e9) + 1e9).toString(16);
  const days = Math.floor(r(4) * 180);
  const platform = ['iOS','Android','Web'][Math.floor(r(5) * 3)];
  const tags = [];
  if (r(6) > 0.55) tags.push('VIP');
  if (r(7) > 0.7) tags.push('Active');
  if (r(8) > 0.85) tags.push('Trial');
  return { id: uid, name: last + ' ' + first, days, platform, tags, blocked: r(9) > 0.92 };
};

const SegmentUsersModal = ({ open, onClose, segment }) => {
  const seg = segment || { name: '—', count: 0 };
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const perPage = 12;
  const total = seg.count || 0;
  const seed = (seg.name || '').length || 1;

  React.useEffect(() => {
    if (open) { setPage(1); setSearch(''); setLoading(true); setTimeout(()=>setLoading(false), 500); }
  }, [open, segment]);

  if (!open) return null;

  const allUsers = Array.from({ length: total }, (_, i) => fakeUser(i, seed));
  const filtered = search ? allUsers.filter(u => u.name.includes(search) || u.id.toLowerCase().includes(search.toLowerCase())) : allUsers;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageUsers = filtered.slice((page-1)*perPage, page*perPage);

  const Avatar = ({ name }) => {
    const initial = name.split(' ').slice(-1)[0]?.[0] || '?';
    const hue = (name.charCodeAt(0) * 13) % 360;
    return <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: `oklch(0.85 0.06 ${hue})`,
      color: `oklch(0.30 0.10 ${hue})`,
      display: 'grid', placeItems: 'center',
      fontSize: 11, fontWeight: 600,
    }}>{initial}</div>;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 820 }} onClick={(e)=>e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">Сегментийн хэрэглэгчид</span>
              <span className="modal-title-sub">{seg.name}</span>
            </div>
            <div className="modal-header-actions">
              <button className="btn btn-sm"><Icon name="download" className="icon-sm" /> CSV татах</button>
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body" style={{ padding: '16px 20px' }}>
            <div className="row" style={{ marginBottom: 12, gap: 10 }}>
              <div className="search" style={{ flex: 1 }}>
                <Icon name="search" className="icon-sm" />
                <input placeholder="Нэр эсвэл UID-ээр хайх..." value={search}
                  onChange={(e)=>{setSearch(e.target.value); setPage(1);}} />
              </div>
              <span className="muted" style={{ fontSize: 12 }}>
                Нийт <strong className="mono" style={{color:'var(--ink)'}}>{filtered.length.toLocaleString()}</strong> хэрэглэгч
              </span>
            </div>
            {loading ? (
              <div style={{padding:'40px', textAlign:'center', color:'var(--ink-3)'}}>
                <span className="spinner"></span> Хэрэглэгч ачаалж байна...
              </div>
            ) : (
              <div className="table-card" style={{boxShadow:'none'}}>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{width: 36}}></th>
                      <th>Нэр</th>
                      <th style={{width: 180}}>Хэрэглэгчийн UID</th>
                      <th style={{width: 110}}>Бүртгэгдсэн</th>
                      <th style={{width: 130}}>Шошго</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageUsers.map(u => (
                      <tr key={u.id}>
                        <td><Avatar name={u.name} /></td>
                        <td>
                          <div className="cell-name" style={{display:'flex',alignItems:'center',gap:6}}>
                            {u.name}
                            {u.blocked && <span className="badge" style={{background:'oklch(0.96 0.05 25)',color:'oklch(0.45 0.16 25)',borderColor:'oklch(0.85 0.10 25)'}}>Блоклогдсон</span>}
                          </div>
                        </td>
                        <td className="mono muted" style={{fontSize: 11.5}}>{u.id}</td>
                        <td className="mono muted" style={{fontSize: 12}}>{u.days} хоног</td>
                        <td>
                          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                            {u.tags.map(t => (
                              <span key={t} className="badge" style={{padding:'2px 7px',fontSize:10.5,background:'var(--accent-soft)',color:'var(--accent-ink)',borderColor:'oklch(0.85 0.05 195)'}}>{t}</span>
                            ))}
                            {u.tags.length === 0 && <span className="muted" style={{fontSize:11}}>—</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pageUsers.length === 0 && (
                      <tr><td colSpan={6} style={{padding:'40px',textAlign:'center',color:'var(--ink-4)'}}>Хэрэглэгч олдсонгүй</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && filtered.length > 0 && (
              <div className="pagination">
                <button className="page-btn" onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1}><Icon name="chevron-left" className="icon-sm"/></button>
                <span className="muted" style={{fontSize:12, padding:'0 10px'}}>{page} / {totalPages}</span>
                <button className="page-btn" onClick={()=>setPage(Math.min(totalPages,page+1))} disabled={page===totalPages}><Icon name="chevron-right" className="icon-sm"/></button>
              </div>
            )}
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.SegmentUsersModal = SegmentUsersModal;
window.ReportsModal = ReportsModal;
window.SegmentFilterModal = SegmentFilterModal;
window.SegmentMethodPicker = SegmentMethodPicker;
window.SegmentCSVModal = SegmentCSVModal;
window.SegmentQueryModal = SegmentQueryModal;
window.PreviewPane = PreviewPane;
