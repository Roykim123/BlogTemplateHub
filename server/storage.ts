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
  createUser(user: InsertUser): Promise<User>;
  
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
      { name: "GPT 블로그 글쓰기", description: "AI가 도와주는 전문적인 블로그 글 작성 서비스입니다.", category: "글쓰기", icon: "AI" },
      { name: "AI 요약기", description: "긴 문서를 핵심 내용으로 빠르게 요약해드립니다.", category: "업무", icon: "요약" },
      { name: "GPT 발표자료 생성", description: "AI가 만들어주는 전문적인 프레젠테이션 자료입니다.", category: "업무", icon: "PPT" },
      { name: "AI SNS 콘텐츠 제작", description: "소셜미디어에 최적화된 AI 콘텐츠를 생성합니다.", category: "글쓰기", icon: "SNS" },
      { name: "GPT 번역기", description: "자연스럽고 정확한 AI 번역 서비스를 제공합니다.", category: "업무", icon: "번역" },
      { name: "AI 코딩 도우미", description: "코드 작성과 리뷰를 도와주는 AI 어시스턴트입니다.", category: "개발", icon: "코드" },
      { name: "GPT 이메일 작성", description: "비즈니스 이메일을 자동으로 작성해주는 AI 서비스입니다.", category: "업무", icon: "메일" },
      { name: "AI 아이디어 생성기", description: "창의적인 아이디어와 기획안을 AI가 제안해드립니다.", category: "글쓰기", icon: "아이디어" }
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
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
