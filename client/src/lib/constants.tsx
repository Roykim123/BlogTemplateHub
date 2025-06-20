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
  Award,
  Zap,
  Briefcase
} from "lucide-react";

// 1) 대시보드
export const DASHBOARD_ITEMS = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: ChartGantt,
    path: "/",
    description: "메인 대시보드"
  }
];

// 2) 자동화기능 (블로그/기타)
export const AUTOMATION_ITEMS = [
  {
    id: "blog-auto",
    label: "딸깍AI",
    icon: Zap,
    path: "/blog-auto",
    description: "블로그 자동화"
  },
  {
    id: "tools",
    label: "추가기능",
    icon: Wrench,
    path: "/tools",
    description: "유튜브, 스레드 등"
  }
];

// 3) 고객유치 (게시판/미니게임)
export const CUSTOMER_ITEMS = [
  {
    id: "community",
    label: "커뮤니티",
    icon: MessageCircle,
    path: "/community",
    description: "자유게시판"
  }
];

// 4) 고객정보 (마이페이지, 결제, 어드민페이지)
export const USER_INFO_ITEMS = [
  {
    id: "mypage",
    label: "마이페이지",
    icon: Users,
    path: "/mypage",
    description: "내 정보 및 활동 내역"
  },
  {
    id: "payment",
    label: "결제정보",
    icon: CreditCard,
    path: "/payment",
    description: "요금제 및 AI캐쉬 충전"
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
    id: "ai-blog-writer",
    name: "AI 블로그 글쓰기",
    description: "AI가 도와주는 전문적인 블로그 글 작성 서비스입니다.",
    icon: "AI",
    category: "블로그",
    isFavorite: false,
    gradient: "from-[hsl(var(--hermes-orange))] to-[hsl(var(--soft-pink))]"
  },
  {
    id: "ai-youtube-script",
    name: "AI 유튜브 스크립트",
    description: "유튜브 영상을 위한 매력적인 스크립트를 작성합니다.",
    icon: "AI",
    category: "유튜브",
    isFavorite: true,
    gradient: "from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-purple))]"
  },
  {
    id: "ai-thread-creator",
    name: "AI 스레드 제작",
    description: "트위터 스레드를 위한 연속된 콘텐츠를 생성합니다.",
    icon: "AI",
    category: "스레드",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-mint))] to-[hsl(var(--soft-blue))]"
  },
  {
    id: "ai-instagram-post",
    name: "AI 인스타그램 포스트",
    description: "인스타그램에 최적화된 매력적인 포스트를 생성합니다.",
    icon: "AI",
    category: "인스타",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-purple))] to-[hsl(var(--soft-pink))]"
  },
  {
    id: "ai-blog-seo",
    name: "AI SEO 블로그",
    description: "검색 최적화된 블로그 글을 AI가 작성해드립니다.",
    icon: "AI",
    category: "블로그",
    isFavorite: false,
    gradient: "from-[hsl(var(--hermes-orange))] to-[hsl(var(--soft-purple))]"
  },
  {
    id: "ai-youtube-title",
    name: "AI 유튜브 제목",
    description: "클릭률을 높이는 유튜브 제목을 AI가 제안합니다.",
    icon: "AI",
    category: "유튜브",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-mint))] to-[hsl(var(--hermes-orange))]"
  },
  {
    id: "ai-instagram-caption",
    name: "AI 인스타 캡션",
    description: "인스타그램 캡션과 해시태그를 자동 생성합니다.",
    icon: "AI",
    category: "인스타",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-mint))]"
  },
  {
    id: "ai-thread-viral",
    name: "AI 바이럴 스레드",
    description: "화제성 있는 트위터 스레드를 AI가 기획합니다.",
    icon: "AI",
    category: "스레드",
    isFavorite: false,
    gradient: "from-[hsl(var(--soft-purple))] to-[hsl(var(--hermes-orange))]"
  }
];

export const TOOL_CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "블로그", label: "블로그" },
  { id: "유튜브", label: "유튜브" },
  { id: "스레드", label: "스레드" },
  { id: "인스타", label: "인스타" },
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
    reward: "100 AI캐쉬",
    color: "red"
  },
  {
    id: "refer-friend",
    title: "친구 초대",
    description: "친구를 초대하고 보상받기",
    icon: Users,
    status: "available",
    reward: "5000 AI캐쉬",
    color: "green"
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
    id: "write-review",
    title: "리뷰 작성하기",
    description: "서비스 후기 남기기",
    icon: Star,
    status: "available",
    reward: "1000 AI캐쉬",
    color: "purple"
  }
];
