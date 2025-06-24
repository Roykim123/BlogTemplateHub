export interface PremiumCourse {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  description: string;
  highlights: string[];
  curriculum: string[];
  isLive?: boolean;
  isPopular?: boolean;
}

export const premiumCourses: PremiumCourse[] = [
  {
    id: 1,
    title: "차근차근하기 좋은 카카오톡 봇 만들기 강의",
    instructor: "김개발",
    price: 99000,
    originalPrice: 150000,
    thumbnail: "/api/placeholder/course1.jpg",
    category: "자동화",
    level: "초급",
    duration: "4시간",
    rating: 4.8,
    students: 1250,
    description: "1,2차 라이브 강의는 모두 마감되었고 다음 라이브 강의 일정은 없습니다.",
    highlights: [
      "1,2차 라이브강의(각 3시간 분량)",
      "강의 자료(A4 100장 이상)",
      "(후불)카카오톡 소스코드(2천줄 이상)",
      "구매자 전용 단톡방 초대"
    ],
    curriculum: [
      "카카오톡 봇 개발 환경 설정",
      "기본 메시지 처리 로직",
      "고급 기능 구현",
      "배포 및 운영"
    ],
    isPopular: true
  },
  {
    id: 2,
    title: "엑셀 AI × 엑셀 업무자동화 강의",
    instructor: "오피스마스터",
    price: 119000,
    thumbnail: "/api/placeholder/course2.jpg",
    category: "자동화",
    level: "중급",
    duration: "6시간",
    rating: 4.9,
    students: 890,
    description: "엑셀과 AI를 결합한 업무 자동화 완전 정복 과정",
    highlights: [
      "엑셀 기본부터 고급까지",
      "AI 연동 실무 예제",
      "업무 효율성 극대화",
      "평생 업데이트 제공"
    ],
    curriculum: [
      "엑셀 기초 복습",
      "매크로 작성법",
      "AI API 연동",
      "실무 프로젝트"
    ]
  },
  {
    id: 3,
    title: "구글 확장 자료스 워드 프로그래머",
    instructor: "개발왕",
    price: 119000,
    thumbnail: "/api/placeholder/course3.jpg",
    category: "개발",
    level: "고급",
    duration: "8시간",
    rating: 4.7,
    students: 567,
    description: "구글 확장 프로그램 개발 완전 마스터",
    highlights: [
      "Chrome Extension 개발",
      "Google APIs 활용",
      "실제 배포까지",
      "수익화 전략"
    ],
    curriculum: [
      "확장 프로그램 기초",
      "API 연동 방법",
      "UI/UX 설계",
      "스토어 등록"
    ]
  },
  {
    id: 4,
    title: "네이버 블로그 SEO 최적화 강의",
    instructor: "SEO전문가",
    price: 50000,
    thumbnail: "/api/placeholder/course4.jpg",
    category: "마케팅",
    level: "초급",
    duration: "3시간",
    rating: 4.6,
    students: 2340,
    description: "검색 상위 노출을 위한 블로그 최적화 비법",
    highlights: [
      "키워드 리서치 방법",
      "포스팅 구조 최적화",
      "백링크 구축 전략",
      "분석 도구 활용법"
    ],
    curriculum: [
      "SEO 기초 이론",
      "네이버 알고리즘 이해",
      "콘텐츠 최적화",
      "성과 측정"
    ]
  },
  {
    id: 5,
    title: "플레이스 순위 조작기",
    instructor: "플레이스마스터",
    price: 50000,
    thumbnail: "/api/placeholder/course5.jpg",
    category: "마케팅",
    level: "중급",
    duration: "4시간",
    rating: 4.5,
    students: 1890,
    description: "네이버 플레이스 상위 노출 완전 정복",
    highlights: [
      "플레이스 최적화 기법",
      "리뷰 관리 전략",
      "사진 최적화 방법",
      "경쟁업체 분석"
    ],
    curriculum: [
      "플레이스 등록 최적화",
      "키워드 설정법",
      "고객 리뷰 관리",
      "순위 모니터링"
    ]
  },
  {
    id: 6,
    title: "카지 업무자동화 기초 유튜브 1차",
    instructor: "자동화전문가",
    price: 50000,
    thumbnail: "/api/placeholder/course6.jpg",
    category: "자동화",
    level: "초급",
    duration: "5시간",
    rating: 4.4,
    students: 1200,
    description: "유튜브 채널 운영 자동화 시스템 구축",
    highlights: [
      "유튜브 API 활용",
      "자동 업로드 시스템",
      "썸네일 자동 생성",
      "댓글 관리 자동화"
    ],
    curriculum: [
      "유튜브 API 설정",
      "업로드 자동화",
      "메타데이터 최적화",
      "분석 대시보드"
    ],
    isLive: true
  },
  {
    id: 7,
    title: "네이버 블로그 유튜브 자동화 2차",
    instructor: "블로그마스터",
    price: 50000,
    thumbnail: "/api/placeholder/course7.jpg",
    category: "마케팅",
    level: "중급",
    duration: "4시간",
    rating: 4.7,
    students: 980,
    description: "블로그와 유튜브 연동 자동화 시스템",
    highlights: [
      "블로그-유튜브 연동",
      "크로스 플랫폼 전략",
      "트래픽 최적화",
      "수익 극대화"
    ],
    curriculum: [
      "플랫폼 연동 설정",
      "콘텐츠 동기화",
      "SEO 최적화",
      "성과 분석"
    ],
    isLive: true
  },
  {
    id: 8,
    title: "네이버 카페 글쓰기 자동화 유튜브 3차",
    instructor: "카페운영자",
    price: 50000,
    thumbnail: "/api/placeholder/course8.jpg",
    category: "자동화",
    level: "중급",
    duration: "3시간",
    rating: 4.3,
    students: 760,
    description: "네이버 카페 운영 완전 자동화",
    highlights: [
      "카페 글쓰기 자동화",
      "회원 관리 시스템",
      "콘텐츠 스케줄링",
      "운영 최적화"
    ],
    curriculum: [
      "카페 자동화 설정",
      "콘텐츠 관리",
      "회원 소통",
      "성과 측정"
    ],
    isLive: true
  },
  {
    id: 9,
    title: "카카오톡 못만들기 유튜브4차",
    instructor: "카톡개발자",
    price: 50000,
    thumbnail: "/api/placeholder/course9.jpg",
    category: "개발",
    level: "고급",
    duration: "6시간",
    rating: 4.6,
    students: 1450,
    description: "고급 카카오톡 봇 개발 심화 과정",
    highlights: [
      "고급 봇 기능 구현",
      "API 연동 심화",
      "보안 강화 방법",
      "상용 서비스 개발"
    ],
    curriculum: [
      "고급 기능 구현",
      "데이터베이스 연동",
      "보안 최적화",
      "서비스 배포"
    ],
    isLive: true
  },
  {
    id: 10,
    title: "발전 경매 자동화 유튜브5차",
    instructor: "경매전문가",
    price: 50000,
    thumbnail: "/api/placeholder/course10.jpg",
    category: "자동화",
    level: "고급",
    duration: "4시간",
    rating: 4.2,
    students: 650,
    description: "경매 시스템 자동화 구축 및 운영",
    highlights: [
      "경매 자동 입찰 시스템",
      "가격 분석 알고리즘",
      "리스크 관리",
      "수익 최적화"
    ],
    curriculum: [
      "경매 시스템 이해",
      "자동 입찰 로직",
      "데이터 분석",
      "전략 최적화"
    ],
    isLive: true
  }
];

export const courseCategories = [
  { id: "all", name: "전체" },
  { id: "automation", name: "자동화" },
  { id: "marketing", name: "마케팅" },
  { id: "development", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "business", name: "비즈니스" }
];

export const courseLevels = [
  { id: "all", name: "전체" },
  { id: "beginner", name: "초급" },
  { id: "intermediate", name: "중급" },
  { id: "advanced", name: "고급" }
];