import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOpportunitySchema, insertTrendSchema, insertAnalyticsSchema } from "@shared/schema";
import { anthropicService } from "./services/anthropic.js";
import { scraperService } from "./services/scraper";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get dashboard stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get opportunities
  app.get("/api/opportunities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const agency = req.query.agency as string;
      
      let opportunities;
      if (agency) {
        opportunities = await storage.getOpportunitiesByAgency(agency);
      } else {
        opportunities = await storage.getOpportunities(limit);
      }
      
      res.json(opportunities);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      res.status(500).json({ message: "Failed to fetch opportunities" });
    }
  });

  // Get featured opportunity
  app.get("/api/opportunities/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedOpportunity();
      if (!featured) {
        return res.status(404).json({ message: "No featured opportunity found" });
      }
      res.json(featured);
    } catch (error) {
      console.error("Error fetching featured opportunity:", error);
      res.status(500).json({ message: "Failed to fetch featured opportunity" });
    }
  });

  // Get single opportunity
  app.get("/api/opportunities/:id", async (req, res) => {
    try {
      const opportunity = await storage.getOpportunity(req.params.id);
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error) {
      console.error("Error fetching opportunity:", error);
      res.status(500).json({ message: "Failed to fetch opportunity" });
    }
  });

  // Create opportunity with AI analysis
  app.post("/api/opportunities", async (req, res) => {
    try {
      const validatedData = insertOpportunitySchema.parse(req.body);
      
      // Get AI analysis for scoring
      const aiAnalysis = await anthropicService.analyzeOpportunity(validatedData);
      
      const opportunityWithScores = {
        ...validatedData,
        feasibilityScore: aiAnalysis.feasibilityScore,
        impactScore: aiAnalysis.impactScore,
        isHighImpact: aiAnalysis.impactScore >= 80,
      };
      
      const opportunity = await storage.createOpportunity(opportunityWithScores);
      res.status(201).json(opportunity);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      res.status(500).json({ message: "Failed to create opportunity" });
    }
  });

  // Get trends
  app.get("/api/trends", async (req, res) => {
    try {
      const trends = await storage.getTrends();
      res.json(trends);
    } catch (error) {
      console.error("Error fetching trends:", error);
      res.status(500).json({ message: "Failed to fetch trends" });
    }
  });

  // Create trend
  app.post("/api/trends", async (req, res) => {
    try {
      const validatedData = insertTrendSchema.parse(req.body);
      const trend = await storage.createTrend(validatedData);
      res.status(201).json(trend);
    } catch (error) {
      console.error("Error creating trend:", error);
      res.status(500).json({ message: "Failed to create trend" });
    }
  });

  // Get analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const metric = req.query.metric as string;
      const analytics = await storage.getAnalytics(metric);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Trigger web scraping
  app.post("/api/scrape", async (req, res) => {
    try {
      const { source } = req.body;
      const results = await scraperService.scrapeSource(source);
      
      // Process scraped opportunities with AI
      for (const opportunity of results) {
        try {
          const aiAnalysis = await anthropicService.analyzeOpportunity(opportunity);
          const fullOpportunity = {
            title: opportunity.title || 'Unknown Title',
            description: opportunity.description || 'No description available', 
            agency: opportunity.agency || 'Unknown Agency',
            deadline: opportunity.deadline || new Date(),
            contractValue: opportunity.contractValue || 'TBD',
            category: opportunity.category || 'General',
            feasibilityScore: aiAnalysis.feasibilityScore,
            impactScore: aiAnalysis.impactScore,
            isHighImpact: aiAnalysis.impactScore >= 80,
            ...opportunity,
          };
          await storage.createOpportunity(fullOpportunity);
        } catch (error) {
          console.error("Error processing scraped opportunity:", error);
        }
      }
      
      res.json({ message: `Scraped and processed ${results.length} opportunities`, count: results.length });
    } catch (error) {
      console.error("Error in scraping:", error);
      res.status(500).json({ message: "Failed to scrape data" });
    }
  });

  // Generate AI research report
  app.post("/api/reports/generate", async (req, res) => {
    try {
      const { opportunityId, sector } = req.body;
      
      let report;
      if (opportunityId) {
        const opportunity = await storage.getOpportunity(opportunityId);
        if (!opportunity) {
          return res.status(404).json({ message: "Opportunity not found" });
        }
        report = await anthropicService.generateOpportunityReport(opportunity);
      } else if (sector) {
        const opportunities = await storage.getOpportunities();
        const sectorOpportunities = opportunities.filter(op => 
          op.category.toLowerCase().includes(sector.toLowerCase()) ||
          op.agency.toLowerCase().includes(sector.toLowerCase())
        );
        report = await anthropicService.generateSectorReport(sector, sectorOpportunities);
      } else {
        return res.status(400).json({ message: "Either opportunityId or sector is required" });
      }
      
      res.json({ report });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Failed to generate report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
