import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertToolSchema, insertFavoriteSchema, insertTemplateSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  // Tools routes
  app.get("/api/tools", async (req, res) => {
    try {
      const category = req.query.category as string;
      const tools = category 
        ? await storage.getToolsByCategory(category)
        : await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  app.get("/api/tools/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.getTool(id);
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(400).json({ error: "Invalid tool ID" });
    }
  });

  app.post("/api/tools", async (req, res) => {
    try {
      const toolData = insertToolSchema.parse(req.body);
      const tool = await storage.createTool(toolData);
      res.json(tool);
    } catch (error) {
      res.status(400).json({ error: "Invalid tool data" });
    }
  });

  app.patch("/api/tools/:id/usage", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.updateToolUsage(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to update tool usage" });
    }
  });

  // Favorites routes
  app.get("/api/users/:userId/favorites", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const favoriteData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(favoriteData);
      res.json(favorite);
    } catch (error) {
      res.status(400).json({ error: "Invalid favorite data" });
    }
  });

  app.delete("/api/favorites", async (req, res) => {
    try {
      const { userId, toolId } = req.body;
      await storage.removeFavorite(userId, toolId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to remove favorite" });
    }
  });

  // Templates routes
  app.get("/api/templates", async (req, res) => {
    try {
      const category = req.query.category as string;
      const templates = category 
        ? await storage.getTemplatesByCategory(category)
        : await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getTemplate(id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(400).json({ error: "Invalid template ID" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(templateData);
      res.json(template);
    } catch (error) {
      res.status(400).json({ error: "Invalid template data" });
    }
  });

  app.patch("/api/templates/:id/usage", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.updateTemplateUsage(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to update template usage" });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const chatHistory = await storage.getChatHistory(userId);
      res.json(chatHistory);
    } catch (error) {
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      
      // Simulate AI response
      const aiResponse = `AI 응답: ${messageData.message}에 대한 도움을 드릴게요!`;
      
      const message = await storage.createChatMessage({
        ...messageData,
        response: aiResponse
      });
      
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // Stats route for admin
  app.get("/api/stats", async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      const templates = await storage.getAllTemplates();
      
      const stats = {
        totalUsers: 12547,
        totalPosts: 89234,
        dailyActiveUsers: 2456,
        systemStatus: "정상",
        popularTools: tools
          .sort((a, b) => b.usageCount - a.usageCount)
          .slice(0, 4)
          .map(tool => ({ name: tool.name, usage: `${tool.usageCount}회` }))
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
