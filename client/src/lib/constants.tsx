import { 
  MessageCircle, 
  Wrench, 
  Gift, 
  Bookmark, 
  GraduationCap,
  Settings,
  CreditCard,
  Star,
  Code,
  Mail,
  ChartGantt,
  Share2,
  Languages,
  Lightbulb,
  Check,
  Users,
  Target,
  Award
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  {
    id: "chatbot",
    label: "채팅",
    icon: MessageCircle,
    path: "/chatbot"
  },
  {
    id: "tools",
    label: "도구",
    icon: Wrench,
    path: "/tools"
  },
  {
    id: "rewards",
    label: "리워드",
    icon: Gift,
    path: "/rewards"
  },
  {
    id: "templates",
    label: "템플릿",
    icon: Bookmark,
    path: "/templates"
  }
];

export const TUTORIAL_NAV = {
  id: "tutorial",
  label: "튜토리얼",
  icon: GraduationCap,
  path: "/tutorial"
};

export const TOOLS_DATA = [
  {
    id: "blog-writer",
    name: "AI 블로그작성",
    description: "블로그 글을 빠르고 쉽게 작성할 수 있는 AI 도구입니다.",
    icon: "✨",
    category: "글쓰기",
    isFavorite: false,
    gradient: "from-[hsl(var(--hermes-orange))] to-[hsl(var(--soft-pink))]"
  },
  {
    id: "report-writer",
    name: "AI 보고서 작성",
    description: "데이터를 분석하여 전문적인 보고서를 작성해 드립니다.",
    icon: "📊",
    category: "업무",
    isFavorite: true,
    gradient: "from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-purple))]"
  },
  {
    id: "ppt-creator",
    name: "PPT 초안",
    description: "프레젠테이션 초안을 빠르게 생성할 수 있습니다.",
    icon: "📽️",
    category: "업무",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-mint))] to-[hsl(var(--soft-blue))]"
  },
  {
    id: "sns-writer",
    name: "SNS 게시물",
    description: "소셜미디어용 게시물을 쉽게 작성할 수 있습니다.",
    icon: "📱",
    category: "글쓰기",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-purple))] to-[hsl(var(--soft-pink))]"
  },
  {
    id: "translator",
    name: "번역 도구",
    description: "다양한 언어로 빠르고 정확하게 번역합니다.",
    icon: "🌐",
    category: "업무",
    isFavorite: false,
    gradient: "from-[hsl(var(--hermes-orange))] to-[hsl(var(--soft-purple))]"
  },
  {
    id: "code-reviewer",
    name: "코드 리뷰",
    description: "코드를 검토하고 개선 방안을 제안합니다.",
    icon: "💻",
    category: "개발",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-mint))] to-[hsl(var(--hermes-orange))]"
  },
  {
    id: "email-writer",
    name: "이메일 초안",
    description: "전문적인 이메일을 빠르게 작성할 수 있습니다.",
    icon: "✉️",
    category: "업무",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-mint))]"
  },
  {
    id: "idea-generator",
    name: "아이디어 생성",
    description: "창의적인 아이디어와 콘텐츠를 생성합니다.",
    icon: "💡",
    category: "글쓰기",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-purple))] to-[hsl(var(--hermes-orange))]"
  }
];

export const TOOL_CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "글쓰기", label: "글쓰기" },
  { id: "학교", label: "학교" },
  { id: "업무", label: "업무" },
  { id: "개발", label: "개발" },
  { id: "즐겨찾기", label: "즐겨찾기" }
];

export const TEMPLATES_DATA = [
  {
    id: "product-review",
    title: "Product Review Blog",
    description: "제품 리뷰를 위한 전문적인 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "hermes-orange"
  },
  {
    id: "travel-blog",
    title: "Travel Blog",
    description: "여행 경험을 공유하는 아름다운 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-blue"
  },
  {
    id: "food-blog",
    title: "Food Blog",
    description: "요리와 음식을 소개하는 맛있는 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-mint"
  },
  {
    id: "tech-blog",
    title: "Tech Blog",
    description: "기술과 개발에 관한 전문적인 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-purple"
  },
  {
    id: "fashion-blog",
    title: "Fashion Blog",
    description: "패션과 스타일을 소개하는 세련된 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-pink"
  },
  {
    id: "business-blog",
    title: "Business Blog",
    description: "비즈니스와 경영에 관한 전문적인 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "hermes-orange"
  },
  {
    id: "fitness-blog",
    title: "Fitness Blog",
    description: "건강과 피트니스를 위한 활동적인 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-mint"
  },
  {
    id: "lifestyle-blog",
    title: "Lifestyle Blog",
    description: "일상과 라이프스타일을 공유하는 따뜻한 블로그 템플릿입니다.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    category: "blog",
    color: "soft-purple"
  }
];

export const REWARD_MISSIONS = [
  {
    id: "daily-checkin",
    title: "출석 체크",
    description: "매일 방문하기",
    icon: Check,
    status: "active",
    reward: "적립 중",
    color: "red"
  },
  {
    id: "newsletter",
    title: "뉴스레터 구독",
    description: "주간 소식 받기",
    icon: Mail,
    status: "active",
    reward: "적립 중",
    color: "blue"
  },
  {
    id: "refer-friend",
    title: "친구 추천",
    description: "친구에게 추천하기",
    icon: Users,
    status: "available",
    reward: "2500",
    color: "green"
  },
  {
    id: "write-review",
    title: "리뷰 작성하기",
    description: "서비스 후기 남기기",
    icon: Star,
    status: "available",
    reward: "2500",
    color: "purple"
  }
];
