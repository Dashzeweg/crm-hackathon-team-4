export type DeliveryStatus = 'draft' | 'reserved';
export type MessageType = 'flex' | 'image' | 'empty' | 'message';
/** Тарилтыг SMS, push мэдэгдэл, эсвэл апп доторх баннераар харуулах */
export type DeliverySurface = 'sms' | 'notification' | 'banner';

export interface SegmentDelivery {
  id: number;
  status: DeliveryStatus;
  name: string;
  segment: string;
  schedule: string;
  surface: DeliverySurface;
  message: string;
  messageType: MessageType;
  flow?: string;
  warn?: boolean;
}

const SURFACES: DeliverySurface[] = ['sms', 'notification', 'banner'];

export interface SegmentSummary {
  name: string;
  type: 'Filter' | 'CSV' | 'Query' | string;
  updated: string;
  count?: number;
  note?: string;
  sql?: string;
  file?: { name: string; size: number; rows: number };
}

const MOCK_DELIVERIES_BASE: Array<Omit<SegmentDelivery, 'surface'>> = [
  { id: 1, status: 'draft', name: 'Тест_хуулбар4_хуулбар1_hoge', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: 'Tencial Test_хуулбар1', messageType: 'flex' },
  { id: 2, status: 'draft', name: 'Тест_хуулбар4', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: '—', messageType: 'empty' },
  { id: 3, status: 'draft', name: 'Тест', segment: 'Сар_хуулбар1', schedule: '2026-04-23 18:11', message: '—', messageType: 'empty' },
  { id: 4, status: 'reserved', name: 'Том_Тест_3', segment: 'Тохируулагдаагүй', schedule: 'Тест', message: 'Том_Тест_1', messageType: 'image' },
  { id: 5, status: 'reserved', name: 'Том_Тест_2', segment: 'Том_Тест(91)', schedule: '2026-03-25 19:15', message: 'Том_Тест_2', messageType: 'image' },
  { id: 6, status: 'draft', name: 'Тест_хаврын_шинэ_үйлчлүүлэгчдийн_кампанит_ажил', segment: 'Тест_түгээлтийн_180_хоногийн_дотор', schedule: '2026-03-20 14:47', message: 'Тест_Flex_мессеж (хаврын шинэ хэрэглэгчид)', messageType: 'flex' },
  { id: 7, status: 'draft', name: 'Тест_сегментлэлт', segment: 'Тест_5%_цахим_сэдэлжүүлэлт_2', schedule: 'Тест_дэлгэрэнгүй_18 цаг', message: 'Тест_5_сарын_5_оноо +5', messageType: 'message', warn: true },
  { id: 8, status: 'draft', name: 'Сэлэнгэ_Тест (анкет асуулга)', segment: 'Тест', schedule: 'Хүлээгдэж_байгаа_тохиргоо', message: 'Косметик_санал_Тест_хуулбар1_хуулбар1', messageType: 'flex' },
  { id: 9, status: 'draft', name: 'Хувийн_Тест', segment: 'Хүлээгдэж_байгаа_тохиргоо', schedule: 'Хүлээгдэж_байгаа_тохиргоо', message: 'Параметр_Тест / Лакко', messageType: 'message' },
  { id: 10, status: 'reserved', name: 'Том_Тест_1', segment: 'Том_Тест(91)', schedule: '2026-03-23 19:15', message: 'Том_Тест_1', messageType: 'message' },
  { id: 11, status: 'reserved', name: 'А_ж_ү_к', segment: 'Сонирхлынхоо_бүртгэл', schedule: '2026-02-25 18:07', message: 'Кампанит_шинэ_санал', messageType: 'message', warn: true },
  { id: 12, status: 'reserved', name: 'Тест', segment: 'Шинэ_Тест', schedule: '2026-03-03 17:30', message: 'Купон_шинэчлэлт', messageType: 'message' },
  { id: 13, status: 'draft', name: 'Тест_Отта', segment: 'Сегмент', schedule: '2026-02-13 12:00', message: 'Тест ⚠', messageType: 'message', warn: true },
  { id: 14, status: 'draft', name: 'Жишээ_1234', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Сонголт_мессеж_хуулбар1', messageType: 'message' },
  { id: 15, status: 'reserved', name: 'Тест_OJIMA_iOS', segment: 'OJIMA_iOS', schedule: '2026-02-05 15:50', message: 'Шошго_Тест', messageType: 'flex' },
  { id: 16, status: 'draft', name: 'Жишээ_үл_хөдлөх (гишүүн_бүртгэл_дэмжлэг)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх (гишүүн_бүртгэл_дэмжлэг)', messageType: 'message' },
  { id: 17, status: 'draft', name: 'Жишээ_үл_хөдлөх (Step_түгээлт + 2 хоног)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх (хайлтын зөвлөгөө)', messageType: 'message' },
  { id: 18, status: 'draft', name: 'Жишээ_үл_хөдлөх (хариу мессеж)', segment: 'Хүлээгдэж_байгаа', schedule: 'Хүлээгдэж_байгаа', message: 'Жишээ_үл_хөдлөх_Тест_сэдэв', messageType: 'message' },
];

export const MOCK_DELIVERIES: SegmentDelivery[] = MOCK_DELIVERIES_BASE.map((row, i) => ({
  ...row,
  surface: SURFACES[i % SURFACES.length]!,
}));

export const MOCK_SEGMENTS: SegmentSummary[] = [
  { name: 'Том_Тест(91)', type: 'Filter', updated: '2026-04-26', count: 91 },
  { name: 'Унтсан_хэрэглэгч', type: 'Filter', updated: '2026-04-22', count: 1840, note: '30+ хоног идэвхгүй' },
  { name: 'Сэдэлжүүлэлт_Class2', type: 'Filter', updated: '2026-04-15', count: 622 },
  { name: 'Сэдэлжүүлэлт_Class1', type: 'Filter', updated: '2026-04-15', count: 412 },
  { name: 'Найзаар_бүртгүүлэх_8_хоногоос_өмнө', type: 'Filter', updated: '2026-04-10', count: 248 },
  {
    name: 'Тест_найзаар_бүртгүүлсэн_өдөр',
    type: 'CSV',
    updated: '2026-04-08',
    count: 1024,
    note: 'CSV upload',
    file: { name: 'friends_today.csv', size: 38900, rows: 1024 },
  },
  {
    name: 'Битүүмжлэгдээгүй_хэрэглэгчид',
    type: 'Query',
    updated: '2026-04-05',
    count: 3120,
    sql: "SELECT\n  DISTINCT line_user_id AS line_user_key_id\nFROM\n  `AutoLine_cs_staging.line_users`\nWHERE\n  blocked_at IS NULL",
  },
  { name: 'Дунд_зорилго', type: 'Filter', updated: '2026-04-01', count: 588 },
  { name: 'Найзаар_бүртгүүлсэн_180_хоногийн_дотор', type: 'Filter', updated: '2026-03-30', count: 4210 },
  { name: 'Найзаар_бүртгүүлснээс_1_долоо_хоногийн_дотор', type: 'Filter', updated: '2026-03-25', count: 380 },
  { name: 'Найзаар_бүртгүүлснээс_3_хоногийн_дараа', type: 'Filter', updated: '2026-03-20', count: 220 },
  { name: '54', type: 'Query', updated: '2026-03-15', count: 54, sql: "SELECT line_user_id AS line_user_key_id\nFROM `AutoLine_cs_staging.line_users`\nWHERE id = 54" },
  {
    name: 'Шинэ-Дамба_UID',
    type: 'Query',
    updated: '2026-03-10',
    count: 1,
    sql: "SELECT\n  DISTINCT id AS line_user_key_id\nFROM\n  `AutoLine_cs_staging.line_users`\nWHERE\n  id = 14",
  },
  { name: 'Найзын_бүртгэлийн_3_хоног', type: 'Filter', updated: '2026-03-05', count: 195 },
];

export const MOCK_FILTER_PALETTE = [
  'OJIMA_iOS',
  'Унтсан_хэрэглэгч',
  'Сэдэлжүүлэлт_Class2',
  'Сэдэлжүүлэлт_Class1',
  'Найзаар_бүртгэх_8_хоногоос_өмнө',
  'Тест_найзаар_бүртгүүлсэн_өдөр',
  'Битүүмжлэгдээгүй',
  'Дунд_зорилго',
  'Найзаар_бүртгүүлсэн_180_хоногийн_дотор',
  'Найзаар_бүртгүүлснээс_1_долоо_хоногийн_дотор',
  '54',
  'Шинэ-Дамба_UID',
];
