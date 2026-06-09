import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contactSubmissions, InsertContactSubmission, indexnowSettings, indexnowSubmissions, InsertIndexNowSetting, InsertIndexNowSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(contactSubmissions).values(data);
  return result;
}

export async function getContactSubmissions(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submissions: database not available");
    return [];
  }

  return await db.select().from(contactSubmissions).limit(limit).offset(offset);
}

export async function getIndexNowSettings() {
  const defaultSettings = {
    id: 1,
    apiKey: "20d9bc2cd3fd486a8fd9c9ef33f1cb20",
    autoSubmit: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get IndexNow settings: database not available. Returning defaults.");
    return defaultSettings;
  }

  try {
    const result = await db.select().from(indexnowSettings).limit(1);
    if (result.length > 0) {
      return result[0];
    }

    // Initialize default row if not exists
    await db.insert(indexnowSettings).values({
      id: 1,
      apiKey: defaultSettings.apiKey,
      autoSubmit: defaultSettings.autoSubmit,
    });
    return defaultSettings;
  } catch (error) {
    console.error("[Database] Failed to get/initialize IndexNow settings:", error);
    return defaultSettings;
  }
}

export async function updateIndexNowSettings(apiKey: string, autoSubmit: boolean) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update IndexNow settings: database not available.");
    return;
  }

  try {
    const autoSubmitVal = autoSubmit ? 1 : 0;
    await db.insert(indexnowSettings).values({
      id: 1,
      apiKey,
      autoSubmit: autoSubmitVal,
    }).onDuplicateKeyUpdate({
      set: {
        apiKey,
        autoSubmit: autoSubmitVal,
      }
    });
  } catch (error) {
    console.error("[Database] Failed to update IndexNow settings:", error);
    throw error;
  }
}

export async function addIndexNowSubmission(urls: string[], apiKey: string, status: number, responseMessage?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add IndexNow submission: database not available.");
    return;
  }

  try {
    await db.insert(indexnowSubmissions).values({
      urls: urls.join("\n"),
      apiKey,
      status,
      responseMessage: responseMessage || null,
    });
  } catch (error) {
    console.error("[Database] Failed to log IndexNow submission:", error);
  }
}

export async function getIndexNowSubmissions(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get IndexNow submissions: database not available.");
    return [];
  }

  try {
    return await db.select().from(indexnowSubmissions).orderBy(desc(indexnowSubmissions.createdAt)).limit(limit).offset(offset);
  } catch (error) {
    console.error("[Database] Failed to get IndexNow submissions:", error);
    return [];
  }
}

