import { eq, desc, asc, sql } from 'drizzle-orm';
import { db, isDatabaseConfigured } from './index.ts';
import * as schema from './schema.ts';
import { getInitialSeedData } from '../../seed_data.ts';

const entityTableMap: Record<string, any> = {
  OtrPrice: schema.otrPrices,
  otr_prices: schema.otrPrices,
  ClopContract: schema.clopContracts,
  clop_contracts: schema.clopContracts,
  Taksasi: schema.taksasi,
  taksasi: schema.taksasi,
  Target: schema.targets,
  targets: schema.targets,
  BookingQuality: schema.bookingQuality,
  booking_quality: schema.bookingQuality,
  Prospect: schema.prospects,
  prospects: schema.prospects,
  FollowUpBahan: schema.followUpBahan,
  follow_up_bahan: schema.followUpBahan,
  ActivityLog: schema.activityLogs,
  activity_logs: schema.activityLogs,
  User: schema.users,
  users: schema.users
};

export function getTableForEntity(entity: string): any {
  return entityTableMap[entity] || null;
}

export async function seedInitialDataIfEmpty() {
  if (!isDatabaseConfigured) return;

  try {
    const existingOtr = await db.select({ count: sql`count(*)` }).from(schema.otrPrices);
    const count = Number(existingOtr[0]?.count || 0);
    if (count > 0) {
      console.log(`Cloud SQL PostgreSQL already seeded (${count} OTR records found).`);
      return;
    }

    console.log('Seeding initial dataset into Cloud SQL PostgreSQL...');
    const seed = getInitialSeedData();

    if (seed.OtrPrice.length > 0) {
      await db.insert(schema.otrPrices).values(seed.OtrPrice).onConflictDoNothing();
    }
    if (seed.ClopContract.length > 0) {
      await db.insert(schema.clopContracts).values(seed.ClopContract).onConflictDoNothing();
    }
    if (seed.Taksasi.length > 0) {
      await db.insert(schema.taksasi).values(seed.Taksasi as any).onConflictDoNothing();
    }
    if (seed.Target.length > 0) {
      await db.insert(schema.targets).values(seed.Target).onConflictDoNothing();
    }
    if (seed.BookingQuality.length > 0) {
      await db.insert(schema.bookingQuality).values(seed.BookingQuality).onConflictDoNothing();
    }
    if (seed.Prospect.length > 0) {
      await db.insert(schema.prospects).values(seed.Prospect).onConflictDoNothing();
    }
    if (seed.FollowUpBahan.length > 0) {
      await db.insert(schema.followUpBahan).values(seed.FollowUpBahan).onConflictDoNothing();
    }
    if (seed.ActivityLog.length > 0) {
      await db.insert(schema.activityLogs).values(seed.ActivityLog).onConflictDoNothing();
    }
    if (seed.User.length > 0) {
      for (const u of seed.User) {
        await db.insert(schema.users).values({
          uid: u.id,
          email: u.email,
          name: u.name,
          fullName: u.full_name,
          role: u.role,
          cabang: u.cabang,
          phone: u.phone
        }).onConflictDoNothing();
      }
    }
    console.log('Cloud SQL initial seeding complete!');
  } catch (err) {
    console.warn('Initial seeding notice (database may be initializing):', err);
  }
}

export async function listEntity(entityName: string, query: any = {}) {
  const table = getTableForEntity(entityName);
  if (!table || !isDatabaseConfigured) return [];

  try {
    let qb = db.select().from(table);

    // Sorting
    if (query.sort && typeof query.sort === 'string') {
      const isDesc = query.sort.startsWith('-');
      const colName = isDesc ? query.sort.slice(1) : query.sort;
      if (table[colName]) {
        qb = (qb as any).orderBy(isDesc ? desc(table[colName]) : asc(table[colName]));
      }
    }

    // Limit and Offset
    const limit = Number(query.limit) || 1000;
    const skip = Number(query.skip) || 0;
    if (limit > 0) qb = (qb as any).limit(limit);
    if (skip > 0) qb = (qb as any).offset(skip);

    const rows = await qb;

    // Filter in-memory if custom complex `q` is passed
    if (query.q) {
      try {
        const filterObj = typeof query.q === 'string' ? JSON.parse(query.q) : query.q;
        if (filterObj && typeof filterObj === 'object') {
          return rows.filter((item: any) => {
            for (const [k, v] of Object.entries(filterObj)) {
              if (v !== undefined && v !== null && v !== '') {
                if (String(item[k] || '').toLowerCase() !== String(v).toLowerCase()) {
                  return false;
                }
              }
            }
            return true;
          });
        }
      } catch {}
    }

    return rows;
  } catch (error) {
    console.error(`Error querying ${entityName} from Cloud SQL:`, error);
    throw new Error(`Database query failed for ${entityName}`, { cause: error });
  }
}

export async function getEntityById(entityName: string, id: string) {
  const table = getTableForEntity(entityName);
  if (!table || !isDatabaseConfigured) return null;

  try {
    const rows = await db.select().from(table).where(eq(table.id, id)).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error(`Error finding ${entityName}#${id} in Cloud SQL:`, error);
    throw new Error(`Failed to find ${entityName}`, { cause: error });
  }
}

export async function createEntityRecord(entityName: string, data: any) {
  const table = getTableForEntity(entityName);
  if (!table) throw new Error(`Unknown entity ${entityName}`);
  if (!isDatabaseConfigured) throw new Error('Database is not configured; using fallback store.');

  try {
    const id = data.id || `${entityName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const createdDate = data.created_date || new Date().toISOString();
    const item = { ...data, id, created_date: createdDate };

    await db.insert(table).values(item);
    return item;
  } catch (error) {
    console.error(`Error creating ${entityName} in Cloud SQL:`, error);
    throw new Error(`Failed to create ${entityName}`, { cause: error });
  }
}

export async function updateEntityRecord(entityName: string, id: string, data: any) {
  const table = getTableForEntity(entityName);
  if (!table) throw new Error(`Unknown entity ${entityName}`);
  if (!isDatabaseConfigured) throw new Error('Database is not configured; using fallback store.');

  try {
    const { id: _, ...updateData } = data;
    await db.update(table).set(updateData).where(eq(table.id, id));
    return { id, ...data };
  } catch (error) {
    console.error(`Error updating ${entityName} in Cloud SQL:`, error);
    throw new Error(`Failed to update ${entityName}`, { cause: error });
  }
}

export async function deleteEntityRecord(entityName: string, id: string) {
  const table = getTableForEntity(entityName);
  if (!table) throw new Error(`Unknown entity ${entityName}`);
  if (!isDatabaseConfigured) throw new Error('Database is not configured; using fallback store.');

  try {
    await db.delete(table).where(eq(table.id, id));
    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting ${entityName} from Cloud SQL:`, error);
    throw new Error(`Failed to delete ${entityName}`, { cause: error });
  }
}

export async function bulkInsertEntityRecords(entityName: string, records: any[]) {
  const table = getTableForEntity(entityName);
  if (!table) throw new Error(`Unknown entity ${entityName}`);
  if (!isDatabaseConfigured) throw new Error('Database is not configured; using fallback store.');

  try {
    const items = records.map((r, i) => ({
      ...r,
      id: r.id || `${entityName.toLowerCase()}_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 5)}`,
      created_date: r.created_date || new Date().toISOString()
    }));

    if (items.length > 0) {
      await db.insert(table).values(items);
    }
    return items;
  } catch (error) {
    console.error(`Error bulk inserting into ${entityName} in Cloud SQL:`, error);
    throw new Error(`Failed to bulk insert ${entityName}`, { cause: error });
  }
}
