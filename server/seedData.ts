import { db } from "./db";
import { users, tools, templates } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("시드 데이터 생성 시작...");

    // 관리자 사용자 생성
    const adminUser = await db.insert(users).values({
      username: "admin",
      email: "admin@example.com",
      password: "hashed_password", // 실제로는 해시된 비밀번호
      role: "admin",
      aiCash: 100000,
      isActive: true,
    }).returning();

    // 일반 사용자들 생성
    const testUsers = await db.insert(users).values([
      {
        username: "김철수",
        email: "kim@example.com",
        kakaoId: "kakao_123",
        role: "user",
        aiCash: 5000,
        isActive: true,
      },
      {
        username: "이영희",
        email: "lee@example.com",
        kakaoId: "kakao_456",
        role: "user",
        aiCash: 3000,
        isActive: true,
      },
      {
        username: "박민수",
        email: "park@example.com",
        kakaoId: "kakao_789",
        role: "user",
        aiCash: 7500,
        isActive: true,
      }
    ]).returning();

    // AI 도구들 생성
    const aiTools = await db.insert(tools).values([
      {
        name: "딸깍AI 자동포스팅",
        description: "SNS 자동 포스팅 도구",
        category: "SNS",
        icon: "Zap",
        usageCount: 1250,
        isActive: true,
      },
      {
        name: "블로그 자동 생성",
        description: "AI 기반 블로그 글 자동 생성",
        category: "Blog",
        icon: "FileText",
        usageCount: 890,
        isActive: true,
      },
      {
        name: "인스타그램 템플릿",
        description: "인스타그램 포스트 템플릿 생성",
        category: "Instagram",
        icon: "Instagram",
        usageCount: 2340,
        isActive: true,
      },
      {
        name: "유튜브 썸네일 생성기",
        description: "AI 기반 유튜브 썸네일 자동 생성",
        category: "YouTube",
        icon: "Youtube",
        usageCount: 567,
        isActive: false, // 준비 중
      },
      {
        name: "쓰레드 자동 생성",
        description: "X(Twitter) 쓰레드 자동 생성 도구",
        category: "Social",
        icon: "MessageCircle",
        usageCount: 423,
        isActive: true,
      }
    ]).returning();

    // 템플릿들 생성
    const blogTemplates = await db.insert(templates).values([
      {
        title: "상품 리뷰 블로그",
        description: "상품 후기 및 리뷰 블로그 템플릿",
        category: "리뷰",
        imageUrl: "/images/review-template.jpg",
        content: "상품 리뷰 템플릿 내용...",
        usageCount: 156,
        isActive: true,
      },
      {
        title: "여행 후기 블로그",
        description: "여행 경험 공유 블로그 템플릿",
        category: "여행",
        imageUrl: "/images/travel-template.jpg",
        content: "여행 후기 템플릿 내용...",
        usageCount: 98,
        isActive: true,
      },
      {
        title: "요리 레시피 블로그",
        description: "요리 레시피 공유 블로그 템플릿",
        category: "요리",
        imageUrl: "/images/recipe-template.jpg",
        content: "요리 레시피 템플릿 내용...",
        usageCount: 203,
        isActive: true,
      },
      {
        title: "IT 기술 블로그",
        description: "기술 트렌드 및 개발 관련 블로그 템플릿",
        category: "기술",
        imageUrl: "/images/tech-template.jpg",
        content: "IT 기술 블로그 템플릿 내용...",
        usageCount: 342,
        isActive: true,
      }
    ]).returning();

    console.log(`시드 데이터 생성 완료:`);
    console.log(`- 사용자: ${testUsers.length + 1}명 (관리자 포함)`);
    console.log(`- AI 도구: ${aiTools.length}개`);
    console.log(`- 템플릿: ${blogTemplates.length}개`);

    return {
      users: [...testUsers, ...adminUser],
      tools: aiTools,
      templates: blogTemplates,
    };
  } catch (error) {
    console.error("시드 데이터 생성 중 오류:", error);
    throw error;
  }
}