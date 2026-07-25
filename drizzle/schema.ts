import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions table
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "responded"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * IndexNow Settings Table
 */
export const indexnowSettings = mysqlTable("indexnow_settings", {
  id: int("id").autoincrement().primaryKey(),
  apiKey: varchar("apiKey", { length: 255 }).notNull(),
  autoSubmit: int("autoSubmit").default(0).notNull(), // 0 = false, 1 = true
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type IndexNowSetting = typeof indexnowSettings.$inferSelect;
export type InsertIndexNowSetting = typeof indexnowSettings.$inferInsert;

/**
 * IndexNow Submissions Log Table
 */
export const indexnowSubmissions = mysqlTable("indexnow_submissions", {
  id: int("id").autoincrement().primaryKey(),
  urls: text("urls").notNull(), // stored as newline-separated list or JSON array
  apiKey: varchar("apiKey", { length: 255 }).notNull(),
  status: int("status").notNull(), // HTTP Status code (e.g. 200, 202, 400) or -1 for error
  responseMessage: text("responseMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IndexNowSubmission = typeof indexnowSubmissions.$inferSelect;
export type InsertIndexNowSubmission = typeof indexnowSubmissions.$inferInsert;

