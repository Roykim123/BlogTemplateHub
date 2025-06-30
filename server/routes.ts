import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { ensureAuthenticated, ensureAdmin } from "./auth";
import { 
  insertUserSchema, 
  insertToolSchema, 
  insertTemplateSchema, 
  insertChatMessageSchema,
  insertFavoriteSchema,
  insertStoreInfoSchema,
  insertPostSchema,
  insertCashTransactionSchema,
  insertAutomationProgressSchema,
  insertChallengerMissionSchema
} from "@shared/schema";
import { storage } from "./storage";
import { z } from "zod";

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

  // Store Information routes
  app.get("/api/users/:userId/store-info", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      // TODO: Implement when database is ready
      // const storeInfos = await storage.getUserStoreInfos(userId);
      const mockStoreInfos = [
        {
          id: 1,
          userId,
          storeName: "카페 걱정마",
          productName: "아메리카노",
          address: "서울시 강남구 테헤란로 123",
          website: "https://ggokcafe.com",
          description: "신선한 원두로 만든 프리미엄 커피",
          mainKeyword: "강남 카페",
          hashtags: "#강남카페 #아메리카노 #프리미엄커피",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      res.json(mockStoreInfos);
    } catch (error) {
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  app.post("/api/store-info", async (req, res) => {
    try {
      // TODO: Validate with proper schema when database is ready
      const storeData = req.body;
      const requiredFields = ['userId', 'storeName', 'productName', 'address', 'description', 'mainKeyword'];
      
      for (const field of requiredFields) {
        if (!storeData[field]) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }
      
      // TODO: Implement when database is ready
      // const storeInfo = await storage.createStoreInfo(storeData);
      const mockStoreInfo = {
        id: Date.now(),
        ...storeData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      res.json(mockStoreInfo);
    } catch (error) {
      res.status(400).json({ error: "Invalid store information data" });
    }
  });

  app.put("/api/store-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // TODO: Implement when database is ready
      // const updatedStore = await storage.updateStoreInfo(id, updateData);
      const mockUpdatedStore = {
        id,
        ...updateData,
        updatedAt: new Date()
      };
      
      res.json(mockUpdatedStore);
    } catch (error) {
      res.status(400).json({ error: "Failed to update store information" });
    }
  });

  app.delete("/api/store-info/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // TODO: Implement when database is ready
      // await storage.deleteStoreInfo(id);
      
      res.json({ success: true, message: "Store information deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete store information" });
    }
  });

  // Board/Community routes
  app.get("/api/posts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      
      // TODO: Implement when database is ready
      // const posts = await storage.getPosts({ category, limit, offset });
      const mockPosts = [
        {
          id: 1,
          title: "AI 블로그 자동화 후기",
          content: "딸깍AI로 블로그 포스팅이 정말 쉬워졌어요!",
          author: "김걱정마",
          avatar: "김",
          category: "후기",
          createdAt: "2시간 전",
          likes: 45,
          comments: 12,
          views: 234,
          isHot: true
        }
      ];
      
      res.json(mockPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      // TODO: Validate with proper schema when database is ready
      const postData = req.body;
      const requiredFields = ['title', 'content', 'category', 'userId'];
      
      for (const field of requiredFields) {
        if (!postData[field]) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }
      
      // TODO: Implement when database is ready
      // const post = await storage.createPost(postData);
      const mockPost = {
        id: Date.now(),
        ...postData,
        author: "나",
        avatar: "나",
        createdAt: "방금 전",
        likes: 0,
        comments: 0,
        views: 1,
        isHot: false
      };
      
      res.json(mockPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // TODO: Implement when database is ready
      // const updatedPost = await storage.updatePost(id, updateData);
      const mockUpdatedPost = {
        id,
        ...updateData,
        updatedAt: new Date()
      };
      
      res.json(mockUpdatedPost);
    } catch (error) {
      res.status(400).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // TODO: Implement when database is ready
      // await storage.deletePost(id);
      
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete post" });
    }
  });

  // AI Cash and Payment routes
  app.get("/api/users/:userId/ai-cash", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      // TODO: Implement when database is ready
      // const user = await storage.getUser(userId);
      const mockUser = {
        id: userId,
        aiCash: 12450,
        cashHistory: [
          { id: 1, amount: 1000, type: "purchase", description: "AI캐쉬 충전", date: new Date() },
          { id: 2, amount: -500, type: "usage", description: "상품정보 추가", date: new Date() }
        ]
      };
      
      res.json(mockUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  app.post("/api/users/:userId/ai-cash/charge", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { amount, paymentMethod } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      
      // TODO: Implement when database is ready
      // const updatedUser = await storage.updateUserAiCash(userId, amount);
      
      res.json({ 
        success: true, 
        message: `${amount}캐쉬가 충전되었습니다.`,
        newBalance: 12450 + amount
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to charge AI Cash" });
    }
  });

  app.post("/api/users/:userId/ai-cash/spend", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { amount, description } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      
      // TODO: Implement when database is ready
      // const user = await storage.getUser(userId);
      // if (user.aiCash < amount) {
      //   return res.status(400).json({ error: "Insufficient AI Cash" });
      // }
      // const updatedUser = await storage.updateUserAiCash(userId, -amount);
      
      res.json({ 
        success: true, 
        message: `${amount}캐쉬가 차감되었습니다.`,
        newBalance: 12450 - amount
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to spend AI Cash" });
    }
  });

  // Automation Progress routes
  app.get("/api/automation/:toolId/progress/:userId", async (req, res) => {
    try {
      const toolId = parseInt(req.params.toolId);
      const userId = parseInt(req.params.userId);
      
      // TODO: Implement when database is ready
      // const progress = await storage.getAutomationProgress(toolId, userId);
      const mockProgress = {
        userId,
        toolId,
        currentStage: 1,
        totalStages: 6,
        isCompleted: false,
        stages: [
          { id: 1, name: "정보 수집", completed: true },
          { id: 2, name: "컨텐츠 생성", completed: false },
          { id: 3, name: "이미지 선택", completed: false },
          { id: 4, name: "최종 검토", completed: false },
          { id: 5, name: "플랫폼 업로드", completed: false },
          { id: 6, name: "완료", completed: false }
        ]
      };
      
      res.json(mockProgress);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch automation progress" });
    }
  });

  app.post("/api/automation/:toolId/progress/:userId", async (req, res) => {
    try {
      const toolId = parseInt(req.params.toolId);
      const userId = parseInt(req.params.userId);
      const { stage, completed } = req.body;
      
      // TODO: Implement when database is ready
      // const updatedProgress = await storage.updateAutomationProgress(toolId, userId, stage, completed);
      
      res.json({ 
        success: true, 
        message: "Progress updated successfully",
        stage,
        completed
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to update automation progress" });
    }
  });

  // Challenger Mission routes
  app.get("/api/missions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      // TODO: Implement when database is ready
      // const missions = await storage.getUserMissions(userId);
      const mockMissions = {
        userId,
        currentDay: 1,
        missions: [
          { id: 1, name: "AI 글쓰기", completed: false, reward: 100 },
          { id: 2, name: "동영상 시청", completed: false, reward: 50 },
          { id: 3, name: "친구에게 공유", completed: false, reward: 150 },
          { id: 4, name: "게시판 구경", completed: false, reward: 75 }
        ]
      };
      
      res.json(mockMissions);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch missions" });
    }
  });

  app.post("/api/missions/:userId/complete", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { missionId, day } = req.body;
      
      // TODO: Implement when database is ready
      // const result = await storage.completeMission(userId, missionId, day);
      
      res.json({ 
        success: true, 
        message: "Mission completed!",
        rewardEarned: 100
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to complete mission" });
    }
  });

  // Store Information routes
  app.get("/api/store-info", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const storeInfos = await storage.getUserStoreInfos(userId);
      res.json(storeInfos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch store information" });
    }
  });

  app.post("/api/store-info", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const storeInfoData = insertStoreInfoSchema.parse({ ...req.body, userId });
      const storeInfo = await storage.createStoreInfo(storeInfoData);
      res.json(storeInfo);
    } catch (error) {
      res.status(400).json({ error: "Invalid store information data" });
    }
  });

  app.patch("/api/store-info/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const storeInfo = await storage.updateStoreInfo(id, updateData);
      if (!storeInfo) {
        return res.status(404).json({ error: "Store information not found" });
      }
      res.json(storeInfo);
    } catch (error) {
      res.status(400).json({ error: "Failed to update store information" });
    }
  });

  app.delete("/api/store-info/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteStoreInfo(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete store information" });
    }
  });

  // Community Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const category = req.query.category as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;
      
      const posts = await storage.getPosts({ category, limit, offset });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      await storage.incrementPostViews(id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const postData = insertPostSchema.parse({ ...req.body, userId });
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.patch("/api/posts/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const post = await storage.updatePost(id, updateData);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePost(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // AI Cash Transaction routes
  app.get("/api/cash-transactions", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const transactions = await storage.getUserCashTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/cash-transactions", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const transactionData = insertCashTransactionSchema.parse({ ...req.body, userId });
      const transaction = await storage.createCashTransaction(transactionData);
      
      // Update user's AI cash balance
      const user = await storage.getUser(userId);
      if (user) {
        const newBalance = user.aiCash + transactionData.amount;
        await storage.updateUserAiCash(userId, newBalance);
      }
      
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  // Automation Progress routes
  app.get("/api/automation-progress/:toolId", ensureAuthenticated, async (req, res) => {
    try {
      const toolId = parseInt(req.params.toolId);
      const userId = (req.user as any)?.id;
      const progress = await storage.getAutomationProgress(toolId, userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch automation progress" });
    }
  });

  app.post("/api/automation-progress", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const progressData = insertAutomationProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.createAutomationProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  app.patch("/api/automation-progress/:toolId", ensureAuthenticated, async (req, res) => {
    try {
      const toolId = parseInt(req.params.toolId);
      const userId = (req.user as any)?.id;
      const { stage, completed } = req.body;
      const progress = await storage.updateAutomationProgress(toolId, userId, stage, completed);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Failed to update progress" });
    }
  });

  // Challenger Missions routes
  app.get("/api/missions", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const day = req.query.day ? parseInt(req.query.day as string) : undefined;
      const missions = await storage.getUserMissions(userId, day);
      res.json(missions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch missions" });
    }
  });

  app.post("/api/missions", ensureAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const missionData = insertChallengerMissionSchema.parse({ ...req.body, userId });
      const mission = await storage.createMission(missionData);
      res.json(mission);
    } catch (error) {
      res.status(400).json({ error: "Invalid mission data" });
    }
  });

  app.patch("/api/missions/:missionId/complete", ensureAuthenticated, async (req, res) => {
    try {
      const missionId = parseInt(req.params.missionId);
      const userId = (req.user as any)?.id;
      const { day } = req.body;
      const mission = await storage.completeMission(userId, missionId, day);
      
      // Reward AI cash for completed mission
      if (mission) {
        const user = await storage.getUser(userId);
        if (user) {
          const newBalance = user.aiCash + (mission.reward || 1000);
          await storage.updateUserAiCash(userId, newBalance);
          
          // Create transaction record
          await storage.createCashTransaction({
            userId,
            amount: mission.reward || 1000,
            type: "earn",
            description: `미션 완료 보상: ${mission.missionId}`,
          });
        }
      }
      
      res.json(mission);
    } catch (error) {
      res.status(400).json({ error: "Failed to complete mission" });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", ensureAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const tools = await storage.getAllTools();
      
      const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.isActive).length,
        totalTools: tools.length,
        totalCashTransactions: 0, // TODO: Add transaction count
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin stats" });
    }
  });

  app.get("/api/admin/users", ensureAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/tools", ensureAdmin, async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  app.patch("/api/admin/users/:id/cash", ensureAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { amount } = req.body;
      const user = await storage.updateUserAiCash(id, amount);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user cash" });
    }
  });

  app.patch("/api/admin/tools/:id", ensureAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const tool = await storage.updateTool(id, updateData);
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(400).json({ error: "Failed to update tool" });
    }
  });

  // ==================== BUSINESS OPERATION ADMIN ENDPOINTS ====================
  
  // Update user subscription plan (requested feature)
  app.patch("/api/admin/users/:userId/plan", ensureAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { subscriptionTier } = req.body;
      
      if (!['free', 'basic', 'pro', 'enterprise'].includes(subscriptionTier)) {
        return res.status(400).json({ error: "Invalid subscription tier" });
      }

      const user = await storage.updateUser(userId, { 
        subscriptionTier,
        subscriptionStatus: 'active',
        updatedAt: new Date()
      });
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user plan:", error);
      res.status(500).json({ error: "Failed to update user plan" });
    }
  });

  // Update user active/inactive status (requested feature)
  app.patch("/api/admin/users/:userId/status", ensureAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { isActive } = req.body;

      const user = await storage.updateUser(userId, { 
        isActive,
        updatedAt: new Date()
      });
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ error: "Failed to update user status" });
    }
  });

  // Feature access control settings (requested feature)
  app.get("/api/admin/features", ensureAdmin, async (req, res) => {
    try {
      // Feature settings for access control
      const features = [
        { 
          id: "blog-templates", 
          name: "블로그 템플릿", 
          description: "블로그 자동 생성 기능", 
          freeAccess: true, 
          isActive: true 
        },
        { 
          id: "sns-automation", 
          name: "SNS 자동화", 
          description: "딸깍AI 자동포스팅", 
          freeAccess: false, 
          isActive: true 
        },
        { 
          id: "ai-chat", 
          name: "AI 채팅", 
          description: "AI와의 대화 기능", 
          freeAccess: true, 
          isActive: true 
        },
        { 
          id: "premium-templates", 
          name: "프리미엄 템플릿", 
          description: "고급 템플릿 모음", 
          freeAccess: false, 
          isActive: true 
        },
        { 
          id: "challenger-missions", 
          name: "챌린저 미션", 
          description: "7일 챌린저 프로그램", 
          freeAccess: true, 
          isActive: true 
        },
        { 
          id: "community-board", 
          name: "커뮤니티 게시판", 
          description: "사용자 커뮤니티", 
          freeAccess: true, 
          isActive: true 
        }
      ];

      res.json(features);
    } catch (error) {
      console.error("Error fetching features:", error);
      res.status(500).json({ error: "Failed to fetch features" });
    }
  });

  // Update feature access settings (requested feature)
  app.patch("/api/admin/features/:featureId", ensureAdmin, async (req, res) => {
    try {
      const { featureId } = req.params;
      const { freeAccess, isActive } = req.body;

      // This would update feature settings in database
      // For now, returning updated feature object
      const updatedFeature = {
        id: featureId,
        freeAccess,
        isActive,
        updatedAt: new Date()
      };

      res.json(updatedFeature);
    } catch (error) {
      console.error("Error updating feature:", error);
      res.status(500).json({ error: "Failed to update feature settings" });
    }
  });

  // Pricing plan management (requested feature)
  app.get("/api/admin/pricing", ensureAdmin, async (req, res) => {
    try {
      const pricingPlans = [
        {
          id: "free",
          name: "무료",
          price: 0,
          description: "기본 기능 이용 가능",
          features: ["기본 블로그 템플릿", "커뮤니티 참여", "챌린저 미션"],
          isActive: true
        },
        {
          id: "basic",
          name: "베이직",
          price: 99000,
          description: "핵심 AI 기능 이용",
          features: ["모든 블로그 템플릿", "SNS 자동화", "AI 채팅", "프리미엄 지원"],
          isActive: true
        },
        {
          id: "pro",
          name: "프로",
          price: 199000,
          description: "고급 비즈니스 기능",
          features: ["무제한 자동화", "고급 템플릿", "우선 고객지원", "분석 리포트"],
          isActive: true
        },
        {
          id: "enterprise",
          name: "엔터프라이즈",
          price: 499000,
          description: "기업용 맞춤 솔루션",
          features: ["전담 매니저", "API 접근", "커스텀 기능", "24/7 지원"],
          isActive: true
        }
      ];

      res.json(pricingPlans);
    } catch (error) {
      console.error("Error fetching pricing plans:", error);
      res.status(500).json({ error: "Failed to fetch pricing plans" });
    }
  });

  // Update pricing plan (requested feature)
  app.patch("/api/admin/pricing/:planId", ensureAdmin, async (req, res) => {
    try {
      const { planId } = req.params;
      const { name, price, description, features, isActive } = req.body;

      // This would update pricing in database and Stripe
      const updatedPlan = {
        id: planId,
        name,
        price: Number(price),
        description,
        features,
        isActive,
        updatedAt: new Date()
      };

      res.json(updatedPlan);
    } catch (error) {
      console.error("Error updating pricing plan:", error);
      res.status(500).json({ error: "Failed to update pricing plan" });
    }
  });

  // System feature toggle (requested feature)
  app.patch("/api/admin/system/features", ensureAdmin, async (req, res) => {
    try {
      const { featureName, isEnabled } = req.body;

      // System-wide feature toggles
      const validFeatures = [
        'maintenance_mode',
        'new_registrations',
        'payment_system',
        'sns_automation',
        'challenger_missions',
        'community_board'
      ];

      if (!validFeatures.includes(featureName)) {
        return res.status(400).json({ error: "Invalid feature name" });
      }

      // This would update system settings in database
      const systemSetting = {
        feature: featureName,
        enabled: isEnabled,
        updatedAt: new Date(),
        updatedBy: req.user?.id
      };

      res.json(systemSetting);
    } catch (error) {
      console.error("Error updating system feature:", error);
      res.status(500).json({ error: "Failed to update system feature" });
    }
  });

  // Enhanced admin statistics with revenue breakdown
  app.get("/api/admin/stats/detailed", ensureAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const tools = await storage.getAllTools();

      // Calculate revenue by subscription tier
      const revenueByTier = users.reduce((acc, user) => {
        const tier = user.subscriptionTier || 'free';
        const tierPrices = { free: 0, basic: 99000, pro: 199000, enterprise: 499000 };
        
        if (!acc[tier]) acc[tier] = { count: 0, revenue: 0 };
        acc[tier].count += 1;
        acc[tier].revenue += tierPrices[tier as keyof typeof tierPrices] || 0;
        
        return acc;
      }, {} as Record<string, { count: number; revenue: number }>);

      const detailedStats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.isActive).length,
        usersByTier: revenueByTier,
        totalRevenue: Object.values(revenueByTier).reduce((sum, tier) => sum + tier.revenue, 0),
        activeTools: tools.filter(t => t.isActive).length,
        totalTools: tools.length,
        lastUpdated: new Date()
      };

      res.json(detailedStats);
    } catch (error) {
      console.error("Error fetching detailed stats:", error);
      res.status(500).json({ error: "Failed to fetch detailed statistics" });
    }
  });

  // Subscription Management Routes (NEW - Monthly system)
  app.get("/api/subscriptions/user/:userId", ensureAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const subscription = await storage.getUserSubscription(userId);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscription" });
    }
  });

  app.post("/api/subscriptions", ensureAuthenticated, async (req, res) => {
    try {
      const subscriptionData = req.body;
      const subscription = await storage.createSubscription(subscriptionData);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to create subscription" });
    }
  });

  app.put("/api/subscriptions/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const subscription = await storage.updateSubscription(id, updateData);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to update subscription" });
    }
  });

  app.post("/api/subscriptions/cancel/:userId", ensureAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const subscription = await storage.cancelSubscription(userId);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel subscription" });
    }
  });

  // Monthly Subscription Plans Configuration
  app.get("/api/subscription-plans", async (req, res) => {
    const plans = [
      {
        id: "free",
        name: "Free",
        price: 0,
        features: ["Basic automation tools", "5 posts per month", "Community access"],
        limitations: { postsPerMonth: 5, automationTools: "basic" }
      },
      {
        id: "basic",
        name: "Basic",
        price: 9900, // $99 per month in cents
        features: ["All automation tools", "50 posts per month", "Priority support", "Premium templates"],
        limitations: { postsPerMonth: 50, automationTools: "all" }
      },
      {
        id: "pro",
        name: "Pro",
        price: 19900, // $199 per month in cents
        features: ["Unlimited posts", "Advanced analytics", "Custom templates", "API access"],
        limitations: { postsPerMonth: "unlimited", automationTools: "all" }
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 49900, // $499 per month in cents
        features: ["Everything in Pro", "White label", "Dedicated support", "Custom integrations"],
        limitations: { postsPerMonth: "unlimited", automationTools: "all" }
      }
    ];
    res.json(plans);
  });

  const httpServer = createServer(app);
  return httpServer;
}
