/* Sample Mongolian campaign data */
const DELIVERIES = [
  { id: 1, status: 'draft', name: 'Тэст_хуулбар4_хуулбар1_hoge', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: 'Tencial Test_хуулбар1', messageType: 'flex' },
  { id: 2, status: 'draft', name: 'Тэст_хуулбар4', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: '—', messageType: 'empty' },
  { id: 3, status: 'draft', name: 'Тэст', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: '—', messageType: 'empty' },
  { id: 4, status: 'reserved', name: 'Том_тэст_3', segment: 'Тохируулагдаагүй', schedule: 'Тэст', message: 'Том_тэст_1', messageType: 'image' },
  { id: 5, status: 'reserved', name: 'Том_тэст_2', segment: 'Том_тэст(91)', schedule: '2026-03-25 19:15', message: 'Том_тэст_2', messageType: 'image' },
  { id: 6, status: 'draft', name: 'тэст_хаврын_шинэ_үйлчлүүлэгчдийн_кампанит_ажил', segment: 'Тэст_тарилгын_180_хоногийн_дотор', schedule: '2026-03-20 14:47', message: 'Тэст_Flex_мессеж (хаврын шинэ хэрэглэгчид)', messageType: 'flex' },
  { id: 7, status: 'draft', name: 'Тэст_сегментлэлт', segment: 'Тэст_5%_цахим_сэдэлжүүлэлт_2', schedule: 'Тэст_дэлгэрэнгүй_18 цаг', message: 'Тэст_5_сарын_5_оноо +5 \u26A0', messageType: 'message', warn: true },
  { id: 8, status: 'draft', name: 'Сэлэнгэ_тэст (анкет асуулга)', segment: 'Тэст', schedule: 'Хүлээгдэж_байгаа_тохиргоо', message: 'Косметик_санал_тэст_хуулбар1_хуулбар1', messageType: 'flex' },
  { id: 9, status: 'draft', name: 'Хувийн_тэст', segment: 'Хүлээгдэж_байгаа_тохиргоо', schedule: 'Хүлээгдэж_байгаа_тохиргоо', message: 'Параметр_тэст / Лакко', messageType: 'message' },
  { id: 10, status: 'reserved', name: 'Том_тэст_1', segment: 'Том_тэст(91)', schedule: '2026-03-23 19:15', message: 'Том_тэст_1', messageType: 'message' },
  { id: 11, status: 'reserved', name: 'А_ж_ү_к', segment: 'Сонирхлынхоо_бүртгэл', schedule: '2026-02-25 18:07', message: 'Кампанит_шинэ_санал \u26A0', messageType: 'message', warn: true },
  { id: 12, status: 'reserved', name: 'тэст', segment: 'Шинэ_тэст', schedule: '2026-03-03 17:30', message: 'Купон_шинэчлэлт', messageType: 'message' },
  { id: 13, status: 'draft', name: 'Тэст_Отта', segment: 'Сегмент', schedule: '2026-02-13 12:00', message: 'Тэст ⚠', messageType: 'message', warn: true },
  { id: 14, status: 'draft', name: 'Жишээ_1234', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Сонголт_мессеж_хуулбар1', messageType: 'message' },
  { id: 15, status: 'reserved', name: 'тэст_OJIMA_iOS', segment: 'OJIMA_iOS', schedule: '2026-02-05 15:50', message: 'Шошго_тэст', messageType: 'flex' },
  { id: 16, status: 'draft', name: 'Жишээ_үл_хөдлөх (гишүүн_бүртгэл_дэмжлэг)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх (гишүүн_бүртгэл_дэмжлэг)', messageType: 'message' },
  { id: 17, status: 'draft', name: 'Жишээ_үл_хөдлөх (Step_тарилт + 2 хоног)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх (хайлтын зөвлөгөө)', messageType: 'message' },
  { id: 18, status: 'draft', name: 'Жишээ_үл_хөдлөх (хариу мессеж)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх_тэст_сэдэв', messageType: 'message' },
];

const SEGMENTS = [
  { name: 'Том_тэст(91)', type: 'Filter', updated: '2026-04-26', count: 91, note: '' },
  { name: 'Унтсан_хэрэглэгч', type: 'Filter', updated: '2026-04-22', count: 1840, note: '30+ хоног идэвхгүй' },
  { name: 'Сэдэлжүүлэлт_Class2', type: 'Filter', updated: '2026-04-15', count: 622, note: '' },
  { name: 'Сэдэлжүүлэлт_Class1', type: 'Filter', updated: '2026-04-15', count: 412, note: '' },
  { name: 'Найзаар_бүртгүүлэх_8_хоногоос_өмнө', type: 'Filter', updated: '2026-04-10', count: 248, note: '' },
  { name: 'Тэст_найзаар_бүртгүүлсэн_өдөр', type: 'CSV', updated: '2026-04-08', count: 1024, note: 'CSV upload', file: { name: 'friends_today.csv', size: 38900, rows: 1024 } },
  { name: 'Битүүмжлэгдээгүй_хэрэглэгчид', type: 'Query', updated: '2026-04-05', count: 3120, note: '', sql: "SELECT\n  DISTINCT line_user_id AS line_user_key_id\nFROM\n  `AutoLine_cs_staging.line_users`\nWHERE\n  blocked_at IS NULL" },
  { name: 'Дунд_зорилго', type: 'Filter', updated: '2026-04-01', count: 588, note: '' },
  { name: 'Найзаар_бүртгүүлсэн_180_хоногийн_дотор', type: 'Filter', updated: '2026-03-30', count: 4210, note: '' },
  { name: 'Найзаар_бүртгүүлснээс_1_долоо_хоногийн_дотор', type: 'Filter', updated: '2026-03-25', count: 380, note: '' },
  { name: 'Найзаар_бүртгүүлснээс_3_хоногийн_дараа', type: 'Filter', updated: '2026-03-20', count: 220, note: '' },
  { name: '54', type: 'Query', updated: '2026-03-15', count: 54, note: '', sql: "SELECT line_user_id AS line_user_key_id\nFROM `AutoLine_cs_staging.line_users`\nWHERE id = 54" },
  { name: 'Шинэ-Дамба_UID', type: 'Query', updated: '2026-03-10', count: 1, note: '', sql: "SELECT\n  DISTINCT id AS line_user_key_id\nFROM\n  `AutoLine_cs_staging.line_users`\nWHERE\n  id = 14" },
  { name: 'Найзын_бүртгэлийн_3_хоног', type: 'Filter', updated: '2026-03-05', count: 195, note: '' },
];

const FILTERS = [
  'OJIMA_iOS',
  'Унтсан_хэрэглэгч',
  'Сэдэлжүүлэлт_Class2',
  'Сэдэлжүүлэлт_Class1',
  'Найзаар_бүртгэх_8_хоногоос_өмнө',
  'Тэст_найзаар_бүртгүүлсэн_өдөр',
  'Битүүмжлэгдээгүй',
  'Дунд_зорилго',
  'Найзаар_бүртгүүлсэн_180_хоногийн_дотор',
  'Найзаар_бүртгүүлснээс_1_долоо_хоногийн_дотор',
  '54',
  'Шинэ-Дамба_UID',
];

window.DELIVERIES = DELIVERIES;
window.SEGMENTS = SEGMENTS;
window.FILTERS = FILTERS;
