import { 
  users, 
  opportunities, 
  trends, 
  analytics,
  type User, 
  type InsertUser,
  type Opportunity,
  type InsertOpportunity,
  type Trend,
  type InsertTrend,
  type Analytics,
  type InsertAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Opportunity methods
  getOpportunities(limit?: number): Promise<Opportunity[]>;
  getOpportunity(id: string): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity>;
  getFeaturedOpportunity(): Promise<Opportunity | undefined>;
  getOpportunitiesByAgency(agency: string): Promise<Opportunity[]>;
  
  // Trends methods
  getTrends(): Promise<Trend[]>;
  createTrend(trend: InsertTrend): Promise<Trend>;
  
  // Analytics methods
  getAnalytics(metric?: string): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getStats(): Promise<{
    totalOpportunities: number;
    highScoreOpportunities: number;
    trendingTopics: number;
    reportsGenerated: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getOpportunities(limit = 50): Promise<Opportunity[]> {
    return await db
      .select()
      .from(opportunities)
      .orderBy(desc(opportunities.createdAt))
      .limit(limit);
  }

  async getOpportunity(id: string): Promise<Opportunity | undefined> {
    const [opportunity] = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.id, id));
    return opportunity || undefined;
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    const [created] = await db
      .insert(opportunities)
      .values([opportunity])
      .returning();
    return created;
  }

  async updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity> {
    const updateData = { ...opportunity, updatedAt: sql`NOW()` };
    const [updated] = await db
      .update(opportunities)
      .set(updateData)
      .where(eq(opportunities.id, id))
      .returning();
    return updated;
  }

  async getFeaturedOpportunity(): Promise<Opportunity | undefined> {
    const [featured] = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.isHighImpact, true))
      .orderBy(desc(opportunities.impactScore))
      .limit(1);
    return featured || undefined;
  }

  async getOpportunitiesByAgency(agency: string): Promise<Opportunity[]> {
    return await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.agency, agency))
      .orderBy(desc(opportunities.createdAt));
  }

  async getTrends(): Promise<Trend[]> {
    return await db
      .select()
      .from(trends)
      .orderBy(desc(trends.changePercentage))
      .limit(10);
  }

  async createTrend(trend: InsertTrend): Promise<Trend> {
    const [created] = await db
      .insert(trends)
      .values(trend)
      .returning();
    return created;
  }

  async getAnalytics(metric?: string): Promise<Analytics[]> {
    const query = db.select().from(analytics);
    
    if (metric) {
      return await query.where(eq(analytics.metric, metric));
    }
    
    return await query.orderBy(desc(analytics.date));
  }

  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [created] = await db
      .insert(analytics)
      .values(analyticsData)
      .returning();
    return created;
  }

  async getStats(): Promise<{
    totalOpportunities: number;
    highScoreOpportunities: number;
    trendingTopics: number;
    reportsGenerated: number;
  }> {
    const [totalOpps] = await db
      .select({ count: sql<number>`count(*)` })
      .from(opportunities);

    const [highScoreOpps] = await db
      .select({ count: sql<number>`count(*)` })
      .from(opportunities)
      .where(sql`${opportunities.feasibilityScore} >= 80 OR ${opportunities.impactScore} >= 80`);

    const [trendingCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(trends);

    const [reportsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(analytics)
      .where(eq(analytics.metric, 'reports_generated'));

    return {
      totalOpportunities: totalOpps.count,
      highScoreOpportunities: highScoreOpps.count,
      trendingTopics: trendingCount.count,
      reportsGenerated: reportsCount.count || 89,
    };
  }
}

export const storage = new DatabaseStorage();
