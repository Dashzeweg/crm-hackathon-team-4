export type CampaignStatus = 'draft' | 'active' | 'paused' | 'archived';

export interface CampaignSummary {
  id: string;
  name: string;
  status: CampaignStatus;
  segment: string;
  objective: string;
  updatedAt: string; // YYYY-MM-DD
  owner: string;
  steps: number;
}

export const MOCK_CAMPAIGNS: CampaignSummary[] = [
  {
    id: 'cmp_001',
    name: 'Шинэ хэрэглэгчийн компанит ажил',
    status: 'active',
    segment: 'Найзаар_бүртгүүлсэн_180_хоногийн_дотор',
    objective: 'Анхны 7 хоногийн идэвхийг өсгөх',
    updatedAt: '2026-05-04',
    owner: 'Munkhuush',
    steps: 6,
  },
  {
    id: 'cmp_002',
    name: 'Унтсан хэрэглэгч сэргээх (ваучер)',
    status: 'draft',
    segment: 'Унтсан_хэрэглэгч',
    objective: 'Дахин худалдан авалт өдөөх',
    updatedAt: '2026-05-03',
    owner: 'Munkhuush',
    steps: 4,
  },
  {
    id: 'cmp_003',
    name: 'VIP дахин захиалах сануулга',
    status: 'paused',
    segment: 'Дунд_зорилго',
    objective: 'Дундаж захиалгын давтамж нэмэх',
    updatedAt: '2026-04-29',
    owner: 'Admin',
    steps: 5,
  },
  {
    id: 'cmp_004',
    name: 'Амралтын өдрийн онцгой урамшуулал',
    status: 'draft',
    segment: 'Сэдэлжүүлэлт_Class2',
    objective: 'CTR өсгөх',
    updatedAt: '2026-04-25',
    owner: 'Admin',
    steps: 3,
  },
];

