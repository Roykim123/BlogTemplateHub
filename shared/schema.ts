import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for authentication)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  password: text("password"),
  kakaoId: text("kakao_id").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  // Monthly subscription system
  subscriptionTier: text("subscription_tier").default("Free"), // Free, Basic, Pro, Enterprise
  subscriptionStatus: text("subscription_status").default("active"), // active, cancelled, expired
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  // AI Cash only for premium content purchases
  aiCash: integer("ai_cash").default(100),
  role: text("role").default("user"), // user, admin
  level: text("level").default("Red"), // Red, Orange, Yellow, Green, Blue, Indigo, Violet
  referralCode: text("referral_code").unique(),
  referredBy: integer("referred_by"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  toolId: integer("tool_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  content: text("content").notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Store Information Table
export const storeInfos = pgTable("store_infos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  storeName: text("store_name").notNull(),
  storeUrl: text("store_url"),
  productName: text("product_name").notNull(),
  productPrice: integer("product_price"),
  productDescription: text("product_description"),
  keywords: text("keywords"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Community Posts Table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 일반, 질문, 팁, 후기
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  isNotice: boolean("is_notice").default(false),
  isPinned: boolean("is_pinned").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// AI Cash Transactions Table
export const cashTransactions = pgTable("cash_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // "mission_reward", "referral_bonus", "premium_purchase" (NO tool_usage)
  description: text("description").notNull(),
  referenceId: text("reference_id"), // for payment tracking
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Automation Progress Table
export const automationProgress = pgTable("automation_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  toolId: integer("tool_id").notNull(),
  stage: integer("stage").default(0), // 0-4 stages
  completed: boolean("completed").default(false),
  data: jsonb("data"), // store progress data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Challenger Missions Table
export const challengerMissions = pgTable("challenger_missions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  missionId: integer("mission_id").notNull(),
  day: integer("day").notNull(), // 1-7
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  reward: integer("reward").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscription Management Table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tier: text("tier").notNull(), // Free, Basic, Pro, Enterprise
  status: text("status").notNull(), // active, cancelled, expired, pending
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  amount: integer("amount").notNull(), // monthly cost in cents
  paymentMethod: text("payment_method"), // stripe_card, bank_transfer
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertToolSchema = createInsertSchema(tools).omit({
  id: true,
  usageCount: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  usageCount: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertStoreInfoSchema = createInsertSchema(storeInfos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  views: true,
  likes: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCashTransactionSchema = createInsertSchema(cashTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertAutomationProgressSchema = createInsertSchema(automationProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChallengerMissionSchema = createInsertSchema(challengerMissions).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Tool = typeof tools.$inferSelect;
export type InsertTool = z.infer<typeof insertToolSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type StoreInfo = typeof storeInfos.$inferSelect;
export type InsertStoreInfo = z.infer<typeof insertStoreInfoSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type CashTransaction = typeof cashTransactions.$inferSelect;
export type InsertCashTransaction = z.infer<typeof insertCashTransactionSchema>;
export type AutomationProgress = typeof automationProgress.$inferSelect;
export type InsertAutomationProgress = z.infer<typeof insertAutomationProgressSchema>;
export type ChallengerMission = typeof challengerMissions.$inferSelect;
export type InsertChallengerMission = z.infer<typeof insertChallengerMissionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
