import { 
  users, 
  tools, 
  favorites, 
  templates, 
  chatMessages,
  type User, 
  type InsertUser,
  type Tool,
  type InsertTool,
  type Favorite,
  type InsertFavorite,
  type Template,
  type InsertTemplate,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByKakaoId(kakaoId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAiCash(id: number, amount: number): Promise<User | undefined>;
  
  // Tools
  getAllTools(): Promise<Tool[]>;
  getToolsByCategory(category: string): Promise<Tool[]>;
  getTool(id: number): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateToolUsage(id: number): Promise<void>;
  
  // Favorites
  getUserFavorites(userId: number): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: number, toolId: number): Promise<void>;
  
  // Templates
  getAllTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplateUsage(id: number): Promise<void>;
  
  // Chat Messages
  getChatHistory(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
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

export const storage = new MemStorage();
