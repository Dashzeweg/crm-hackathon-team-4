/* Pages: SegmentDeliveryList, SegmentList, CreateNewDelivery */

const StatusBadge = ({ status }) => (
  <span className={"badge " + (status === 'reserved' ? 'badge-reserved' : 'badge-draft')}>
    {status === 'reserved' ? 'Захиалсан' : 'Ноорог'}
  </span>
);

const MessageTypeIcon = ({ type }) => {
  if (type === 'flex') return <Icon name="flex" className="icon-sm" />;
  if (type === 'image') return <Icon name="image" className="icon-sm" />;
  if (type === 'empty') return <Icon name="settings" className="icon-sm" />;
  return <Icon name="message" className="icon-sm" />;
};

const Pagination = () => (
  <div className="pagination">
    <button className="page-btn"><Icon name="chevron-left" className="icon-sm" /></button>
    <button className="page-btn active">1</button>
    <button className="page-btn">2</button>
    <button className="page-btn">3</button>
    <button className="page-btn">4</button>
    <button className="page-btn">5</button>
    <button className="page-btn"><Icon name="chevron-right" className="icon-sm" /></button>
  </div>
);

const SegmentDeliveryList = ({ variant = 'default', onRowClick, onCreate }) => {
  const [tab, setTab] = React.useState('all');
  const filtered = DELIVERIES.filter(d => {
    if (tab === 'scheduled') return d.status === 'reserved';
    if (tab === 'draft') return d.status === 'draft';
    return true;
  });

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Сегмент Тарилт</h1>
          <div className="page-sub">Хэрэглэгчдийн сегментэд хуваарилсан мессежийн тарилт</div>
        </div>
        <div className="page-actions">
          <button className="btn"><Icon name="history" className="icon-sm" /> Тарилтын Түүх</button>
          <button className="btn btn-accent" onClick={onCreate}>
            <Icon name="plus" className="icon-sm" /> Шинэ үүсгэх
          </button>
          <button className="btn btn-icon"><Icon name="more" /></button>
        </div>
      </div>

      <div className="tabs">
        <div className={"tab" + (tab === 'scheduled' ? ' active' : '')} onClick={() => setTab('scheduled')}>
          <Icon name="calendar" className="icon-sm" /> Хуваарилагдсан тарилт
          <span className="tab-count">{DELIVERIES.filter(d=>d.status==='reserved').length}</span>
        </div>
        <div className={"tab" + (tab === 'draft' ? ' active' : '')} onClick={() => setTab('draft')}>
          <Icon name="message" className="icon-sm" /> Ноорог
          <span className="tab-count">{DELIVERIES.filter(d=>d.status==='draft').length}</span>
        </div>
        <div className={"tab" + (tab === 'all' ? ' active' : '')} onClick={() => setTab('all')}>
          Бүгд
          <span className="tab-count">{DELIVERIES.length}</span>
        </div>
      </div>

      <div className="toolbar">
        <button className="btn btn-sm"><Icon name="filter" className="icon-sm" /> Шүүлт</button>
        <div className="search">
          <Icon name="search" className="icon-sm" />
          <input placeholder="Тарилтын нэрээр хайх..." />
        </div>
        <button className="btn btn-sm"><Icon name="search" className="icon-sm" /> Хайх</button>
        <div className="toolbar-right">
          <span className="rows-per">
            Мөр <select defaultValue="25"><option>10</option><option>25</option><option>50</option></select>
          </span>
        </div>
      </div>

      {variant === 'cards' ? (
        <CardsVariant data={filtered} onRowClick={onRowClick} />
      ) : variant === 'split' ? (
        <SplitVariant data={filtered} onRowClick={onRowClick} />
      ) : (
        <TableVariant data={filtered} onRowClick={onRowClick} />
      )}

      <Pagination />
    </>
  );
};

/* ---- Variant 1: classic table ---- */
const TableVariant = ({ data, onRowClick }) => (
  <div className="table-card">
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: 110 }}>Төлөв</th>
          <th>Тарилтын нэр</th>
          <th>Сегмент / Хуваарь</th>
          <th>Тарилтын мессеж</th>
          <th style={{ width: 60 }}></th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.id} onClick={() => onRowClick(d)} style={{ cursor: 'pointer' }}>
            <td><StatusBadge status={d.status} /></td>
            <td><span className="cell-name">{d.name}</span></td>
            <td>
              <div className="cell-meta">
                <div className="cell-meta-row"><Icon name="venn" className="icon-sm" /> {d.segment}</div>
                <div className="cell-meta-row"><Icon name="clock" className="icon-sm" /> <span className="mono">{d.schedule}</span></div>
              </div>
            </td>
            <td>
              <div className="cell-meta-row">
                <MessageTypeIcon type={d.messageType} />
                <span>{d.message}</span>
                {d.warn && <Icon name="alert" className="icon-sm" />}
              </div>
            </td>
            <td>
              <div className="row-actions">
                <button className="btn btn-icon" title="Засах" onClick={(e)=>e.stopPropagation()}><Icon name="edit" className="icon-sm" /></button>
                <button className="btn btn-icon" title="Хувилах" onClick={(e)=>e.stopPropagation()}><Icon name="copy" className="icon-sm" /></button>
                <button className="btn btn-icon" title="Устгах" onClick={(e)=>e.stopPropagation()}><Icon name="trash" className="icon-sm" /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---- Variant 2: compact card grid ---- */
const CardsVariant = ({ data, onRowClick }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
    {data.map(d => (
      <div key={d.id}
        onClick={() => onRowClick(d)}
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
        <div className="row" style={{ marginBottom: 10 }}>
          <StatusBadge status={d.status} />
          <span className="right muted" style={{ fontSize: 11 }}>#{d.id.toString().padStart(4, '0')}</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8, lineHeight: 1.35 }}>{d.name}</div>
        <div className="cell-meta" style={{ fontSize: 12 }}>
          <div className="cell-meta-row"><Icon name="venn" className="icon-sm" /> {d.segment}</div>
          <div className="cell-meta-row"><Icon name="clock" className="icon-sm" /> <span className="mono">{d.schedule}</span></div>
          <div className="cell-meta-row" style={{ paddingTop: 8, borderTop: '1px dashed var(--border)', marginTop: 4 }}>
            <MessageTypeIcon type={d.messageType} />
            <span>{d.message}</span>
            {d.warn && <Icon name="alert" className="icon-sm" />}
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ---- Variant 3: split timeline (status grouped by date) ---- */
const SplitVariant = ({ data, onRowClick }) => {
  const groups = { reserved: [], draft: [] };
  data.forEach(d => groups[d.status]?.push(d));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {[
        { key: 'reserved', label: 'Захиалсан', count: groups.reserved.length },
        { key: 'draft', label: 'Ноорог', count: groups.draft.length },
      ].map(col => (
        <div key={col.key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-2)' }}>
            <strong style={{ fontSize: 13 }}>{col.label}</strong>
            <span className="tab-count">{col.count}</span>
          </div>
          <div>
            {groups[col.key].map(d => (
              <div key={d.id} onClick={() => onRowClick(d)}
                style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                <div className="row" style={{ marginBottom: 6 }}>
                  <span className="cell-name" style={{ fontSize: 13 }}>{d.name}</span>
                  <span className="right mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{d.schedule}</span>
                </div>
                <div className="cell-meta-row" style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                  <Icon name="venn" className="icon-sm" /> {d.segment}
                  <span style={{ margin: '0 8px', color: 'var(--ink-4)' }}>·</span>
                  <MessageTypeIcon type={d.messageType} /> <span style={{ marginLeft: 4 }}>{d.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- Segment List Page ---------------- */
const SegmentListPage = ({ onOpenSegment, onOpenMethodPicker }) => (
  <>
    <div className="page-head">
      <div>
        <h1 className="page-title">Сегмент</h1>
        <div className="page-sub">Хэрэглэгчдийг шүүж бүлэглэн тарилт хийх сегментүүд</div>
      </div>
      <div className="page-actions">
        <button className="btn"><Icon name="cells" className="icon-sm" /> Загвар</button>
        <button className="btn"><Icon name="venn" className="icon-sm" /> Шүүлтүүр Удирдлага</button>
        <button className="btn btn-accent" onClick={onOpenMethodPicker}>
          <Icon name="plus" className="icon-sm" /> Шинэ үүсгэх
        </button>
      </div>
    </div>
    <div className="toolbar">
      <button className="btn btn-sm"><Icon name="filter" className="icon-sm" /> Шүүлт</button>
      <div className="search">
        <Icon name="search" className="icon-sm" />
        <input placeholder="Сегментийн нэрээр хайх..." />
      </div>
      <button className="btn btn-sm"><Icon name="search" className="icon-sm" /> Хайх</button>
      <div className="toolbar-right">
        <span className="rows-per">Мөр <select defaultValue="25"><option>25</option></select></span>
      </div>
    </div>
    <div className="table-card">
      <table className="table">
        <thead>
          <tr>
            <th>Сегментийн нэр</th>
            <th style={{ width: 110 }}>Төрөл</th>
            <th style={{ width: 110 }}>Хэрэглэгч</th>
            <th style={{ width: 140 }}>Шинэчилсэн</th>
            <th style={{ width: 60 }}></th>
          </tr>
        </thead>
        <tbody>
          {SEGMENTS.map((s, i) => (
            <tr key={i} onClick={() => onOpenSegment(s)} style={{ cursor: 'pointer' }}>
              <td><span className="cell-name">{s.name}</span></td>
              <td>
                <span className="badge" style={{ background: 'var(--surface-2)', color: 'var(--ink-2)', borderColor: 'var(--border)' }}>
                  {s.type}
                </span>
              </td>
              <td className="mono muted" style={{ fontSize: 12 }}>{s.count?.toLocaleString() || '—'}</td>
              <td className="mono muted" style={{ fontSize: 12 }}>{s.updated}</td>
              <td>
                <div className="row-actions">
                  <button className="btn btn-icon" title="Засах" onClick={(e)=>{e.stopPropagation(); onOpenSegment(s);}}><Icon name="edit" className="icon-sm" /></button>
                  <button className="btn btn-icon" title="Хувилах" onClick={(e)=>e.stopPropagation()}><Icon name="copy" className="icon-sm" /></button>
                  <button className="btn btn-icon" title="Устгах" onClick={(e)=>e.stopPropagation()}><Icon name="trash" className="icon-sm" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination />
  </>
);

/* ---------------- Create New Delivery (full page form) ---------------- */
const CreateNewDelivery = ({ onClose }) => {
  const [mode, setMode] = React.useState('builder');
  return (
    <div>
      <div className="fullpage-header">
        <button className="modal-close" style={{ color: 'white' }} onClick={onClose}><Icon name="close" /></button>
        <div className="crumbs">
          <span>Сегмент</span>
          <Icon name="chevron-right" className="icon-sm" />
          <strong>Шинэ үүсгэх</strong>
        </div>
        <div className="fullpage-header-actions">
          <button className="btn"><Icon name="users" className="icon-sm" /> Хэрэглэгчид</button>
          <button className="btn"><Icon name="report" className="icon-sm" /> Тоо тооцоолох</button>
          <button className="btn btn-accent"><Icon name="check" className="icon-sm" /> Хадгалах</button>
        </div>
      </div>
      <div className="form-page">
        <div className="filter-list">
          <div className="filter-list-title">Сегмент шүүлтүүр</div>
          <div className="search" style={{ marginBottom: 8 }}>
            <Icon name="search" className="icon-sm" />
            <input placeholder="Шүүлтүүр хайх..." />
            <Icon name="filter" className="icon-sm" />
          </div>
          {FILTERS.map(f => (
            <div key={f} className="filter-item">
              <Icon name="grip" className="icon-sm grip" />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
            </div>
          ))}
        </div>
        <div className="form-area">
          <div className="form-row">
            <label className="form-label">Сегментийн нэр <span className="req">*</span></label>
            <input className="form-input" placeholder="Сегментийн нэрээ оруулна уу" />
          </div>

          <div className="form-row">
            <div className="row" style={{ marginBottom: 6 }}>
              <label className="form-label" style={{ margin: 0 }}>Сегментийн нөхцөл <span className="req">*</span></label>
              <div className="right form-tabs">
                <button className={mode === 'builder' ? 'on' : ''} onClick={() => setMode('builder')}>
                  <Icon name="cells" className="icon-sm" /> Builder
                </button>
                <button className={mode === 'expr' ? 'on' : ''} onClick={() => setMode('expr')}>
                  <Icon name="pencil-doc" className="icon-sm" /> Илэрхийлэл
                </button>
              </div>
            </div>
            <div className="condition-box">
              <div className="condition-toolbar">
                <div className="cond-toggle">
                  <button className="on">AND</button>
                  <button>OR</button>
                  <button>EXCEPT</button>
                </div>
                <div className="right row" style={{ gap: 6 }}>
                  <button className="btn btn-sm"><Icon name="plus" className="icon-sm" /> Шүүлт нэмэх</button>
                  <button className="btn btn-sm"><Icon name="plus" className="icon-sm" /> Группа нэмэх</button>
                </div>
              </div>
              {mode === 'builder' ? (
                <div className="condition-empty">
                  Зүүн талаас шүүлтүүр чирж эндээ оруулна уу
                </div>
              ) : (
                <pre className="sql">filters.<span className="fn">include</span>(<span className="str">"OJIMA_iOS"</span>) <span className="kw">AND</span> filters.<span className="fn">exclude</span>(<span className="str">"Унтсан_хэрэглэгч"</span>)</pre>
              )}
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Авах дээд хязгаар <Icon name="info" className="icon-sm" /></label>
            <input className="form-input" placeholder="Тоог оруулах..." style={{ maxWidth: 240 }} />
          </div>

          <div className="form-row">
            <label className="form-label">Захиргааны тэмдэглэл</label>
            <textarea className="form-input form-textarea" placeholder="Тэмдэглэл оруулах..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

window.SegmentDeliveryList = SegmentDeliveryList;
window.SegmentListPage = SegmentListPage;
window.CreateNewDelivery = CreateNewDelivery;
