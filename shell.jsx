/* App shell + sidebar */

const Sidebar = ({ active, onNav, brandName }) => {
  const items = [
    { section: 'Тойм' },
    { id: 'dashboard', label: 'Дашбоард', icon: 'dashboard' },
    { id: 'channels', label: 'Найз бүртгэлийн суваг', icon: 'users' },
    { section: 'Тарилтын Удирдлага' },
    { id: 'segment-delivery', label: 'Сегмент Тарилт', icon: 'send' },
    { id: 'trigger', label: 'Триггер Тарилт', icon: 'zap' },
    { id: 'welcome', label: 'Тавтай морил Мессеж', icon: 'wave' },
    { id: 'response', label: 'Хариу Мессеж', icon: 'reply' },
    { id: 'api', label: 'API Тарилт', icon: 'plug' },
    { id: 'notif', label: 'Мэдэгдэл Резерв', icon: 'bell' },
    { id: 'rich', label: 'Rich Меню', icon: 'menu' },
    { id: 'scheduled', label: 'Хуваариласан Тарилт', icon: 'calendar' },
    { section: 'Өгөгдлийн Удирдлага' },
    { id: 'message', label: 'Мессеж', icon: 'message' },
    { id: 'segment', label: 'Сегмент', icon: 'venn' },
    { id: 'schedule', label: 'Хуваарь', icon: 'clock' },
    { id: 'url', label: 'URL via TokTok', icon: 'link' },
    { id: 'sender', label: 'Илгээгч', icon: 'user' },
    { section: 'Үйлдэл' },
    { id: 'chat', label: 'Чат', icon: 'chat' },
    { id: 'chatbot', label: 'Чатбот', icon: 'bot' },
    { id: 'win', label: 'Шуурхай Хожил', icon: 'gift' },
    { id: 'fav', label: 'Дуртай Дэлгүүр', icon: 'star' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">T</div>
        <div className="brand-name">{brandName}</div>
        <span className="brand-env">CS</span>
      </div>
      <nav className="nav">
        {items.map((it, i) => it.section ? (
          <div key={i} className="nav-section">
            <div className="nav-section-title">{it.section}</div>
          </div>
        ) : (
          <div
            key={it.id}
            className={"nav-item" + (active === it.id ? " active" : "")}
            onClick={() => onNav && onNav(it.id)}
          >
            <Icon name={it.icon} className="nav-icon" />
            <span>{it.label}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        <Icon name="chevron-left" className="icon-sm" />
        <span>Хумих</span>
      </div>
    </aside>
  );
};

const Topbar = ({ children }) => (
  <div className="topbar">
    {children}
    <div className="topbar-right">
      <span className="row" style={{gap: 6}}><Icon name="help" className="icon-sm" /> Тусламж</span>
      <span className="row" style={{gap: 6}}><Icon name="globe" className="icon-sm" /> MN</span>
      <span className="row" style={{gap: 6}}><Icon name="settings" className="icon-sm" /> Тохиргоо</span>
      <div className="avatar">НТ</div>
    </div>
  </div>
);

window.Sidebar = Sidebar;
window.Topbar = Topbar;
