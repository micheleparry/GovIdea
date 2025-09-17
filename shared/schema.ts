import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  agency: text("agency").notNull(),
  deadline: timestamp("deadline").notNull(),
  contractValue: text("contract_value").notNull(),
  estimatedMin: decimal("estimated_min"),
  estimatedMax: decimal("estimated_max"),
  feasibilityScore: integer("feasibility_score").notNull(),
  impactScore: integer("impact_score").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  category: text("category").notNull(),
  sourceUrl: text("source_url"),
  isHot: boolean("is_hot").default(false),
  isHighImpact: boolean("is_high_impact").default(false),
  requirements: text("requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trends = pgTable("trends", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  topic: text("topic").notNull(),
  description: text("description").notNull(),
  changePercentage: decimal("change_percentage").notNull(),
  trend: text("trend").notNull(), // 'up', 'down', 'stable'
  category: text("category").notNull(),
  color: text("color").notNull(), // for UI styling
  createdAt: timestamp("created_at").defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metric: text("metric").notNull(),
  value: decimal("value").notNull(),
  period: text("period").notNull(), // 'daily', 'weekly', 'monthly'
  date: timestamp("date").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertOpportunitySchema = createInsertSchema(opportunities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTrendSchema = createInsertSchema(trends).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  date: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Opportunity = typeof opportunities.$inferSelect;
export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type Trend = typeof trends.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
