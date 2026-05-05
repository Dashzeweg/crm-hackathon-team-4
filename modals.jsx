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

              <div className="field-label">Захиргааны тэмдэглэл</div>
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

/* ---------------- Segment Filter Detail ---------------- */
const SegmentFilterModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 720 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-grip"></div>
            <div>
              <span className="modal-title">Сегмент шүүлтүүр</span>
              <span className="modal-title-sub">Дэлгэрэнгүй</span>
            </div>
            <div className="modal-header-actions">
              <button className="btn btn-sm"><Icon name="users" className="icon-sm" /> Хэрэглэгчид</button>
              <button className="btn btn-sm"><Icon name="report" className="icon-sm" /> Хэрэглэгчийн тоо</button>
              <button className="modal-close" onClick={onClose}><Icon name="close" /></button>
            </div>
          </div>
          <div className="modal-body">
            <div className="field-grid">
              <div className="field-label">Шүүлтүүрийн нэр</div>
              <div className="field-value">Шинэ-Дамба_UID</div>

              <div className="field-label">Төрөл</div>
              <div className="field-value">Нөхцөл</div>

              <div className="field-label">Агуулга</div>
              <div className="field-value">
                <div style={{ marginBottom: 6 }}>Хэрэглэгчийн үндсэн мэдээлэл</div>
                <div className="muted" style={{ marginBottom: 10 }}>AutoLine ID нь 14-тэй тэнцүү</div>
                <div style={{ marginBottom: 6 }}>Шүүлтүүрийн query</div>
                <pre className="sql">
<span className="kw">SELECT</span>{`\n  `}<span className="kw">DISTINCT</span> id <span className="kw">AS</span> line_user_key_id{`\n`}<span className="kw">FROM</span>{`\n  `}<span className="str">'AutoLine_cs_staging.line_users'</span>{`\n`}<span className="kw">WHERE</span>{`\n  `}id = <span className="num">14</span>
                </pre>
              </div>

              <div className="field-label">Үүсгэсэн огноо</div>
              <div className="field-value mono">2025-10-09</div>

              <div className="field-label">Захиргааны тэмдэглэл</div>
              <div className="field-value"><span className="empty">— хоосон —</span></div>

              <div className="field-label">Энэ шүүлтүүр<br/>хэрэглэдэг сегмент</div>
              <div className="field-value"><a>Шинэ-Дамба_тэст</a></div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={onClose}>Хаах</button>
            <button className="btn btn-primary"><Icon name="edit" className="icon-sm" /> Засах</button>
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
                <div className="method-desc">LINE UID-уудыг агуулсан CSV файл байршуулж үүсгэх</div>
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

window.DeliveryDetailModal = DeliveryDetailModal;
window.ReportsModal = ReportsModal;
window.SegmentFilterModal = SegmentFilterModal;
window.SegmentMethodPicker = SegmentMethodPicker;
window.PreviewPane = PreviewPane;
