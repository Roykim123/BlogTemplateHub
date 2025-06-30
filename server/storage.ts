import { 
  users, 
  tools, 
  favorites, 
  templates, 
  chatMessages,
  storeInfos,
  posts,
  cashTransactions,
  automationProgress,
  challengerMissions,
  subscriptions,
  type User, 
  type InsertUser,
  type Tool,
  type InsertTool,
  type Favorite,
  type InsertFavorite,
  type Template,
  type InsertTemplate,
  type ChatMessage,
  type InsertChatMessage,
  type StoreInfo,
  type InsertStoreInfo,
  type Post,
  type InsertPost,
  type CashTransaction,
  type InsertCashTransaction,
  type AutomationProgress,
  type InsertAutomationProgress,
  type ChallengerMission,
  type InsertChallengerMission,
  type Subscription,
  type InsertSubscription
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByKakaoId(kakaoId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  updateUserAiCash(id: number, amount: number): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Tools
  getAllTools(): Promise<Tool[]>;
  getToolsByCategory(category: string): Promise<Tool[]>;
  getTool(id: number): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(id: number, tool: Partial<InsertTool>): Promise<Tool | undefined>;
  updateToolUsage(id: number): Promise<void>;
  deleteTool(id: number): Promise<void>;
  
  // Favorites
  getUserFavorites(userId: number): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: number, toolId: number): Promise<void>;
  
  // Templates
  getAllTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  updateTemplateUsage(id: number): Promise<void>;
  deleteTemplate(id: number): Promise<void>;
  
  // Chat Messages
  getChatHistory(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Store Information
  getUserStoreInfos(userId: number): Promise<StoreInfo[]>;
  createStoreInfo(storeInfo: InsertStoreInfo): Promise<StoreInfo>;
  updateStoreInfo(id: number, storeInfo: Partial<InsertStoreInfo>): Promise<StoreInfo | undefined>;
  deleteStoreInfo(id: number): Promise<void>;
  
  // Posts/Community
  getPosts(options?: { category?: string; limit?: number; offset?: number }): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;
  incrementPostViews(id: number): Promise<void>;
  
  // AI Cash Transactions
  getUserCashTransactions(userId: number): Promise<CashTransaction[]>;
  createCashTransaction(transaction: InsertCashTransaction): Promise<CashTransaction>;
  
  // Automation Progress
  getAutomationProgress(toolId: number, userId: number): Promise<AutomationProgress | undefined>;
  createAutomationProgress(progress: InsertAutomationProgress): Promise<AutomationProgress>;
  updateAutomationProgress(toolId: number, userId: number, stage: number, completed: boolean): Promise<AutomationProgress | undefined>;
  
  // Challenger Missions
  getUserMissions(userId: number, day?: number): Promise<ChallengerMission[]>;
  createMission(mission: InsertChallengerMission): Promise<ChallengerMission>;
  completeMission(userId: number, missionId: number, day: number): Promise<ChallengerMission | undefined>;
  
  // Subscription Management (NEW - Monthly system only)
  getUserSubscription(userId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  cancelSubscription(userId: number): Promise<Subscription | undefined>;
  
  // Store Information
  getUserStoreInfos(userId: number): Promise<StoreInfo[]>;
  createStoreInfo(storeInfo: InsertStoreInfo): Promise<StoreInfo>;
  updateStoreInfo(id: number, storeInfo: Partial<InsertStoreInfo>): Promise<StoreInfo | undefined>;
  deleteStoreInfo(id: number): Promise<void>;
  
  // Posts/Community
  getPosts(options?: { category?: string; limit?: number; offset?: number }): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;
  incrementPostViews(id: number): Promise<void>;
  
  // AI Cash Transactions
  getUserCashTransactions(userId: number): Promise<CashTransaction[]>;
  createCashTransaction(transaction: InsertCashTransaction): Promise<CashTransaction>;
  
  // Automation Progress
  getAutomationProgress(toolId: number, userId: number): Promise<AutomationProgress | undefined>;
  createAutomationProgress(progress: InsertAutomationProgress): Promise<AutomationProgress>;
  updateAutomationProgress(toolId: number, userId: number, stage: number, completed: boolean): Promise<AutomationProgress | undefined>;
  
  // Challenger Missions
  getUserMissions(userId: number, day?: number): Promise<ChallengerMission[]>;
  createMission(mission: InsertChallengerMission): Promise<ChallengerMission>;
  completeMission(userId: number, missionId: number, day: number): Promise<ChallengerMission | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.kakaoId, kakaoId));
    return user || undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async updateUserAiCash(id: number, amount: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ aiCash: amount, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  // Tools
  async getAllTools(): Promise<Tool[]> {
    return await db.select().from(tools).where(eq(tools.isActive, true));
  }

  async getToolsByCategory(category: string): Promise<Tool[]> {
    return await db.select().from(tools)
      .where(and(eq(tools.category, category), eq(tools.isActive, true)));
  }

  async getTool(id: number): Promise<Tool | undefined> {
    const [tool] = await db.select().from(tools).where(eq(tools.id, id));
    return tool || undefined;
  }

  async createTool(toolData: InsertTool): Promise<Tool> {
    const [tool] = await db.insert(tools).values(toolData).returning();
    return tool;
  }

  async updateTool(id: number, toolData: Partial<InsertTool>): Promise<Tool | undefined> {
    const [tool] = await db
      .update(tools)
      .set(toolData)
      .where(eq(tools.id, id))
      .returning();
    return tool || undefined;
  }

  async updateToolUsage(id: number): Promise<void> {
    const [tool] = await db.select().from(tools).where(eq(tools.id, id));
    if (tool) {
      await db
        .update(tools)
        .set({ usageCount: tool.usageCount + 1 })
        .where(eq(tools.id, id));
    }
  }

  async deleteTool(id: number): Promise<void> {
    await db.update(tools).set({ isActive: false }).where(eq(tools.id, id));
  }

  // Favorites
  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async addFavorite(favoriteData: InsertFavorite): Promise<Favorite> {
    const [favorite] = await db.insert(favorites).values(favoriteData).returning();
    return favorite;
  }

  async removeFavorite(userId: number, toolId: number): Promise<void> {
    await db.delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.toolId, toolId)));
  }

  // Templates
  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.isActive, true));
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return await db.select().from(templates)
      .where(and(eq(templates.category, category), eq(templates.isActive, true)));
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  async createTemplate(templateData: InsertTemplate): Promise<Template> {
    const [template] = await db.insert(templates).values(templateData).returning();
    return template;
  }

  async updateTemplate(id: number, templateData: Partial<InsertTemplate>): Promise<Template | undefined> {
    const [template] = await db
      .update(templates)
      .set(templateData)
      .where(eq(templates.id, id))
      .returning();
    return template || undefined;
  }

  async updateTemplateUsage(id: number): Promise<void> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    if (template) {
      await db
        .update(templates)
        .set({ usageCount: template.usageCount + 1 })
        .where(eq(templates.id, id));
    }
  }

  async deleteTemplate(id: number): Promise<void> {
    await db.update(templates).set({ isActive: false }).where(eq(templates.id, id));
  }

  // Chat Messages
  async getChatHistory(userId: number): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.createdAt));
  }

  async createChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(messageData).returning();
    return message;
  }

  // Store Information
  async getUserStoreInfos(userId: number): Promise<StoreInfo[]> {
    return await db.select().from(storeInfos)
      .where(eq(storeInfos.userId, userId))
      .orderBy(desc(storeInfos.createdAt));
  }

  async createStoreInfo(storeInfoData: InsertStoreInfo): Promise<StoreInfo> {
    const [storeInfo] = await db.insert(storeInfos).values(storeInfoData).returning();
    return storeInfo;
  }

  async updateStoreInfo(id: number, storeInfoData: Partial<InsertStoreInfo>): Promise<StoreInfo | undefined> {
    const [storeInfo] = await db
      .update(storeInfos)
      .set({ ...storeInfoData, updatedAt: new Date() })
      .where(eq(storeInfos.id, id))
      .returning();
    return storeInfo || undefined;
  }

  async deleteStoreInfo(id: number): Promise<void> {
    await db.delete(storeInfos).where(eq(storeInfos.id, id));
  }

  // Posts/Community
  async getPosts(options?: { category?: string; limit?: number; offset?: number }): Promise<Post[]> {
    let queryBuilder = db.select().from(posts);
    
    if (options?.category) {
      queryBuilder = queryBuilder.where(eq(posts.category, options.category));
    }
    
    queryBuilder = queryBuilder.orderBy(desc(posts.isPinned), desc(posts.createdAt));
    
    if (options?.limit) {
      queryBuilder = queryBuilder.limit(options.limit);
    }
    
    if (options?.offset) {
      queryBuilder = queryBuilder.offset(options.offset);
    }
    
    return await queryBuilder;
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async createPost(postData: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(postData).returning();
    return post;
  }

  async updatePost(id: number, postData: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ ...postData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }

  async deletePost(id: number): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async incrementPostViews(id: number): Promise<void> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (post) {
      await db
        .update(posts)
        .set({ views: (post.views || 0) + 1 })
        .where(eq(posts.id, id));
    }
  }

  // AI Cash Transactions
  async getUserCashTransactions(userId: number): Promise<CashTransaction[]> {
    return await db.select().from(cashTransactions)
      .where(eq(cashTransactions.userId, userId))
      .orderBy(desc(cashTransactions.createdAt));
  }

  async createCashTransaction(transactionData: InsertCashTransaction): Promise<CashTransaction> {
    const [transaction] = await db.insert(cashTransactions).values(transactionData).returning();
    return transaction;
  }

  // Automation Progress
  async getAutomationProgress(toolId: number, userId: number): Promise<AutomationProgress | undefined> {
    const [progress] = await db.select().from(automationProgress)
      .where(and(eq(automationProgress.toolId, toolId), eq(automationProgress.userId, userId)));
    return progress || undefined;
  }

  async createAutomationProgress(progressData: InsertAutomationProgress): Promise<AutomationProgress> {
    const [progress] = await db.insert(automationProgress).values(progressData).returning();
    return progress;
  }

  async updateAutomationProgress(toolId: number, userId: number, stage: number, completed: boolean): Promise<AutomationProgress | undefined> {
    const [progress] = await db
      .update(automationProgress)
      .set({ stage, completed, updatedAt: new Date() })
      .where(and(eq(automationProgress.toolId, toolId), eq(automationProgress.userId, userId)))
      .returning();
    return progress || undefined;
  }

  // Challenger Missions
  async getUserMissions(userId: number, day?: number): Promise<ChallengerMission[]> {
    let queryBuilder = db.select().from(challengerMissions);
    
    if (day) {
      queryBuilder = queryBuilder.where(and(eq(challengerMissions.userId, userId), eq(challengerMissions.day, day)));
    } else {
      queryBuilder = queryBuilder.where(eq(challengerMissions.userId, userId));
    }
    
    return await queryBuilder.orderBy(challengerMissions.day, challengerMissions.missionId);
  }

  async createMission(missionData: InsertChallengerMission): Promise<ChallengerMission> {
    const [mission] = await db.insert(challengerMissions).values(missionData).returning();
    return mission;
  }

  async completeMission(userId: number, missionId: number, day: number): Promise<ChallengerMission | undefined> {
    const [mission] = await db
      .update(challengerMissions)
      .set({ completed: true, completedAt: new Date() })
      .where(and(
        eq(challengerMissions.userId, userId),
        eq(challengerMissions.missionId, missionId),
        eq(challengerMissions.day, day)
      ))
      .returning();
    return mission || undefined;
  }

  // Subscription Management Methods
  async getUserSubscription(userId: number): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    return subscription || undefined;
  }

  async createSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db.insert(subscriptions).values(subscriptionData).returning();
    return subscription;
  }

  async updateSubscription(id: number, subscriptionData: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [subscription] = await db
      .update(subscriptions)
      .set({ ...subscriptionData, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return subscription || undefined;
  }

  async cancelSubscription(userId: number): Promise<Subscription | undefined> {
    const [subscription] = await db
      .update(subscriptions)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId))
      .returning();
    return subscription || undefined;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private tools: Map<number, Tool> = new Map();
  private favorites: Map<number, Favorite> = new Map();
  private templates: Map<number, Template> = new Map();
  private chatMessages: Map<number, ChatMessage> = new Map();
  
  private currentUserId = 1;
  private currentToolId = 1;
  private currentFavoriteId = 1;
  private currentTemplateId = 1;
  private currentChatId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed some initial tools data
    const initialTools = [
      { name: "AI 블로그 글쓰기", description: "AI가 도와주는 전문적인 블로그 글 작성 서비스입니다.", category: "블로그", icon: "AI" },
      { name: "AI 유튜브 스크립트", description: "유튜브 영상을 위한 매력적인 스크립트를 작성합니다.", category: "유튜브", icon: "AI" },
      { name: "AI 스레드 제작", description: "트위터 스레드를 위한 연속된 콘텐츠를 생성합니다.", category: "스레드", icon: "AI" },
      { name: "AI 인스타그램 포스트", description: "인스타그램에 최적화된 매력적인 포스트를 생성합니다.", category: "인스타", icon: "AI" },
      { name: "AI SEO 블로그", description: "검색 최적화된 블로그 글을 AI가 작성해드립니다.", category: "블로그", icon: "AI" },
      { name: "AI 유튜브 제목", description: "클릭률을 높이는 유튜브 제목을 AI가 제안합니다.", category: "유튜브", icon: "AI" },
      { name: "AI 인스타 캡션", description: "인스타그램 캡션과 해시태그를 자동 생성합니다.", category: "인스타", icon: "AI" },
      { name: "AI 바이럴 스레드", description: "화제성 있는 트위터 스레드를 AI가 기획합니다.", category: "스레드", icon: "AI" }
    ];

    initialTools.forEach(tool => {
      const id = this.currentToolId++;
      this.tools.set(id, {
        id,
        ...tool,
        usageCount: Math.floor(Math.random() * 1000),
        isActive: true
      });
    });

    // Seed some initial templates
    const initialTemplates = [
      { title: "Product Review Blog", description: "제품 리뷰를 위한 전문적인 블로그 템플릿입니다.", category: "blog", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d", content: "Product review template content..." },
      { title: "Travel Blog", description: "여행 경험을 공유하는 아름다운 블로그 템플릿입니다.", category: "blog", imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", content: "Travel blog template content..." },
      { title: "Food Blog", description: "요리와 음식을 소개하는 맛있는 블로그 템플릿입니다.", category: "blog", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", content: "Food blog template content..." },
      { title: "Tech Blog", description: "기술과 개발에 관한 전문적인 블로그 템플릿입니다.", category: "blog", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", content: "Tech blog template content..." }
    ];

    initialTemplates.forEach(template => {
      const id = this.currentTemplateId++;
      this.templates.set(id, {
        id,
        ...template,
        usageCount: Math.floor(Math.random() * 500),
        isActive: true
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.kakaoId === kakaoId);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const referralCode = `WORRY${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const user: User = { 
      id,
      username: insertUser.username,
      email: insertUser.email || null,
      password: insertUser.password || null,
      kakaoId: insertUser.kakaoId || null,
      aiCash: insertUser.aiCash || 1000,
      referralCode,
      referredBy: insertUser.referredBy || null,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserAiCash(id: number, amount: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.aiCash = (user.aiCash || 0) + amount;
      this.users.set(id, user);
      return user;
    }
    return undefined;
  }

  async getAllTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => tool.isActive);
  }

  async getToolsByCategory(category: string): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => 
      tool.isActive && tool.category === category
    );
  }

  async getTool(id: number): Promise<Tool | undefined> {
    return this.tools.get(id);
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = { 
      ...insertTool, 
      id, 
      usageCount: 0,
      isActive: insertTool.isActive ?? true
    };
    this.tools.set(id, tool);
    return tool;
  }

  async updateToolUsage(id: number): Promise<void> {
    const tool = this.tools.get(id);
    if (tool) {
      tool.usageCount++;
      this.tools.set(id, tool);
    }
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(fav => fav.userId === userId);
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const favorite: Favorite = { 
      ...insertFavorite, 
      id, 
      createdAt: new Date() 
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(userId: number, toolId: number): Promise<void> {
    const favoriteEntry = Array.from(this.favorites.entries()).find(
      ([_, fav]) => fav.userId === userId && fav.toolId === toolId
    );
    if (favoriteEntry) {
      this.favorites.delete(favoriteEntry[0]);
    }
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(template => template.isActive);
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(template => 
      template.isActive && template.category === category
    );
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = { 
      ...insertTemplate, 
      id, 
      usageCount: 0,
      isActive: insertTemplate.isActive ?? true,
      imageUrl: insertTemplate.imageUrl ?? null
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplateUsage(id: number): Promise<void> {
    const template = this.templates.get(id);
    if (template) {
      template.usageCount++;
      this.templates.set(id, template);
    }
  }

  async getChatHistory(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      response: insertMessage.response ?? null
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new DatabaseStorage();
