/* Main app */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 195,
  "accentChroma": 0.12,
  "accentLightness": 0.62,
  "brandName": "TokTok Хөтөч"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useState('segment-delivery');
  const [variant, setVariant] = useState('default'); // default | cards | split
  const [openDelivery, setOpenDelivery] = useState(null);
  const [openReports, setOpenReports] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openMethodPicker, setOpenMethodPicker] = useState(false);
  const [creating, setCreating] = useState(false);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    const { accentHue: h, accentChroma: c, accentLightness: l } = tweaks;
    root.style.setProperty('--accent', `oklch(${l} ${c} ${h})`);
    root.style.setProperty('--accent-2', `oklch(${Math.max(0.4, l - 0.07)} ${Math.min(0.16, c + 0.01)} ${h})`);
    root.style.setProperty('--accent-soft', `oklch(0.95 ${Math.min(0.04, c * 0.3)} ${h})`);
    root.style.setProperty('--accent-ink', `oklch(0.30 ${Math.min(0.10, c * 0.7)} ${h})`);
  }, [tweaks]);

  if (creating) {
    return <CreateNewDelivery onClose={() => setCreating(false)} />;
  }

  return (
    <div className="app">
      <Sidebar active={page} onNav={setPage} brandName={tweaks.brandName} />
      <div className="main">
        <Topbar>
          <div className="crumbs">
            <span>Тарилтын Удирдлага</span>
            <Icon name="chevron-right" className="icon-sm" />
            <strong>{page === 'segment' ? 'Сегмент' : 'Сегмент Тарилт'}</strong>
          </div>
        </Topbar>
        <div className="page" data-screen-label={page === 'segment' ? 'Segment' : 'Segment Delivery'}>
          {page === 'segment' ? (
            <SegmentListPage
              onOpenFilter={() => setOpenFilter(true)}
              onOpenMethodPicker={() => setOpenMethodPicker(true)}
            />
          ) : (
            <SegmentDeliveryList
              variant={variant}
              onRowClick={(d) => setOpenDelivery(d)}
              onCreate={() => setCreating(true)}
            />
          )}
        </div>
      </div>

      <DeliveryDetailModal
        delivery={openDelivery}
        onClose={() => setOpenDelivery(null)}
        onOpenReports={(d) => { setOpenDelivery(null); setOpenReports(d); }}
      />
      <ReportsModal delivery={openReports} onClose={() => setOpenReports(null)} />
      <SegmentFilterModal open={openFilter} onClose={() => setOpenFilter(false)} />
      <SegmentMethodPicker
        open={openMethodPicker}
        onClose={() => setOpenMethodPicker(false)}
        onPick={(m) => { setOpenMethodPicker(false); if (m === 'filter') setCreating(true); }}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Хуудас">
          <TweakRadio
            label="Үзэх хуудас"
            value={page}
            options={[
              { value: 'segment-delivery', label: 'Тарилт' },
              { value: 'segment', label: 'Сегмент' },
            ]}
            onChange={setPage}
          />
          <TweakRadio
            label="Жагсаалтын layout"
            value={variant}
            options={[
              { value: 'default', label: 'Хүснэгт' },
              { value: 'cards', label: 'Карт' },
              { value: 'split', label: 'Хуваалт' },
            ]}
            onChange={setVariant}
          />
        </TweakSection>
        <TweakSection title="Brand">
          <TweakText
            label="Брэндийн нэр"
            value={tweaks.brandName}
            onChange={(v) => setTweak('brandName', v)}
          />
        </TweakSection>
        <TweakSection title="Өнгө (OKLCH accent)">
          <TweakSlider
            label="Hue"
            value={tweaks.accentHue}
            min={0} max={360} step={1}
            onChange={(v) => setTweak('accentHue', v)}
          />
          <TweakSlider
            label="Chroma"
            value={tweaks.accentChroma}
            min={0} max={0.2} step={0.005}
            onChange={(v) => setTweak('accentChroma', v)}
          />
          <TweakSlider
            label="Lightness"
            value={tweaks.accentLightness}
            min={0.3} max={0.85} step={0.01}
            onChange={(v) => setTweak('accentLightness', v)}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {[
              { name: 'teal', h: 195, c: 0.12, l: 0.62 },
              { name: 'green', h: 145, c: 0.13, l: 0.55 },
              { name: 'indigo', h: 270, c: 0.14, l: 0.55 },
              { name: 'rose', h: 15, c: 0.15, l: 0.62 },
              { name: 'amber', h: 70, c: 0.15, l: 0.70 },
            ].map(p => (
              <button key={p.name} className="btn btn-sm"
                onClick={() => setTweak({ accentHue: p.h, accentChroma: p.c, accentLightness: p.l })}
                style={{ padding: '4px 8px' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: `oklch(${p.l} ${p.c} ${p.h})`, display: 'inline-block', marginRight: 6 }}></span>
                {p.name}
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection title="Demo">
          <TweakButton onClick={() => setOpenDelivery(DELIVERIES[0])}>Дэлгэрэнгүй modal нээх</TweakButton>
          <TweakButton onClick={() => setOpenReports(DELIVERIES[0])}>Тайлан modal нээх</TweakButton>
          <TweakButton onClick={() => setOpenFilter(true)}>Шүүлтүүр modal нээх</TweakButton>
          <TweakButton onClick={() => setOpenMethodPicker(true)}>Үүсгэх арга нээх</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
