import { pgTable, serial, text, integer, doublePrecision, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  fullName: text('full_name'),
  role: text('role').default('marketing'),
  cabang: text('cabang').default('Cabang Jakarta Pusat'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow()
});

export const otrPrices = pgTable('otr_prices', {
  id: text('id').primaryKey(),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  object_description: text('object_description'),
  group_type_unit: text('group_type_unit'),
  year: integer('year').notNull(),
  harga_pasar: doublePrecision('harga_pasar').notNull(),
  search_text: text('search_text'),
  created_date: text('created_date')
});

export const clopContracts = pgTable('clop_contracts', {
  id: text('id').primaryKey(),
  contract_no: text('contract_no').notNull().unique(),
  nosin: text('nosin'),
  office_code: text('office_code'),
  buss_unit: text('buss_unit'),
  trend_cycle: text('trend_cycle'),
  customer_name: text('customer_name').notNull(),
  created_date: text('created_date')
});

export const taksasi = pgTable('taksasi', {
  id: text('id').primaryKey(),
  customer_name: text('customer_name').notNull(),
  contract_no: text('contract_no'),
  brand: text('brand'),
  model: text('model'),
  year: integer('year'),
  otr: doublePrecision('otr'),
  km: integer('km'),
  tahun_motor: integer('tahun_motor'),
  nama_bpkb: text('nama_bpkb'),
  persen_taksasi: doublePrecision('persen_taksasi'),
  harga_taksasi: doublePrecision('harga_taksasi'),
  risk: text('risk'),
  tipe_customer: text('tipe_customer'),
  cori: text('cori'),
  merk_motor: text('merk_motor'),
  plafond: doublePrecision('plafond'),
  status: text('status').default('proses'),
  created_date: text('created_date')
});

export const targets = pgTable('targets', {
  id: text('id').primaryKey(),
  marketing_name: text('marketing_name').notNull(),
  cabang: text('cabang'),
  month: text('month').notNull(),
  target_amount: doublePrecision('target_amount').notNull(),
  target_count: integer('target_count').default(0),
  created_date: text('created_date')
});

export const bookingQuality = pgTable('booking_quality', {
  id: text('id').primaryKey(),
  contract_no: text('contract_no').notNull(),
  customer_name: text('customer_name').notNull(),
  status_account: text('status_account').notNull(),
  jatuh_tempo: text('jatuh_tempo').notNull(),
  angsuran: doublePrecision('angsuran'),
  marketing_name: text('marketing_name'),
  created_date: text('created_date')
});

export const prospects = pgTable('prospects', {
  id: text('id').primaryKey(),
  customer_name: text('customer_name').notNull(),
  phone: text('phone'),
  status: text('status').default('baru'),
  motor: text('motor'),
  plafond: doublePrecision('plafond'),
  marketing_name: text('marketing_name'),
  created_date: text('created_date')
});

export const followUpBahan = pgTable('follow_up_bahan', {
  id: text('id').primaryKey(),
  customer_name: text('customer_name').notNull(),
  phone: text('phone'),
  motor: text('motor'),
  status: text('status').default('bahan'),
  notes: text('notes'),
  marketing_name: text('marketing_name'),
  created_date: text('created_date')
});

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  action: text('action').notNull(),
  detail: text('detail'),
  marketing_name: text('marketing_name'),
  created_date: text('created_date')
});
